(function RihlaApp(){
"use strict";
const $=id=>document.getElementById(id);
const OFFICIAL="https://alharamain.gov.sa/public/?page=interactive_maps_ar";
const KEY="rihla-trip-v1";
const CITIES={makkah:{name:"مكة المكرمة",mosque:"المسجد الحرام",symbol:"🕋",center:[21.42252,39.82618]},madinah:{name:"المدينة المنورة",mosque:"المسجد النبوي",symbol:"🕌",center:[24.46720,39.61117]}};
const PLACES={
makkah:[
{id:"kaaba",name:"الكعبة المشرفة",tag:"داخل المسجد الحرام",type:"landmark",icon:"🕋",lat:21.42252,lon:39.82618,indoor:true,description:"الكعبة المشرفة في قلب المسجد الحرام. استخدم الخريطة الرسمية للإرشاد داخل المبنى."},
{id:"safa",name:"الصفا والمروة",tag:"المسعى · نقطة تقريبية",type:"landmark",icon:"🌿",lat:21.42265,lon:39.82920,indoor:true,description:"للانتقال بين مستويات المسعى وطرقه الرسمية، راجع لوحات الحرم والخريطة الرسمية."},
{id:"m1",name:"باب الملك عبدالعزيز — ١",tag:"جنوب الحرم · تقريبي",type:"gate",icon:"🚪",lat:21.42061,lon:39.82536,description:"الموقع تقريبي؛ تحقق من رقم الباب على اللوحات الرسمية."},
{id:"m79",name:"باب الملك فهد — ٧٩",tag:"غرب الحرم · تقريبي",type:"gate",icon:"🚪",lat:21.42200,lon:39.82313,description:"نقطة توضيحية للاتجاه العام فقط، لا تعكس الازدحام أو الإغلاقات."},
{id:"m62",name:"باب العمرة — ٦٢",tag:"غرب الحرم · تقريبي",type:"gate",icon:"🚪",lat:21.42372,lon:39.82305,description:"تحقق من المدخل والطابق المناسب عبر الخريطة الرسمية."},
{id:"m45",name:"باب الفتح — ٤٥",tag:"شمال الحرم · تقريبي",type:"gate",icon:"🚪",lat:21.4248,lon:39.8272,description:"الدبوس تقريبي وليس نقطة دخول موثقة."},
{id:"m100",name:"باب الملك عبدالله — ١٠٠",tag:"التوسعة الشمالية · تقريبي",type:"gate",icon:"🚪",lat:21.42625,lon:39.8242,description:"يمكن اختلاف تنظيم الوصول بحسب الطابق والتوسعة."},
{id:"m19",name:"باب السلام — ١٩",tag:"شرق الحرم · تقريبي",type:"gate",icon:"🚪",lat:21.4231,lon:39.8288,description:"تأكد من رقم الباب الفعلي على اللوحات."},
{id:"m13",name:"باب الصفا — ١٣",tag:"جهة الصفا · تقريبي",type:"gate",icon:"🚪",lat:21.42163,lon:39.8291,description:"نقطة تعريفية غير مخصصة للملاحة الداخلية."},
{id:"clock",name:"برج الساعة",tag:"معلم واضح جنوبي الحرم",type:"landmark",icon:"🕰️",lat:21.41889,lon:39.82546,description:"معلم بارز في المنطقة المركزية، وليس مدخلاً مؤكداً."},
{id:"voco",name:"فندق voco Makkah",tag:"شارع إبراهيم الخليل",type:"hotel",icon:"🏨",lat:21.40915,lon:39.81763,description:"الفندق خارج المنطقة المباشرة للحرم؛ تحقّق من ترتيبات حافلات النقل مع الاستقبال."}
],
madinah:[
{id:"nabawi",name:"المسجد النبوي",tag:"مركز المنطقة",type:"landmark",icon:"🕌",lat:24.46720,lon:39.61117,indoor:true,description:"الخريطة الرسمية للحرمين تتضمن تفاصيل الإرشاد الداخلي."},
{id:"rawdah",name:"الروضة الشريفة",tag:"الدخول حسب التصاريح",type:"landmark",icon:"🌿",lat:24.46657,lon:39.61092,indoor:true,description:"اتبع حجوزات نسك والتنظيم الميداني؛ الموقع التقريبي لا يحدد مسار الدخول."},
{id:"n1",name:"باب السلام — ١",tag:"غرب وجنوب المسجد · تقريبي",type:"gate",icon:"🚪",lat:24.46653,lon:39.61026,description:"دبوس تقريبي، تأكد من لوحة الباب."},
{id:"n2",name:"باب أبي بكر الصديق — ٢",tag:"غرب المسجد · تقريبي",type:"gate",icon:"🚪",lat:24.46670,lon:39.61000,description:"راجع إرشادات التنظيم الميداني."},
{id:"n3",name:"باب الرحمة — ٣",tag:"غرب المسجد · تقريبي",type:"gate",icon:"🚪",lat:24.46691,lon:39.60986,description:"راجع الخريطة الرسمية لتحديد المدخل الفعلي."},
{id:"n20",name:"باب الملك فهد — ٢٠–٢٢",tag:"شمال المسجد · تقريبي",type:"gate",icon:"🚪",lat:24.46913,lon:39.61083,description:"الأرقام ومواضع الدخول حسب اللوحات الرسمية."},
{id:"n24",name:"باب عثمان بن عفان — ٢٤–٢٦",tag:"شمال شرق المسجد · تقريبي",type:"gate",icon:"🚪",lat:24.46884,lon:39.61173,description:"تأكد من نقطة الدخول الحالية."},
{id:"n28",name:"باب علي بن أبي طالب — ٢٨–٣٠",tag:"شرق المسجد · تقريبي",type:"gate",icon:"🚪",lat:24.46817,lon:39.61213,description:"تأكد من الجهة والطابق المخصصين."},
{id:"n40",name:"باب جبريل — ٤٠",tag:"الشرق الجنوبي · تقريبي",type:"gate",icon:"🚪",lat:24.46673,lon:39.61188,description:"موضع إرشادي؛ تحقق من الخريطة الرسمية."},
{id:"n41",name:"باب البقيع — ٤١",tag:"جنوب شرق المسجد · تقريبي",type:"gate",icon:"🚪",lat:24.46655,lon:39.61205,description:"المرور قد يكون محدداً وفق التنظيم."},
{id:"baqi",name:"مقبرة البقيع",tag:"شرق المسجد النبوي",type:"landmark",icon:"🌴",lat:24.46650,lon:39.61310,description:"تتغير مواعيد دخول المقبرة بحسب التنظيم."},
{id:"quba",name:"مسجد قباء",tag:"جنوب المدينة المنورة",type:"landmark",icon:"🕌",lat:24.43931,lon:39.61730,description:"يمكن طلب ملاحة مشي خارجية إلى مسجد قباء."}
]};
const DEFAULT={city:"makkah",leaderPhone:"",hotels:{makkah:{name:"voco Makkah",lat:21.40915,lon:39.81763},madinah:null},meeting:{makkah:null,madinah:null}};
let settings;try{settings={...DEFAULT,...JSON.parse(localStorage.getItem(KEY)||"{}")};settings.hotels={...DEFAULT.hotels,...settings.hotels};settings.meeting={...DEFAULT.meeting,...settings.meeting};}catch{settings=structuredClone(DEFAULT);}
let city=CITIES[settings.city]?settings.city:"makkah",filter="all",map=null,layers=null,locMarker=null,accuracyCircle=null,loc=null,watch=null,route=null,routeLine=null,steps=[],stepIndex=0,lastCompute=0,lastStart=null,toastTimer=null;
const safe=x=>String(x??"").replace(/[&<>"']/g,y=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[y]));
const valid=(a,b)=>a!==""&&b!==""&&Number.isFinite(+a)&&Number.isFinite(+b)&&Math.abs(+a)<=90&&Math.abs(+b)<=180;
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(settings));}catch{}};
const toast=msg=>{clearTimeout(toastTimer);$("toast").textContent=msg;$("toast").classList.add("show");toastTimer=setTimeout(()=>$("toast").classList.remove("show"),3900);};
const open=url=>window.open(url,"_blank","noopener,noreferrer");
const modal=(title,body)=>{$("modalTitle").textContent=title;$("modalBody").innerHTML=body;$("modalOverlay").hidden=false;};
const close=()=>{$("modalOverlay").hidden=true;};
const rad=n=>n*Math.PI/180;
const dist=(a,b)=>{const d1=rad(b.lat-a.lat),d2=rad(b.lon-a.lon);return 12742000*Math.asin(Math.min(1,Math.sqrt(Math.sin(d1/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(d2/2)**2)));};
const google=p=>`https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lon}&travelmode=walking${loc?`&origin=${loc.lat},${loc.lon}`:""}`;
const mapLink=p=>`https://www.google.com/maps?q=${p.lat},${p.lon}`;
async function share(t){try{if(navigator.share){await navigator.share({title:"رِحال",text:t});return;}}catch(e){if(e.name==="AbortError")return;}try{await navigator.clipboard.writeText(t);toast("تم نسخ الرسالة");}catch{open("https://wa.me/?text="+encodeURIComponent(t));}}
function icon(emoji,type){return L.divIcon({className:"custom-marker",html:`<div class="marker-inner ${type==="gate"?"marker-gate":type==="hotel"?"marker-hotel":""}">${emoji}</div>`,iconSize:[38,38],iconAnchor:[19,19]});}
function allPlaces(){const ps=[...PLACES[city]],h=settings.hotels[city],m=settings.meeting[city];if(h&&!ps.some(p=>p.id==="voco"&&h.name==="voco Makkah"))ps.push({id:"hotel-personal",name:h.name,tag:"فندق الرحلة",type:"hotel",icon:"🏨",...h});if(m)ps.push({id:"meeting",name:m.name||"نقطة اللقاء",tag:"نقطة تجمع محفوظة",type:"landmark",icon:"📍",...m});return ps;}
function switchCity(c){if(!CITIES[c])return;city=c;settings.city=c;save();$("makkahBtn").classList.toggle("active",city==="makkah");$("madinahBtn").classList.toggle("active",city==="madinah");$("makkahBtn").setAttribute("aria-pressed",String(city==="makkah"));$("madinahBtn").setAttribute("aria-pressed",String(city==="madinah"));$("citySymbol").textContent=CITIES[city].symbol;$("mapTitle").textContent=CITIES[city].mosque+" ومحيطه";$("mapSubtitle").textContent=CITIES[city].name+"، المملكة العربية السعودية";$("searchBox").value="";filter="all";document.querySelectorAll("#filters .chip").forEach(b=>b.classList.toggle("active",b.dataset.filter==="all"));stopRoute();drawQuick();drawPlaces();drawMarkers();map?.setView(CITIES[city].center,16);}
function drawQuick(){
const h=settings.hotels[city],m=settings.meeting[city];
const quick=[{icon:"🏨",label:"العودة للفندق",sub:h?h.name:"حدد الفندق",do:()=>h?startRoute({...h,type:"hotel"}):openSettings()},
{icon:"🕋",label:CITIES[city].mosque,sub:"الخريطة الرسمية داخله",do:()=>open(OFFICIAL)},
{icon:"📍",label:"نقطة اللقاء",sub:m?"انتقل للمجموعة":"احفظ نقطة تجمع",do:()=>m?startRoute(m):saveMeeting()},
{icon:"🧭",label:"الخريطة الرسمية",sub:"المداخل والمرافق",do:()=>open(OFFICIAL)}];
$("quickDestinations").innerHTML=quick.map((q,i)=>`<button data-quick="${i}"><b>${q.icon} ${safe(q.label)}</b><small>${safe(q.sub)}</small></button>`).join("");
document.querySelectorAll("[data-quick]").forEach(b=>b.onclick=quick[+b.dataset.quick].do);
}
function drawPlaces(){
const term=$("searchBox").value.trim().toLowerCase();
const ps=allPlaces().filter(p=>(filter==="all"||p.type===filter)&&(`${p.name} ${p.tag}`.toLowerCase().includes(term)));
$("placeCount").textContent=ps.length+" مكان";
$("placesList").innerHTML=ps.map(p=>`<button class="place-row" data-place="${safe(p.id)}"><span class="place-icon">${p.icon}</span><span><strong>${safe(p.name)}</strong><small>${safe(p.tag)}</small></span><span>‹</span></button>`).join("")||'<div class="info-box">ما في نتائج مطابقة.</div>';
document.querySelectorAll("[data-place]").forEach(b=>b.onclick=()=>placeDetails(allPlaces().find(p=>p.id===b.dataset.place)));
}
function placeDetails(p){
if(!p)return;
modal(p.name,`<div class="info-box">${safe(p.description||p.tag)}</div><div class="warn-box">${p.type==="gate"?"موقع دبوس الباب تقريبي، وليس مدخلاً موثقاً.":p.indoor?"لا تُستخدم الملاحة الخارجية لتحديد الممرات والطوابق داخل الحرم.":"مسارات المشي تجريبية وقد تتغير بسبب التنظيم."}</div><div class="button-line"><button id="placeOfficial" class="quiet-btn">الخريطة الرسمية</button><button id="placeGoogle" class="quiet-btn">فتح خرائط Google</button>${p.indoor||p.type==="gate"?"":'<button id="placeWalk" class="primary-btn">اعرض مسار المشي</button>'}</div>`);
$("placeOfficial").onclick=()=>open(OFFICIAL);$("placeGoogle").onclick=()=>open(google(p));
if($("placeWalk"))$("placeWalk").onclick=()=>{close();startRoute(p);};
}
function drawMarkers(){
if(!map||!window.L)return;
if(layers)layers.remove();layers=L.layerGroup().addTo(map);
for(const p of allPlaces()){if(!valid(p.lat,p.lon))continue;L.marker([p.lat,p.lon],{icon:icon(p.icon,p.type)}).addTo(layers).on("click",()=>placeDetails(p)).bindTooltip(p.name);}
}
function initMap(){
if(!window.L){$("mapFallback").hidden=false;return;}
map=L.map("map",{zoomControl:false,preferCanvas:true}).setView(CITIES[city].center,16);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap contributors"}).addTo(map);
map.on("dragstart",()=>{});
map.on("contextmenu",e=>saveMeeting({lat:e.latlng.lat,lon:e.latlng.lng}));
drawMarkers();
}
function saveMeeting(point){
if(!point&&!loc){toast("فعّل الموقع أو اضغط مطولاً على الخريطة لحفظ نقطة تجمع");gps();return;}
const p=point||loc;settings.meeting[city]={name:"نقطة لقاء المجموعة",lat:p.lat,lon:p.lon};save();drawQuick();drawPlaces();drawMarkers();toast("تم حفظ نقطة اللقاء على جهازك");
const url=new URL(location.href);url.searchParams.set("city",city);url.searchParams.set("meet",`${p.lat},${p.lon}`);
modal("نقطة اللقاء",`<div class="info-box">تم حفظ الإحداثيات. شارك الرابط مع أعضاء المجموعة.</div><div class="button-line"><button class="primary-btn" id="shareMeet">مشاركة نقطة اللقاء</button></div>`);
$("shareMeet").onclick=()=>share(`نقطة لقاء مجموعتنا في ${CITIES[city].name}\n${url.href}`);
}
function updateLoc(){
if(!loc)return;
$("gpsStatus").innerHTML=`<span class="gps-led"></span> GPS ±${Math.round(loc.accuracy)} م`;
if(map){if(!locMarker){locMarker=L.marker([loc.lat,loc.lon],{icon:L.divIcon({className:"custom-marker",html:'<div class="marker-user"></div>',iconSize:[23,23]})}).addTo(map);accuracyCircle=L.circle([loc.lat,loc.lon],{radius:loc.accuracy,color:"#248be2",fillOpacity:.07,weight:1}).addTo(map);}else{locMarker.setLatLng([loc.lat,loc.lon]);accuracyCircle.setLatLng([loc.lat,loc.lon]).setRadius(loc.accuracy);}}
$("mapNotice").textContent=loc.accuracy>80?"إشارة GPS ضعيفة: لا تعتمد عليها لتحديد باب الحرم":"GPS خارجي فقط · داخل الحرمين استخدم الخريطة الرسمية";
if(route){updateTurn();if(Date.now()-lastCompute>45000&&(!lastStart||dist(lastStart,loc)>65))computeRoute();}
}
function gps(onReady){
if(!navigator.geolocation||!window.isSecureContext){toast("GPS يحتاج متصفحاً يدعم الموقع ورابط HTTPS");return;}
if(watch!==null){if(loc)onReady?.();return;}
toast("اسمح بالوصول إلى الموقع من إعدادات المتصفح");
let called=false;
watch=navigator.geolocation.watchPosition(p=>{
loc={lat:p.coords.latitude,lon:p.coords.longitude,accuracy:p.coords.accuracy,heading:p.coords.heading};
updateLoc();if(map&&(!called||!route))map.panTo([loc.lat,loc.lon]);
if(!called){called=true;onReady?.();}
},e=>{watch=null;$("gpsStatus").textContent="GPS غير متاح";toast(e.code===1?"فعّل أذونات الموقع من المتصفح":"تعذّر الحصول على الموقع، جرّب في منطقة مفتوحة");},{enableHighAccuracy:true,timeout:16000,maximumAge:7000});
}
function hotelRoute(){const h=settings.hotels[city];if(!h){toast("حدد فندقك أولاً في إعدادات الرحلة");openSettings();return;}startRoute({...h,type:"hotel"});}
function startRoute(p){
if(!valid(p.lat,p.lon)){toast("الوجهة لا تحتوي إحداثيات صالحة");return;}
route={name:p.name,lat:+p.lat,lon:+p.lon,type:p.type||"landmark"};
steps=[];stepIndex=0;$("routePanel").hidden=false;$("routeTitle").textContent="إلى "+p.name;$("routeDescription").textContent="خط سير خارجي تجريبي. انتبه للإغلاقات والأرصفة.";$("routeDistance").textContent="—";$("routeDuration").textContent="—";$("nextTurnBox").hidden=true;
$("googleDirectionsBtn").onclick=()=>open(google(route));$("shareDestinationBtn").onclick=()=>share(`وجهتي: ${route.name}\n${mapLink(route)}`);
hideSidebar();
if(!loc){$("routeDescription").textContent="فعّل GPS لتحديد نقطة البداية، أو افتح خرائط Google للملاحة.";gps(()=>computeRoute());}else computeRoute();
}
function stopRoute(){route=null;steps=[];$("routePanel").hidden=true;$("nextTurnBox").hidden=true;if(routeLine){routeLine.remove();routeLine=null;}}
async function computeRoute(){
if(!route||!loc||!window.L)return;
if(loc.accuracy>250){$("routeDescription").textContent="دقة GPS ضعيفة جداً، انتظر التحسن أو استخدم خرائط Google.";return;}
if(dist(route,loc)>35000){$("routeDescription").textContent="أنت بعيد عن المدينة المحددة. انتقل إليها أولاً.";return;}
lastCompute=Date.now();lastStart={...loc};
const target={...route},start={...loc};
const url=`https://routing.openstreetmap.de/routed-foot/route/v1/driving/${start.lon},${start.lat};${target.lon},${target.lat}?overview=full&geometries=geojson&steps=true`;
const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),11000);
try{
const response=await fetch(url,{signal:controller.signal});if(!response.ok)throw Error("routing");const data=await response.json();
if(!route||route.lat!==target.lat||route.lon!==target.lon)return;
const r=data.routes?.[0];if(!r?.geometry?.coordinates?.length)throw Error("no route");
if(routeLine)routeLine.remove();
routeLine=L.polyline(r.geometry.coordinates.map(c=>[c[1],c[0]]),{color:"#168460",weight:6,opacity:.88}).addTo(map);
map.fitBounds(routeLine.getBounds(),{padding:[55,55],maxZoom:17});
$("routeDistance").textContent=r.distance>=1000?(r.distance/1000).toFixed(1)+" كم":Math.round(r.distance)+" متر";
$("routeDuration").textContent=Math.max(1,Math.ceil(r.duration/60))+" دقيقة تقريباً";
steps=(r.legs||[]).flatMap(l=>l.steps||[]).filter(s=>s.maneuver&&s.maneuver.location).map(s=>({type:s.maneuver.type,modifier:s.maneuver.modifier||"",name:s.name||"",lat:s.maneuver.location[1],lon:s.maneuver.location[0]}));
stepIndex=steps.length>1?1:0;$("routeDescription").textContent="التوجيهات التجريبية تتحدث حسب موقعك في الشوارع الخارجية فقط.";updateTurn();
}catch(e){if(routeLine){routeLine.remove();routeLine=null;}steps=[];$("nextTurnBox").hidden=true;$("routeDescription").textContent="خدمة مسارات المشي غير متاحة الآن. افتح خرائط Google للملاحة؛ لن نعرض خطاً مستقيماً مضللاً.";}finally{clearTimeout(timer);}
}
function updateTurn(){
if(!loc||!route||!steps.length)return;
$("nextTurnBox").hidden=false;
if(loc.accuracy>80){$("nextTurnArrow").textContent="!";$("nextTurnText").textContent="إشارة الموقع ضعيفة";$("nextTurnDistance").textContent="اتبع لوحات الطريق والعاملين";return;}
let s=steps[stepIndex]||steps[steps.length-1],d=dist(s,loc);
const threshold=Math.max(14,Math.min(30,loc.accuracy*.65));
while(d<threshold&&stepIndex<steps.length-1){stepIndex++;s=steps[stepIndex];d=dist(s,loc);}
const mod=s.modifier||"";
let arrow="↑",txt="تابع السير للأمام";
if(s.type==="arrive"){arrow="✓";txt="وصلت إلى الوجهة";}
else if(mod.includes("uturn")){arrow="↶";txt="استدر للخلف إذا سمح المسار";}
else if(mod.includes("right")){arrow="↱";txt=mod.includes("slight")?"اتجه قليلاً إلى اليمين":"انعطف يميناً";}
else if(mod.includes("left")){arrow="↰";txt=mod.includes("slight")?"اتجه قليلاً إلى اليسار":"انعطف يساراً";}
$("nextTurnArrow").textContent=arrow;$("nextTurnText").textContent=txt;
$("nextTurnDistance").textContent=(s.type==="arrive"&&d<40?"أنت قريب من وجهتك":"بعد "+(d>950?(d/1000).toFixed(1)+" كم":Math.round(d/5)*5+" متر"))+(s.name?" · "+s.name:"");
}
function openSettings(){
const h=settings.hotels[city]||{};
modal("إعدادات الرحلة",`<div class="info-box">المعلومات محفوظة محلياً في متصفحك فقط.</div><label for="hotelName">اسم الفندق</label><input id="hotelName" value="${safe(h.name||"")}" placeholder="اسم الفندق"/><label for="hotelLat">خط العرض</label><input id="hotelLat" type="number" step="any" value="${h.lat??""}" placeholder="24.46720"/><label for="hotelLon">خط الطول</label><input id="hotelLon" type="number" step="any" value="${h.lon??""}" placeholder="39.61117"/><label for="leaderPhone">واتساب مسؤول المجموعة برمز الدولة</label><input id="leaderPhone" type="tel" dir="ltr" value="${safe(settings.leaderPhone)}" placeholder="9665XXXXXXXX"/><div class="button-line"><button id="saveSettings" class="primary-btn">حفظ إعدادات الرحلة</button><button id="currentHotel" class="quiet-btn">استخدم موقعي الحالي</button></div><p class="subtle">للحصول على الإحداثيات انسخ نقطة مدخل الفندق من خرائط Google.</p>`);
$("saveSettings").onclick=()=>{
const name=$("hotelName").value.trim(),lat=$("hotelLat").value.trim(),lon=$("hotelLon").value.trim(),phone=$("leaderPhone").value.replace(/[+\s()\-]/g,"").trim();
if(phone&&!/^\d{7,15}$/.test(phone)){toast("رقم واتساب غير صالح");return;}
if(name||lat||lon){if(!name||!valid(lat,lon)){toast("أدخل اسم الفندق وإحداثيات صحيحة");return;}settings.hotels[city]={name,lat:+lat,lon:+lon};}else settings.hotels[city]=null;
settings.leaderPhone=phone;save();drawQuick();drawPlaces();drawMarkers();close();toast("تم حفظ بيانات الرحلة");
};
$("currentHotel").onclick=()=>gps(()=>{if(loc&&$("hotelLat")){$("hotelLat").value=loc.lat.toFixed(6);$("hotelLon").value=loc.lon.toFixed(6);toast("تم نسخ موقعك الحالي. تأكد من مدخل الفندق قبل الحفظ.");}});
}
function lost(){
modal("أنا ضايع — مساعدة سريعة",`<div class="warn-box"><b>ابقَ في مكان آمن بعيد عن حركة الحشود.</b> ابحث عن لوحة أقرب باب، واطلب مساعدة العاملين إذا احتجت.</div><div class="info-box">${loc?`موقع GPS التقريبي: ${loc.lat.toFixed(5)}, ${loc.lon.toFixed(5)} — دقة ±${Math.round(loc.accuracy)} م`:"فعّل GPS لتتمكن من مشاركة موقعك."}</div><div class="button-line"><button class="primary-btn" id="shareLost">📍 مشاركة موقعي</button><button class="quiet-btn" id="retryGPS">تفعيل GPS</button><button class="quiet-btn" id="goHome">الرجوع للفندق</button><button class="quiet-btn" id="officialHelp">الخريطة الرسمية</button></div><p class="subtle">الحالات الطارئة الفعلية: اتصل برقم الطوارئ المحلي المعتمد أو اطلب المساعدة من الجهات الميدانية.</p>`);
$("shareLost").onclick=()=>{
if(!loc){gps();toast("انتظر تحديد الموقع ثم اضغط مرة أخرى");return;}
const message=`أنا بعيد عن المجموعة في ${CITIES[city].name}، موقعي التقريبي (دقة ±${Math.round(loc.accuracy)} م):\n${mapLink(loc)}`;
if(settings.leaderPhone)open("https://wa.me/"+settings.leaderPhone+"?text="+encodeURIComponent(message));else share(message);
};
$("retryGPS").onclick=()=>gps();$("goHome").onclick=()=>{close();hotelRoute();};$("officialHelp").onclick=()=>open(OFFICIAL);
}
function showOfficial(){modal("خرائط الحرمين الرسمية",`<p>لتحديد الأبواب الفعلية، الطوابق، المصليات والمرافق اتبع خريطة الهيئة المختصة؛ موقع الدبابيس في رِحال تقريبي.</p><div class="button-line"><button id="openOfficial" class="primary-btn">فتح الخريطة الرسمية</button></div>`);$("openOfficial").onclick=()=>open(OFFICIAL);}
function hideSidebar(){document.querySelector(".sidebar").classList.remove("mobile-open");setTab("mobileMap");setTimeout(()=>map?.invalidateSize(),70);}
function setTab(id){["mobileMap","mobilePlaces","mobileHelp","mobileTrip"].forEach(x=>$(x).classList.toggle("active",x===id));}
function showSidebar(){document.querySelector(".sidebar").classList.add("mobile-open");setTab("mobilePlaces");}
function network(){$("networkStatus").textContent=navigator.onLine?"● متصل بالإنترنت":"● دون اتصال: الخرائط محدودة";}
function boot(){
const q=new URLSearchParams(location.search);const c=q.get("city"),m=q.get("meet");
if(CITIES[c])city=c;
if(m){const nums=m.split(",").map(Number);if(nums.length===2&&valid(nums[0],nums[1])){settings.meeting[city]={name:"نقطة لقاء مشتركة",lat:nums[0],lon:nums[1]};save();}}
$("makkahBtn").onclick=()=>switchCity("makkah");$("madinahBtn").onclick=()=>switchCity("madinah");
$("lostBtn").onclick=lost;$("hotelRouteBtn").onclick=hotelRoute;
$("settingsBtn").onclick=openSettings;$("officialBtn").onclick=showOfficial;
$("locationBtn").onclick=()=>gps();$("recenterBtn").onclick=()=>loc&&map?map.setView([loc.lat,loc.lon],17):gps();
$("plusBtn").onclick=()=>map?.zoomIn();$("minusBtn").onclick=()=>map?.zoomOut();
$("closeRouteBtn").onclick=stopRoute;
$("searchBox").addEventListener("input",drawPlaces);
document.querySelectorAll("#filters .chip").forEach(b=>b.onclick=()=>{filter=b.dataset.filter;document.querySelectorAll("#filters .chip").forEach(z=>z.classList.toggle("active",z===b));drawPlaces();});
$("modalCloseBtn").onclick=close;$("modalOverlay").onclick=e=>{if(e.target===$("modalOverlay"))close();};
document.addEventListener("keydown",e=>{if(e.key==="Escape")close();});
$("retryMapBtn").onclick=()=>location.reload();
$("mobileMap").onclick=hideSidebar;$("mobilePlaces").onclick=showSidebar;$("mobileHelp").onclick=()=>{hideSidebar();lost();};$("mobileTrip").onclick=()=>{hideSidebar();openSettings();};
window.addEventListener("online",network);window.addEventListener("offline",network);
switchCity(city);initMap();network();
if("serviceWorker" in navigator&&location.protocol!=="file:")navigator.serviceWorker.register("./service-worker.js").catch(()=>{});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
})();

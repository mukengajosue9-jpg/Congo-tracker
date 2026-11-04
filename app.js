const cities = [
  {name:"Kinshasa",lat:-4.325,long:15.322,desc:"Capitale de la RDC"},
  {name:"Lubumbashi",lat:-11.664,long:27.479,desc:"Haut-Katanga"},
  {name:"Goma",lat:-1.679,long:29.222,desc:"Nord-Kivu"},
  {name:"Kisangani",lat:0.516,long:25.191,desc:"Tshopo"},
  {name:"Kolwezi",lat:-10.716,long:25.472,desc:"Lualaba"},
  {name:"Bukavu",lat:-2.508,long:28.860,desc:"Sud-Kivu"},
  {name:"Mbuji-Mayi",lat:-6.136,long:23.589,desc:"Kasaï-Oriental"},
  {name:"Matadi",lat:-5.838,long:13.463,desc:"Kongo Central"}
];
const $ = (s)=>document.querySelector(s);
let suggestions = JSON.parse(localStorage.getItem("cst_suggestions") || "[]");

function initMap(){
  if(!window.L){$("#map").innerHTML='<p style="padding:20px;color:#fff">La carte nécessite une connexion Internet.</p>';return;}
  const map=L.map('map',{scrollWheelZoom:false}).setView([-3.5,23.5],4.5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'&copy; OpenStreetMap'}).addTo(map);
  cities.forEach(city=>{
    L.circleMarker([city.lat,city.long],{radius:7,color:'#35d4d0',weight:2,fillColor:'#35d4d0',fillOpacity:.8})
      .addTo(map).bindPopup(`<strong>${city.name}</strong><br>${city.desc}<br><small>Ville couverte par le projet</small>`);
  });
}
function renderEvents(){
  const q=$("#eventSearch").value.trim().toLowerCase(), city=$("#cityFilter").value, type=$("#typeFilter").value;
  const filtered=suggestions.filter(e=>(!q || (e.name+" "+e.city+" "+e.category).toLowerCase().includes(q)) && (!city||e.city===city) && (!type||e.category===type));
  $("#eventCount").textContent=filtered.length+" proposition"+(filtered.length>1?"s":"");
  $("#emptyState").style.display=filtered.length?"none":"block";
  $("#eventList").innerHTML=filtered.map(e=>`<article class="event-card">
    <div class="event-top"><span class="event-type">${escapeHtml(e.category)}</span><span class="event-date">${e.date?new Date(e.date+"T12:00:00").toLocaleDateString("fr-FR"):"Date à confirmer"}</span></div>
    <h3>${escapeHtml(e.name)}</h3><p class="event-meta">⌖ ${escapeHtml(e.city)}<br>Statut : proposition à vérifier</p>
    <span class="event-type">Source fournie</span><br><a class="source-link" href="${safeUrl(e.source)}" target="_blank" rel="noopener noreferrer">Consulter la source ↗</a>
  </article>`).join("");
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function safeUrl(s){try{const u=new URL(s);return ["http:","https:"].includes(u.protocol)?u.href:"#";}catch{return "#";}}
cities.forEach(c=>{const o=document.createElement("option");o.value=c.name;o.textContent=c.name;$("#cityFilter").append(o);});
["#eventSearch","#cityFilter","#typeFilter"].forEach(s=>$(s).addEventListener("input",renderEvents));
$("#suggestionForm").addEventListener("submit",e=>{
  e.preventDefault();const f=new FormData(e.currentTarget), item={name:f.get("name").trim(),city:f.get("city"),category:f.get("category"),date:f.get("date"),source:f.get("source").trim(),createdAt:new Date().toISOString()};
  if(!safeUrl(item.source)||safeUrl(item.source)==="#"){ $("#formFeedback").textContent="Ajoutez un lien public valide commençant par https://.";return;}
  suggestions.unshift(item);localStorage.setItem("cst_suggestions",JSON.stringify(suggestions));
  $("#formFeedback").textContent="Proposition enregistrée sur cet appareil. Elle reste à vérifier avant toute publication.";
  e.currentTarget.reset();renderEvents();
});
$("#menuButton").addEventListener("click",()=>$("#mainNav").classList.toggle("open"));
$("#mainNav").querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>$("#mainNav").classList.remove("open")));
initMap();renderEvents();
if("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("./sw.js").catch(()=>{});

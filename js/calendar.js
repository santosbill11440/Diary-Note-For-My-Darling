/* Popup kaca: kalender dan agenda */
/* ---------- popup kalender ---------- */
function popRender(){
  const y=cur.getFullYear(),m=cur.getMonth(),f=new Date(y,m,1).getDay(),n=new Date(y,m+1,0).getDate(),td=ymd(new Date());
  const has=new Set(notes.filter(i=>i.mode!=="ide").map(i=>i.date).filter(Boolean));
  let gr=DAY.map(d=>`<div class="w">${d.slice(0,3)}</div>`).join("")+"<span></span>".repeat(f);
  for(let d=1;d<=n;d++){const s=y+"-"+String(m+1).padStart(2,"0")+"-"+String(d).padStart(2,"0");gr+=`<button class="dy ${s===td?"td":""} ${s===sel?"sel":""}" data-day="${s}">${d}${has.has(s)?"<i></i>":""}</button>`}
  const a=notes.filter(i=>i.mode!=="ide"&&i.date===sel).sort((x,z)=>(x.time||"99").localeCompare(z.time||"99"));
  $("#pc").innerHTML=`<img class="birds" src="assets/stickers/birds.webp" alt=""><div class="ch"><button data-pm="-1" aria-label="Bulan sebelumnya">‹</button><b>${MON[m]} ${y}</b><button data-pm="1" aria-label="Bulan berikutnya">›</button></div>
  <div class="grid">${gr}</div><div class="lb" style="margin-top:12px">${longDate(sel)}</div>
  ${a.length?a.map(i=>`<div class="ag" data-id="${i.id}"><span>${i.time||M[i.mode]}</span><div>${esc(i.title||i.body.slice(0,40)||"(tanpa judul)")}</div></div>`).join(""):`<div style="color:var(--mute);padding:8px 2px;display:flex;align-items:center;gap:10px">${img("sheep")}Belum ada agenda.</div>`}
  <div class="row"><small style="color:var(--mute)">Tema</small>${["malam","biru","ungu"].map(k=>`<button class="btn ${document.body.dataset.th===k?"p":""}" data-th="${k}">${k[0].toUpperCase()+k.slice(1)}</button>`).join("")}</div><div class="row"><button class="btn p" id="pj">+ Jadwal</button><button class="btn" id="ex">Ekspor</button><button class="btn" id="im">Impor</button><button class="btn" id="hm">Beranda</button></div>
  <div class="foot">${img("elephant")}<small style="color:var(--mute)">Dibuat dengan ♥</small></div><input type="file" id="fi" accept=".json,application/json" hidden>`;
}
function openPop(){popRender();document.body.classList.add("pop")}
function closePop(){document.body.classList.remove("pop")}
$("#mb").onclick=()=>document.body.classList.contains("pop")?closePop():openPop();
$("#pop").onclick=e=>{
  const t=e.target,d=t.closest("[data-day]"),pm=t.closest("[data-pm]"),n=t.closest("[data-id]");
  if(t.id==="pop")closePop();
  else if(d){sel=d.dataset.day;popRender()}
  else if(pm){cur=new Date(cur.getFullYear(),cur.getMonth()+ +pm.dataset.pm,1);popRender()}
  else if(n){closePop();openEd(n.dataset.id)}
  else if(t.id==="pj"){closePop();openEd(null,"jadwal",sel)}
  else if(t.dataset.th){setTheme(t.dataset.th);popRender()}
  else if(t.id==="ex")exportData();
  else if(t.id==="im")$("#fi").click();
  else if(t.id==="hm")showHome();
};
$("#pop").onchange=e=>{if(e.target.id==="fi")importData(e.target.files[0])};

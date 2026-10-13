/* Daftar catatan dan editor (mode Harian, Jadwal, Ide) */
/* ---------- daftar catatan ---------- */
function card(n){
  return `<div class="n" data-id="${n.id}" style="background:${COL[n.c]||COL[0]}">${img(ICON[n.mode])}${n.title?`<b>${esc(n.title)}</b>`:""}${n.body?`<p>${esc(n.body)}</p>`:""}<span class="chip">${M[n.mode]}${n.date?" · "+shortDate(n.date,n.time):""}</span></div>`;
}
function render(){
  $("#chips").innerHTML=[["all","Semua"],...Object.entries(M)].map(([k,l])=>`<button data-m="${k}" class="${mode===k?"on":""}">${img(ICON[k])}${l}</button>`).join("");
  const s=q.toLowerCase(),a=notes.filter(n=>(mode==="all"||n.mode===mode)&&(!s||(n.title+" "+n.body).toLowerCase().includes(s))).sort((x,y)=>y.upd-x.upd),p=a.filter(n=>n.pin),o=a.filter(n=>!n.pin);
  $("#v").innerHTML=!a.length?`<div class="empty">${img("prince_fox")}<br>${q?"Tidak ada catatan yang cocok.":"Belum ada catatan. Tap + untuk mulai menulis."}</div>`:
    (p.length?`<div class="lb">Disematkan</div><div class="hs">${p.map(card).join("")}</div>`:"")+(o.length?(p.length?`<div class="lb">Lainnya</div>`:"")+`<div class="mas">${o.map(card).join("")}</div>`:"");
  $("#v").insertAdjacentHTML("afterbegin",banner());tickNx();greet();
}
$("#chips").onclick=e=>{const m=e.target.dataset.m;if(m){mode=m;render()}};
$("#q").oninput=e=>{q=e.target.value.trim();render()};
$("#v").onclick=e=>{const n=e.target.closest("[data-id]");if(n)openEd(n.dataset.id)};
$("#add").onclick=()=>openEd(null,mode==="all"?"harian":mode);

/* ---------- editor ---------- */
function openEd(id,m,date){
  const f=id&&notes.find(n=>n.id===id);
  w=f?Object.assign({},f):{id:Date.now().toString(36)+Math.random().toString(36).slice(2,5),title:"",body:"",c:0,pin:false,date:"",time:"",upd:0,mode:m||"harian"};
  if(!f)w.date=w.mode==="ide"?"":(date||ymd(new Date()));
  $("#et").value=w.title;$("#eb").value=w.body;$("#edd").value=w.date;$("#edt").value=w.time;
  $("#sg").innerHTML=Object.entries(M).map(([k,l])=>`<button data-k="${k}">${img(ICON[k])}${l}</button>`).join("");
  $("#cols").innerHTML=COL.map((c,i)=>`<button data-c="${i}" style="background:${c}" aria-label="Warna ${i+1}"></button>`).join("");
  paint();$("#ed").classList.add("on");if(!f)$("#et").focus();
}
function paint(){
  document.querySelectorAll("#sg button").forEach(b=>b.classList.toggle("on",b.dataset.k===w.mode));
  document.querySelectorAll("#cols button").forEach(b=>b.classList.toggle("on",+b.dataset.c===w.c));
  $("#pn").classList.toggle("on",w.pin);$("#pn").textContent=w.pin?"Disematkan":"Sematkan";
  $("#edi").src=w.mode==="harian"?"assets/diary.webp":"assets/stickers/"+ICON[w.mode]+".webp";$("#rem").style.display=w.mode==="ide"?"none":"flex";
  $("#edt").style.display=w.mode==="jadwal"?"inline-block":"none";
  $("#rl").textContent=w.mode==="jadwal"?"Tanggal & jam":"Tanggal";
  $("#ed").dataset.m=w.mode;$("#ed").style.setProperty("--tint",COL[w.c]);
}
function sync(){w.title=$("#et").value;w.body=$("#eb").value;w.date=$("#edd").value;w.time=$("#edt").value}
function closeEd(){
  sync();
  if(w.mode!=="ide"&&!w.date)w.date=ymd(new Date());
  if(w.mode!=="jadwal")w.time="";
  notes=notes.filter(n=>n.id!==w.id);
  if(w.title.trim()||w.body.trim()){w.upd=Date.now();notes.push(w);if(w.date)sel=w.date}
  save();$("#ed").classList.remove("on");w=null;render();
}
$("#bk").onclick=closeEd;
$("#dl").onclick=()=>{if(confirm("Hapus catatan ini?")){notes=notes.filter(n=>n.id!==w.id);save();$("#ed").classList.remove("on");w=null;render()}};
$("#pn").onclick=()=>{w.pin=!w.pin;paint()};
$("#sg").onclick=e=>{const k=e.target.dataset.k;if(k){sync();w.mode=k;if(k!=="ide"&&!w.date)w.date=ymd(new Date());$("#edd").value=w.date;paint()}};
$("#cols").onclick=e=>{const c=e.target.dataset.c;if(c!=null){w.c=+c;paint()}};

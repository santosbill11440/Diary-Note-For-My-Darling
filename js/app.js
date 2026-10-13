/* Inisialisasi aplikasi dan service worker */
addEventListener("resize",size);
load();size();render();startSky();setInterval(greet,15000);

if("serviceWorker" in navigator)addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));

/* tema, hitung mundur jadwal, navigasi bawah */
function setTheme(t){document.body.dataset.th=t;try{localStorage.setItem("theme",t)}catch(e){}}
function tickNx(){
  const e=$("#nx");if(!e)return;const n=Date.now();let b=null;
  for(const i of notes){if(i.mode!=="jadwal"||!i.date||!i.time)continue;const t=new Date(i.date+"T"+i.time).getTime();if(t>=n&&(!b||t<b.t))b={t,i}}
  if(!b){e.textContent="Belum ada jadwal berikutnya. Tap + lalu pilih Jadwal.";return}
  const s=Math.floor((b.t-n)/1000),d=Math.floor(s/86400),p=x=>String(x).padStart(2,"0");
  e.innerHTML=`<b>${esc(b.i.title||"Jadwal")}</b><span>${d?d+"h ":""}${p(Math.floor(s%86400/3600))}:${p(Math.floor(s%3600/60))}:${p(s%60)}</span>`;
}
let th="malam";try{th=localStorage.getItem("theme")||"malam"}catch(e){}
setTheme(th);tickNx();setInterval(tickNx,1000);
$(".pill").onclick=e=>{const n=e.target.dataset.n;if(n==="home")showHome();else if(n==="cal")openPop();else if(n)$("#v").scrollTo({top:0,behavior:"smooth"})};

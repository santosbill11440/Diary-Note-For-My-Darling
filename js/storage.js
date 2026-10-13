/* Data, konstanta, dan penyimpanan lokal (localStorage) */
const KEY="notes:v1",$=s=>document.querySelector(s);
const MON=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const DAY=["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
const M={harian:"Harian",jadwal:"Jadwal",ide:"Ide"};
const COL=["rgba(255,255,255,.07)","rgba(242,193,78,.2)","rgba(232,130,100,.22)","rgba(120,190,150,.2)","rgba(110,160,230,.22)","rgba(180,140,230,.22)"];
let notes=[],mode="all",q="",cur=new Date(),sel=ymd(new Date()),w=null;

function ymd(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function esc(s){return String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function load(){
  try{notes=JSON.parse(localStorage.getItem(KEY))||[]}catch(e){notes=[]}
  notes=notes.filter(n=>n&&n.id).map(n=>Object.assign({title:"",body:"",c:0,pin:false,date:"",time:"",upd:0,mode:"ide"},n,n.type==="list"&&n.items?{body:n.items.map(i=>i.t).join("\n")}:{}));
}
function save(){try{localStorage.setItem(KEY,JSON.stringify(notes))}catch(e){alert("Gagal menyimpan. Penyimpanan browser mungkin penuh atau dimatikan.")}}
function longDate(s){const d=new Date(s+"T00:00");return DAY[d.getDay()]+", "+d.getDate()+" "+MON[d.getMonth()]+" "+d.getFullYear()}
function shortDate(s,t){const d=new Date(s+"T00:00");return d.getDate()+" "+MON[d.getMonth()].slice(0,3)+(t?", "+t:"")}

/* ---------- aset & kutipan ---------- */
const ICON={harian:"rose",jadwal:"moon",ide:"planet"};
const img=n=>n?`<img src="assets/stickers/${n}.webp" alt="">`:"";
const QUOTES=["Yang terpenting tak terlihat oleh mata.","Waktu yang kau habiskan untuk mawarmu membuatnya begitu berharga.","Semua orang dewasa dulunya adalah anak-anak.","Bintang-bintang indah karena ada bunga yang tak terlihat.","Kau bertanggung jawab atas apa yang telah kau jinakkan.","Hanya dengan hati kita bisa melihat dengan benar."];
function banner(){const d=Math.floor(Date.now()/864e5);return `<div class="banner"><small>KUTIPAN HARI INI</small><p>${QUOTES[d%QUOTES.length]}</p></div><div class="nx glass" id="nx"></div>`}

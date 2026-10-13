/* Beranda: sapaan sesuai waktu dan bintang 3D interaktif */
/* ---------- beranda: sapaan ---------- */
function greet(){
  const n=new Date(),h=n.getHours(),p=String(h).padStart(2,"0")+":"+String(n.getMinutes()).padStart(2,"0");
  const g=h>=4&&h<11?["Selamat pagi","Apa yang ingin kau lakukan hari ini?"]:h<15&&h>=11?["Selamat siang","Sudah makan? Apa rencanamu siang ini?"]:h>=15&&h<18?["Selamat sore","Bagaimana harimu sejauh ini?"]:["Selamat malam","Ada cerita yang ingin kau tulis malam ini?"];
  const c=notes.filter(x=>x.mode==="jadwal"&&x.date===ymd(n)).length;
  $("#gt").textContent=p;$("#gd").textContent=longDate(ymd(n));
  $("#gh").textContent=g[0];$("#gp").textContent=c?g[1]+" ("+c+" jadwal hari ini)":g[1];
  $("#ck").textContent=p;
}

/* ---------- bintang 3D ---------- */
const calm=matchMedia("(prefers-reduced-motion:reduce)").matches,cv=$("#sky"),g=cv.getContext("2d");
let W,H,tx=0,ty=0,px=0,py=0,run=false;
const stars=Array.from({length:16},()=>({x:Math.random(),len:.08+Math.random()*.7,z:.3+Math.random()*.7,ph:Math.random()*6.28,sp:.5+Math.random()}));
function size(){const r=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*r;cv.height=H*r;g.setTransform(r,0,0,r,0,0)}
function star(r){g.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,d=i%2?r*.45:r;g.lineTo(Math.cos(a)*d,Math.sin(a)*d)}g.closePath()}
function frame(t){
  if(!run)return;
  px+=(tx-px)*.07;py+=(ty-py)*.07;g.clearRect(0,0,W,H);
  $("#bg").style.transform="translate("+(-px*10)+"px,"+(-py*8)+"px)";
  for(const s of stars){
    const sway=calm?0:Math.sin(t/1000*s.sp+s.ph)*7*s.z,ax=s.x*W+px*8*s.z,x=s.x*W+px*38*s.z+sway,y=s.len*H+py*22*s.z,r=(5+s.z*11);
    g.strokeStyle="rgba(255,236,190,"+(.18+s.z*.25)+")";g.lineWidth=1;g.beginPath();g.moveTo(ax,0);g.lineTo(x,y);g.stroke();
    const c=calm?1:Math.cos(t/1000*s.sp*1.6+s.ph);
    g.save();g.translate(x,y);g.scale(.35+.65*Math.abs(c),1);star(r);
    g.shadowColor="rgba(255,214,120,.9)";g.shadowBlur=10+s.z*12;
    g.fillStyle=c>=0?"#FFF1C4":"#F2C14E";g.fill();g.restore();
  }
  requestAnimationFrame(frame);
}
function startSky(){if(!run){run=true;requestAnimationFrame(frame)}}
function aim(cx,cy){tx=Math.max(-1,Math.min(1,(cx/W-.5)*2));ty=Math.max(-1,Math.min(1,(cy/H-.5)*2))}
const home=$("#home");let sy=null,dy=0;
home.addEventListener("touchstart",e=>{sy=e.touches[0].clientY;dy=0;home.style.transition="none"},{passive:true});
home.addEventListener("touchmove",e=>{const t=e.touches[0];dy=Math.min(0,t.clientY-sy);home.style.transform="translateY("+dy+"px)";aim(t.clientX,t.clientY)},{passive:true});
home.addEventListener("touchend",()=>{home.style.transition="transform .45s ease";if(dy<-H*.16)openApp();else home.style.transform="";aim(W/2,H/2)});
home.addEventListener("pointermove",e=>{if(e.pointerType==="mouse")aim(e.clientX,e.clientY)});
home.addEventListener("wheel",e=>{if(e.deltaY>15)openApp()},{passive:true});
$("#hint").onclick=openApp;
addEventListener("deviceorientation",e=>{if(e.gamma==null)return;tx=Math.max(-1,Math.min(1,e.gamma/25));ty=Math.max(-1,Math.min(1,(e.beta-50)/25))});
function openApp(){home.style.transition="transform .45s ease";home.style.transform="translateY(-105%)";setTimeout(()=>{home.classList.add("gone");run=false},450)}
function showHome(){closePop();home.classList.remove("gone");home.style.transform="translateY(-105%)";void home.offsetWidth;home.style.transition="transform .45s ease";home.style.transform="";greet();startSky()}

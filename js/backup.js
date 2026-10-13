/* Ekspor dan impor cadangan .json */
/* ---------- cadangan ---------- */
function exportData(){
  const b=new Blob([JSON.stringify({app:"catatan",v:2,notes},null,1)],{type:"application/json"}),a=document.createElement("a");
  a.href=URL.createObjectURL(b);a.download="catatan-backup-"+ymd(new Date())+".json";document.body.appendChild(a);a.click();a.remove();
}
function importData(f){
  if(!f)return;const r=new FileReader();
  r.onload=()=>{try{
    const d=JSON.parse(r.result);if(!d||!Array.isArray(d.notes))throw 0;
    if(!confirm("Data saat ini akan diganti dengan isi file ("+d.notes.length+" catatan). Lanjut?"))return;
    localStorage.setItem(KEY,JSON.stringify(d.notes));load();render();popRender();alert("Impor berhasil.");
  }catch(e){alert("File tidak valid. Pilih file cadangan .json dari aplikasi ini.")}};
  r.readAsText(f);
}

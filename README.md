# Catatan

Aplikasi catatan harian, jadwal, dan ide. Berjalan lokal di browser, tanpa server dan tanpa database online.

## Struktur
```
catatan-app/
├── index.html        kerangka halaman
├── manifest.json     info PWA (nama, warna, ikon)
├── sw.js             service worker (offline)
├── css/style.css     semua tampilan
├── js/
│   ├── storage.js    data & penyimpanan lokal
│   ├── home.js       beranda, sapaan, bintang 3D
│   ├── notes.js      daftar catatan & editor
│   ├── calendar.js   popup kalender & agenda
│   ├── backup.js     ekspor / impor .json
│   └── app.js        start aplikasi
├── assets/home.jpg   foto beranda
└── icons/            ikon aplikasi
```
Urutan `<script>` di index.html penting, jangan diubah. Semua file berbagi variabel global yang sama.

## Menjalankan
- Cek cepat: buka folder di VS Code, pasang extension Live Server, klik "Go Live".
- Online gratis: upload ke GitHub, lalu Settings, Pages, pilih branch `main`, folder `/ (root)`.
- Di HP Android: buka link-nya di Chrome, menu titik tiga, "Tambahkan ke layar utama".

## Penting
- Data tersimpan di browser HP, jadi ekspor cadangan berkala (menu kaca kiri atas, tombol Ekspor).
- Setelah mengubah file, naikkan versi `V` di `sw.js` supaya HP mengambil pembaruan.
- Service worker hanya aktif lewat HTTPS atau localhost, bukan saat file dibuka langsung (file://).

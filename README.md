![header](https://capsule-render.vercel.app/api?type=waving&color=0:87CEFA,50:B0E0E6,100:ADD8E6&height=250&section=header&text=CodeSong%20V2&fontSize=55&fontAlignY=35&animation=twinkling&fontColor=ffffff)

<div align="center">

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&width=435&lines=%F0%9F%8E%B6+Multi-Song+CLI+Player;%E2%9C%A8+Lyrics+with+Typewriter+Effect;%F0%9F%92%BB+Created+by+Kenichi+Ichi)](https://git.io/typing-svg)

<p align="center">
<a href="https://github.com/KenCodeDev/codesong-v2">
  <img src="https://img.shields.io/github/package-json/v/KenCodeDev/codesong-v2?style=for-the-badge&color=1E90FF&label=Version&labelColor=0F4C81"/>
</a>
<a href="https://github.com/KenCodeDev/codesong-v2">
  <img src="https://img.shields.io/github/languages/top/KenCodeDev/codesong-v2?style=for-the-badge&color=1E90FF&label=JavaScript&labelColor=0F4C81"/>
</a>
<a href="https://github.com/KenCodeDev/codesong-v2/issues">
  <img src="https://img.shields.io/github/issues/KenCodeDev/codesong-v2?style=for-the-badge&color=1E90FF&label=Issues&labelColor=0F4C81"/>
</a>
<a href="https://github.com/KenCodeDev/codesong-v2/stargazers">
  <img src="https://img.shields.io/github/stars/KenCodeDev/codesong-v2?style=for-the-badge&color=1E90FF&label=Stars&labelColor=0F4C81"/>
</a>
</p>

</div>

---

## 🚀 Fitur Utama CodeSong V2

- 🎵 **Multi-Song Library**  
  Pilih lagu dari daftar interaktif. Cukup tambahkan folder baru di `songs/` dengan struktur yang sama.

- 🎨 **Typing Efek Lirik**  
  Lirik muncul satu karakter per karakter dengan timing yang bisa diatur per baris, menciptakan pengalaman membaca yang dinamis.

- 💿 **Visual Player**  
  Tampilan disk berputar, progress bar, dan informasi lagu (judul, artis, album) dengan warna-warni terminal yang aesthetic.

- 🖥️ **Ink-Powered UI**  
  Dibangun dengan React + Ink untuk rendering terminal yang responsif dan interaktif.

- ⏱️ **Kontrol Timing Canggih**  
  Setiap baris lirik bisa diatur `typingSpeed`, `nextDelay`, dan `initialDelay` untuk sinkronisasi sempurna dengan audio.

- 🔊 **Dukungan Audio Lokal**  
  Putar file `.m4a` atau format lain yang didukung oleh `sound-play`.

- 📁 **Struktur Modular**  
  Setiap lagu dalam folder terpisah dengan `data/song.js` dan file audio, memudahkan penambahan lagu baru.

- ✅ **Auto-Discovery**  
  Program otomatis mendeteksi semua folder di `songs/` yang memiliki `data/song.js` dan menampilkannya sebagai pilihan.

---

## 📁 Struktur Folder

```
root/
├── node_modules/
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Lyrics.jsx
│   │   ├── ProgressBar.jsx
│   │   └── RotatingDisc.jsx
│   ├── hooks/
│   │   ├── useAudioPlayer.js
│   │   ├── useInterval.js
│   │   └── useTypewriter.js
│   ├── App.jsx
│   └── index.jsx
├── package.json
├── package-lock.json
├── play-audio.js
├── index.js                 # Entry utama: pilih lagu & render
└── songs/                   # Semua lagu di sini
    └── shapeofmyheart/
        ├── data/
        │   └── song.js
        └── shapeofmyheart.m4a
```

### Cara Menambah Lagu Baru

1. Buat folder di dalam `songs/` (contoh: `songs/mylove/`)
2. Buat folder `data/` di dalamnya
3. Buat `song.js` dengan format:

```javascript
export default {
  title: "Judul Lagu",
  artist: "Nama Artis",
  album: "Nama Album",
  duration: 120, // dalam detik
  audioFile: "../mylove.m4a", // relatif dari folder data
  initialDelay: 0,
  startupDelay: 1000,
  fadeOutDelay: 1500,
  lyrics: [
    { text: "Baris pertama", typingSpeed: 80, nextDelay: 2000 },
    // ... dst
  ],
  footer: ["Baris footer 1", "Baris footer 2"]
}
```

4. Letakkan file audio di folder yang sama (contoh: `songs/mylove/mylove.m4a`)

---

## 🧠 Cara Install

```bash
git clone https://github.com/KenCodeDev/codesong-v2.git
```
```bash
cd codesong
```
```bash
npm install
```
```bash
npm start
```

---

## 🛠️ Troubleshooting

| Masalah | Solusi |
|---------|--------|
| Lirik tidak muncul | Pastikan `data/song.js` memiliki properti `lyrics` dengan format yang benar |
| Error `ERR_UNSUPPORTED_ESM_URL_SCHEME` | Gunakan `pathToFileURL` di `index.js` (sudah dihandle) |
| Tidak ada pilihan lagu | Pastikan folder di `songs/` memiliki `data/song.js` |
| Progress bar tidak jalan | Cek `duration` di `song.js` sesuai dengan durasi audio |

---

## 🙏 Kontribusi & Dukungan

Terimakasih telah menggunakan CodeSong V2! ❤️

Ada error? Hubungi developer via:
- Instagram: [@kenichi_ichi](https://instagram.com/kenichi_ichi)
- GitHub Issues: [Create Issue](https://github.com/KenCodeDev/codesong-v2/issues)

---

## 📄 Lisensi

MIT © Kenichi Ichi

![footer](https://capsule-render.vercel.app/api?type=waving&color=0:ADD8E6,50:B0E0E6,100:87CEFA&height=120&section=footer)

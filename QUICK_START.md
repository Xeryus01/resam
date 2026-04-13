# QUICK START GUIDE - RESAM & DANSOS Application

## 🚀 Mulai dengan Cepat

### Step 1: Persiapan Awal
```bash
# Pastikan Anda memiliki:
1. Folder dansos dengan semua file
2. Browser modern (Chrome, Firefox, Safari, Edge)
3. Text editor untuk edit (Optional: jika ingin customize)
```

### Step 2: Membuka Aplikasi

**Opsi A: Direct File (Paling Mudah)**
```bash
1. Buka folder dansos
2. Double-click file "index.html"
3. Aplikasi akan terbuka di browser default
```

**Opsi B: Local Server (Recommended)**
```bash
# Menggunakan Python (jika terinstall)
cd c:\Users\BPS 1900\Documents\dansos
python -m http.server 8000

# Kemudian buka: http://localhost:8000
```

**Opsi C: VS Code Live Server**
```bash
1. Buka folder di VS Code
2. Right-click index.html
3. Pilih "Open with Live Server"
```

---

## 📁 Struktur File Penting

```
dansos/
├── index.html              ← Halaman utama BU
|(    resam.html            ← Tentang RESAM
├── dansos.html             ← Tentang DANSOS
├── about.html              ← Tentang program
├── assets/
│   ├── css/
│   │   └── style.css       ← Semua styling
│   └── js/
│       ├── script.js       ← Interaktivitas
│       └── config.js       ← Konfigurasi
├── README.md               ← Dokumentasi lengkap
├── QUICK_START.md          ← File ini
├── sitemap.xml             ← Untuk SEO
└── robots.txt              ← Untuk crawlers
```

---

## 🎨 Customization Cepat

### 1. Ganti Teks
Buka file HTML dengan text editor, cari teks yang ingin diubah:
```html
<!-- Ganti ini -->
<h1>RESAM & DANSOS</h1>

<!-- Jadi ini -->
<h1>RESAM & DANSOS - BPS Babel</h1>
```

### 2. Ganti Warna
Edit `assets/css/style.css` di bagian `:root`:
```css
:root {
    --primary-color: #0284c7;    /* Ubah ke warna favorite */
    --secondary-color: #e11d48;  /* Ubah ke warna lain */
}
```

**Warna Referensi:**
- Biru: `#0284c7` atau `#0369a1`
- Merah: `#e11d48` atau `#be123c`
- Hijau: `#059669`
- Abu-abu: `#64748b`

### 3. Ganti Email & Kontak
Cari semua file `.html` dan ubah:
```html
<!-- Dari -->
resam@bps.go.id

<!-- Jadi -->
email_baru@bps.go.id
```

### 4. Ganti Logo
Update di semua file HTML:
```html
<!-- Ganti src gambar -->
<img src="URL_LOGO_BARU_ANDA">
```

---

## 📱 Testing di Berbagai Device

### Desktop
- Chrome/Edge/Firefox - OK
- Safari - OK

### Mobile
- Use DevTools (F12) → Toggle Device Toolbar (Ctrl+Shift+M)
- Test di berbagai ukuran layar

### Tablet
- Buka dengan tablet langsung
- Atau simulasikan di DevTools

---

## 🔗 Links Penting yang Harus Update

Cari dan update links berikut di semua file HTML:

```html
<!-- RESAM Data -->
http://s.bps.go.id/RESAM1900

<!-- DANSOS Data -->
http://s.bps.go.id/dansosBabelBPS

<!-- Email RESAM -->
resam@bps.go.id

<!-- Email DANSOS -->
dansos@bps.go.id
```

---

## 🚀 Deploy (Hosting Online)

### Opsi 1: Netlify (Paling Mudah)
```bash
1. Buka https://www.netlify.com
2. Klik "Drop files here"
3. Drag & drop folder dansos
4. SELESAI! Website live dalam hitungan detik
```

### Opsi 2: GitHub Pages
```bash
1. Buat repository GitHub
2. Push folder dansos
3. Settings → Pages → Select main branch
4. Website live di https://username.github.io/dansos
```

### Opsi 3: BPS Server Lokal
```bash
1. Copy folder dansos ke server
2. Setup web server (Nginx/Apache)
3. Point domain ke folder
4. SELESAI!
```

---

## ✅ Checklist Sebelum Deploy

- [ ] Update semua email addresses
- [ ] Update contact information
- [ ] Verifikasi semua links berfungsi
- [ ] Test di mobile
- [ ] Update copyright year jika perlu
- [ ] Check logo/branding
- [ ] Test form functionality
- [ ] Verify external links (RESAM/DANSOS data)

---

## 📊 File Size & Performance

| Komponen | Size | Notes |
|----------|------|-------|
| HTML (4 files) | ~80 KB | Lightweight |
| CSS | ~40 KB | Optimized |
| JS | ~30 KB | Vanilla JS |
| Total | ~150 KB | Sangat cepat |
| Load Time | <1s | Desktop |
| Load Time | ~2s | Mobile 4G |

---

## 🐛 Troubleshooting Cepat

**Q: Halaman tidak muncul?**
A: Clear cache (Ctrl+Shift+Del) atau buka private browsing

**Q: CSS tidak ter-load?**
A: Pastikan path relatif benar: `assets/css/style.css`

**Q: Menu mobile tidak berfungsi?**
A: Check browser console (F12), pastikan script.js loaded

**Q: Links tidak berfungsi?**
A: Verifikasi semua href attributes di HTML

**Q: Mobile layout berantakan?**
A: Cek viewport meta tag di `<head>`

---

## 💡 Tips & Tricks

### Shortcut Keyboard
- `F12` - Buka Developer Tools
- `Ctrl+U` - View Page Source
- `Ctrl+Shift+M` - Toggle Mobile View
- `Ctrl+Shift+C` - Inspect Element

### Browser DevTools
- **Elements** - Check HTML structure
- **Console** - Check JavaScript errors
- **Network** - Check file loading
- **Responsive** - Test mobile view

---

## 📞 Support & Help

### Jika Ada Masalah
1. Check README.md untuk dokumentasi lengkap
2. Lihat browser console (F12) untuk error messages
3. Test di browser berbeda
4. Clear cache dan reload

### Technical Support
- Review source code (buka file dengan text editor)
- Generate dari HTML/CSS/JS - semuanya documented
- Gunakan Google untuk search error messages

---

## 🔄 Update & Maintenance

### Weekly
- Check links berfungsi
- Monitor performance

### Monthly
- Update content jika ada perubahan
- Review user feedback
- Test semua fitur

### Quarterly
- Full website review
- Backup files
- Update documentation

---

## 📚 Dokumentasi Lengkap

Untuk informasi lebih detail, baca **README.md**:
- Fitur lengkap
- Customization advanced
- Deployment options
- API & integration
- Troubleshooting extensive

---

## 🎯 Next Steps

1. ✅ Buka aplikasi (ikuti Step 1-2 di atas)
2. ✅ Customize sesuai kebutuhan (ikuti Customization Cepat)
3. ✅ Test di mobile dan desktop
4. ✅ Deploy ke hosting (ikuti Deploy section)
5. ✅ Monitor dan maintain secara berkala

---

## 📄 File Revision

- **Version**: 1.0.0
- **Last Updated**: 12 April 2026
- **Status**: Production Ready
- **License**: © 2026 BPS Provinsi Kepulauan Bangka Belitung

---

**Selamat! Aplikasi RESAM & DANSOS Anda siap digunakan! 🎉**

Jika ada pertanyaan, hubungi:
- 📧 resam@bps.go.id
- 📧 dansos@bps.go.id

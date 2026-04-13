# Aplikasi Microsite RESAM & DANSOS

Dokumentasi lengkap untuk aplikasi microsite RESAM dan DANSOS BPS Provinsi Kepulauan Bangka Belitung.

## 📋 Daftar Isi

1. [Deskripsi Aplikasi](#deskripsi-aplikasi)
2. [Fitur Utama](#fitur-utama)
3. [Struktur Folder](#struktur-folder)
4. [Teknologi yang Digunakan](#teknologi-yang-digunakan)
5. [Cara Menggunakan](#cara-menggunakan)
6. [Deployment](#deployment)
7. [Maintenance](#maintenance)
8. [Kontak](#kontak)

---

## Deskripsi Aplikasi

Aplikasi Microsite RESAM & DANSOS adalah platform digital yang dirancang untuk mengelola dan menyediakan informasi tentang:

### RESAM (Dari Kite Untuk Same-Same)
- Urunan pegawai BPS Provinsi Kep. Bangka Belitung
- Dikelola oleh Pengurus RESAM
- Untuk kegiatan kebersamaan dan sosial
- Melibatkan semua pegawai termasuk outsourcing

### DANSOS (Dana Sosial)
- Dana untuk membantu pegawai yang membutuhkan
- Mendukung kegiatan sosial lingkungan BPS
- Dikelola dengan profesional dan transparan
- Memberikan bantuan dalam situasi mendesak

---

## Fitur Utama

✅ **Navigasi Responsif**
- Menu navigasi yang user-friendly
- Mobile hamburger menu untuk perangkat kecil
- Navbar sticky dengan smooth scrolling

✅ **Hero Section**
- Banner menarik dengan call-to-action
- Informasi ringkas tentang program

✅ **Fitur-Fitur Unggulan**
- Data terstruktur
- Keamanan tinggi
- Responsif di semua perangkat
- Download data mudah

✅ **Program Unggulan**
- Card RESAM dan DANSOS dengan detail lengkap
- Link ke data online
- Informasi benefit dan keunggulan

✅ **Statistik**
- Data transparansi, akses 24/7
- Komitmen berkelanjutan

✅ **Halaman Detail**
- **resam.html** - Informasi lengkap tentang RESAM
- **dansos.html** - Informasi lengkap tentang DANSOS
- **about.html** - Tentang program, visi misi, dan FAQ

✅ **Footer**
- Informasi kontak
- Links penting
- Data resmi

---

## Struktur Folder

```
dansos/
├── index.html                    # Halaman utama
├── resam.html                    # Halaman detail RESAM
├── dansos.html                   # Halaman detail DANSOS
├── about.html                    # Halaman tentang
├── assets/
│   ├── css/
│   │   └── style.css            # Stylesheet utama
│   └── js/
│       └── script.js            # JavaScript interaktif
└── README.md                     # File dokumentasi ini
```

---

## Teknologi yang Digunakan

### Frontend
- **HTML5** - Struktur halaman
- **CSS3** - Styling dan responsive design
- **JavaScript (Vanilla)** - Interaktivitas dan dinamis content

### Library & Resources
- **Google Fonts (Inter)** - Font modern dan clean
- **Font Awesome 6.4.0** - Icon library
- **CSS Variables** - Custom properties untuk theme consistency

### Design Principles
- Mobile-first responsive design
- Accessibility compliant
- Performance optimized
- SEO friendly

---

## Cara Menggunakan

### 1. Membuka Aplikasi
Cukup buka file `index.html` di browser favorit Anda:
```bash
# Jika menggunakan Python (Python 3)
python -m http.server 8000
# Kemudian buka http://localhost:8000

# Atau buka langsung file index.html di browser
```

### 2. Navigasi Antar Halaman
- **Halaman Utama** → index.html
- **RESAM Detail** → resam.html
- **DANSOS Detail** → dansos.html
- **Tentang** → about.html

### 3. Fitur Interaktif

**Mobile Menu**
- Di perangkat kecil, klik hamburger icon untuk membuka menu
- Menu akan menutup otomatis saat link diklik

**Smooth Scroll**
- Klik link "Pelajari RESAM/DANSOS" atau anchor links untuk smooth scroll
- Navbar akan menyesuaikan status active link

**External Links**
- Link ke portal data RESAM: http://s.bps.go.id/RESAM1900
- Link ke portal data DANSOS: http://s.bps.go.id/dansosBabelBPS
- Email links untuk kontak

### 4. Kustomisasi Konten
Edit file HTML untuk menyesuaikan:
- Nama organisasi dan lokasi
- Email dan nomor kontak
- Teks dan deskripsi program
- Links eksternal
- Warna dan logo (dalam CSS)

---

## Deployment

### Opsi 1: Web Server Lokal (Development)
```bash
# Menggunakan Python
python -m http.server 8000

# Menggunakan Node.js (jika terinstall)
npx http-server

# Menggunakan Live Server di VS Code
# Install extension Live Server, kemudian open with Live Server
```

### Opsi 2: Cloud Hosting
Platform yang bisa digunakan:
- **Netlify** - Deploy gratis dengan drag & drop
- **GitHub Pages** - Gratis untuk repositori publik
- **Vercel** - Optimal untuk proyek static
- **AWS S3** - Untuk enterprise
- **LocalHost Server** - Untuk intranet/jaringan lokal

### Langkah Deploy ke Netlify
```bash
1. Upload seluruh folder dansos ke Netlify
2. Atau push ke GitHub, di-connect dengan Netlify
3. Setel homepage ke index.html
4. Deploy!
```

### Langkah Deploy ke GitHub Pages
```bash
1. Buat repository baru di GitHub
2. Push folder dansos ke repository
3. Settings → Pages → Source = main branch
4. Website akan accessible di https://username.github.io/dansos
```

---

## Customization Guide

### 1. Mengubah Warna (CSS Variables)
Edit `assets/css/style.css` bagian `:root`:
```css
:root {
    --primary-color: #0284c7;      /* Biru RESAM */
    --secondary-color: #e11d48;    /* Merah DANSOS */
    --text-dark: #1e293b;
    --text-light: #64748b;
    /* ... lebih banyak variables */
}
```

### 2. Mengubah Logo
Ganti URL di semua halaman:
```html
<!-- Ganti src di navbar -->
<img src="URL_LOGO_BARU">
```

### 3. Mengubah Konten Teks
Cukup edit teks langsung di file HTML:
```html
<p>Ganti teks ini dengan konten Anda</p>
```

### 4. Menambah Halaman Baru
1. Buat file HTML baru (e.g., `program.html`)
2. Copy struktur dari halaman existing
3. Edit konten dan styling
4. Tambah link di navbar semua halaman

### 5. Mengubah Font
Edit link Google Fonts di `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=FONT_BARU&display=swap" rel="stylesheet">
```

Kemudian ubah CSS:
```css
body {
    font-family: 'FONT_BARU', sans-serif;
}
```

---

## Browser Support

✅ Chrome/Edge 90+
✅ Firefox 88+
✅ Safari 14+
✅ Opera 76+
✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## Performance Tips

1. **Image Optimization** - Gunakan format modern (WebP)
2. **Caching** - Browser caching untuk static assets
3. **Minification** - Minify CSS dan JS di production
4. **CDN** - Gunakan CDN untuk library eksternal
5. **Lazy Loading** - Implement lazy loading untuk images

---

## Security

✅ HTML/CSS/JS vanilla - tidak ada dependency vulnerability
✅ External links dengan `target="_blank"` dan `rel="noopener"`
✅ Form validation dengan JavaScript
✅ No sensitive data dalam client code
✅ HTTPS recommended untuk production

---

## Troubleshooting

### Halaman tidak muncul dengan benar
- Clear browser cache (Ctrl+Shift+Delete)
- Pastikan semua file di folder yang benar
- Check browser console (F12) untuk errors

### CSS tidak ter-load
- Pastikan path di `<link rel="stylesheet">` benar
- Check apakah file style.css ada di `assets/css/`

### JavaScript error
- Check browser console untuk error messages
- Pastikan script.js path benar: `assets/js/script.js`

### Mobile menu tidak berfungsi
- Pastikan hamburger ID dan navbarMenu ID sesuai
- Check JavaScript console untuk errors

---

## Maintenance

### Regular Updates
- Update copywriting dan konten sesuai perubahan program
- Update data links jika ada perubahan portal
- Review dan update contact information

### Monitoring
- Check page load speed
- Monitor user feedback
- Check browser compatibility

### Backup
- Backup seluruh folder secara berkala
- Gunakan Git untuk version control
- Archive changes quarterly

---

## Fitur Lanjutan (Future Development)

Berikut fitur yang bisa ditambahkan di masa depan:

- [ ] Backend database untuk manajemen data
- [ ] User authentication dan profile
- [ ] Form submission untuk pengajuan bantuan
- [ ] Admin dashboard untuk manage content
- [ ] Search functionality
- [ ] Document download/upload
- [ ] Notification system
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Data analytics dan reporting

---

## FAQ

**Q: Apakah bisa diakses offline?**
A: Ya, cukup download semua file dan buka index.html langsung.

**Q: Apakah bisa diintegrasikan dengan database?**
A: Ya, bisa dengan menambahkan backend (Node.js, PHP, etc)

**Q: Apakah bisa diprint-friendly?**
A: Ya, CSS sudah compatible dengan print media.

**Q: Berapa kapasitas bandwidth yang dibutuhkan?**
A: Sangat minimal karena hanya static HTML/CSS/JS.

---

## Kontak & Support

**Untuk pertanyaan tentang RESAM & DANSOS:**
- 📧 Email RESAM: resam@bps.go.id
- 📧 Email DANSOS: dansos@bps.go.id
- 🏢 Kantor: BPS Provinsi Kep. Bangka Belitung
- ⏰ Jam Operasional: Senin-Jumat, 08:00-16:00 WITA

**Untuk pertanyaan teknis aplikasi:**
- Review kode di browser (F12)
- Check file assets apakah sudah ter-load
- Test di browser berbeda

---

## License

Aplikasi ini dikembangkan untuk BPS Provinsi Kepulauan Bangka Belitung.
© 2026 BPS Provinsi Kepulauan Bangka Belitung. All rights reserved.

---

## Changelog

### Version 1.0 - Initial Release (2026)
- ✅ Homepage dengan hero section
- ✅ Halaman detail RESAM
- ✅ Halaman detail DANSOS
- ✅ Halaman About dengan FAQ
- ✅ Responsive design mobile-first
- ✅ Navigation dengan hamburger menu
- ✅ Footer dengan links dan info
- ✅ Dark modern design dengan brand colors
- ✅ JavaScript interaktivitas
- ✅ SEO optimized

---

**Terima kasih telah menggunakan Aplikasi RESAM & DANSOS!**

Untuk saran dan masukan, silahkan hubungi pengurus RESAM & DANSOS.

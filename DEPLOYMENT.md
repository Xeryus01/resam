# DEPLOYMENT & INSTALLATION GUIDE

Panduan lengkap untuk mendeploy aplikasi RESAM & DANSOS di berbagai platform.

---

## 📋 Daftar Opsi Deployment

1. **Local Development** - Untuk testing
2. **Intranet Server** - Untuk jaringan internal BPS
3. **Cloud Hosting** - Untuk akses publik
4. **Hybrid Setup** - Kombinasi beberapa platform

---

## 1️⃣ LOCAL DEVELOPMENT

### A. Windows

**Menggunakan Python**
```powershell
# Buka PowerShell di folder dansos
cd "c:\Users\BPS 1900\Documents\dansos"

# Jalankan python server
python -m http.server 8000

# Buka browser: http://localhost:8000
```

**Menggunakan Node.js**
```powershell
# Install http-server (jika belum)
npm install -g http-server

# Jalankan server
cd "c:\Users\BPS 1900\Documents\dansos"
http-server

# Buka browser: http://localhost:8080
```

**Menggunakan IIS (Internet Information Services)**
```
1. Buka IIS Manager
2. Add New Website
3. Site name: "RESAM-DANSOS"
4. Physical path: C:\Users\BPS 1900\Documents\dansos
5. Binding: http, localhost:8000
6. Start website
7. Browser: http://localhost:8000
```

### B. macOS/Linux

```bash
# Python 3
cd ~/dansos
python3 -m http.server 8000

# Node.js
npx http-server

# Ruby
ruby -run -ehttpd . -p8000
```

---

## 2️⃣ INTRANET SERVER (Internal BPS Network)

### Setup Apache Web Server (Recommended)

**1. Install Apache**
```bash
# Windows (menggunakan Chocolatey)
choco install apache-httpd

# Linux (Ubuntu/Debian)
sudo apt-get install apache2

# macOS
brew install httpd
```

**2. Configure Virtual Host**
```apache
# File: /etc/apache2/sites-available/resam-dansos.conf

<VirtualHost *:80>
    ServerName resam.bps.local
    ServerAlias www.resam.bps.local
    
    DocumentRoot /var/www/dansos
    
    <Directory /var/www/dansos>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    # Enable mod_rewrite untuk clean URLs
    <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </IfModule>
    
    ErrorLog ${APACHE_LOG_DIR}/resam-dansos-error.log
    CustomLog ${APACHE_LOG_DIR}/resam-dansos-access.log combined
</VirtualHost>
```

**3. Enable dan Restart**
```bash
# Enable virtual host
a2ensite resam-dansos.conf

# Enable mod_rewrite
a2enmod rewrite

# Restart Apache
sudo systemctl restart apache2

# Verify
sudo apache2ctl configtest
```

**4. Update Hosts File**
```bash
# Windows: C:\Windows\System32\drivers\etc\hosts
# Linux/Mac: /etc/hosts

# Add this line:
192.168.x.x resam.bps.local www.resam.bps.local
```

---

## 3️⃣ CLOUD HOSTING

### Option A: Netlify (Rekomendasi untuk Static Sites)

**Method 1: Direct Upload (Paling Mudah)**
```
1. Buka https://app.netlify.com/drop
2. Drag & drop folder "dansos"
3. Tunggu diproses
4. Website akan accessible di URL random Netlify
5. (Optional) Connect custom domain
```

**Method 2: Connect GitHub**
```
1. Push folder ke GitHub
2. Buka https://app.netlify.com
3. Klik "Connect from Git"
4. Select GitHub repository
5. Build settings:
   - Build command: (leave empty)
   - Publish directory: /
6. Deploy
```

**Custom Domain di Netlify**
```
1. Settings → Domain management
2. Add custom domain
3. Update DNS records (A atau CNAME)
4. Enable HTTPS (automatic)
```

---

### Option B: GitHub Pages (Gratis)

```bash
# 1. Buat repository
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/dansos.git
git branch -M main
git push -u origin main

# 2. GitHub Settings:
# Settings → Pages → Source: main branch
# GitHub akan generate: https://username.github.io/dansos

# 3. Custom domain (optional):
# Settings → Pages → Custom domain: resam.bps.go.id
# Update DNS CNAME: dansos.github.io
```

---

### Option C: Vercel (Optimal untuk Static HTML)

```
1. Buka https://vercel.com/dashboard
2. Klik "New Project"
3. Import Git repository
4. Project name: resam-dansos
5. Deploy
6. Auto HTTPS enabled
```

---

### Option D: Amazon S3 + CloudFront

```bash
# 1. Create S3 bucket
aws s3 mb s3://resam-dansos-bps

# 2. Upload files
aws s3 sync ./ s3://resam-dansos-bps --delete

# 3. Enable static website hosting
aws s3api put-bucket-website \
  --bucket resam-dansos-bps \
  --website-configuration file://website.json

# 4. Create CloudFront distribution
# (untuk faster delivery + HTTPS)
```

---

### Option E: Traditional Web Host (Hosting Berbayar)

**Jika menggunakan shared hosting:**

```
1. Upload via FTP/SFTP:
   - FTP Client: FileZilla, WinSCP
   - Host: ftp.yourdomain.com
   - Upload folder dansos ke public_html/

2. Configure .htaccess (untuk clean URLs):
```

**.htaccess**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /resam-dansos/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /resam-dansos/index.html [L]
</IfModule>
```

---

## 4️⃣ HYBRID SETUP (Recommended untuk Enterprise)

### Arsitektur:
```
Local Dev → GitHub → CI/CD → Staging → Production
   ↓
Developers
   ↓
Pull Request → Netlify Preview → Main Deploy
```

### Tools Needed:
1. **Git** - Version control
2. **GitHub** - Repository
3. **GitHub Actions** - CI/CD
4. **Netlify** - Hosting
5. **Custom Domain** - DNS pointing

### Setup Steps:

**1. GitHub Repository**
```bash
git clone https://github.com/your-org/resam-dansos.git
cd resam-dansos
# ... make changes ...
git add .
git commit -m "Update content"
git push
```

**2. GitHub Actions (Auto Deploy)**

File: `.github/workflows/deploy.yml`
```yaml
name: Deploy to Netlify

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        with:
          args: deploy --prod
```

**3. Custom Domain Setup**
```bash
# DNS Provider (Cloudflare, etc)
# Record type: CNAME
# Host: @
# Value: resam-dansos.netlify.app

# Or using A record:
# Type: A
# Host: @
# Value: 1.2.3.4 (Netlify IP)
```

---

## 5️⃣ SSL/HTTPS CONFIGURATION

### Untuk Self-Signed Certificate (Internal/Testing)
```bash
# Generate SSL certificate
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365

# Apache2 Configuration:
<VirtualHost *:443>
    SSLEngine on
    SSLCertificateFile /path/to/cert.pem
    SSLCertificateKeyFile /path/to/key.pem
    # ... rest of config
</VirtualHost>
```

### Untuk Production (Let's Encrypt - Free)
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-apache

# Get certificate
sudo certbot --apache -d resam.bps.go.id

# Auto-renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

---

## 6️⃣ DATABASE INTEGRATION (Future)

Jika nanti butuh backend:

### Recommended Stack:
```
Frontend: HTML/CSS/JS (already set up)
Backend: Node.js/Express atau PHP/Laravel
Database: MySQL/PostgreSQL
```

### Simple Node.js Backend Example:
```bash
# Install dependencies
npm init
npm install express cors dotenv

# Create server.js
node server.js
```

---

## 7️⃣ MONITORING & ANALYTICS

### Google Analytics Setup
```html
<!-- Tambahkan di <head> semua halaman -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Error Tracking (Sentry)
```html
<script src="https://cdn.ravenjs.com/3.26.4/raven.min.js"></script>
<script>
  Raven.config('YOUR_SENTRY_DSN').install();
</script>
```

---

## 8️⃣ PERFORMANCE OPTIMIZATION

### 1. Minify CSS/JS
```bash
# Using uglify-js
npm install uglify-js
uglifyjs assets/js/script.js -o assets/js/script.min.js

# Using cssnano
npm install cssnano
cssnano assets/css/style.css > assets/css/style.min.css
```

### 2. Enable Gzip Compression
```apache
# .htaccess atau Apache config
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/javascript
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

### 3. Browser Caching
```apache
<IfModule mod_expires.c>
  ExpiresActive OnExpiresDefault "access plus 2 days"
  
  ExpiresByType text/html "access plus 1 week"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
</IfModule>
```

---

## 9️⃣ BACKUP & RECOVERY

### Automated Backup Script
```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="/backups/resam-dansos"
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
SOURCE="/var/www/dansos"

# Create backup
tar -czf "$BACKUP_DIR/dansos_$DATE.tar.gz" "$SOURCE"

# Keep only last 30 days
find "$BACKUP_DIR" -type f -mtime +30 -delete

echo "Backup completed: dansos_$DATE.tar.gz"
```

### Restore from Backup
```bash
# Extract backup
tar -xzf dansos_2026-04-12_10-30-45.tar.gz -C /var/www/

# Verify
ls -la /var/www/dansos
```

---

## 🔟 CHECKLIST DEPLOYMENT

### Pre-Deployment
- [ ] Semua files ter-upload dengan benar
- [ ] Links berfungsi (internal dan external)
- [ ] Mobile responsive tested
- [ ] Performance tested (load time < 3s)
- [ ] SEO setup (sitemap.xml, robots.txt)
- [ ] SSL/HTTPS enabled
- [ ] Contact info updated
- [ ] Email forms tested
- [ ] 404 page setup
- [ ] Analytics configured

### Post-Deployment
- [ ] Monitor uptime
- [ ] Check error logs
- [ ] Test forms submission
- [ ] Verify all external links
- [ ] Check mobile compatibility
- [ ] Monitor performance
- [ ] Setup automated backups
- [ ] Enable auto-renewal SSL
- [ ] Document access credentials
- [ ] Create runbook

---

## 📞 SUPPORT & TROUBLESHOOTING

### Common Issues

**Site not accessible**
```bash
# Check web server status
sudo systemctl status apache2
# or
sudo systemctl status nginx

# Check firewall
sudo ufw status
```

**SSL Certificate Error**
```bash
# Renew certificate
sudo certbot renew

# Or force renewal
sudo certbot renew --force-renewal
```

**High load/slow site**
```bash
# Check server resources
top
free -h
df -h

# Check error logs
tail -f /var/log/apache2/error.log
```

---

## Deployment Complete! 🎉

Selamat! Aplikasi RESAM & DANSOS Anda sudah live!

Untuk monitoring dan maintenance, lihat README.md section "Maintenance".

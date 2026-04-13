# Setup Google Sheets API Access

Untuk mengakses data dari Google Sheets, Anda perlu:

1. **Google API Key** (untuk public read access):
   - Buka [Google Cloud Console](https://console.cloud.google.com/)
   - Buat project baru atau pilih existing project
   - Enable Google Sheets API
   - Buat API Key di Credentials
   - Ganti `AIzaSyDummyKeyForPublicAccess` di `googleSheetConfig.apiKey` dengan API key Anda

2. **Publish Google Sheet to Web** (alternatif tanpa API key):
   - Buka Google Sheet
   - File > Share > Publish to web
   - Pilih sheet yang ingin dipublish
   - Copy URL dan gunakan untuk load data

3. **Sheet Structure** yang diharapkan:
   - **Summary**: Metric | Value
     - Total Pemasukan | 315447000
     - Total Pengeluaran | 308654194
     - Saldo Akhir | 6792806
     - Jumlah Pegawai | 95
     - Rata-rata Iuran | 3320000
     - Periode Data | Mei 2023 - Maret 2026

   - **Monthly**: Month | Saldo | Pengeluaran | Pemasukan
     - Mei'23 | 3475000 | 0 | 3475000
     - Jun'23 | 3475000 | 0 | 100000
     - ...

   - **Categories**: Category | Amount
     - Kegiatan Kebersamaan | 45000000
     - Konsumsi | 35000000
     - ...

   - **Grades**: Grade | Amount
     - 15 | 175000
     - 12 | 125000
     - ...

   - **Transactions**: Tanggal | Uraian | Rincian | Kredit | Debit | Saldo
     - 16-Mei-2023 | Dana resam (TK Mei 2024) | nan | 3475000 | 0 | 3475000
     - ...

4. **Fallback**: Jika API key tidak tersedia, sistem akan menggunakan data fallback yang ada di kode.

5. **Testing**: Untuk test lokal, pastikan Google Sheet di-share sebagai "Anyone with link can view".
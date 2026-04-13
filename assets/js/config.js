/**
 * RESAM & DANSOS Configuration
 * Edit file ini untuk menyesuaikan informasi aplikasi
 */

const CONFIG = {
    // Info Organisasi
    organization: {
        name: "BPS Provinsi Kepulauan Bangka Belitung",
        short_name: "RESAM & DANSOS",
        location: "Pangkal Pinang, Kepulauan Bangka Belitung",
        website: "https://resam-bps.vercel.app/"
    },

    // Contact Information
    contact: {
        resam_email: "resam@bps.go.id",
        dansos_email: "dansos@bps.go.id",
        phone: "+62-xyz-xxxx",
        hours: "Senin - Jumat, 08:00 - 16:00 WITA"
    },

    // External Links
    external_links: {
        resam_data: "http://s.bps.go.id/RESAM1900",
        dansos_data: "http://s.bps.go.id/dansosBabelBPS",
        main_website: "https://resam-bps.vercel.app/"
    },

    // Theme Colors
    colors: {
        primary: "#0284c7",      // Biru RESAM
        primary_dark: "#0369a1",
        secondary: "#e11d48",    // Merah DANSOS
        secondary_dark: "#be123c",
        success: "#059669",
        warning: "#d97706",
        text_dark: "#1e293b",
        text_light: "#64748b",
        bg_light: "#f8fafc"
    },

    // Social Media (untuk future use)
    social_media: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#"
    },

    // RESAM Info
    resam: {
        name: "RESAM",
        full_name: "Dari Kite Untuk Same-Same",
        description: "Urunan seluruh pegawai BPS Provinsi Kep. Bangka Belitung untuk kegiatan kebersamaan",
        icon: "fa-hands-helping",
        color: "primary"
    },

    // DANSOS Info
    dansos: {
        name: "DANSOS",
        full_name: "Dana Sosial",
        description: "Dana untuk membantu pegawai dan mendukung kegiatan sosial lingkungan BPS",
        icon: "fa-heart",
        color: "secondary"
    },

    // Features
    features: [
        {
            title: "Data Terstruktur",
            description: "Akses data RESAM dan DANSOS yang terorganisir dengan baik",
            icon: "fa-database",
            color: "blue"
        },
        {
            title: "Aman & Terpercaya",
            description: "Informasi dikelola dengan standar keamanan tinggi",
            icon: "fa-lock",
            color: "green"
        },
        {
            title: "Responsif",
            description: "Dapat diakses dari berbagai perangkat",
            icon: "fa-mobile-alt",
            color: "purple"
        },
        {
            title: "Download Data",
            description: "Mudah mengakses dan mengunduh data terkini",
            icon: "fa-file-download",
            color: "orange"
        }
    ],

    // Statistics
    statistics: [
        {
            number: "100%",
            label: "Transparansi",
            description: "Data dikelola dengan penuh transparansi"
        },
        {
            number: "24/7",
            label: "Akses",
            description: "Akses informasi kapan saja diperlukan"
        },
        {
            number: "∞",
            label: "Dukungan",
            description: "Komitmen berkelanjutan untuk semua pegawai"
        }
    ],

    // Meta Tags
    meta: {
        description: "Platform digital manajemen RESAM dan DANSOS untuk BPS Provinsi Kepulauan Bangka Belitung",
        keywords: "RESAM, DANSOS, BPS, Bangka Belitung, sosial, kebersamaan",
        author: "BPS Provinsi Kepulauan Bangka Belitung",
        language: "id"
    },

    // Version & Info
    version: "1.0.0",
    last_updated: "2026-04-12",
    copyright_year: "2026"
};

// Utility Functions
const UTILS = {
    // Format mata uang
    formatCurrency: function(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    },

    // Format tanggal
    formatDate: function(date) {
        return new Intl.DateTimeFormat('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    },

    // Get greeting based on time
    getGreeting: function() {
        const hour = new Date().getHours();
        if (hour < 12) return "Selamat pagi";
        if (hour < 15) return "Selamat siang";
        if (hour < 19) return "Selamat sore";
        return "Selamat malam";
    },

    // Validate email
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Copy to clipboard
    copyToClipboard: function(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert("Copied: " + text);
        });
    }
};

// Initialize
window.CONFIG = CONFIG;
window.UTILS = UTILS;
console.log("Configuration loaded successfully");

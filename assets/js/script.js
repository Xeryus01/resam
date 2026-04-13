// ====== VERCEL ANALYTICS & SPEED INSIGHTS ======
import { inject } from "@vercel/analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";

inject();

// Initialize Speed Insights for the current page
if (typeof window !== 'undefined') {
    // SpeedInsights is typically used in Next.js, but we can initialize it for static sites
    console.log('Vercel Analytics and Speed Insights initialized');
}

// ====== LOAD DATA FROM GOOGLE SHEETS ======
async function loadDataFromGoogleSheets() {
    try {
        console.log('Loading data from Google Sheets...');

        // Use public Google Sheets API (no authentication needed for public sheets)
        const apiKey = googleSheetConfig.apiKey || 'AIzaSyDummyKeyForPublicAccess'; // Will need real API key
        const spreadsheetId = googleSheetConfig.spreadsheetId;

        // Load different sheets
        const [summaryData, monthlyData, categoryData, gradeData, excelData] = await Promise.all([
            loadSheetData(spreadsheetId, googleSheetConfig.sheetNames.summary, apiKey),
            loadSheetData(spreadsheetId, googleSheetConfig.sheetNames.monthly, apiKey),
            loadSheetData(spreadsheetId, googleSheetConfig.sheetNames.categories, apiKey),
            loadSheetData(spreadsheetId, googleSheetConfig.sheetNames.grades, apiKey),
            loadSheetData(spreadsheetId, googleSheetConfig.sheetNames.transactions, apiKey)
        ]);

        // Transform data to match expected format
        const resamData = transformSheetDataToResamFormat(summaryData, monthlyData, categoryData, gradeData);
        const excelDataFormatted = transformSheetDataToExcelFormat(excelData);

        console.log('Data loaded successfully from Google Sheets');
        return { resamData, excelData: excelDataFormatted };

    } catch (error) {
        console.error('Failed to load data from Google Sheets:', error);
        throw error;
    }
}

async function loadSheetData(spreadsheetId, sheetName, apiKey) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            // If API key is not set or invalid, try alternative approach
            if (response.status === 403 || response.status === 400) {
                console.warn(`API key required for sheet ${sheetName}. Using fallback data.`);
                return getFallbackSheetData(sheetName);
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.values || [];
    } catch (error) {
        console.error(`Error loading sheet ${sheetName}:`, error);
        return getFallbackSheetData(sheetName);
    }
}

function getFallbackSheetData(sheetName) {
    // Return fallback data based on sheet name
    switch (sheetName) {
        case 'Summary':
            return [
                ['Metric', 'Value'],
                ['Total Pemasukan', 315447000],
                ['Total Pengeluaran', 308654194],
                ['Saldo Akhir', 6792806],
                ['Jumlah Pegawai', 95],
                ['Rata-rata Iuran', 3320000],
                ['Periode Data', 'Mei 2023 - Maret 2026']
            ];
        case 'Monthly':
            return [
                ['Month', 'Saldo', 'Pengeluaran', 'Pemasukan'],
                ["Mei'23", 3475000, 0, 3475000],
                ["Jun'23", 3475000, 0, 100000],
                ["Jul'23", 6438000, 0, 3625000],
                ["Ags'23", 8801000, 1787000, 3625000],
                ["Sep'23", 11232000, 2117000, 3635000],
                ["Okt'23", 12043500, 0, 3635000],
                ["Nov'23", 15578500, 0, 3535000],
                ["Des'23", 14639950, 0, 3735000],
                ["Jan'24", 12391450, 0, 3760000],
                ["Feb'24", 11639450, 1662000, 3760000],
                ["Mar'24", 10639450, 0, 4020000],
                ["Apr'24", 12737450, 0, 3905000],
                ["Mei'24", 12737450, 0, 4080000],
                ["Jun'24", 1014050, 11723400, 3905000],
                ["Jul'24", 4919050, 0, 3905000],
                ["Ags'24", 5902050, 0, 3905000],
                ["Sep'24", 4405106, 1996106, 3905000],
                ["Okt'24", 6372306, 0, 3940000],
                ["Nov'24", 10282306, 0, 3910000],
                ["Des'24", 10397306, 0, 4025000],
                ["Jan'25", 7259806, 0, 2455000],
                ["Feb'25", 6539806, 4661000, 3560000],
                ["Mar'25", 3793806, 3000000, 4130000],
                ["Apr'25", 1878806, 150000, 3905000],
                ["Mei'25", 1728806, 0, 4080000],
                ["Jun'25", 6372306, 0, 3905000],
                ["Jul'25", 4267106, 579000, 3905000],
                ["Ags'25", 2263106, 3030944, 3905000],
                ["Sep'25", 4405106, 729500, 3905000],
                ["Okt'25", 6372306, 652800, 3940000],
                ["Nov'25", 7025106, 0, 3910000],
                ["Des'25", 6372306, 0, 4025000],
                ["Jan'26", 7259806, 0, 2455000],
                ["Feb'26", 1878806, 4661000, 3560000],
                ["Mar'26", 793806, 3000000, 4130000]
            ];
        case 'Categories':
            return [
                ['Category', 'Amount'],
                ['Kegiatan Kebersamaan', 45000000],
                ['Konsumsi', 35000000],
                ['Peralatan Acara', 12000000],
                ['Transportasi', 8000000],
                ['Upah Jasa', 2000000],
                ['Dana Sosial', 65000000],
                ['Lainnya', 141654194]
            ];
        case 'Grades':
            return [
                ['Grade', 'Amount'],
                [15, 175000],
                [12, 125000],
                [11, 100000],
                [10, 75000],
                [9, 50000],
                [8, 40000],
                [7, 30000],
                [6, 25000],
                [5, 20000],
                [4, 20000],
                [3, 20000],
                [2, 15000],
                [1, 15000]
            ];
        case 'Transactions':
            return [
                ['Tanggal', 'Uraian', 'Rincian', 'Kredit', 'Debit', 'Saldo'],
                ['16-Mei-2023', 'Dana resam (TK Mei 2024)', 'nan', 3475000, 0, 3475000],
                ['16-Mei-2023', 'Konsumsi Bubur Kacang Ijo', '400000', 0, 0, 3475000],
                ['16-Mei-2023', 'Konsumsi Gorengan', '300000', 0, 0, 3475000],
                ['16-Mei-2023', 'Air Mineral 2 Dus', '42000', 0, 0, 3475000],
                ['16-Mei-2023', 'Gelas Plastik', '20000', 0, 0, 3475000],
                ['16-Mei-2023', 'Kegiatan Jumat Bersih 17 Mei 2024', 'nan', 0, 762000, 2713000]
            ];
        default:
            return [];
    }
}

function transformSheetDataToResamFormat(summaryRows, monthlyRows, categoryRows, gradeRows) {
    // Transform summary data
    const summary = {
        totalPemasukan: parseNumber(summaryRows[1]?.[1] || 0),
        totalPengeluaran: parseNumber(summaryRows[2]?.[1] || 0),
        saldoAkhir: parseNumber(summaryRows[3]?.[1] || 0),
        jumlahPegawai: parseNumber(summaryRows[4]?.[1] || 95),
        rataRataIuran: parseNumber(summaryRows[5]?.[1] || 3320000),
        periodeData: summaryRows[6]?.[1] || "Mei 2023 - Maret 2026"
    };

    // Transform monthly data (assuming columns: Month, Saldo, Pengeluaran, Pemasukan)
    const pengeluaranBulanan = {
        bulan: [],
        saldo: [],
        pengeluaran: [],
        pemasukan: []
    };

    for (let i = 1; i < monthlyRows.length; i++) {
        const row = monthlyRows[i];
        if (row && row.length >= 4) {
            pengeluaranBulanan.bulan.push(row[0] || '');
            pengeluaranBulanan.saldo.push(parseNumber(row[1] || 0));
            pengeluaranBulanan.pengeluaran.push(parseNumber(row[2] || 0));
            pengeluaranBulanan.pemasukan.push(parseNumber(row[3] || 0));
        }
    }

    // Transform category data (assuming columns: Category, Amount)
    const kategoriPengeluaran = {
        labels: [],
        data: []
    };

    for (let i = 1; i < categoryRows.length; i++) {
        const row = categoryRows[i];
        if (row && row.length >= 2) {
            kategoriPengeluaran.labels.push(row[0] || '');
            kategoriPengeluaran.data.push(parseNumber(row[1] || 0));
        }
    }

    // Transform grade data (assuming columns: Grade, Amount)
    const iuranPerGrade = {};
    for (let i = 1; i < gradeRows.length; i++) {
        const row = gradeRows[i];
        if (row && row.length >= 2) {
            const gradeKey = `grade${row[0]}`;
            iuranPerGrade[gradeKey] = parseNumber(row[1] || 0);
        }
    }

    return {
        summary,
        pengeluaranBulanan,
        kategoriPengeluaran,
        iuranPerGrade,
        rateKegiatanSosial: [], // Keep empty or load from another sheet if needed
        perkembanganSaldo: [] // Keep empty or load from another sheet if needed
    };
}

function transformSheetDataToExcelFormat(excelRows) {
    // Transform transaction data (assuming columns: Tanggal, Uraian, Rincian, Kredit, Debit, Saldo)
    const pengeluaran = [];

    for (let i = 1; i < excelRows.length; i++) {
        const row = excelRows[i];
        if (row && row.length >= 6) {
            pengeluaran.push({
                Tanggal: row[0] || '',
                Uraian: row[1] || '',
                Rincian: row[2] || '',
                Kredit: parseNumber(row[3] || 0),
                Debit: parseNumber(row[4] || 0),
                Saldo: parseNumber(row[5] || 0)
            });
        }
    }

    return {
        pengeluaran,
        events: [] // Keep empty or load from another sheet if needed
    };
}

function parseNumber(value) {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
        // Remove currency symbols, commas, and spaces
        const cleaned = value.replace(/[Rp\s\.,]/g, '');
        const num = parseFloat(cleaned);
        return isNaN(num) ? 0 : num;
    }
    return 0;
}

// ====== NAVBAR MOBILE MENU ====== 
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navbarMenu = document.getElementById('navbarMenu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = navbarMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navbarMenu.classList.remove('active');
            });
        });
    }

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.07)';
        }
    });

    // Initialize dashboard data after page load
    initDashboard();
});

// ====== SMOOTH SCROLL FOR ANCHOR LINKS ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ====== ACTIVE NAV LINK ======
function updateActiveLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('[id]');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ====== INTERSECTION OBSERVER FOR ANIMATIONS ======
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.6s ease forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .program-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ====== FALLBACK DATA (in case JSON files fail to load) ======
const fallbackResamData = {
    "summary": {
        "totalPemasukan": 315447000,
        "totalPengeluaran": 308654194,
        "saldoAkhir": 6792806,
        "jumlahPegawai": 95,
        "rataRataIuran": 3320000,
        "periodeData": "Mei 2023 - Maret 2026"
    },
    "pengeluaranBulanan": {
        "bulan": ["Mei'23", "Jun'23", "Jul'23", "Ags'23", "Sep'23", "Okt'23", "Nov'23", "Des'23", "Jan'24", "Feb'24", "Mar'24", "Apr'24", "Mei'24", "Jun'24", "Jul'24", "Ags'24", "Sep'24", "Okt'24", "Nov'24", "Des'24", "Jan'25", "Feb'25", "Mar'25", "Apr'25", "Mei'25", "Jun'25", "Jul'25", "Ags'25", "Sep'25", "Okt'25", "Nov'25", "Des'25", "Jan'26", "Feb'26", "Mar'26"],
        "saldo": [3475000, 3475000, 6438000, 8801000, 11232000, 12043500, 15578500, 14639950, 12391450, 11639450, 10639450, 12737450, 12737450, 1014050, 4919050, 5902050, 4405106, 6372306, 10282306, 10397306, 7259806, 6539806, 3793806, 1878806, 1728806, 6372306, 4267106, 2263106, 4405106, 6372306, 7025106, 6372306, 7259806, 1878806, 793806],
        "pengeluaran": [0, 0, 0, 1787000, 2117000, 0, 0, 0, 0, 1662000, 0, 0, 0, 11723400, 0, 0, 1996106, 0, 0, 0, 0, 4661000, 3000000, 150000, 0, 0, 579000, 3030944, 729500, 652800, 0, 0, 0, 4661000, 3000000],
        "pemasukan": [3475000, 100000, 3625000, 3625000, 3635000, 3635000, 3535000, 3735000, 3760000, 3760000, 4020000, 3905000, 4080000, 3905000, 3905000, 3905000, 3905000, 3940000, 3910000, 4025000, 2455000, 3560000, 4130000, 3905000, 4080000, 3905000, 3905000, 3905000, 3905000, 3940000, 3910000, 4025000, 2455000, 3560000, 4130000]
    },
    "kategoriPengeluaran": {
        "labels": ["Kegiatan Kebersamaan", "Konsumsi", "Peralatan Acara", "Transportasi", "Upah Jasa", "Dana Sosial", "Lainnya"],
        "data": [45000000, 35000000, 12000000, 8000000, 2000000, 65000000, 141654194]
    },
    "iuranPerGrade": {
        "grade15": 175000,
        "grade12": 125000,
        "grade11": 100000,
        "grade10": 75000,
        "grade9": 50000,
        "grade8": 40000,
        "grade7": 30000,
        "grade6": 25000,
        "grade5": 20000,
        "grade4": 20000,
        "grade3": 20000,
        "grade2": 15000,
        "grade1": 15000
    }
};

const fallbackExcelData = {
    "pengeluaran": [
        {"Tanggal": "16-Mei-2023", "Uraian": "Dana resam (TK Mei 2024)", "Rincian": "nan", "Kredit": 3475000, "Debit": 0, "Saldo": 3475000},
        {"Tanggal": "16-Mei-2023", "Uraian": "Kegiatan Jumat Bersih 17 Mei 2024", "Rincian": "nan", "Kredit": 0, "Debit": 762000, "Saldo": 2713000}
    ],
    "events": []
};
let currentFilterYear = 'all';
let saldoChartInstance = null;
let pengeluaranChartInstance = null;
let excelTableState = {
    rows: [],
    filteredRows: [],
    currentPage: 1,
    pageSize: 10,
    sortColumn: null,
    sortAsc: true,
    filterText: ''
};
const googleSheetConfig = {
    apiKey: 'AIzaSyDummyKeyForPublicAccess', // Replace with your actual Google API key for production
    clientId: '', // Not needed for read-only public access
    discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    scope: "https://www.googleapis.com/auth/spreadsheets",
    spreadsheetId: "1WXdKVjv4aqQpEAIkr_BrT-HKUG3EGO06",
    sheetNames: {
        summary: "Summary",
        monthly: "Monthly",
        categories: "Categories",
        grades: "Grades",
        transactions: "Transactions"
    }
};
let googleAuthInstance = null;
let googleSheetsLoaded = false;

// ====== DYNAMIC DATA TABLE ======
function initTable(tableSelector) {
    const table = document.querySelector(tableSelector);
    if (!table) return;

    // Add alternating row colors
    applyRowStripes(table);

    // Add sort functionality once per header
    const headers = table.querySelectorAll('thead th');
    headers.forEach((header, index) => {
        header.style.cursor = 'pointer';
        if (header.dataset.sortAttached) return;
        header.addEventListener('click', function() {
            if (table.id === 'excelTable') {
                sortTableByColumn(index);
            } else {
                sortTable(table, index);
            }
        });
        header.dataset.sortAttached = 'true';
    });
}

function sortTable(table, columnIndex) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent.trim();
        const bValue = b.cells[columnIndex].textContent.trim();
        
        // Try numeric sort first
        const aNum = parseFloat(aValue);
        const bNum = parseFloat(bValue);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return aNum - bNum;
        }
        
        // Fall back to string sort
        return aValue.localeCompare(bValue);
    });
    
    rows.forEach(row => tbody.appendChild(row));
}

// ====== SEARCH FUNCTIONALITY ======
function initSearch(inputSelector, tableSelector) {
    const searchInput = document.querySelector(inputSelector);
    const table = document.querySelector(tableSelector);
    
    if (!searchInput || !table) return;
    if (searchInput.dataset.searchAttached) return;

    searchInput.addEventListener('keyup', function() {
        const filter = this.value.toLowerCase();
        applyTableFilter(filter);
    });
    searchInput.dataset.searchAttached = 'true';
}

// ====== COPY TO CLIPBOARD ======
function copyToClipboard(text, buttonElement) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = buttonElement.textContent;
        buttonElement.textContent = 'Copied!';
        setTimeout(() => {
            buttonElement.textContent = originalText;
        }, 2000);
    });
}

// ====== FORMAT CURRENCY ======
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// ====== STATISTICS COUNTER ANIMATION ======
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const startTime = Date.now();

    function update() {
        current += increment;
        if (current < target) {
    let data = await loadData('assets/data/resam-data.json');
    let excelData = await loadData('assets/data/resam-excel.json');

    // Use fallback data if loading fails
    if (!data) {
        console.warn('Using fallback data for resam-data.json');
        data = fallbackResamData;
    }

    if (!excelData) {
        console.warn('Using fallback data for resam-excel.json');
        excelData = fallbackExcelData
        const baseUrl = window.location.origin;
        const fullUrl = url.startsWith('http') ? url : `${baseUrl}/${url}`;

        const response = await fetch(fullUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading data from:', url, error);

        // Fallback: try relative path
        try {
            const response = await fetch(url);
            if (response.ok) {
                return await response.json();
            }
        } catch (fallbackError) {
            console.error('Fallback also failed:', fallbackError);
        }

        return null;
    }
}

async function initDashboard() {
    console.log('Initializing dashboard...');

    try {
        // Try to load from Google Sheets first
        const sheetData = await loadDataFromGoogleSheets();
        allResamData = sheetData.resamData;
        excelDataGlobal = sheetData.excelData;
        console.log('Data loaded from Google Sheets successfully');

    } catch (error) {
        console.warn('Failed to load from Google Sheets, using fallback data:', error);

        // Fallback to local JSON files
        let data = await loadData('assets/data/resam-data.json');
        let excelData = await loadData('assets/data/resam-excel.json');

        // Use hardcoded fallback if JSON fails
        if (!data) {
            console.warn('Using fallback data for resam-data.json');
            data = fallbackResamData;
        }

        if (!excelData) {
            console.warn('Using fallback data for resam-excel.json');
            excelData = fallbackExcelData;
        }

        allResamData = data;
        excelDataGlobal = excelData;
    }

    try {
        const years = buildYearOptions(allResamData.pengeluaranBulanan?.bulan || []);
        renderYearFilterOptions(years);
        setYearFilterListener();
        updateDashboardForYear('all');
        initGoogleSheets();
        console.log('Dashboard initialized successfully');
    } catch (error) {
        console.error('Error initializing dashboard:', error);
        showDataLoadError('Terjadi kesalahan saat memproses data. Silakan refresh halaman.');
    }
}

function showDataLoadError(message) {
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ef4444;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        font-family: 'Inter', sans-serif;
    `;
    errorDiv.innerHTML = `
        <strong>Data Load Error</strong><br>
        ${message}
        <button onclick="this.parentElement.remove()" style="
            margin-top: 10px;
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
        ">Tutup</button>
    `;
    document.body.appendChild(errorDiv);

    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (errorDiv.parentElement) {
            errorDiv.remove();
        }
    }, 10000);
}

async function initGoogleSheets() {
    if (!window.gapi) return;

    try {
        await new Promise(resolve => gapi.load('client:auth2', resolve));
        await gapi.client.init({
            apiKey: googleSheetConfig.apiKey,
            clientId: googleSheetConfig.clientId,
            discoveryDocs: googleSheetConfig.discoveryDocs,
            scope: googleSheetConfig.scope
        });

        googleAuthInstance = gapi.auth2.getAuthInstance();
        googleSheetsLoaded = true;
        updateGoogleSyncButton();
    } catch (error) {
        console.error('Google Sheets API gagal diinisialisasi:', error);
    }
}

function updateGoogleSyncButton() {
    const syncButton = document.getElementById('syncSheetBtn');
    if (!syncButton) return;

    if (googleSheetsLoaded && googleAuthInstance && googleAuthInstance.isSignedIn.get()) {
        syncButton.textContent = 'Sinkronisasi Google Sheet (Signed in)';
    } else {
        syncButton.textContent = 'Sinkronisasi Google Sheet';
    }
}

function getTableRowsFromDom() {
    const tbody = document.querySelector('#excelTable tbody');
    if (!tbody) return [];

    return Array.from(tbody.querySelectorAll('tr'))
        .map(row => Array.from(row.querySelectorAll('td')).map(cell => cell.textContent.trim()))
        .filter(row => row.some(value => value !== ''));
}

function normalizeSheetValue(value, columnIndex) {
    if (columnIndex >= 3) {
        return value.replace(/[Rp\s\.\,]/g, '').trim();
    }
    return value;
}

async function saveTableChangesToSheet() {
    if (!googleSheetsLoaded || !googleAuthInstance) {
        alert('Google Sheets API belum siap. Pastikan API key dan OAuth client ID sudah dikonfigurasi.');
        return;
    }

    if (!googleAuthInstance.isSignedIn.get()) {
        await googleAuthInstance.signIn();
        updateGoogleSyncButton();
    }

    const rows = getTableRowsFromDom();
    const range = `${googleSheetConfig.sheetName}!A2:F`;
    const values = rows.map(row => row.map((cell, index) => normalizeSheetValue(cell || '', index)));

    try {
        await gapi.client.sheets.spreadsheets.values.clear({
            spreadsheetId: googleSheetConfig.spreadsheetId,
            range
        });

        await gapi.client.sheets.spreadsheets.values.update({
            spreadsheetId: googleSheetConfig.spreadsheetId,
            range,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values
            }
        });

        alert('Data berhasil disimpan ke Google Sheet.');
    } catch (error) {
        console.error('Gagal menyimpan ke Google Sheet:', error);
        alert('Gagal menyimpan ke Google Sheet. Cek konsol untuk detail.');
    }
}

function syncGoogleSheet() {
    if (!googleSheetsLoaded) {
        alert('Google Sheets API belum siap. Muat kembali halaman setelah mengonfigurasi API.');
        return;
    }

    if (!googleAuthInstance || !googleAuthInstance.isSignedIn.get()) {
        googleAuthInstance.signIn().then(() => {
            updateGoogleSyncButton();
            saveTableChangesToSheet();
        }).catch(error => console.error('Login Google gagal:', error));
        return;
    }

    saveTableChangesToSheet();
}

function addNewRow() {
    excelTableState.rows.push({
        Tanggal: '',
        Uraian: '',
        Rincian: '',
        Kredit: '',
        Debit: '',
        Saldo: ''
    });
    excelTableState.filteredRows = excelTableState.rows.slice();
    excelTableState.currentPage = Math.ceil(excelTableState.filteredRows.length / excelTableState.pageSize);
    renderTablePage();
    updatePaginationControls();
}

function buildYearOptions(labels) {
    const years = new Set(['all']);
    labels.forEach(label => {
        const yearMatch = label.match(/(\d{4})$/) || label.match(/'(\d{2})$/);
        if (yearMatch) {
            let year = yearMatch[1];
            if (year.length === 2) {
                year = `20${year}`;
            }
            years.add(year);
        }
    });
    return Array.from(years).sort((a, b) => {
        if (a === 'all') return -1;
        if (b === 'all') return 1;
        return a.localeCompare(b);
    });
}

function renderYearFilterOptions(years) {
    const select = document.getElementById('yearFilter');
    if (!select) return;
    select.innerHTML = years.map(year => {
        if (year === 'all') {
            return '<option value="all">Keseluruhan Periode</option>';
        }
        return `<option value="${year}">Tahun ${year}</option>`;
    }).join('');
}

function setYearFilterListener() {
    const select = document.getElementById('yearFilter');
    if (!select) return;
    if (select.dataset.listenerAttached) return;
    select.addEventListener('change', function() {
        updateDashboardForYear(this.value);
    });
    select.dataset.listenerAttached = 'true';
}

function updateDashboardForYear(year) {
    currentFilterYear = year;
    const data = allResamData;
    const excelData = excelDataGlobal;
    const filteredMonthly = filterMonthlyDataByYear(data.pengeluaranBulanan, year);
    const filteredExcelRows = filterExcelRowsByYear(excelData.pengeluaran || [], year);
    updateSummaryYearly(data.summary, filteredMonthly, year);
    renderHighlightCards(data.summary, excelData, filteredExcelRows, year);
    initChartSaldo(filteredMonthly);
    initChartPengeluaran(data.kategoriPengeluaran);
    renderEventSchedule(excelData.events || data.kegiatanUtama || [], year);
    renderRateGrid(data.iuranPerGrade);
    renderExcelTable(filteredExcelRows);
    initSearch('#searchExcel', '#excelTable');
    initTable('#excelTable');
    attachTableActions();
    initDataTableControls();
}

function filterMonthlyDataByYear(monthlyData, year) {
    if (!monthlyData) {
        return { bulan: [], saldo: [], pengeluaran: [], pemasukan: [] };
    }
    if (year === 'all') return monthlyData;

    const result = { bulan: [], saldo: [], pengeluaran: [], pemasukan: [] };
    monthlyData.bulan.forEach((label, index) => {
        const rowYear = parseYearFromLabel(label);
        if (rowYear === year) {
            result.bulan.push(label);
            result.saldo.push(monthlyData.saldo[index] || 0);
            result.pengeluaran.push(monthlyData.pengeluaran[index] || 0);
            result.pemasukan.push(monthlyData.pemasukan[index] || 0);
        }
    });
    return result;
}

function filterExcelRowsByYear(rows, year) {
    if (year === 'all') return rows;
    return rows.filter(row => parseYearFromLabel(row.Tanggal) === year);
}

function parseYearFromLabel(label) {
    if (!label) return null;
    const cleaned = String(label).trim();
    const fullYear = cleaned.match(/(20\d{2})$/);
    if (fullYear) return fullYear[1];
    const shortYear = cleaned.match(/'(\d{2})$/);
    if (shortYear) return `20${shortYear[1]}`;
    const dateYear = cleaned.match(/(\d{4})/);
    return dateYear ? dateYear[1] : null;
}

function updateSummaryYearly(summary, filteredMonthly, year) {
    if (year === 'all') {
        updateSummary(summary);
        return;
    }

    const totalPemasukan = (filteredMonthly.pemasukan || []).reduce((sum, value) => sum + Number(value || 0), 0);
    const totalPengeluaran = (filteredMonthly.pengeluaran || []).reduce((sum, value) => sum + Number(value || 0), 0);
    const saldoAkhir = filteredMonthly.saldo?.length ? Number(filteredMonthly.saldo[filteredMonthly.saldo.length - 1]) : summary.saldoAkhir;

    document.getElementById('totalPemasukan').textContent = formatCurrency(totalPemasukan);
    document.getElementById('totalPengeluaran').textContent = formatCurrency(totalPengeluaran);
    document.getElementById('saldoAkhir').textContent = formatCurrency(saldoAkhir);
    document.getElementById('jumlahPegawai').textContent = `${summary.jumlahPegawai} Pegawai`;
    document.getElementById('periodeData').textContent = `Tahun ${year}`;
}

function renderHighlightCards(summary, excelData, filteredExcelRows, year) {
    const grid = document.getElementById('highlightGrid');
    if (!grid) return;

    const rows = filteredExcelRows || (excelData.pengeluaran || []);
    const totalTransactions = rows.length;
    const totalDebit = rows.reduce((sum, row) => sum + (Number(row.Debit) || 0), 0);
    const lastSaldo = rows.length ? Number(rows[rows.length - 1].Saldo || 0) : summary.saldoAkhir;
    const topExpense = rows.filter(row => Number(row.Debit) > 0).sort((a, b) => Number(b.Debit) - Number(a.Debit))[0] || {};
    const topExpenseName = topExpense.Uraian || topExpense.Rincian || 'Belum tersedia';

    const cards = [
        {
            title: 'Transaksi Total',
            value: formatNumber(totalTransactions),
            meta: year === 'all' ? 'Jumlah baris transaksi dari Excel' : `Jumlah transaksi tahun ${year}`
        },
        {
            title: 'Pengeluaran Terbesar',
            value: topExpenseName,
            meta: topExpense.Debit ? formatCurrency(topExpense.Debit) : 'Belum tersedia'
        },
        {
            title: 'Total Beban Excel',
            value: formatCurrency(totalDebit),
            meta: year === 'all' ? 'Jumlah debit dari semua transaksi' : `Debit tahun ${year}`
        },
        {
            title: 'Saldo Terakhir',
            value: formatCurrency(lastSaldo),
            meta: year === 'all' ? 'Saldo akhir sheet Pengeluaran' : `Saldo akhir ${year}`
        }
    ];

    grid.innerHTML = cards.map(card => `
        <div class="highlight-card">
            <div class="highlight-title">${card.title}</div>
            <div class="highlight-number">${card.value}</div>
            <div class="highlight-meta">${card.meta}</div>
        </div>
    `).join('');
}

function renderEventSchedule(events, year) {
    const schedule = document.getElementById('eventSchedule');
    if (!schedule) return;

    const filtered = year === 'all' ? events : events.filter(event => parseYearFromLabel(event.tanggal) === year);
    if (!filtered.length) {
        schedule.innerHTML = '<p>Tidak ada jadwal kegiatan tersedia untuk periode ini.</p>';
        return;
    }

    schedule.innerHTML = filtered.slice(0, 6).map(event => `
        <div class="kegiatan-item">
            <div class="kegiatan-date">${event.tanggal || ''}</div>
            <div class="kegiatan-info">
                <div class="kegiatan-nama">${event.nama || event.kegiatan || 'Kegiatan RESAM'}</div>
                <div class="kegiatan-nominal">${event.pengeluaran ? formatCurrency(event.pengeluaran) : event.nominal ? formatCurrency(event.nominal) : ''}</div>
            </div>
        </div>
    `).join('');
}

function initChartSaldo(pengeluaranBulanan) {
    const ctx = document.getElementById('saldoChart');
    if (!ctx) return;
    if (saldoChartInstance) {
        saldoChartInstance.destroy();
    }

    const labels = pengeluaranBulanan.bulan || [];
    const pemasukanData = pengeluaranBulanan.pemasukan || [];
    const pengeluaranData = pengeluaranBulanan.pengeluaran || [];
    const saldoData = pengeluaranBulanan.saldo || [];

    saldoChartInstance = new Chart(ctx, {
        data: {
            labels,
            datasets: [
                {
                    label: 'Pemasukan Bulanan',
                    type: 'bar',
                    data: pemasukanData,
                    backgroundColor: 'rgba(16, 185, 129, 0.75)',
                    borderRadius: 6,
                    order: 1,
                    yAxisID: 'y'
                },
                {
                    label: 'Pengeluaran Bulanan',
                    type: 'bar',
                    data: pengeluaranData,
                    backgroundColor: 'rgba(225, 29, 72, 0.75)',
                    borderRadius: 6,
                    order: 1,
                    yAxisID: 'y'
                },
                {
                    label: 'Saldo RESAM',
                    type: 'line',
                    data: saldoData,
                    borderColor: '#0284c7',
                    backgroundColor: 'rgba(2, 132, 199, 0.15)',
                    fill: true,
                    tension: 0.35,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#0284c7',
                    order: 2,
                    yAxisID: 'y'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#475569'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: context => `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: '#475569'
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    stacked: false,
                    ticks: {
                        callback: value => formatCurrency(value),
                        color: '#475569'
                    }
                }
            },
            onClick(evt, activeElements) {
                if (activeElements.length > 0) {
                    const index = activeElements[0].index;
                    updateChartDetailsPanel({
                        type: 'monthly',
                        index,
                        labels,
                        data: { pemasukan: pemasukanData, pengeluaran: pengeluaranData, saldo: saldoData }
                    });
                }
            }
        }
    });

    updateChartDetailsPanel({
        type: 'monthly',
        index: labels.length - 1,
        labels,
        data: { pemasukan: pemasukanData, pengeluaran: pengeluaranData, saldo: saldoData }
    });
}

function initChartPengeluaran(kategoriPengeluaran) {
    const ctx = document.getElementById('pengeluaranChart');
    if (!ctx) return;
    if (pengeluaranChartInstance) {
        pengeluaranChartInstance.destroy();
    }

    pengeluaranChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: kategoriPengeluaran.labels,
            datasets: [{
                data: kategoriPengeluaran.data,
                backgroundColor: ['#0284c7', '#e11d48', '#10b981', '#f59e0b', '#8b5cf6', '#14b8a6', '#64748b'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#475569'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: context => `${context.label}: ${formatCurrency(context.parsed)} (${Math.round(context.raw / kategoriPengeluaran.data.reduce((a, b) => a + b, 0) * 100)}%)`
                    }
                }
            },
            onClick(evt, activeElements) {
                if (activeElements.length > 0) {
                    const index = activeElements[0].index;
                    updateChartDetailsPanel({
                        type: 'category',
                        index,
                        labels: kategoriPengeluaran.labels,
                        data: kategoriPengeluaran.data
                    });
                }
            }
        }
    });
}

function updateChartDetailsPanel(info) {
    const panel = document.getElementById('chartDetailsPanel');
    if (!panel) return;

    if (info.type === 'monthly') {
        const month = info.labels[info.index] || 'Periode';
        const pemasukan = Number(info.data.pemasukan[info.index] || 0);
        const pengeluaran = Number(info.data.pengeluaran[info.index] || 0);
        const saldo = Number(info.data.saldo[info.index] || 0);

        panel.innerHTML = `
            <div class="chart-details-title">Detail Bulanan RESAM - ${month}</div>
            <div class="chart-details-content">
                <div><span>Pemasukan</span>${formatCurrency(pemasukan)}</div>
                <div><span>Pengeluaran</span>${formatCurrency(pengeluaran)}</div>
                <div><span>Saldo Akhir</span>${formatCurrency(saldo)}</div>
                <div><span>Tip</span>Klik titik grafik atau kategori untuk melihat detail data RESAM.</div>
            </div>
        `;
    } else if (info.type === 'category') {
        const category = info.labels[info.index] || 'Kategori';
        const amount = Number(info.data[info.index] || 0);
        const total = info.data.reduce((sum, value) => sum + Number(value || 0), 0);
        const percent = total ? Math.round((amount / total) * 100) : 0;

        panel.innerHTML = `
            <div class="chart-details-title">Detail Kategori Pengeluaran</div>
            <div class="chart-details-content">
                <div><span>Kategori</span>${category}</div>
                <div><span>Nilai</span>${formatCurrency(amount)}</div>
                <div><span>Bagian dari total</span>${percent}%</div>
                <div><span>Tip</span>Gunakan klik pada donat untuk melihat kontribusi setiap kategori.</div>
            </div>
        `;
    }
}

function formatNumber(value) {
    return new Intl.NumberFormat('id-ID').format(value);
}

function updateSummary(summary) {
    document.getElementById('totalPemasukan').textContent = formatCurrency(summary.totalPemasukan);
    document.getElementById('totalPengeluaran').textContent = formatCurrency(summary.totalPengeluaran);
    document.getElementById('saldoAkhir').textContent = formatCurrency(summary.saldoAkhir);
    document.getElementById('jumlahPegawai').textContent = `${summary.jumlahPegawai} Pegawai`;
    document.getElementById('periodeData').textContent = summary.periodeData;
}

function renderRateGrid(rates) {
    const container = document.getElementById('rateGrid');
    if (!container) return;

    container.innerHTML = Object.entries(rates).map(([key, value]) => {
        const label = key.replace(/grade/i, 'Grade ');
        return `
            <div class="rate-item">
                <div class="grade-label">${label}</div>
                <div class="grade-nominal">${formatCurrency(value)}</div>
            </div>
        `;
    }).join('');
}

function renderExcelTable(rows) {
    excelTableState.rows = rows.slice();
    excelTableState.filterText = '';
    excelTableState.sortColumn = null;
    excelTableState.sortAsc = true;
    excelTableState.currentPage = 1;
    excelTableState.filteredRows = rows.slice();
    renderTablePage();
    updatePaginationControls();
}

function renderTablePage() {
    const tbody = document.querySelector('#excelTable tbody');
    if (!tbody) return;

    const start = (excelTableState.currentPage - 1) * excelTableState.pageSize;
    const pageRows = excelTableState.filteredRows.slice(start, start + excelTableState.pageSize);

    if (!pageRows.length) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 20px;">Tidak ada data yang sesuai.</td></tr>';
    } else {
        tbody.innerHTML = pageRows.map(row => `
            <tr>
                <td ${editMode ? 'contenteditable="true" class="editable-cell"' : ''}>${row.Tanggal || ''}</td>
                <td ${editMode ? 'contenteditable="true" class="editable-cell"' : ''}>${row.Uraian || ''}</td>
                <td ${editMode ? 'contenteditable="true" class="editable-cell"' : ''}>${row.Rincian || ''}</td>
                <td ${editMode ? 'contenteditable="true" class="editable-cell"' : ''}>${row.Kredit ? formatCurrency(row.Kredit) : ''}</td>
                <td ${editMode ? 'contenteditable="true" class="editable-cell"' : ''}>${row.Debit ? formatCurrency(row.Debit) : ''}</td>
                <td ${editMode ? 'contenteditable="true" class="editable-cell"' : ''}>${row.Saldo ? formatCurrency(row.Saldo) : ''}</td>
            </tr>
        `).join('');
    }

    const table = document.querySelector('#excelTable');
    applyRowStripes(table);
}

function applyRowStripes(table) {
    if (!table) return;
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach((row, index) => {
        row.style.backgroundColor = index % 2 === 0 ? '#f8fafc' : 'white';
    });
}

function applyTableFilter(filter) {
    excelTableState.filterText = filter;
    excelTableState.filteredRows = excelTableState.rows.filter(row => {
        const text = `${row.Tanggal} ${row.Uraian} ${row.Rincian} ${row.Kredit} ${row.Debit} ${row.Saldo}`.toLowerCase();
        return text.includes(filter);
    });
    excelTableState.currentPage = 1;
    renderTablePage();
    updatePaginationControls();
}

function sortTableByColumn(columnIndex) {
    const keyMap = ['Tanggal', 'Uraian', 'Rincian', 'Kredit', 'Debit', 'Saldo'];
    const key = keyMap[columnIndex];
    if (!key) return;

    if (excelTableState.sortColumn === columnIndex) {
        excelTableState.sortAsc = !excelTableState.sortAsc;
    } else {
        excelTableState.sortColumn = columnIndex;
        excelTableState.sortAsc = true;
    }

    excelTableState.filteredRows.sort((a, b) => {
        const aValue = a[key] || '';
        const bValue = b[key] || '';
        const isNumeric = ['Kredit', 'Debit', 'Saldo'].includes(key);

        if (isNumeric) {
            const aNum = Number(aValue) || 0;
            const bNum = Number(bValue) || 0;
            return excelTableState.sortAsc ? aNum - bNum : bNum - aNum;
        }

        const aText = String(aValue).toLowerCase();
        const bText = String(bValue).toLowerCase();
        if (excelTableState.sortAsc) {
            return aText.localeCompare(bText, 'id');
        }
        return bText.localeCompare(aText, 'id');
    });

    excelTableState.currentPage = 1;
    renderTablePage();
    updatePaginationControls();
}

function initDataTableControls() {
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    const pageSizeSelect = document.getElementById('pageSizeSelect');

    if (prevButton && !prevButton.dataset.listenerAttached) {
        prevButton.addEventListener('click', () => {
            if (excelTableState.currentPage > 1) {
                excelTableState.currentPage -= 1;
                renderTablePage();
                updatePaginationControls();
            }
        });
        prevButton.dataset.listenerAttached = 'true';
    }

    if (nextButton && !nextButton.dataset.listenerAttached) {
        nextButton.addEventListener('click', () => {
            const maxPage = Math.ceil(excelTableState.filteredRows.length / excelTableState.pageSize) || 1;
            if (excelTableState.currentPage < maxPage) {
                excelTableState.currentPage += 1;
                renderTablePage();
                updatePaginationControls();
            }
        });
        nextButton.dataset.listenerAttached = 'true';
    }

    if (pageSizeSelect && !pageSizeSelect.dataset.listenerAttached) {
        pageSizeSelect.addEventListener('change', function() {
            excelTableState.pageSize = Number(this.value) || 10;
            excelTableState.currentPage = 1;
            renderTablePage();
            updatePaginationControls();
        });
        pageSizeSelect.dataset.listenerAttached = 'true';
    }
}

function updatePaginationControls() {
    const pageInfo = document.getElementById('pageInfo');
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    const maxPage = Math.ceil(excelTableState.filteredRows.length / excelTableState.pageSize) || 1;

    if (pageInfo) {
        pageInfo.textContent = `${excelTableState.currentPage} / ${maxPage}`;
    }
    if (prevButton) {
        prevButton.disabled = excelTableState.currentPage <= 1;
    }
    if (nextButton) {
        nextButton.disabled = excelTableState.currentPage >= maxPage;
    }
}

let editMode = false;

function attachTableActions() {
    const editButton = document.getElementById('toggleEditMode');
    const exportButton = document.getElementById('exportCsvBtn');

    const addRowButton = document.getElementById('addRowBtn');
    const syncButton = document.getElementById('syncSheetBtn');

    if (addRowButton && !addRowButton.dataset.listenerAttached) {
        addRowButton.addEventListener('click', addNewRow);
        addRowButton.dataset.listenerAttached = 'true';
    }

    if (editButton && !editButton.dataset.listenerAttached) {
        editButton.addEventListener('click', toggleEditMode);
        editButton.dataset.listenerAttached = 'true';
    }

    if (syncButton && !syncButton.dataset.listenerAttached) {
        syncButton.addEventListener('click', syncGoogleSheet);
        syncButton.dataset.listenerAttached = 'true';
    }

    if (exportButton && !exportButton.dataset.listenerAttached) {
        exportButton.addEventListener('click', exportTableToCsv);
        exportButton.dataset.listenerAttached = 'true';
    }
}

function toggleEditMode() {
    const tbody = document.querySelector('#excelTable tbody');
    if (!tbody) return;

    editMode = !editMode;
    tbody.querySelectorAll('td').forEach(td => {
        td.contentEditable = editMode ? 'true' : 'false';
        td.classList.toggle('editable-cell', editMode);
    });

    const editButton = document.getElementById('toggleEditMode');
    if (editButton) {
        editButton.textContent = editMode ? 'Simpan Edit' : 'Edit Data';
    }
}

function exportTableToCsv() {
    const table = document.getElementById('excelTable');
    if (!table) return;

    const rows = Array.from(table.querySelectorAll('tr')).map(row => {
        return Array.from(row.querySelectorAll('th, td')).map(cell => {
            const value = cell.textContent.trim().replace(/"/g, '""');
            return `"${value}"`;
        }).join(',');
    }).join('\n');

    const blob = new Blob([rows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'resam-excel-data.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
}

// ====== FORM VALIDATION ======
function validateForm(formSelector) {
    const form = document.querySelector(formSelector);
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const inputs = this.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#e11d48';
                isValid = false;
            } else {
                input.style.borderColor = '';
            }
        });

        if (isValid) {
            console.log('Form submitted');
            // Handle form submission
        }
    });
}

// ====== MODAL FUNCTIONS ======
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// ====== LAZY LOAD IMAGES ======
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// ====== PAGE SCROLL PROGRESS ======
function updateScrollProgress() {
    const scroll = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scroll / docHeight) * 100;
    
    // Apply to progress bar if exists
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

// ====== NOTIFICATION SYSTEM ======
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;

    if (type === 'success') {
        notification.style.background = '#059669';
    } else if (type === 'error') {
        notification.style.background = '#e11d48';
    } else if (type === 'warning') {
        notification.style.background = '#d97706';
    } else {
        notification.style.background = '#0284c7';
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, duration);
}


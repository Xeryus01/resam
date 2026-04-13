import pandas as pd, json
excel_file = r"c:\Users\BPS 1900\Downloads\Laporan RESAM BPS 2024-2025.xlsx"
df = pd.read_excel(excel_file, sheet_name='Pengeluaran', header=None)
header_row = None
for idx, row in df.iterrows():
    if row.astype(str).str.contains('Tanggal').any() and row.astype(str).str.contains('Uraian').any():
        header_row = idx
        break
print('header_row=', header_row)
header = df.iloc[header_row].tolist()
cols = [str(c).strip() if not pd.isna(c) else f'col_{i}' for i,c in enumerate(header)]
content = df.iloc[header_row+1:]
content.columns = cols
content = content.dropna(how='all').reset_index(drop=True)
rows=[]
for _, r in content.iterrows():
    rows.append({
        'Tanggal': str(r.get('Tanggal','')).strip(),
        'Uraian': str(r.get('Uraian','')).strip(),
        'Rincian': str(r.get('Rincian','')).strip(),
        'Kredit': int(r.get('Kredit',0)) if pd.notna(r.get('Kredit')) else 0,
        'Debit': int(r.get('Debit',0)) if pd.notna(r.get('Debit')) else 0,
        'Saldo': int(r.get('Saldo',0)) if pd.notna(r.get('Saldo')) else 0,
    })
print('len rows', len(rows))
out={'pengeluaran': rows,
     'events':[{'tanggal':'2025-03-21','kegiatan':'Buka Puasa Bersama','nominal':10175000},
               {'tanggal':'2026-02-10','kegiatan':'Pisah Sambut Kepala BPS','nominal':4661000},
               {'tanggal':'2025-08-25','kegiatan':'Lomba HUT RI ke-80','nominal':3030944},
               {'tanggal':'2024-08-07','kegiatan':'Kegiatan HUT17 Agustus 2024','nominal':2722000}],
     'highlight':{'note':'Data transaksi dan jadwal dari sheet Pengeluaran','tableRows':len(rows)}}
with open(r"c:\Users\BPS 1900\Documents\dansos\assets\data\resam-excel.json", 'w', encoding='utf-8') as f:
    json.dump(out, f, indent=2, ensure_ascii=False)
print('saved file')

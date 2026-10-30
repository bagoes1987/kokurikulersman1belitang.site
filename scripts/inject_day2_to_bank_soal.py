import json
import re
from day2_module_a import MODULE_A_QUESTIONS
from day2_module_b import MODULE_B_QUESTIONS
from day2_module_c import MODULE_C_QUESTIONS
from day2_module_d import MODULE_D_QUESTIONS
from day2_module_e import MODULE_E_QUESTIONS

day2_all = (
    MODULE_A_QUESTIONS +
    MODULE_B_QUESTIONS +
    MODULE_C_QUESTIONS +
    MODULE_D_QUESTIONS +
    MODULE_E_QUESTIONS
)

print(f"Total Soal Day 2 to inject: {len(day2_all)}")
assert len(day2_all) == 200

day2_indicators = [
  {
    "code": "A",
    "key": "modul_a_hakikat_budaya",
    "name": "Modul A: Hakikat Budaya & 7 Unsur Kebudayaan Universal",
    "desc": "Pengertian budaya (Koentjaraningrat/Tylor), wujud kebudayaan, 7 unsur universal, dan akulturasi multikultural di OKU Timur."
  },
  {
    "code": "B",
    "key": "modul_b_budaya_ekonomi_umkm",
    "name": "Modul B: Hubungan Budaya dengan Kegiatan Ekonomi, UMKM & Pekerjaan Formal",
    "desc": "Etos kerja, modal sosial gotong royong sambatan, Pasar Gumawang, UMKM pangan kemplang/rengginang, dan tenaga kerja formal."
  },
  {
    "code": "C",
    "key": "modul_c_agrikultur_unggulan",
    "name": "Modul C: Ragam Mata Pencaharian Sektor Agrikultur Unggulan",
    "desc": "Lumbung pangan padi sawah, rotasi palawija, perkebunan karet & sawit, budidaya patin, dan peternakan sapi perdesaan."
  },
  {
    "code": "D",
    "key": "modul_d_alsintan_irigasi",
    "name": "Modul D: Sistem Teknologi Alsintan Modern & Jaringan Irigasi",
    "desc": "Peralihan perkakas manual ke alsintan (traktor, transplanter, combine), efisiensi biaya, dan jaringan irigasi Bendung Perjaya."
  },
  {
    "code": "E",
    "key": "modul_e_inovasi_smart_farming",
    "name": "Modul E: Inovasi Penanaman, Pascapanen, Otomatisasi & Petani Cerdas",
    "desc": "Sistem jajar legowo, RMU modern/bed dryer, penekanan susut panen, adopsi drone sprayer, Katam BMKG, dan smart farming."
  }
]

file_path = "js/data/bank-soal-nonfieldtrip.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update header doc
old_header_target = "* Day 1: 200 Soal Pilihan Ganda (5 Indikator x 40 Soal)"
new_header_replace = "* Day 1: 200 Soal Pilihan Ganda (5 Indikator x 40 Soal)\n * Day 2: 200 Soal Pilihan Ganda (5 Modul x 40 Soal: Bloom C1-C5)"
if old_header_target in content:
    content = content.replace(old_header_target, new_header_replace, 1)

# 2. Inject window.NFT_BANK_SOAL_INDICATORS_DAY2
indicators_day2_js = "  window.NFT_BANK_SOAL_INDICATORS_DAY2 = " + json.dumps(day2_indicators, indent=2, ensure_ascii=False) + ";\n\n"
if "window.NFT_BANK_SOAL_INDICATORS_DAY2" not in content:
    # Sisipkan sebelum window.NFT_BANK_SOAL_CONFIG
    content = content.replace("  window.NFT_BANK_SOAL_CONFIG =", indicators_day2_js + "  window.NFT_BANK_SOAL_CONFIG =", 1)

# 3. Inject day 2 questions into window.NFT_BANK_SOAL_DAYS
day2_json_formatted = json.dumps(day2_all, indent=2, ensure_ascii=False)
# Indent day 2
day2_json_indented = "\n    2: " + day2_json_formatted

target_end_day1 = "]\n  };"
if target_end_day1 in content:
    replacement_days = "],\n" + day2_json_indented.strip() + "\n  };"
    content = content.replace(target_end_day1, replacement_days, 1)
else:
    # Alternative match
    target_end_day1_alt = "]\r\n  };"
    if target_end_day1_alt in content:
        replacement_days = "],\r\n" + day2_json_indented.strip() + "\r\n  };"
        content = content.replace(target_end_day1_alt, replacement_days, 1)
    else:
        raise Exception("Gagal menemukan target akhir Day 1 pada window.NFT_BANK_SOAL_DAYS!")

# 4. Update window.getNftBankSoalIndicators
old_get_ind = """  window.getNftBankSoalIndicators = function() {
    return window.NFT_BANK_SOAL_INDICATORS || [];
  };"""

new_get_ind = """  window.getNftBankSoalIndicators = function(dayNum) {
    dayNum = parseInt(dayNum) || 1;
    if (dayNum === 2 && window.NFT_BANK_SOAL_INDICATORS_DAY2) {
      return window.NFT_BANK_SOAL_INDICATORS_DAY2;
    }
    return window.NFT_BANK_SOAL_INDICATORS || [];
  };"""

if old_get_ind in content:
    content = content.replace(old_get_ind, new_get_ind, 1)
else:
    # normalisasi \r\n
    old_get_ind_crlf = old_get_ind.replace("\n", "\r\n")
    new_get_ind_crlf = new_get_ind.replace("\n", "\r\n")
    if old_get_ind_crlf in content:
        content = content.replace(old_get_ind_crlf, new_get_ind_crlf, 1)
    else:
        print("Peringatan: pattern getNftBankSoalIndicators tidak cocok persis, melakukan regex...")
        content = re.sub(
            r'window\.getNftBankSoalIndicators\s*=\s*function\(\)\s*\{[^}]*return\s+window\.NFT_BANK_SOAL_INDICATORS\s*\|\|\s*\[\];\s*\};',
            new_get_ind,
            content
        )

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Berhasil menyuntikkan 200 soal Day 2 ke dalam js/data/bank-soal-nonfieldtrip.js!")

import json
import re
from day2_module_a import MODULE_A_QUESTIONS
from day2_module_b import MODULE_B_QUESTIONS
from day2_module_c import MODULE_C_QUESTIONS
from day2_module_d import MODULE_D_QUESTIONS
from day2_module_e import MODULE_E_QUESTIONS

all_day2_questions = (
    MODULE_A_QUESTIONS +
    MODULE_B_QUESTIONS +
    MODULE_C_QUESTIONS +
    MODULE_D_QUESTIONS +
    MODULE_E_QUESTIONS
)

print(f"Total Soal Tergabung: {len(all_day2_questions)}")
assert len(all_day2_questions) == 200, "Jumlah soal harus tepat 200!"

# Validasi ID
for i, q in enumerate(all_day2_questions):
    expected_id = 201 + i
    assert q["id"] == expected_id, f"ID soal ke-{i+1} harus {expected_id}, tetapi {q['id']}"

# Validasi Distribusi Kognitif
cog_counts = {}
for q in all_day2_questions:
    cog = q["cognitiveLevel"]
    cog_counts[cog] = cog_counts.get(cog, 0) + 1
print("Distribusi Kognitif Total:", cog_counts)
assert cog_counts == {'C1': 40, 'C2': 40, 'C3': 40, 'C4': 40, 'C5': 40}, "Distribusi kognitif tidak seimbang!"

# Validasi Distribusi Kunci
key_counts = {}
for q in all_day2_questions:
    key = q["correct"]
    key_counts[key] = key_counts.get(key, 0) + 1
print("Distribusi Kunci Total:", key_counts)
assert key_counts == {'A': 40, 'B': 40, 'C': 40, 'D': 40, 'E': 40}, "Distribusi kunci jawaban tidak seimbang!"

# Validasi Tiap Soal
for q in all_day2_questions:
    assert len(q["options"]) == 5, f"Soal {q['id']} tidak memiliki 5 opsi!"
    keys = [opt["key"] for opt in q["options"]]
    assert keys == ['A', 'B', 'C', 'D', 'E'], f"Soal {q['id']} urutan key opsi salah: {keys}"
    assert q["correct"] in keys, f"Soal {q['id']} kunci tidak ada di opsi!"
    assert len(q["question"].strip()) > 10, f"Soal {q['id']} pertanyaan terlalu pendek!"
    assert len(q["explanation"].strip()) > 10, f"Soal {q['id']} pembahasan terlalu pendek!"

print("Semua 200 butir soal Day 2 VALID 100%!")

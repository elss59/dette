#!/usr/bin/env python3
import csv
import json
import re
import unicodedata
from pathlib import Path

INPUT = Path("data/dette.csv")
OUTPUT = Path("src/data/dette.generated.json")

TARGET_KEYS = [
    "produit",
    "parcours",
    "impactExperientiel",
    "dateDette",
    "figmaCible",
    "descriptionCible",
    "figmaIntermediaire",
    "descriptionIntermediaire",
    "videoProd",
    "descriptionProd",
    "raisonEcart",
    "impactUtilisateur",
    "commentaire",
    "accesVision",
    "titreVision",
]

EXACT_MAPPING = {
    "produit": "produit",
    "parcours": "parcours",
    "impact experientiel": "impactExperientiel",
    "date dette": "dateDette",
    "lien figma cible": "figmaCible",
    "lien figma inter": "figmaIntermediaire",
    "lien video prod": "videoProd",
    "raison de l'ecart": "raisonEcart",
    "commentaire raison de l'ecart": "commentaire",
    "acces vision": "accesVision",
    "titre vision": "titreVision",
}

PREFIX_MAPPING = [
    ('explain "version cible"', "descriptionCible"),
    ('explain "version intermediaire"', "descriptionIntermediaire"),
    ("explain ecart prod", "descriptionProd"),
    ("impact user", "impactUtilisateur"),
]


def normalize_header(value: str) -> str:
    cleaned = (value or "").replace("\ufeff", "")
    cleaned = cleaned.replace("\r", " ").replace("\n", " ")
    cleaned = cleaned.replace("’", "'")
    cleaned = re.sub(r"\s+", " ", cleaned).strip().lower()
    normalized = unicodedata.normalize("NFKD", cleaned)
    normalized = "".join(ch for ch in normalized if not unicodedata.combining(ch))
    return normalized


def target_key_from_header(raw_header: str):
    normalized = normalize_header(raw_header)

    if normalized in EXACT_MAPPING:
        return EXACT_MAPPING[normalized]

    for prefix, target in PREFIX_MAPPING:
        if normalized.startswith(prefix):
            return target

    return None


if not INPUT.exists():
    print(f"[dette:csv] Fichier introuvable: {INPUT}")
    raise SystemExit(0)

with INPUT.open("r", encoding="utf-8-sig", newline="") as file:
    reader = csv.reader(file, delimiter=";")

    try:
        raw_headers = next(reader)
    except StopIteration:
        OUTPUT.write_text("[]\n", encoding="utf-8")
        print(f"[dette:csv] Fichier vide, sortie écrite: {OUTPUT}")
        raise SystemExit(0)

    header_targets = [target_key_from_header(header) for header in raw_headers]
    entries = []

    for row in reader:
        if not any((cell or "").strip() for cell in row):
            continue

        padded = row + [""] * (len(raw_headers) - len(row))
        entry = {key: "" for key in TARGET_KEYS}

        for idx, cell_value in enumerate(padded[: len(raw_headers)]):
            target = header_targets[idx]
            if not target:
                continue
            entry[target] = (cell_value or "").strip()

        entries.append(entry)

OUTPUT.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"[dette:csv] {len(entries)} ligne(s) convertie(s) vers {OUTPUT}")

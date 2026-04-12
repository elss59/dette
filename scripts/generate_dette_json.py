#!/usr/bin/env python3
import csv
import json
from pathlib import Path
import unicodedata

SOURCE = Path('data/dette.csv')
OUTPUT = Path('src/data/detteDataset.json')

FIELDS = [
    'produit',
    'parcours',
    'impactExperientiel',
    'dateDette',
    'figmaCible',
    'descriptionCible',
    'figmaIntermediaire',
    'descriptionIntermediaire',
    'videoProd',
    'descriptionProd',
    'raisonEcart',
    'impactUtilisateur',
    'commentaire',
    'accesVision',
    'titreVision',
]

ALIASES = {
    'produit': {'produit', 'product', 'univers'},
    'parcours': {'parcours', 'journey'},
    'impactExperientiel': {'impactexperientiel', 'impact_experientiel', 'impact expérientiel'},
    'dateDette': {'datedette', 'date_dette', 'date'},
    'figmaCible': {'figmacible', 'figma_cible'},
    'descriptionCible': {'descriptioncible', 'description_cible'},
    'figmaIntermediaire': {'figmaintermediaire', 'figma_intermediaire', 'figma intermédiaire'},
    'descriptionIntermediaire': {'descriptionintermediaire', 'description_intermediaire', 'description intermédiaire'},
    'videoProd': {'videoprod', 'video_prod', 'video production'},
    'descriptionProd': {'descriptionprod', 'description_prod', 'description production'},
    'raisonEcart': {'raisonecart', 'raison_ecart', "raison de l'écart"},
    'impactUtilisateur': {'impactutilisateur', 'impact_utilisateur'},
    'commentaire': {'commentaire', 'comment'},
    'accesVision': {'accesvision', 'acces_vision', 'accès vision'},
    'titreVision': {'titrevision', 'titre_vision'},
}


def norm_key(value: str) -> str:
    text = unicodedata.normalize('NFKD', (value or ''))
    text = ''.join(ch for ch in text if not unicodedata.combining(ch))
    return ''.join(ch for ch in text.strip().lower() if ch.isalnum())


def norm_val(value):
    return (value or '').strip()


rows = []
if SOURCE.exists():
    with SOURCE.open('r', encoding='utf-8-sig', newline='') as f:
        sample = f.read(4096)
        f.seek(0)
        try:
            dialect = csv.Sniffer().sniff(sample, delimiters=';,|\t')
        except csv.Error:
            dialect = csv.excel
            dialect.delimiter = ';' if ';' in sample and ',' not in sample else ','

        reader = csv.DictReader(f, dialect=dialect)
        if reader.fieldnames is None:
            raise SystemExit(f'CSV vide ou entêtes absents: {SOURCE}')

        header_map = {norm_key(h): h for h in reader.fieldnames}

        resolved = {}
        for field in FIELDS:
            candidates = {norm_key(field), *{norm_key(alias) for alias in ALIASES.get(field, set())}}
            matched = next((header_map[c] for c in candidates if c in header_map), None)
            if matched is None:
                raise SystemExit(f'Colonne manquante dans {SOURCE}: {field}')
            resolved[field] = matched

        for line in reader:
            obj = {field: norm_val(line.get(source_col, '')) for field, source_col in resolved.items()}
            if any(obj.values()):
                rows.append(obj)
else:
    print(f"[WARN] Fichier source absent: {SOURCE.resolve()} (cwd={Path.cwd()}). Génération d'un dataset vide.")

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
OUTPUT.write_text(json.dumps(rows, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'JSON généré: {OUTPUT} ({len(rows)} lignes)')

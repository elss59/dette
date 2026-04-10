import detteRows from './detteDataset.json';

const normalize = (value, fallback = '') => (typeof value === 'string' ? value.trim() : value) || fallback;
const hasValue = (value) => typeof value === 'string' ? value.trim().length > 0 : Boolean(value);

const productOrder = ['ECP', 'APP', 'AFFILIATION', 'DISPENSE'];
const shortLabelMap = {
  ECP: 'ECP',
  APP: 'APP',
  AFFILIATION: 'Affiliation',
  DISPENSE: 'Dispense',
};

const uniqueProducts = Array.from(
  new Set(
    detteRows
      .map((row) => normalize(row.produit))
      .filter(Boolean),
  ),
);

const sortedProducts = [
  ...uniqueProducts.filter((p) => productOrder.includes(p)).sort((a, b) => productOrder.indexOf(a) - productOrder.indexOf(b)),
  ...uniqueProducts.filter((p) => !productOrder.includes(p)).sort((a, b) => a.localeCompare(b)),
];

export const PRODUCTS = sortedProducts.map((id) => ({
  id,
  label: id,
  short: shortLabelMap[id] ?? id,
  active: true,
}));

const grouped = new Map();
for (const row of detteRows) {
  const productId = normalize(row.produit);
  const parcoursLabel = normalize(row.parcours);
  if (!productId || !parcoursLabel) continue;

  const key = `${productId}::${parcoursLabel}`;
  if (!grouped.has(key)) {
    grouped.set(key, {
      id: `${productId.toLowerCase()}-${grouped.size + 1}`,
      univers: productId,
      label: parcoursLabel,
      entries: [],
    });
  }

  const entry = {
    produit: productId,
    parcours: parcoursLabel,
    impactExperientiel: normalize(row.impactExperientiel),
    dateDette: normalize(row.dateDette),
    figmaCible: normalize(row.figmaCible),
    descriptionCible: normalize(row.descriptionCible),
    figmaIntermediaire: normalize(row.figmaIntermediaire),
    descriptionIntermediaire: normalize(row.descriptionIntermediaire),
    videoProd: normalize(row.videoProd),
    descriptionProd: normalize(row.descriptionProd),
    raisonEcart: normalize(row.raisonEcart),
    impactUtilisateur: normalize(row.impactUtilisateur),
    commentaire: normalize(row.commentaire),
    accesVision: normalize(row.accesVision),
    titreVision: normalize(row.titreVision),
  };

  grouped.get(key).entries.push(entry);
}

export const parcoursData = Array.from(grouped.values());

export const recentUpdates = detteRows
  .filter((row) => hasValue(row.dateDette))
  .slice()
  .sort((a, b) => normalize(b.dateDette).localeCompare(normalize(a.dateDette)))
  .slice(0, 3)
  .map((row) => ({
    date: normalize(row.dateDette),
    product: normalize(row.produit),
    parcours: normalize(row.parcours),
    description: normalize(row.commentaire) || normalize(row.raisonEcart) || 'Mise à jour du parcours.',
  }));

export function getParcoursForProduct(productId) {
  return parcoursData.filter((p) => p.univers === productId);
}

export function getAllSuggestions() {
  return parcoursData.map((p) => {
    const prod = PRODUCTS.find((pr) => pr.id === p.univers);
    return {
      id: p.id,
      univers: p.univers,
      label: p.label,
      suggestionLabel: `${prod?.short ?? p.univers} — ${p.label}`,
    };
  });
}

export function getParcoursById(id) {
  return parcoursData.find((p) => p.id === id) ?? null;
}

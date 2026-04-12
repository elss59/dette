import generatedRows from "./dette.generated.json";

export const PRODUCTS = [
  { id: "ECP", label: "Espace Client Particulier", short: "ECP", active: true },
  { id: "APP", label: "Application Mobile", short: "APP", active: true },
  {
    id: "AFFILIATION_DISPENSE",
    label: "Affiliation & dispense",
    short: "Affiliation & dispense",
    active: false,
  },
];

const fallbackRows = [
  {
    produit: "ECP",
    parcours: "Création de compte et Onboarding",
    impactExperientiel: "OD",
    dateDette: "12/03/2026",
    figmaCible: "https://figma.com/design",
    descriptionCible: "Parcours fluide avec onboarding guidé.",
    figmaIntermediaire: "https://figma.com/inter",
    descriptionIntermediaire: "Simplification partielle du flow.",
    videoProd: "video.mp4",
    descriptionProd: "Flow fragmenté avec rupture login.",
    raisonEcart: "Contraintes SI et délais projet.",
    impactUtilisateur: "Perte de conversion + incompréhension.",
    commentaire: "Sujet critique à reprendre en V2.",
    accesVision: "https://figma.com/vision",
    titreVision: "Vision onboarding cible",
  },
  {
    produit: "ECP",
    parcours: "Création de compte et Onboarding",
    impactExperientiel: "AD",
    dateDette: "12/03/2026",
    figmaCible: "https://figma.com/design-ad",
    descriptionCible: "Parcours AD avec préremplissage des étapes clés.",
    figmaIntermediaire: "",
    descriptionIntermediaire: "",
    videoProd: "https://example.com/video-ad",
    descriptionProd: "Parcours AD livré sans reprise contextuelle.",
    raisonEcart: "Arbitrage planning en fin de sprint.",
    impactUtilisateur: "Risque d'abandon sur étape justificatif.",
    commentaire: "Prioriser une correction incrémentale en sprint prochain.",
    accesVision: "https://figma.com/vision-ad",
    titreVision: "Vision AD cible",
  },
  {
    produit: "APP",
    parcours: "Demander un remboursement",
    impactExperientiel: "OD",
    dateDette: "04/03/2026",
    figmaCible: "https://figma.com/remboursement",
    descriptionCible: "Tunnel simplifié en 3 étapes.",
    figmaIntermediaire: "",
    descriptionIntermediaire: "",
    videoProd: "https://example.com/remboursement-prod",
    descriptionProd: "Étape de confirmation absente en production.",
    raisonEcart: "Dépendance API non stabilisée.",
    impactUtilisateur: "Incertitude sur la bonne prise en compte.",
    commentaire: "Inclure un état de succès explicite.",
    accesVision: "",
    titreVision: "",
  },
  {
    produit: "Affiliation",
    parcours: "Affiliation",
    impactExperientiel: "OD",
    dateDette: "18/02/2026",
    figmaCible: "",
    descriptionCible: "",
    figmaIntermediaire: "",
    descriptionIntermediaire: "",
    videoProd: "",
    descriptionProd: "",
    raisonEcart: "",
    impactUtilisateur: "",
    commentaire: "",
    accesVision: "",
    titreVision: "",
  },
  {
    produit: "Dispense",
    parcours: "Dispense",
    impactExperientiel: "AD",
    dateDette: "18/02/2026",
    figmaCible: "",
    descriptionCible: "",
    figmaIntermediaire: "",
    descriptionIntermediaire: "",
    videoProd: "",
    descriptionProd: "",
    raisonEcart: "",
    impactUtilisateur: "",
    commentaire: "",
    accesVision: "",
    titreVision: "",
  },
];

const sourceRows = generatedRows.length > 0 ? generatedRows : fallbackRows;

const normalizeProduct = (rawProduct = "") => {
  const value = String(rawProduct).trim().toUpperCase();
  if (value === "AFFILIATION" || value === "DISPENSE") return "AFFILIATION_DISPENSE";
  return value;
};

const normalizeParcoursLabel = (rawParcours = "") => {
  const value = String(rawParcours).trim();
  if (["Affiliation", "Dispense"].includes(value)) return "Affiliation & dispense";
  return value || "Parcours non renseigné";
};

const deriveCaseLabel = (impactExperientiel = "") => {
  const upper = String(impactExperientiel).trim().toUpperCase();
  if (upper === "OD") return "Cas OD";
  if (upper === "AD") return "Cas AD";
  return upper ? `Cas ${upper}` : null;
};

const buildParcoursData = (rows) => {
  const grouped = new Map();

  rows.forEach((row, index) => {
    const univers = normalizeProduct(row.produit);
    const label = normalizeParcoursLabel(row.parcours);
    const key = `${univers}::${label}`;

    const cas = {
      id: `${key}::${index}`,
      label: deriveCaseLabel(row.impactExperientiel),
      impactExperientiel: row.impactExperientiel ?? "",
      dateDette: row.dateDette ?? "",
      figmaCible: row.figmaCible ?? "",
      descriptionCible: row.descriptionCible ?? "",
      figmaIntermediaire: row.figmaIntermediaire ?? "",
      descriptionIntermediaire: row.descriptionIntermediaire ?? "",
      videoProd: row.videoProd ?? "",
      descriptionProd: row.descriptionProd ?? "",
      raisonEcart: row.raisonEcart ?? "",
      impactUtilisateur: row.impactUtilisateur ?? "",
      commentaire: row.commentaire ?? "",
      accesVision: row.accesVision ?? "",
      titreVision: row.titreVision ?? "",
    };

    if (!grouped.has(key)) {
      grouped.set(key, {
        id: `parcours-${grouped.size + 1}`,
        univers,
        label,
        cas: [cas],
      });
    } else {
      grouped.get(key).cas.push(cas);
    }
  });

  return [...grouped.values()];
};

export const parcoursData = buildParcoursData(sourceRows);

export const recentUpdates = [
  {
    date: "12 avril 2026",
    product: "ECP",
    parcours: "Création de compte et Onboarding",
    description: "Maquettes cibles et réalisation production mises à jour avec analyse de dette.",
  },
  {
    date: "9 avril 2026",
    product: "APP",
    parcours: "Demander un remboursement",
    description: "Impact utilisateur consolidé avec commentaire d'arbitrage projet.",
  },
];

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

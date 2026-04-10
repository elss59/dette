// ─── Produits ─────────────────────────────────────────────────────────────────
export const PRODUCTS = [
  { id: "ECP",         label: "Espace Client Particulier", short: "ECP",         active: true },
  { id: "APP",         label: "Application Mobile",        short: "APP",         active: true },
  { id: "AFFILIATION_DISPENSE", label: "Affiliation & Dispense", short: "Affiliation & Dispense", active: true },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const emptyCas = (label) => ({
  label,
  intention_design:   "",
  version_intermediaire: "",
  livraison_production: "",
  nature_ecart:       "",
  impact_ux:          "",
  commentaire:        "",
  vision_title:       "",
  vision_url:         null,
  debt_date:          "",
  figma_url:          null,
  figma_inter_url:    null,
  production_video:   null,
});

/** Crée un parcours vide avec ses cas. Si aucun casLabels fourni → un seul cas sans label. */
const makeParcours = (id, univers, label, casLabels = []) => ({
  id,
  univers,
  label,
  cas: casLabels.length > 0
    ? casLabels.map(emptyCas)
    : [emptyCas(null)],
});

// ─── Données de parcours ──────────────────────────────────────────────────────
export const parcoursData = [
  // ── ECP ──────────────────────────────────────────────────────────────────────
  makeParcours("ecp-001", "ECP", "Création de compte et Onboarding",        ["Cas OD", "Cas AD"]),
  makeParcours("ecp-002", "ECP", "Demander un remboursement",               ["Cas nominal", "Cas anticipation de rejet"]),
  makeParcours("ecp-003", "ECP", "Suivre un remboursement",                 ["Cas remboursement fait", "Cas remboursement rejeté"]),
  makeParcours("ecp-004", "ECP", "Envoyer un devis",                        ["Cas nominal", "Cas devis dentaire en ligne"]),
  makeParcours("ecp-005", "ECP", "Comprendre mon contrat"),
  makeParcours("ecp-006", "ECP", "Visualiser mes infos personnelles"),
  makeParcours("ecp-007", "ECP", "Accéder à ma carte de tiers payant"),
  makeParcours("ecp-008", "ECP", "Faire évoluer ma couverture"),
  makeParcours("ecp-009", "ECP", "Cas divers",                              ["Dispensé", "Radié"]),
  makeParcours("ecp-010", "ECP", "Portabilité",                             ["Ouverture", "Renouvellement"]),
  makeParcours("ecp-011", "ECP", "MH m'accompagne"),

  // ── APP ──────────────────────────────────────────────────────────────────────
  makeParcours("app-001", "APP", "Création de compte et Onboarding",        ["Cas OD", "Cas AD"]),
  makeParcours("app-002", "APP", "Demander un remboursement",               ["Cas nominal", "Cas anticipation de rejet"]),
  makeParcours("app-003", "APP", "Suivre un remboursement",                 ["Cas remboursement fait", "Cas remboursement rejeté"]),
  makeParcours("app-004", "APP", "Envoyer un devis",                        ["Cas nominal", "Cas devis dentaire en ligne"]),
  makeParcours("app-005", "APP", "Comprendre mon contrat"),
  makeParcours("app-006", "APP", "Visualiser mes infos personnelles"),
  makeParcours("app-007", "APP", "Accéder à ma carte de tiers payant"),
  makeParcours("app-008", "APP", "Prendre RDV avec un médecin",             ["1ère fois", "Reprendre RDV"]),
  makeParcours("app-009", "APP", "MH m'accompagne"),

  // ── AFFILIATION ──────────────────────────────────────────────────────────────
  makeParcours("aff-001", "AFFILIATION", "Je fais mon affiliation"),
  makeParcours("aff-002", "AFFILIATION", "Je fais ma réaffiliation"),

  // ── DISPENSE ─────────────────────────────────────────────────────────────────
  makeParcours("dis-001", "DISPENSE", "Je demande une dispense"),
  makeParcours("dis-002", "DISPENSE", "Je renouvelle ma dispense"),
];

// ─── Dernières mises à jour (exemples fictifs) ────────────────────────────────
export const recentUpdates = [
  {
    date:        "28 mars 2025",
    product:     "ECP",
    parcours:    "Demander un remboursement",
    description: "Comparaison ajoutée pour le cas nominal — maquettes v2.3 vs production. Écart documenté sur le formulaire de saisie et le retour de confirmation.",
  },
  {
    date:        "21 mars 2025",
    product:     "APP",
    parcours:    "Accéder à ma carte de tiers payant",
    description: "Vidéo production ajoutée. Écart majeur identifié : le QR code dynamique prévu a été remplacé par un PDF statique non lisible en conditions réelles.",
  },
  {
    date:        "14 mars 2025",
    product:     "Affiliation",
    parcours:    "Je fais mon affiliation",
    description: "Premier parcours d'affiliation analysé. Intention design capturée, lien Figma ajouté. Livraison production en attente de validation.",
  },
];

// ─── Accesseurs ───────────────────────────────────────────────────────────────
export function getParcoursForProduct(productId) {
  if (productId === "AFFILIATION_DISPENSE") {
    return parcoursData.filter((p) => p.univers === "AFFILIATION" || p.univers === "DISPENSE");
  }
  return parcoursData.filter((p) => p.univers === productId);
}

export function getAllSuggestions() {
  return parcoursData.map((p) => {
    const prod = getProductMetaByUnivers(p.univers);
    return {
      id:              p.id,
      univers:         p.univers,
      label:           p.label,
      suggestionLabel: `${prod?.short ?? p.univers} — ${p.label}`,
    };
  });
}

export function getParcoursById(id) {
  return parcoursData.find((p) => p.id === id) ?? null;
}

export function getProductMetaByUnivers(univers) {
  if (univers === "AFFILIATION" || univers === "DISPENSE") {
    return PRODUCTS.find((pr) => pr.id === "AFFILIATION_DISPENSE");
  }
  return PRODUCTS.find((pr) => pr.id === univers);
}

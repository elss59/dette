export const PRODUCTS = [
  { id: "ECP", label: "Espace Client Particulier", short: "ECP", active: true, description: "Portail web destiné aux assurés particuliers" },
  { id: "APP", label: "Application Mobile", short: "APP", active: true, description: "Application iOS & Android pour les assurés" },
  { id: "ECE", label: "Espace Client Entreprise", short: "ECE", active: false, description: "Portail web destiné aux entreprises clientes" },
  { id: "MPE_PART", label: "MPE Particulier", short: "MPE Part.", active: false, description: "Module épargne particulier" },
  { id: "MPE_ENT", label: "MPE Entreprise", short: "MPE Ent.", active: false, description: "Module épargne entreprise" },
];

export const PRIORITY_CONFIG = {
  P1: { label: "P1", color: "bg-red-100 text-red-700 border-red-200", dot: "bg-red-500", description: "Critique" },
  P2: { label: "P2", color: "bg-amber-100 text-amber-700 border-amber-200", dot: "bg-amber-500", description: "Important" },
};

export const TYPE_CONFIG = {
  UX: { label: "UX", color: "bg-violet-100 text-violet-700 border-violet-200" },
  Fonctionnelle: { label: "Fonctionnelle", color: "bg-blue-100 text-blue-700 border-blue-200" },
  Tech: { label: "Tech", color: "bg-slate-100 text-slate-600 border-slate-200" },
};

export const debtItems = [
  // ─── ECP ──────────────────────────────────────────────────────────────────
  {
    id: "ecp-001",
    univers: "ECP",
    parcours: "Connexion & Accès",
    feature: "Première connexion & onboarding",
    priority: "P1",
    type_dette: "UX",
    impact: "Absence totale d'onboarding post-création de compte",
    insight: "L'utilisateur arrive sur un tableau de bord vide sans contextualisation ni guidage, générant confusion et sentiment d'abandon.",
    intention_design: "Un parcours d'onboarding en 4 écrans permettant de contextualiser les fonctionnalités clés, personnaliser l'espace et configurer les préférences de notification dès la première connexion. Chaque étape comportait une illustration, un titre clair et un call-to-action.",
    livraison_production: "Redirection directe vers le tableau de bord sans onboarding. L'utilisateur découvre un espace vide avec des blocs sans données et aucune invite d'action.",
    nature_ecart: "Suppression complète du parcours d'onboarding pour raisons de délais de livraison. Aucune alternative (tooltip, empty state guidé) n'a été mise en place en compensation.",
    impact_ux: "Taux d'abandon élevé lors de la première connexion. Incompréhension des fonctionnalités disponibles. Surcharge du support client avec des questions basiques sur la prise en main.",
  },
  {
    id: "ecp-002",
    univers: "ECP",
    parcours: "Connexion & Accès",
    feature: "Double authentification (2FA)",
    priority: "P2",
    type_dette: "UX",
    impact: "Parcours 2FA présenté comme une contrainte sans bénéfice explicité",
    insight: "L'activation de la double authentification génère de la friction inutile car le système ne communique pas sur sa valeur.",
    intention_design: "Un écran d'activation du 2FA avec mise en avant des bénéfices sécurité, un choix entre SMS et application d'authentification, et un flux de configuration en 3 étapes avec confirmation visuelle.",
    livraison_production: "Écran minimaliste demandant le numéro de téléphone sans contexte de sécurité, avec un seul canal (SMS). Message d'erreur peu clair en cas d'échec.",
    nature_ecart: "Implémentation partielle : seul le canal SMS a été développé. Le travail de communication autour des bénéfices n'a pas été intégré dans le développement.",
    impact_ux: "Taux d'activation du 2FA inférieur aux objectifs. Les utilisateurs perçoivent l'étape comme une formalité administrative plutôt qu'une fonctionnalité de protection.",
  },
  {
    id: "ecp-003",
    univers: "ECP",
    parcours: "Tableau de bord",
    feature: "Dashboard principal 360°",
    priority: "P1",
    type_dette: "UX",
    impact: "Vision 360° des contrats absente, informations fragmentées",
    insight: "L'utilisateur ne peut pas comprendre d'un coup d'œil l'état global de sa situation assurantielle.",
    intention_design: "Un tableau de bord synthétique avec une vue agrégée de tous les contrats actifs, les dernières opérations en cours, les alertes contextuelles et des accès rapides personnalisés selon le profil utilisateur.",
    livraison_production: "Page d'accueil avec des liens de navigation statiques vers les différentes rubriques. Aucune donnée synthétique affichée en page d'accueil. L'utilisateur doit naviguer pour trouver chaque information.",
    nature_ecart: "Absence totale de la logique d'agrégation côté backend. Le dashboard a été remplacé par un menu de navigation étendu, sans la dimension synthétique prévue.",
    impact_ux: "Multiplication des clics nécessaires pour évaluer sa situation. Sensation que l'espace client n'apporte pas de valeur ajoutée par rapport aux courriers papier.",
  },
  {
    id: "ecp-004",
    univers: "ECP",
    parcours: "Tableau de bord",
    feature: "Widgets dynamiques & alertes",
    priority: "P2",
    type_dette: "Fonctionnelle",
    impact: "Widgets interactifs remplacés par des liens statiques",
    insight: "L'espace client perd sa dimension proactive : aucune information contextuelle n'est poussée vers l'utilisateur.",
    intention_design: "Des widgets modulaires affichant en temps réel : le statut des derniers remboursements, les documents en attente, les échéances à venir et les alertes de santé. Chaque widget était cliquable et menait directement à l'action.",
    livraison_production: "Liens textuels statiques vers les rubriques, sans aucune donnée dynamique. Les alertes et notifications contextuelles ne sont pas présentes.",
    nature_ecart: "Le système de widgets a été jugé trop complexe à implémenter dans les délais. Aucune solution intermédiaire n'a été envisagée.",
    impact_ux: "L'espace client est perçu comme un simple annuaire de liens. La valeur proactive et personnalisée de la relation digitale n'est pas démontrée.",
  },
  {
    id: "ecp-005",
    univers: "ECP",
    parcours: "Remboursements",
    feature: "Suivi des remboursements",
    priority: "P1",
    type_dette: "Fonctionnelle",
    impact: "Timeline interactive remplacée par un tableau statique non filtrable",
    insight: "L'utilisateur ne peut pas suivre efficacement l'avancement de ses remboursements en cours, source d'anxiété et de contacts support.",
    intention_design: "Une timeline chronologique avec statuts visuels (En cours / Traité / Remboursé), filtres par période et par type de soin, indicateur de progression animé pour les dossiers en cours, et notification push quand un remboursement change de statut.",
    livraison_production: "Tableau statique paginé sans filtres ni tri. Les statuts sont affichés en texte brut. Aucune distinction visuelle entre les remboursements en cours et traités.",
    nature_ecart: "La logique de statuts temps réel n'a pas été connectée. Le composant timeline a été remplacé par un tableau HTML standard sans les fonctionnalités de filtrage.",
    impact_ux: "Incompréhension du statut des dossiers en cours. Volume élevé d'appels au service client pour connaître l'avancement d'un remboursement.",
  },
  {
    id: "ecp-006",
    univers: "ECP",
    parcours: "Remboursements",
    feature: "Détail d'un remboursement",
    priority: "P2",
    type_dette: "UX",
    impact: "Décomposition visuelle prise en charge / reste à charge absente",
    insight: "L'utilisateur ne comprend pas comment son remboursement a été calculé, ce qui génère des incompréhensions et des litiges.",
    intention_design: "Une vue détaillée avec une décomposition graphique circulaire ou en barres : montant total, part Malakoff Humanis, part Sécurité Sociale, reste à charge. Avec un récapitulatif en langage simple des raisons d'un éventuel remboursement partiel.",
    livraison_production: "Affichage d'un tableau de lignes chiffrées sans visualisation. Les colonnes ne sont pas suffisamment explicitées pour un utilisateur non expert.",
    nature_ecart: "Les composants graphiques de décomposition ont été écartés. Seule la vue tabulaire basique a été développée.",
    impact_ux: "Sentiment de manque de transparence. Contacts support pour comprendre la décomposition d'un remboursement. Perte de confiance dans le calcul.",
  },
  {
    id: "ecp-007",
    univers: "ECP",
    parcours: "Contrats & Garanties",
    feature: "Fiche garantie synthétique",
    priority: "P1",
    type_dette: "UX",
    impact: "Présentation des garanties non visualisée, contenu PDF brut affiché",
    insight: "La consultation des garanties est perçue comme complexe et opaque, l'utilisateur ne comprend pas ce dont il bénéficie.",
    intention_design: "Des fiches garantie structurées sous forme de cartes avec indicateurs visuels de niveau de couverture (bas/moyen/élevé), icônes par type de soin, et résumé en langage accessible. Chaque carte permettait de voir le niveau actuel vs le niveau maximum disponible.",
    livraison_production: "Affichage d'un tableau texte reproduisant les conditions générales. Densité d'information élevée sans hiérarchie visuelle. Pas d'indication du niveau de couverture en un coup d'œil.",
    nature_ecart: "Le système de cartes et d'indicateurs visuels a été remplacé par une reprise du document contractuel existant, sans re-conception éditoriale.",
    impact_ux: "Consultation difficile des garanties, impression de lire un contrat juridique. Les utilisateurs ne savent pas ce qu'ils peuvent se faire rembourser avant consultation médicale.",
  },
  {
    id: "ecp-008",
    univers: "ECP",
    parcours: "Contrats & Garanties",
    feature: "Comparateur de formules",
    priority: "P2",
    type_dette: "Fonctionnelle",
    impact: "Outil de comparaison entre formules non développé",
    insight: "L'utilisateur ne peut pas évaluer s'il est dans la bonne formule pour ses besoins, freinant les évolutions de contrat en self-service.",
    intention_design: "Un comparateur interactif permettant de visualiser en parallèle sa formule actuelle vs les formules disponibles, avec une simulation personnalisée basée sur les remboursements des 12 derniers mois.",
    livraison_production: "Lien vers un PDF de tableau comparatif générique, non personnalisé. Pas de simulation ni de personnalisation.",
    nature_ecart: "Fonctionnalité non développée. Le comparateur nécessitait l'accès aux données historiques de remboursement, jugé trop complexe à intégrer.",
    impact_ux: "Dépendance au canal téléphonique pour tout changement de formule. Manque à gagner sur les souscriptions digitales en self-service.",
  },
  {
    id: "ecp-009",
    univers: "ECP",
    parcours: "Documents",
    feature: "Gestion documentaire & upload",
    priority: "P2",
    type_dette: "UX",
    impact: "Upload de documents dégradé en formulaire basique sans feedback",
    insight: "L'envoi de justificatifs génère de l'incertitude : l'utilisateur ne sait pas si son document a bien été reçu et traité.",
    intention_design: "Un espace de dépôt de documents avec feedback visuel de progression (upload en temps réel), validation automatique du format et de la lisibilité, confirmation animée d'acceptation, et historique horodaté des envois.",
    livraison_production: "Formulaire avec champ de téléchargement standard. Pas de feedback sur la progression. Message de confirmation générique sans référence au document envoyé.",
    nature_ecart: "Le composant d'upload enrichi a été remplacé par un champ input natif. Aucune logique de validation côté client n'a été implémentée.",
    impact_ux: "Renvois multiples de documents par incertitude sur la réception. Contacts support pour confirmer la bonne réception des justificatifs.",
  },

  // ─── APP ──────────────────────────────────────────────────────────────────
  {
    id: "app-001",
    univers: "APP",
    parcours: "Onboarding",
    feature: "Premier lancement de l'app",
    priority: "P1",
    type_dette: "UX",
    impact: "Parcours onboarding en 4 étapes supprimé, arrivée directe sur le login",
    insight: "L'utilisateur ne comprend pas la valeur de l'application avant même de s'authentifier, réduisant la motivation à l'activation.",
    intention_design: "Un onboarding en 4 écrans de bienvenue illustrés présentant les fonctionnalités clés (carte de tiers payant, suivi remboursements, documents) avec des animations légères. Possibilité de passer les écrans ou de s'inscrire directement.",
    livraison_production: "Affichage direct de l'écran de login sans présentation de l'application. Aucune valorisation des fonctionnalités avant la connexion.",
    nature_ecart: "Le parcours onboarding a été retiré en fin de projet. Les écrans avaient été développés mais ont été désactivés pour 'simplifier le premier lancement'.",
    impact_ux: "Baisse du taux de conversion à l'installation. Les utilisateurs ne comprennent pas ce que l'app apporte en plus de l'espace web. Désinstallations précoces.",
  },
  {
    id: "app-002",
    univers: "APP",
    parcours: "Onboarding",
    feature: "Activation biométrie",
    priority: "P2",
    type_dette: "Fonctionnelle",
    impact: "Activation de la biométrie proposée trop tard et hors contexte",
    insight: "Le faible taux d'activation de la biométrie rend l'expérience de connexion récurrente plus fastidieuse que nécessaire.",
    intention_design: "Proposition d'activation de la biométrie (Face ID / Empreinte) à la fin du premier onboarding, avec explication claire des bénéfices et aperçu de la rapidité de connexion future.",
    livraison_production: "La biométrie est proposée lors de la 3ème connexion consécutive, dans un bottom sheet sans contexte ni explication des bénéfices.",
    nature_ecart: "Le déclenchement de l'invite biométrie a été repositionné pour des raisons techniques. La promesse de l'explication des bénéfices n'a pas été reprise.",
    impact_ux: "Taux d'activation de la biométrie en dessous des objectifs. Expérience de connexion perçue comme pénible, notamment pour les utilisateurs fréquents.",
  },
  {
    id: "app-003",
    univers: "APP",
    parcours: "Accueil",
    feature: "Home screen personnalisé",
    priority: "P1",
    type_dette: "UX",
    impact: "Accueil générique non personnalisé remplace le homescreen contextuel",
    insight: "L'application ne démontre pas sa valeur à chaque ouverture, réduisant l'engagement et la fréquence d'utilisation.",
    intention_design: "Un homescreen avec des modules contextuels adaptatifs : statut des remboursements en cours, carte de tiers payant accessible en 1 tap, alerte si un document est en attente, et accès rapide personnalisé selon l'historique de navigation.",
    livraison_production: "Liste fixe de 6 icônes de navigation identiques pour tous les utilisateurs, sans aucune donnée contextuelle ni personnalisation.",
    nature_ecart: "La couche de personnalisation a été jugée hors scope pour la V1. Le homescreen est une grille de raccourcis statiques identique pour tous.",
    impact_ux: "L'application n'apporte pas de valeur différenciante à l'ouverture. Utilisateurs qui retournent sur l'espace web faute d'une expérience mobile enrichie.",
  },
  {
    id: "app-004",
    univers: "APP",
    parcours: "Accueil",
    feature: "Navigation principale (bottom bar)",
    priority: "P1",
    type_dette: "UX",
    impact: "Architecture d'information dégradée, certaines sections enfouies",
    insight: "Les utilisateurs ne trouvent pas les fonctionnalités principales et doivent explorer l'application pour les localiser.",
    intention_design: "Une bottom navigation à 5 éléments clairement labellisés (Accueil, Remboursements, Carte, Documents, Profil) avec icônes et labels toujours visibles. Chaque onglet correspond à un parcours utilisateur clé identifié en recherche.",
    livraison_production: "Bottom navigation à 4 éléments avec un menu 'Plus' pour les sections secondaires. La carte de tiers payant et les documents sont accessibles uniquement depuis ce menu.",
    nature_ecart: "Réduction à 4 onglets pour des raisons de surface sur petits écrans. L'architecture d'information n'a pas été reconçue en conséquence : les éléments ont simplement été cachés.",
    impact_ux: "Taux de consultation de la carte de tiers payant inférieur aux objectifs. Navigation non intuitive pour les nouvelles fonctionnalités. Augmentation des erreurs de navigation.",
  },
  {
    id: "app-005",
    univers: "APP",
    parcours: "Services clés",
    feature: "Carte de tiers payant digitale",
    priority: "P1",
    type_dette: "Fonctionnelle",
    impact: "Carte digitale avec QR code remplacée par un PDF statique illisible",
    insight: "L'une des fonctionnalités les plus attendues de l'app (la carte dématérialisée) n'est pas utilisable en situation réelle.",
    intention_design: "Une carte digitale interactive affichant le numéro de sécurité sociale, les informations de mutuelle et un QR code dynamique généré à la volée pour la lecture en pharmacie. Possibilité de partager ou d'ajouter au wallet natif (Apple Wallet / Google Pay).",
    livraison_production: "Affichage d'un PDF de la carte papier scannée, non zoomable correctement et illisible en conditions d'éclairage difficiles. Pas de QR code, pas d'intégration wallet.",
    nature_ecart: "Le QR code dynamique et l'intégration wallet ont été déprioritisés. Le PDF a été retenu comme solution de secours mais n'a pas fait l'objet d'optimisation mobile.",
    impact_ux: "Inutilisabilité en pharmacie ou chez le médecin. Plainte récurrente des utilisateurs. Retour systématique à la carte physique, annulant la promesse de dématérialisation.",
  },
  {
    id: "app-006",
    univers: "APP",
    parcours: "Remboursements",
    feature: "Envoi de feuille de soins par photo",
    priority: "P1",
    type_dette: "UX",
    impact: "Flux de capture guidé remplacé par un uploader sans assistance",
    insight: "La prise en photo de feuilles de soins génère des erreurs fréquentes (flou, cadrage), entraînant des rejets et une expérience frustrante.",
    intention_design: "Un flux de capture photo avec cadre de guidage AR superposé au viseur, détection automatique de la lisibilité du document, retour haptique de validation, et confirmation OCR des informations clés extraites avant envoi.",
    livraison_production: "Ouverture directe de l'appareil photo ou du sélecteur de fichiers sans cadrage, sans validation et sans retour sur la qualité du document capturé.",
    nature_ecart: "Le guidage AR et la validation OCR n'ont pas été développés. L'uploader natif iOS/Android a été utilisé sans customisation.",
    impact_ux: "Taux de rejet élevé des feuilles de soins mal capturées. Délais de remboursement allongés. Frustration utilisateur face aux demandes de re-soumission.",
  },
  {
    id: "app-007",
    univers: "APP",
    parcours: "Remboursements",
    feature: "Notifications de suivi remboursement",
    priority: "P2",
    type_dette: "Fonctionnelle",
    impact: "Push notifications contextuelles non connectées au backend",
    insight: "L'utilisateur ne sait pas quand son remboursement avance, générant des ouvertures d'app par anxiété et des contacts support.",
    intention_design: "Des notifications push contextuelles et actionnables envoyées à chaque changement de statut d'un remboursement (Reçu, En traitement, Remboursé), avec deep link direct vers le détail du dossier concerné.",
    livraison_production: "Notifications push génériques hebdomadaires non liées à des événements spécifiques. Pas de deep link. L'utilisateur reçoit parfois une notification alors que tous ses dossiers sont traités.",
    nature_ecart: "La connexion entre le système de notifications et le backend de traitement des remboursements n'a pas été implémentée. Les notifications sont déclenchées par un cron job générique.",
    impact_ux: "Notifications perçues comme du spam, entraînant des désactivations. L'utilisateur perd confiance dans le système d'alertes de l'application.",
  },
  {
    id: "app-008",
    univers: "APP",
    parcours: "Engagement",
    feature: "Centre de notifications & préférences",
    priority: "P2",
    type_dette: "UX",
    impact: "Centre de notifications sans paramétrage granulaire possible",
    insight: "L'utilisateur ne peut pas contrôler les communications qu'il reçoit, conduisant à des désactivations globales des notifications.",
    intention_design: "Un centre de préférences de notifications permettant d'activer/désactiver finement chaque type d'alerte (remboursements, documents, rappels, offres), avec une vue historique de toutes les notifications reçues.",
    livraison_production: "Accès aux paramètres de notifications du système uniquement (tout ou rien via iOS/Android). Aucune gestion granulaire in-app. Pas d'historique des notifications.",
    nature_ecart: "Le centre de préférences in-app n'a pas été développé. Le système renvoie vers les paramètres natifs du téléphone comme seule option.",
    impact_ux: "Taux élevé de désactivation totale des notifications. Perte du canal d'engagement le plus efficace sur mobile. Impossibilité de distinguer les communications critiques des communications marketing.",
  },
];

export function getItemsByProduct(productId) {
  return debtItems.filter(
    (item) =>
      item.univers === productId &&
      (item.priority === "P1" || item.priority === "P2")
  );
}

export function groupByParcours(items) {
  return items.reduce((acc, item) => {
    if (!acc[item.parcours]) acc[item.parcours] = [];
    acc[item.parcours].push(item);
    return acc;
  }, {});
}

export function getStats(items) {
  const p1 = items.filter((i) => i.priority === "P1").length;
  const p2 = items.filter((i) => i.priority === "P2").length;
  const byType = items.reduce((acc, i) => {
    acc[i.type_dette] = (acc[i.type_dette] || 0) + 1;
    return acc;
  }, {});
  return { p1, p2, total: items.length, byType };
}

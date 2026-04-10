import { PriorityBadge, TypeBadge } from "./Badges";

/* ─ Media placeholder ───────────────────────────────────────────────────── */
function MediaPlaceholder({ variant }) {
  const isDesign = variant === "design";

  const wrapStyle = {
    borderRadius: 8,
    border: `2px dashed ${isDesign ? "rgba(85,20,199,0.3)" : "rgba(255,255,255,0.18)"}`,
    aspectRatio: "16/9",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: isDesign ? "rgba(238,231,249,0.55)" : "rgba(255,255,255,0.04)",
    position: "relative",
    overflow: "hidden",
    gap: 10,
    padding: 16,
  };

  return (
    <div style={wrapStyle}>
      {/* Subtle grid */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: isDesign ? 0.08 : 0.04 }} aria-hidden>
        <defs>
          <pattern id={`g-${variant}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={isDesign ? "#5514C7" : "#fff"} strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#g-${variant})`}/>
      </svg>

      {/* Icon */}
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: isDesign ? "rgba(85,20,199,0.12)" : "rgba(255,255,255,0.08)",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
      }}>
        {isDesign ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--violet_dark)" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M3 9h18M9 21V9"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        )}
      </div>

      {/* Label */}
      <div style={{ textAlign: "center", position: "relative" }}>
        <p className={`ds-bold titre-12 ${isDesign ? "" : "blanc"}`}
           style={!isDesign ? {} : { color: "var(--violet_dark)" }}>
          {isDesign ? "Maquette / Prototype Figma" : "Enregistrement Production"}
        </p>
        <p className="titre-12" style={{ color: isDesign ? "var(--violet_dark)" : "rgba(255,255,255,0.45)", opacity: 0.7, marginTop: 2 }}>
          {isDesign ? "Lier le livrable Figma" : "Ajouter une vidéo de l'existant"}
        </p>
      </div>

      {/* CTA */}
      <button
        className={isDesign ? "btn-secondaire-h40" : ""}
        style={!isDesign ? {
          background: "rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.8)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "2rem",
          height: 36,
          padding: "0 16px",
          fontSize: "0.8125rem",
          cursor: "pointer",
          fontFamily: '"poppins-regular", Arial, sans-serif',
        } : { position: "relative" }}
      >
        {isDesign ? "+ Lier Figma" : "+ Ajouter vidéo"}
      </button>
    </div>
  );
}

/* ─ Explain card ────────────────────────────────────────────────────────── */
function ExplainCard({ icon, label, text, bg, border, textColor, labelColor }) {
  return (
    <div className="dette-explain-card" style={{ background: bg, borderColor: border }}>
      <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
        <span style={{ fontSize: "1rem", lineHeight: 1 }}>{icon}</span>
        <span className="ds-bold titre-10 overline" style={{ color: labelColor }}>{label}</span>
      </div>
      <p className="titre-14" style={{ color: textColor, lineHeight: 1.55 }}>{text}</p>
    </div>
  );
}

/* ─ Gap indicator ───────────────────────────────────────────────────────── */
function GapIndicator({ priority, type }) {
  const score =
    priority === "P1"
      ? type === "UX" ? 95 : type === "Fonctionnelle" ? 85 : 75
      : type === "UX" ? 70 : type === "Fonctionnelle" ? 60 : 50;

  const fillColor =
    score >= 85 ? "var(--rouge_negatif)" : score >= 65 ? "var(--corail_mh_brand)" : "var(--jaune_dark)";
  const label =
    score >= 85 ? "Écart majeur" : score >= 65 ? "Écart significatif" : "Écart modéré";

  return (
    <div className="flex items-center gap-3">
      <span className="titre-12 gris_dark" style={{ width: 110, flexShrink: 0 }}>Niveau d'écart</span>
      <div className="dette-gap-track">
        <div className="dette-gap-fill" style={{ width: `${score}%`, background: fillColor }} />
      </div>
      <span className="ds-bold titre-12" style={{ color: fillColor, width: 148, textAlign: "right", flexShrink: 0 }}>
        {label} ({score}%)
      </span>
    </div>
  );
}

/* ─ Empty state ─────────────────────────────────────────────────────────── */
function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center" style={{ padding: 48, textAlign: "center", background: "var(--gris_background)" }}>
      <div style={{
        width: 64, height: 64, borderRadius: 16,
        background: "var(--blanc)",
        border: "2px dashed var(--gris_light)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 16,
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gris_dark)" strokeWidth="1.5" opacity="0.5">
          <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>
        </svg>
      </div>
      <p className="ds-bold titre-16 noir" style={{ marginBottom: 6 }}>Sélectionner une feature</p>
      <p className="titre-14 gris_dark" style={{ maxWidth: 280, lineHeight: 1.55 }}>
        Choisissez un élément dans la liste pour visualiser le comparatif Design vs Production.
      </p>
    </div>
  );
}

/* ─ Main component ──────────────────────────────────────────────────────── */
export default function FeatureDetail({ item, allItems, onNavigate }) {
  if (!item) return <EmptyState />;

  const currentIndex = allItems.findIndex((i) => i.id === item.id);
  const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextItem = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  const p1Cards = [
    {
      icon: "🎯", label: "Intention initiale",
      text: item.intention_design,
      bg: "var(--violet_pastel)", border: "rgba(85,20,199,0.15)",
      textColor: "var(--noir)", labelColor: "var(--violet_dark)",
    },
    {
      icon: "🔧", label: "Ce qui a été livré",
      text: item.livraison_production,
      bg: "var(--gris_sable_pastel)", border: "var(--gris_light)",
      textColor: "var(--noir)", labelColor: "var(--gris_dark)",
    },
    {
      icon: "⚡", label: "Nature de l'écart",
      text: item.nature_ecart,
      bg: item.priority === "P1" ? "var(--alerte_rouge_negatif)" : "var(--corail_pastel)",
      border: item.priority === "P1" ? "rgba(204,0,0,0.2)" : "rgba(226,37,12,0.15)",
      textColor: "var(--noir)",
      labelColor: item.priority === "P1" ? "var(--rouge_negatif)" : "var(--corail_mh_dark)",
    },
    {
      icon: "👤", label: "Impact utilisateur",
      text: item.impact_ux,
      bg: "var(--bleu_turquoise_pastel)", border: "rgba(0,130,153,0.15)",
      textColor: "var(--noir)", labelColor: "var(--bleu_turquoise_dark)",
    },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "var(--gris_background)" }}>

      {/* ── Feature header ── */}
      <div style={{ background: "var(--blanc)", borderBottom: "1px solid var(--gris_light)", padding: "16px 24px", flexShrink: 0 }}>
        <div className="flex items-start justify-between gap-4">
          {/* Left: breadcrumb + title */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="flex items-center gap-2 flex-wrap" style={{ marginBottom: 8 }}>
              <span className="gris_dark titre-12">{item.parcours}</span>
              <span className="gris_dark" style={{ opacity: 0.4 }}>›</span>
              <PriorityBadge priority={item.priority} />
              <TypeBadge type={item.type_dette} />
            </div>
            <p className="ds-bold titre-18 noir" style={{ marginBottom: 4, lineHeight: 1.3 }}>
              {item.feature}
            </p>
            <p className="titre-14 gris_dark" style={{ lineHeight: 1.5 }}>{item.impact}</p>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-1" style={{ flexShrink: 0 }}>
            <button
              onClick={() => prevItem && onNavigate(prevItem)}
              disabled={!prevItem}
              style={{
                width: 30, height: 30, borderRadius: 6,
                border: "1px solid var(--gris_light)",
                background: "var(--blanc)",
                cursor: prevItem ? "pointer" : "not-allowed",
                opacity: prevItem ? 1 : 0.3,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
              title={prevItem?.feature}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gris_dark)" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <span className="gris_dark titre-12" style={{ padding: "0 4px" }}>
              {currentIndex + 1}/{allItems.length}
            </span>
            <button
              onClick={() => nextItem && onNavigate(nextItem)}
              disabled={!nextItem}
              style={{
                width: 30, height: 30, borderRadius: 6,
                border: "1px solid var(--gris_light)",
                background: "var(--blanc)",
                cursor: nextItem ? "pointer" : "not-allowed",
                opacity: nextItem ? 1 : 0.3,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
              title={nextItem?.feature}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gris_dark)" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Gap indicator */}
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--gris_light)" }}>
          <GapIndicator priority={item.priority} type={item.type_dette} />
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto scrollbar-thin" style={{ padding: 24 }}>

        {/* ── Comparison: Design vs Production ── */}
        <div style={{ marginBottom: 24 }}>
          <p className="ds-bold titre-10 overline gris_dark" style={{ marginBottom: 12 }}>
            Comparatif — Intention Design vs Réalité Production
          </p>

          <div className="grid grid-cols-2 gap-4">
            {/* Design column */}
            <div>
              <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--violet_dark)", flexShrink: 0 }} />
                <span className="ds-bold titre-14" style={{ color: "var(--violet_dark)" }}>Intention Design</span>
                <span className="gris_dark titre-12" style={{ marginLeft: "auto", opacity: 0.6 }}>Figma</span>
              </div>
              <MediaPlaceholder variant="design" />
              <div style={{
                marginTop: 10, padding: "10px 12px",
                background: "var(--violet_pastel)",
                borderRadius: 8,
                border: "1px solid rgba(85,20,199,0.12)",
              }}>
                <p className="titre-12" style={{ color: "var(--violet_dark)", lineHeight: 1.6 }}>
                  {item.intention_design}
                </p>
              </div>
            </div>

            {/* Production column */}
            <div>
              <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--gris_dark)", flexShrink: 0 }} />
                <span className="ds-bold titre-14 noir">En Production</span>
                <span className="gris_dark titre-12" style={{ marginLeft: "auto", opacity: 0.6 }}>Vidéo</span>
              </div>
              <MediaPlaceholder variant="production" />
              <div style={{
                marginTop: 10, padding: "10px 12px",
                background: "var(--gris_sable_pastel)",
                borderRadius: 8,
                border: "1px solid var(--gris_light)",
              }}>
                <p className="titre-12 noir" style={{ lineHeight: 1.6 }}>
                  {item.livraison_production}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Analysis cards ── */}
        <div style={{ marginBottom: 24 }}>
          <p className="ds-bold titre-10 overline gris_dark" style={{ marginBottom: 12 }}>
            Analyse de la dette
          </p>
          <div className="grid grid-cols-2 gap-3">
            {p1Cards.map((c) => (
              <ExplainCard key={c.label} {...c} />
            ))}
          </div>
        </div>

        {/* ── Insight callout ── */}
        <div className="dette-insight">
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "rgba(0,130,153,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, marginTop: 2,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--bleu_turquoise_dark)" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
            </svg>
          </div>
          <div>
            <p className="ds-bold titre-10 overline" style={{ color: "var(--bleu_turquoise_dark)", marginBottom: 4 }}>
              Insight utilisateur
            </p>
            <p className="titre-14" style={{ color: "var(--bleu_turquoise_dark)", lineHeight: 1.6 }}>
              {item.insight}
            </p>
          </div>
        </div>

        {/* Bottom spacer */}
        <div style={{ height: 24 }} />
      </div>
    </div>
  );
}

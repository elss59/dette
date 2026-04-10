import { useState } from "react";

/* ── Placeholder média ─────────────────────────────────────────────────────── */
function MediaPlaceholder({ variant }) {
  const isDesign = variant === "design";
  return (
    <div className="dette-media-area" style={{
      background: isDesign ? "rgba(238,231,249,0.5)" : "rgba(255,255,255,0.03)",
    }}>
      {/* Grid décoratif */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }} aria-hidden>
        <defs>
          <pattern id={`g-${variant}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none"
              stroke={isDesign ? "#5514C7" : "#fff"} strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#g-${variant})`}/>
      </svg>

      {/* Icône */}
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: isDesign ? "rgba(85,20,199,0.1)" : "rgba(255,255,255,0.07)",
        display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
      }}>
        {isDesign ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="var(--violet_dark)" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M3 9h18M9 21V9"/>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,255,255,0.55)" strokeWidth="1.5">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        )}
      </div>

      {/* Texte + CTA */}
      <div style={{ textAlign: "center", position: "relative" }}>
        <p className={`ds-bold titre-12`}
          style={{ color: isDesign ? "var(--violet_dark)" : "rgba(255,255,255,0.6)", marginBottom: 2 }}>
          {isDesign ? "Maquette / Prototype Figma" : "Enregistrement Production"}
        </p>
        <p className="titre-12"
          style={{ color: isDesign ? "var(--violet_dark)" : "rgba(255,255,255,0.35)", opacity: 0.7 }}>
          {isDesign ? "Lier le livrable Figma" : "Ajouter une vidéo"}
        </p>
      </div>

      <button
        style={{
          position: "relative",
          borderRadius: "2rem",
          border: isDesign ? "1px solid rgba(85,20,199,0.3)" : "1px solid rgba(255,255,255,0.2)",
          background: isDesign ? "rgba(85,20,199,0.08)" : "rgba(255,255,255,0.07)",
          color: isDesign ? "var(--violet_dark)" : "rgba(255,255,255,0.7)",
          padding: "6px 14px",
          cursor: "pointer",
          fontFamily: '"poppins-regular", Arial, sans-serif',
          fontSize: "0.8125rem",
        }}
      >
        {isDesign ? "+ Lier Figma" : "+ Ajouter vidéo"}
      </button>
    </div>
  );
}

/* ── Carte d'explication ───────────────────────────────────────────────────── */
function ExplainCard({ icon, label, text, bg, border, labelColor }) {
  const isEmpty = !text || text.trim() === "";
  return (
    <div className="dette-explain-card" style={{ background: bg, borderColor: border }}>
      <div className="dette-explain-card-label" style={{ color: labelColor }}>
        <span>{icon}</span>
        {label}
      </div>
      {isEmpty ? (
        <p className="dette-explain-card-text" style={{ color: "var(--gris_dark)", fontStyle: "italic", opacity: 0.5 }}>
          À renseigner…
        </p>
      ) : (
        <p className="dette-explain-card-text">{text}</p>
      )}
    </div>
  );
}

/* ── Vue d'un cas (Design vs Production + explication) ─────────────────────── */
function CasView({ cas }) {
  const isEmpty = (val) => !val || val.trim() === "";

  const cards = [
    {
      icon: "🎯", label: "Intention initiale",
      text: cas.intention_design,
      bg: "var(--violet_pastel)", border: "rgba(85,20,199,0.15)",
      labelColor: "var(--violet_dark)",
    },
    {
      icon: "🔧", label: "Ce qui a été livré",
      text: cas.livraison_production,
      bg: "var(--gris_sable_pastel)", border: "var(--gris_light)",
      labelColor: "var(--gris_dark)",
    },
    {
      icon: "⚡", label: "Nature de l'écart",
      text: cas.nature_ecart,
      bg: "var(--corail_pastel)", border: "rgba(226,37,12,0.15)",
      labelColor: "var(--corail_mh_dark)",
    },
    {
      icon: "👤", label: "Impact utilisateur",
      text: cas.impact_ux,
      bg: "var(--bleu_turquoise_pastel)", border: "rgba(0,130,153,0.15)",
      labelColor: "var(--bleu_turquoise_dark)",
    },
  ];

  return (
    <>
      {/* Comparaison Design vs Production */}
      <p className="ds-bold titre-10 overline" style={{ color: "var(--gris_dark)", marginBottom: 12 }}>
        Comparatif — Intention Design vs Réalité Production
      </p>
      <div className="dette-comparison-grid">
        {/* Design */}
        <div className="dette-panel-design">
          <div className="dette-panel-header">
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--violet_dark)", flexShrink: 0 }} />
            <span className="ds-bold titre-14" style={{ color: "var(--violet_dark)" }}>Intention Design</span>
            <span className="titre-12" style={{ color: "var(--gris_dark)", marginLeft: "auto", opacity: 0.6 }}>Figma</span>
          </div>
          <MediaPlaceholder variant="design" />
          <div className="dette-panel-description" style={{ color: "var(--violet_dark)", background: "rgba(238,231,249,0.4)" }}>
            {isEmpty(cas.intention_design)
              ? <em style={{ opacity: 0.5 }}>Description à renseigner…</em>
              : cas.intention_design}
          </div>
        </div>

        {/* Production */}
        <div className="dette-panel-production">
          <div className="dette-panel-header-dark">
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.4)", flexShrink: 0 }} />
            <span className="ds-bold titre-14 blanc">En Production</span>
            <span className="titre-12" style={{ color: "rgba(255,255,255,0.4)", marginLeft: "auto" }}>Vidéo</span>
          </div>
          <MediaPlaceholder variant="production" />
          <div className="dette-panel-description" style={{ color: "rgba(255,255,255,0.65)", background: "rgba(255,255,255,0.04)" }}>
            {isEmpty(cas.livraison_production)
              ? <em style={{ opacity: 0.5 }}>Description à renseigner…</em>
              : cas.livraison_production}
          </div>
        </div>
      </div>

      {/* 4 cartes d'analyse */}
      <p className="ds-bold titre-10 overline" style={{ color: "var(--gris_dark)", marginBottom: 12 }}>
        Analyse de la dette
      </p>
      <div className="dette-explain-grid">
        {cards.map((c) => <ExplainCard key={c.label} {...c} />)}
      </div>

      {/* Insight */}
      <div className="dette-insight">
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: "rgba(0,130,153,0.12)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, marginTop: 2,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="var(--bleu_turquoise_dark)" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
          </svg>
        </div>
        <div>
          <p className="ds-bold titre-10 overline" style={{ color: "var(--bleu_turquoise_dark)", marginBottom: 4 }}>
            Insight utilisateur
          </p>
          {isEmpty(cas.insight)
            ? <p className="titre-14" style={{ color: "var(--bleu_turquoise_dark)", fontStyle: "italic", opacity: 0.55 }}>À renseigner…</p>
            : <p className="titre-14" style={{ color: "var(--bleu_turquoise_dark)", lineHeight: 1.6 }}>{cas.insight}</p>
          }
        </div>
      </div>
    </>
  );
}

/* ── État vide (aucun parcours sélectionné) ────────────────────────────────── */
function EmptyDetail() {
  return (
    <div className="dette-empty-detail">
      <div style={{
        width: 64, height: 64, borderRadius: 16,
        background: "var(--blanc)",
        border: "2px dashed var(--gris_light)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 16,
      }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
          stroke="var(--gris_dark)" strokeWidth="1.5" opacity="0.4">
          <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>
        </svg>
      </div>
      <p className="ds-bold titre-16 noir" style={{ marginBottom: 6 }}>Sélectionnez un parcours</p>
      <p className="titre-14 gris_dark" style={{ maxWidth: 280, lineHeight: 1.6 }}>
        Choisissez un parcours dans la liste pour visualiser la comparaison Design vs Production.
      </p>
    </div>
  );
}

/* ── Composant principal ───────────────────────────────────────────────────── */
export default function ParcoursDetail({ item, allItems, onNavigate }) {
  const [activeCasIndex, setActiveCasIndex] = useState(0);
  const [lastItemId, setLastItemId] = useState(item?.id ?? null);

  // Reset l'index du cas quand on change de parcours
  if (item?.id !== lastItemId) {
    setLastItemId(item?.id ?? null);
    setActiveCasIndex(0);
  }

  if (!item) return <EmptyDetail />;

  const hasCasTabs = item.cas.length > 1;
  const activeCas  = item.cas[Math.min(activeCasIndex, item.cas.length - 1)];

  const currentIndex = allItems.findIndex((i) => i.id === item.id);
  const prevItem     = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextItem     = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  return (
    <div className="dette-detail">
      {/* Header du parcours */}
      <div className="dette-detail-header">
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <p className="ds-bold titre-18 noir" style={{ marginBottom: 4, lineHeight: 1.3 }}>
              {item.label}
            </p>
            {item.cas.length > 1 && (
              <p className="titre-12 gris_dark">
                {item.cas.length} cas à documenter
              </p>
            )}
          </div>

          {/* Navigation séquentielle */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
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
              title={prevItem?.label}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="var(--gris_dark)" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <span className="titre-12 gris_dark" style={{ padding: "0 4px", minWidth: 40, textAlign: "center" }}>
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
              title={nextItem?.label}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="var(--gris_dark)" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Corps scrollable */}
      <div className="dette-detail-body scrollbar-thin">
        {/* Sélecteur de cas */}
        {hasCasTabs && (
          <div className="dette-cas-tabs">
            {item.cas.map((cas, i) => (
              <button
                key={i}
                className={`dette-cas-tab${activeCasIndex === i ? " active" : ""}`}
                onClick={() => setActiveCasIndex(i)}
              >
                {cas.label}
              </button>
            ))}
          </div>
        )}

        {/* Contenu du cas actif */}
        <CasView cas={activeCas} />

        <div style={{ height: 24 }} />
      </div>
    </div>
  );
}

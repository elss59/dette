import { useState, useRef, useEffect } from "react";
import {
  PRODUCTS,
  getAllSuggestions,
  getParcoursForProduct,
  getProductMetaByUnivers,
  recentUpdates,
} from "../data/debtData";

/* ── Icônes produits ─────────────────────────────────────────────────────── */
const PRODUCT_ICONS = {
  ECP:         (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  APP:         (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="18" r="1"/>
    </svg>
  ),
  AFFILIATION_DISPENSE: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  DISPENSE:    (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/>
    </svg>
  ),
};

/* ── Bloc 1 — Recherche ──────────────────────────────────────────────────── */
function SearchBlock({ onNavigate }) {
  const [query, setQuery]       = useState("");
  const [focused, setFocused]   = useState(false);
  const inputRef                = useRef(null);
  const allSuggestions          = getAllSuggestions();

  const filtered = query.trim().length > 0
    ? allSuggestions.filter((s) =>
        s.suggestionLabel.toLowerCase().includes(query.toLowerCase()) ||
        s.label.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const showDropdown = focused && query.trim().length > 0;

  const handleSelect = (s) => {
    setQuery("");
    setFocused(false);
    onNavigate(s.univers, s.id);
  };

  // Fermer la dropdown au clic en dehors
  useEffect(() => {
    const handler = (e) => {
      if (inputRef.current && !inputRef.current.closest(".dette-search-wrapper")?.contains(e.target)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="dette-search-block">
      <p className="dette-search-title">Trouver un parcours</p>
      <p className="dette-search-subtitle">
        Recherchez un élément de dette par nom de parcours ou mot-clé, quel que soit le produit.
      </p>

      <div className="dette-search-wrapper" ref={inputRef}>
        <svg className="dette-search-icon" width="18" height="18" viewBox="0 0 24 24"
          fill="none" stroke="var(--gris_dark)" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>

        <input
          type="text"
          className="dette-search-input"
          placeholder="Ex : Demander un remboursement, carte de tiers payant…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          autoComplete="off"
        />

        {showDropdown && (
          <div className="dette-suggestions">
            {filtered.length === 0 ? (
              <p className="dette-no-suggestion">Aucun résultat pour « {query} »</p>
            ) : (
              filtered.map((s) => {
                const prod = getProductMetaByUnivers(s.univers);
                return (
                  <button
                    key={s.id}
                    className="dette-suggestion-item"
                    onMouseDown={() => handleSelect(s)}
                  >
                    <span className="dette-suggestion-product">{prod?.short}</span>
                    <span className="dette-suggestion-label">{s.label}</span>
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Bloc 2 — Cards produits ─────────────────────────────────────────────── */
function BrowseBlock({ onNavigate }) {
  const [expandedProduct, setExpandedProduct] = useState(null);

  const handleCardClick = (productId) => {
    setExpandedProduct((prev) => (prev === productId ? null : productId));
  };

  const expandedParcours = expandedProduct
    ? getParcoursForProduct(expandedProduct)
    : [];

  return (
    <div className="dette-browse-block">
      <p className="dette-home-section-title">Parcourir par produit</p>
      <p className="dette-home-section-sub">
        Sélectionnez un produit pour explorer ses parcours.
      </p>

      <div className="dette-product-cards">
        {PRODUCTS.map((product) => {
          const parcoursList = getParcoursForProduct(product.id);
          const isExpanded   = expandedProduct === product.id;
          return (
            <button
              key={product.id}
              className={`dette-product-card${isExpanded ? " expanded" : ""}`}
              onClick={() => handleCardClick(product.id)}
            >
              <div className="dette-product-card-icon"
                style={{ color: isExpanded ? "var(--corail_mh_brand)" : "var(--gris_dark)" }}>
                {PRODUCT_ICONS[product.id]}
              </div>
              <p className="dette-product-card-label">{product.short}</p>
              <p className="dette-product-card-count">
                {parcoursList.length} parcours
              </p>
              {/* Chevron */}
              <svg
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                  color: isExpanded ? "var(--corail_mh_brand)" : "var(--gris_light)",
                }}
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
          );
        })}
      </div>

      {/* Expansion panel */}
      {expandedProduct && (
        <div className="dette-parcours-expansion">
          <p className="dette-parcours-expansion-title">
            {PRODUCTS.find((p) => p.id === expandedProduct)?.label} — Parcours disponibles
          </p>
          <div className="dette-parcours-expansion-list">
            {expandedParcours.map((p) => (
              <button
                key={p.id}
                className="dette-parcours-expansion-item"
                onClick={() => onNavigate(expandedProduct, p.id)}
              >
                <span>{p.label}</span>
                {p.cas.length > 1 && (
                  <span className="dette-sidebar-cas-count">{p.cas.length} cas</span>
                )}
              </button>
            ))}
          </div>
          <button
            className="dette-see-all"
            onClick={() => onNavigate(expandedProduct, null)}
          >
            Voir tous les parcours
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Bloc 3 — Derniers travaux ───────────────────────────────────────────── */
function RecentBlock({ onNavigate }) {
  return (
    <div>
      <p className="dette-home-section-title">Nos derniers travaux</p>
      <p className="dette-home-section-sub">
        Dernières comparaisons et analyses ajoutées dans le prototype.
      </p>

      <div className="dette-updates-grid">
        {recentUpdates.map((u, i) => (
          <div key={i} className="dette-update-card">
            <div className="dette-update-meta">
              <span className="dette-update-date">{u.date}</span>
              <span className="dette-update-product-badge">{u.product}</span>
            </div>
            <p className="dette-update-parcours">{u.parcours}</p>
            <p className="dette-update-desc">{u.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Composant principal HomePage ────────────────────────────────────────── */
export default function HomePage({ onNavigate }) {
  return (
    <div className="dette-home">
      <div className="dette-home-inner">
        {/* Bloc 1 — Recherche */}
        <SearchBlock onNavigate={onNavigate} />

        {/* Divider */}
        <div className="dette-section-divider" style={{ margin: "0 0 32px" }} />

        {/* Bloc 2 — Parcourir par produit */}
        <BrowseBlock onNavigate={onNavigate} />

        {/* Divider */}
        <div className="dette-section-divider" />

        {/* Bloc 3 — Derniers travaux */}
        <RecentBlock onNavigate={onNavigate} />
      </div>
    </div>
  );
}

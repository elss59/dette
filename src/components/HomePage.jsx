import { useState } from 'react';
import { PRODUCTS, getParcoursForProduct, recentUpdates } from '../data/debtData';

export default function HomePage({ onNavigate }) {
  const [expandedProduct, setExpandedProduct] = useState(PRODUCTS[0]?.id ?? null);
  const expandedParcours = expandedProduct ? getParcoursForProduct(expandedProduct) : [];

  return (
    <div className="dette-home">
      <div className="dette-home-inner">
        <div className="dette-browse-block">
          <p className="dette-home-section-title">Parcourir par produit</p>
          <div className="dette-product-cards">
            {PRODUCTS.map((product) => {
              const parcoursList = getParcoursForProduct(product.id);
              const isExpanded = expandedProduct === product.id;
              return (
                <button key={product.id} className={`dette-product-card${isExpanded ? ' expanded' : ''}`} onClick={() => setExpandedProduct(product.id)}>
                  <p className="dette-product-card-label">{product.short}</p>
                  <p className="dette-product-card-count">{parcoursList.length} parcours</p>
                </button>
              );
            })}
          </div>

          {expandedProduct && (
            <div className="dette-parcours-expansion">
              <div className="dette-parcours-expansion-list">
                {expandedParcours.map((p) => (
                  <button key={p.id} className="dette-parcours-expansion-item" onClick={() => onNavigate(expandedProduct, p.id)}>
                    <span>{p.label}</span>
                    {p.entries.length > 1 && <span className="dette-sidebar-cas-count">{p.entries.length} lignes</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {recentUpdates.length > 0 && (
          <div>
            <p className="dette-home-section-title">Dernières mises à jour</p>
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
        )}
      </div>
    </div>
  );
}

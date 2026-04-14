import { useMemo, useState } from "react";
import ProductTabs from "./ProductTabs";
import ParcoursDetail from "./ParcoursDetail";
import { getParcoursForProduct } from "../data/debtData";

export default function ParcoursView({ initialProduct, initialParcours, onClose }) {
  const [selectedProduct, setSelectedProduct] = useState(initialProduct ?? "ECP");
  const [selectedParcours, setSelectedParcours] = useState(initialParcours ?? null);

  const items = useMemo(() => getParcoursForProduct(selectedProduct), [selectedProduct]);

  const handleProductChange = (productId) => {
    setSelectedProduct(productId);
    setSelectedParcours(null);
  };

  const openDetail = (item) => setSelectedParcours(item);
  const backToSelection = () => setSelectedParcours(null);

  return (
    <div className="dette-modal-overlay" role="dialog" aria-modal="true">
      {!selectedParcours ? (
        <div className="dette-modal-panel dette-modal-selection">
          <div className="dette-modal-topbar">
            <p className="ds-bold titre-16" style={{ margin: 0 }}>Sélection du parcours</p>
            <button className="dette-modal-close" onClick={onClose} aria-label="Fermer">✕</button>
          </div>

          <ProductTabs selected={selectedProduct} onSelect={handleProductChange} />

          <div className="dette-modal-content">
            <p className="dette-modal-hint">Choisissez un parcours pour afficher son analyse.</p>
            <div className="dette-parcours-modal-grid">
              {items.map((item) => (
                <button
                  key={item.id}
                  className="dette-parcours-modal-item"
                  onClick={() => openDetail(item)}
                >
                  <span>{item.label}</span>
                  {item.cas.length > 1 && (
                    <span className="dette-sidebar-cas-count">{item.cas.length} cas</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="dette-modal-panel dette-modal-detail">
          <div className="dette-modal-topbar">
            <button className="dette-back-link" onClick={backToSelection}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Retour aux parcours
            </button>
            <button className="dette-modal-close" onClick={onClose} aria-label="Fermer">✕</button>
          </div>
          <ParcoursDetail key={selectedParcours.id} item={selectedParcours} />
        </div>
      )}
    </div>
  );
}

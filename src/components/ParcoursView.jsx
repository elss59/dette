import { useState } from "react";
import ParcoursList from "./ParcoursList";
import ParcoursDetail from "./ParcoursDetail";
import { PRODUCTS } from "../data/debtData";

export default function ParcoursView({ initialProduct, initialParcours, onGoHome }) {
  const [selectedProduct]  = useState(initialProduct ?? "ECP");
  const [selectedParcours, setSelectedParcours] = useState(initialParcours ?? null);
  const selectedProductMeta = PRODUCTS.find((product) => product.id === selectedProduct);

  return (
    <div className="dette-parcours-view">
      <div className="dette-modal-topbar">
        <button className="dette-back-link" onClick={onGoHome}>
          {/* TODO(asset): remplacer par /assets/icons/fleche-gauche.svg dès disponibilité. */}
          <span className="dette-icon-fallback" aria-hidden>←</span>
          Retour
        </button>
        <p className="ds-bold titre-16 noir" style={{ margin: 0 }}>
          {selectedProductMeta?.label ?? selectedProduct}
        </p>
      </div>

      <div className="dette-view-body">
        <ParcoursList
          productId={selectedProduct}
          selected={selectedParcours}
          onSelect={setSelectedParcours}
        />
        <ParcoursDetail
          key={selectedParcours?.id ?? "empty"}
          item={selectedParcours}
        />
      </div>
    </div>
  );
}

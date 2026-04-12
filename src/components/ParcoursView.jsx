import { useState } from "react";
import ProductTabs from "./ProductTabs";
import ParcoursList from "./ParcoursList";
import ParcoursDetail from "./ParcoursDetail";

export default function ParcoursView({ initialProduct, initialParcours, onGoHome }) {
  const [selectedProduct,  setSelectedProduct]  = useState(initialProduct ?? "ECP");
  const [selectedParcours, setSelectedParcours] = useState(initialParcours ?? null);

  const handleProductChange = (productId) => {
    setSelectedProduct(productId);
    setSelectedParcours(null);
  };


  return (
    <div className="dette-parcours-view">
      {/* Barre de retour */}
      <div className="dette-back-bar">
        <button className="dette-back-link" onClick={onGoHome}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Accueil
        </button>
      </div>

      {/* Tabs produits */}
      <ProductTabs selected={selectedProduct} onSelect={handleProductChange} />

      {/* Corps */}
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

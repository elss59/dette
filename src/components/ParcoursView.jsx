import { useMemo, useState } from 'react';
import ProductTabs from './ProductTabs';
import ParcoursList from './ParcoursList';
import ParcoursDetail from './ParcoursDetail';
import { getParcoursForProduct, PRODUCTS } from '../data/debtData';

export default function ParcoursView({ initialProduct, initialParcours, onGoHome }) {
  const defaultProduct = useMemo(() => PRODUCTS[0]?.id ?? null, []);
  const [selectedProduct, setSelectedProduct] = useState(initialProduct ?? defaultProduct);
  const [selectedParcours, setSelectedParcours] = useState(initialParcours ?? null);

  const handleProductChange = (productId) => {
    setSelectedProduct(productId);
    setSelectedParcours(null);
  };

  const parcoursList = selectedProduct ? getParcoursForProduct(selectedProduct) : [];

  return (
    <div className="dette-parcours-view">
      <div className="dette-back-bar">
        <button className="dette-back-link" onClick={onGoHome}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Accueil
        </button>
      </div>

      <ProductTabs selected={selectedProduct} onSelect={handleProductChange} />

      <div className="dette-view-body">
        <ParcoursList productId={selectedProduct} selected={selectedParcours} onSelect={setSelectedParcours} />
        <ParcoursDetail item={selectedParcours} allItems={parcoursList} onNavigate={setSelectedParcours} />
      </div>
    </div>
  );
}

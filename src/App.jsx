import { useState } from "react";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import ParcoursView from "./components/ParcoursView";
import { getParcoursById } from "./data/debtData";

export default function App() {
  const [isParcoursModalOpen, setIsParcoursModalOpen] = useState(false);
  const [initialProduct, setInitialProduct] = useState("ECP");
  const [initialParcours, setInitialParcours] = useState(null);

  const navigateToParcours = (productId, parcoursId) => {
    setInitialProduct(productId);
    setInitialParcours(parcoursId ? getParcoursById(parcoursId) : null);
    setIsParcoursModalOpen(true);
  };

  const closeParcoursModal = () => {
    setIsParcoursModalOpen(false);
    setInitialParcours(null);
  };

  return (
    <div className="dette-app-shell">
      <Header onLogoClick={closeParcoursModal} />
      <HomePage onNavigate={navigateToParcours} />

      {isParcoursModalOpen && (
        <ParcoursView
          initialProduct={initialProduct}
          initialParcours={initialParcours}
          onClose={closeParcoursModal}
        />
      )}
    </div>
  );
}

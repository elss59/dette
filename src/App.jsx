import { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ParcoursView from './components/ParcoursView';
import { getParcoursById, PRODUCTS } from './data/debtData';

export default function App() {
  const [view, setView] = useState('home');
  const [initialProduct, setInitialProduct] = useState(PRODUCTS[0]?.id ?? null);
  const [initialParcours, setInitialParcours] = useState(null);

  const navigateToParcours = (productId, parcoursId) => {
    setInitialProduct(productId);
    setInitialParcours(parcoursId ? getParcoursById(parcoursId) : null);
    setView('parcours');
  };

  const goHome = () => {
    setView('home');
    setInitialParcours(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Header onLogoClick={goHome} />
      {view === 'home' ? (
        <HomePage onNavigate={navigateToParcours} />
      ) : (
        <ParcoursView initialProduct={initialProduct} initialParcours={initialParcours} onGoHome={goHome} />
      )}
    </div>
  );
}

import { PRODUCTS } from '../data/debtData';

export default function ProductTabs({ selected, onSelect }) {
  if (PRODUCTS.length === 0) {
    return (
      <nav className="dette-tabs-nav">
        <span className="titre-12 gris_dark">Aucun produit disponible.</span>
      </nav>
    );
  }

  return (
    <nav className="dette-tabs-nav">
      {PRODUCTS.map((product) => (
        <button
          key={product.id}
          className={`dette-nav-tab${selected === product.id ? ' active' : ''}`}
          onClick={() => onSelect(product.id)}
        >
          {product.short}
        </button>
      ))}
    </nav>
  );
}

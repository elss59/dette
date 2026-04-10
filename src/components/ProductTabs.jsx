import { PRODUCTS } from "../data/debtData";

export default function ProductTabs({ selected, onSelect }) {
  return (
    <nav className="dette-tabs-nav">
      {PRODUCTS.map((product) => (
        <button
          key={product.id}
          className={`dette-nav-tab${selected === product.id ? " active" : ""}`}
          onClick={() => onSelect(product.id)}
        >
          {product.short}
        </button>
      ))}
    </nav>
  );
}

import { PRODUCTS } from "../data/debtData";

export default function ProductTabs({ selected, onSelect }) {
  return (
    <nav className="dette-tabs-nav">
      {PRODUCTS.map((product) => (
        <button
          key={product.id}
          className={`dette-nav-tab${selected === product.id ? " active" : ""}${!product.active ? " is-disabled" : ""}`}
          onClick={() => product.active && onSelect(product.id)}
          disabled={!product.active}
          title={!product.active ? "Produit en préparation" : undefined}
        >
          {product.short}
        </button>
      ))}
    </nav>
  );
}

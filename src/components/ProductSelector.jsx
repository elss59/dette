import { PRODUCTS } from "../data/debtData";

export default function ProductSelector({ selected, onSelect }) {
  return (
    <div className="dette-product-nav">
      <div className="tabs3 flex items-end px-4 pt-3" style={{ gap: 0, paddingBottom: 0 }}>
        {PRODUCTS.map((product) => {
          const isSelected = selected === product.id;
          return (
            <div className="tab3" key={product.id} style={{ margin: '0 4px 0 0' }}>
              <button
                className={[
                  isSelected ? "selected" : "",
                  !product.active ? "disabled" : "",
                ].filter(Boolean).join(" ")}
                onClick={() => product.active && onSelect(product.id)}
                disabled={!product.active}
                title={product.description}
                style={{ borderRadius: '8px 8px 0 0' }}
              >
                {product.short}
                {!product.active && (
                  <span
                    className="titre-10"
                    style={{
                      marginLeft: 6,
                      background: 'rgba(255,255,255,0.15)',
                      borderRadius: '1rem',
                      padding: '1px 6px',
                      color: 'rgba(255,255,255,0.5)',
                    }}
                  >
                    bientôt
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

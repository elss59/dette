import { PRODUCTS } from "../data/debtData";

export default function ProductSelector({ selected, onSelect }) {
  return (
    <div className="bg-slate-900 border-b border-slate-800 flex-shrink-0">
      <div className="flex items-end px-6 gap-1">
        {PRODUCTS.map((product) => {
          const isSelected = selected === product.id;
          return product.active ? (
            <button
              key={product.id}
              onClick={() => onSelect(product.id)}
              className={`
                relative px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all duration-150 border-x border-t
                ${isSelected
                  ? "bg-slate-50 text-slate-900 border-slate-300 -mb-px z-10"
                  : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-slate-200 mb-0.5"
                }
              `}
            >
              {product.short}
              {isSelected && (
                <span className="ml-2 text-xs font-normal text-slate-500">{product.label}</span>
              )}
            </button>
          ) : (
            <div
              key={product.id}
              className="px-4 py-2.5 text-sm text-slate-600 cursor-not-allowed flex items-center gap-1.5 mb-0.5"
              title="Produit non disponible dans cette version"
            >
              {product.short}
              <span className="text-xs bg-slate-800 text-slate-600 border border-slate-700 px-1.5 py-0.5 rounded-full leading-none">
                bientôt
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

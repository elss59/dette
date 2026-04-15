import { getParcoursForProduct } from "../data/debtData";

export default function ParcoursList({ productId, selected, onSelect }) {
  const items = getParcoursForProduct(productId);

  return (
    <aside className="dette-sidebar">
      {/* Header */}
      <div style={{
        padding: "12px 16px",
        borderBottom: "1px solid var(--gris_light)",
        flexShrink: 0,
        background: "var(--blanc)",
      }}>
        <p className="ds-bold titre-12" style={{ color: "var(--gris_dark)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Parcours · {items.length}
        </p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {items.map((item) => {
          const isActive = selected?.id === item.id;
          return (
            <button
              key={item.id}
              className={`dette-sidebar-item dette-parcours-modal-item${isActive ? " active" : ""}`}
              onClick={() => onSelect(item)}
            >
              <span className="dette-parcours-modal-item-text">
                <span className="dette-parcours-modal-item-title">{item.label}</span>
                <span className="dette-parcours-modal-item-link">Voir le détail</span>
              </span>
              <span className="dette-parcours-modal-item-right">
                {item.cas.length > 1 && (
                  <span className="dette-sidebar-cas-count">
                    {item.cas.length} cas
                  </span>
                )}
                {/* TODO(asset): remplacer par /assets/icons/chevron-droit.svg dès disponibilité. */}
                <span className="dette-icon-fallback" aria-hidden>›</span>
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

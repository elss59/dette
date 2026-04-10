import { getParcoursForProduct } from '../data/debtData';

export default function ParcoursList({ productId, selected, onSelect }) {
  const items = productId ? getParcoursForProduct(productId) : [];

  return (
    <aside className="dette-sidebar">
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--gris_light)', flexShrink: 0, background: 'var(--blanc)' }}>
        <p className="ds-bold titre-12" style={{ color: 'var(--gris_dark)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Parcours · {items.length}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {items.map((item) => {
          const isActive = selected?.id === item.id;
          return (
            <button key={item.id} className={`dette-sidebar-item${isActive ? ' active' : ''}`} onClick={() => onSelect(item)}>
              <span style={{ lineHeight: 1.4 }}>{item.label}</span>
              {item.entries.length > 1 && <span className="dette-sidebar-cas-count">{item.entries.length} lignes</span>}
            </button>
          );
        })}
      </div>
    </aside>
  );
}

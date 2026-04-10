import { getStats } from "../data/debtData";

export default function StatsBar({ items, productLabel }) {
  const { p1, p2, total, byType } = getStats(items);

  return (
    <div className="dette-stats">
      {/* Product label + count */}
      <div className="flex items-center gap-1" style={{ flexShrink: 0 }}>
        <span className="ds-bold noir titre-12">{productLabel}</span>
        <span className="gris_dark titre-12" style={{ marginLeft: 4 }}>· {total} items</span>
      </div>

      <span style={{ width: 1, height: 16, background: 'var(--gris_light)', flexShrink: 0 }} />

      {/* Priority counts */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--rouge_negatif)', flexShrink: 0 }} />
          <span className="ds-bold titre-12" style={{ color: 'var(--rouge_negatif)' }}>
            {p1} Critiques
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--corail_mh_brand)', flexShrink: 0 }} />
          <span className="ds-bold titre-12" style={{ color: 'var(--corail_mh_dark)' }}>
            {p2} Importants
          </span>
        </div>
      </div>

      <span style={{ width: 1, height: 16, background: 'var(--gris_light)', flexShrink: 0 }} />

      {/* Type breakdown */}
      <div className="flex items-center gap-2">
        {Object.entries(byType).map(([type, count]) => (
          <span key={type} className="gris_dark titre-12">
            {count}{" "}
            <span style={{ opacity: 0.6 }}>{type}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

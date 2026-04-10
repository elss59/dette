import { groupByParcours } from "../data/debtData";
import { PriorityBadge, TypeBadge } from "./Badges";

const PRIORITY_FILTERS = ["", "P1", "P2"];
const TYPE_FILTERS = ["", "UX", "Fonctionnelle", "Tech"];

function chipClass(active, key) {
  if (!active) return "dette-chip";
  if (key === "P1") return "dette-chip active-p1";
  if (key === "UX") return "dette-chip active-ux";
  if (key === "Fonctionnelle") return "dette-chip active-fonctionnelle";
  if (key === "Tech") return "dette-chip active-tech";
  return "dette-chip active";
}

export default function FeatureList({ items, selected, onSelect, filter, onFilterChange }) {
  const filtered = items.filter((item) => {
    if (filter.priority && item.priority !== filter.priority) return false;
    if (filter.type && item.type_dette !== filter.type) return false;
    if (filter.search) {
      const q = filter.search.toLowerCase();
      return (
        item.feature.toLowerCase().includes(q) ||
        item.impact.toLowerCase().includes(q) ||
        item.parcours.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const grouped = groupByParcours(filtered);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Filter bar */}
      <div
        className="flex-shrink-0"
        style={{ padding: '10px 12px 10px', borderBottom: '1px solid var(--gris_light)', background: 'var(--blanc)' }}
      >
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 8 }}>
          <svg
            style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gris_dark)" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Rechercher une feature…"
            value={filter.search}
            onChange={(e) => onFilterChange({ ...filter, search: e.target.value })}
            className="dette-search"
          />
        </div>

        {/* Priority filters */}
        <div className="flex gap-1 flex-wrap">
          {PRIORITY_FILTERS.map((p) => (
            <button
              key={`p-${p}`}
              onClick={() => onFilterChange({ ...filter, priority: p })}
              className={chipClass(filter.priority === p, p)}
            >
              {p === "" ? "Toutes priorités" : p}
            </button>
          ))}
          {TYPE_FILTERS.filter(t => t !== "").map((t) => (
            <button
              key={`t-${t}`}
              onClick={() => onFilterChange({ ...filter, type: filter.type === t ? "" : t })}
              className={chipClass(filter.type === t, t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {Object.keys(grouped).length === 0 ? (
          <div style={{ padding: '32px 16px', textAlign: 'center' }}>
            <p className="gris_dark titre-14">Aucun élément ne correspond aux filtres.</p>
          </div>
        ) : (
          Object.entries(grouped).map(([parcours, parcoursItems]) => (
            <div key={parcours}>
              {/* Parcours heading */}
              <div className="dette-parcours-heading">
                <span className="gris_dark overline titre-10 ds-bold">
                  {parcours}
                </span>
                <span className="gris_dark titre-10" style={{ marginLeft: 6 }}>
                  {parcoursItems.length}
                </span>
              </div>

              {/* Feature rows */}
              {parcoursItems.map((item) => {
                const isSelected = selected?.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelect(item)}
                    className={`dette-feature-item${isSelected ? " active" : ""}`}
                  >
                    {/* Top row: name + priority */}
                    <div className="flex items-start justify-between gap-2" style={{ marginBottom: 6 }}>
                      <span
                        className={isSelected ? "ds-bold titre-14" : "titre-14"}
                        style={{
                          color: isSelected ? 'var(--corail_mh_dark)' : 'var(--noir)',
                          lineHeight: 1.35,
                        }}
                      >
                        {item.feature}
                      </span>
                      <PriorityBadge priority={item.priority} />
                    </div>

                    {/* Impact summary */}
                    <p
                      className="titre-12 gris_dark"
                      style={{
                        marginBottom: 8,
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.impact}
                    </p>

                    <TypeBadge type={item.type_dette} />
                  </button>
                );
              })}
            </div>
          ))
        )}
      </div>

      {/* Footer count */}
      <div
        className="flex-shrink-0 flex items-center"
        style={{ padding: '6px 16px', borderTop: '1px solid var(--gris_light)', background: 'var(--blanc)' }}
      >
        <span className="gris_dark titre-12">
          {filtered.length} élément{filtered.length > 1 ? "s" : ""} affiché{filtered.length > 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}

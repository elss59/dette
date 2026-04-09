import { groupByParcours } from "../data/debtData";
import { PriorityBadge, TypeBadge } from "./Badges";

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
    <div className="flex flex-col h-full">
      {/* Filters */}
      <div className="px-4 py-3 border-b border-slate-200 bg-white flex-shrink-0 space-y-2">
        <input
          type="text"
          placeholder="Rechercher une feature…"
          value={filter.search}
          onChange={(e) => onFilterChange({ ...filter, search: e.target.value })}
          className="w-full text-sm px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300"
        />
        <div className="flex gap-1.5">
          {["", "P1", "P2"].map((p) => (
            <button
              key={p}
              onClick={() => onFilterChange({ ...filter, priority: p })}
              className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-colors ${
                filter.priority === p
                  ? p === "P1"
                    ? "bg-red-100 text-red-700 border-red-300"
                    : p === "P2"
                    ? "bg-amber-100 text-amber-700 border-amber-300"
                    : "bg-indigo-100 text-indigo-700 border-indigo-300"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700"
              }`}
            >
              {p === "" ? "Tous" : p}
            </button>
          ))}
          <div className="h-5 w-px bg-slate-200 self-center mx-0.5" />
          {["", "UX", "Fonctionnelle", "Tech"].map((t) => (
            <button
              key={t}
              onClick={() => onFilterChange({ ...filter, type: t })}
              className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-colors ${
                filter.type === t && t !== ""
                  ? t === "UX"
                    ? "bg-violet-100 text-violet-700 border-violet-300"
                    : t === "Fonctionnelle"
                    ? "bg-blue-100 text-blue-700 border-blue-300"
                    : "bg-slate-200 text-slate-700 border-slate-300"
                  : filter.type === t && t === ""
                  ? "bg-indigo-100 text-indigo-700 border-indigo-300"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700"
              }`}
            >
              {t === "" ? "Tous" : t}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {Object.keys(grouped).length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-400">
            Aucun élément ne correspond aux filtres sélectionnés.
          </div>
        ) : (
          Object.entries(grouped).map(([parcours, parcourItems]) => (
            <div key={parcours}>
              {/* Parcours header */}
              <div className="sticky top-0 px-4 py-2 bg-slate-100 border-b border-t border-slate-200 z-10">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {parcours}
                </span>
                <span className="ml-2 text-xs text-slate-400">{parcourItems.length}</span>
              </div>

              {/* Feature items */}
              {parcourItems.map((item) => {
                const isSelected = selected?.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelect(item)}
                    className={`
                      w-full text-left px-4 py-3 border-b border-slate-100 transition-all duration-100
                      ${isSelected
                        ? "bg-indigo-50 border-l-2 border-l-indigo-500"
                        : "bg-white hover:bg-slate-50 border-l-2 border-l-transparent"
                      }
                    `}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className={`text-sm font-medium leading-snug ${isSelected ? "text-indigo-900" : "text-slate-800"}`}>
                        {item.feature}
                      </span>
                      <PriorityBadge priority={item.priority} />
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-1.5">
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
      <div className="px-4 py-2 border-t border-slate-200 bg-white flex-shrink-0">
        <span className="text-xs text-slate-400">
          {filtered.length} élément{filtered.length > 1 ? "s" : ""} affiché{filtered.length > 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}

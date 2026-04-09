import { getStats } from "../data/debtData";

export default function StatsBar({ items, productLabel }) {
  const { p1, p2, total, byType } = getStats(items);

  return (
    <div className="px-5 py-3 border-b border-slate-200 bg-white flex items-center gap-4 flex-wrap">
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
          {productLabel}
        </span>
        <span className="text-xs text-slate-400">·</span>
        <span className="text-xs text-slate-500">{total} items</span>
      </div>

      <div className="h-3 w-px bg-slate-200" />

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-xs font-semibold text-red-600">{p1} Critiques (P1)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="text-xs font-semibold text-amber-600">{p2} Importants (P2)</span>
        </div>
      </div>

      <div className="h-3 w-px bg-slate-200" />

      <div className="flex items-center gap-2">
        {Object.entries(byType).map(([type, count]) => (
          <span key={type} className="text-xs text-slate-500">
            {count} <span className="text-slate-400">{type}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

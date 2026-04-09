import { PRIORITY_CONFIG, TYPE_CONFIG } from "../data/debtData";

export function PriorityBadge({ priority, size = "sm" }) {
  const config = PRIORITY_CONFIG[priority];
  if (!config) return null;
  return (
    <span
      className={`
        inline-flex items-center gap-1 font-semibold border rounded-full
        ${config.color}
        ${size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-2.5 py-1"}
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

export function TypeBadge({ type, size = "sm" }) {
  const config = TYPE_CONFIG[type];
  if (!config) return null;
  return (
    <span
      className={`
        inline-flex items-center font-medium border rounded-full
        ${config.color}
        ${size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-2.5 py-1"}
      `}
    >
      {config.label}
    </span>
  );
}

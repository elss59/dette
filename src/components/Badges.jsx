export function PriorityBadge({ priority }) {
  if (priority === "P1") return <span className="badge-p1">{priority}</span>;
  if (priority === "P2") return <span className="badge-p2">{priority}</span>;
  return null;
}

export function TypeBadge({ type }) {
  const cls =
    type === "UX"
      ? "badge-type badge-type-ux"
      : type === "Fonctionnelle"
      ? "badge-type badge-type-fonctionnelle"
      : "badge-type badge-type-tech";
  return <span className={cls}>{type}</span>;
}

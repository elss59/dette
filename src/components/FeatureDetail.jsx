import { PriorityBadge, TypeBadge } from "./Badges";

function MediaPlaceholder({ type, label, sublabel }) {
  const isDesign = type === "design";
  return (
    <div
      className={`
        relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed
        aspect-video w-full overflow-hidden
        ${isDesign
          ? "bg-violet-50 border-violet-200"
          : "bg-slate-800 border-slate-600"
        }
      `}
    >
      {/* Grid lines decorative */}
      {isDesign ? (
        <>
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid-d" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#7c3aed" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-d)" />
            </svg>
          </div>
          <div className="relative flex flex-col items-center gap-3 px-6 text-center">
            <div className="w-10 h-10 rounded-xl bg-violet-200 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M3 9h18M9 21V9"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-violet-700">{label}</p>
              <p className="text-xs text-violet-500 mt-0.5">{sublabel}</p>
            </div>
            <button className="text-xs px-3 py-1.5 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors font-medium">
              + Ajouter un lien Figma
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid-p" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-p)" />
            </svg>
          </div>
          <div className="relative flex flex-col items-center gap-3 px-6 text-center">
            <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-300">{label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{sublabel}</p>
            </div>
            <button className="text-xs px-3 py-1.5 bg-slate-600 text-slate-200 rounded-lg hover:bg-slate-500 transition-colors font-medium">
              + Ajouter une vidéo
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function ExplainCard({ icon, label, text, accentClass, textClass, borderClass }) {
  return (
    <div className={`rounded-xl border p-4 ${borderClass}`}>
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-6 h-6 rounded-md flex items-center justify-center text-base ${accentClass}`}>
          {icon}
        </div>
        <span className={`text-xs font-semibold uppercase tracking-wider ${textClass}`}>{label}</span>
      </div>
      <p className="text-sm text-slate-700 leading-relaxed">{text}</p>
    </div>
  );
}

function GapIndicator({ priority, type }) {
  const score = priority === "P1" ? (type === "UX" ? 95 : type === "Fonctionnelle" ? 85 : 75) : (type === "UX" ? 70 : type === "Fonctionnelle" ? 60 : 50);
  const color = score >= 85 ? "bg-red-500" : score >= 65 ? "bg-amber-500" : "bg-yellow-400";
  const label = score >= 85 ? "Écart majeur" : score >= 65 ? "Écart significatif" : "Écart modéré";
  const textColor = score >= 85 ? "text-red-600" : score >= 65 ? "text-amber-600" : "text-yellow-600";

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-slate-500 font-medium w-28">Niveau d'écart</span>
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={`text-xs font-semibold ${textColor} w-32 text-right`}>{label} ({score}%)</span>
    </div>
  );
}

export default function FeatureDetail({ item, allItems, onNavigate }) {
  if (!item) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-slate-50">
        <div className="w-16 h-16 rounded-2xl bg-white border-2 border-dashed border-slate-200 flex items-center justify-center mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
            <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>
          </svg>
        </div>
        <h2 className="text-base font-semibold text-slate-700 mb-1">Sélectionner une feature</h2>
        <p className="text-sm text-slate-400 max-w-xs">
          Choisissez un élément dans la liste pour visualiser le comparatif Design vs Production.
        </p>
      </div>
    );
  }

  const currentIndex = allItems.findIndex((i) => i.id === item.id);
  const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextItem = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
      {/* Feature header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-xs text-slate-400 font-medium">{item.parcours}</span>
              <span className="text-slate-300">/</span>
              <PriorityBadge priority={item.priority} size="md" />
              <TypeBadge type={item.type_dette} size="md" />
            </div>
            <h1 className="text-lg font-bold text-slate-900 leading-snug mb-1">{item.feature}</h1>
            <p className="text-sm text-slate-500 leading-relaxed">{item.impact}</p>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => prevItem && onNavigate(prevItem)}
              disabled={!prevItem}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title={prevItem?.feature}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <span className="text-xs text-slate-400 px-1">{currentIndex + 1}/{allItems.length}</span>
            <button
              onClick={() => nextItem && onNavigate(nextItem)}
              disabled={!nextItem}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title={nextItem?.feature}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Gap indicator */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          <GapIndicator priority={item.priority} type={item.type_dette} />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-6 space-y-6">

          {/* Comparison: Design vs Production */}
          <div>
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Comparatif — Intention Design vs Réalité Production
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Design column */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-violet-500" />
                  <span className="text-sm font-semibold text-violet-700">Intention Design</span>
                  <span className="text-xs text-slate-400 ml-auto">Figma</span>
                </div>
                <MediaPlaceholder
                  type="design"
                  label="Maquette / Prototype Figma"
                  sublabel="Lier le livrable Figma de la feature"
                />
                <div className="mt-2.5 p-3 bg-violet-50 rounded-lg border border-violet-100">
                  <p className="text-xs text-violet-800 leading-relaxed">{item.intention_design}</p>
                </div>
              </div>

              {/* Production column */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-slate-500" />
                  <span className="text-sm font-semibold text-slate-700">En Production</span>
                  <span className="text-xs text-slate-400 ml-auto">Vidéo</span>
                </div>
                <MediaPlaceholder
                  type="production"
                  label="Enregistrement Production"
                  sublabel="Ajouter une vidéo de l'existant"
                />
                <div className="mt-2.5 p-3 bg-slate-100 rounded-lg border border-slate-200">
                  <p className="text-xs text-slate-700 leading-relaxed">{item.livraison_production}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Explanation cards */}
          <div>
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Analyse de la dette
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <ExplainCard
                icon="🎯"
                label="Intention initiale"
                text={item.intention_design}
                accentClass="bg-violet-100"
                textClass="text-violet-600"
                borderClass="border-violet-200 bg-violet-50"
              />
              <ExplainCard
                icon="🔧"
                label="Ce qui a été livré"
                text={item.livraison_production}
                accentClass="bg-slate-200"
                textClass="text-slate-600"
                borderClass="border-slate-200 bg-slate-50"
              />
              <ExplainCard
                icon="⚡"
                label="Nature de l'écart"
                text={item.nature_ecart}
                accentClass={item.priority === "P1" ? "bg-red-100" : "bg-amber-100"}
                textClass={item.priority === "P1" ? "text-red-600" : "text-amber-600"}
                borderClass={item.priority === "P1" ? "border-red-200 bg-red-50" : "border-amber-200 bg-amber-50"}
              />
              <ExplainCard
                icon="👤"
                label="Impact utilisateur"
                text={item.impact_ux}
                accentClass="bg-blue-100"
                textClass="text-blue-600"
                borderClass="border-blue-200 bg-blue-50"
              />
            </div>
          </div>

          {/* Insight callout */}
          <div className="flex items-start gap-3 bg-indigo-50 border border-indigo-200 rounded-xl p-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
            </div>
            <div>
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Insight utilisateur</span>
              <p className="text-sm text-indigo-800 leading-relaxed mt-1">{item.insight}</p>
            </div>
          </div>

          {/* Bottom spacer */}
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}

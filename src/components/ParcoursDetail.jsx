import { useState } from 'react';

const isEmpty = (value) => !value || value.trim() === '';

function DataSection({ title, linkLabel, link, description, dark = false }) {
  if (isEmpty(link) && isEmpty(description)) return null;

  return (
    <div className={dark ? 'dette-panel-production' : 'dette-panel-design'}>
      <div className={dark ? 'dette-panel-header-dark' : 'dette-panel-header'}>
        <span className="ds-bold titre-14" style={{ color: dark ? 'rgba(255,255,255,0.9)' : 'var(--violet_dark)' }}>
          {title}
        </span>
      </div>
      <div className="dette-panel-description" style={{ background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(238,231,249,0.4)', color: dark ? 'rgba(255,255,255,0.7)' : 'var(--violet_dark)' }}>
        {!isEmpty(link) && (
          <p>
            <strong>{linkLabel} : </strong>
            <a href={link} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>
              Ouvrir
            </a>
          </p>
        )}
        {!isEmpty(description) && <p>{description}</p>}
      </div>
    </div>
  );
}

function CasView({ entry }) {
  const showIntermediaire = !isEmpty(entry.figmaIntermediaire) || !isEmpty(entry.descriptionIntermediaire);
  const showVision = !isEmpty(entry.accesVision) || !isEmpty(entry.titreVision);

  return (
    <>
      <p className="ds-bold titre-10 overline" style={{ color: 'var(--gris_dark)', marginBottom: 12 }}>
        Comparatif — cible vs production
      </p>

      <div className="dette-comparison-grid">
        <DataSection
          title="Cible"
          linkLabel="Figma cible"
          link={entry.figmaCible}
          description={entry.descriptionCible}
        />

        {showIntermediaire && (
          <DataSection
            title="Intermédiaire"
            linkLabel="Figma intermédiaire"
            link={entry.figmaIntermediaire}
            description={entry.descriptionIntermediaire}
          />
        )}

        <DataSection
          title="Production"
          linkLabel="Vidéo prod"
          link={entry.videoProd}
          description={entry.descriptionProd}
          dark
        />
      </div>

      <p className="ds-bold titre-10 overline" style={{ color: 'var(--gris_dark)', marginBottom: 12 }}>
        Analyse
      </p>
      <div className="dette-explain-grid">
        <div className="dette-explain-card"><strong>Impact expérientiel</strong><p>{entry.impactExperientiel || '—'}</p></div>
        <div className="dette-explain-card"><strong>Raison de l'écart</strong><p>{entry.raisonEcart || '—'}</p></div>
        <div className="dette-explain-card"><strong>Impact utilisateur</strong><p>{entry.impactUtilisateur || '—'}</p></div>
        <div className="dette-explain-card"><strong>Commentaire</strong><p>{entry.commentaire || '—'}</p></div>
      </div>

      {showVision && (
        <div className="dette-insight">
          <div>
            <p className="ds-bold titre-10 overline" style={{ color: 'var(--bleu_turquoise_dark)', marginBottom: 4 }}>
              Vision
            </p>
            {!isEmpty(entry.titreVision) && <p className="titre-14" style={{ color: 'var(--bleu_turquoise_dark)' }}>{entry.titreVision}</p>}
            {!isEmpty(entry.accesVision) && (
              <a href={entry.accesVision} target="_blank" rel="noreferrer" className="titre-12" style={{ textDecoration: 'underline' }}>
                Accéder à la vision
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function EmptyDetail() {
  return (
    <div className="dette-empty-detail">
      <p className="ds-bold titre-16 noir" style={{ marginBottom: 6 }}>Sélectionnez un parcours</p>
      <p className="titre-14 gris_dark" style={{ maxWidth: 280, lineHeight: 1.6 }}>
        Choisissez une ligne dans la liste pour visualiser la dette UX.
      </p>
    </div>
  );
}

export default function ParcoursDetail({ item, allItems, onNavigate }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const entries = item?.entries ?? [];

  if (!item) return <EmptyDetail />;

  const hasTabs = entries.length > 1;
  const activeEntry = entries[Math.min(activeIndex, Math.max(entries.length - 1, 0))];
  const currentIndex = allItems.findIndex((i) => i.id === item.id);
  const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextItem = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  return (
    <div className="dette-detail">
      <div className="dette-detail-header">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <p className="ds-bold titre-18 noir" style={{ marginBottom: 4, lineHeight: 1.3 }}>{item.label}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
            <button onClick={() => prevItem && onNavigate(prevItem)} disabled={!prevItem}>‹</button>
            <span className="titre-12 gris_dark" style={{ padding: '0 4px', minWidth: 40, textAlign: 'center' }}>
              {currentIndex + 1}/{allItems.length}
            </span>
            <button onClick={() => nextItem && onNavigate(nextItem)} disabled={!nextItem}>›</button>
          </div>
        </div>
      </div>

      <div className="dette-detail-body scrollbar-thin">
        {hasTabs && (
          <div className="dette-cas-tabs">
            {entries.map((entry, i) => (
              <button key={`${item.id}-${i}`} className={`dette-cas-tab${activeIndex === i ? ' active' : ''}`} onClick={() => setActiveIndex(i)}>
                {entry.impactExperientiel || `Ligne ${i + 1}`}
              </button>
            ))}
          </div>
        )}

        {activeEntry ? <CasView entry={activeEntry} /> : <p className="titre-14 gris_dark">Aucune donnée.</p>}
      </div>
    </div>
  );
}

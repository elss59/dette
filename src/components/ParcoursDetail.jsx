import { useState } from "react";

function ResourceLink({ href, label }) {
  if (!href) return <span className="dette-resource-empty">Lien non renseigné</span>;
  return (
    <a href={href} target="_blank" rel="noreferrer" className="dette-resource-link">
      {label}
    </a>
  );
}

function DebtBlock({ title, href, hrefLabel, description, tone = "default" }) {
  return (
    <article className={`dette-main-block${tone === "production" ? " is-production" : ""}`}>
      <h3 className="ds-bold titre-16" style={{ margin: 0 }}>{title}</h3>
      <div className="dette-main-block-visual">
        <ResourceLink href={href} label={hrefLabel} />
      </div>
      <p className="dette-main-block-description">{description || "Non renseigné."}</p>
    </article>
  );
}

function IntermediateBlock({ href, description }) {
  return (
    <article className="dette-main-block is-intermediate">
      <div>
        <h3 className="ds-bold titre-16" style={{ margin: 0 }}>Version intermédiaire</h3>
        <div className="dette-main-block-visual">
          <ResourceLink href={href} label="Voir version" />
        </div>
      </div>
      <p className="dette-main-block-description">{description || "Non renseigné."}</p>
    </article>
  );
}

function EmptyDetail() {
  return (
    <div className="dette-empty-detail">
      <p className="ds-bold titre-16 noir" style={{ marginBottom: 6 }}>Sélectionnez un parcours</p>
      <p className="titre-14 gris_dark" style={{ maxWidth: 280, lineHeight: 1.6 }}>
        Choisissez un parcours dans la liste pour visualiser les détails de dette.
      </p>
    </div>
  );
}

export default function ParcoursDetail({ item }) {
  const [activeCasIndex, setActiveCasIndex] = useState(0);


  if (!item) return <EmptyDetail />;

  const hasCasTabs = item.cas.length > 1;
  const activeCas = item.cas[Math.min(activeCasIndex, item.cas.length - 1)];
  const hasIntermediate = Boolean(activeCas?.figmaIntermediaire?.trim());
  const hasVision = Boolean(activeCas?.accesVision?.trim() && activeCas?.titreVision?.trim());

  return (
    <div className="dette-detail">
      <div className="dette-detail-header">
        <div className="dette-detail-title-row">
          <p className="ds-bold noir" style={{ margin: 0, fontSize: 22, lineHeight: 1.3 }}>
            Création de compte et Onboarding
          </p>
          <span className="dette-date-pill">{activeCas.dateDette || "Date non renseignée"}</span>
        </div>

        <p className="titre-14 gris_dark" style={{ marginTop: 6, marginBottom: hasCasTabs ? 10 : 0 }}>
          2 use case
        </p>

        {hasCasTabs && (
          <div className="dette-cas-tabs" style={{ marginBottom: 0 }}>
            {item.cas.map((cas, idx) => (
              <button
                key={cas.id}
                className={`dette-cas-tab${idx === activeCasIndex ? " active" : ""}`}
                onClick={() => setActiveCasIndex(idx)}
              >
                {cas.label || `Cas ${idx + 1}`}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="dette-detail-body">
        <section className="dette-comparison-grid">
          <DebtBlock
            title="Préconisation Design"
            href={activeCas.figmaCible}
            hrefLabel="Voir Figma"
            description={activeCas.descriptionCible}
          />
          <DebtBlock
            title="Ce qui a été livré"
            href={activeCas.videoProd}
            hrefLabel="Voir vidéo"
            description={activeCas.descriptionProd}
            tone="production"
          />
        </section>

        {hasIntermediate && (
          <section style={{ marginBottom: 24 }}>
            <IntermediateBlock
              href={activeCas.figmaIntermediaire}
              description={activeCas.descriptionIntermediaire}
            />
          </section>
        )}

        <section className="dette-analysis-section">
          <h3 className="ds-regular titre-16" style={{ margin: "0 0 12px" }}>Analyse de la dette</h3>
          <div className="dette-explain-grid">
            <article className="dette-explain-card">
              <p className="dette-explain-card-label">Raison de l'écart</p>
              <p className="dette-explain-card-text">{activeCas.raisonEcart || "Non renseigné."}</p>
            </article>
            <article className="dette-explain-card dette-alert-card">
              <p className="dette-explain-card-label">Impact utilisateur</p>
              <p className="dette-explain-card-text">{activeCas.impactUtilisateur || "Non renseigné."}</p>
            </article>
          </div>

          <div className="dette-comment-full">
            <p className="ds-bold titre-14" style={{ margin: "0 0 6px" }}>Commentaire</p>
            <p className="dette-explain-card-text" style={{ margin: 0 }}>
              {activeCas.commentaire || "Non renseigné."}
            </p>
          </div>
        </section>

        {hasVision && (
          <section className="vision">
            <h3 className="ds-bold titre-16" style={{ margin: "0 0 10px" }}>Pour aller plus loin</h3>
            <article className="vision-card">
              <a href={activeCas.accesVision} target="_blank" rel="noreferrer" className="dette-resource-link">
                {activeCas.titreVision}
              </a>
            </article>
          </section>
        )}
      </div>
    </div>
  );
}

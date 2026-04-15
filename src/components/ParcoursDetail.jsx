import { useState } from "react";

function ResourceLink({ href, label, leadingIcon, trailingIcon }) {
  if (!href) return <span className="dette-resource-empty">Lien non renseigné</span>;
  return (
    <a href={href} target="_blank" rel="noreferrer" className="dette-resource-link dette-main-block-cta">
      <span className="dette-main-block-cta-left">
        {leadingIcon}
        <span>{label}</span>
      </span>
      {trailingIcon}
    </a>
  );
}

function DebtBlock({ title, href, hrefLabel, description, tone = "default", leadingIcon }) {
  return (
    <article className={`dette-main-block${tone === "production" ? " is-production" : ""}`}>
      <h3 className="ds-bold titre-16" style={{ margin: 0 }}>{title}</h3>
      <div className="dette-main-block-visual">
        <ResourceLink
          href={href}
          label={hrefLabel}
          leadingIcon={leadingIcon}
          // TODO(asset): remplacer ce fallback par /assets/icons/lien-externe.svg.
          trailingIcon={<span className="dette-icon-fallback" aria-hidden>↗</span>}
        />
      </div>
      <p className="dette-main-block-description">{description || "Non renseigné."}</p>
    </article>
  );
}

function IntermediateBlock({ href, description }) {
  return (
    <article className="dette-main-block is-intermediate">
      <h3 className="ds-bold titre-16" style={{ margin: 0 }}>Version intermédiaire</h3>
      <div className="dette-main-block-visual">
        <ResourceLink
          href={href}
          label="Voir la vidéo"
          // TODO(asset): remplacer par /assets/icons/calendrier.svg.
          leadingIcon={<span className="dette-icon-fallback" aria-hidden>🗓</span>}
          // TODO(asset): remplacer ce fallback par /assets/icons/lien-externe.svg.
          trailingIcon={<span className="dette-icon-fallback" aria-hidden>↗</span>}
        />
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
  const topImage = activeCas?.topImage?.trim();

  return (
    <div className="dette-detail dette-modal-panel dette-modal-detail">
      <div className="dette-detail-header">
        <div className="dette-detail-title-row">
          <p className="ds-bold noir" style={{ margin: 0, fontSize: 22, lineHeight: 1.3 }}>
            {item.label}
          </p>
          <span className="dette-date-pill">{activeCas.dateDette || "Date non renseignée"}</span>
        </div>

        <p className="titre-14 gris_dark" style={{ marginTop: 6, marginBottom: hasCasTabs ? 10 : 0 }}>
          {`${item.cas.length} use case${item.cas.length > 1 ? "s" : ""}`}
        </p>

        {hasCasTabs && (
          <div className="dette-cas-dropdown-wrap">
            <label htmlFor="dette-case-select" className="titre-12 gris_dark">Use case</label>
            <select
              id="dette-case-select"
              className="dette-cas-dropdown"
              value={activeCasIndex}
              onChange={(event) => setActiveCasIndex(Number(event.target.value))}
            >
              {item.cas.map((cas, idx) => (
                <option key={cas.id} value={idx}>
                  {cas.label || `Cas ${idx + 1}`}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="dette-detail-body">
        <div className="dette-modal-columns">
          <section className="dette-overview-block">
            <h3 className="ds-bold titre-16" style={{ margin: 0 }}>Aperçu du use case</h3>

            <div
              className={`dette-overview-preview${topImage ? "" : " is-fallback"}`}
              style={topImage ? { backgroundImage: `url("${topImage}")` } : undefined}
              role="img"
              aria-label={topImage ? "Aperçu du use case" : "Aperçu non disponible"}
            >
              {!topImage && <span className="dette-preview-fallback-text">Aperçu indisponible</span>}
            </div>

            <h3 className="ds-bold titre-16" style={{ margin: 0 }}>Analyse de la dette</h3>
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

          <section className="dette-comparison-grid">
            <DebtBlock
              title="Préconisation Design"
              href={activeCas.figmaCible}
              hrefLabel="Voir les maquettes Figma"
              description={activeCas.descriptionCible}
              // TODO(asset): remplacer par /assets/icons/Vector.svg.
              leadingIcon={<span className="dette-icon-fallback" aria-hidden>◇</span>}
            />
            <DebtBlock
              title="Ce qui a été livré"
              href={activeCas.videoProd}
              hrefLabel="Voir la vidéo"
              description={activeCas.descriptionProd}
              tone="production"
              // TODO(asset): remplacer par /assets/icons/visio.svg.
              leadingIcon={<span className="dette-icon-fallback" aria-hidden>▶</span>}
            />

            {hasIntermediate && (
              <IntermediateBlock
                href={activeCas.figmaIntermediaire}
                description={activeCas.descriptionIntermediaire}
              />
            )}
          </section>
        </div>

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

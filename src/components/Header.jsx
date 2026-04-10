export default function Header({ onLogoClick }) {
  return (
    <header className="dette-header">
      <div className="flex items-center justify-between px-6 w-full">
        {/* Brand — cliquable pour revenir à l'accueil */}
        <button
          onClick={onLogoClick}
          style={{ display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <img
            src="/assets/logos/logo-nom-couleur.svg"
            alt="Malakoff Humanis"
            style={{ height: 28, width: "auto" }}
          />
          <span
            style={{
              width: 1,
              height: 20,
              background: "var(--gris_light)",
              flexShrink: 0,
            }}
          />
          <span
            className="titre-14 ds-bold"
            style={{ color: "var(--corail_mh_brand)" }}
          >
            Dette Expérientielle
          </span>
        </button>

        {/* Right */}
        <span
          className="titre-12"
          style={{
            color: "var(--gris_dark)",
            background: "var(--gris_background)",
            border: "1px solid var(--gris_light)",
            borderRadius: "2rem",
            padding: "3px 10px",
          }}
        >
          Prototype v1.0
        </span>
      </div>
    </header>
  );
}

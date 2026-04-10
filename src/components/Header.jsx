export default function Header() {
  return (
    <header className="dette-header">
      <div className="flex items-center justify-between px-6 w-full">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <img
            src="/assets/logos/logo-nom-blanc.svg"
            alt="Malakoff Humanis"
            height="28"
            style={{ height: 28, width: 'auto' }}
          />
          <span className="blanc" style={{ opacity: 0.3, fontSize: '1rem', lineHeight: 1 }}>|</span>
          <span className="blanc titre-14" style={{ opacity: 0.75 }}>
            Dette Expérientielle
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <span
            className="titre-12"
            style={{
              color: 'rgba(255,255,255,0.45)',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '2rem',
              padding: '3px 10px',
            }}
          >
            Prototype v1.0
          </span>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'var(--corail_mh_brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span className="blanc ds-bold" style={{ fontSize: '0.6875rem' }}>MH</span>
          </div>
        </div>
      </div>
    </header>
  );
}

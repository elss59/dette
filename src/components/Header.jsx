export default function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-800 flex-shrink-0">
      <div className="flex items-center justify-between px-6 h-14">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-indigo-500 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="5" height="5" rx="1" fill="white" opacity="0.9"/>
                <rect x="9" y="2" width="5" height="5" rx="1" fill="white" opacity="0.6"/>
                <rect x="2" y="9" width="5" height="5" rx="1" fill="white" opacity="0.6"/>
                <rect x="9" y="9" width="5" height="5" rx="1" fill="white" opacity="0.3"/>
              </svg>
            </div>
            <span className="text-white font-semibold text-sm tracking-tight">
              Malakoff Humanis
            </span>
          </div>
          <span className="text-slate-600 text-sm">/</span>
          <span className="text-slate-300 text-sm font-medium">Dette Expérientielle</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
            Prototype · v1.0
          </span>
          <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center">
            <span className="text-white text-xs font-semibold">MH</span>
          </div>
        </div>
      </div>
    </header>
  );
}

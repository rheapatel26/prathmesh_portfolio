// Small hand-drawn-style decorations used to dress up the Case Studies
// folder cards — binder clip, paperclip, and a torn map-corner scrap.
// Pure inline SVG so they inherit no external assets and stay crisp at
// any rotation/scale the card applies to them.

export function BinderClip({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 54"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 6a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a14 14 0 0 1-28 0V6Z"
        fill="#161613"
      />
      <path
        d="M13 16v4a7 7 0 0 0 14 0v-4"
        stroke="#c7c7bf"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect x="16" y="30" width="8" height="20" rx="2" fill="#c7c7bf" opacity="0.9" />
    </svg>
  );
}

export function PaperClipIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 12.5 15.5 4a3.2 3.2 0 0 1 4.5 4.5L11 17.5a5 5 0 0 1-7-7L12.5 3"
        stroke="#5a5a4a"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TornMapCorner({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 200"
      fill="none"
      preserveAspectRatio="xMaxYMax slice"
      aria-hidden="true"
    >
      <path
        d="M0 26 12 14 4 2 24 10 38 0 52 18 70 6 84 22 104 8 118 26 138 12 150 30 170 16 182 34 202 22 220 40V200H0V26Z"
        fill="#e3ddc9"
      />
      <path
        d="M0 26 12 14 4 2 24 10 38 0 52 18 70 6 84 22 104 8 118 26 138 12 150 30 170 16 182 34 202 22 220 40"
        stroke="rgba(35,35,15,0.2)"
        strokeWidth="1.5"
      />
      <path d="M18 52 96 44 150 78 214 66" stroke="#8a0202" strokeWidth="1.4" opacity="0.55" />
      <path d="M8 96 70 108 132 92 210 128" stroke="#23230f" strokeWidth="1.4" opacity="0.5" />
      <path d="M40 150 108 140 178 168" stroke="#8a0202" strokeWidth="1.2" opacity="0.4" />
      <circle cx="96" cy="44" r="2.4" fill="#23230f" />
      <circle cx="132" cy="92" r="2.4" fill="#8a0202" />
      <circle cx="108" cy="140" r="2.4" fill="#23230f" />
    </svg>
  );
}

export default function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left hexagon (source chain) */}
      <polygon
        points="75,20 130,50 130,110 75,140 20,110 20,50"
        fill="url(#grad1)"
        stroke="#818cf8"
        strokeWidth="3"
      />
      {/* Right hexagon (destination chain) */}
      <polygon
        points="180,60 180,120 125,150 125,90 180,60"
        fill="url(#grad2)"
        stroke="#a78bfa"
        strokeWidth="3"
        opacity="0.85"
      />

      {/* Swap arrow */}
      <path
        d="M85 95 L115 95 M105 85 L115 95 L105 105"
        stroke="#22c55e"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M115 75 L85 75 M95 65 L85 75 L95 85"
        stroke="#22c55e"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.6"
      />

      {/* Center: ID text */}
      <text
        x="100"
        y="108"
        textAnchor="middle"
        fill="white"
        fontSize="36"
        fontWeight="800"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="1"
      >
        ID
      </text>

      {/* Decorative dots */}
      <circle cx="30" cy="30" r="3" fill="#6366f1" opacity="0.4" />
      <circle cx="170" cy="170" r="3" fill="#a78bfa" opacity="0.4" />
      <circle cx="30" cy="170" r="2" fill="#6366f1" opacity="0.3" />

      <defs>
        <linearGradient id="grad1" x1="20" y1="20" x2="130" y2="140">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#818cf8" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="grad2" x1="125" y1="60" x2="180" y2="150">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

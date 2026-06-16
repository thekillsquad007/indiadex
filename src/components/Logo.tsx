export default function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle */}
      <circle cx="100" cy="100" r="95" stroke="#6366f1" strokeWidth="4" fill="none" />

      {/* Top: USD */}
      <circle cx="100" cy="22" r="22" fill="#6366f1" />
      <text x="100" y="30" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold" fontFamily="Arial, sans-serif">$</text>

      {/* Right: GBP */}
      <circle cx="178" cy="100" r="22" fill="#6366f1" />
      <text x="178" y="108" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold" fontFamily="Arial, sans-serif">£</text>

      {/* Bottom: JPY */}
      <circle cx="100" cy="178" r="22" fill="#6366f1" />
      <text x="100" y="186" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold" fontFamily="Arial, sans-serif">¥</text>

      {/* Left: EUR */}
      <circle cx="22" cy="100" r="22" fill="#6366f1" />
      <text x="22" y="108" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold" fontFamily="Arial, sans-serif">€</text>

      {/* Center: ID */}
      <text x="100" y="110" textAnchor="middle" fill="white" fontSize="42" fontWeight="bold" fontFamily="Arial, sans-serif">
        ID
      </text>
    </svg>
  );
}

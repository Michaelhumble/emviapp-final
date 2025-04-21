
import React from "react";

/**
 * Minimal, luxury Bookings (Heart) icon for nav.
 * Style: stylized heart outline, brand purples.
 */
const NailBookingsIcon: React.FC<React.SVGProps<SVGSVGElement> & { active?: boolean }> = ({
  active = false,
  ...props
}) => (
  <svg
    viewBox="0 0 60 60"
    width={28}
    height={28}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    style={{
      display: "block",
      filter: active
        ? "drop-shadow(0 0 8px #9b87f555)"
        : "drop-shadow(0 1px 2px #1A1F2C22)",
      ...props.style,
    }}
  >
    <circle cx="30" cy="30" r="28" fill="#fff" />
    <path
      d="M30 42s-10-6.5-10-13.5a7 7 0 0 1 13.1-3.7A7 7 0 0 1 40 28.5C40 35.5 30 42 30 42Z"
      fill={active ? "#eae5fb" : "#fff"}
      stroke="#9b87f5"
      strokeWidth="2.2"
      style={{
        transition: "fill 0.3s",
      }}
    />
  </svg>
);

export default NailBookingsIcon;

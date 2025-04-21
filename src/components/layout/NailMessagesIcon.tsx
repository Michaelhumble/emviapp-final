
import React from "react";

/**
 * Minimal, refined Messages icon for nav bar.
 * Style: envelope outline, brand purple, luxury white.
 */
const NailMessagesIcon: React.FC<React.SVGProps<SVGSVGElement> & { active?: boolean }> = ({
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
    <rect
      x="20"
      y="23"
      width="20"
      height="15"
      rx="4.8"
      fill={active ? "#eae5fb" : "#fff"}
      stroke="#9b87f5"
      strokeWidth="2.2"
    />
    <polyline
      points="22,25 30,34 38,25"
      fill="none"
      stroke="#9b87f5"
      strokeWidth="2.1"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

export default NailMessagesIcon;

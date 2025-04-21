
import React from "react";

/**
 * Minimal, high-end Search icon for mobile nav.
 * Style: outlined lens, brand purple, white circle bg, soft shadow.
 */
const NailSearchIcon: React.FC<React.SVGProps<SVGSVGElement> & { active?: boolean }> = ({
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
    <circle
      cx="28"
      cy="28"
      r="8.2"
      stroke="#9b87f5"
      strokeWidth="2.2"
      fill={active ? "#eae5fb" : "#fff"}
      style={{
        transition: "fill 0.3s",
      }}
    />
    <rect
      x="34"
      y="34"
      width="8"
      height="2.5"
      rx="1.2"
      transform="rotate(45 34 34)"
      fill={active ? "#9b87f5" : "#eae5fb"}
      style={{ transition: "fill 0.3s" }}
    />
  </svg>
);

export default NailSearchIcon;

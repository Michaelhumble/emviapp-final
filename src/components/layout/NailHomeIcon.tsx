
import React from "react";

/**
 * Minimalist "Home" icon – geometric outline, extra clean/modern.
 * Inspired by high-end social/mobile apps.
 */
const NailHomeIcon: React.FC<React.SVGProps<SVGSVGElement> & { active?: boolean }> = ({
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
      d="M18 29.5 L30 19 L42 29.5"
      stroke="#9b87f5"
      strokeWidth={2.1}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <rect
      x="22.5" y="29.5"
      width="15" height="10.5"
      rx="3"
      fill={active ? "#eae5fb" : "#fff"}
      stroke="#9b87f5"
      strokeWidth={2.1}
    />
  </svg>
);

export default NailHomeIcon;

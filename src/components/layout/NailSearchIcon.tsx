
import React from "react";

/**
 * Minimal, modern Search icon – outlined circle lens & handle.
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
      r="8"
      stroke="#9b87f5"
      strokeWidth="2.1"
      fill={active ? "#eae5fb" : "#fff"}
    />
    <line
      x1="34.5"
      y1="34.5"
      x2="41"
      y2="41"
      stroke="#9b87f5"
      strokeWidth={2.1}
      strokeLinecap="round"
    />
  </svg>
);

export default NailSearchIcon;

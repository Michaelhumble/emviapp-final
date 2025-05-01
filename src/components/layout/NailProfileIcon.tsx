
import React from "react";

/**
 * Minimal Profile icon — modern single-line bust.
 */
const NailProfileIcon: React.FC<React.SVGProps<SVGSVGElement> & { active?: boolean }> = ({
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
      cx="30"
      cy="25.7"
      r="6.6"
      stroke="#9b87f5"
      strokeWidth="2"
      fill={active ? "#eae5fb" : "#fff"}
    />
    <path
      d="M21.5 39.2c2.5-4 14.5-4 17 0"
      stroke="#9b87f5"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

export default NailProfileIcon;

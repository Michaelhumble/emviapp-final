
import React from "react";

/**
 * Minimal, luxury Profile icon for nav bar.
 * Style: simple outlined head, soft purple accent.
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
      cy="26"
      r="7.2"
      stroke="#9b87f5"
      strokeWidth="2.2"
      fill={active ? "#eae5fb" : "#fff"}
    />
    <rect
      x="20.7"
      y="37.3"
      width="18.6"
      height="6"
      rx="3"
      fill={active ? "#eae5fb" : "#fff"}
      stroke="#9b87f5"
      strokeWidth="2.1"
    />
  </svg>
);

export default NailProfileIcon;

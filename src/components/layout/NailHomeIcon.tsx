
import React from "react";

/**
 * Minimalist Nail Icon — for Home navigation, premium look.
 * Colors: Brand purple, white, soft shadow for depth.
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
      d="M30 14
         C40 16, 46 27, 30 49
         C14 27, 20 16, 30 14
         Z"
      fill={active ? "#9b87f5" : "#eae5fb"}
      stroke="#9b87f5"
      strokeWidth="2.2"
      style={{
        transition: "fill 0.3s, stroke 0.2s",
      }}
    />
    {/* Elegant dot for nail art accent */}
    <circle
      cx="30"
      cy="28"
      r="2.7"
      fill={active ? "#fff" : "#9b87f5"}
      stroke="#9b87f5"
      strokeWidth="0.6"
      opacity="0.65"
      style={{
        transition: "fill 0.3s, stroke 0.2s",
      }}
    />
  </svg>
);

export default NailHomeIcon;

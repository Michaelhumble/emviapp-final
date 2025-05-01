
import React from "react";

/**
 * Minimal luxury Messages icon — envelope with rounded lines.
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
      x="18"
      y="22"
      width="24"
      height="16"
      rx="4.6"
      fill={active ? "#eae5fb" : "#fff"}
      stroke="#9b87f5"
      strokeWidth={2.1}
    />
    <polyline
      points="19.5,24 30,32 40.5,24"
      fill="none"
      stroke="#9b87f5"
      strokeWidth={2}
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

export default NailMessagesIcon;

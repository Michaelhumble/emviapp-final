
// src/components/EmviLogo.tsx
const EmviLogo = () => {
  return (
    <div className="flex items-center space-x-2">
      <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
        <path
          d="M10 80 L50 20 L90 80"
          stroke="url(#vGradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="vGradient" x1="10" y1="20" x2="90" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF4500" /> {/* Orange */}
            <stop offset="1" stopColor="#FF0000" /> {/* Red */}
          </linearGradient>
        </defs>
      </svg>
      <span className="text-xl font-bold text-white dark:text-white light:text-black">EmviApp</span>
    </div>
  );
};

export default EmviLogo;

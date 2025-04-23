
import React from "react";

interface Props {
  current?: number;
  required?: number;
  label?: string;
}

// Luxury EmviApp milestone progress bar
const NextMilestoneProgress: React.FC<Props> = ({
  current = 3,
  required = 5,
  label = "2 more bookings to unlock '5-Star Streak' ⭐",
}) => {
  const percent = (current / required) * 100;

  return (
    <div className="w-full mb-6">
      <div className="flex flex-col items-center justify-center gap-2">
        <span className="font-medium text-sm xs:text-base text-emvi-accent text-center mb-1">
          {label}
        </span>
        <div className="w-full rounded-full bg-[#ede9fe] h-2.5 xs:h-3 shadow-inner overflow-hidden relative">
          <div
            className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="block mt-1 text-xs text-gray-400 font-serif">
          Progress: {current} / {required}
        </span>
      </div>
    </div>
  );
};

export default NextMilestoneProgress;


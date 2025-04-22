
import React from "react";
import {
  Award,
  Star,
  Trophy,
  BadgeCheck,
  BadgeX,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const BADGES = [
  {
    key: "first-10-bookings",
    label: "First 10 Bookings",
    icon: Award,
    earned: true,
    description: "Complete 10 bookings to earn this badge.",
  },
  {
    key: "5-star-streak",
    label: "5-Star Streak",
    icon: Star,
    earned: false,
    description: "Receive 5 consecutive 5-star reviews.",
  },
  {
    key: "referral-champion",
    label: "Referral Champion",
    icon: Trophy,
    earned: false,
    description: "Invite 3 new artists who complete profiles.",
  },
  {
    key: "portfolio-pro",
    label: "Portfolio Pro",
    icon: BadgeCheck,
    earned: true,
    description: "Upload 10+ portfolio items.",
  },
  {
    key: "zero-cancellations",
    label: "Flawless Month",
    icon: BadgeX,
    earned: false,
    description: "Maintain zero cancellations in 1 month.",
  },
];

// Visual styles
const iconBase =
  "w-10 h-10 md:w-11 md:h-11 transition duration-200";
const earnedGlow =
  "text-[#9b87f5] drop-shadow-[0_0_6px_rgba(155,135,245,0.14)] bg-gradient-to-br from-purple-50 to-purple-100";
const lockedGray =
  "text-gray-300 bg-gradient-to-br from-[#f1f0fb] to-[#e7e3f6] opacity-80";

const MilestoneBadges: React.FC = () => (
  <section aria-label="Milestone Badges" className="w-full">
    <div className="mx-auto max-w-2xl mb-6 flex flex-col items-center">
      <h2 className="text-base xs:text-lg font-serif font-semibold text-emvi-dark mb-2 xs:mb-3 select-none">
        Milestone Badges
      </h2>
      <div
        className="
          flex flex-wrap justify-center gap-4 xs:gap-5 sm:gap-6 w-full 
          [&>*]:flex-shrink-0
          "
      >
        <TooltipProvider>
          {BADGES.map((badge) => {
            const isEarned = badge.earned;
            const Icon = badge.icon;
            return (
              <Tooltip key={badge.key} delayDuration={160}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-xl p-2 xs:p-2.5 group transition-all ease-in-out duration-200 select-none",
                      isEarned
                        ? "bg-white border border-purple-100 shadow-sm hover:shadow-md hover:scale-[1.05]"
                        : "bg-gray-50 border border-gray-100",
                      "min-w-[76px] xs:min-w-[88px] active:scale-95"
                    )}
                    tabIndex={0}
                    aria-label={badge.label + (isEarned ? "" : " (Locked)")}
                  >
                    <span
                      className={cn(
                        "mb-1 rounded-full p-2 flex items-center justify-center transition-all duration-200",
                        isEarned
                          ? earnedGlow + " bg-opacity-80"
                          : lockedGray + " bg-opacity-90 grayscale"
                      )}
                    >
                      <Icon
                        className={iconBase}
                        strokeWidth={isEarned ? 2 : 1.5}
                        aria-hidden="true"
                      />
                    </span>
                    <span
                      className={cn(
                        "font-serif text-xs xs:text-sm font-medium text-center",
                        isEarned
                          ? "text-emvi-accent"
                          : "text-gray-400"
                      )}
                    >
                      {badge.label}
                    </span>
                    {!isEarned && (
                      <span className="text-[10px] xs:text-xs mt-0.5 font-normal rounded bg-gray-100 text-gray-400 px-1.5 py-0.5 pointer-events-none">
                        Locked
                      </span>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="max-w-xs text-[13px] rounded-lg shadow-lg bg-white/95 text-emvi-dark font-normal px-3 py-2 z-50"
                >
                  {badge.description}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
    </div>
  </section>
);

export default MilestoneBadges;

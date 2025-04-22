
import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const WEEKLY_GOAL = 7;
const BOOKINGS_THIS_WEEK = 5;
// Calculate progress for the bar
const progressPercent = (BOOKINGS_THIS_WEEK / WEEKLY_GOAL) * 100;
const bookingsRemaining = Math.max(WEEKLY_GOAL - BOOKINGS_THIS_WEEK, 0);

const WEEKLY_PROGRESS_GRADIENT =
  "bg-gradient-to-r from-[#f4edfa] via-[#ede6fb] to-[#e4eafb]";

// Main component
const WeeklyProgressTracker: React.FC = () => (
  <section
    aria-label="Weekly Progress Tracker"
    className="w-full px-2 xs:px-3 py-1 mb-2"
  >
    <div className="mx-auto max-w-xl rounded-2xl bg-white/60 backdrop-blur-sm shadow-[0_2px_24px_-4px_rgba(155,135,245,0.07)] p-5 xs:p-7 flex flex-col items-center text-center gap-2 sm:gap-3">
      <h2 className="font-serif text-base xs:text-lg font-semibold text-emvi-accent mb-1">
        You're Almost There!
      </h2>

      {/* Progress numbers */}
      <div className="font-medium text-[15px] xs:text-base text-gray-800 mb-2">
        {BOOKINGS_THIS_WEEK} <span className="opacity-70">/</span> {WEEKLY_GOAL} bookings this week
      </div>

      {/* Progress bar */}
      <div className={cn("w-full max-w-xs sm:max-w-sm mb-1", WEEKLY_PROGRESS_GRADIENT, "rounded-full p-[2px]")}>
        <Progress
          value={progressPercent}
          indicatorClassName="!bg-gradient-to-r from-[#9b87f5] to-[#e7e7fa]"
          className="h-2 bg-transparent"
        />
      </div>

      {/* Motivational Subtext */}
      <div className="text-xs xs:text-sm text-gray-500 font-serif mb-2 xs:mb-3 min-h-[1.3em]">
        {bookingsRemaining > 0
          ? <>Just <span className="font-semibold text-emvi-accent">{bookingsRemaining}</span> more booking{bookingsRemaining > 1 ? "s" : ""} to hit your weekly goal — keep shining!</>
          : <>Goal reached! Amazing work — celebrate your momentum 🎉</>
        }
      </div>

      {/* Tips Button/Link */}
      <Button
        asChild
        size="sm"
        variant="ghost"
        className="text-xs font-semibold px-3 py-1.5 rounded-md text-emvi-accent hover:text-white hover:bg-emvi-accent transition-colors"
      >
        <a href="/dashboard/artist/tips" tabIndex={0}>View Tips to Reach Your Goal</a>
      </Button>
    </div>
  </section>
);

export default WeeklyProgressTracker;

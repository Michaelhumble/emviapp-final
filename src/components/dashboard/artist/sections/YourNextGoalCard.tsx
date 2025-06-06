
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CircleDot } from "lucide-react";

const GOAL_DATA = {
  emoji: "🎯",
  title: "Just 1 more booking to hit your weekly target!",
  subtitle: "You're so close to your goal — keep up the amazing work.",
  progressLabel: "6 / 7 bookings",
  progressPercent: 86,
  action: "View Tips"
};

const cardGradient =
  "bg-gradient-to-br from-[#F1F0FB] via-[#E5DEFF]/70 to-white";

const YourNextGoalCard: React.FC = () => (
  <Card
    className={`${cardGradient} border-0 shadow-none rounded-2xl mb-6`}
    aria-label="Your Next Goal"
  >
    <CardContent className="py-6 px-5 flex flex-col justify-between h-full">
      <div className="flex items-center gap-4 mb-2">
        <span className="inline-flex justify-center items-center rounded-full bg-gradient-to-br from-[#E5DEFF] to-[#F1F0FB] w-10 h-10 text-2xl shadow-sm">
          {GOAL_DATA.emoji}
        </span>
        <div>
          <h2 className="font-playfair text-base md:text-lg font-bold text-emvi-dark">
            {GOAL_DATA.title}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {GOAL_DATA.subtitle}
          </p>
        </div>
      </div>

      <div className="my-4 flex items-center gap-2">
        {/* Subtle progress bar */}
        <div className="flex-1 h-2 rounded-full bg-[#E5DEFF]/70 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-2 rounded-full bg-[#9b87f5]"
            style={{ width: `${GOAL_DATA.progressPercent}%`, transition: "width 0.4s" }}
          />
        </div>
        <span className="ml-3 flex items-center text-xs text-emvi-accent min-w-fit font-medium">
          <CircleDot className="h-4 w-4 mr-1 text-[#9b87f5]" />
          {GOAL_DATA.progressLabel}
        </span>
      </div>

      <Button
        size="sm"
        variant="outline"
        className="mt-2 border-emvi-accent text-emvi-accent hover:bg-[#F1F0FB] font-semibold w-max self-end"
        tabIndex={-1}
        aria-label={GOAL_DATA.action}
        // Placeholder action
        onClick={e => e.preventDefault()}
      >
        {GOAL_DATA.action}
      </Button>
    </CardContent>
  </Card>
);

export default YourNextGoalCard;

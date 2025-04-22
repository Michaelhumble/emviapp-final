
import React, { useMemo, useState } from "react";
import { UserPlus, ImagePlus, DollarSign, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// EmviApp's premium color palette
const GRADIENT = "bg-gradient-to-br from-[#F1F0FB] via-[#E5DEFF]/90 to-white";
const CARD_GRADIENT =
  "bg-gradient-to-br from-[#e5deff] via-[#f1f0fb] to-white";
const ACCENT = "#9b87f5";

// Mocked user progress for this week (toggle as needed)
const TASKS = [
  {
    label: "Add 2 new photos",
    icon: ImagePlus,
    complete: false, // mock state
  },
  {
    label: "Invite a client",
    icon: UserPlus,
    complete: false, // mock state
  },
  {
    label: "Update pricing",
    icon: DollarSign,
    complete: false, // mock state
  },
];

// Pick a random suggestion per "user" session (mock)
const SUGGESTIONS = [
  {
    icon: ImagePlus,
    headline: "Boost Your Visibility Today!",
    detail:
      "Adding recent photos keeps your portfolio fresh and helps you book more dream clients. Show off your latest styles!",
    ctaText: "Add Photos",
    ctaLink: "/dashboard/artist/portfolio",
    taskIndex: 0,
  },
  {
    icon: UserPlus,
    headline: "Grow Your Loyal Client List",
    detail:
      "Invite a client to EmviApp with your referral link and unlock exclusive rewards. Happy clients bring repeat bookings!",
    ctaText: "Invite Clients",
    ctaLink: "/dashboard/artist/referral",
    taskIndex: 1,
  },
  {
    icon: DollarSign,
    headline: "Keep Your Pricing Competitive",
    detail:
      "Updating your pricing can attract more clients and help you stand out in search. Make sure your rates reflect your artistry.",
    ctaText: "Update Pricing",
    ctaLink: "/dashboard/artist/pricing",
    taskIndex: 2,
  },
];

function getRandomSuggestion(seen = []) {
  // Filter out already seen if possible, else random
  const available = SUGGESTIONS.filter((_, i) => !seen.includes(i));
  const pool = available.length ? available : SUGGESTIONS;
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx];
}

const PROGRESS_LABEL = "3 Steps to Grow This Week";

const GrowYourBusiness: React.FC = () => {
  // Simulate completing 0, 1, or 2 steps
  const [completedSteps] = useState(() =>
    Math.floor(Math.random() * 3)
  );
  // "User" sees same suggestion per visit
  const [seenSuggestions, setSeenSuggestions] = useState<number[]>([]);
  const suggestion = useMemo(() => {
    const randomIdx = Math.floor(Math.random() * SUGGESTIONS.length);
    setSeenSuggestions((prev) =>
      prev.includes(randomIdx) ? prev : [...prev, randomIdx]
    );
    return SUGGESTIONS[randomIdx];
  }, []);

  // Steps completion mock logic
  const steps = TASKS.map((task, idx) => ({
    ...task,
    complete: idx < completedSteps,
  }));

  return (
    <section
      aria-label="Grow Your Business Success Coach"
      className="w-full max-w-2xl mx-auto px-2 xs:px-3 pt-2 pb-5 mb-6"
    >
      {/* Progress Tracker */}
      <div
        className={cn(
          "flex items-center gap-4 xs:gap-7 rounded-2xl px-4 xs:px-7 py-3 bg-white/60 shadow-sm backdrop-blur-[2px] mb-4",
          GRADIENT
        )}
      >
        <span className="font-serif text-xs xs:text-sm font-semibold text-emvi-accent uppercase tracking-wide mr-3">
          {PROGRESS_LABEL}
        </span>
        <ol className="flex-1 flex items-center justify-end gap-4 xs:gap-6">
          {steps.map((step, idx) => (
            <li key={step.label} className="flex flex-col items-center group">
              <span
                className={cn(
                  "rounded-full flex items-center justify-center transition-all duration-200",
                  step.complete
                    ? "bg-gradient-to-br from-[#bda9f9] to-[#d1c3ff] text-white shadow"
                    : "bg-gray-200/70 text-gray-400"
                )}
                style={{ width: 32, height: 32 }}
              >
                {step.complete ? (
                  <CheckCheck
                    className="w-5 h-5"
                    strokeWidth={2.4}
                  />
                ) : (
                  <step.icon className="w-5 h-5" strokeWidth={2.1} />
                )}
              </span>
              <span className="text-[10px] xs:text-xs mt-1 font-medium text-gray-500 text-center w-16 truncate group-hover:opacity-100 opacity-80">{step.label}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Dynamic Smart Suggestion Card */}
      <div
        className={cn(
          CARD_GRADIENT,
          "rounded-2xl shadow-[0_2px_20px_0_rgba(155,135,245,0.07)] p-5 xs:p-7 flex flex-col items-center text-center min-h-[220px] transition-all"
        )}
      >
        <span className="flex items-center justify-center w-12 h-12 mb-2 rounded-full bg-emvi-accent/10 shadow">
          <suggestion.icon className="w-7 h-7 text-emvi-accent" strokeWidth={2.1} />
        </span>
        <h3 className="font-serif text-base xs:text-lg font-bold text-emvi-dark mb-2">
          {suggestion.headline}
        </h3>
        <p className="text-gray-700 text-sm xs:text-base mb-5 max-w-xs">
          {suggestion.detail}
        </p>
        <Button
          asChild
          variant="default"
          size="sm"
          className={cn(
            "mt-1 w-full xs:w-auto px-6 rounded-lg font-semibold text-base bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] shadow text-white hover:opacity-95 transition"
          )}
        >
          <a href={suggestion.ctaLink}>{suggestion.ctaText}</a>
        </Button>
      </div>
    </section>
  );
};

export default GrowYourBusiness;

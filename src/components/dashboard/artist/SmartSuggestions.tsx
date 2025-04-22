
import React, { useMemo } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

// Allowed icons: camera (per app policies)
const mockSuggestions = [
  {
    icon: Camera,
    title: "Add 2 new photos to your portfolio",
    description:
      "Showcase your best work to attract more clients and grow your brand visibility.",
    cta: "Do This Now",
    ctaHref: "/dashboard/artist/portfolio", // can be updated later
  },
  {
    icon: Camera,
    title: "Invite a client using your referral link",
    description:
      "Share your referral link and earn exclusive rewards when new clients join.",
    cta: "Get Referral Link",
    ctaHref: "/dashboard/artist/referral", // can be updated later
  },
];

function getTodaySuggestion() {
  // Rotate suggestions once per day for mock logic
  const today = new Date();
  return mockSuggestions[today.getDate() % mockSuggestions.length];
}

const SmartSuggestions: React.FC = () => {
  const suggestion = useMemo(getTodaySuggestion, []);

  const Icon = suggestion.icon;

  return (
    <section
      aria-label="Your Next Step"
      className="w-full px-2 xs:px-3 py-0 mb-2"
    >
      <div className="mx-auto max-w-xl rounded-2xl bg-gradient-to-br from-purple-50 via-white to-white shadow-[0_2px_20px_0_rgba(155,135,245,0.07)] p-5 xs:p-7 flex flex-col items-center text-center">
        <span className="text-xs xs:text-sm font-serif font-medium text-emvi-accent mb-1">
          Your Next Step
        </span>
        <div className="flex flex-col items-center gap-2 mb-3">
          <span className="flex items-center justify-center w-11 h-11 rounded-full bg-emvi-accent/10 mb-1">
            <Icon className="w-7 h-7 text-emvi-accent" strokeWidth={2.1} />
          </span>
          <h3 className="font-serif text-base xs:text-lg font-semibold text-gray-900 leading-tight">
            {suggestion.title}
          </h3>
        </div>
        <p className="text-gray-600 text-sm xs:text-base mb-4">{suggestion.description}</p>
        <Button
          asChild
          variant="default"
          size="sm"
          className="mt-1 xs:mt-0 w-full xs:w-auto px-6 rounded-lg font-semibold text-base"
        >
          <a href={suggestion.ctaHref}>{suggestion.cta}</a>
        </Button>
      </div>
    </section>
  );
};

export default SmartSuggestions;

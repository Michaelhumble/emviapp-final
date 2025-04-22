
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image, Handshake, DollarSign, Pen } from "lucide-react";

const SUGGESTIONS = [
  {
    icon: <Image className="text-[#9b87f5] w-5 h-5" aria-hidden="true" />,
    emoji: "📸",
    text: "Add 2 new photos to your portfolio",
    action: "Do This Now",
  },
  {
    icon: <Handshake className="text-[#7E69AB] w-5 h-5" aria-hidden="true" />,
    emoji: "🤝",
    text: "Invite a client to book with your referral link",
    action: "Do This Now",
  },
  {
    icon: <DollarSign className="text-[#6E59A5] w-5 h-5" aria-hidden="true" />,
    emoji: "📝",
    text: "Update your service pricing for better visibility",
    action: "Do This Now",
  },
];

const cardGradient =
  "bg-gradient-to-br from-[#F1F0FB] via-[#E5DEFF]/80 to-white";

const GrowYourBusinessCard: React.FC = () => (
  <Card
    className={`${cardGradient} border-0 shadow-none rounded-2xl mb-6`}
    aria-label="Grow Your Business Suggestions"
  >
    <CardContent className="py-6 px-5">
      <h2 className="font-playfair text-lg md:text-xl font-bold text-emvi-dark mb-4 flex items-center gap-2">
        <span className="inline-block rounded-full bg-white/80 p-2 shadow-sm mr-1">
          <Pen className="w-5 h-5 text-emvi-accent" aria-hidden="true" />
        </span>
        Grow Your Business
      </h2>
      <ul className="space-y-4">
        {SUGGESTIONS.map((s, i) => (
          <li
            key={i}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white/80 rounded-xl px-4 py-3 shadow-[0_2px_12px_0_rgba(155,135,245,0.05)] hover:shadow-md hover:bg-white transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <span
                className="inline-flex justify-center items-center rounded-full bg-gradient-to-br from-[#E5DEFF] to-[#F1F0FB] w-9 h-9 text-2xl"
                aria-label="Suggestion icon"
              >
                {s.emoji}
              </span>
              <span className="font-medium text-gray-800 text-sm md:text-base">
                {s.text}
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="mt-2 sm:mt-0 whitespace-nowrap border-emvi-accent text-emvi-accent hover:bg-[#F1F0FB]"
              tabIndex={-1}
              aria-label={s.action}
              onClick={e => e.preventDefault()}
            >
              {s.action}
            </Button>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default GrowYourBusinessCard;

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  {
    text: "Behind every masterpiece is a moment of courage. Keep creating.",
    author: "EmviApp Daily"
  },
  {
    text: "Your art inspires more people than you know.",
    author: "EmviApp Daily"
  },
  {
    text: "Consistency turns talent into legacy.",
    author: "EmviApp Daily"
  },
  {
    text: "Even the smallest detail in your work can light up someone's day.",
    author: "EmviApp Daily"
  },
  {
    text: "Progress happens one brushstroke at a time.",
    author: "EmviApp Daily"
  },
];

const cardGradient = "bg-gradient-to-br from-[#F1F0FB] via-[#E5DEFF] to-white";

const ArtistDailyMotivation = () => {
  // For now: keep only the first quote, but set up for easy expansion.
  const [activeIndex, setActiveIndex] = useState(0);

  // Future: rotating logic can be added if needed.
  const activeQuote = quotes[activeIndex];

  return (
    <Card className={`${cardGradient} border-0 shadow-none rounded-2xl mb-6`}>
      <CardContent className="py-6 px-5 flex flex-col items-center text-center min-h-[170px]">
        <div className="flex items-center justify-center mb-3">
          <span className="inline-flex rounded-full bg-white/80 shadow-sm backdrop-blur-md p-2">
            <Sparkles className="h-6 w-6 text-[#9b87f5] opacity-80" aria-hidden="true" />
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={activeQuote.text}
            className="font-serif text-lg md:text-xl text-gray-900 italic mb-2 px-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.56 }}
            aria-live="polite"
          >
            "{activeQuote.text}"
          </motion.blockquote>
        </AnimatePresence>
        <span className="text-xs text-[#7E69AB] font-semibold tracking-wide mb-2">{activeQuote.author}</span>
        <a
          href="#"
          tabIndex={-1}
          className="text-emvi-accent text-xs underline opacity-60 hover:opacity-100 transition"
          aria-label="See More Tips (coming soon)"
          onClick={e => e.preventDefault()}
        >
          See More Tips
        </a>
      </CardContent>
    </Card>
  );
};

export default ArtistDailyMotivation;

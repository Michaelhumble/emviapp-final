
import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth";

// Mock motivational quotes (add or rearrange as needed)
const QUOTES = [
  "Behind every masterpiece is a moment of courage. Keep creating.",
  "Your art inspires more people than you know.",
  "Consistency turns talent into legacy.",
  "Even the smallest detail in your work can light up someone's day.",
  "Progress happens one brushstroke at a time.",
  "Great artists grow daily, not in a day.",
];

// Pick the quote based on the current day of the year (rotates daily)
function getDailyQuote() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) -
      Date.UTC(today.getFullYear(), 0, 0)) /
      24 / 60 / 60 / 1000
  );
  return QUOTES[dayOfYear % QUOTES.length];
}

const DailyInspiration: React.FC = () => {
  const { userProfile } = useAuth();
  const firstName = userProfile?.full_name?.split(" ")[0] || undefined;
  const quote = getDailyQuote();

  // Optional: Friendly prefix with first name
  const personalPrefix = firstName ? `${firstName}, remember:` : `Remember:`;

  return (
    <motion.div
      className="mb-3 xs:mb-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.56, ease: "easeOut" }}
    >
      <div
        className="mx-auto max-w-xl px-4 py-5 xs:py-7 rounded-2xl shadow-[0_2px_20px_0_rgba(155,135,245,0.06)] bg-gradient-to-br from-[#F1F0FB]/80 via-[#E5DEFF]/80 to-white text-center select-none"
        aria-label="Artist Daily Inspiration"
        tabIndex={-1}
      >
        <span className="block text-xs xs:text-sm text-[#9b87f5] font-medium tracking-wide mb-1 xs:mb-2">
          Daily Inspiration
        </span>
        <span className="block font-serif text-lg xs:text-xl md:text-2xl text-gray-900 italic mb-2 xs:mb-3 fade-in">
          {personalPrefix}
        </span>
        <blockquote className="font-playfair text-base xs:text-lg md:text-xl text-emvi-dark leading-snug">
          “{quote}”
        </blockquote>
      </div>
    </motion.div>
  );
};

export default DailyInspiration;

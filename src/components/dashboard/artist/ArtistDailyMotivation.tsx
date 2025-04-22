
import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import motivationalMessages from "./motivationalMessages";

const cardGradient = "bg-gradient-to-br from-[#F1F0FB] via-[#E5DEFF] to-white";

// Get a daily rotating index based on current date, or random index for each visit
function getDailyMotivationIndex(messagesCount: number): number {
  const today = new Date();
  // Rotate by day for consistency, but allow fallback to random per session if desired
  return today.getFullYear() * 372 + (today.getMonth() + 1) * 31 + today.getDate() % messagesCount;
}

const ArtistDailyMotivation = () => {
  // Pick a message: by day, but could be randomized per session for more variety
  const motivation = useMemo(() => {
    const idx = getDailyMotivationIndex(motivationalMessages.length);
    return motivationalMessages[idx % motivationalMessages.length];
  }, []);

  return (
    <Card className={`${cardGradient} border-0 shadow-none rounded-2xl mb-3 xs:mb-6 w-full`}>
      <CardContent className="py-5 xs:py-6 px-3 xs:px-5 flex flex-col items-center text-center min-h-[120px] xs:min-h-[155px] justify-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.56, ease: "easeOut" }}
          className="w-full"
        >
          <div className="flex items-center justify-center mb-2 xs:mb-3">
            <span className="inline-flex rounded-full bg-white/80 shadow-sm backdrop-blur-md p-2">
              <Sparkles className="h-6 w-6 text-[#9b87f5] opacity-80" aria-hidden="true" />
            </span>
          </div>
          <blockquote
            className="font-playfair italic text-lg xs:text-xl md:text-2xl text-gray-900 mb-1 xs:mb-2 px-1 mx-auto max-w-2xl transition-all"
            aria-live="polite"
          >
            “{motivation}”
          </blockquote>
        </motion.div>
        <span className="text-[11px] xs:text-xs text-[#7E69AB] font-semibold tracking-wide">
          EmviApp Daily
        </span>
      </CardContent>
    </Card>
  );
};

export default ArtistDailyMotivation;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

const ArtistDailyMotivation = () => {
  // Daily motivation message from EmviApp
  const dailyMessage = {
    quote: "Behind every nail set, there's hustle. You're not alone.",
    author: "EmviApp Team"
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-serif">Daily Inspiration</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div 
          className="text-center p-4 bg-gray-50 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Quote className="h-8 w-8 text-purple-400 mx-auto mb-3 opacity-70" />
          <blockquote className="text-lg font-serif text-gray-800 italic mb-2">
            "{dailyMessage.quote}"
          </blockquote>
          <cite className="text-sm text-gray-500 not-italic">— {dailyMessage.author}</cite>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ArtistDailyMotivation;

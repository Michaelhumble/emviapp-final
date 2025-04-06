
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const ArtistMotivationalQuote = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-start">
              <Sparkles className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl md:text-2xl font-serif font-medium mb-2">
                  You're not just an artist—you're a brand.
                </h3>
                <p className="opacity-90">
                  Your unique style and vision is what sets you apart. Keep creating, keep inspiring, and watch your business grow.
                </p>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
};

export default ArtistMotivationalQuote;

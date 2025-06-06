
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CircleDot, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const GOAL_DATA = {
  emoji: "🎯",
  title: "Just 1 more booking to hit your weekly target!",
  subtitle: "You're so close to your goal — keep up the amazing work.",
  progressLabel: "6 / 7 bookings",
  progressPercent: 86,
  action: "View Tips"
};

const YourNextGoalCard: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -4 }}
  >
    <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-purple-50 via-white to-pink-50 mb-6 group">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
      
      <CardContent className="relative py-6 px-6 flex flex-col justify-between h-full">
        {/* Header with Premium Styling */}
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="flex justify-center items-center rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 w-12 h-12 text-2xl shadow-lg border border-white/50"
          >
            {GOAL_DATA.emoji}
          </motion.div>
          <div className="flex-1">
            <h2 className="font-playfair text-lg font-bold text-gray-900 leading-tight">
              {GOAL_DATA.title}
            </h2>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
              {GOAL_DATA.subtitle}
            </p>
          </div>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="my-5 flex items-center gap-3">
          <div className="flex-1 h-3 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 relative overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${GOAL_DATA.progressPercent}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-sm"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
          </div>
          <span className="flex items-center text-sm text-purple-700 font-semibold min-w-fit">
            <CircleDot className="h-4 w-4 mr-2 text-purple-500" />
            {GOAL_DATA.progressLabel}
          </span>
        </div>

        {/* Enhanced Action Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            size="sm"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold w-max self-end group"
            onClick={e => e.preventDefault()}
          >
            <Sparkles className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
            {GOAL_DATA.action}
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  </motion.div>
);

export default YourNextGoalCard;

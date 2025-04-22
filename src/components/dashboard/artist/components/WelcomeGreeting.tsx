
import React from 'react';
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface WelcomeGreetingProps {
  firstName: string;
}

const quotes = [
  "Every stroke of your brush creates beauty in the world ✨",
  "Your passion transforms ordinary moments into extraordinary art 🎨",
  "Behind every masterpiece is an artist who dared to begin 🌟",
  "Small steps create beautiful journeys in art 💫",
  "Today's creativity shapes tomorrow's inspiration 🌈"
];

const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

const WelcomeGreeting: React.FC<WelcomeGreetingProps> = ({ firstName }) => {
  // Get a random quote that changes on each render
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const greeting = getTimeBasedGreeting();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-0 shadow-sm overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5 mix-blend-overlay"></div>
        <div className="px-6 py-5 relative">
          <div className="flex items-start space-x-2">
            <Sparkles className="h-5 w-5 text-purple-500 mt-1" />
            <div>
              <h1 className="text-2xl font-serif font-medium text-gray-800">
                {greeting}, {firstName || 'Artist'} — Let's make today beautiful.
              </h1>
              <p className="mt-3 text-sm text-gray-600 italic">
                {randomQuote}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default WelcomeGreeting;

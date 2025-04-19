
import React from 'react';
import { useArtistData } from '../context/ArtistDataContext';
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const quotes = [
  "Every stroke of your brush creates beauty in the world ✨",
  "Your passion transforms ordinary moments into extraordinary art 🎨",
  "Behind every masterpiece is an artist who dared to begin 🌟",
  "Small steps create beautiful journeys in art 💫",
  "Today's creativity shapes tomorrow's inspiration 🌈"
];

const WelcomeGreeting = () => {
  const { firstName } = useArtistData();
  
  // Get a random quote that changes on each render
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-0 shadow-sm mb-6">
      <div className="px-6 py-5">
        <div className="flex items-start space-x-2">
          <Sparkles className="h-5 w-5 text-purple-500 mt-1" />
          <div>
            <h1 className="text-2xl font-serif font-medium text-gray-800">
              Welcome back, {firstName || 'Artist'}! 🎉
            </h1>
            <p className="text-lg mt-1 text-gray-600 font-light">
              Your art matters more than you think.
            </p>
            <p className="mt-3 text-sm text-gray-500 italic">
              {randomQuote}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WelcomeGreeting;

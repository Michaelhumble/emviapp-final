import React, { useState, useEffect } from 'react';
import { Sparkles, Star, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const motivationalQuotes = [
  {
    text: "Your passion for beauty transforms lives, one client at a time. ✨",
    author: "EmviApp Community",
    color: "from-purple-500 to-pink-500"
  },
  {
    text: "Every masterpiece starts with a single brushstroke. Keep creating! 🎨",
    author: "Beauty Inspiration",
    color: "from-pink-500 to-orange-500"
  },
  {
    text: "Your talent is your superpower. Share it with the world! 💫",
    author: "EmviApp Team",
    color: "from-purple-600 to-blue-500"
  }
];

const communityWins = [
  "🎉 Sarah just hit 1,000 followers!",
  "💅 Marcus completed his 500th nail art!",
  "⭐ Isabella received her 100th 5-star review!",
  "🔥 Alex's tutorial got 10k views!",
  "💝 Beauty salon got featured in Vogue!"
];

const DailyMotivation = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [currentWin, setCurrentWin] = useState(0);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 5000);

    const winInterval = setInterval(() => {
      setCurrentWin((prev) => (prev + 1) % communityWins.length);
    }, 3000);

    return () => {
      clearInterval(quoteInterval);
      clearInterval(winInterval);
    };
  }, []);

  return (
    <>
      {/* Daily Quote Banner */}
      <div className={`bg-gradient-to-r ${motivationalQuotes[currentQuote].color} text-white py-4`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6" />
              <div>
                <p className="font-medium">
                  {motivationalQuotes[currentQuote].text}
                </p>
                <p className="text-sm opacity-90">
                  — {motivationalQuotes[currentQuote].author}
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="text-sm">2,847 active today</span>
              </div>
              <Button 
                variant="secondary" 
                size="sm" 
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                Join VIP List
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Community Wins Ticker */}
      <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white py-2 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <Star className="h-4 w-4 flex-shrink-0" />
            <div className="flex-1 overflow-hidden">
              <div className="animate-pulse">
                <span className="font-medium">{communityWins[currentWin]}</span>
              </div>
            </div>
            <TrendingUp className="h-4 w-4" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyMotivation;
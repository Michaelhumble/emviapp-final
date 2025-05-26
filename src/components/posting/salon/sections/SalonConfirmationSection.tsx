
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, TrendingUp, Users, Zap } from "lucide-react";
import confetti from "canvas-confetti";

interface SalonConfirmationSectionProps {
  onComplete: () => void;
}

export const SalonConfirmationSection = ({ onComplete }: SalonConfirmationSectionProps) => {
  useEffect(() => {
    // Trigger confetti animation
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      }));
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      }));
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center space-y-8">
      {/* Success Animation */}
      <div className="relative">
        <div className="mx-auto w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
          <CheckCircle className="h-12 w-12 text-white" />
        </div>
        <div className="absolute inset-0 w-24 h-24 mx-auto bg-green-400 rounded-full animate-ping opacity-25"></div>
      </div>

      {/* Success Message */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          🎉 Congratulations!
        </h1>
        <h2 className="text-2xl font-semibold text-gray-900">
          Your Premium Salon Listing is Live!
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your salon is now featured on EmviApp's exclusive marketplace. 
          Get ready to connect with serious buyers!
        </p>
      </div>

      {/* Success Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center justify-center mb-3">
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Average Time to Sell</h3>
          <div className="text-3xl font-bold text-blue-600 mb-1">14 days</div>
          <p className="text-sm text-gray-600">Premium listings sell 3x faster</p>
        </div>

        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
          <div className="flex items-center justify-center mb-3">
            <Users className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Buyer Interest</h3>
          <div className="text-3xl font-bold text-emerald-600 mb-1">95%</div>
          <p className="text-sm text-gray-600">Of premium listings get multiple offers</p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
          <div className="flex items-center justify-center mb-3">
            <Star className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Success Rate</h3>
          <div className="text-3xl font-bold text-purple-600 mb-1">98%</div>
          <p className="text-sm text-gray-600">Premium listings close successfully</p>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-8 max-w-4xl mx-auto">
        <h3 className="font-semibold text-xl mb-4 text-amber-800">What Happens Next?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Badge className="bg-green-500 text-white">1</Badge>
              <span>Your listing goes live within 2 hours</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-500 text-white">2</Badge>
              <span>Verified buyers start viewing immediately</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-purple-500 text-white">3</Badge>
              <span>You'll receive buyer inquiries in your dashboard</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Badge className="bg-orange-500 text-white">4</Badge>
              <span>Our team screens all potential buyers</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-red-500 text-white">5</Badge>
              <span>We facilitate secure negotiations</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-emerald-500 text-white">6</Badge>
              <span>Complete your sale with legal support</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4"
          onClick={onComplete}
        >
          <Zap className="h-5 w-5 mr-2" />
          Go to Dashboard
        </Button>
        <Button 
          size="lg" 
          variant="outline"
          className="border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-4"
        >
          Share Your Listing
        </Button>
      </div>

      {/* Support Contact */}
      <div className="text-center pt-8">
        <p className="text-gray-600">
          Need help? Contact our Premium Support team at{" "}
          <a href="mailto:premium@emviapp.com" className="text-purple-600 hover:underline font-medium">
            premium@emviapp.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default SalonConfirmationSection;

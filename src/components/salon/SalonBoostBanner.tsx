
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rocket, Timer, Percent, Strikethrough } from "lucide-react";
import { BoostPricing, calculateBoostPricing } from "@/utils/pricing/salonBoostPricing";
import { useAuth } from "@/context/auth";
import { Link } from "react-router-dom";

interface SalonBoostBannerProps {
  className?: string;
  onBoostClick?: () => void;
}

export const SalonBoostBanner = ({ className, onBoostClick }: SalonBoostBannerProps) => {
  const { userProfile } = useAuth();
  const [pricing, setPricing] = useState<BoostPricing | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<{days: number, hours: number, minutes: number}>({
    days: 0,
    hours: 0,
    minutes: 0
  });

  // Initialize pricing on component mount
  useEffect(() => {
    const boostPricing = calculateBoostPricing(userProfile);
    setPricing(boostPricing);
  }, [userProfile]);

  // Update countdown timer
  useEffect(() => {
    if (!pricing?.launchOffer) return;

    const updateCountdown = () => {
      if (!pricing?.expiryDate) return;
      
      const now = new Date();
      const expiry = new Date(pricing.expiryDate);
      const difference = expiry.getTime() - now.getTime();
      
      if (difference <= 0) {
        // Offer expired, recalculate pricing
        setPricing(calculateBoostPricing(userProfile));
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeRemaining({ days, hours, minutes });
    };
    
    // Update immediately
    updateCountdown();
    
    // Set interval to update countdown
    const intervalId = setInterval(updateCountdown, 60000); // Every minute
    
    return () => clearInterval(intervalId);
  }, [pricing, userProfile]);

  // Handle boost click
  const handleBoostClick = () => {
    if (onBoostClick) {
      onBoostClick();
    }
  };

  if (!pricing) return null;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className={`overflow-hidden ${pricing.launchOffer ? 'border-amber-300' : ''}`}>
        <div className="relative">
          {pricing.isDiscounted && (
            <div className="absolute top-0 right-0">
              <Badge className="bg-amber-500 text-white m-2">
                <Percent className="h-3 w-3 mr-1" />
                {pricing.discountPercentage}% OFF
              </Badge>
            </div>
          )}
          
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-amber-100 to-amber-50 rounded-full">
                  <Rocket className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Boost My Salon</h3>
                  <div className="flex items-center gap-2">
                    {pricing.isDiscounted && (
                      <span className="text-gray-500 line-through flex items-center">
                        <Strikethrough className="h-3 w-3 mr-0.5" />
                        ${pricing.standardPrice}/day
                      </span>
                    )}
                    <span className="text-lg font-bold text-amber-600">
                      ${pricing.currentPrice}/day
                    </span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleBoostClick}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
              >
                Boost Now
              </Button>
            </div>
            
            {pricing.launchOffer && (
              <div className="mt-3 p-2 bg-amber-50 rounded-md border border-amber-100">
                <div className="flex items-start gap-2">
                  <Timer className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">
                      Limited Time: Boost for only ${pricing.currentPrice}/day ({pricing.discountPercentage}% OFF)
                    </p>
                    {timeRemaining.days > 0 && (
                      <p className="text-xs text-amber-700 mt-1">
                        Launch offer expires in: {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {pricing.isDiscounted && !pricing.launchOffer && (
              <div className="mt-3 p-2 bg-green-50 rounded-md border border-green-100">
                <p className="text-sm text-green-700">
                  <span className="font-medium">{pricing.discountReason}:</span> You've unlocked special pricing!
                </p>
              </div>
            )}
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
};

export default SalonBoostBanner;

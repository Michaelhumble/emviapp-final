
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import { motion } from "framer-motion";

export type UpgradeFeature = 
  | "messaging"
  | "multiple-posts"
  | "analytics"
  | "profile-promotion"
  | "salon-visibility"
  | "artist-contact";

interface FeatureContent {
  title: string;
  description: string;
  benefit: string;
  statistic: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

const featureContent: Record<UpgradeFeature, FeatureContent> = {
  "messaging": {
    title: "Unlock Direct Messaging",
    description: "Connect instantly with clients and professionals",
    benefit: "Faster responses lead to more bookings",
    statistic: "Pro users get 3x more client responses",
    testimonial: {
      quote: "Direct messaging helped me fill my booking calendar within a week!",
      author: "Sophia Chen",
      role: "Independent Nail Artist"
    }
  },
  "multiple-posts": {
    title: "Post Multiple Listings",
    description: "Expand your reach with unlimited posts",
    benefit: "Find the perfect match faster",
    statistic: "Pro users fill positions 4x faster",
    testimonial: {
      quote: "I found three amazing stylists in under a week with multiple postings",
      author: "James Wilson",
      role: "Salon Owner"
    }
  },
  "analytics": {
    title: "Unlock Detailed Analytics",
    description: "Gain powerful insights into your business performance",
    benefit: "Make data-driven decisions that grow your business",
    statistic: "Pro users increase revenue by 32% on average",
    testimonial: {
      quote: "The analytics helped me identify which services to promote, boosting my revenue significantly",
      author: "Michelle Lee",
      role: "Salon Manager"
    }
  },
  "profile-promotion": {
    title: "Boost Your Profile Visibility",
    description: "Stand out from the crowd with premium placement",
    benefit: "Get seen by more potential clients",
    statistic: "Pro profiles receive 5x more views",
    testimonial: {
      quote: "After upgrading, my booking requests doubled in just two weeks!",
      author: "David Martinez",
      role: "Barber"
    }
  },
  "salon-visibility": {
    title: "Premium Salon Visibility",
    description: "Put your salon in the spotlight",
    benefit: "Attract more high-quality clients to your business",
    statistic: "Featured salons see 4x client growth",
    testimonial: {
      quote: "Our salon bookings increased 70% within a month of upgrading to Pro",
      author: "Jennifer Taylor",
      role: "Salon Owner"
    }
  },
  "artist-contact": {
    title: "Connect With Top Artists",
    description: "Direct access to the best talent in your area",
    benefit: "Build your dream team faster",
    statistic: "Pro salons fill positions 3x quicker",
    testimonial: {
      quote: "I found my star nail technician through premium artist access. Best decision ever!",
      author: "Robert Kim",
      role: "Salon Owner"
    }
  }
};

interface SmartUpgradePromptProps {
  feature: UpgradeFeature;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SmartUpgradePrompt: React.FC<SmartUpgradePromptProps> = ({
  feature,
  open,
  onOpenChange
}) => {
  const [showPricing, setShowPricing] = useState(false);
  const navigate = useNavigate();
  const content = featureContent[feature];

  const handleLearnMore = () => {
    setShowPricing(true);
  };

  const handleUpgrade = () => {
    navigate("/pricing");
    onOpenChange(false);
  };

  const handleClose = () => {
    setShowPricing(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{content.title}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            {content.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {!showPricing ? (
            // Value proposition first
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="bg-primary/5 p-4 rounded-lg">
                <p className="font-medium text-lg">{content.statistic}</p>
                <p className="text-sm text-muted-foreground">{content.benefit}</p>
              </div>
              
              {content.testimonial && (
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <p className="italic text-sm mb-2">"{content.testimonial.quote}"</p>
                  <p className="text-xs text-right font-medium">
                    — {content.testimonial.author}, {content.testimonial.role}
                  </p>
                </div>
              )}
              
              <Button 
                className="w-full" 
                onClick={handleLearnMore}
              >
                Learn About Pro Features
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          ) : (
            // Show pricing after they've seen the value
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold">Upgrade to Pro</h3>
                <p className="text-sm text-muted-foreground">
                  Unlock all premium features with our Pro plans
                </p>
              </div>
              
              <div className="grid gap-3">
                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Solo Artist</p>
                      <p className="text-xs text-muted-foreground">Perfect for independent artists</p>
                    </div>
                    <p className="font-bold">$49.95<span className="text-xs font-normal">/mo</span></p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 bg-primary/5 border-primary/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Small Salon</p>
                      <p className="text-xs text-muted-foreground">Up to 5 artists</p>
                    </div>
                    <p className="font-bold">$99<span className="text-xs font-normal">/mo</span></p>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleUpgrade} className="w-full">
                See All Plans
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                Join now, cancel anytime. 30-day satisfaction guarantee.
              </p>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SmartUpgradePrompt;

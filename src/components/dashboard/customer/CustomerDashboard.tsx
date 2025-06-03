
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import CustomerWelcomeHeader from "./CustomerWelcomeHeader";
import CustomerBookingsSection from "./CustomerBookingsSection";
import CustomerReferralCard from "./CustomerReferralCard";
import CustomerLoyaltySection from "./loyalty/CustomerLoyaltySection";
import FavoritesSection from "./favorites/FavoritesSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Sparkles, 
  Gift, 
  Star, 
  Crown, 
  Zap, 
  Users, 
  Heart,
  MessageSquare,
  Trophy,
  Camera,
  Share2,
  Lock,
  Lightbulb,
  TrendingUp,
  Target,
  Confetti
} from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";

// Feature Suggestion Widget Component
const FeatureSuggestionWidget = ({ section }: { section: string }) => {
  const [showSuggestionForm, setShowSuggestionForm] = useState(false);

  const handleSuggestFeature = () => {
    setShowSuggestionForm(true);
    toast.success("Feature suggestion recorded! You earned +5 credits 🎉");
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <motion.div 
      className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-3 mb-4"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-purple-500" />
          <span className="text-sm font-medium text-purple-800">
            Help shape {section}! 
          </span>
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
            +5 credits
          </Badge>
        </div>
        <Button 
          size="sm" 
          variant="outline"
          onClick={handleSuggestFeature}
          className="text-xs border-purple-200 text-purple-700 hover:bg-purple-50"
        >
          <Zap className="h-3 w-3 mr-1" />
          Suggest
        </Button>
      </div>
    </motion.div>
  );
};

// Sticky Invite Progress Component
const StickyInviteProgress = () => {
  const { userProfile } = useAuth();
  const inviteCount = 3; // Mock data
  const nextReward = 5;
  const progress = (inviteCount / nextReward) * 100;

  return (
    <motion.div 
      className="fixed bottom-4 right-4 z-50 bg-white/90 backdrop-blur-lg border border-purple-200 rounded-2xl p-4 shadow-2xl max-w-xs"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Trophy className="h-4 w-4 text-amber-500" />
        <span className="text-sm font-semibold text-gray-800">Invite Challenge</span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-600">
          <span>{inviteCount}/{nextReward} friends invited</span>
          <span className="text-purple-600 font-medium">+50 credits</span>
        </div>
        <Progress value={progress} className="h-2 bg-gray-100" />
        <div className="text-xs text-gray-500">
          Top Inviters: ⭐ Sarah (12), 🔥 Alex (9), 💎 You (3rd!)
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced FOMO Empty State Component
const FOMOEmptyState = ({ 
  type, 
  title, 
  description, 
  ctaText, 
  reward,
  onAction 
}: {
  type: 'bookings' | 'favorites' | 'reviews';
  title: string;
  description: string;
  ctaText: string;
  reward: string;
  onAction: () => void;
}) => {
  return (
    <Card className="bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 border-purple-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full -translate-y-16 translate-x-16" />
      <CardContent className="relative p-8 text-center">
        <div className="mb-4">
          {type === 'bookings' && <Sparkles className="h-12 w-12 text-purple-400 mx-auto animate-pulse" />}
          {type === 'favorites' && <Heart className="h-12 w-12 text-pink-400 mx-auto animate-pulse" />}
          {type === 'reviews' && <Star className="h-12 w-12 text-amber-400 mx-auto animate-pulse" />}
        </div>
        <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-center gap-2 mb-4">
          <Gift className="h-4 w-4 text-purple-500" />
          <span className="text-sm font-medium text-purple-700">{reward}</span>
        </div>
        <Button 
          onClick={onAction}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-8 shadow-lg"
        >
          {ctaText}
        </Button>
      </CardContent>
    </Card>
  );
};

// VIP Waitlist Card Component
const VIPWaitlistCard = ({ 
  feature, 
  description, 
  estimatedLaunch 
}: {
  feature: string;
  description: string;
  estimatedLaunch: string;
}) => {
  const [joined, setJoined] = useState(false);

  const handleJoinWaitlist = () => {
    setJoined(true);
    toast.success("🎉 VIP access requested! You'll be first to know!");
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-purple-900 text-white border-0">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lock className="h-5 w-5 text-purple-300" />
            {feature}
          </CardTitle>
          <Badge className="bg-gradient-to-r from-amber-400 to-orange-400 text-black font-semibold">
            VIP Early Access
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <p className="text-purple-100 mb-4">{description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-purple-200">Est. Launch: {estimatedLaunch}</span>
          <span className="text-xs text-amber-300">🔥 847 people waiting</span>
        </div>
        <Button 
          onClick={handleJoinWaitlist}
          disabled={joined}
          className={`w-full ${
            joined 
              ? 'bg-green-600 hover:bg-green-600' 
              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
          } text-white font-semibold rounded-lg`}
        >
          {joined ? (
            <>
              <Crown className="h-4 w-4 mr-2" />
              VIP Access Secured! ✨
            </>
          ) : (
            <>
              <Zap className="h-4 w-4 mr-2" />
              Request VIP Access
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

// Achievement Share Card Component
const AchievementShareCard = () => {
  const { userProfile } = useAuth();
  
  const handleShare = () => {
    toast.success("Achievement shared! You earned +10 credits 🎉");
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg text-amber-800">
          <Trophy className="h-5 w-5 text-amber-600" />
          Share Your Beauty Journey
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-white rounded-lg p-4 mb-4 border border-amber-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
              <Crown className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">{userProfile?.full_name || 'Beauty Lover'}</p>
              <p className="text-sm text-gray-600">Level 3 Beauty Explorer 🌟</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 mb-2">
            "Just discovered my signature nail style on EmviApp! 💅✨"
          </p>
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-xs">#NailArt</Badge>
            <Badge variant="secondary" className="text-xs">#SelfCare</Badge>
            <Badge variant="secondary" className="text-xs">#EmviApp</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleShare}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Story (+10 credits)
          </Button>
          <Button variant="outline" className="border-amber-200">
            <Camera className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const CustomerDashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const isMobile = useIsMobile();
  const [showConfetti, setShowConfetti] = useState(false);

  // Trigger welcome confetti on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleEmptyStateAction = (type: string) => {
    switch(type) {
      case 'bookings':
        window.location.href = '/explore/artists';
        break;
      case 'favorites':
        window.location.href = '/explore/artists';
        break;
      default:
        toast.info("Feature coming soon! You've been added to VIP early access 🌟");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <div className="container mx-auto px-4 py-6 space-y-8 max-w-6xl">
        
        {/* Enhanced Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <CustomerWelcomeHeader />
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Features */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Referral Section with Feature Suggestion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <FeatureSuggestionWidget section="Referrals" />
              <CustomerReferralCard />
            </motion.div>

            {/* Bookings Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <FeatureSuggestionWidget section="Bookings" />
              <CustomerBookingsSection />
            </motion.div>

            {/* Favorites Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <FeatureSuggestionWidget section="Favorites" />
              <FavoritesSection />
            </motion.div>

            {/* VIP Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <VIPWaitlistCard 
                feature="AI Style Match"
                description="Get personalized nail art recommendations based on your preferences, skin tone, and lifestyle."
                estimatedLaunch="March 2024"
              />
              <VIPWaitlistCard 
                feature="Beauty Calendar"
                description="Never miss a touch-up! Smart scheduling with automatic reminders and seasonal style suggestions."
                estimatedLaunch="April 2024"
              />
            </motion.div>

            {/* Achievement Share */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <AchievementShareCard />
            </motion.div>

          </div>

          {/* Right Column - Loyalty & Quick Actions */}
          <div className="space-y-8">
            
            {/* Loyalty Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <FeatureSuggestionWidget section="Rewards" />
              <CustomerLoyaltySection />
            </motion.div>

            {/* Premium Unlock Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="relative overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600 text-white border-0">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700/50 to-pink-700/50" />
                <CardHeader className="relative">
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-amber-300" />
                    Unlock Premium
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-purple-100">
                      <Zap className="h-4 w-4 text-amber-300" />
                      <span className="text-sm">Priority booking</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-100">
                      <Star className="h-4 w-4 text-amber-300" />
                      <span className="text-sm">Exclusive artists</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-100">
                      <Gift className="h-4 w-4 text-amber-300" />
                      <span className="text-sm">Double rewards</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-black/20 rounded-lg">
                    <div className="text-center">
                      <span className="text-2xl font-bold text-amber-300">$9.99</span>
                      <span className="text-sm text-purple-200 ml-1">/month</span>
                    </div>
                    <p className="text-xs text-purple-200 text-center mt-1">
                      First month 50% off with code BEAUTY50
                    </p>
                  </div>
                  <Button className="w-full mt-4 bg-gradient-to-r from-amber-400 to-orange-400 text-black font-semibold hover:from-amber-500 hover:to-orange-500">
                    <Crown className="h-4 w-4 mr-2" />
                    Upgrade Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="bg-white/60 backdrop-blur-sm border-purple-100">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-500" />
                    Your Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Artists supported</span>
                      <Badge variant="secondary">5 artists</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Friends invited</span>
                      <Badge variant="secondary">3 friends</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Reviews left</span>
                      <Badge variant="secondary">2 reviews</Badge>
                    </div>
                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-pink-500" />
                        <span className="text-sm font-medium text-gray-700">
                          Community Level: Rising Star
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>

        {/* Sticky Invite Progress */}
        <StickyInviteProgress />

      </div>
    </div>
  );
};

export default CustomerDashboard;

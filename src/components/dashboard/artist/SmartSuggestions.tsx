
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  TrendingUp, 
  Users, 
  Share2, 
  Star, 
  Zap,
  Target,
  Crown,
  X
} from "lucide-react";
import { useAuth } from "@/context/auth";
import { toast } from 'sonner';

interface Suggestion {
  id: string;
  type: 'viral' | 'growth' | 'engagement' | 'premium';
  title: string;
  description: string;
  action: string;
  impact: 'High' | 'Medium' | 'Low';
  icon: React.ReactNode;
  urgency: boolean;
}

const SmartSuggestions = () => {
  const { userProfile } = useAuth();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [dismissedSuggestions, setDismissedSuggestions] = useState<string[]>([]);

  // Generate dynamic suggestions based on user profile
  useEffect(() => {
    const generateSuggestions = () => {
      const allSuggestions: Suggestion[] = [
        {
          id: 'viral-share',
          type: 'viral',
          title: 'Share Your Success Story',
          description: 'Create a viral success card and watch your profile views explode by 300%!',
          action: 'Create Viral Card',
          impact: 'High',
          icon: <Share2 className="h-4 w-4" />,
          urgency: true
        },
        {
          id: 'invite-friends',
          type: 'growth',
          title: 'Invite 3 Friends Today',
          description: 'You\'re 67% more likely to succeed with a strong network. Invite friends now!',
          action: 'Send Invites',
          impact: 'High',
          icon: <Users className="h-4 w-4" />,
          urgency: false
        },
        {
          id: 'portfolio-boost',
          type: 'engagement',
          title: 'Add 2 More Portfolio Images',
          description: 'Profiles with 5+ images get 4x more client inquiries. You\'re almost there!',
          action: 'Upload Photos',
          impact: 'Medium',
          icon: <Star className="h-4 w-4" />,
          urgency: false
        },
        {
          id: 'referral-streak',
          type: 'viral',
          title: 'Keep Your Referral Streak',
          description: 'You\'re on a 3-day streak! Don\'t break it - share your link once more today.',
          action: 'Share Link',
          impact: 'Medium',
          icon: <Zap className="h-4 w-4" />,
          urgency: true
        },
        {
          id: 'premium-upgrade',
          type: 'premium',
          title: 'Unlock Premium Features',
          description: 'Premium artists earn 5x more and get featured placement. Upgrade now!',
          action: 'Go Premium',
          impact: 'High',
          icon: <Crown className="h-4 w-4" />,
          urgency: false
        }
      ];

      // Filter suggestions based on user data and dismissed items
      const relevantSuggestions = allSuggestions.filter(suggestion => {
        if (dismissedSuggestions.includes(suggestion.id)) return false;
        
        // Add logic based on user profile
        if (suggestion.id === 'portfolio-boost' && userProfile?.portfolio_urls?.length >= 5) {
          return false;
        }
        
        return true;
      }).slice(0, 3); // Show max 3 suggestions

      setSuggestions(relevantSuggestions);
    };

    generateSuggestions();
  }, [userProfile, dismissedSuggestions]);

  const handleAction = (suggestion: Suggestion) => {
    // Handle different suggestion actions
    switch (suggestion.id) {
      case 'viral-share':
        toast.success('🎨 Viral card feature coming soon! Keep building your empire!');
        break;
      case 'invite-friends':
        toast.success('📱 Copy your referral link from the widget above!');
        break;
      case 'portfolio-boost':
        toast.success('📷 Upload more portfolio images to attract clients!');
        break;
      case 'referral-streak':
        toast.success('🔥 Keep that streak going! Share your link now!');
        break;
      case 'premium-upgrade':
        toast.success('👑 Premium features coming soon! You\'ll be first to know!');
        break;
    }
    
    // Mark as completed/dismissed
    dismissSuggestion(suggestion.id);
  };

  const dismissSuggestion = (id: string) => {
    setDismissedSuggestions(prev => [...prev, id]);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'viral': return 'from-purple-500 to-pink-500';
      case 'growth': return 'from-green-500 to-teal-500';
      case 'engagement': return 'from-blue-500 to-indigo-500';
      case 'premium': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <Card className="border-none shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <Lightbulb className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Smart Growth Suggestions</h3>
            <p className="text-sm text-gray-600">AI-powered tips to boost your success</p>
          </div>
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className={`p-4 rounded-xl bg-gradient-to-r ${getTypeColor(suggestion.type)} bg-opacity-10 border border-purple-200 relative overflow-hidden`}>
                  {/* Urgency indicator */}
                  {suggestion.urgency && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-red-500 text-white animate-pulse text-xs">
                        🔥 Hot
                      </Badge>
                    </div>
                  )}

                  {/* Dismiss button */}
                  <button
                    onClick={() => dismissSuggestion(suggestion.id)}
                    className="absolute top-2 right-8 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${getTypeColor(suggestion.type)} flex items-center justify-center text-white`}>
                      {suggestion.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-800">{suggestion.title}</h4>
                        <Badge className={`text-xs ${getImpactColor(suggestion.impact)}`}>
                          {suggestion.impact} Impact
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                      
                      <Button
                        onClick={() => handleAction(suggestion)}
                        size="sm"
                        className={`bg-gradient-to-r ${getTypeColor(suggestion.type)} hover:opacity-90 text-white`}
                      >
                        <Target className="h-3 w-3 mr-1" />
                        {suggestion.action}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Performance insight */}
        <motion.div 
          className="mt-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Growth Insight</span>
          </div>
          <p className="text-xs text-green-600">
            Artists who follow these suggestions grow <strong>3x faster</strong> and earn more credits! 🚀
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default SmartSuggestions;

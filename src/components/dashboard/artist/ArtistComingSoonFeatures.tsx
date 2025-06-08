
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Calendar, 
  CreditCard, 
  MessageCircle, 
  Bot, 
  BarChart3, 
  Sparkles, 
  Share2, 
  Vote,
  TrendingUp,
  Users,
  Crown
} from "lucide-react";
import { toast } from "sonner";

interface Feature {
  id: string;
  title: string;
  description: string;
  emotionalBenefit: string;
  icon: React.ComponentType<any>;
  votes: number;
  gradient: string;
  bgGradient: string;
  comingSoon: string;
}

const comingSoonFeatures: Feature[] = [
  {
    id: "smart-booking",
    title: "AI Smart Booking System",
    description: "Never miss a client again with automated scheduling that learns your preferences",
    emotionalBenefit: "Book 3x more clients while you sleep! 💤✨",
    icon: Calendar,
    votes: 347,
    gradient: "from-blue-500 to-purple-600",
    bgGradient: "from-blue-50 to-purple-50",
    comingSoon: "Q1 2025"
  },
  {
    id: "pos-system",
    title: "Complete POS & Payment Hub",
    description: "Accept payments, track inventory, and manage your entire business in one place",
    emotionalBenefit: "Turn your phone into a cash machine! 💰🚀",
    icon: CreditCard,
    votes: 289,
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-50 to-emerald-50",
    comingSoon: "Q2 2025"
  },
  {
    id: "ai-assistant",
    title: "24/7 AI Business Assistant",
    description: "Your personal AI that handles customer service, bookings, and marketing",
    emotionalBenefit: "Like having a full team working for you! 🤖💎",
    icon: Bot,
    votes: 456,
    gradient: "from-violet-500 to-indigo-600",
    bgGradient: "from-violet-50 to-indigo-50",
    comingSoon: "Q1 2025"
  },
  {
    id: "auto-messaging",
    title: "Viral Auto-Messaging Suite",
    description: "Automatically follow up with clients, send reminders, and boost referrals",
    emotionalBenefit: "Never lose a client to forgetfulness again! 📱💕",
    icon: MessageCircle,
    votes: 278,
    gradient: "from-pink-500 to-rose-600",
    bgGradient: "from-pink-50 to-rose-50",
    comingSoon: "Q2 2025"
  },
  {
    id: "analytics-pro",
    title: "Revenue Analytics Dashboard",
    description: "Deep insights into your business performance, profit tracking, and growth metrics",
    emotionalBenefit: "See exactly how to double your income! 📈💸",
    icon: BarChart3,
    votes: 234,
    gradient: "from-orange-500 to-amber-600",
    bgGradient: "from-orange-50 to-amber-50",
    comingSoon: "Q3 2025"
  },
  {
    id: "premium-boost",
    title: "Premium Profile Boost",
    description: "Get featured at the top of searches and unlock exclusive premium tools",
    emotionalBenefit: "Become the #1 artist in your area! 👑⭐",
    icon: Sparkles,
    votes: 412,
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50 to-pink-50",
    comingSoon: "Coming Soon"
  }
];

const ArtistComingSoonFeatures = () => {
  const [votedFeatures, setVotedFeatures] = useState<Set<string>>(new Set());
  const [featureVotes, setFeatureVotes] = useState<Record<string, number>>(
    Object.fromEntries(comingSoonFeatures.map(f => [f.id, f.votes]))
  );

  const handleVote = (featureId: string) => {
    if (votedFeatures.has(featureId)) {
      toast.success("You've already voted for this feature! 🗳️");
      return;
    }

    setVotedFeatures(prev => new Set([...prev, featureId]));
    setFeatureVotes(prev => ({
      ...prev,
      [featureId]: prev[featureId] + 1
    }));
    
    toast.success("Vote counted! Share with friends to unlock faster! 🚀", {
      duration: 4000,
    });
  };

  const handleShare = (feature: Feature) => {
    const shareText = `Help unlock ${feature.title} on EmviApp! ${feature.emotionalBenefit} Vote now: emviapp.com/vote/${feature.id}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Vote for ${feature.title}`,
        text: shareText,
        url: `https://emviapp.com/vote/${feature.id}`
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success("Share link copied! Paste it everywhere! 📋✨");
    }
  };

  const sortedFeatures = comingSoonFeatures
    .map(f => ({ ...f, votes: featureVotes[f.id] }))
    .sort((a, b) => b.votes - a.votes);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <Crown className="h-6 w-6 text-purple-600" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Vote to Unlock Premium Features
          </h2>
          <Crown className="h-6 w-6 text-purple-600" />
        </motion.div>
        <p className="text-gray-600 text-lg">
          Help us prioritize what to build next! The more votes, the faster we ship it. 🚀
        </p>
      </div>

      {/* Feature Leaderboard */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 text-white">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-yellow-400" />
            <CardTitle className="text-xl font-bold">🏆 Feature Leaderboard</CardTitle>
          </div>
          <p className="text-purple-200">Most requested features unlock first!</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sortedFeatures.slice(0, 3).map((feature, index) => {
              const IconComponent = feature.icon;
              const medals = ["🥇", "🥈", "🥉"];
              
              return (
                <div key={feature.id} className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{medals[index]}</span>
                    <IconComponent className="h-5 w-5 text-white" />
                    <span className="font-semibold">{feature.title}</span>
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white border-0">
                    {feature.votes} votes
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Coming Soon Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedFeatures.map((feature) => {
          const IconComponent = feature.icon;
          const hasVoted = votedFeatures.has(feature.id);
          
          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br ${feature.bgGradient} backdrop-blur-sm`}>
                {/* Coming Soon Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge className={`bg-gradient-to-r ${feature.gradient} text-white border-0 shadow-lg`}>
                    {feature.comingSoon}
                  </Badge>
                </div>

                {/* Glassmorphism Effect */}
                <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
                
                <CardContent className="relative z-10 p-6">
                  <div className="space-y-4">
                    {/* Icon & Title */}
                    <div className="flex items-start space-x-4">
                      <div className={`p-4 rounded-xl bg-gradient-to-r ${feature.gradient} shadow-lg`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-800 mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-2">
                          {feature.description}
                        </p>
                        <p className="text-base font-semibold text-purple-700">
                          {feature.emotionalBenefit}
                        </p>
                      </div>
                    </div>

                    {/* Social Proof */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span className="font-semibold">{feature.votes} artists</span>
                      <span>already voted for this!</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <Button
                        onClick={() => handleVote(feature.id)}
                        disabled={hasVoted}
                        className={`flex-1 ${
                          hasVoted 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : `bg-gradient-to-r ${feature.gradient} hover:opacity-90`
                        } text-white border-0 shadow-lg transition-all duration-200`}
                      >
                        <Vote className="h-4 w-4 mr-2" />
                        {hasVoted ? 'Voted! ✓' : 'Vote to Unlock'}
                      </Button>
                      
                      <Button
                        onClick={() => handleShare(feature)}
                        variant="outline"
                        className="border-purple-300 text-purple-700 hover:bg-purple-50"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Viral Encouragement */}
                    <p className="text-xs text-center text-gray-500 italic">
                      💡 Share with friends to unlock features faster!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold mb-2">Can't Find Your Dream Feature? 🌟</h3>
          <p className="text-purple-100 mb-4">
            Tell us what you need and we'll add it to the voting board!
          </p>
          <Button 
            className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8"
            onClick={() => toast.success("Feature request form coming soon! 📝✨")}
          >
            Request Custom Feature
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtistComingSoonFeatures;

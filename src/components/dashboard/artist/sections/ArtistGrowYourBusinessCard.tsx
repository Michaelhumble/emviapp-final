
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Image, Handshake, DollarSign, Pen, Sparkles, Users, Share2, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PREMIUM_SUGGESTIONS = [
  {
    icon: <Image className="text-purple-600 w-5 h-5" aria-hidden="true" />,
    emoji: "📸",
    text: "Add 3 stunning portfolio photos to boost bookings by 40%",
    action: "Add Photos",
    priority: "high",
    impact: "+40% bookings",
    viralPotential: "High",
    bgColor: "from-purple-50 to-pink-50",
    accentColor: "purple-600"
  },
  {
    icon: <Share2 className="text-blue-600 w-5 h-5" aria-hidden="true" />,
    emoji: "🚀",
    text: "Share your referral link — each friend = $25 bonus",
    action: "Share Link",
    priority: "viral",
    impact: "$25 per friend",
    viralPotential: "Viral",
    bgColor: "from-blue-50 to-cyan-50",
    accentColor: "blue-600"
  },
  {
    icon: <DollarSign className="text-green-600 w-5 h-5" aria-hidden="true" />,
    emoji: "💰",
    text: "Update your premium pricing — artists like you charge 25% more",
    action: "Update Pricing",
    priority: "high",
    impact: "+25% earnings",
    viralPotential: "Medium",
    bgColor: "from-green-50 to-emerald-50",
    accentColor: "green-600"
  },
  {
    icon: <Trophy className="text-orange-600 w-5 h-5" aria-hidden="true" />,
    emoji: "🏆",
    text: "Complete your profile to unlock 'Verified Artist' badge",
    action: "Get Verified",
    priority: "achievement",
    impact: "Verified status",
    viralPotential: "High",
    bgColor: "from-orange-50 to-yellow-50",
    accentColor: "orange-600"
  },
];

const VIRAL_METRICS = [
  { label: "Profile Visits", value: "1,247", trend: "+38%" },
  { label: "Social Shares", value: "89", trend: "+156%" },
  { label: "Referrals Active", value: "12", trend: "+200%" },
];

const cardGradient = "bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30";

const GrowYourBusinessCard: React.FC = () => {
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null);

  return (
    <Card
      className={`${cardGradient} border-0 shadow-xl rounded-3xl mb-6 overflow-hidden relative`}
      aria-label="Grow Your Creator Empire"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-pink-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <CardContent className="py-8 px-6 relative z-10">
        {/* Premium Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-playfair text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
              <span className="inline-block rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-3 shadow-lg">
                <Sparkles className="w-6 h-6 text-white" aria-hidden="true" />
              </span>
              Grow Your Empire
            </h2>
            <p className="text-gray-600 mt-2 text-lg">Unlock your full earning potential</p>
          </div>
          
          {/* Viral Growth Indicator */}
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 font-bold animate-pulse">
            🔥 Trending
          </Badge>
        </div>

        {/* Viral Metrics Dashboard */}
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/40">
          {VIRAL_METRICS.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-xl font-bold text-gray-800">{metric.value}</div>
              <div className="text-xs text-gray-600">{metric.label}</div>
              <div className="text-xs text-green-600 font-medium">{metric.trend}</div>
            </motion.div>
          ))}
        </div>

        {/* Premium Action Items */}
        <div className="space-y-4">
          {PREMIUM_SUGGESTIONS.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                group relative overflow-hidden rounded-2xl p-5 
                bg-gradient-to-r ${suggestion.bgColor} 
                border-2 border-white/50 shadow-md hover:shadow-lg 
                transition-all duration-300 cursor-pointer
                ${selectedSuggestion === index ? 'ring-2 ring-purple-400 scale-[1.02]' : ''}
              `}
              onClick={() => setSelectedSuggestion(selectedSuggestion === index ? null : index)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  {/* Animated Emoji Icon */}
                  <motion.span
                    className="text-3xl"
                    animate={{ rotate: selectedSuggestion === index ? [0, -10, 10, 0] : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {suggestion.emoji}
                  </motion.span>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`font-bold text-${suggestion.accentColor} text-base md:text-lg`}>
                        {suggestion.text}
                      </span>
                      {suggestion.priority === "viral" && (
                        <Badge variant="outline" className="bg-red-100 text-red-700 border-red-300 text-xs animate-pulse">
                          🚀 VIRAL
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-white/70 text-gray-700 text-xs">
                        Impact: {suggestion.impact}
                      </Badge>
                      <Badge variant="outline" className="bg-white/70 text-gray-700 text-xs">
                        Viral: {suggestion.viralPotential}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="sm"
                    className={`
                      whitespace-nowrap bg-gradient-to-r from-${suggestion.accentColor} to-${suggestion.accentColor.replace('600', '500')}
                      hover:from-${suggestion.accentColor.replace('600', '700')} hover:to-${suggestion.accentColor}
                      text-white border-0 shadow-lg font-bold px-6 py-2
                      transform transition-all duration-200
                    `}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Action handler here
                    }}
                  >
                    {suggestion.action}
                  </Button>
                </motion.div>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Users className="w-5 h-5" />
            <span className="font-bold">Join 2,847 successful artists growing their empire</span>
          </div>
          <p className="text-purple-100 text-sm">
            Complete these actions to unlock premium features and boost your earnings by up to 300%
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default GrowYourBusinessCard;

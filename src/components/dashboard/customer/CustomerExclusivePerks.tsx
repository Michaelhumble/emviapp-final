
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Gem, Star, Zap, Gift, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const CustomerExclusivePerks = () => {
  const perks = [
    {
      icon: Crown,
      title: "VIP Treatment",
      description: "Priority booking at top salons",
      value: "Worth $50/month",
      color: "from-yellow-400 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50"
    },
    {
      icon: Gem,
      title: "Exclusive Discounts",
      description: "Member-only deals up to 40% off",
      value: "Save $200+",
      color: "from-purple-400 to-pink-500",
      bgColor: "from-purple-50 to-pink-50"
    },
    {
      icon: Star,
      title: "Early Access",
      description: "First to book new services & artists",
      value: "Priceless",
      color: "from-blue-400 to-indigo-500",
      bgColor: "from-blue-50 to-indigo-50"
    },
    {
      icon: Zap,
      title: "Instant Rewards",
      description: "Credits for every booking & review",
      value: "+15 credits",
      color: "from-green-400 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-6 py-2 mb-4"
        >
          <Sparkles className="h-5 w-5 text-purple-600" />
          <span className="text-purple-800 font-semibold">Your Exclusive Benefits</span>
        </motion.div>
        
        <h2 className="text-3xl font-bold text-white mb-2">
          Premium Member Perks 🌟
        </h2>
        <p className="text-purple-200 max-w-2xl mx-auto">
          Enjoy exclusive benefits that make you feel special and save money on every beauty experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {perks.map((perk, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <Card className="relative border-0 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              {/* Gradient Border */}
              <div className={`absolute inset-0 bg-gradient-to-r ${perk.color} opacity-20`} />
              
              <CardContent className={`relative p-6 bg-gradient-to-br ${perk.bgColor}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${perk.color} shadow-lg`}>
                    <perk.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <Badge className="bg-white/80 text-gray-700 font-semibold">
                    {perk.value}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {perk.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {perk.description}
                </p>
                
                {/* Shine Effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Special Offer Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 shadow-2xl rounded-2xl overflow-hidden">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Gift className="h-6 w-6 text-white" />
              <h3 className="text-xl font-bold text-white">
                🎁 Member Exclusive: 48-Hour Flash Sale!
              </h3>
              <Gift className="h-6 w-6 text-white" />
            </div>
            
            <p className="text-white/90 font-medium mb-2">
              Get 50% off your next booking + double credits for reviews
            </p>
            
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
              <Zap className="h-4 w-4 text-yellow-200" />
              <span className="text-white font-semibold text-sm">
                Ends in 23h 45m
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CustomerExclusivePerks;

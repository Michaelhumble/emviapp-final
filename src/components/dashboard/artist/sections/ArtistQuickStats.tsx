
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Eye, DollarSign, TrendingUp, Users, Star } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Enhanced animated counter component for premium stats display
 */
const AnimatedCounter = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      setDisplayValue(Math.floor(value * easeOutExpo));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span>{displayValue}</span>;
};

/**
 * Premium achievement stats with viral growth metrics and emotional triggers
 */
const PREMIUM_STATS = [
  {
    icon: <Calendar className="w-6 h-6 xs:w-7 xs:h-7 text-purple-600" aria-hidden="true" />,
    value: 24,
    label: "Total Bookings",
    sublabel: "This Month",
    trend: "+12%",
    achievement: "Rising Star",
    bgGradient: "from-purple-50 to-pink-50",
    borderGradient: "from-purple-200 to-pink-200"
  },
  {
    icon: <Eye className="w-6 h-6 xs:w-7 xs:h-7 text-blue-600" aria-hidden="true" />,
    value: 1250,
    label: "Profile Views",
    sublabel: "Last 30 Days",
    trend: "+38%",
    achievement: "Viral Creator",
    bgGradient: "from-blue-50 to-cyan-50",
    borderGradient: "from-blue-200 to-cyan-200"
  },
  {
    icon: <DollarSign className="w-6 h-6 xs:w-7 xs:h-7 text-green-600" aria-hidden="true" />,
    value: 2850,
    label: "Earnings",
    sublabel: "This Month",
    trend: "+22%",
    achievement: "Top Earner",
    bgGradient: "from-green-50 to-emerald-50",
    borderGradient: "from-green-200 to-emerald-200"
  },
  {
    icon: <Users className="w-6 h-6 xs:w-7 xs:h-7 text-orange-600" aria-hidden="true" />,
    value: 8,
    label: "Referrals",
    sublabel: "Friends Invited",
    trend: "+150%",
    achievement: "Influencer",
    bgGradient: "from-orange-50 to-yellow-50",
    borderGradient: "from-orange-200 to-yellow-200"
  },
];

const cardBase = `
  flex-1 min-w-[150px] xs:min-w-[170px] sm:min-w-[200px] 
  rounded-2xl border-2 shadow-lg hover:shadow-xl
  px-3 xs:px-4 sm:px-6 py-4 xs:py-5 sm:py-6 
  flex flex-col items-center gap-2 xs:gap-3
  transition-all duration-300 ease-in-out
  hover:scale-[1.02] hover:-translate-y-1
  cursor-pointer relative overflow-hidden
`;

const valueStyle = `
  font-playfair text-2xl xs:text-3xl sm:text-4xl md:text-5xl 
  font-bold bg-gradient-to-r from-gray-800 to-gray-600 
  bg-clip-text text-transparent
`;

const labelStyle = `
  text-xs xs:text-sm sm:text-base font-semibold text-gray-700 
  text-center tracking-wide
`;

const sublabelStyle = `
  text-xs text-gray-500 text-center opacity-80
`;

const ArtistQuickStats: React.FC = () => {
  return (
    <div className="w-full mb-6">
      {/* Emotional Success Trigger */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-yellow-100 via-orange-100 to-pink-100 border border-orange-200"
      >
        <div className="flex items-center justify-center gap-3">
          <Star className="w-6 h-6 text-yellow-600 animate-pulse" />
          <p className="text-lg font-bold text-gray-800">
            🎉 You're in the <span className="text-orange-600">top 5%</span> of artists in your area!
          </p>
          <Star className="w-6 h-6 text-yellow-600 animate-pulse" />
        </div>
      </motion.div>

      {/* Premium Achievement Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
        {PREMIUM_STATS.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className={`${cardBase} bg-gradient-to-br ${stat.bgGradient} border-gradient-to-r ${stat.borderGradient}`}>
              <CardContent className="flex flex-col items-center justify-center p-0 relative">
                {/* Achievement Badge */}
                <Badge 
                  variant="secondary" 
                  className="absolute -top-2 -right-2 bg-white/90 text-xs font-bold shadow-md"
                >
                  {stat.achievement}
                </Badge>

                {/* Icon with Glow Effect */}
                <div className="mb-2 p-2 rounded-full bg-white/80 shadow-md">
                  {stat.icon}
                </div>

                {/* Animated Value with Trend */}
                <div className="flex items-center gap-2 mb-1">
                  <div className={valueStyle}>
                    {stat.label === "Earnings" ? "$" : ""}
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="flex items-center text-green-600">
                    <TrendingUp className="w-3 h-3 xs:w-4 xs:h-4" />
                    <span className="text-xs font-bold">{stat.trend}</span>
                  </div>
                </div>

                {/* Labels */}
                <div className={labelStyle}>{stat.label}</div>
                <div className={sublabelStyle}>{stat.sublabel}</div>

                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Viral Growth Callout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-4 text-center"
      >
        <p className="text-sm text-gray-600">
          🚀 Your profile is <span className="font-bold text-purple-600">trending up</span> — 
          <span className="text-blue-600 font-medium"> invite friends</span> to unlock more growth rewards!
        </p>
      </motion.div>
    </div>
  );
};

export default ArtistQuickStats;

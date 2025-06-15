
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Sparkles, Crown, Users, Star, Zap, ArrowRight, Timer } from 'lucide-react';

const UrgentCTA = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 47,
    seconds: 32
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const membershipTiers = [
    {
      name: 'Elite Access',
      price: '$97',
      originalPrice: '$297',
      features: [
        'Instant access to 47K+ members',
        'Direct message top earners',
        'Weekly live masterclasses',
        'Job board with $100K+ opportunities',
        'Celebrity stylist network access'
      ],
      popular: true,
      discount: '67% OFF'
    },
    {
      name: 'VIP Founder',
      price: '$197',
      originalPrice: '$497',
      features: [
        'Everything in Elite Access',
        'Monthly 1-on-1 mentor calls',
        'Private VIP-only events',
        'Brand partnership introductions',
        'Guaranteed ROI or money back'
      ],
      popular: false,
      discount: '60% OFF'
    }
  ];

  const urgencyFactors = [
    { icon: Users, text: '2,847 joined this week', color: 'text-blue-400' },
    { icon: Clock, text: 'Limited time pricing', color: 'text-orange-400' },
    { icon: Star, text: 'Only 127 spots left', color: 'text-yellow-400' },
    { icon: Zap, text: 'Price increases tomorrow', color: 'text-red-400' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Urgency Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-400/30 rounded-full px-6 py-3 mb-6"
          >
            <Timer className="h-5 w-5 text-red-400 animate-pulse" />
            <span className="text-red-400 font-bold">FLASH SALE ENDING SOON</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 font-playfair"
          >
            Don't Miss Out
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl text-pink-200 mb-8"
          >
            Join the most exclusive beauty community before prices go up
          </motion.p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-4 mb-8"
          >
            {[
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((unit, index) => (
              <div key={unit.label} className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl w-20 h-20 flex items-center justify-center border border-white/30">
                  <span className="text-3xl font-bold text-white">
                    {unit.value.toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="text-sm text-pink-200 mt-2">{unit.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Urgency Factors */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {urgencyFactors.map((factor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
              >
                <factor.icon className={`h-5 w-5 ${factor.color}`} />
                <span className="text-white font-medium">{factor.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Membership Tiers */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            {membershipTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`relative ${tier.popular ? 'transform scale-105' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-2 rounded-full text-sm">
                    MOST POPULAR
                  </div>
                )}
                
                <div className={`bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 ${
                  tier.popular ? 'border-yellow-400' : 'border-white/20'
                } hover:border-white/40 transition-all duration-300`}>
                  {/* Discount Badge */}
                  <div className="text-center mb-6">
                    <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-4 py-2 rounded-full text-sm mb-4">
                      {tier.discount}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2 font-playfair">{tier.name}</h3>
                    
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="text-4xl font-bold text-white">{tier.price}</span>
                      <span className="text-xl text-gray-400 line-through">{tier.originalPrice}</span>
                    </div>
                    
                    <p className="text-pink-200">One-time payment • Lifetime access</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {tier.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Star className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                        <span className="text-white">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button className={`w-full font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 ${
                    tier.popular 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                  }`}>
                    <Crown className="h-5 w-5" />
                    Join {tier.name}
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex justify-center items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
            ))}
            <span className="text-white font-bold ml-2">4.9/5 from 12,847 members</span>
          </div>
          
          <p className="text-pink-200 text-lg mb-6">
            "Best investment I've ever made for my beauty career" - Sarah M., Celebrity MUA
          </p>
          
          <div className="text-sm text-gray-300">
            Inspired by Sunshine ☀️ • 30-day money-back guarantee
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UrgentCTA;

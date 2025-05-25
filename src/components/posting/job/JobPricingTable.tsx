
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Crown, Star, Zap, Users, Clock, Flame, Sparkles, Timer, ChevronRight } from 'lucide-react';
import { DurationSelector } from '@/components/posting/pricing/DurationSelector';
import NationwideOption from '@/components/posting/smart-ad-options/NationwideOption';
import confetti from 'canvas-confetti';

interface JobPricingTableProps {
  onPricingSelect: (tier: string, finalPrice: number, durationMonths: number) => void;
  jobData?: any;
}

const JobPricingTable: React.FC<JobPricingTableProps> = ({ onPricingSelect, jobData }) => {
  const [durationMonths, setDurationMonths] = useState(1);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [nationwideAddon, setNationwideAddon] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3661); // 1 hour 1 minute 1 second
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showDiamondModal, setShowDiamondModal] = useState(false);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 3661);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const testimonials = [
    { name: "Maria L.", role: "Salon Owner", text: "Got 23 applications in 2 days! Found amazing staff.", avatar: "💄" },
    { name: "James K.", role: "Spa Manager", text: "EmviApp helped us find 3 licensed massage therapists.", avatar: "💆‍♂️" },
    { name: "Sofia R.", role: "Nail Studio", text: "Premium plan = premium candidates. Worth every penny!", avatar: "💅" },
    { name: "David M.", role: "Barbershop", text: "Hired 2 top barbers. Our revenue increased 40%!", avatar: "✂️" }
  ];

  const plans = [
    {
      id: 'free',
      name: 'Free Starter',
      price: 0,
      originalPrice: 0,
      icon: <Check className="h-6 w-6" />,
      gradient: 'from-gray-100 to-gray-200',
      borderGradient: 'from-gray-300 to-gray-400',
      textColor: 'text-gray-700',
      badge: null,
      tagline: 'Test the waters',
      features: ['7-day listing', 'Basic visibility', 'Email support', 'Standard applicant pool'],
      limitations: ['Limited to 1 post', 'No priority placement', 'Basic analytics only']
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 9.99,
      originalPrice: 19.99,
      icon: <Star className="h-6 w-6" />,
      gradient: 'from-blue-100 to-indigo-200',
      borderGradient: 'from-blue-400 to-indigo-500',
      textColor: 'text-blue-700',
      badge: 'Best for New Salons',
      badgeColor: 'bg-blue-500',
      tagline: 'Perfect start',
      features: ['30-day listing', '2x visibility boost', 'Regional reach', 'Priority email support', 'Basic analytics'],
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 19.99,
      originalPrice: 39.99,
      icon: <Zap className="h-6 w-6" />,
      gradient: 'from-purple-100 to-pink-200',
      borderGradient: 'from-purple-400 to-pink-500',
      textColor: 'text-purple-700',
      badge: 'Most Popular',
      badgeColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
      tagline: 'Maximum exposure',
      features: ['60-day listing', '4x visibility boost', 'Priority placement', 'Phone + email support', 'Advanced analytics', 'Featured badge'],
      popular: true
    },
    {
      id: 'gold',
      name: 'Gold Elite',
      price: 39.99,
      originalPrice: 79.99,
      icon: <Crown className="h-6 w-6" />,
      gradient: 'from-amber-100 to-yellow-200',
      borderGradient: 'from-amber-400 to-yellow-500',
      textColor: 'text-amber-700',
      badge: 'Best Value',
      badgeColor: 'bg-gradient-to-r from-amber-500 to-yellow-500',
      tagline: 'Ultimate hiring power',
      features: ['90-day listing', 'Unlimited edits', 'Premium badge', 'Dedicated support', 'Priority applicant review', 'Social media promotion'],
      popular: false
    }
  ];

  const calculatePrice = (basePrice: number) => {
    if (basePrice === 0) return 0;
    
    let discountedPrice = basePrice;
    if (durationMonths === 3) discountedPrice *= 0.9;
    else if (durationMonths === 6) discountedPrice *= 0.8;
    else if (durationMonths === 12) discountedPrice *= 0.65;
    
    const totalPrice = discountedPrice * durationMonths;
    return nationwideAddon ? totalPrice + (5 * durationMonths) : totalPrice;
  };

  const handlePlanSelect = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (!plan) return;

    setSelectedTier(planId);
    
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#9333ea', '#ec4899', '#06b6d4']
    });

    const finalPrice = calculatePrice(plan.price);
    onPricingSelect(planId, finalPrice, durationMonths);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 py-12">
      <div className="container mx-auto max-w-7xl px-4">
        {/* FOMO Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-4 mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-100/50 to-orange-100/50 animate-pulse"></div>
            <div className="relative flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-red-500 animate-bounce" />
                <span className="font-bold text-red-700">LIMITED TIME: 50% OFF</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-orange-500" />
                <span className="font-mono font-bold text-orange-700">{formatTime(timeLeft)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-600">12 spots left this week</span>
              </div>
            </div>
          </div>

          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Choose Your Success Plan
          </h1>
          <p className="text-xl text-gray-600 mb-2">Join 10,000+ salon owners who found their dream team</p>
          <p className="text-sm text-gray-500">⚡ Setup takes 2 minutes • 💳 Cancel anytime • 🔒 Money-back guarantee</p>
        </motion.div>

        {/* Live Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/60 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold text-gray-700">Live Success Stories</span>
            <div className="flex gap-1">
              {testimonials.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-2 rounded-full transition-all ${
                    i === currentTestimonial ? 'bg-purple-500 w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <p className="text-gray-700 italic mb-2">"{testimonials[currentTestimonial].text}"</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">{testimonials[currentTestimonial].avatar}</span>
                <div>
                  <p className="font-semibold text-sm">{testimonials[currentTestimonial].name}</p>
                  <p className="text-xs text-gray-500">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Duration Selector */}
        <div className="mb-8">
          <DurationSelector
            durationMonths={durationMonths}
            onDurationChange={setDurationMonths}
          />
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className={`${plan.badgeColor} text-white px-6 py-2 text-sm font-bold animate-pulse shadow-lg`}>
                    ⭐ {plan.badge}
                  </Badge>
                </div>
              )}
              
              <Card className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group h-full ${
                selectedTier === plan.id ? 'ring-4 ring-purple-500 shadow-2xl' : ''
              } ${plan.popular ? 'border-2 border-purple-300' : 'border border-gray-200'}`}
              onClick={() => handlePlanSelect(plan.id)}>
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.borderGradient} opacity-5`}></div>
                
                <CardContent className="relative p-8 h-full flex flex-col">
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${plan.gradient} mb-4`}>
                      <div className={plan.textColor}>
                        {plan.icon}
                      </div>
                    </div>
                    <h3 className="font-playfair text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-sm text-gray-600 italic">{plan.tagline}</p>
                    
                    {plan.badge && !plan.popular && (
                      <Badge variant="outline" className="mt-2 bg-white/80">
                        {plan.badge}
                      </Badge>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-4xl font-bold">${calculatePrice(plan.price).toFixed(0)}</span>
                      {plan.originalPrice > plan.price && (
                        <span className="text-lg text-gray-400 line-through">${(plan.originalPrice * durationMonths).toFixed(0)}</span>
                      )}
                    </div>
                    {plan.price > 0 && (
                      <p className="text-sm text-gray-500">
                        ${(calculatePrice(plan.price) / durationMonths).toFixed(2)}/month
                      </p>
                    )}
                    {durationMonths > 1 && plan.price > 0 && (
                      <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-300">
                        Save ${((plan.price * durationMonths) - calculatePrice(plan.price)).toFixed(0)}
                      </Badge>
                    )}
                  </div>

                  {/* Features */}
                  <div className="flex-grow">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {plan.limitations && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        {plan.limitations.map((limitation, i) => (
                          <p key={i} className="text-xs text-gray-500 flex items-center gap-2">
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            {limitation}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={`w-full mt-6 h-12 rounded-xl font-semibold transition-all ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg' 
                        : 'bg-white border-2 border-gray-200 hover:border-purple-300 text-gray-700 hover:text-purple-700'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlanSelect(plan.id);
                    }}
                  >
                    {plan.price === 0 ? 'Start Free' : 'Get Started'}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Diamond Invite-Only Tier */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 rounded-3xl blur-lg opacity-75 animate-pulse"></div>
          <Card className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-black border-2 border-purple-400 rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                    <Crown className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-3xl font-bold text-white">Diamond Elite</h3>
                    <p className="text-purple-300 italic">Invite Only</p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Exclusive tier for high-volume salon chains and franchise owners. White-glove service, dedicated account manager, and premium placement guaranteed.
                </p>
                
                <Button
                  onClick={() => setShowDiamondModal(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-semibold"
                >
                  Request Invitation
                  <Sparkles className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Nationwide Add-on */}
        <div className="mb-8">
          <NationwideOption
            onChange={setNationwideAddon}
            defaultChecked={nationwideAddon}
            price="+$5"
          />
        </div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-sm text-gray-500 space-y-2"
        >
          <p>🔒 Secure payment • 💳 All major cards accepted • 📞 24/7 support</p>
          <p>⭐ 4.9/5 rating from 2,847 reviews • 🚀 2x faster hiring on average</p>
        </motion.div>
      </div>

      {/* Diamond Modal (placeholder for future implementation) */}
      {showDiamondModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="font-playfair text-2xl font-bold mb-4">Request Diamond Access</h3>
            <p className="text-gray-600 mb-6">
              Diamond tier is exclusively for salon chains with 5+ locations or businesses hiring 10+ positions monthly.
            </p>
            <div className="flex gap-3">
              <Button onClick={() => setShowDiamondModal(false)} variant="outline" className="flex-1">
                Close
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPricingTable;

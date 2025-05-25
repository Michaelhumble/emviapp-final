
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Zap, Clock, Users, ArrowRight, Sparkles, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface JobPricingTableProps {
  onPricingSelect: (tier: string, finalPrice: number, durationMonths: number) => void;
  jobData: any;
}

const testimonials = [
  { name: "Sarah M.", role: "Salon Owner", text: "Got 40+ applications in just 2 days with Premium!" },
  { name: "Mike T.", role: "Spa Manager", text: "Gold tier helped us find our perfect nail technician." },
  { name: "Lisa K.", role: "Beauty Director", text: "Best ROI on hiring we've ever had. Highly recommend!" }
];

const JobPricingTable: React.FC<JobPricingTableProps> = ({ onPricingSelect, jobData }) => {
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [nationwideSelected, setNationwideSelected] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour countdown
  const [nationwideSlots] = useState(12); // Simulated scarcity

  // Rotating testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const pricingPlans = [
    {
      id: 'free',
      name: 'Free Tier',
      price: 0,
      originalPrice: null,
      badge: 'Perfect for Testing',
      badgeColor: 'bg-gray-100 text-gray-700',
      icon: <Check className="h-6 w-6" />,
      description: 'Always free, limited visibility',
      features: [
        'Basic listing visibility',
        'Local area reach only',
        '7-day listing duration',
        'Email support',
        'Basic analytics'
      ],
      ctaText: 'Start Free',
      ctaVariant: 'outline' as const,
      gradient: 'from-gray-50 to-gray-100',
      borderColor: 'border-gray-200',
      popular: false
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 9.99,
      originalPrice: 19.99,
      badge: 'Best for New Salons',
      badgeColor: 'bg-blue-100 text-blue-700',
      icon: <Star className="h-6 w-6" />,
      description: '2x visibility boost',
      features: [
        '2x more visibility than free',
        'Regional reach coverage',
        '30-day listing duration',
        'Priority email support',
        'Enhanced analytics',
        'Featured placement'
      ],
      ctaText: 'Choose Standard',
      ctaVariant: 'default' as const,
      gradient: 'from-blue-50 to-indigo-100',
      borderColor: 'border-blue-200',
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 19.99,
      originalPrice: 39.99,
      badge: 'Most Popular',
      badgeColor: 'bg-purple-100 text-purple-700',
      icon: <Zap className="h-6 w-6" />,
      description: '4x visibility, priority support',
      features: [
        '4x more visibility boost',
        'Multi-state reach',
        '60-day listing duration',
        '24/7 priority support',
        'Advanced analytics dashboard',
        'Top tier placement',
        'Urgent hiring badge'
      ],
      ctaText: 'Go Premium',
      ctaVariant: 'default' as const,
      gradient: 'from-purple-50 to-pink-100',
      borderColor: 'border-purple-300',
      popular: true
    },
    {
      id: 'gold',
      name: 'Gold Elite',
      price: 39.99,
      originalPrice: 79.99,
      badge: 'Premium Choice',
      badgeColor: 'bg-yellow-100 text-yellow-700',
      icon: <Crown className="h-6 w-6" />,
      description: 'Unlimited edits, premium badge',
      features: [
        'Unlimited listing edits',
        'Gold premium badge',
        '90-day listing duration',
        'Dedicated account manager',
        'Custom branding options',
        'Priority candidate screening',
        'Advanced matching algorithm',
        'Social media promotion'
      ],
      ctaText: 'Choose Gold',
      ctaVariant: 'default' as const,
      gradient: 'from-yellow-50 to-orange-100',
      borderColor: 'border-yellow-300',
      popular: false
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedTier(planId);
    const plan = pricingPlans.find(p => p.id === planId);
    if (plan) {
      let finalPrice = plan.price;
      if (nationwideSelected && planId !== 'free') {
        finalPrice += 5;
      }
      onPricingSelect(planId, finalPrice, 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select the best plan for your job posting needs and watch qualified candidates flood in
            </p>
          </motion.div>

          {/* FOMO Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-2 mb-8"
          >
            <Clock className="h-4 w-4 text-red-500" />
            <span className="text-sm font-medium text-red-700">
              50% OFF ends in: {formatTime(timeLeft)}
            </span>
          </motion.div>
        </div>

        {/* Social Proof Testimonials */}
        <div className="mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <div className="bg-white/60 backdrop-blur-lg rounded-xl p-6 max-w-2xl mx-auto border border-white/20">
                <p className="text-gray-700 italic mb-3">"{testimonials[currentTestimonial].text}"</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="text-sm">
                    <span className="font-semibold">{testimonials[currentTestimonial].name}</span>
                    <span className="text-gray-500"> - {testimonials[currentTestimonial].role}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-purple-600 text-white px-4 py-1 rounded-full">
                    <Trophy className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <Card 
                className={cn(
                  "relative overflow-hidden cursor-pointer transition-all duration-300 h-full",
                  "bg-white/60 backdrop-blur-lg border-2",
                  selectedTier === plan.id 
                    ? "ring-2 ring-purple-500 ring-offset-2 scale-105" 
                    : "hover:scale-102 hover:shadow-xl",
                  plan.borderColor,
                  plan.popular && "ring-2 ring-purple-300"
                )}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {/* Gradient Background */}
                <div className={cn(
                  "absolute inset-0 opacity-50 bg-gradient-to-br",
                  plan.gradient
                )} />
                
                <CardContent className="relative p-6 h-full flex flex-col">
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div className={cn(
                      "inline-flex p-3 rounded-full mb-3",
                      plan.badgeColor
                    )}>
                      {plan.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    
                    <Badge variant="outline" className={plan.badgeColor}>
                      {plan.badge}
                    </Badge>
                    
                    <div className="mt-4">
                      <div className="flex items-center justify-center gap-2">
                        {plan.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            ${plan.originalPrice}
                          </span>
                        )}
                        <span className="text-3xl font-bold text-gray-900">
                          ${plan.price}
                        </span>
                        {plan.price > 0 && (
                          <span className="text-gray-500">/month</span>
                        )}
                      </div>
                      {plan.originalPrice && (
                        <Badge className="bg-green-100 text-green-700 mt-2">
                          Save {Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100)}%
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
                  </div>

                  {/* Features List */}
                  <div className="flex-grow mb-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant={plan.ctaVariant}
                    className={cn(
                      "w-full transition-all",
                      selectedTier === plan.id && "bg-purple-600 text-white",
                      plan.popular && "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlanSelect(plan.id);
                    }}
                  >
                    {selectedTier === plan.id ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Selected
                      </>
                    ) : (
                      <>
                        {plan.ctaText}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Diamond Invite-Only Tier */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-gray-900 to-black text-white overflow-hidden">
            <CardContent className="p-8 text-center">
              <div className="inline-flex p-3 rounded-full bg-white/20 mb-4">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Diamond Elite</h3>
              <p className="text-gray-300 mb-4">Invite-only exclusive tier for enterprise clients</p>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Join Waitlist
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Nationwide Add-on */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-orange-100">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Nationwide Visibility Add-on</h4>
                    <p className="text-sm text-gray-600">Show your job to candidates across all 50 states</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="bg-red-100 text-red-700 border-red-300">
                        Only {nationwideSlots} slots left this week
                      </Badge>
                      <span className="text-sm text-gray-500">• High demand</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-600">+$5</p>
                  <Button
                    variant={nationwideSelected ? "default" : "outline"}
                    onClick={() => setNationwideSelected(!nationwideSelected)}
                    className="mt-2"
                  >
                    {nationwideSelected ? "Added" : "Add-on"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bottom CTA */}
        {selectedTier && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2">Ready to find your perfect candidate?</h3>
                <p className="text-purple-100 mb-4">Join thousands of successful businesses hiring on EmviApp</p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <span>✨ 30-day money-back guarantee</span>
                  <span>🔒 Secure payment</span>
                  <span>⚡ Instant activation</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default JobPricingTable;

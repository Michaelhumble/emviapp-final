
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, 
  Star, 
  Zap, 
  CheckCircle, 
  Users, 
  Clock, 
  Flame,
  Shield,
  Trophy,
  Target,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import NationwideOption from '../smart-ad-options/NationwideOption';

interface JobPricingTableProps {
  onPricingSelect: (tier: string, finalPrice: number, durationMonths: number) => void;
  jobData?: any;
}

const JobPricingTable: React.FC<JobPricingTableProps> = ({ onPricingSelect, jobData }) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showNationwide, setShowNationwide] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour countdown

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 3600);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Testimonial rotation
  const testimonials = [
    "\"EmviApp helped us find 50+ qualified nail techs in just 2 weeks!\" - Magic Nails Salon",
    "\"Best ROI for hiring in the beauty industry. Period.\" - Glamour Studios",
    "\"We went from struggling to hire to having a waitlist of artists.\" - Nail Paradise"
  ];

  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(testimonialTimer);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const plans = [
    {
      id: 'free',
      name: 'Free Starter',
      price: 0,
      originalPrice: 29,
      description: 'Perfect for testing the waters',
      icon: <CheckCircle className="h-6 w-6" />,
      gradient: 'from-gray-100 to-gray-200',
      borderColor: 'border-gray-200',
      features: [
        'Basic job listing',
        'Local visibility only',
        '7-day posting duration',
        'Standard support'
      ],
      badge: null,
      savings: 'FREE TRIAL'
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 9.99,
      originalPrice: 19.99,
      description: 'Best for new salons & independent artists',
      icon: <Star className="h-6 w-6" />,
      gradient: 'from-blue-100 to-indigo-200',
      borderColor: 'border-blue-300',
      features: [
        '2x visibility boost',
        '30-day posting duration',
        'Regional reach expansion',
        'Email support',
        'Basic analytics'
      ],
      badge: 'MOST POPULAR',
      badgeColor: 'bg-blue-500',
      savings: 'Save 50%'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 19.99,
      originalPrice: 39.99,
      description: 'Accelerated hiring for growing businesses',
      icon: <Zap className="h-6 w-6" />,
      gradient: 'from-purple-100 to-pink-200',
      borderColor: 'border-purple-300',
      features: [
        '4x visibility boost',
        '60-day posting duration',
        'Priority placement',
        'Advanced analytics',
        'Priority support',
        'Featured listing badge'
      ],
      badge: 'RECOMMENDED',
      badgeColor: 'bg-purple-500',
      savings: 'Save 50%'
    },
    {
      id: 'gold',
      name: 'Gold Elite',
      price: 39.99,
      originalPrice: 79.99,
      description: 'Enterprise solution for serious businesses',
      icon: <Crown className="h-6 w-6" />,
      gradient: 'from-amber-100 to-yellow-200',
      borderColor: 'border-amber-300',
      features: [
        'Unlimited visibility',
        '90-day posting duration',
        'Premium placement guarantee',
        'Unlimited edits',
        'Dedicated account manager',
        'Premium salon badge',
        'Custom branding options'
      ],
      badge: 'BEST VALUE',
      badgeColor: 'bg-amber-500',
      savings: 'Save 50%'
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      onPricingSelect(planId, plan.price, 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Success Plan
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of salons finding their perfect nail technicians with EmviApp
            </p>
          </motion.div>

          {/* FOMO Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-full px-6 py-3 mb-8"
          >
            <Flame className="h-5 w-5 text-red-500 animate-pulse" />
            <span className="text-sm font-semibold text-red-700">
              Limited Time: 50% OFF ends in {formatTime(timeLeft)}
            </span>
            <Clock className="h-4 w-4 text-red-500" />
          </motion.div>

          {/* Rotating Testimonials */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-lg italic text-gray-700 max-w-2xl mx-auto mb-8"
            >
              {testimonials[currentTestimonial]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <Card
                className={cn(
                  "relative overflow-hidden cursor-pointer transition-all duration-300 h-full",
                  "hover:shadow-xl hover:scale-105",
                  selectedPlan === plan.id 
                    ? `ring-2 ring-offset-2 ring-purple-500 shadow-lg ${plan.borderColor}` 
                    : `${plan.borderColor} hover:border-purple-300`,
                  "backdrop-blur-lg bg-white/80"
                )}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute top-0 right-0 z-10">
                    <div className={cn(
                      "text-white text-xs px-3 py-1 transform rotate-12 translate-x-2 translate-y-3 uppercase font-bold tracking-wide",
                      plan.badgeColor
                    )}>
                      {plan.badge}
                    </div>
                  </div>
                )}

                <CardContent className="p-6 h-full flex flex-col">
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div className={cn(
                      "inline-flex p-3 rounded-full mb-4 bg-gradient-to-r",
                      plan.gradient
                    )}>
                      <div className="text-gray-700">
                        {plan.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                    
                    {/* Pricing */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-3xl font-bold text-gray-900">
                          ${plan.price}
                        </span>
                        <span className="text-gray-500">/mo</span>
                      </div>
                      
                      {plan.originalPrice > plan.price && (
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-lg line-through text-gray-400">
                            ${plan.originalPrice}
                          </span>
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                            {plan.savings}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex-1 space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Select Button */}
                  <Button
                    className={cn(
                      "w-full font-semibold transition-all",
                      selectedPlan === plan.id
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlanSelect(plan.id);
                    }}
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'Choose Plan'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Diamond Invite-Only Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200 overflow-hidden">
            <CardContent className="p-8 text-center">
              <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 mb-4">
                <Shield className="h-8 w-8 text-cyan-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Diamond Elite</h3>
              <p className="text-gray-600 mb-4">Invitation-Only Premium Experience</p>
              
              <div className="flex items-center justify-center gap-2 mb-6">
                <Badge variant="outline" className="bg-cyan-100 text-cyan-800 border-cyan-300">
                  <Users className="h-3 w-3 mr-1" />
                  Limited Availability
                </Badge>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                  <Crown className="h-3 w-3 mr-1" />
                  White Glove Service
                </Badge>
              </div>
              
              <Button 
                variant="outline" 
                className="border-cyan-300 text-cyan-700 hover:bg-cyan-100"
              >
                Request Invitation
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Nationwide Add-on */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <NationwideOption
            price="+$5"
            isFirstPost={true}
            onChange={setShowNationwide}
          />
        </motion.div>

        {/* Social Proof Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-600">2,000+ Salons Trust Us</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-gray-600">98% Hire Success Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <span className="text-sm text-gray-600">4.9/5 Rating</span>
            </div>
          </div>
          
          <p className="text-xs text-gray-500">
            ✓ Secure Payment • ✓ Cancel Anytime • ✓ 30-Day Money-Back Guarantee
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default JobPricingTable;

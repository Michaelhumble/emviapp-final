
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Eye, 
  TrendingUp, 
  Shield, 
  Star, 
  Crown, 
  Zap, 
  Target, 
  BarChart3, 
  Headphones, 
  Award,
  Clock,
  Users,
  ChevronRight,
  Sparkles,
  Timer
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface JobPricingTableProps {
  onPricingSelect: (tier: string, finalPrice: number, durationMonths: number) => void;
  jobData?: any;
}

const JobPricingTable: React.FC<JobPricingTableProps> = ({ onPricingSelect, jobData }) => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [timeLeft, setTimeLeft] = useState('47:59:32');
  const [goldSpots, setGoldSpots] = useState(8);
  const [diamondSpots, setDiamondSpots] = useState(2);

  // Countdown timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = String(Math.floor(Math.random() * 3) + 46).padStart(2, '0');
      const minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0');
      const seconds = String(Math.floor(Math.random() * 60)).padStart(2, '0');
      setTimeLeft(`${hours}:${minutes}:${seconds}`);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const plans = [
    {
      id: 'free',
      name: 'Free Listing',
      price: 0,
      originalPrice: null,
      badge: null,
      badgeColor: '',
      description: 'Perfect for testing the waters',
      features: [
        { icon: Eye, text: 'Basic search visibility' },
        { icon: Clock, text: '30-day duration' },
        { icon: Target, text: 'Standard placement' },
        { icon: Shield, text: 'Secure posting' }
      ],
      buttonText: 'Start Free',
      buttonClass: 'bg-gray-900 hover:bg-gray-800 text-white',
      cardClass: 'border-gray-200 bg-white/80'
    },
    {
      id: 'gold',
      name: 'Gold Featured',
      price: isAnnual ? 191.92 : 19.99,
      originalPrice: isAnnual ? 239.88 : null,
      badge: 'POPULAR',
      badgeColor: 'bg-gradient-to-r from-amber-400 to-orange-500',
      description: 'Stand out from the competition',
      spots: goldSpots,
      totalSpots: 15,
      features: [
        { icon: Award, text: 'Featured placement above standard' },
        { icon: Star, text: 'Gold badge highlight' },
        { icon: TrendingUp, text: 'Enhanced visibility' },
        { icon: BarChart3, text: 'Basic analytics' },
        { icon: Headphones, text: 'Priority support' }
      ],
      buttonText: 'Unlock Gold Now',
      buttonClass: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white',
      cardClass: 'border-amber-200 bg-gradient-to-br from-amber-50/80 to-orange-50/80 hover:shadow-amber-200/50'
    },
    {
      id: 'premium',
      name: 'Premium Listing',
      price: isAnnual ? 383.92 : 39.99,
      originalPrice: isAnnual ? 479.88 : null,
      badge: 'RECOMMENDED',
      badgeColor: 'bg-gradient-to-r from-purple-500 to-blue-500',
      description: 'Maximum impact for serious growth',
      features: [
        { icon: Crown, text: 'Premium placement above Gold' },
        { icon: Sparkles, text: 'Premium badge & styling' },
        { icon: BarChart3, text: 'Advanced analytics dashboard' },
        { icon: Zap, text: 'Priority support & consultation' },
        { icon: Target, text: 'Targeted visibility boost' }
      ],
      buttonText: 'Upgrade to Premium',
      buttonClass: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white',
      cardClass: 'border-purple-200 bg-gradient-to-br from-purple-50/80 to-blue-50/80 hover:shadow-purple-200/50 transform scale-105'
    },
    {
      id: 'diamond',
      name: 'Diamond Exclusive',
      price: 999.99,
      originalPrice: null,
      badge: 'INVITE ONLY',
      badgeColor: 'bg-gradient-to-r from-cyan-400 to-blue-500',
      description: 'Elite tier for industry leaders',
      spots: diamondSpots,
      totalSpots: 5,
      features: [
        { icon: Crown, text: 'Highest diamond placement' },
        { icon: Award, text: 'Diamond badge & exclusive styling' },
        { icon: Users, text: 'Personal account manager' },
        { icon: BarChart3, text: 'Premium analytics & insights' },
        { icon: Star, text: 'Annual exclusive benefits' }
      ],
      buttonText: 'Apply for Diamond',
      buttonClass: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white',
      cardClass: 'border-cyan-200 bg-gradient-to-br from-cyan-50/80 to-blue-50/80 hover:shadow-cyan-200/50'
    }
  ];

  const testimonials = [
    { name: "Sarah Chen", role: "Salon Owner", quote: "Found 3 stylists in first week!", rating: 5 },
    { name: "Marcus Johnson", role: "Spa Director", quote: "Diamond made us the talk of town!", rating: 5 },
    { name: "Lisa Rodriguez", role: "Beauty Manager", quote: "Best investment we ever made!", rating: 5 }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent animate-pulse">
              Supercharge Your Salon's Success
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-medium">
            Join thousands of top salons using our platform to find exceptional talent and grow their business
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md rounded-full p-2 shadow-xl border border-gray-200">
            <span className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${!isAnnual ? 'text-white bg-gray-900' : 'text-gray-700'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-purple-600"
            />
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${isAnnual ? 'text-white bg-gray-900' : 'text-gray-700'}`}>
                Annual
              </span>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: isAnnual ? 1 : 0.8, opacity: isAnnual ? 1 : 0.7 }}
                transition={{ duration: 0.3 }}
              >
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 text-xs">
                  Save 20%
                </Badge>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Price Increase Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
            <Timer className="h-4 w-4" />
            <span className="text-sm font-medium">Next Price Increase in {timeLeft}</span>
          </div>
        </motion.div>

        {/* Scarcity Indicators */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <div className="bg-amber-100 border border-amber-300 rounded-full px-4 py-2 flex items-center gap-2">
            <Users className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-800">{goldSpots}/15 Gold spots left</span>
          </div>
          <div className="bg-cyan-100 border border-cyan-300 rounded-full px-4 py-2 flex items-center gap-2">
            <Crown className="h-4 w-4 text-cyan-600" />
            <span className="text-sm font-medium text-cyan-800">{diamondSpots}/5 Diamond spots left</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <Card className={cn(
                "relative overflow-hidden backdrop-blur-md transition-all duration-300 hover:shadow-2xl border-2",
                plan.cardClass,
                plan.id === 'premium' && "ring-2 ring-purple-300 ring-opacity-50"
              )}>
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.05, 1],
                        boxShadow: ['0 0 0 rgba(0,0,0,0)', '0 0 20px rgba(147,51,234,0.3)', '0 0 0 rgba(0,0,0,0)']
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={cn(
                        "px-4 py-1 rounded-full text-xs font-bold text-white shadow-lg",
                        plan.badgeColor
                      )}
                    >
                      {plan.badge}
                    </motion.div>
                  </div>
                )}

                <div className="p-6 pt-8">
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                    
                    {/* Spots Left */}
                    {plan.spots && (
                      <div className="mb-4">
                        <div className="flex justify-center items-center gap-2 text-xs text-gray-500 mb-1">
                          <span>{plan.spots}/{plan.totalSpots} spots remaining</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className={cn(
                              "h-1.5 rounded-full transition-all duration-300",
                              plan.id === 'gold' ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-gradient-to-r from-cyan-400 to-blue-500'
                            )}
                            style={{ width: `${(plan.spots / plan.totalSpots) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Pricing */}
                    <div className="flex items-end justify-center gap-2 mb-6">
                      <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                      {plan.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">${plan.originalPrice}</span>
                      )}
                      {plan.id !== 'diamond' && (
                        <span className="text-sm text-gray-600">/{isAnnual ? 'year' : 'month'}</span>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <feature.icon className="h-5 w-5 text-gray-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature.text}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    onClick={() => onPricingSelect(plan.id, plan.price, plan.id === 'diamond' ? 12 : (isAnnual ? 12 : 1))}
                    className={cn(
                      "w-full h-12 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg",
                      plan.buttonClass
                    )}
                  >
                    {plan.buttonText}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {/* Special Effects */}
                {plan.id === 'diamond' && (
                  <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                      animate={{
                        background: [
                          'radial-gradient(circle at 0% 0%, rgba(6,182,212,0.1) 0%, transparent 50%)',
                          'radial-gradient(circle at 100% 100%, rgba(6,182,212,0.1) 0%, transparent 50%)',
                          'radial-gradient(circle at 0% 0%, rgba(6,182,212,0.1) 0%, transparent 50%)'
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 rounded-lg"
                    />
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-200 mb-16"
        >
          <div className="text-center mb-6">
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ delay: i * 0.1, duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                </motion.div>
              ))}
            </div>
            <h3 className="font-playfair text-2xl font-bold text-gray-900">Real salon owners rate us 5/5</h3>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <blockquote className="text-lg text-gray-700 italic mb-4">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>
              <div>
                <p className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</p>
                <p className="text-sm text-gray-600">{testimonials[currentTestimonial].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Mobile Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-gray-200 lg:hidden z-50">
          <Button className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold">
            Select Plan
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobPricingTable;

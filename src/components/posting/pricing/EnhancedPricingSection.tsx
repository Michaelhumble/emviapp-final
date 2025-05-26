
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { JobPricingTier, PricingOptions } from '@/utils/posting/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Check, 
  Crown, 
  Star, 
  Diamond, 
  Zap, 
  Users, 
  Timer,
  Clock,
  TrendingUp,
  Globe,
  Shield,
  AlertTriangle
} from 'lucide-react';

interface EnhancedPricingSectionProps {
  selectedTier: JobPricingTier;
  onTierSelect: (tier: JobPricingTier) => void;
  options: PricingOptions;
  onOptionsChange: (options: PricingOptions) => void;
  onProceed: () => void;
}

const EnhancedPricingSection: React.FC<EnhancedPricingSectionProps> = ({
  selectedTier,
  onTierSelect,
  options,
  onOptionsChange,
  onProceed
}) => {
  const [timeLeft, setTimeLeft] = useState('46:03:42');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [diamondSpotsLeft] = useState(2);
  const [goldSpotsLeft] = useState(8);

  // Countdown timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const endTime = now + (46 * 60 * 60 * 1000) + (3 * 60 * 1000) + (42 * 1000);
      const distance = endTime - now;
      
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Testimonials carousel
  const testimonials = [
    {
      text: "Found 3 stylists in first week!",
      author: "Sarah Chen",
      role: "Salon Owner"
    },
    {
      text: "Got 23 applications in 2 days!",
      author: "Maria S., Luxe Nails Studio",
      role: "Salon Owner"
    },
    {
      text: "Best investment for my salon growth",
      author: "David K., Elite Beauty",
      role: "Studio Manager"
    }
  ];

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(testimonialInterval);
  }, []);

  const pricingPlans = [
    {
      tier: 'free' as JobPricingTier,
      name: 'Free Listing',
      price: 0,
      originalPrice: null,
      duration: '30 days',
      badge: null,
      description: 'Perfect for testing the waters',
      features: [
        'Basic search visibility',
        '30-day duration',
        'Standard placement',
        'Secure posting'
      ],
      icon: <Check className="h-5 w-5 text-gray-500" />,
      buttonText: 'Start Free',
      buttonClass: 'bg-gray-800 hover:bg-gray-900 text-white'
    },
    {
      tier: 'gold' as JobPricingTier,
      name: 'Gold Featured',
      price: 19.99,
      originalPrice: null,
      duration: '/month',
      badge: 'POPULAR',
      badgeColor: 'bg-gradient-to-r from-orange-400 to-amber-500',
      description: 'Stand out from the competition',
      spotsLeft: `${goldSpotsLeft}/15 spots remaining`,
      features: [
        'Featured placement above standard',
        'Gold badge highlight',
        'Enhanced visibility',
        'Basic analytics dashboard',
        'Priority support'
      ],
      icon: <Star className="h-5 w-5 text-amber-500" />,
      buttonText: 'Unlock Gold Now',
      buttonClass: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
    },
    {
      tier: 'premium' as JobPricingTier,
      name: 'Premium Listing',
      price: 39.99,
      originalPrice: null,
      duration: '/month',
      badge: 'RECOMMENDED',
      badgeColor: 'bg-gradient-to-r from-purple-500 to-indigo-600',
      description: 'Maximum impact for serious growth',
      features: [
        'Premium placement above Gold',
        'Premium badge & styling',
        'Advanced analytics dashboard',
        'Priority support & consultation',
        'Targeted visibility boost'
      ],
      icon: <Crown className="h-5 w-5 text-purple-500" />,
      buttonText: 'Upgrade to Premium',
      buttonClass: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white'
    },
    {
      tier: 'diamond' as JobPricingTier,
      name: 'Diamond Exclusive',
      price: 999.99,
      originalPrice: null,
      duration: '/year only',
      badge: 'INVITE ONLY',
      badgeColor: 'bg-gradient-to-r from-cyan-400 to-blue-500',
      description: 'Elite tier for industry leaders',
      spotsLeft: `${diamondSpotsLeft}/3 spots remaining`,
      exclusiveText: 'Only 3 Diamond spots for the entire platform. 1 reserved for Emvi founder\'s brother\'s salon. 2 open for the world\'s most visionary salons.',
      features: [
        'Highest diamond placement',
        'Diamond badge & exclusive styling',
        'Personal account manager',
        'Premium analytics & insights',
        'Annual exclusive benefits'
      ],
      icon: <Diamond className="h-5 w-5 text-cyan-500" />,
      buttonText: diamondSpotsLeft > 0 ? 'Apply for Diamond' : 'Join Waitlist',
      buttonClass: diamondSpotsLeft > 0 
        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white'
        : 'bg-gray-400 text-gray-700 cursor-not-allowed',
      disabled: diamondSpotsLeft === 0
    }
  ];

  const handleNationwideToggle = (checked: boolean) => {
    onOptionsChange({ ...options, isNationwide: checked });
  };

  const handleAutoRenewToggle = (checked: boolean) => {
    onOptionsChange({ ...options, autoRenew: checked });
  };

  const getCardStyle = (tier: JobPricingTier) => {
    const baseStyle = "relative overflow-hidden transition-all duration-300 cursor-pointer group";
    
    if (selectedTier === tier) {
      return `${baseStyle} ring-2 ring-purple-500 shadow-2xl scale-[1.02]`;
    }
    
    switch (tier) {
      case 'gold':
        return `${baseStyle} border-amber-200 hover:shadow-xl hover:scale-[1.01] bg-gradient-to-br from-amber-50/50 to-orange-50/50`;
      case 'premium':
        return `${baseStyle} border-purple-200 hover:shadow-xl hover:scale-[1.01] bg-gradient-to-br from-purple-50/50 to-indigo-50/50`;
      case 'diamond':
        return `${baseStyle} border-cyan-200 hover:shadow-xl hover:scale-[1.01] bg-gradient-to-br from-cyan-50/50 to-blue-50/50`;
      default:
        return `${baseStyle} border-gray-200 hover:shadow-lg hover:scale-[1.01] bg-white`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold font-playfair bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent leading-tight">
            Supercharge Your Salon's Success
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of top salons using our platform to find exceptional talent and grow their business
          </p>

          {/* FOMO Stats Bar */}
          <div className="flex flex-wrap justify-center items-center gap-6 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-full px-8 py-4 shadow-lg max-w-4xl mx-auto">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-orange-600" />
              <span className="font-semibold text-orange-800">{goldSpotsLeft + diamondSpotsLeft} spots left this week</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-red-600" />
              <span className="font-semibold text-red-800">Limited time: 50% off</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-purple-600" />
              <span className="font-mono font-bold text-purple-800">{timeLeft}</span>
            </div>
          </div>

          {/* Success Stories Carousel */}
          <div className="relative max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl p-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Real salon owners rate us 5/5
                </Badge>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <p className="text-xl font-semibold text-gray-900 mb-3 italic">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                  <div className="text-gray-600">
                    <p className="font-medium">{testimonials[currentTestimonial].author}</p>
                    <p className="text-sm">{testimonials[currentTestimonial].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Testimonial indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentTestimonial ? 'bg-purple-500 w-6' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Duration Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-full p-1 shadow-lg border border-gray-200">
            <div className="flex items-center gap-4 px-6 py-3">
              <span className={`font-medium ${options.durationMonths === 1 ? 'text-gray-900' : 'text-gray-500'}`}>
                Monthly
              </span>
              <Switch
                checked={options.durationMonths === 12}
                onCheckedChange={(checked) => 
                  onOptionsChange({ ...options, durationMonths: checked ? 12 : 1 })
                }
              />
              <span className={`font-medium ${options.durationMonths === 12 ? 'text-gray-900' : 'text-gray-500'}`}>
                Annual
              </span>
              {options.durationMonths === 12 && (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Save 20%
                </Badge>
              )}
            </div>
          </div>
        </motion.div>

        {/* Price Increase Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-full px-6 py-3 shadow-lg">
            <Clock className="h-5 w-5 text-red-600" />
            <span className="text-sm font-semibold text-red-800">
              Next Price Increase in <span className="font-mono">{timeLeft}</span>
            </span>
          </div>
        </motion.div>

        {/* Spot Indicators */}
        <div className="flex justify-center gap-4 mb-12">
          <Badge className="bg-amber-100 text-amber-800 border-amber-200 px-4 py-2">
            <Users className="h-4 w-4 mr-2" />
            {goldSpotsLeft}/15 Gold spots left
          </Badge>
          <Badge className="bg-cyan-100 text-cyan-800 border-cyan-200 px-4 py-2">
            <Diamond className="h-4 w-4 mr-2" />
            {diamondSpotsLeft}/3 Diamond spots left
          </Badge>
        </div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.tier}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -4 }}
              className="relative"
            >
              <Card
                className={getCardStyle(plan.tier)}
                onClick={() => !plan.disabled && onTierSelect(plan.tier)}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className={`${plan.badgeColor} text-white font-bold px-4 py-1 shadow-lg border-0`}>
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pt-8">
                  <div className="flex justify-center mb-4">
                    {plan.icon}
                  </div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                  
                  {/* Spot indicator */}
                  {plan.spotsLeft && (
                    <div className="mb-4">
                      <div className={`w-full bg-gray-200 rounded-full h-2 mb-2 ${
                        plan.tier === 'gold' ? 'bg-amber-100' : 'bg-cyan-100'
                      }`}>
                        <div 
                          className={`h-2 rounded-full ${
                            plan.tier === 'gold' ? 'bg-amber-500' : 'bg-cyan-500'
                          }`}
                          style={{ 
                            width: plan.tier === 'gold' 
                              ? `${(goldSpotsLeft / 15) * 100}%`
                              : `${(diamondSpotsLeft / 3) * 100}%`
                          }}
                        />
                      </div>
                      <p className={`text-xs font-medium ${
                        plan.tier === 'gold' ? 'text-amber-700' : 'text-cyan-700'
                      }`}>
                        {plan.spotsLeft}
                      </p>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <div className="flex items-end justify-center">
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-gray-500 ml-1">{plan.duration}</span>
                    </div>
                    {plan.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${plan.originalPrice}</span>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Diamond exclusive text */}
                  {plan.tier === 'diamond' && plan.exclusiveText && (
                    <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3 mb-4">
                      <p className="text-xs text-cyan-800 leading-relaxed">{plan.exclusiveText}</p>
                    </div>
                  )}

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${plan.buttonClass} font-semibold py-3 shadow-lg transition-all duration-300`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!plan.disabled) {
                        onTierSelect(plan.tier);
                      }
                    }}
                    disabled={plan.disabled}
                  >
                    {plan.buttonText}
                  </Button>

                  {/* Trust indicators */}
                  {(plan.tier === 'premium' || plan.tier === 'gold') && (
                    <div className="mt-4 pt-3 border-t flex items-center justify-center">
                      <Shield className="h-3 w-3 text-gray-400 mr-1" />
                      <span className="text-[10px] text-gray-500">100% Secure • Cancel Anytime</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Add-on Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-6 mb-12"
        >
          <div className="max-w-4xl mx-auto">
            {/* Nationwide Option */}
            <Card className="border-blue-200 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
                      <Globe className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Nationwide Visibility</h3>
                      <p className="text-sm text-gray-600">Reach candidates across all 50 states</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">+$5</p>
                      <p className="text-xs text-gray-500">per listing</p>
                    </div>
                    <Switch 
                      checked={options.isNationwide} 
                      onCheckedChange={handleNationwideToggle}
                    />
                  </div>
                </div>

                {/* FOMO for nationwide */}
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <span className="text-orange-700 font-medium">12 nationwide slots left • High demand</span>
                </div>
              </CardContent>
            </Card>

            {/* Auto-renew Option */}
            <Card className="border-green-200 bg-gradient-to-r from-green-50/50 to-emerald-50/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center">
                      <Zap className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Auto-Renew Protection</h3>
                      <p className="text-sm text-gray-600">Never lose your listing position</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">FREE</p>
                      <p className="text-xs text-gray-500">extra 5% off</p>
                    </div>
                    <Switch 
                      checked={options.autoRenew} 
                      onCheckedChange={handleAutoRenewToggle}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center gap-8 text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span>400% avg. application increase</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>4.9/5 salon owner rating</span>
            </div>
          </div>

          {/* Recent signups */}
          <div className="flex justify-center gap-2 flex-wrap mb-8">
            {[
              'Luxe Beauty Studio',
              'Salon Magnifique', 
              'The Hair Collective',
              'Bella Vista Spa'
            ].map((salon, index) => (
              <motion.div
                key={salon}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <Badge
                  variant="outline"
                  className="text-xs bg-white/60 border-purple-200 text-purple-700 backdrop-blur-sm"
                >
                  {salon} just upgraded
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Proceed Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          <Button 
            onClick={onProceed}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
            size="lg"
          >
            Continue with {selectedTier === 'free' ? 'Free' : 
                         selectedTier === 'gold' ? 'Gold' :
                         selectedTier === 'premium' ? 'Premium' : 'Diamond'} Plan
            <motion.div
              className="ml-2"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Check className="h-5 w-5" />
            </motion.div>
          </Button>
          
          <p className="text-sm text-gray-500 mt-4">
            Trusted by over 10,000+ beauty professionals worldwide
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedPricingSection;

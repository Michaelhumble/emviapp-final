
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Crown, Clock, Users, Flame, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface JobPricingTableProps {
  onPricingSelect: (tier: string, finalPrice: number, durationMonths: number) => void;
  jobData: any;
}

const JobPricingTable: React.FC<JobPricingTableProps> = ({ onPricingSelect, jobData }) => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour countdown
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Countdown timer effect
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
      tier: 'free',
      name: 'Free Tier',
      price: 0,
      originalPrice: 29,
      duration: 1,
      icon: <Check className="h-5 w-5" />,
      description: 'Always free forever',
      tagline: 'Perfect for testing the waters',
      features: [
        'Basic job listing',
        'Limited visibility (local only)',
        '7-day listing duration',
        'Email support only',
        'Basic applicant filtering'
      ],
      buttonText: 'Start Free',
      popular: false,
      gradient: 'from-gray-100 to-gray-200',
      textColor: 'text-gray-700',
      buttonColor: 'bg-gray-600 hover:bg-gray-700',
      savings: '100% OFF Launch Week'
    },
    {
      tier: 'standard',
      name: 'Standard',
      price: 9.99,
      originalPrice: 19.99,
      duration: 1,
      icon: <Star className="h-5 w-5" />,
      description: '2x more visibility than free',
      tagline: 'Best for new salons',
      features: [
        '30-day premium listing',
        '2x visibility boost',
        'Regional targeting',
        'Priority email support',
        'Advanced applicant filtering',
        'Basic analytics dashboard'
      ],
      buttonText: 'Choose Standard',
      popular: false,
      gradient: 'from-blue-100 to-indigo-200',
      textColor: 'text-blue-900',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      savings: '50% OFF Today'
    },
    {
      tier: 'premium',
      name: 'Premium',
      price: 19.99,
      originalPrice: 39.99,
      duration: 1,
      icon: <Zap className="h-5 w-5" />,
      description: '4x more visibility + priority',
      tagline: 'Most popular choice',
      features: [
        '60-day featured listing',
        '4x visibility multiplier',
        'Priority placement in search',
        'Live chat support',
        'Advanced analytics & insights',
        'Social media auto-posting',
        'Urgent hiring badge'
      ],
      buttonText: 'Go Premium',
      popular: true,
      gradient: 'from-purple-100 to-pink-200',
      textColor: 'text-purple-900',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      savings: '50% OFF Limited Time'
    },
    {
      tier: 'gold',
      name: 'Gold Elite',
      price: 39.99,
      originalPrice: 79.99,
      duration: 1,
      icon: <Crown className="h-5 w-5" />,
      description: 'Unlimited edits + premium badge',
      tagline: 'For serious hiring managers',
      features: [
        '90-day top placement',
        'Unlimited job edits',
        'Premium salon badge',
        'Dedicated account manager',
        'Custom branding options',
        'Multi-platform distribution',
        'Priority candidate screening',
        'Advanced reporting suite'
      ],
      buttonText: 'Unlock Gold',
      popular: false,
      gradient: 'from-amber-100 to-yellow-200',
      textColor: 'text-amber-900',
      buttonColor: 'bg-amber-600 hover:bg-amber-700',
      savings: '50% OFF Founders Price'
    }
  ];

  const testimonials = [
    '"EmviApp helped us hire 3 nail techs in just 2 weeks!" - Sarah M., Luxury Nails',
    '"Best ROI for salon hiring. Period." - Mike T., Elite Beauty',
    '"Finally, quality candidates who actually show up!" - Lisa K., Bella Salon'
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(testimonialTimer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Flame className="h-4 w-4" />
            Limited Time: 50% OFF All Plans
            <Clock className="h-4 w-4 ml-2" />
            {formatTime(timeLeft)}
          </motion.div>
          
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Hiring Plan</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Get your job posting seen by the right candidates. Start free, upgrade anytime.
          </p>
          
          {/* Rotating Testimonials */}
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-700 italic max-w-2xl mx-auto"
          >
            {testimonials[currentTestimonial]}
          </motion.div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.tier}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(plan.tier)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative"
            >
              <Card className={`
                relative overflow-hidden cursor-pointer transition-all duration-300 border-2
                ${plan.popular ? 'border-purple-300 shadow-2xl scale-105 z-10' : 'border-gray-200 hover:border-purple-200'}
                ${hoveredCard === plan.tier ? 'transform hover:scale-110 shadow-xl' : ''}
                backdrop-blur-lg bg-white/80
              `}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 shadow-lg">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                {plan.savings && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-l from-red-500 to-red-600 text-white text-xs px-3 py-1 transform rotate-12 translate-x-2 translate-y-2 font-bold">
                      {plan.savings}
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-2">
                  <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${plan.gradient} mb-3`}>
                    <div className={plan.textColor}>
                      {plan.icon}
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <p className="text-sm text-gray-600 font-medium">{plan.tagline}</p>
                  
                  <div className="flex items-center justify-center gap-2 mt-3">
                    {plan.originalPrice > plan.price && (
                      <span className="text-lg text-gray-400 line-through">${plan.originalPrice}</span>
                    )}
                    <span className="text-3xl font-bold">
                      ${plan.price}
                      {plan.price > 0 && <span className="text-sm font-normal text-gray-500">/mo</span>}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.1) + (featureIndex * 0.05) }}
                        className="flex items-start text-sm"
                      >
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                  
                  <Button
                    onClick={() => onPricingSelect(plan.tier, plan.price, plan.duration)}
                    className={`w-full font-semibold transition-all duration-200 ${plan.buttonColor} text-white`}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Diamond Tier - Invite Only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <Card className="border-2 border-transparent bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-200/20 via-blue-200/20 to-purple-200/20"></div>
            <CardContent className="relative z-10 p-8 text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                <Shield className="h-4 w-4" />
                INVITE ONLY
              </div>
              <h3 className="text-2xl font-bold mb-2">Diamond Elite</h3>
              <p className="text-gray-600 mb-4">Exclusive tier for enterprise clients</p>
              <p className="text-sm text-gray-500 mb-6">Custom pricing • White-glove service • Dedicated success manager</p>
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                Request Invitation
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Nationwide Add-on */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 backdrop-blur-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-100 rounded-full">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Nationwide Visibility</h3>
                    <p className="text-sm text-gray-600">Reach candidates across all 50 states</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                        Only 12 slots left this week
                      </Badge>
                      <span className="text-xs text-gray-500">• High demand add-on</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-600">+$5</div>
                  <div className="text-sm text-gray-500">per listing</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Job Preview */}
        <div className="bg-blue-50 rounded-xl p-6 text-center max-w-2xl mx-auto">
          <h3 className="font-semibold text-gray-800 mb-2">Your Job Posting Preview</h3>
          <p className="text-sm text-blue-800">
            <strong>Job Title:</strong> {jobData?.title || 'Your Amazing Job Opportunity'}
          </p>
          <p className="text-xs text-blue-600 mt-2">
            All plans include: Mobile-optimized listings • Applicant management • Smart matching
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobPricingTable;

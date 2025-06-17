
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Calendar, 
  MessageSquare, 
  Phone, 
  Brain, 
  Share2, 
  Users, 
  TrendingUp,
  Vote,
  Sparkles,
  Clock,
  ChevronRight,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import CTAButton from './CTAButton';

// COMMUNITY PAGE UPDATE - AI Features voting section for community engagement
const AIFeaturesVoting = () => {
  const [userVotes, setUserVotes] = useState<Set<string>>(new Set());

  const features = [
    {
      id: 'pos-system',
      title: 'Smart POS System',
      description: 'AI-powered point of sale with automatic inventory tracking and sales insights',
      icon: Zap,
      progress: 78,
      votes: 1234,
      category: 'Business Operations',
      estimatedLaunch: 'Q2 2024'
    },
    {
      id: 'booking-automation',
      title: 'Booking & Calendar AI',
      description: 'Intelligent scheduling that optimizes your calendar and reduces no-shows',
      icon: Calendar,
      progress: 65,
      votes: 987,
      category: 'Scheduling',
      estimatedLaunch: 'Q1 2024'
    },
    {
      id: 'sms-marketing',
      title: 'SMS Marketing Suite',
      description: 'Automated SMS campaigns that bring clients back and boost retention',
      icon: MessageSquare,
      progress: 52,
      votes: 756,
      category: 'Marketing',
      estimatedLaunch: 'Q2 2024'
    },
    {
      id: 'receptionist-ai',
      title: 'Front Desk AI Assistant',
      description: 'AI receptionist that handles calls, bookings, and customer inquiries 24/7',
      icon: Phone,
      progress: 43,
      votes: 632,
      category: 'Customer Service',
      estimatedLaunch: 'Q3 2024'
    },
    {
      id: 'smart-booking',
      title: 'Predictive Booking AI',
      description: 'ML algorithms that predict busy periods and optimize your schedule',
      icon: Brain,
      progress: 35,
      votes: 489,
      category: 'Analytics',
      estimatedLaunch: 'Q3 2024'
    },
    {
      id: 'social-media-ai',
      title: 'Social Media Marketing AI',
      description: 'Automated content creation and posting for Instagram, TikTok, and Facebook',
      icon: Share2,
      progress: 28,
      votes: 341,
      category: 'Marketing',
      estimatedLaunch: 'Q4 2024'
    },
    {
      id: 'payroll-automation',
      title: 'Team & Payroll Automation',
      description: 'Streamlined team management with automatic payroll and commission tracking',
      icon: Users,
      progress: 19,
      votes: 287,
      category: 'HR & Finance',
      estimatedLaunch: 'Q4 2024'
    },
    {
      id: 'analytics-dashboard',
      title: 'Advanced Analytics Dashboard',
      description: 'Deep insights into your business performance with AI-powered recommendations',
      icon: TrendingUp,
      progress: 12,
      votes: 156,
      category: 'Analytics',
      estimatedLaunch: '2025'
    }
  ];

  // COMMUNITY PAGE UPDATE - Handle voting without complex auth dependencies
  const handleVote = (featureId: string) => {
    if (userVotes.has(featureId)) {
      setUserVotes(prev => {
        const newVotes = new Set(prev);
        newVotes.delete(featureId);
        return newVotes;
      });
    } else {
      setUserVotes(prev => new Set([...prev, featureId]));
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-16">
      <div className="container mx-auto px-4">
        {/* FOMO Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-6 text-center shadow-xl"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-white animate-pulse" />
            <span className="text-white font-bold text-lg">LIMITED TIME</span>
            <Sparkles className="h-6 w-6 text-white animate-pulse" />
          </div>
          <p className="text-white text-xl font-semibold mb-1">
            Everything is FREE now — Premium launching soon!
          </p>
          <p className="text-yellow-100">
            Early supporters get lifetime perks and VIP access. Join now before prices go up! 🚀
          </p>
        </motion.div>

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-purple-100 rounded-full px-4 py-2 mb-4"
          >
            <Vote className="h-4 w-4 text-purple-600" />
            <span className="text-purple-600 font-medium text-sm">Community Powered</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4"
          >
            Vote for the Next AI-Powered Feature
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Help us prioritize which premium features to build first. Your votes determine our roadmap!
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200 group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 transition-colors">
                          {feature.title}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {feature.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Clock className="h-4 w-4" />
                      <span className="text-xs text-gray-500">{feature.estimatedLaunch}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Progress to unlock
                      </span>
                      <span className="text-sm font-bold text-purple-600">
                        {feature.progress}%
                      </span>
                    </div>
                    
                    <Progress value={feature.progress} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {feature.votes.toLocaleString()} votes
                      </span>
                      <Button
                        onClick={() => handleVote(feature.id)}
                        variant={userVotes.has(feature.id) ? "default" : "outline"}
                        size="sm"
                        className="gap-2"
                      >
                        <Vote className="h-4 w-4" />
                        {userVotes.has(feature.id) ? 'Voted!' : 'Vote'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* User Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-xl"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              What Our Community Says
            </h3>
            <p className="text-gray-600">
              Real feedback from beauty professionals who are shaping EmviApp's future
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Chen",
                role: "Salon Owner",
                content: "I can't wait for the AI receptionist! It would save me hours every day.",
                rating: 5
              },
              {
                name: "Marcus Rodriguez",
                role: "Nail Artist",
                content: "The booking automation sounds incredible. No more double bookings!",
                rating: 5
              },
              {
                name: "Isabella Kim",
                role: "Hair Stylist",
                content: "Social media AI would be a game-changer for my business growth.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Want to Suggest a New Feature?
            </h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Have an idea that's not on our list? We love hearing from our community! 
              Your suggestion could be the next big feature everyone votes for.
            </p>
            <CTAButton
              type="join_waitlist"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold"
            >
              Suggest a Feature
              <ChevronRight className="ml-2 h-4 w-4" />
            </CTAButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIFeaturesVoting;

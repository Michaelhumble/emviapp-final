
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Vote, Zap, Calendar, MessageSquare, Phone, Users, Share2, DollarSign, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface AIFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  votes: number;
  totalVotesNeeded: number;
  status: 'coming-soon' | 'vote-to-unlock' | 'vip-preview';
}

const aiFeatures: AIFeature[] = [
  {
    id: 'pos-system',
    title: 'POS System',
    description: 'Complete point-of-sale system with inventory tracking and analytics',
    icon: DollarSign,
    votes: 847,
    totalVotesNeeded: 1000,
    status: 'vote-to-unlock'
  },
  {
    id: 'booking-automation',
    title: 'Booking/Calendar Automation',
    description: 'AI-powered scheduling that learns your preferences and optimizes bookings',
    icon: Calendar,
    votes: 623,
    totalVotesNeeded: 1000,
    status: 'vote-to-unlock'
  },
  {
    id: 'sms-marketing',
    title: 'SMS Marketing',
    description: 'Automated SMS campaigns with personalized client messaging',
    icon: MessageSquare,
    votes: 512,
    totalVotesNeeded: 1000,
    status: 'coming-soon'
  },
  {
    id: 'receptionist-ai',
    title: 'Front Desk/Receptionist AI',
    description: 'AI assistant that handles calls, answers questions, and books appointments',
    icon: Phone,
    votes: 734,
    totalVotesNeeded: 1000,
    status: 'vote-to-unlock'
  },
  {
    id: 'smart-booking-ai',
    title: 'Smart Booking AI',
    description: 'Intelligent booking recommendations based on client history and preferences',
    icon: Zap,
    votes: 456,
    totalVotesNeeded: 1000,
    status: 'coming-soon'
  },
  {
    id: 'social-media-ai',
    title: 'Social Media Marketing AI',
    description: 'Automatically create and schedule social media content for your salon',
    icon: Share2,
    votes: 389,
    totalVotesNeeded: 1000,
    status: 'coming-soon'
  },
  {
    id: 'payroll-automation',
    title: 'Team/Payroll Automation',
    description: 'Automated payroll processing with commission tracking and reporting',
    icon: Users,
    votes: 298,
    totalVotesNeeded: 1000,
    status: 'coming-soon'
  }
];

const AIFeaturesVoting = () => {
  const [userVotes, setUserVotes] = useState<Record<string, boolean>>({});

  const handleVote = (featureId: string) => {
    setUserVotes(prev => ({
      ...prev,
      [featureId]: !prev[featureId]
    }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'vote-to-unlock':
        return <Badge className="bg-purple-100 text-purple-800">Vote to Unlock</Badge>;
      case 'vip-preview':
        return <Badge className="bg-gold-100 text-gold-800">VIP Preview</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Coming Soon</Badge>;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 py-16">
      <div className="container mx-auto px-4">
        {/* FOMO Info Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-lg mb-8 text-center"
        >
          <p className="text-sm md:text-base font-medium">
            🚀 Everything is free now—Premium launching soon! Early supporters get lifetime perks and VIP access.
          </p>
        </motion.div>

        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Vote for the Next AI-Powered Feature
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Help shape the future of EmviApp! Vote for the features you want most and watch them come to life.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {aiFeatures.map((feature) => {
            const IconComponent = feature.icon;
            const votePercentage = (feature.votes / feature.totalVotesNeeded) * 100;
            const hasVoted = userVotes[feature.id];

            return (
              <motion.div key={feature.id} variants={cardVariants}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                        <IconComponent className="h-6 w-6 text-purple-600" />
                      </div>
                      {getStatusBadge(feature.status)}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>{feature.votes} votes</span>
                        <span>{feature.totalVotesNeeded} needed</span>
                      </div>
                      <Progress value={votePercentage} className="h-2" />
                    </div>

                    {/* Vote Button */}
                    <Button
                      onClick={() => handleVote(feature.id)}
                      className={`w-full ${
                        hasVoted
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-purple-600 hover:bg-purple-700'
                      }`}
                      size="sm"
                    >
                      <Vote className="h-4 w-4 mr-2" />
                      {hasVoted ? 'Voted!' : 'Vote Now'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}

          {/* Suggestion Card */}
          <motion.div variants={cardVariants}>
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-dashed border-2 border-gray-300">
              <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="p-3 bg-gray-100 rounded-full mb-4">
                  <Plus className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Suggest a Feature</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Have an idea for an AI feature that would help your business?
                </p>
                <Button variant="outline" size="sm">
                  Submit Suggestion
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* User Testimonials Carousel */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-center mb-8">What Early Supporters Are Saying</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah M.",
                role: "Salon Owner",
                text: "The AI features EmviApp is planning will revolutionize how I run my salon. Can't wait for the booking automation!"
              },
              {
                name: "Mike L.",
                role: "Nail Artist",
                text: "Finally, someone is building tech that actually understands our industry. The POS system sounds amazing!"
              },
              {
                name: "Jessica R.",
                role: "Freelancer",
                text: "I voted for SMS marketing because client communication is everything. EmviApp gets it right."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="bg-gray-50 p-6 rounded-lg mb-4">
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFeaturesVoting;

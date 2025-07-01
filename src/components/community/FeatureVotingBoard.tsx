
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, Sparkles, Globe, MessageCircle, BarChart, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const mockFeatures = [
  {
    id: 1,
    title: "AI Assistant for Marketing",
    description: "Smart AI to help create social media posts and marketing campaigns",
    votes: 328,
    icon: Sparkles
  },
  {
    id: 2,
    title: "Multi-language Support",
    description: "Full Vietnamese and Spanish language support for all features",
    votes: 247,
    icon: Globe
  },
  {
    id: 3,
    title: "Advanced Messaging System",
    description: "Video calls, file sharing, and appointment scheduling in chat",
    votes: 195,
    icon: MessageCircle
  },
  {
    id: 4,
    title: "Business Analytics Dashboard",
    description: "Detailed insights on bookings, revenue, and customer trends",
    votes: 156,
    icon: BarChart
  },
  {
    id: 5,
    title: "Advanced Calendar Integration",
    description: "Sync with Google Calendar, Apple Calendar, and booking systems",
    votes: 134,
    icon: Calendar
  }
];

const FeatureVotingBoard = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Vote on Future Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Help shape the future of EmviApp by voting on the features you want to see next
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-purple-100">
                      <feature.icon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
                      <span>{feature.votes} votes</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Upvote
                    </Button>
                    <Button size="sm" variant="ghost" className="px-3">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureVotingBoard;

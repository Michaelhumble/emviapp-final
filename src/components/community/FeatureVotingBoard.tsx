
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, MessageCircle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FeatureRequest {
  id: number;
  title: string;
  description: string;
  votes: number;
  comments: number;
  category: string;
  priority: 'high' | 'medium' | 'low';
}

const initialFeatures: FeatureRequest[] = [
  {
    id: 1,
    title: "AI-Powered Client Matching",
    description: "Smart algorithm to match clients with the perfect artist based on style preferences and location",
    votes: 147,
    comments: 23,
    category: "AI Features",
    priority: 'high'
  },
  {
    id: 2,
    title: "Live Video Consultations",
    description: "Built-in video calling for virtual consultations before booking appointments",
    votes: 89,
    comments: 15,
    category: "Communication",
    priority: 'medium'
  },
  {
    id: 3,
    title: "Advanced Portfolio Analytics",
    description: "Detailed insights on which portfolio pieces get the most engagement and bookings",
    votes: 76,
    comments: 12,
    category: "Analytics",
    priority: 'medium'
  },
  {
    id: 4,
    title: "Multi-Language Support",
    description: "Full Vietnamese and Spanish translations for better accessibility",
    votes: 134,
    comments: 28,
    category: "Accessibility",
    priority: 'high'
  },
  {
    id: 5,
    title: "Team Collaboration Tools",
    description: "Features for salon teams to coordinate schedules and share client notes",
    votes: 62,
    comments: 9,
    category: "Team Features",
    priority: 'low'
  }
];

const FeatureVotingBoard = () => {
  const [features, setFeatures] = useState(initialFeatures);

  const handleVote = (id: number, type: 'up' | 'down') => {
    setFeatures(prev => prev.map(feature => 
      feature.id === id 
        ? { ...feature, votes: feature.votes + (type === 'up' ? 1 : -1) }
        : feature
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center gap-2 mb-4">
            <Lightbulb className="h-8 w-8 text-purple-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Feature Voting Board
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Help shape the future of EmviApp! Vote on features you want to see and suggest new ideas.
          </p>
        </motion.div>

        <div className="grid gap-6">
          {features.sort((a, b) => b.votes - a.votes).map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  {/* Voting Controls */}
                  <div className="flex flex-col items-center gap-1 min-w-[60px]">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote(feature.id, 'up')}
                      className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <span className="font-bold text-lg text-gray-700">{feature.votes}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote(feature.id, 'down')}
                      className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Feature Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(feature.priority)}`}>
                        {feature.priority.charAt(0).toUpperCase() + feature.priority.slice(1)} Priority
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{feature.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        {feature.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{feature.comments} comments</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3">
            Suggest New Feature
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureVotingBoard;

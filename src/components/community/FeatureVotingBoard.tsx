
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronUp, MessageSquare, Calendar, Star, Zap, Users } from 'lucide-react';

interface FeatureRequest {
  id: string;
  title: string;
  description: string;
  votes: number;
  icon: React.ElementType;
  category: string;
}

const mockFeatures: FeatureRequest[] = [
  {
    id: '1',
    title: 'AI-Powered Scheduling Assistant',
    description: 'Smart booking system that learns client preferences and suggests optimal appointment times',
    votes: 127,
    icon: Calendar,
    category: 'AI Features'
  },
  {
    id: '2',
    title: 'Live Chat with Video Calls',
    description: 'Real-time communication with video consultation for remote service discussions',
    votes: 89,
    icon: MessageSquare,
    category: 'Communication'
  },
  {
    id: '3',
    title: 'Artist Skill Verification System',
    description: 'Professional certification badges and skill verification through portfolio analysis',
    votes: 156,
    icon: Star,
    category: 'Trust & Safety'
  },
  {
    id: '4',
    title: 'Instant Portfolio Enhancement',
    description: 'AI-powered photo editing and enhancement tools for portfolio images',
    votes: 203,
    icon: Zap,
    category: 'AI Features'
  },
  {
    id: '5',
    title: 'Community Mentorship Program',
    description: 'Connect experienced professionals with newcomers for guidance and support',
    votes: 74,
    icon: Users,
    category: 'Community'
  }
];

const FeatureVotingBoard = () => {
  const [votes, setVotes] = useState<Record<string, number>>(
    mockFeatures.reduce((acc, feature) => ({
      ...acc,
      [feature.id]: feature.votes
    }), {})
  );

  const [userVotes, setUserVotes] = useState<Set<string>>(new Set());

  const handleVote = (featureId: string) => {
    if (userVotes.has(featureId)) return;
    
    setVotes(prev => ({
      ...prev,
      [featureId]: prev[featureId] + 1
    }));
    setUserVotes(prev => new Set([...prev, featureId]));
  };

  const sortedFeatures = mockFeatures
    .map(feature => ({ ...feature, votes: votes[feature.id] }))
    .sort((a, b) => b.votes - a.votes);

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-gray-900">
            Shape Our Future Together
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vote for the features that matter most to you. Your voice helps us prioritize what to build next.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <feature.icon className="h-6 w-6 text-purple-600" />
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                      {feature.category}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm">
                    {feature.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Button
                      variant={userVotes.has(feature.id) ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => handleVote(feature.id)}
                      disabled={userVotes.has(feature.id)}
                      className="flex items-center gap-2"
                    >
                      <ChevronUp className="h-4 w-4" />
                      {userVotes.has(feature.id) ? 'Voted' : 'Vote'}
                    </Button>
                    <span className="font-semibold text-purple-600">
                      {feature.votes} votes
                    </span>
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

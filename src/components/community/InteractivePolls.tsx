
// COMMUNITY PAGE UPDATE - Fixed syntax errors in interactive polls
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Heart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const InteractivePolls = () => {
  const [votes, setVotes] = useState({
    poll1: { option1: 45, option2: 32, option3: 23 },
    poll2: { option1: 67, option2: 33 },
    poll3: { option1: 28, option2: 41, option3: 31 }
  });

  const [userVotes, setUserVotes] = useState<Record<string, string>>({});

  const handleVote = (pollId: string, option: string) => {
    if (userVotes[pollId]) {
      toast.info('You have already voted in this poll!');
      return;
    }

    setVotes(prev => ({
      ...prev,
      [pollId]: {
        ...prev[pollId as keyof typeof prev],
        [option]: (prev[pollId as keyof typeof prev] as any)[option] + 1
      }
    }));

    setUserVotes(prev => ({ ...prev, [pollId]: option }));
    toast.success('Vote recorded! Thanks for your input.');
  };

  const polls = [
    {
      id: 'poll1',
      question: 'What feature would you love to see next?',
      icon: <Zap className="h-5 w-5 text-amber-500" />,
      options: [
        { key: 'option1', label: 'AI Booking Assistant', color: 'bg-blue-500' },
        { key: 'option2', label: 'Virtual Try-On', color: 'bg-purple-500' },
        { key: 'option3', label: 'Group Bookings', color: 'bg-pink-500' }
      ]
    },
    {
      id: 'poll2',
      question: 'How do you prefer to book appointments?',
      icon: <Users className="h-5 w-5 text-emerald-500" />,
      options: [
        { key: 'option1', label: 'Mobile App', color: 'bg-emerald-500' },
        { key: 'option2', label: 'Website', color: 'bg-blue-500' }
      ]
    },
    {
      id: 'poll3',
      question: 'What motivates you most as a beauty professional?',
      icon: <Heart className="h-5 w-5 text-rose-500" />,
      options: [
        { key: 'option1', label: 'Creative Expression', color: 'bg-rose-500' },
        { key: 'option2', label: 'Client Satisfaction', color: 'bg-amber-500' },
        { key: 'option3', label: 'Financial Growth', color: 'bg-emerald-500' }
      ]
    }
  ];

  const getTotalVotes = (pollId: string) => {
    const poll = votes[pollId as keyof typeof votes] as Record<string, number>;
    return Object.values(poll).reduce((sum, count) => sum + count, 0);
  };

  const getPercentage = (pollId: string, option: string) => {
    const total = getTotalVotes(pollId);
    const count = (votes[pollId as keyof typeof votes] as any)[option];
    return total > 0 ? Math.round((count / total) * 100) : 0;
  };

  return (
    <div className="space-y-6 mb-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Community Voice</h3>
        <p className="text-gray-600">Your opinion shapes our future features</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {polls.map((poll, index) => (
          <motion.div
            key={poll.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 border-2 hover:border-purple-200 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                {poll.icon}
                <h4 className="font-semibold text-gray-900">{poll.question}</h4>
              </div>

              <div className="space-y-3">
                {poll.options.map((option) => {
                  const percentage = getPercentage(poll.id, option.key);
                  const hasVoted = userVotes[poll.id];
                  const isSelected = userVotes[poll.id] === option.key;

                  return (
                    <div key={option.key} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">
                          {option.label}
                        </span>
                        <span className="text-xs text-gray-500">{percentage}%</span>
                      </div>
                      
                      <div className="relative">
                        <Progress 
                          value={percentage} 
                          className="h-2"
                        />
                        {!hasVoted && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleVote(poll.id, option.key)}
                            className="absolute inset-0 w-full h-full opacity-0 hover:opacity-10 transition-opacity"
                          >
                            Vote
                          </Button>
                        )}
                        {isSelected && (
                          <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{getTotalVotes(poll.id)} votes</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>Live results</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InteractivePolls;


// COMMUNITY PAGE UPDATE - Interactive polls and voting for community engagement
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  userVoted: boolean;
}

const InteractivePolls = () => {
  const [polls, setPolls] = useState<Poll[]>([
    {
      id: '1',
      question: 'What's your biggest challenge as a beauty professional?',
      options: [
        { id: 'a', text: 'Finding new clients', votes: 156 },
        { id: 'b', text: 'Managing bookings', votes: 203 },
        { id: 'c', text: 'Social media marketing', votes: 89 },
        { id: 'd', text: 'Managing supplies/inventory', votes: 67 }
      ],
      totalVotes: 515,
      userVoted: false
    },
    {
      id: '2',
      question: 'Which AI feature would help you most?',
      options: [
        { id: 'a', text: 'Auto-respond to client messages', votes: 234 },
        { id: 'b', text: 'Smart appointment scheduling', votes: 189 },
        { id: 'c', text: 'Social media post creation', votes: 145 },
        { id: 'd', text: 'Client follow-up automation', votes: 98 }
      ],
      totalVotes: 666,
      userVoted: false
    }
  ]);

  const handleVote = (pollId: string, optionId: string) => {
    setPolls(prevPolls => 
      prevPolls.map(poll => {
        if (poll.id === pollId && !poll.userVoted) {
          const updatedOptions = poll.options.map(option => 
            option.id === optionId 
              ? { ...option, votes: option.votes + 1 }
              : option
          );
          
          toast.success('Vote recorded! Thanks for your input 🗳️');
          
          return {
            ...poll,
            options: updatedOptions,
            totalVotes: poll.totalVotes + 1,
            userVoted: true
          };
        }
        return poll;
      })
    );
  };

  return (
    <div className="space-y-6 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Community Voice 🗳️
        </h3>
        <p className="text-gray-600">
          Help shape EmviApp's future. Your vote matters!
        </p>
      </motion.div>

      {polls.map((poll, index) => (
        <motion.div
          key={poll.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{poll.question}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users className="h-4 w-4" />
                  <span>{poll.totalVotes.toLocaleString()} votes</span>
                  {poll.userVoted && (
                    <span className="text-green-600 font-medium">✓ Voted</span>
                  )}
                </div>
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>

            <div className="space-y-3">
              {poll.options.map((option) => {
                const percentage = poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0;
                
                return (
                  <div key={option.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        {option.text}
                      </span>
                      <span className="text-sm text-gray-500">
                        {option.votes} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    
                    {poll.userVoted ? (
                      <Progress value={percentage} className="h-2" />
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVote(poll.id, option.id)}
                        className="w-full justify-start text-left hover:bg-purple-50 hover:border-purple-300"
                      >
                        Vote for this option
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>

            {poll.userVoted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg"
              >
                <p className="text-sm text-green-700 text-center">
                  🎉 Thanks for voting! Results help us prioritize features.
                </p>
              </motion.div>
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default InteractivePolls;

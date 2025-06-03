
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Lightbulb, Heart, Star, Trophy, Gift, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const CustomerFeedbackCard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { id: 'feature', label: 'Dream Feature', icon: Lightbulb, color: 'bg-yellow-100 text-yellow-700' },
    { id: 'improvement', label: 'Make Better', icon: Star, color: 'bg-blue-100 text-blue-700' },
    { id: 'love', label: 'Love This!', icon: Heart, color: 'bg-pink-100 text-pink-700' },
    { id: 'reward', label: 'Reward Idea', icon: Trophy, color: 'bg-purple-100 text-purple-700' }
  ];

  const handleSubmit = () => {
    if (!selectedCategory || !feedback.trim()) return;
    
    setSubmitted(true);
    toast.success('Your idea earned you 25 credits! 🎉');
    
    // Reset after animation
    setTimeout(() => {
      setSubmitted(false);
      setSelectedCategory(null);
      setFeedback('');
    }, 3000);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-6 text-white text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Gift className="h-12 w-12 mx-auto mb-3" />
        </motion.div>
        <h3 className="text-xl font-bold mb-2">Amazing! +25 Credits! 🎉</h3>
        <p className="text-emerald-100">Your voice shapes EmviApp's future!</p>
        <motion.div
          className="flex justify-center mt-3"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1 }}
        >
          <div className="h-1 bg-emerald-200 rounded-full w-full" />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-purple-500" />
          Shape EmviApp's Future
          <Badge variant="secondary" className="ml-auto bg-amber-100 text-amber-700">
            +25 Credits
          </Badge>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Your ideas drive our roadmap. Every suggestion earns credits!
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-3 text-gray-700">What's on your mind?</p>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  selectedCategory === category.id
                    ? 'border-purple-300 bg-purple-100'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <category.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{category.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedCategory && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="space-y-3"
          >
            <Textarea
              placeholder="Tell us your idea... the crazier, the better! 🚀"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[80px] border-purple-200 focus:border-purple-400"
            />
            <Button
              onClick={handleSubmit}
              disabled={!feedback.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Submit & Earn 25 Credits! ✨
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerFeedbackCard;

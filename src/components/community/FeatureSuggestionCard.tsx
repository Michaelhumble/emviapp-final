
// COMMUNITY PAGE UPDATE - Feature suggestion card for user ideas
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const FeatureSuggestionCard = () => {
  const [suggestion, setSuggestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;

    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Thank you! Your idea has been submitted to our team 🎉');
    setSuggestion('');
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-8"
    >
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
            <Lightbulb className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Got an Idea?</h3>
            <p className="text-sm text-gray-600">Help us build the perfect beauty platform</p>
          </div>
          <Sparkles className="h-5 w-5 text-indigo-500 ml-auto" />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="What feature would make your life easier? Tell us your biggest pain point..."
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            className="border-indigo-200 focus:border-indigo-500 bg-white/50"
            rows={3}
          />
          <Button 
            type="submit" 
            disabled={!suggestion.trim() || isSubmitting}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
          >
            {isSubmitting ? 'Submitting...' : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Idea
              </>
            )}
          </Button>
        </form>
      </Card>
    </motion.div>
  );
};

export default FeatureSuggestionCard;

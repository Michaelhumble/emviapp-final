
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, HelpCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useQuestions } from '@/hooks/useQuestions';
import { toast } from 'sonner';

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuestionModal = ({ isOpen, onClose }: QuestionModalProps) => {
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('General');
  const { addQuestion, isLoading } = useQuestions();

  const categories = [
    'General',
    'Technical',
    'Business',
    'Career',
    'Products',
    'Training'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) {
      toast.error('Please enter a question');
      return;
    }

    const success = await addQuestion(question, category);
    if (success) {
      setQuestion('');
      setCategory('General');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <HelpCircle className="h-5 w-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 font-playfair">
              Ask a Question
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="category" className="text-sm font-medium text-gray-700 mb-2 block">
              Category
            </Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="question" className="text-sm font-medium text-gray-700 mb-2 block">
              Your Question
            </Label>
            <Textarea
              id="question"
              placeholder="What would you like to know? Be specific to get the best answers..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !question.trim()}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isLoading ? (
                'Submitting...'
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Question
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default QuestionModal;

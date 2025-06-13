
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface CommunityQuestion {
  id: string;
  question: string;
  answer?: string;
  status: string;
  category?: string;
  upvotes: number;
  created_at: string;
  updated_at: string;
  answered_at?: string;
  user_id: string;
}

export const useQuestions = () => {
  const [questions, setQuestions] = useState<CommunityQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('community_questions')
        .select('*')
        .eq('status', 'answered')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuestions(data || []);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const askQuestion = async (question: string, category?: string) => {
    if (!user) {
      toast.error('Please sign in to ask questions');
      return false;
    }

    if (!question.trim()) {
      toast.error('Question cannot be empty');
      return false;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('community_questions')
        .insert({
          user_id: user.id,
          question: question.trim(),
          category: category || 'general'
        });

      if (error) throw error;

      toast.success('Question submitted successfully! Our experts will answer it soon.');
      return true;
    } catch (error) {
      console.error('Error submitting question:', error);
      toast.error('Failed to submit question. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const upvoteQuestion = async (questionId: string) => {
    if (!user) {
      toast.error('Please sign in to vote');
      return false;
    }

    try {
      const { error } = await supabase
        .from('community_questions')
        .update({ upvotes: questions.find(q => q.id === questionId)?.upvotes + 1 || 1 })
        .eq('id', questionId);

      if (error) throw error;

      await fetchQuestions(); // Refresh questions
      toast.success('Vote recorded!');
      return true;
    } catch (error) {
      console.error('Error upvoting question:', error);
      toast.error('Failed to record vote. Please try again.');
      return false;
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return {
    questions,
    isLoading,
    askQuestion,
    upvoteQuestion,
    fetchQuestions
  };
};

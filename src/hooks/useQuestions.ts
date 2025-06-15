
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface Question {
  id: string;
  question: string;
  answer?: string;
  category?: string;
  upvotes: number;
  status: string;
  created_at: string;
  updated_at: string;
  user_id?: string;
  answered_by?: string;
  answered_at?: string;
}

export const useQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Fetch questions
  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('community_questions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuestions(data || []);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  // Add a new question
  const addQuestion = async (question: string, category?: string) => {
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
          category: category || 'General'
        });

      if (error) throw error;

      toast.success('Question submitted successfully!');
      await fetchQuestions(); // Refresh questions
      return true;
    } catch (error) {
      console.error('Error adding question:', error);
      toast.error('Failed to submit question. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Upvote a question
  const upvoteQuestion = async (questionId: string) => {
    if (!user) {
      toast.error('Please sign in to vote');
      return;
    }

    try {
      const { error } = await supabase
        .from('community_questions')
        .update({ 
          upvotes: questions.find(q => q.id === questionId)?.upvotes + 1 || 1 
        })
        .eq('id', questionId);

      if (error) throw error;

      // Update local state
      setQuestions(prev => 
        prev.map(q => 
          q.id === questionId 
            ? { ...q, upvotes: q.upvotes + 1 }
            : q
        )
      );

      toast.success('Vote recorded!');
    } catch (error) {
      console.error('Error upvoting question:', error);
      toast.error('Failed to record vote. Please try again.');
    }
  };

  // Set up real-time subscription
  useEffect(() => {
    fetchQuestions();

    const channel = supabase
      .channel('questions-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'community_questions'
        },
        () => {
          fetchQuestions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    questions,
    isLoading,
    addQuestion,
    upvoteQuestion
  };
};

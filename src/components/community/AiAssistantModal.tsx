import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ThumbsUp, ThumbsDown, Flag, Copy, Share, Save, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface AiAssistantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  context?: {
    postText?: string;
    hashtags?: string[];
    category?: string;
  };
  onUseAnswer?: (answer: string) => void;
}

interface AIAnswer {
  primary_answer: string;
  alt1: string;
  alt2: string;
}

const AiAssistantModal = ({ open, onOpenChange, context, onUseAnswer }: AiAssistantModalProps) => {
  const [question, setQuestion] = useState('');
  const [language, setLanguage] = useState<'en' | 'vi'>('en');
  const [answers, setAnswers] = useState<AIAnswer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<Record<string, 'up' | 'down' | null>>({});

  const askAI = async () => {
    if (!question.trim()) {
      toast.error('Please enter a question for the AI');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-beauty-assistant', {
        body: {
          prompt: question,
          language,
          context: context || {},
        },
      });

      if (error) throw error;
      
      setAnswers(data as AIAnswer);
    } catch (error) {
      console.error('AI Assistant error:', error);
      toast.error('Failed to get AI response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = async (answerIndex: number, type: 'up' | 'down' | 'report') => {
    if (type === 'report') {
      toast.success('Answer reported for review');
      return;
    }

    setFeedback(prev => ({
      ...prev,
      [answerIndex]: type
    }));

    toast.success(`Feedback recorded: ${type === 'up' ? 'Helpful' : 'Not helpful'}`);
  };

  const polishAnswer = async (answer: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('ai-polish-post', {
        body: {
          content: answer,
          style: 'elegant',
          language,
          postType: 'response'
        },
      });

      if (error) throw error;

      return data.polishedContent;
    } catch (error) {
      console.error('Polish error:', error);
      toast.error('Failed to polish answer');
      return answer;
    }
  };

  const handleUseAnswer = async (answer: string, shouldPolish = false) => {
    let finalAnswer = answer;
    
    if (shouldPolish) {
      toast.info('Polishing answer...');
      finalAnswer = await polishAnswer(answer);
    }

    if (onUseAnswer) {
      onUseAnswer(finalAnswer);
    }
    
    toast.success('Answer added to your post!');
    onOpenChange(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const contextSummary = context ? [
    context.postText ? `Post: "${context.postText.slice(0, 50)}..."` : null,
    context.hashtags?.length ? `Tags: ${context.hashtags.join(', ')}` : null,
    context.category ? `Category: ${context.category}` : null,
  ].filter(Boolean).join(' • ') : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            AI Beauty Expert
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Context Display */}
          {contextSummary && (
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-purple-700">
                <strong>Context:</strong> {contextSummary}
              </p>
            </div>
          )}

          {/* Language Selector */}
          <div className="flex gap-2">
            <Button
              variant={language === 'en' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('en')}
            >
              English
            </Button>
            <Button
              variant={language === 'vi' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('vi')}
            >
              Tiếng Việt
            </Button>
          </div>

          {/* Question Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {language === 'en' ? 'Ask the AI Beauty Expert' : 'Hỏi chuyên gia làm đẹp AI'}
            </label>
            <Textarea
              placeholder={language === 'en' 
                ? "What nail design would look best with my outfit? How do I fix damaged hair? What's the latest makeup trend?"
                : "Thiết kế nail nào sẽ phù hợp với trang phục của tôi? Làm thế nào để phục hồi tóc hư tổn? Xu hướng trang điểm mới nhất là gì?"
              }
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-20 resize-none"
            />
            <Button
              onClick={askAI}
              disabled={isLoading || !question.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {isLoading ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                  {language === 'en' ? 'AI is thinking...' : 'AI đang suy nghĩ...'}
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Ask AI Expert' : 'Hỏi chuyên gia AI'}
                </>
              )}
            </Button>
          </div>

          {/* AI Answers */}
          {answers && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">
                {language === 'en' ? 'AI Expert Recommendations' : 'Khuyến nghị từ chuyên gia AI'}
              </h3>

              {/* Primary Answer */}
              <div className="space-y-3">
                <AIAnswerCard
                  title={language === 'en' ? '🌟 Primary Recommendation' : '🌟 Khuyến nghị chính'}
                  answer={answers.primary_answer}
                  answerIndex={0}
                  feedback={feedback[0]}
                  onFeedback={handleFeedback}
                  onUse={handleUseAnswer}
                  onCopy={copyToClipboard}
                  language={language}
                />

                <AIAnswerCard
                  title={language === 'en' ? '💎 Alternative Option 1' : '💎 Lựa chọn thay thế 1'}
                  answer={answers.alt1}
                  answerIndex={1}
                  feedback={feedback[1]}
                  onFeedback={handleFeedback}
                  onUse={handleUseAnswer}
                  onCopy={copyToClipboard}
                  language={language}
                />

                <AIAnswerCard
                  title={language === 'en' ? '✨ Alternative Option 2' : '✨ Lựa chọn thay thế 2'}
                  answer={answers.alt2}
                  answerIndex={2}
                  feedback={feedback[2]}
                  onFeedback={handleFeedback}
                  onUse={handleUseAnswer}
                  onCopy={copyToClipboard}
                  language={language}
                />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface AIAnswerCardProps {
  title: string;
  answer: string;
  answerIndex: number;
  feedback: 'up' | 'down' | null;
  onFeedback: (index: number, type: 'up' | 'down' | 'report') => void;
  onUse: (answer: string, shouldPolish?: boolean) => void;
  onCopy: (text: string) => void;
  language: 'en' | 'vi';
}

const AIAnswerCard = ({ title, answer, answerIndex, feedback, onFeedback, onUse, onCopy, language }: AIAnswerCardProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="flex items-center gap-2 mb-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/ai-avatar.png" />
          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
            AI
          </AvatarFallback>
        </Avatar>
        <span className="font-medium text-sm">{title}</span>
      </div>

      <div className="mb-4 p-3 bg-white rounded-lg border border-purple-100">
        <p className="text-gray-800 whitespace-pre-wrap">{answer}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onUse(answer)}
          className="text-purple-600 border-purple-300 hover:bg-purple-50"
        >
          <Share className="h-3 w-3 mr-1" />
          {language === 'en' ? 'Use' : 'Sử dụng'}
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={() => onUse(answer, true)}
          className="text-blue-600 border-blue-300 hover:bg-blue-50"
        >
          <Zap className="h-3 w-3 mr-1" />
          {language === 'en' ? 'Polish & Use' : 'Chỉnh sửa & Sử dụng'}
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={() => onCopy(answer)}
          className="text-gray-600"
        >
          <Copy className="h-3 w-3 mr-1" />
          {language === 'en' ? 'Copy' : 'Sao chép'}
        </Button>

        {/* Feedback Buttons */}
        <div className="flex gap-1 ml-auto">
          <Button
            size="sm"
            variant={feedback === 'up' ? 'default' : 'ghost'}
            onClick={() => onFeedback(answerIndex, 'up')}
            className="h-8 w-8 p-0"
          >
            <ThumbsUp className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant={feedback === 'down' ? 'destructive' : 'ghost'}
            onClick={() => onFeedback(answerIndex, 'down')}
            className="h-8 w-8 p-0"
          >
            <ThumbsDown className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onFeedback(answerIndex, 'report')}
            className="h-8 w-8 p-0 text-red-500"
          >
            <Flag className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AiAssistantModal;
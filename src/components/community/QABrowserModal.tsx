
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { useQuestions } from '@/hooks/useQuestions';
import { Search, ThumbsUp, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface QABrowserModalProps {
  children: React.ReactNode;
}

const QABrowserModal: React.FC<QABrowserModalProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { questions, upvoteQuestion } = useQuestions();

  const filteredQuestions = questions.filter(q => 
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.answer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpvote = async (questionId: string) => {
    await upvoteQuestion(questionId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-purple-500" />
            Browse Community Q&As
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search questions and answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {filteredQuestions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {searchQuery ? 'No questions found matching your search.' : 'No answered questions yet. Be the first to ask!'}
                </div>
              ) : (
                filteredQuestions.map((question) => (
                  <div key={question.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {question.question}
                        </h3>
                        {question.category && (
                          <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mb-2">
                            {question.category}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUpvote(question.id)}
                          className="flex items-center gap-1 text-gray-500 hover:text-blue-500"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          {question.upvotes}
                        </Button>
                      </div>
                    </div>
                    
                    {question.answer && (
                      <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded">
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {question.answer}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex items-center text-xs text-gray-500 gap-2">
                      <Clock className="h-3 w-3" />
                      <span>
                        Asked {formatDistanceToNow(new Date(question.created_at), { addSuffix: true })}
                      </span>
                      {question.answered_at && (
                        <span>
                          • Answered {formatDistanceToNow(new Date(question.answered_at), { addSuffix: true })}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QABrowserModal;

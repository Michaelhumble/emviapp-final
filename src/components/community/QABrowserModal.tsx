
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ThumbsUp, MessageSquare, Clock } from 'lucide-react';
import { useQuestions } from '@/hooks/useQuestions';

interface QABrowserModalProps {
  children: React.ReactNode;
}

const QABrowserModal: React.FC<QABrowserModalProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { questions, upvoteQuestion } = useQuestions();

  const filteredQuestions = questions.filter(q => 
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.answer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            Community Q&A
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search questions and answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No questions found matching your search.</p>
              </div>
            ) : (
              filteredQuestions.map((question) => (
                <div key={question.id} className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      {question.category && (
                        <Badge variant="outline" className="mb-2">
                          {question.category}
                        </Badge>
                      )}
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {question.question}
                      </h4>
                      {question.answer && (
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {question.answer}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => upvoteQuestion(question.id)}
                        className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                      >
                        <ThumbsUp className="h-3 w-3" />
                        {question.upvotes}
                      </button>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTimeAgo(question.created_at)}
                      </div>
                    </div>
                    {question.status === 'answered' && (
                      <Badge className="bg-green-100 text-green-800">
                        Answered
                      </Badge>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QABrowserModal;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface AIPolishButtonProps {
  text: string;
  onPolish: (polishedText: string) => void;
  context?: string;
}

const AIPolishButton: React.FC<AIPolishButtonProps> = ({ 
  text, 
  onPolish,
  context = 'text'
}) => {
  const { t, isVietnamese } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [polishedText, setPolishedText] = useState('');
  
  const handlePolishClick = async () => {
    if (!text.trim()) {
      toast.error(isVietnamese 
        ? 'Vui lòng nhập nội dung trước khi làm bóng.' 
        : 'Please enter content before polishing.');
      return;
    }
    
    setIsOpen(true);
    setIsLoading(true);
    
    try {
      // Simulate AI processing with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Enhanced version of the text (in real implementation, this would be an AI call)
      const improvedText = enhanceText(text, context);
      setPolishedText(improvedText);
    } catch (error) {
      console.error('Error polishing text:', error);
      toast.error(isVietnamese 
        ? 'Đã xảy ra lỗi khi làm bóng nội dung.' 
        : 'An error occurred while polishing your content.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleApply = () => {
    onPolish(polishedText);
    setIsOpen(false);
    toast.success(isVietnamese 
      ? 'Đã áp dụng nội dung được làm bóng!' 
      : 'Polished content applied!');
  };
  
  // Simple enhancement function for demo purposes
  const enhanceText = (originalText: string, textContext: string) => {
    // In a real implementation, this would call an AI service
    let enhancedText = originalText;
    
    // Add some simple improvements based on context
    if (textContext === 'job description') {
      if (!enhancedText.includes('responsibilities')) {
        enhancedText += '\n\nResponsibilities include maintaining high quality standards and providing excellent customer service.';
      }
      
      if (!enhancedText.includes('looking for')) {
        enhancedText = `We are looking for talented and motivated individuals to join our team. ${enhancedText}`;
      }
    }
    
    return enhancedText;
  };
  
  return (
    <>
      <Button 
        type="button" 
        variant="ghost" 
        size="sm" 
        onClick={handlePolishClick}
        className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
      >
        <Sparkles className="h-4 w-4 mr-1" />
        {isVietnamese ? 'Làm bóng bằng AI' : 'Polish with AI'}
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {isVietnamese ? 'Làm bóng nội dung bằng AI' : 'AI Content Polish'}
            </DialogTitle>
            <DialogDescription>
              {isVietnamese 
                ? 'Nội dung được cải thiện bởi AI để tạo ấn tượng chuyên nghiệp hơn.' 
                : 'AI-enhanced content to make a more professional impression.'}
            </DialogDescription>
          </DialogHeader>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500 mb-4" />
              <p>{isVietnamese ? 'AI đang làm bóng nội dung của bạn...' : 'AI is polishing your content...'}</p>
            </div>
          ) : (
            <Textarea 
              value={polishedText} 
              onChange={(e) => setPolishedText(e.target.value)}
              className="min-h-[200px]"
            />
          )}
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              {isVietnamese ? 'Hủy' : 'Cancel'}
            </Button>
            <Button 
              type="button"
              onClick={handleApply}
              disabled={isLoading || !polishedText}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              {isVietnamese ? 'Áp dụng' : 'Apply'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIPolishButton;

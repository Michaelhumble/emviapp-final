
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Check, X } from 'lucide-react';
import { useTranslation } from "@/hooks/useTranslation";

interface AIPolishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (polishedContent: any) => void;
  currentContent: {
    title: string;
    description: string;
    requirements: string[];
    benefits: string[];
  };
}

const AIPolishModal: React.FC<AIPolishModalProps> = ({
  isOpen,
  onClose,
  onApply,
  currentContent
}) => {
  const { t } = useTranslation();
  const [isPolishing, setIsPolishing] = useState(false);
  const [polishedContent, setPolishedContent] = useState<any>(null);
  const [customPrompt, setCustomPrompt] = useState('');

  const handlePolish = async () => {
    setIsPolishing(true);
    
    // Simulate AI polishing with a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock polished content - in reality this would call an AI service
    const polished = {
      title: currentContent.title + " - Enhanced",
      description: currentContent.description + "\n\nThis position offers excellent growth opportunities in a supportive environment.",
      requirements: [
        ...currentContent.requirements,
        "Strong attention to detail and customer service skills"
      ],
      benefits: [
        ...currentContent.benefits,
        "Professional development opportunities",
        "Flexible scheduling options"
      ]
    };
    
    setPolishedContent(polished);
    setIsPolishing(false);
  };

  const handleApplyChanges = () => {
    if (polishedContent) {
      onApply(polishedContent);
      onClose();
    }
  };

  const handleClose = () => {
    setPolishedContent(null);
    setCustomPrompt('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            {t({ english: "AI Polish Your Job Posting", vietnamese: "AI Hoàn Thiện Bài Đăng" })}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Custom Prompt */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t({ english: "Custom Instructions (Optional)", vietnamese: "Hướng Dẫn Tùy Chỉnh" })}
            </label>
            <Textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder={t({ english: "e.g., 'Make it more professional and emphasize growth opportunities'", vietnamese: "VD: 'Làm cho chuyên nghiệp hơn và nhấn mạnh cơ hội phát triển'" })}
              className="min-h-[80px]"
            />
          </div>

          {/* Polish Button */}
          {!polishedContent && (
            <Button 
              onClick={handlePolish} 
              disabled={isPolishing}
              className="w-full"
            >
              {isPolishing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  {t({ english: "Polishing...", vietnamese: "Đang Hoàn Thiện..." })}
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  {t({ english: "Polish with AI", vietnamese: "Hoàn Thiện Với AI" })}
                </>
              )}
            </Button>
          )}

          {/* Results */}
          {polishedContent && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-medium text-green-800 mb-2">
                  {t({ english: "✨ AI Enhanced Version", vietnamese: "✨ Phiên Bản AI Cải Thiện" })}
                </h3>
              </div>

              {/* Title Comparison */}
              <div className="space-y-3">
                <h4 className="font-medium">{t({ english: "Job Title", vietnamese: "Tiêu Đề Việc Làm" })}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">{t({ english: "Original", vietnamese: "Gốc" })}</label>
                    <div className="p-3 bg-gray-50 rounded border">
                      {currentContent.title}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-green-600">{t({ english: "Enhanced", vietnamese: "Cải Thiện" })}</label>
                    <div className="p-3 bg-green-50 rounded border border-green-200">
                      {polishedContent.title}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Comparison */}
              <div className="space-y-3">
                <h4 className="font-medium">{t({ english: "Description", vietnamese: "Mô Tả" })}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">{t({ english: "Original", vietnamese: "Gốc" })}</label>
                    <div className="p-3 bg-gray-50 rounded border max-h-40 overflow-y-auto">
                      {currentContent.description}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-green-600">{t({ english: "Enhanced", vietnamese: "Cải Thiện" })}</label>
                    <div className="p-3 bg-green-50 rounded border border-green-200 max-h-40 overflow-y-auto">
                      {polishedContent.description}
                    </div>
                  </div>
                </div>
              </div>

              {/* Requirements Comparison */}
              <div className="space-y-3">
                <h4 className="font-medium">{t({ english: "Requirements", vietnamese: "Yêu Cầu" })}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">{t({ english: "Original", vietnamese: "Gốc" })}</label>
                    <ul className="space-y-1 p-3 bg-gray-50 rounded border">
                      {currentContent.requirements.map((req, index) => (
                        <li key={index} className="text-sm">• {req}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-green-600">{t({ english: "Enhanced", vietnamese: "Cải Thiện" })}</label>
                    <ul className="space-y-1 p-3 bg-green-50 rounded border border-green-200">
                      {polishedContent.requirements.map((req: string, index: number) => (
                        <li key={index} className="text-sm">• {req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Benefits Comparison */}
              <div className="space-y-3">
                <h4 className="font-medium">{t({ english: "Benefits", vietnamese: "Phúc Lợi" })}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">{t({ english: "Original", vietnamese: "Gốc" })}</label>
                    <ul className="space-y-1 p-3 bg-gray-50 rounded border">
                      {currentContent.benefits.map((benefit, index) => (
                        <li key={index} className="text-sm">• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-green-600">{t({ english: "Enhanced", vietnamese: "Cải Thiện" })}</label>
                    <ul className="space-y-1 p-3 bg-green-50 rounded border border-green-200">
                      {polishedContent.benefits.map((benefit: string, index: number) => (
                        <li key={index} className="text-sm">• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={handleClose}>
                  <X className="h-4 w-4 mr-2" />
                  {t({ english: "Keep Original", vietnamese: "Giữ Nguyên Bản" })}
                </Button>
                <Button onClick={handleApplyChanges} className="bg-green-600 hover:bg-green-700">
                  <Check className="h-4 w-4 mr-2" />
                  {t({ english: "Apply Changes", vietnamese: "Áp Dụng Thay Đổi" })}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIPolishModal;

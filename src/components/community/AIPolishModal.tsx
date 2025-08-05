import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Loader2, RefreshCw, Check, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AIPolishModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  postType: string;
  onApply: (polishedContent: string) => void;
}

const styles = [
  { id: 'casual', label: 'Casual & Friendly', description: 'Conversational and approachable', emoji: '😊' },
  { id: 'professional', label: 'Professional', description: 'Polished and business-like', emoji: '💼' },
  { id: 'inspiring', label: 'Inspiring', description: 'Motivational and uplifting', emoji: '🌟' },
  { id: 'fun', label: 'Fun & Playful', description: 'Energetic and engaging', emoji: '🎉' },
  { id: 'elegant', label: 'Elegant', description: 'Sophisticated and refined', emoji: '✨' },
];

const languages = [
  { id: 'english', label: 'English', flag: '🇺🇸' },
  { id: 'vietnamese', label: 'Tiếng Việt', flag: '🌸' },
];

const AIPolishModal = ({ isOpen, onClose, content, postType, onApply }: AIPolishModalProps) => {
  const [selectedStyle, setSelectedStyle] = useState('casual');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [polishedContent, setPolishedContent] = useState('');
  const [originalContent, setOriginalContent] = useState(content);
  const [isPolishing, setIsPolishing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handlePolish = async () => {
    if (!content.trim()) {
      toast.error('Please add some content first!');
      return;
    }

    setIsPolishing(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-polish-post', {
        body: {
          content: content.trim(),
          style: selectedStyle,
          language: selectedLanguage,
          postType
        }
      });

      if (error) throw error;

      setPolishedContent(data.polishedContent);
      setShowPreview(true);
      toast.success('Content polished successfully! ✨');
    } catch (error) {
      console.error('Error polishing content:', error);
      toast.error('Failed to polish content. Please try again.');
    } finally {
      setIsPolishing(false);
    }
  };

  const handleApply = () => {
    onApply(polishedContent);
    onClose();
    setShowPreview(false);
    setPolishedContent('');
  };

  const handleCancel = () => {
    setShowPreview(false);
    setPolishedContent('');
  };

  const resetAndClose = () => {
    handleCancel();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            AI Polish Your Post
          </DialogTitle>
        </DialogHeader>

        {!showPreview ? (
          <div className="space-y-6">
            {/* Style Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Writing Style</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {styles.map((style) => (
                  <Button
                    key={style.id}
                    variant={selectedStyle === style.id ? "default" : "outline"}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`p-4 h-auto text-left justify-start ${
                      selectedStyle === style.id 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                        : 'hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{style.emoji}</span>
                      <div>
                        <div className="font-medium">{style.label}</div>
                        <div className="text-xs opacity-70">{style.description}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Language Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Language</label>
              <div className="flex gap-3">
                {languages.map((language) => (
                  <Button
                    key={language.id}
                    variant={selectedLanguage === language.id ? "default" : "outline"}
                    onClick={() => setSelectedLanguage(language.id)}
                    className={`flex-1 ${
                      selectedLanguage === language.id 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                        : 'hover:bg-purple-50'
                    }`}
                  >
                    <span className="mr-2">{language.flag}</span>
                    {language.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Original Content Preview */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Your Content</label>
              <div className="p-3 bg-gray-50 rounded-lg border text-sm">
                {content.trim() ? content : 'No content to polish...'}
              </div>
            </div>

            {/* Polish Button */}
            <div className="flex gap-3">
              <Button
                onClick={handlePolish}
                disabled={isPolishing || !content.trim()}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {isPolishing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Polishing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Polish Content
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={resetAndClose}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          /* Preview Results */
          <div className="space-y-6">
            {/* Style & Language Applied */}
            <div className="flex gap-2">
              <Badge className="bg-purple-100 text-purple-700">
                {styles.find(s => s.id === selectedStyle)?.emoji} {styles.find(s => s.id === selectedStyle)?.label}
              </Badge>
              <Badge className="bg-blue-100 text-blue-700">
                {languages.find(l => l.id === selectedLanguage)?.flag} {languages.find(l => l.id === selectedLanguage)?.label}
              </Badge>
            </div>

            {/* Before and After */}
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Original</label>
                <div className="p-3 bg-gray-50 rounded-lg border text-sm">
                  {originalContent}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-green-600 flex items-center gap-1">
                  <Sparkles className="h-4 w-4" />
                  AI Polished
                </label>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200 text-sm">
                  {polishedContent}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleApply}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                <Check className="h-4 w-4 mr-2" />
                Apply Polish
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Keep Original
              </Button>
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Different Style
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AIPolishModal;
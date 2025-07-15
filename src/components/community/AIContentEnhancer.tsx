import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, Check, Wand2, Heart, Laugh, Briefcase, TrendingUp, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AIContentEnhancerProps {
  content: string;
  onSelectContent: (content: string) => void;
  onClose: () => void;
}

const AIContentEnhancer: React.FC<AIContentEnhancerProps> = ({
  content,
  onSelectContent,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{
    type: string;
    content: string;
    icon: any;
    label: string;
    description: string;
  }>>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const enhancementTypes = [
    {
      type: 'funny',
      icon: Laugh,
      label: 'Funnier',
      description: 'Add humor and playful energy',
      prompt: 'Make this funnier and more playful while keeping it professional for the beauty industry'
    },
    {
      type: 'emotional',
      icon: Heart,
      label: 'More Emotional',
      description: 'Increase emotional impact',
      prompt: 'Make this more emotional and heartfelt, perfect for inspiring others in the beauty community'
    },
    {
      type: 'professional',
      icon: Briefcase,
      label: 'Professional',
      description: 'Polish for business use',
      prompt: 'Make this sound more professional and polished for business networking'
    },
    {
      type: 'viral',
      icon: TrendingUp,
      label: 'Viral-Style',
      description: 'Optimize for social sharing',
      prompt: 'Transform this into viral social media content that people will want to share'
    }
  ];

  const generateSuggestions = async () => {
    if (!content.trim()) {
      toast.error('Please enter some content to enhance');
      return;
    }

    setIsLoading(true);
    const newSuggestions = [];

    try {
      for (const type of enhancementTypes) {
        try {
          const { data, error } = await supabase.functions.invoke('ai-polish-post', {
            body: {
              content: content,
              style: type.type,
              language: 'english',
              postType: 'story',
              customPrompt: type.prompt
            }
          });

          if (error) {
            console.error(`Error enhancing content for ${type.type}:`, error);
            // Show user-friendly error for this specific enhancement
            toast.error(`Failed to generate ${type.label.toLowerCase()} version. Trying other styles...`);
            continue;
          }

          if (data?.polishedContent && !data?.error) {
            newSuggestions.push({
              type: type.type,
              content: data.polishedContent,
              icon: type.icon,
              label: type.label,
              description: type.description
            });
          } else if (data?.error) {
            console.error(`AI service error for ${type.type}:`, data.error);
            toast.error(`${type.label}: ${data.error}`);
          }
        } catch (typeError) {
          console.error(`Network error for ${type.type}:`, typeError);
          toast.error(`Network error for ${type.label.toLowerCase()} enhancement`);
        }
      }

      if (newSuggestions.length === 0) {
        toast.error('AI enhancement is temporarily unavailable. Please try again in a moment.');
      } else if (newSuggestions.length < enhancementTypes.length) {
        toast.success(`Generated ${newSuggestions.length} AI suggestions (some failed)`);
      } else {
        toast.success('AI suggestions generated successfully!');
      }

      setSuggestions(newSuggestions);
    } catch (error) {
      console.error('Error generating suggestions:', error);
      toast.error('AI enhancement service is currently unavailable. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (content: string, index: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIndex(index);
      toast.success('Content copied to clipboard!');
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      toast.error('Failed to copy content');
    }
  };

  const selectContent = (content: string) => {
    onSelectContent(content);
    toast.success('Content selected!');
    onClose();
  };

  React.useEffect(() => {
    if (content) {
      generateSuggestions();
    }
  }, [content]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Wand2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">AI Content Enhancer</h2>
              <p className="text-sm text-muted-foreground">Choose your preferred style</p>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Generating AI suggestions...</p>
            </div>
          ) : suggestions.length > 0 ? (
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => {
                const IconComponent = suggestion.icon;
                return (
                  <motion.div
                    key={suggestion.type}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 hover:shadow-lg transition-all duration-300 group">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-foreground">{suggestion.label}</h3>
                            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                              {suggestion.description}
                            </span>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                            {suggestion.content}
                          </p>
                          
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => selectContent(suggestion.content)}
                              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                            >
                              <Sparkles className="w-3 h-3 mr-1" />
                              Use This
                            </Button>
                            
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(suggestion.content, index)}
                              className="relative"
                            >
                              <AnimatePresence mode="wait">
                                {copiedIndex === index ? (
                                  <motion.div
                                    key="check"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="flex items-center gap-1"
                                  >
                                    <Check className="w-3 h-3" />
                                    Copied
                                  </motion.div>
                                ) : (
                                  <motion.div
                                    key="copy"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="flex items-center gap-1"
                                  >
                                    <Copy className="w-3 h-3" />
                                    Copy
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No suggestions generated yet</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-border flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AIContentEnhancer;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Download, Share, Sparkles, Play, Loader2, Camera, Music, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface ViralVideoGeneratorProps {
  imageUrl: string;
  content: string;
  onClose: () => void;
}

const ViralVideoGenerator: React.FC<ViralVideoGeneratorProps> = ({
  imageUrl,
  content,
  onClose,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('celebration');

  const templates = [
    {
      id: 'celebration',
      name: 'Celebration',
      icon: Star,
      description: 'Confetti and sparkles for wins',
      preview: '🎉✨'
    },
    {
      id: 'professional',
      name: 'Professional',
      icon: Camera,
      description: 'Clean and elegant style',
      preview: '💼✨'
    },
    {
      id: 'trending',
      name: 'Trending',
      icon: Music,
      description: 'Upbeat with motion graphics',
      preview: '🔥🎵'
    }
  ];

  const generateVideo = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate video generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // For demo purposes, we'll create a simple animated GIF-like experience
      setGeneratedVideo('demo-video-url');
      toast.success('Viral reel generated successfully!');
    } catch (error) {
      console.error('Error generating video:', error);
      toast.error('Failed to generate video. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const shareToSocial = (platform: string) => {
    const message = `Check out my success story on EmviApp! ${content.slice(0, 100)}...`;
    
    switch (platform) {
      case 'tiktok':
        window.open('https://www.tiktok.com/upload', '_blank');
        break;
      case 'instagram':
        if (navigator.share) {
          navigator.share({
            title: 'My EmviApp Success Story',
            text: message,
            url: window.location.href
          });
        } else {
          window.open('https://www.instagram.com/', '_blank');
        }
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
        break;
      default:
        break;
    }
    
    toast.success(`Opening ${platform} to share your viral reel!`);
  };

  const downloadVideo = () => {
    // In a real implementation, this would download the generated video
    toast.success('Video download started!');
  };

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
        className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Turn into Viral Reel</h2>
              <p className="text-sm text-muted-foreground">Create a branded video from your image</p>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {!generatedVideo ? (
            <>
              {/* Image Preview */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-foreground mb-3">Preview</h3>
                <div className="relative aspect-square w-32 mx-auto rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={imageUrl}
                    alt="Post image"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-2 right-2">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <Play className="w-3 h-3 text-primary" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Template Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-foreground mb-3">Choose Style</h3>
                <div className="grid grid-cols-1 gap-3">
                  {templates.map((template) => {
                    const IconComponent = template.icon;
                    return (
                      <motion.div
                        key={template.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className={`p-4 cursor-pointer transition-all duration-200 ${
                            selectedTemplate === template.id
                              ? 'ring-2 ring-primary bg-primary/5'
                              : 'hover:shadow-md'
                          }`}
                          onClick={() => setSelectedTemplate(template.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                              <IconComponent className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-foreground">{template.name}</h4>
                                <span className="text-lg">{template.preview}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">{template.description}</p>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Generate Button */}
              <Button
                onClick={generateVideo}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating Viral Reel...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Viral Reel
                  </>
                )}
              </Button>
            </>
          ) : (
            /* Generated Video */
            <div className="text-center">
              <div className="mb-6">
                <div className="relative aspect-square w-48 mx-auto rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0] 
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-4xl"
                  >
                    🎬✨
                  </motion.div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
                      <p className="text-xs font-medium text-gray-800">EmviApp Success Story</p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">Your Viral Reel is Ready!</h3>
              <p className="text-sm text-muted-foreground mb-6">Share it on social media to inspire others</p>

              {/* Share Options */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <Button
                  onClick={() => shareToSocial('tiktok')}
                  className="bg-black hover:bg-gray-800 text-white"
                >
                  Share on TikTok
                </Button>
                <Button
                  onClick={() => shareToSocial('instagram')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Share on Instagram
                </Button>
                <Button
                  onClick={() => shareToSocial('facebook')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Share on Facebook
                </Button>
                <Button
                  onClick={downloadVideo}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
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

export default ViralVideoGenerator;
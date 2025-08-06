import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Sparkles, Download, RefreshCw, X, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { isFeatureEnabled } from '@/config/premiumFeatures';

interface AIImageGenerationProps {
  isOpen: boolean;
  onClose: () => void;
  onImageGenerated: (imageUrl: string, prompt: string) => void;
}

const AIImageGeneration: React.FC<AIImageGenerationProps> = ({ 
  isOpen, 
  onClose, 
  onImageGenerated 
}) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState('realistic');

  const beautyPrompts = [
    "Elegant French manicure with gold accents",
    "Sunset ombre nail art with glitter",
    "Natural makeup look with dewy skin",
    "Bold red lips with winged eyeliner",
    "Boho braided hairstyle with flowers",
    "Modern pixie cut with highlights"
  ];

  const styleOptions = [
    { id: 'realistic', name: 'Realistic', description: 'Photo-realistic beauty looks' },
    { id: 'artistic', name: 'Artistic', description: 'Creative and stylized designs' },
    { id: 'minimalist', name: 'Minimalist', description: 'Clean and simple aesthetics' },
    { id: 'glamorous', name: 'Glamorous', description: 'Bold and dramatic styles' }
  ];

  const generateImage = async () => {
    if (!prompt.trim() || !isFeatureEnabled('AI_IMAGE_GEN')) return;
    
    setIsGenerating(true);
    
    // Simulate image generation
    setTimeout(() => {
      // Mock generated image URL
      const mockImageUrl = `https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=512&h=512&fit=crop&crop=center`;
      setGeneratedImage(mockImageUrl);
      setIsGenerating(false);
      onImageGenerated(mockImageUrl, prompt);
    }, 4000);
  };

  const resetGenerator = () => {
    setPrompt('');
    setGeneratedImage(null);
    setIsGenerating(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Palette className="w-5 h-5 mr-2 text-orange-500" />
                AI Image Generation
              </h2>
              <p className="text-gray-600 text-sm">Create custom beauty designs with AI</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Coming Soon Notice */}
          {!isFeatureEnabled('AI_IMAGE_GEN') && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 mb-6"
            >
              <div className="flex items-center mb-2">
                <Wand2 className="w-4 h-4 text-purple-600 mr-2" />
                <span className="font-semibold text-purple-600">Coming Q2 2025!</span>
              </div>
              <p className="text-purple-700 text-sm">
                Generate custom nail art, hairstyles, and makeup looks using AI. Perfect for inspiration and trying new styles!
              </p>
            </motion.div>
          )}

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left: Controls */}
            <div className="space-y-6">
              {/* Style Selection */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Style</h3>
                <div className="grid grid-cols-2 gap-2">
                  {styleOptions.map((style) => (
                    <motion.button
                      key={style.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        selectedStyle === style.id
                          ? 'border-orange-300 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-sm">{style.name}</div>
                      <div className="text-xs text-gray-500">{style.description}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Prompt Input */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Describe Your Vision</h3>
                <div className="space-y-3">
                  <Input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., French manicure with gold accents and tiny diamonds"
                    disabled={!isFeatureEnabled('AI_IMAGE_GEN')}
                    className="min-h-[60px] resize-none"
                  />
                  
                  {/* Quick Prompts */}
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Quick ideas:</p>
                    <div className="flex flex-wrap gap-2">
                      {beautyPrompts.slice(0, 3).map((quickPrompt, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="cursor-pointer hover:bg-orange-50 hover:border-orange-300 text-xs"
                          onClick={() => setPrompt(quickPrompt)}
                        >
                          {quickPrompt}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <Button
                onClick={generateImage}
                disabled={!prompt.trim() || isGenerating || !isFeatureEnabled('AI_IMAGE_GEN')}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
              >
                {isGenerating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Generating Magic...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Image
                  </>
                )}
              </Button>
            </div>

            {/* Right: Preview */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Preview</h3>
              <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden relative">
                {!generatedImage && !isGenerating && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <Palette className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm">Your generated image will appear here</p>
                    </div>
                  </div>
                )}
                
                {isGenerating && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-50 to-pink-50">
                    <div className="text-center">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-16 h-16 mx-auto mb-4"
                      >
                        <Sparkles className="w-full h-full text-orange-500" />
                      </motion.div>
                      <p className="text-sm text-gray-600 font-medium">Creating your vision...</p>
                    </div>
                  </div>
                )}
                
                {generatedImage && (
                  <motion.img
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    src={generatedImage}
                    alt="Generated beauty design"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {generatedImage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex space-x-2 mt-4"
                >
                  <Button variant="outline" className="flex-1" onClick={generateImage}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="font-semibold text-gray-800 mb-3">What you can create:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="flex items-center text-gray-600">
                <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
                Nail art designs
              </div>
              <div className="flex items-center text-gray-600">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                Hairstyle concepts
              </div>
              <div className="flex items-center text-gray-600">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                Makeup looks
              </div>
              <div className="flex items-center text-gray-600">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Color palettes
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIImageGeneration;
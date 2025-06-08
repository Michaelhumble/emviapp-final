
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Share2, 
  Instagram, 
  Download, 
  Copy, 
  Sparkles, 
  TrendingUp,
  Heart,
  Camera,
  Star
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';

const ArtistViralSuccessCard = () => {
  const { userProfile } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('success');

  const templates = [
    {
      id: 'success',
      name: 'Success Story',
      gradient: 'from-purple-600 to-pink-600',
      emoji: '🚀'
    },
    {
      id: 'milestone',
      name: 'Milestone',
      gradient: 'from-green-500 to-teal-600', 
      emoji: '🏆'
    },
    {
      id: 'growth',
      name: 'Growth',
      gradient: 'from-orange-500 to-red-600',
      emoji: '📈'
    }
  ];

  const generateShareableCard = async () => {
    setIsGenerating(true);
    
    // Simulate card generation
    setTimeout(() => {
      setIsGenerating(false);
      toast.success('🎨 Success card ready! Share it to inspire others!');
    }, 2000);
  };

  const handleShare = (platform: 'instagram' | 'general') => {
    const shareText = `Just hit a new milestone on EmviApp! 💅✨ Growing my beauty business one client at a time. Join me: emviapp.com #EmviApp #BeautyBusiness #ArtistLife`;
    
    if (platform === 'instagram') {
      // Copy text for Instagram
      navigator.clipboard.writeText(shareText);
      toast.success('📱 Caption copied! Paste it in your Instagram story!');
    } else {
      if (navigator.share) {
        navigator.share({
          title: 'My EmviApp Success Story',
          text: shareText,
          url: 'https://emviapp.com'
        });
      } else {
        navigator.clipboard.writeText(shareText);
        toast.success('📋 Share text copied to clipboard!');
      }
    }
  };

  return (
    <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Camera className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Viral Success Cards</h3>
              <p className="text-sm text-gray-600">Share your achievements & inspire others</p>
            </div>
          </div>
          
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
            <Sparkles className="h-3 w-3 mr-1" />
            New Feature
          </Badge>
        </div>

        {/* Template Selection */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {templates.map((template) => (
            <motion.button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`p-3 rounded-xl border-2 transition-all ${
                selectedTemplate === template.id 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200 hover:border-purple-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-full h-16 rounded-lg bg-gradient-to-r ${template.gradient} flex items-center justify-center text-2xl mb-2`}>
                {template.emoji}
              </div>
              <p className="text-xs font-medium text-center">{template.name}</p>
            </motion.button>
          ))}
        </div>

        {/* Preview Card */}
        <motion.div 
          className={`w-full h-32 rounded-xl bg-gradient-to-r ${
            templates.find(t => t.id === selectedTemplate)?.gradient
          } p-4 text-white relative overflow-hidden mb-4`}
          key={selectedTemplate}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-medium">{userProfile?.full_name || 'Your Name'}</span>
            </div>
            <h4 className="font-bold text-lg">Growing My Beauty Empire!</h4>
            <p className="text-xs opacity-90">Join me on EmviApp ✨</p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={generateShareableCard}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            {isGenerating ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mr-2"
              >
                <Sparkles className="h-4 w-4" />
              </motion.div>
            ) : (
              <Camera className="h-4 w-4 mr-2" />
            )}
            {isGenerating ? 'Creating Magic...' : 'Generate Success Card'}
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              onClick={() => handleShare('instagram')}
              className="flex items-center gap-2"
            >
              <Instagram className="h-4 w-4" />
              Instagram Story
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => handleShare('general')}
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share Link
            </Button>
          </div>
        </div>

        {/* Social Proof */}
        <motion.div 
          className="mt-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Viral Impact</span>
          </div>
          <p className="text-xs text-green-600">
            Artists who share success cards get <strong>3x more profile views</strong> and attract more clients! 🔥
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ArtistViralSuccessCard;

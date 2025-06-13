
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, Trophy, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCommunityStories } from '@/hooks/useCommunityStories';
import { toast } from 'sonner';

const PremiumHeroSection = () => {
  const { addStory, isAuthenticated } = useCommunityStories();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [storyContent, setStoryContent] = useState('');
  const [storyImage, setStoryImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleShareStory = async () => {
    if (!storyContent.trim()) {
      toast.error('Please write your story');
      return;
    }

    if (!isAuthenticated) {
      toast.error('Please sign in to share your story');
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await addStory(storyContent.trim(), storyImage.trim() || undefined);
      if (success) {
        setStoryContent('');
        setStoryImage('');
        setIsShareModalOpen(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleJoinCommunity = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to join our community');
      return;
    }
    toast.success('Welcome to our inspiring community! 🎉');
    setIsJoinModalOpen(false);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 text-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-20 w-16 h-16 bg-pink-400 rounded-full opacity-20"
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-400 rounded-full opacity-20"
          animate={{ 
            x: [0, 20, 0],
            rotate: [0, -180, -360]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-yellow-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                Beauty Community
              </span>
              <Sparkles className="h-8 w-8 text-yellow-400" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Where Beauty 
              <span className="block bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Dreams Come True
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-purple-100 mb-8 leading-relaxed">
              Join thousands of beauty professionals sharing their success stories, 
              tips, and inspiration in our thriving community.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400/20 rounded-full mb-4">
                <Users className="h-8 w-8 text-yellow-400" />
              </div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">50K+</div>
              <div className="text-purple-200">Active Members</div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-400/20 rounded-full mb-4">
                <Trophy className="h-8 w-8 text-pink-400" />
              </div>
              <div className="text-3xl font-bold text-pink-400 mb-2">1000+</div>
              <div className="text-purple-200">Success Stories</div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-400/20 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-purple-400 mb-2">95%</div>
              <div className="text-purple-200">Growth Rate</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Dialog open={isJoinModalOpen} onOpenChange={setIsJoinModalOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-black font-bold px-8 py-4 rounded-full text-lg shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Join Our Inspiring Community
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Welcome to Our Community! 🎉
                  </DialogTitle>
                </DialogHeader>
                <div className="text-center py-6">
                  <div className="text-6xl mb-4">✨</div>
                  <p className="text-gray-600 mb-6">
                    You're about to join an amazing community of beauty professionals who support and inspire each other every day!
                  </p>
                  <Button
                    onClick={handleJoinCommunity}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-semibold"
                  >
                    Join Now
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-purple-900 font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Share Your Story
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Share Your Beauty Journey ✨
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="story-content" className="text-base font-medium">Your Story</Label>
                    <Textarea
                      id="story-content"
                      placeholder="Tell us about your beauty journey, a transformation you're proud of, or inspire others with your experience..."
                      value={storyContent}
                      onChange={(e) => setStoryContent(e.target.value)}
                      rows={6}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="story-image" className="text-base font-medium">Image URL (Optional)</Label>
                    <Input
                      id="story-image"
                      placeholder="https://example.com/your-image.jpg"
                      value={storyImage}
                      onChange={(e) => setStoryImage(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleShareStory}
                      disabled={isSubmitting || !storyContent.trim()}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
                    >
                      {isSubmitting ? 'Sharing...' : 'Share Story'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsShareModalOpen(false)}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PremiumHeroSection;

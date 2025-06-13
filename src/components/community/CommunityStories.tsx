
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Send, Camera, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
}

interface Story {
  id: string;
  author: string;
  avatar: string;
  content: string;
  image: string;
  likes: number;
  comments: Comment[];
  shares: number;
  timestamp: string;
}

const CommunityStories = () => {
  const [stories, setStories] = useState<Story[]>([
    {
      id: '1',
      author: 'Maria Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face',
      content: 'Just finished this amazing bridal look! The bride was glowing and so happy with her transformation. This is why I love being a makeup artist - creating confidence and joy! ✨',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop',
      likes: 127,
      comments: [
        {
          id: 'c1',
          author: 'Sarah Kim',
          content: 'Absolutely stunning work! The highlight is perfect.',
          timestamp: '2h ago',
          likes: 12
        },
        {
          id: 'c2',
          author: 'Jessica Chen',
          content: 'Love this natural glam look! Tutorial please? 😍',
          timestamp: '1h ago',
          likes: 8
        }
      ],
      shares: 23,
      timestamp: '3 hours ago'
    },
    {
      id: '2',
      author: 'David Thompson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      content: 'Color transformation complete! From damaged to vibrant healthy hair. Patience and technique make all the difference. Never rush the process! 🎨',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=400&fit=crop',
      likes: 89,
      comments: [
        {
          id: 'c3',
          author: 'Emma Wilson',
          content: 'Amazing transformation! How many sessions did this take?',
          timestamp: '30m ago',
          likes: 5
        }
      ],
      shares: 15,
      timestamp: '5 hours ago'
    }
  ]);

  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set());
  const [showShareStoryModal, setShowShareStoryModal] = useState(false);
  const [newStory, setNewStory] = useState({ content: '', image: null as File | null });

  const handleLike = (storyId: string) => {
    setStories(prev => prev.map(story => {
      if (story.id === storyId) {
        const isLiked = likedStories.has(storyId);
        const newLikes = isLiked ? story.likes - 1 : story.likes + 1;
        
        if (isLiked) {
          setLikedStories(prev => {
            const newSet = new Set(prev);
            newSet.delete(storyId);
            return newSet;
          });
        } else {
          setLikedStories(prev => new Set(prev).add(storyId));
        }
        
        return { ...story, likes: newLikes };
      }
      return story;
    }));
  };

  const handleComment = (storyId: string) => {
    const commentText = newComment[storyId]?.trim();
    if (!commentText) return;

    const comment: Comment = {
      id: `c${Date.now()}`,
      author: 'You',
      content: commentText,
      timestamp: 'now',
      likes: 0
    };

    setStories(prev => prev.map(story => 
      story.id === storyId 
        ? { ...story, comments: [...story.comments, comment] }
        : story
    ));

    setNewComment(prev => ({ ...prev, [storyId]: '' }));
  };

  const handleShare = (storyId: string) => {
    // Simulate sharing functionality
    setStories(prev => prev.map(story => 
      story.id === storyId 
        ? { ...story, shares: story.shares + 1 }
        : story
    ));
    
    // Show success message (you could implement a toast here)
    alert('Story shared successfully!');
  };

  const handleShareYourStory = () => {
    setShowShareStoryModal(true);
  };

  const handleSubmitStory = () => {
    if (!newStory.content.trim()) return;

    const story: Story = {
      id: `s${Date.now()}`,
      author: 'You',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
      content: newStory.content,
      image: newStory.image ? URL.createObjectURL(newStory.image) : 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop',
      likes: 0,
      comments: [],
      shares: 0,
      timestamp: 'now'
    };

    setStories(prev => [story, ...prev]);
    setNewStory({ content: '', image: null });
    setShowShareStoryModal(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setNewStory(prev => ({ ...prev, image: file }));
    }
  };

  return (
    <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Community Stories
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Share your journey, inspire others, and celebrate success together
          </p>
          
          <Dialog open={showShareStoryModal} onOpenChange={setShowShareStoryModal}>
            <DialogTrigger asChild>
              <Button 
                onClick={handleShareYourStory}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300"
              >
                Share Your Story
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Share Your Beauty Story</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  placeholder="Share your inspiring beauty journey..."
                  value={newStory.content}
                  onChange={(e) => setNewStory(prev => ({ ...prev, content: e.target.value }))}
                  rows={4}
                />
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Camera className="h-5 w-5" />
                    <span>Add Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {newStory.image && (
                    <span className="text-sm text-green-600">Photo selected</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleSubmitStory}
                    disabled={!newStory.content.trim()}
                    className="flex-1"
                  >
                    Share Story
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowShareStoryModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Story Header */}
              <div className="p-4 flex items-center gap-3">
                <img
                  src={story.avatar}
                  alt={story.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{story.author}</h3>
                  <p className="text-sm text-gray-500">{story.timestamp}</p>
                </div>
              </div>

              {/* Story Content */}
              <div className="px-4 pb-4">
                <p className="text-gray-800 mb-4">{story.content}</p>
                <img
                  src={story.image}
                  alt="Story"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              {/* Engagement Actions */}
              <div className="px-4 py-3 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={() => handleLike(story.id)}
                    className={`flex items-center gap-2 transition-colors ${
                      likedStories.has(story.id) ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${likedStories.has(story.id) ? 'fill-current' : ''}`} />
                    <span className="font-medium">{story.likes}</span>
                  </button>
                  
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-medium">{story.comments.length}</span>
                  </button>
                  
                  <button
                    onClick={() => handleShare(story.id)}
                    className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors"
                  >
                    <Share2 className="h-5 w-5" />
                    <span className="font-medium">{story.shares}</span>
                  </button>
                </div>

                {/* Comments Section */}
                <div className="space-y-2">
                  {story.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                  ))}
                  
                  {/* Add Comment */}
                  <div className="flex gap-2 mt-3">
                    <Input
                      placeholder="Add a comment..."
                      value={newComment[story.id] || ''}
                      onChange={(e) => setNewComment(prev => ({ ...prev, [story.id]: e.target.value }))}
                      onKeyPress={(e) => e.key === 'Enter' && handleComment(story.id)}
                      className="flex-1 text-sm"
                    />
                    <Button
                      onClick={() => handleComment(story.id)}
                      disabled={!newComment[story.id]?.trim()}
                      size="sm"
                      className="px-3"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityStories;

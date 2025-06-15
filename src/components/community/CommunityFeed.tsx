
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Send, Heart, MessageCircle, Share2, MoreHorizontal, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { useAuth } from '@/context/auth';
import CommunityPostingRestriction from './CommunityPostingRestriction';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    verified: boolean;
  };
  content: string;
  images?: string[];
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  community: string;
  helpTag?: string;
}

const CommunityFeed = () => {
  const { user } = useAuth();
  const [newPost, setNewPost] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const posts: Post[] = [
    {
      id: '1',
      author: {
        name: 'Maria Santos',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c11c?q=80&w=100&auto=format&fit=crop',
        role: 'Master Nail Artist',
        verified: true
      },
      content: 'Just finished this incredible butterfly nail art for my client\'s wedding! The details took 3 hours but seeing her face light up made every minute worth it. This is why I love what we do! ✨🦋 #NailArt #WeddingNails #PassionProject',
      images: [
        'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=400&auto=format&fit=crop'
      ],
      timestamp: '2h ago',
      likes: 247,
      comments: 34,
      shares: 12,
      isLiked: false,
      community: 'Nail Artists United'
    },
    {
      id: '2',
      author: {
        name: 'Alex Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop',
        role: 'Color Specialist',
        verified: true
      },
      content: 'Need advice from fellow colorists! Working with a client who wants to go from black to platinum blonde in one session. I\'ve explained the process, but she\'s insistent. How do you handle situations like this while maintaining hair integrity? 🤔',
      timestamp: '4h ago',
      likes: 89,
      comments: 67,
      shares: 8,
      isLiked: true,
      community: 'Hair Colorists Elite',
      helpTag: 'Need Advice'
    },
    {
      id: '3',
      author: {
        name: 'Sophia Kim',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
        role: 'Makeup Artist',
        verified: false
      },
      content: 'HUGE milestone! Just booked my first celebrity client through connections I made in this community! 🎉 Thank you to everyone who believed in me and shared opportunities. This is proof that supporting each other really works! 💫',
      images: [
        'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=400&auto=format&fit=crop'
      ],
      timestamp: '6h ago',
      likes: 312,
      comments: 58,
      shares: 23,
      isLiked: false,
      community: 'Makeup Masters NYC'
    }
  ];

  const handlePostSubmit = () => {
    if (!newPost.trim()) return;
    
    // Handle post submission logic here
    console.log('New post:', newPost);
    console.log('Selected images:', selectedImages);
    
    // Reset form
    setNewPost('');
    setSelectedImages([]);
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages(prev => [...prev, ...files].slice(0, 4)); // Max 4 images
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Community
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {" "}Stories
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600"
            >
              Share your journey, get inspired, and support each other
            </motion.p>
          </div>

          {/* Community Guidelines */}
          <CommunityPostingRestriction />

          {/* Post Creation */}
          {user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-lg p-6 mb-8 border border-gray-100"
            >
              <div className="flex gap-4">
                <img
                  src={user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1494790108755-2616b332c11c?q=80&w=100&auto=format&fit=crop'}
                  alt="Your avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <Textarea
                    placeholder="Share your beauty journey, transformation, or inspiring moment..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[100px] border-0 resize-none focus:ring-0 text-lg placeholder:text-gray-400"
                  />
                  
                  {/* Image Preview */}
                  {selectedImages.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {selectedImages.map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => setSelectedImages(prev => prev.filter((_, i) => i !== index))}
                            className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageSelect}
                          className="hidden"
                        />
                        <div className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                          <Camera className="h-5 w-5" />
                          <span className="text-sm font-medium">Add Photos</span>
                        </div>
                      </label>
                      <span className="text-xs text-gray-500">
                        Share inspiring content only
                      </span>
                    </div>
                    
                    <Button
                      onClick={handlePostSubmit}
                      disabled={!newPost.trim()}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Share Story
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Posts Feed */}
          <div className="space-y-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
              >
                {/* Post Header */}
                <div className="p-6 pb-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                          {post.author.verified && (
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                          {post.helpTag && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                              {post.helpTag}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {post.author.role} • {post.community} • {post.timestamp}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Post Content */}
                <div className="px-6 pb-4">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {post.content}
                  </p>
                </div>

                {/* Post Images */}
                {post.images && post.images.length > 0 && (
                  <div className={`px-6 pb-4 ${post.images.length === 1 ? '' : 'grid grid-cols-2 gap-2'}`}>
                    {post.images.map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={image}
                        alt={`Post image ${imgIndex + 1}`}
                        className="w-full h-64 object-cover rounded-2xl"
                      />
                    ))}
                  </div>
                )}

                {/* Post Actions */}
                <div className="px-6 py-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <button 
                        className={`flex items-center gap-2 transition-colors ${
                          post.isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                        <span className="font-medium">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                        <MessageCircle className="h-5 w-5" />
                        <span className="font-medium">{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
                        <Share2 className="h-5 w-5" />
                        <span className="font-medium">{post.shares}</span>
                      </button>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-800">
                      <Sparkles className="h-4 w-4 mr-1" />
                      Inspire
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              Load More Stories
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityFeed;

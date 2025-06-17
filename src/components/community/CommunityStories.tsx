
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import CommunityPostingRestriction from './CommunityPostingRestriction';
import CommunityStoryForm from './CommunityStoryForm';
import { useCommunityStories } from '@/hooks/useCommunityStories';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

const CommunityStories = () => {
  const { stories, isLoading } = useCommunityStories();

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-dashed border-purple-200"
    >
      <div className="mb-6">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          No Stories Yet
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Be the first to share your beauty journey and inspire others in our community!
        </p>
      </div>
      <Button 
        onClick={() => document.getElementById('story-form')?.scrollIntoView({ behavior: 'smooth' })}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
      >
        Share Your Story First! ✨
      </Button>
    </motion.div>
  );

  const StoryLoadingSkeleton = () => (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div>
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-20 w-full mb-4" />
          <div className="flex items-center gap-6">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-purple-50 to-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Community Stories
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Share your beauty journey and connect with fellow professionals through inspiring stories
          </p>
          {/* 
            ALL COMMUNITY STORIES AND IMAGES FROM NOW ON MUST BE AUTHENTIC, REAL-USER CONTENT
            TO MAXIMIZE TRUST AND ENGAGEMENT. NO MORE HARDCODED DEMO CONTENT.
          */}
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Community Guidelines */}
          <CommunityPostingRestriction />
          
          {/* Story Form */}
          <div id="story-form">
            <CommunityStoryForm />
          </div>

          {/* Stories Feed - Only Real User Content */}
          <div className="space-y-6">
            {isLoading ? (
              <StoryLoadingSkeleton />
            ) : stories.length === 0 ? (
              <EmptyState />
            ) : (
              stories.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-lg font-bold">
                      {story.user?.full_name ? story.user.full_name.charAt(0) : '👤'}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {story.user?.full_name || 'Beauty Professional'}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {formatTimeAgo(story.created_at)}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-800 mb-4 leading-relaxed whitespace-pre-wrap">
                    {story.content}
                  </p>
                  
                  {story.image_url && (
                    <div className="mb-4">
                      <img 
                        src={story.image_url} 
                        alt="Community story"
                        className="w-full rounded-lg shadow-sm max-h-96 object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                      {story.likes}
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      0
                    </button>
                    <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityStories;

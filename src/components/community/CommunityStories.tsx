
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MessageCircle, Share2, User } from 'lucide-react';
import { useCommunityStories } from '@/hooks/useCommunityStories';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

// All Community Stories and images from now on must be authentic, real-user content to maximize trust and engagement.

const CommunityStories = () => {
  const { stories, isLoading } = useCommunityStories();

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <Skeleton className="h-48 w-full rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stories || stories.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
              <MessageCircle className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Be the first to share your story!
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Share your beauty journey, transformation, or inspiring moment with the community.
              </p>
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
              Share Your Story
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {stories.map((story) => (
        <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            {/* User Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                {story.users?.avatar_url ? (
                  <img 
                    src={story.users.avatar_url} 
                    alt="User avatar" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="h-5 w-5 text-white" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {story.users?.full_name || 'Community Member'}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(story.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Story Content */}
            <div className="mb-4">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {story.content}
              </p>
            </div>

            {/* Story Image */}
            {story.image_url && (
              <div className="mb-4">
                <img
                  src={story.image_url}
                  alt="Story image"
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    console.error('Failed to load image:', story.image_url);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Engagement Actions */}
            <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
              <button className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors">
                <Heart className="h-4 w-4" />
                <span className="text-sm">{story.likes || 0}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">Comment</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                <Share2 className="h-4 w-4" />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CommunityStories;

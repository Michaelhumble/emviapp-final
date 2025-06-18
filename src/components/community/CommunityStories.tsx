
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MessageCircle, Share2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCommunityStories } from '@/hooks/useCommunityStories';
import CommunityStoryForm from './CommunityStoryForm';
import { formatDistanceToNow } from 'date-fns';

const CommunityStories = () => {
  const { stories, isLoading } = useCommunityStories();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <CommunityStoryForm />
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-gray-500 mt-2">Loading stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CommunityStoryForm />
      
      <div className="space-y-4">
        {stories.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-400 mb-4">
                <MessageCircle className="h-16 w-16 mx-auto mb-4" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No stories yet
              </h3>
              <p className="text-gray-500">
                Be the first to share your beauty journey with the community!
              </p>
            </CardContent>
          </Card>
        ) : (
          stories.map((story) => (
            <Card key={story.id} className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-gray-900">
                        Community Member
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(story.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    
                    <p className="text-gray-800 mb-4 whitespace-pre-wrap">
                      {story.content}
                    </p>
                    
                    {story.image_url && (
                      <div className="mb-4">
                        <img
                          src={story.image_url}
                          alt="Story image"
                          className="max-w-full h-auto rounded-lg border border-gray-200"
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
                        <Heart className="h-4 w-4 mr-1" />
                        {story.likes}
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Comment
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-500">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CommunityStories;

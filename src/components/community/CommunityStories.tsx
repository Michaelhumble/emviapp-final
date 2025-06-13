import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Clock, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCommunityStories } from '@/hooks/useCommunityStories';
import { formatDistanceToNow } from 'date-fns';

const CommunityStories = () => {
  const { stories, comments, loading, addComment, likeStory, isAuthenticated } = useCommunityStories();
  const [newComments, setNewComments] = useState<{ [storyId: string]: string }>({});
  const [showComments, setShowComments] = useState<{ [storyId: string]: boolean }>({});

  const handleAddComment = async (storyId: string) => {
    const content = newComments[storyId]?.trim();
    if (!content) return;

    const success = await addComment(storyId, content);
    if (success) {
      setNewComments(prev => ({ ...prev, [storyId]: '' }));
    }
  };

  const handleLike = async (storyId: string) => {
    await likeStory(storyId);
  };

  const toggleComments = (storyId: string) => {
    setShowComments(prev => ({ ...prev, [storyId]: !prev[storyId] }));
  };

  if (loading) {
    return (
      <div className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Community Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-32 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            ✨ Community Stories
          </h2>
          <p className="text-gray-600 text-lg">
            Real stories from our amazing beauty community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  {/* Story Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{story.user_name}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(story.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>

                  {/* Story Content */}
                  <p className="text-gray-800 mb-4 leading-relaxed">{story.content}</p>

                  {/* Story Image */}
                  {story.image_url && (
                    <div className="mb-4 rounded-xl overflow-hidden">
                      <img 
                        src={story.image_url} 
                        alt="Story image"
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* Story Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(story.id)}
                        disabled={!isAuthenticated}
                        className="text-gray-600 hover:text-red-500 transition-colors"
                      >
                        <Heart className="h-4 w-4 mr-1" />
                        {story.likes}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleComments(story.id)}
                        className="text-gray-600 hover:text-blue-500 transition-colors"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {comments[story.id]?.length || 0}
                      </Button>
                    </div>
                  </div>

                  {/* Comments Section */}
                  {showComments[story.id] && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      {/* Existing Comments */}
                      {comments[story.id]?.map((comment) => (
                        <div key={comment.id} className="mb-3 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm text-gray-900">{comment.user_name}</span>
                            <span className="text-xs text-gray-500">
                              {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                            </span>
                          </div>
                          <p className="text-sm text-gray-800">{comment.content}</p>
                        </div>
                      ))}

                      {/* Add Comment */}
                      {isAuthenticated ? (
                        <div className="flex gap-2 mt-3">
                          <Input
                            placeholder="Add a comment..."
                            value={newComments[story.id] || ''}
                            onChange={(e) => setNewComments(prev => ({ 
                              ...prev, 
                              [story.id]: e.target.value 
                            }))}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleAddComment(story.id);
                              }
                            }}
                            className="flex-1"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleAddComment(story.id)}
                            disabled={!newComments[story.id]?.trim()}
                          >
                            Post
                          </Button>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 text-center mt-3">
                          Please sign in to add comments
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {stories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No stories yet</h3>
            <p className="text-gray-600">Be the first to share your beauty journey!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityStories;

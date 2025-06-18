
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Share2, User, Edit, Trash2, Save, X } from 'lucide-react';
import { useCommunityStories } from '@/hooks/useCommunityStories';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/auth';

// All Community Stories and images from now on must be authentic, real-user content to maximize trust and engagement.

const CommunityStories = () => {
  const { stories, isLoading, updateStory, deleteStory } = useCommunityStories();
  const { user } = useAuth();
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleEditStart = (storyId: string, currentContent: string) => {
    setEditingStoryId(storyId);
    setEditContent(currentContent);
  };

  const handleEditSave = async (storyId: string) => {
    if (editContent.trim()) {
      const success = await updateStory(storyId, editContent);
      if (success) {
        setEditingStoryId(null);
        setEditContent('');
      }
    }
  };

  const handleEditCancel = () => {
    setEditingStoryId(null);
    setEditContent('');
  };

  const handleDelete = async (storyId: string) => {
    if (window.confirm('Are you sure you want to delete this story? This action cannot be undone.')) {
      await deleteStory(storyId);
    }
  };

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
      {stories.map((story) => {
        const isOwnStory = user?.id === story.user_id;
        const isEditing = editingStoryId === story.id;

        return (
          <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              {/* User Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
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

                {/* Edit/Delete buttons for own stories */}
                {isOwnStory && !isEditing && (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditStart(story.id, story.content)}
                      className="text-gray-500 hover:text-blue-600"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(story.id)}
                      className="text-gray-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {/* Save/Cancel buttons when editing */}
                {isOwnStory && isEditing && (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditSave(story.id)}
                      className="text-gray-500 hover:text-green-600"
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleEditCancel}
                      className="text-gray-500 hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Story Content */}
              <div className="mb-4">
                {isEditing ? (
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="min-h-[100px] resize-none border-gray-300 focus:border-purple-500"
                    placeholder="Edit your story..."
                  />
                ) : (
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {story.content}
                  </p>
                )}
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
              {!isEditing && (
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
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CommunityStories;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Edit, Trash2, Save, X } from 'lucide-react';
import { useCommunityStories } from '@/hooks/useCommunityStories';
import { useAuth } from '@/context/auth';
import CommunityStoryForm from './CommunityStoryForm';
import { formatDistanceToNow } from 'date-fns';

const CommunityStories = () => {
  const { 
    stories, 
    updateStory, 
    deleteStory, 
    editingStory, 
    editContent, 
    setEditContent, 
    startEditing, 
    cancelEditing 
  } = useCommunityStories();
  const { user } = useAuth();

  const handleSaveEdit = async (storyId: string) => {
    const success = await updateStory(storyId, editContent);
    if (success) {
      // Editing state is cleared in the updateStory function
    }
  };

  const handleDelete = async (storyId: string) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      await deleteStory(storyId);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return 'some time ago';
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Story Form - Always visible for authenticated users */}
      <CommunityStoryForm />
      
      {/* Stories Feed */}
      <div className="space-y-4">
        {stories.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500 mb-4">No stories yet. Be the first to share!</p>
            </CardContent>
          </Card>
        ) : (
          stories.map((story) => (
            <Card key={story.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  {/* User Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {story.user?.full_name ? story.user.full_name.charAt(0).toUpperCase() : '?'}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    {/* User Name and Time */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-gray-900">
                          {story.user?.full_name || 'Anonymous User'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatTimeAgo(story.created_at)}
                        </p>
                      </div>
                      
                      {/* Edit/Delete buttons for story owner */}
                      {user && story.user_id === user.id && (
                        <div className="flex items-center space-x-2">
                          {editingStory === story.id ? (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleSaveEdit(story.id)}
                                className="h-8 px-3"
                              >
                                <Save className="h-3 w-3 mr-1" />
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={cancelEditing}
                                className="h-8 px-3"
                              >
                                <X className="h-3 w-3 mr-1" />
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => startEditing(story.id, story.content)}
                                className="h-8 px-3 text-gray-600 hover:text-gray-900"
                              >
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDelete(story.id)}
                                className="h-8 px-3 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3 mr-1" />
                                Delete
                              </Button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Story Content */}
                    <div className="mb-4">
                      {editingStory === story.id ? (
                        <Textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="min-h-[100px] resize-none"
                          placeholder="Edit your story..."
                        />
                      ) : (
                        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
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
                          className="w-full max-w-md rounded-lg object-cover"
                          style={{ maxHeight: '400px' }}
                        />
                      </div>
                    )}
                    
                    {/* Story Actions */}
                    <div className="flex items-center space-x-4 pt-2 border-t border-gray-100">
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">{story.likes || 0}</span>
                      </button>
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

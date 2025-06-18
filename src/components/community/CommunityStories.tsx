
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { useCommunityStories } from '@/hooks/useCommunityStories';
import { useAuth } from '@/context/auth';
import CommunityStoryForm from './CommunityStoryForm';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

const CommunityStories = () => {
  const { stories, isLoading, deleteStory, updateStory } = useCommunityStories();
  const { user, isSignedIn } = useAuth();
  const [editingStory, setEditingStory] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleDelete = async (storyId: string) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      const success = await deleteStory(storyId);
      if (success) {
        toast.success('Story deleted successfully');
      } else {
        toast.error('Failed to delete story');
      }
    }
  };

  const handleEdit = (story: any) => {
    setEditingStory(story.id);
    setEditContent(story.content);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingStory || !editContent.trim()) return;
    
    const success = await updateStory(editingStory, editContent.trim());
    if (success) {
      toast.success('Story updated successfully');
      setIsEditDialogOpen(false);
      setEditingStory(null);
      setEditContent('');
    } else {
      toast.error('Failed to update story');
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Always show the form at the top for authenticated users */}
        {isSignedIn && <CommunityStoryForm />}
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Always show the posting form for signed-in users */}
      {isSignedIn && <CommunityStoryForm />}
      
      {/* Stories feed */}
      <div className="space-y-4">
        {stories && stories.length > 0 ? (
          stories.map((story) => {
            const isOwner = user && story.user_id === user.id;
            
            return (
              <Card key={story.id} className="w-full">
                <CardContent className="p-6">
                  {/* Story header with user info and actions */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                        {story.author?.full_name ? story.author.full_name.charAt(0).toUpperCase() : '?'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {story.author?.full_name || 'Anonymous User'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatTimeAgo(story.created_at)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Show edit/delete options for story owner */}
                    {isOwner && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(story)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Story
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(story.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Story
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>

                  {/* Story content */}
                  <div className="mb-4">
                    <p className="text-gray-800 leading-relaxed">{story.content}</p>
                  </div>

                  {/* Story image if present */}
                  {story.image_url && (
                    <div className="mb-4">
                      <img 
                        src={story.image_url} 
                        alt="Story image" 
                        className="w-full max-h-96 object-cover rounded-lg border"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  {/* Story actions */}
                  <div className="flex items-center space-x-4 pt-2 border-t">
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-500">
                      <Heart className="h-4 w-4 mr-1" />
                      <span>{story.likes || 0}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-500">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      <span>Comment</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500 mb-4">No stories yet. Be the first to share your beauty journey!</p>
              {!isSignedIn && (
                <p className="text-sm text-gray-400">Sign in to share your story</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Story Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Story</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Share your beauty journey..."
              className="min-h-[100px] resize-none"
            />
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveEdit}
                disabled={!editContent.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommunityStories;

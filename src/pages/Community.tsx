import React, { useState, useEffect } from 'react';
import { useCommunityPosts, CommunityPost } from '@/hooks/useCommunityPosts';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import SEOMetaTags from '@/components/community/SEOMetaTags';
import ImmersiveFeed from '@/components/community/ImmersiveFeed';
import MobileBottomNav from '@/components/community/MobileBottomNav';
import FullScreenPostModal from '@/components/community/FullScreenPostModal';

const Community = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());
  
  const { posts, isLoading, fetchPosts, toggleLike } = useCommunityPosts();
  const { user, isSignedIn } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleComment = (post: CommunityPost) => {
    setSelectedPost(post);
    setShowPostModal(true);
  };

  const handleShare = (post: CommunityPost) => {
    if (navigator.share) {
      navigator.share({
        title: `${post.profiles?.full_name || 'Beauty Pro'} on EmviApp`,
        text: post.content,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleSave = (postId: string) => {
    const newSaved = new Set(savedPosts);
    if (savedPosts.has(postId)) {
      newSaved.delete(postId);
      toast.success('Removed from saved');
    } else {
      newSaved.add(postId);
      toast.success('Added to saved');
    }
    setSavedPosts(newSaved);
  };

  const handleCreatePost = () => {
    toast.info('Post creation coming soon!');
  };

  const handleCommentSubmit = (postId: string, content: string) => {
    toast.success('Comment added!');
    setShowPostModal(false);
  };

  return (
    <>
      <SEOMetaTags
        title="Beauty Social - The Next Revolution"
        description="The most addictive beauty social platform. Share, discover, and connect with beauty professionals worldwide."
        url="https://emviapp.com/community"
        type="website"
        tags={['beauty social', 'social media', 'beauty community']}
      />

      {/* Revolutionary Immersive Feed */}
      <div className="fixed inset-0 bg-black overflow-hidden">
        <ImmersiveFeed
          posts={posts}
          onLike={toggleLike}
          onComment={handleComment}
          onShare={handleShare}
          onSave={handleSave}
          onLoadMore={() => {}}
          hasMore={false}
        />
      </div>

      {/* Mobile Navigation */}
      <MobileBottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onCreatePost={handleCreatePost}
        hasNotifications={true}
        hasMessages={true}
      />

      {/* Full Screen Post Modal */}
      {selectedPost && (
        <FullScreenPostModal
          post={selectedPost}
          isOpen={showPostModal}
          onClose={() => setShowPostModal(false)}
          onLike={toggleLike}
          onShare={handleShare}
          onSave={handleSave}
          onCommentSubmit={handleCommentSubmit}
        />
      )}
    </>
  );
};

export default Community;

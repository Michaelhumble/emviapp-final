import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserPlus, 
  MessageCircle, 
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface SimilarUser {
  id: string;
  full_name: string;
  avatar_url?: string;
  recent_question: string;
  similarity_score: number;
  is_following?: boolean;
  common_topics: string[];
}

interface DiscoveryWidgetProps {
  userQuestion: string;
  onClose?: () => void;
  className?: string;
}

const DiscoveryWidget = ({ userQuestion, onClose, className }: DiscoveryWidgetProps) => {
  const [similarUsers, setSimilarUsers] = useState<SimilarUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [followingIds, setFollowingIds] = useState<Set<string>>(new Set());
  const { user } = useAuth();

  useEffect(() => {
    if (userQuestion && user) {
      findSimilarUsers();
      fetchFollowingStatus();
    }
  }, [userQuestion, user]);

  const findSimilarUsers = async () => {
    try {
      setIsLoading(true);
      
      // Extract keywords from user's question
      const keywords = extractKeywords(userQuestion);
      
      // Find users who asked similar questions (containing AI tag and similar keywords)
      const { data: similarPosts } = await supabase
        .from('community_posts')
        .select(`
          user_id,
          content,
          created_at,
          tags
        `)
        .contains('tags', ['AI'])
        .neq('user_id', user.id)
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()) // Last 30 days
        .limit(20);

      if (!similarPosts) return;

      // Score posts by similarity and get unique users
      const userScores = new Map<string, { score: number; question: string; topics: string[] }>();
      
      similarPosts.forEach(post => {
        const similarity = calculateSimilarity(userQuestion, post.content, keywords);
        if (similarity > 0.3) { // Minimum similarity threshold
          const existing = userScores.get(post.user_id);
          if (!existing || similarity > existing.score) {
            userScores.set(post.user_id, {
              score: similarity,
              question: post.content,
              topics: findCommonTopics(keywords, post.content, post.tags || [])
            });
          }
        }
      });

      // Get top 3 users with highest similarity
      const topUserIds = Array.from(userScores.entries())
        .sort(([,a], [,b]) => b.score - a.score)
        .slice(0, 3)
        .map(([userId]) => userId);

      if (topUserIds.length === 0) return;

      // Fetch user profiles
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', topUserIds);

      if (profiles) {
        const users: SimilarUser[] = profiles.map(profile => {
          const userData = userScores.get(profile.id)!;
          return {
            id: profile.id,
            full_name: profile.full_name || 'Community Member',
            avatar_url: profile.avatar_url,
            recent_question: userData.question,
            similarity_score: userData.score,
            common_topics: userData.topics
          };
        });

        setSimilarUsers(users);
      }
    } catch (error) {
      console.error('Error finding similar users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFollowingStatus = async () => {
    if (!user || similarUsers.length === 0) return;

    try {
      const { data: following } = await supabase
        .from('followers')
        .select('artist_id')
        .eq('viewer_id', user.id)
        .in('artist_id', similarUsers.map(u => u.id));

      if (following) {
        setFollowingIds(new Set(following.map(f => f.artist_id)));
      }
    } catch (error) {
      console.error('Error fetching following status:', error);
    }
  };

  const handleFollow = async (userId: string) => {
    if (!user) {
      toast.error('Please sign in to follow users');
      return;
    }

    try {
      const isFollowing = followingIds.has(userId);
      
      if (isFollowing) {
        // Unfollow
        await supabase
          .from('followers')
          .delete()
          .eq('viewer_id', user.id)
          .eq('artist_id', userId);
        
        setFollowingIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(userId);
          return newSet;
        });
        
        toast.success('Unfollowed successfully');
      } else {
        // Follow
        await supabase
          .from('followers')
          .insert({
            viewer_id: user.id,
            artist_id: userId
          });
        
        setFollowingIds(prev => new Set([...prev, userId]));
        toast.success('Following successfully!');
      }
    } catch (error) {
      console.error('Error updating follow status:', error);
      toast.error('Failed to update follow status');
    }
  };

  const handleDM = async (userId: string, userName: string) => {
    // This would typically open a messaging interface
    // For now, we'll show a toast indicating the action
    toast.success(`Opening conversation with ${userName}...`);
    
    // In a real implementation, you might:
    // - Open a message modal
    // - Navigate to a messages page
    // - Create a new conversation thread
  };

  const extractKeywords = (text: string): string[] => {
    // Simple keyword extraction - could be enhanced with NLP
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3)
      .filter(word => !['this', 'that', 'with', 'have', 'what', 'how', 'when', 'where', 'could', 'would', 'should'].includes(word));
    
    return [...new Set(words)]; // Remove duplicates
  };

  const calculateSimilarity = (question1: string, question2: string, keywords: string[]): number => {
    const text2Lower = question2.toLowerCase();
    const matchedKeywords = keywords.filter(keyword => text2Lower.includes(keyword));
    
    // Base similarity on keyword matches and length similarity
    const keywordScore = matchedKeywords.length / Math.max(keywords.length, 1);
    const lengthDiff = Math.abs(question1.length - question2.length);
    const lengthScore = Math.max(0, 1 - lengthDiff / Math.max(question1.length, question2.length));
    
    return (keywordScore * 0.7) + (lengthScore * 0.3);
  };

  const findCommonTopics = (keywords: string[], content: string, tags: string[]): string[] => {
    const topics = [...keywords, ...tags]
      .filter(topic => content.toLowerCase().includes(topic.toLowerCase()))
      .slice(0, 3);
    
    return [...new Set(topics)];
  };

  if (isLoading) {
    return (
      <Card className={`bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-4 w-4 text-blue-600 animate-pulse" />
            <span className="text-sm font-medium text-blue-800">Finding similar users...</span>
          </div>
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-white/50 animate-pulse">
                <div className="w-8 h-8 bg-gray-200 rounded-full" />
                <div className="flex-1">
                  <div className="h-3 bg-gray-200 rounded w-24 mb-1" />
                  <div className="h-2 bg-gray-200 rounded w-32" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (similarUsers.length === 0) {
    return null; // Don't show anything if no similar users found
  }

  return (
    <Card className={`bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              Connect with others who asked similar questions
            </span>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        <div className="space-y-3">
          {similarUsers.map((similarUser) => (
            <div
              key={similarUser.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/80 backdrop-blur-sm border border-white/50 hover:bg-white/90 transition-colors"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={similarUser.avatar_url} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm">
                  {similarUser.full_name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900 text-sm truncate">
                    {similarUser.full_name}
                  </span>
                  <div className="flex gap-1">
                    {similarUser.common_topics.slice(0, 2).map(topic => (
                      <Badge key={topic} className="bg-blue-100 text-blue-700 text-xs px-1 py-0">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-600 truncate">
                  "{similarUser.recent_question.substring(0, 80)}..."
                </p>
              </div>

              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant={followingIds.has(similarUser.id) ? "outline" : "default"}
                  onClick={() => handleFollow(similarUser.id)}
                  className={`text-xs px-2 py-1 h-7 ${
                    followingIds.has(similarUser.id)
                      ? 'border-blue-300 text-blue-600 hover:bg-blue-50'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {followingIds.has(similarUser.id) ? (
                    'Following'
                  ) : (
                    <>
                      <UserPlus className="h-3 w-3 mr-1" />
                      Follow
                    </>
                  )}
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDM(similarUser.id, similarUser.full_name)}
                  className="text-xs px-2 py-1 h-7 border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  <MessageCircle className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-blue-200">
          <p className="text-xs text-blue-600 flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            Connect with your beauty community and learn together!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscoveryWidget;
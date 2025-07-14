import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface Reaction {
  id: string;
  post_id: string;
  user_id: string;
  emoji: string;
  created_at: string;
}

interface RealtimeReactionsProps {
  postId: string;
  className?: string;
}

const emojiOptions = [
  { emoji: '❤️', label: 'Love' },
  { emoji: '🔥', label: 'Fire' },
  { emoji: '👏', label: 'Clap' },
  { emoji: '😮', label: 'Wow' },
  { emoji: '💯', label: 'Perfect' },
  { emoji: '😍', label: 'Amazing' },
  { emoji: '💪', label: 'Strong' },
  { emoji: '✨', label: 'Sparkle' },
];

const RealtimeReactions = ({ postId, className = '' }: RealtimeReactionsProps) => {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [reactionCounts, setReactionCounts] = useState<Record<string, number>>({});
  const [userReactions, setUserReactions] = useState<Set<string>>(new Set());
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [animatingEmojis, setAnimatingEmojis] = useState<Array<{ id: string; emoji: string; x: number; y: number }>>([]);
  const { user } = useAuth();

  // Fetch initial reactions
  useEffect(() => {
    fetchReactions();
  }, [postId]);

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel(`post-reactions-${postId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'community_post_reactions',
          filter: `post_id=eq.${postId}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newReaction = payload.new as Reaction;
            setReactions(prev => [...prev, newReaction]);
            updateCounts([...reactions, newReaction]);
            
            // Trigger floating animation
            triggerFloatingEmoji(newReaction.emoji);
          } else if (payload.eventType === 'DELETE') {
            const deletedReaction = payload.old as Reaction;
            setReactions(prev => prev.filter(r => r.id !== deletedReaction.id));
            updateCounts(reactions.filter(r => r.id !== deletedReaction.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId, reactions]);

  const fetchReactions = async () => {
    try {
      const { data, error } = await supabase
        .from('community_post_reactions')
        .select('*')
        .eq('post_id', postId);

      if (error) throw error;

      setReactions(data || []);
      updateCounts(data || []);
      
      if (user) {
        const userReactionEmojis = data?.filter(r => r.user_id === user.id).map(r => r.emoji) || [];
        setUserReactions(new Set(userReactionEmojis));
      }
    } catch (error) {
      console.error('Error fetching reactions:', error);
    }
  };

  const updateCounts = (reactionList: Reaction[]) => {
    const counts: Record<string, number> = {};
    reactionList.forEach(reaction => {
      counts[reaction.emoji] = (counts[reaction.emoji] || 0) + 1;
    });
    setReactionCounts(counts);
  };

  const handleReaction = async (emoji: string) => {
    if (!user) {
      toast.error('Please sign in to react');
      return;
    }

    try {
      const existingReaction = reactions.find(r => r.user_id === user.id && r.emoji === emoji);

      if (existingReaction) {
        // Remove reaction
        const { error } = await supabase
          .from('community_post_reactions')
          .delete()
          .eq('id', existingReaction.id);

        if (error) throw error;

        setUserReactions(prev => {
          const newSet = new Set(prev);
          newSet.delete(emoji);
          return newSet;
        });
      } else {
        // Add reaction
        const { error } = await supabase
          .from('community_post_reactions')
          .insert({
            post_id: postId,
            user_id: user.id,
            emoji
          });

        if (error) throw error;

        setUserReactions(prev => new Set([...prev, emoji]));
        triggerFloatingEmoji(emoji);
      }

      setShowEmojiPicker(false);
    } catch (error) {
      console.error('Error handling reaction:', error);
      toast.error('Failed to update reaction');
    }
  };

  const triggerFloatingEmoji = (emoji: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    const x = Math.random() * 100;
    const y = Math.random() * 20 + 40;
    
    setAnimatingEmojis(prev => [...prev, { id, emoji, x, y }]);
    
    // Remove after animation
    setTimeout(() => {
      setAnimatingEmojis(prev => prev.filter(e => e.id !== id));
    }, 2000);
  };

  const topReactions = Object.entries(reactionCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <div className={`relative ${className}`}>
      {/* Floating Emojis Animation */}
      {animatingEmojis.map(({ id, emoji, x, y }) => (
        <div
          key={id}
          className="absolute pointer-events-none animate-bounce"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            animation: 'float-up 2s ease-out forwards',
          }}
        >
          <span className="text-2xl">{emoji}</span>
        </div>
      ))}

      {/* Reaction Counts Display */}
      {topReactions.length > 0 && (
        <div className="flex items-center gap-1 mb-2">
          {topReactions.map(([emoji, count]) => (
            <Badge
              key={emoji}
              variant="outline"
              className={`text-xs px-2 py-1 cursor-pointer transition-all hover:scale-105 ${
                userReactions.has(emoji) 
                  ? 'bg-purple-100 border-purple-300 text-purple-700' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleReaction(emoji)}
            >
              {emoji} {count}
            </Badge>
          ))}
        </div>
      )}

      {/* Quick React Button */}
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="text-gray-500 hover:text-purple-600 transition-colors"
        >
          😊 Quick React
        </Button>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="absolute bottom-full left-0 mb-2 p-2 bg-white rounded-lg shadow-lg border border-gray-200 flex gap-1 z-10">
            {emojiOptions.map(({ emoji, label }) => (
              <Button
                key={emoji}
                variant="ghost"
                size="sm"
                onClick={() => handleReaction(emoji)}
                className={`text-xl hover:scale-125 transition-transform ${
                  userReactions.has(emoji) ? 'bg-purple-100' : ''
                }`}
                title={label}
              >
                {emoji}
              </Button>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: 1;
            transform: translateY(-20px) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translateY(-40px) scale(0.8);
          }
        }
      `}</style>
    </div>
  );
};

export default RealtimeReactions;
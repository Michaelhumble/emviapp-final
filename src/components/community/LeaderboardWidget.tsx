import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Crown, 
  Trophy, 
  Star, 
  TrendingUp, 
  Heart, 
  MessageCircle, 
  Sparkles,
  Award,
  Users,
  Calendar,
  Zap
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';

interface LeaderboardUser {
  id: string;
  full_name: string;
  avatar_url?: string;
  total_likes: number;
  total_posts: number;
  ai_posts: number;
  week_rank?: number;
  month_rank?: number;
  points: number;
  level: string;
  first_ai_user?: boolean;
}

interface AIAnswer {
  id: string;
  content: string;
  user_id: string;
  likes_count: number;
  created_at: string;
  profiles?: {
    full_name: string;
    avatar_url?: string;
  };
}

const LeaderboardWidget = () => {
  const [activeTab, setActiveTab] = useState('week');
  const [topUsers, setTopUsers] = useState<LeaderboardUser[]>([]);
  const [topAIAnswers, setTopAIAnswers] = useState<AIAnswer[]>([]);
  const [userRank, setUserRank] = useState<{ rank: number; points: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchLeaderboardData();
    if (user) {
      fetchUserRank();
    }
  }, [activeTab, user]);

  const fetchLeaderboardData = async () => {
    setIsLoading(true);
    try {
      // Fetch top AI answers (posts with AI tag and high likes)
      const startDate = activeTab === 'week' 
        ? new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

      // Get top AI answers by joining with profiles
      const { data: postsData } = await supabase
        .from('community_posts')
        .select(`
          id,
          content,
          user_id,
          likes_count,
          created_at
        `)
        .contains('tags', ['AI'])
        .gte('created_at', startDate)
        .order('likes_count', { ascending: false })
        .limit(5);

      // Get profiles for the posts
      let aiAnswersWithProfiles: AIAnswer[] = [];
      if (postsData) {
        const userIds = postsData.map(post => post.user_id);
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url')
          .in('id', userIds);

        aiAnswersWithProfiles = postsData.map(post => ({
          ...post,
          profiles: profiles?.find(p => p.id === post.user_id) || { full_name: 'Anonymous' }
        }));
      }

      // Fetch community champions (most active users)
      const { data: championsData } = await supabase
        .rpc('get_community_leaderboard', { 
          period_start: startDate,
          limit_count: 10 
        });

      const champions: LeaderboardUser[] = Array.isArray(championsData) 
        ? championsData.map((user: any) => ({
            id: user.id,
            full_name: user.full_name || 'Anonymous',
            avatar_url: user.avatar_url,
            total_likes: Number(user.total_likes),
            total_posts: Number(user.total_posts),
            ai_posts: Number(user.ai_posts),
            points: user.points,
            level: user.level,
            first_ai_user: user.first_ai_user
          }))
        : [];

      setTopAIAnswers(aiAnswersWithProfiles);
      setTopUsers(champions);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserRank = async () => {
    if (!user) return;
    
    try {
      const startDate = activeTab === 'week' 
        ? new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

      const { data } = await supabase
        .rpc('get_user_rank', { 
          target_user_id: user.id,
          period_start: startDate 
        });

      // The function returns an array, so take the first element
      const rankData = Array.isArray(data) && data.length > 0 ? data[0] : null;
      setUserRank(rankData ? { 
        rank: Number(rankData.rank), 
        points: rankData.points 
      } : null);
    } catch (error) {
      console.error('Error fetching user rank:', error);
    }
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <Crown className="h-4 w-4 text-yellow-500" />;
    if (index === 1) return <Trophy className="h-4 w-4 text-gray-400" />;
    if (index === 2) return <Star className="h-4 w-4 text-orange-500" />;
    return <span className="text-xs font-bold text-gray-500">#{index + 1}</span>;
  };

  const getLevelColor = (level: string) => {
    const colors = {
      Diamond: 'from-purple-600 to-pink-600',
      Platinum: 'from-gray-400 to-gray-600',
      Gold: 'from-yellow-500 to-orange-500',
      Silver: 'from-gray-300 to-gray-500',
      Bronze: 'from-orange-600 to-red-600'
    };
    return colors[level as keyof typeof colors] || colors.Bronze;
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-purple-100 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          Community Leaderboard
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="week" className="text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              This Week
            </TabsTrigger>
            <TabsTrigger value="month" className="text-xs">
              <Award className="h-3 w-3 mr-1" />
              This Month
            </TabsTrigger>
          </TabsList>

          <TabsContent value="week" className="space-y-4">
            {/* Top AI Answers Section */}
            <div>
              <h4 className="font-semibold text-sm text-gray-800 mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-500" />
                Top AI Answers
              </h4>
              <div className="space-y-2">
                {topAIAnswers.slice(0, 3).map((answer, index) => (
                  <div key={answer.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-50 transition-colors">
                    <div className="w-6 flex justify-center">
                      {getRankIcon(index)}
                    </div>
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={answer.profiles?.avatar_url} />
                      <AvatarFallback className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        {answer.profiles?.full_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600 truncate">
                        {answer.content.substring(0, 50)}...
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Heart className="h-3 w-3 text-red-400" />
                        {answer.likes_count}
                        <span>•</span>
                        <span>{formatTimeAgo(answer.created_at)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Champions */}
            <div>
              <h4 className="font-semibold text-sm text-gray-800 mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                Community Champions
              </h4>
              <div className="space-y-2">
                {topUsers.slice(0, 5).map((champion, index) => (
                  <div key={champion.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-50 transition-colors">
                    <div className="w-6 flex justify-center">
                      {getRankIcon(index)}
                    </div>
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={champion.avatar_url} />
                      <AvatarFallback className={`text-xs bg-gradient-to-r ${getLevelColor(champion.level)} text-white`}>
                        {champion.full_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-gray-900 truncate">
                          {champion.full_name}
                        </span>
                        {champion.first_ai_user && (
                          <Badge className="bg-gradient-to-r from-emerald-400 to-teal-400 text-white text-xs px-1 py-0">
                            <Zap className="h-2 w-2 mr-1" />
                            First AI
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{champion.total_posts} posts</span>
                        <span>{champion.total_likes} likes</span>
                        {champion.ai_posts > 0 && (
                          <span className="text-purple-600">{champion.ai_posts} AI</span>
                        )}
                      </div>
                    </div>
                    <div className="text-xs font-bold text-purple-600">
                      {champion.points}pts
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="month" className="space-y-4">
            {/* Same structure but for monthly data */}
            <div>
              <h4 className="font-semibold text-sm text-gray-800 mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-500" />
                Monthly Top AI Answers
              </h4>
              <div className="space-y-2">
                {topAIAnswers.slice(0, 3).map((answer, index) => (
                  <div key={answer.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-50 transition-colors">
                    <div className="w-6 flex justify-center">
                      {getRankIcon(index)}
                    </div>
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={answer.profiles?.avatar_url} />
                      <AvatarFallback className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        {answer.profiles?.full_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600 truncate">
                        {answer.content.substring(0, 50)}...
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Heart className="h-3 w-3 text-red-400" />
                        {answer.likes_count}
                        <span>•</span>
                        <span>{formatTimeAgo(answer.created_at)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-gray-800 mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                Monthly Champions
              </h4>
              <div className="space-y-2">
                {topUsers.slice(0, 5).map((champion, index) => (
                  <div key={champion.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-50 transition-colors">
                    <div className="w-6 flex justify-center">
                      {getRankIcon(index)}
                    </div>
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={champion.avatar_url} />
                      <AvatarFallback className={`text-xs bg-gradient-to-r ${getLevelColor(champion.level)} text-white`}>
                        {champion.full_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-gray-900 truncate">
                          {champion.full_name}
                        </span>
                        {champion.first_ai_user && (
                          <Badge className="bg-gradient-to-r from-emerald-400 to-teal-400 text-white text-xs px-1 py-0">
                            <Zap className="h-2 w-2 mr-1" />
                            First AI
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{champion.total_posts} posts</span>
                        <span>{champion.total_likes} likes</span>
                        {champion.ai_posts > 0 && (
                          <span className="text-purple-600">{champion.ai_posts} AI</span>
                        )}
                      </div>
                    </div>
                    <div className="text-xs font-bold text-purple-600">
                      {champion.points}pts
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Your Rank Section */}
        {userRank && (
          <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Your rank this {activeTab}:
              </span>
              <div className="flex items-center gap-2">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  #{userRank.rank}
                </Badge>
                <span className="text-sm font-bold text-purple-600">
                  {userRank.points} points
                </span>
              </div>
            </div>
          </div>
        )}

        {/* View More Button */}
        <Button 
          variant="outline" 
          size="sm"
          className="w-full border-purple-200 hover:bg-purple-50 text-purple-600"
        >
          View Full Leaderboard
        </Button>
      </CardContent>
    </Card>
  );
};

export default LeaderboardWidget;
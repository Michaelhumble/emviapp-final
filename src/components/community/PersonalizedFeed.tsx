import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, Users, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';

interface PersonalizedFeedProps {
  posts: any[];
  onPostSelect: (post: any) => void;
}

const PersonalizedFeed: React.FC<PersonalizedFeedProps> = ({ posts, onPostSelect }) => {
  const [personalizedPosts, setPersonalizedPosts] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [highlights, setHighlights] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (posts.length > 0) {
      generatePersonalizedFeed();
      generateRecommendations();
      generateHighlights();
    }
  }, [posts, user]);

  const generatePersonalizedFeed = () => {
    // Simple AI-like personalization based on user interactions
    const userInterests = getUserInterests();
    
    const scored = posts.map(post => ({
      ...post,
      score: calculatePersonalizationScore(post, userInterests)
    }));

    // Sort by score and insert recommendations every 5-7 posts
    const sorted = scored.sort((a, b) => b.score - a.score);
    const withRecommendations = insertRecommendations(sorted);
    
    setPersonalizedPosts(withRecommendations);
  };

  const getUserInterests = () => {
    // In a real app, this would come from user behavior analytics
    // For now, simulate based on basic preferences
    return {
      categories: ['nails', 'hair', 'makeup'], // Most interacted categories
      postTypes: ['story', 'showcase'], // Preferred post types
      engagement: 'high', // User engagement level
      timePreference: 'recent' // Prefers recent content
    };
  };

  const calculatePersonalizationScore = (post: any, interests: any) => {
    let score = 0;
    
    // Category match
    if (interests.categories.includes(post.category?.toLowerCase())) {
      score += 30;
    }
    
    // Post type preference
    if (interests.postTypes.includes(post.post_type)) {
      score += 20;
    }
    
    // Trending boost
    if (post.is_trending) {
      score += 25;
    }
    
    // Engagement boost
    const engagementRatio = (post.likes_count + post.comments_count) / Math.max(1, post.views || 100);
    score += engagementRatio * 15;
    
    // Recency boost
    const hoursOld = (Date.now() - new Date(post.created_at).getTime()) / (1000 * 60 * 60);
    if (hoursOld < 24) {
      score += 10;
    }
    
    // Randomness factor to prevent filter bubbles
    score += Math.random() * 5;
    
    return score;
  };

  const insertRecommendations = (posts: any[]) => {
    const result = [];
    let recommendationIndex = 0;
    
    for (let i = 0; i < posts.length; i++) {
      result.push(posts[i]);
      
      // Insert recommendation every 5-7 posts
      if ((i + 1) % (5 + Math.floor(Math.random() * 3)) === 0 && recommendationIndex < recommendations.length) {
        result.push({
          ...recommendations[recommendationIndex],
          isRecommendation: true
        });
        recommendationIndex++;
      }
    }
    
    return result;
  };

  const generateRecommendations = () => {
    // Simulate AI-generated recommendations
    const recs = [
      {
        id: 'rec-1',
        type: 'trending',
        title: 'Trending in Nail Art',
        description: 'Chrome nails are having a major moment! Check out these stunning designs.',
        posts_count: 234,
        engagement_rate: '85%',
        category: 'nails',
        image_url: '/api/placeholder/300/200'
      },
      {
        id: 'rec-2',
        type: 'personalized',
        title: 'Recommended for You',
        description: 'Based on your interest in hair styling, you might love these color trends.',
        posts_count: 156,
        engagement_rate: '92%',
        category: 'hair',
        image_url: '/api/placeholder/300/200'
      },
      {
        id: 'rec-3',
        type: 'community',
        title: 'Community Favorites',
        description: 'Most-saved makeup looks this week by our community.',
        posts_count: 89,
        engagement_rate: '78%',
        category: 'makeup',
        image_url: '/api/placeholder/300/200'
      }
    ];
    
    setRecommendations(recs);
  };

  const generateHighlights = () => {
    // Community highlights - AI curated content
    const highlightData = [
      {
        id: 'highlight-1',
        title: 'AI Beauty Insight: Spring Color Palette',
        content: 'Our AI analysis of 10,000+ posts reveals that soft pastels are dominating this season. Lilac and mint green are seeing 300% more engagement.',
        type: 'trend-analysis',
        confidence: 94,
        posts_analyzed: 10234,
        trending_score: 8.7
      },
      {
        id: 'highlight-2',
        title: 'Technique Spotlight: Glass Skin Effect',
        content: 'Advanced skincare techniques are trending up 45% this month. The glass skin effect is the most requested look.',
        type: 'technique',
        confidence: 87,
        posts_analyzed: 5432,
        trending_score: 9.2
      }
    ];
    
    setHighlights(highlightData);
  };

  const RecommendationCard = ({ recommendation }: { recommendation: any }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="my-4"
    >
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-gray-900">{recommendation.title}</h4>
                <Badge variant="outline" className="text-xs bg-purple-100 text-purple-700 border-purple-200">
                  {recommendation.type === 'trending' ? 'Trending' : 
                   recommendation.type === 'personalized' ? 'For You' : 'Popular'}
                </Badge>
              </div>
              
              <p className="text-gray-700 text-sm mb-3">{recommendation.description}</p>
              
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>{recommendation.posts_count} posts</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{recommendation.engagement_rate} engagement</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const HighlightCard = ({ highlight }: { highlight: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4"
    >
      <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center">
              <Star className="h-5 w-5 text-white" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-gray-900">{highlight.title}</h4>
                <Badge className="text-xs bg-orange-500 text-white">
                  AI Insight
                </Badge>
              </div>
              
              <p className="text-gray-700 text-sm mb-3">{highlight.content}</p>
              
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <span>Confidence: {highlight.confidence}%</span>
                <span>{highlight.posts_analyzed} posts analyzed</span>
                <span>Trending: {highlight.trending_score}/10</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-0">
      {/* Community Highlights Section */}
      {highlights.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-orange-500" />
            Community Highlights
          </h3>
          {highlights.map(highlight => (
            <HighlightCard key={highlight.id} highlight={highlight} />
          ))}
        </div>
      )}

      {/* Personalized Feed */}
      {personalizedPosts.map((post, index) => {
        if (post.isRecommendation) {
          return <RecommendationCard key={`rec-${index}`} recommendation={post} />;
        }
        
        // Return regular post (this would be handled by the parent component)
        return null;
      })}
    </div>
  );
};

export default PersonalizedFeed;
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/auth';
import { supabaseBypass } from "@/types/supabase-bypass";
import { toast } from 'sonner';
import { Sparkles, MapPin, Star, Users, Briefcase, Heart, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Recommendation {
  id: string;
  recommendation_type: 'job_match' | 'artist_match' | 'salon_match';
  target_id: string;
  score: number;
  reasons: string[];
  created_at: string;
  clicked: boolean;
  dismissed: boolean;
  target?: {
    id: string;
    title?: string;
    salon_name?: string;
    full_name?: string;
    location?: string;
    avatar_url?: string;
    category?: string;
    specialty?: string;
    description?: string;
    bio?: string;
  };
}

const AIRecommendationsCard = () => {
  const { user, userProfile } = useAuth();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchRecommendations();
    }
  }, [user]);

  const fetchRecommendations = async () => {
    try {
      // For now, we'll create mock AI recommendations based on user profile
      if (!userProfile) return;

      const mockRecommendations = [
        {
          id: '1',
          recommendation_type: 'job_match' as const,
          target_id: 'job-1',
          score: 0.95,
          reasons: ['Perfect location match', 'Specialty alignment', 'Experience level fit'],
          created_at: new Date().toISOString(),
          clicked: false,
          dismissed: false,
          target: {
            id: 'job-1',
            title: 'Senior Nail Artist Position',
            location: userProfile.location || 'Los Angeles, CA',
            category: 'nail-tech',
            description: 'Join our luxury salon team! We\'re looking for an experienced nail artist to work with high-end clientele.',
          }
        },
        {
          id: '2',
          recommendation_type: 'salon_match' as const,
          target_id: 'salon-1',
          score: 0.88,
          reasons: ['Location proximity', 'Similar client base', 'Growth opportunity'],
          created_at: new Date().toISOString(),
          clicked: false,
          dismissed: false,
          target: {
            id: 'salon-1',
            salon_name: 'Luxury Beauty Lounge',
            location: userProfile.location || 'Los Angeles, CA',
            avatar_url: '',
            bio: 'High-end salon looking for talented artists to join our team',
          }
        }
      ];

      setRecommendations(mockRecommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast.error('Failed to load recommendations');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecommendationClick = async (recommendation: Recommendation) => {
    try {
      // Mark as clicked in database (when real recommendations are implemented)
      // For now, just show a toast
      if (recommendation.recommendation_type === 'job_match') {
        toast.info('Redirecting to job details...');
      } else if (recommendation.recommendation_type === 'salon_match') {
        toast.info('Redirecting to salon profile...');
      }
    } catch (error) {
      console.error('Error handling recommendation click:', error);
    }
  };

  const dismissRecommendation = async (recommendationId: string) => {
    try {
      setRecommendations(prev => 
        prev.filter(rec => rec.id !== recommendationId)
      );
      toast.success('Recommendation dismissed');
    } catch (error) {
      console.error('Error dismissing recommendation:', error);
      toast.error('Failed to dismiss recommendation');
    }
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'job_match':
        return <Briefcase className="w-4 h-4 text-blue-500" />;
      case 'salon_match':
        return <Heart className="w-4 h-4 text-pink-500" />;
      case 'artist_match':
        return <Users className="w-4 h-4 text-purple-500" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const getRecommendationTitle = (type: string) => {
    switch (type) {
      case 'job_match':
        return 'Perfect Job Match';
      case 'salon_match':
        return 'Salon Opportunity';
      case 'artist_match':
        return 'Network Connection';
      default:
        return 'Recommendation';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.9) return 'text-green-600';
    if (score >= 0.8) return 'text-yellow-600';
    return 'text-gray-600';
  };

  if (isLoading) {
    return (
      <Card className="card-glass border-purple-100/50">
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-glass border-purple-100/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recommendations.length === 0 ? (
          <div className="text-center py-8">
            <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="font-medium text-gray-600 mb-2">No recommendations yet</h3>
            <p className="text-sm text-gray-500">
              Complete your profile and stay active to get personalized recommendations!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {recommendations.slice(0, 3).map((recommendation, index) => (
                <motion.div
                  key={recommendation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border rounded-lg bg-gradient-to-r from-purple-50/50 to-pink-50/50 hover:from-purple-50/80 hover:to-pink-50/80 transition-all cursor-pointer group"
                  onClick={() => handleRecommendationClick(recommendation)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getRecommendationIcon(recommendation.recommendation_type)}
                      <h3 className="font-medium text-sm">
                        {getRecommendationTitle(recommendation.recommendation_type)}
                      </h3>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getScoreColor(recommendation.score)}`}
                      >
                        <Star className="w-3 h-3 mr-1" />
                        {Math.round(recommendation.score * 100)}% match
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        dismissRecommendation(recommendation.id);
                      }}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="flex items-start gap-3 mb-3">
                    {recommendation.target?.avatar_url && (
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={recommendation.target.avatar_url} />
                        <AvatarFallback>
                          {recommendation.target?.salon_name?.charAt(0) || 
                           recommendation.target?.title?.charAt(0) || 'R'}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm mb-1">
                        {recommendation.target?.title || 
                         recommendation.target?.salon_name || 
                         recommendation.target?.full_name}
                      </h4>
                      {recommendation.target?.location && (
                        <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                          <MapPin className="w-3 h-3" />
                          {recommendation.target.location}
                        </div>
                      )}
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {recommendation.target?.description || 
                         recommendation.target?.bio || 
                         'Great opportunity based on your profile'}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {recommendation.reasons.slice(0, 3).map((reason, idx) => (
                      <Badge 
                        key={idx} 
                        variant="outline" 
                        className="text-xs bg-white/50"
                      >
                        {reason}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {recommendations.length > 3 && (
              <Button
                variant="ghost"
                className="w-full text-purple-600 hover:text-purple-700"
                onClick={() => {
                  toast.info('Full recommendations page coming soon!');
                }}
              >
                View all recommendations
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIRecommendationsCard;
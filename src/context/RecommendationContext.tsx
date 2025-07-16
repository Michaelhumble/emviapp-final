import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Job } from '@/types/job';

interface RecommendationItem {
  id: string;
  title: string;
  type: 'job' | 'salon' | 'artist';
  score: number;
  reason: string;
  image?: string;
  location?: string;
  category?: string;
}

interface RecommendationContextType {
  getRecommendations: (type: 'job' | 'salon' | 'artist', limit?: number) => Promise<RecommendationItem[]>;
  getRelatedItems: (itemId: string, itemType: 'job' | 'salon' | 'artist', limit?: number) => Promise<RecommendationItem[]>;
  trackInteraction: (itemId: string, itemType: string, interactionType: string) => void;
}

const RecommendationContext = createContext<RecommendationContextType | null>(null);

export const useRecommendations = () => {
  const context = useContext(RecommendationContext);
  if (!context) {
    throw new Error('useRecommendations must be used within RecommendationProvider');
  }
  return context;
};

export const RecommendationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userPreferences, setUserPreferences] = useState<{
    categories: string[];
    locations: string[];
    viewHistory: string[];
  }>({
    categories: [],
    locations: [],
    viewHistory: []
  });

  useEffect(() => {
    loadUserPreferences();
  }, []);

  const loadUserPreferences = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Load user activity to build preferences
      const { data: activity } = await supabase
        .from('activity_log')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(100);

      if (activity) {
        const categories = new Set<string>();
        const locations = new Set<string>();
        const viewHistory: string[] = [];

        activity.forEach(log => {
          const meta = log.metadata as any;
          if (meta?.category) categories.add(meta.category);
          if (meta?.location) locations.add(meta.location);
          if (log.activity_type.includes('view') && meta?.entityId) {
            viewHistory.push(meta.entityId);
          }
        });

        setUserPreferences({
          categories: Array.from(categories),
          locations: Array.from(locations),
          viewHistory: viewHistory.slice(0, 50)
        });
      }
    } catch (error) {
      console.warn('Failed to load user preferences:', error);
    }
  };

  const getRecommendations = async (type: 'job' | 'salon' | 'artist', limit = 6): Promise<RecommendationItem[]> => {
    try {
      let query = supabase.from('jobs').select('*');
      
      if (type === 'job') {
        query = query.neq('category', 'salon');
      } else if (type === 'salon') {
        query = query.eq('category', 'salon');
      }

      query = query.eq('status', 'active').limit(limit * 2); // Get more to filter

      const { data: items } = await query;
      if (!items) return [];

      // Score items based on user preferences
      const scoredItems = items.map(item => {
        let score = 0;
        
        // Category match
        if (userPreferences.categories.includes(item.category)) score += 3;
        
        // Location match
        if (item.location && userPreferences.locations.some(loc => 
          item.location?.toLowerCase().includes(loc.toLowerCase())
        )) score += 2;
        
        // Recency boost
        const daysOld = (Date.now() - new Date(item.created_at).getTime()) / (1000 * 60 * 60 * 24);
        if (daysOld < 7) score += 1;
        
        // Random factor for diversity
        score += Math.random() * 0.5;

        return {
          id: item.id,
          title: item.title,
          type: type,
          score,
          reason: getRecommendationReason(item as any, userPreferences),
          image: item.image_urls?.[0] || item.image_url,
          location: item.location,
          category: item.category
        } as RecommendationItem;
      });

      // Sort by score and return top items
      return scoredItems
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);

    } catch (error) {
      console.warn('Failed to get recommendations:', error);
      return [];
    }
  };

  const getRelatedItems = async (itemId: string, itemType: 'job' | 'salon' | 'artist', limit = 4): Promise<RecommendationItem[]> => {
    try {
      // Get the current item to find similar ones
      const { data: currentItem } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', itemId)
        .single();

      if (!currentItem) return [];

      // Find similar items by category and location
      let query = supabase
        .from('jobs')
        .select('*')
        .neq('id', itemId)
        .eq('status', 'active');

      if (itemType === 'salon') {
        query = query.eq('category', 'salon');
      } else {
        query = query.neq('category', 'salon');
      }

      // Prefer same category
      if (currentItem.category) {
        query = query.eq('category', currentItem.category);
      }

      const { data: relatedItems } = await query.limit(limit * 2);
      if (!relatedItems) return [];

      // Score based on similarity
      const scoredItems = relatedItems.map(item => {
        let score = 0;
        
        if (item.category === currentItem.category) score += 3;
        if (item.location === currentItem.location) score += 2;
        
        // Random factor
        score += Math.random() * 0.5;

        return {
          id: item.id,
          title: item.title,
          type: itemType,
          score,
          reason: `Similar to "${currentItem.title}"`,
          image: item.image_urls?.[0] || item.image_url,
          location: item.location,
          category: item.category
        } as RecommendationItem;
      });

      return scoredItems
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);

    } catch (error) {
      console.warn('Failed to get related items:', error);
      return [];
    }
  };

  const trackInteraction = async (itemId: string, itemType: string, interactionType: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from('ai_recommendations')
        .insert({
          user_id: user.id,
          target_id: itemId,
          recommendation_type: itemType,
          metadata: { interaction_type: interactionType },
          clicked: interactionType === 'click',
          shown_at: new Date().toISOString()
        });

      // Update user preferences
      loadUserPreferences();
    } catch (error) {
      console.warn('Failed to track recommendation interaction:', error);
    }
  };

  return (
    <RecommendationContext.Provider
      value={{
        getRecommendations,
        getRelatedItems,
        trackInteraction
      }}
    >
      {children}
    </RecommendationContext.Provider>
  );
};

function getRecommendationReason(item: Job, preferences: { categories: string[]; locations: string[]; viewHistory: string[] }): string {
  if (preferences.categories.includes(item.category)) {
    return `Popular in ${item.category}`;
  }
  if (item.location && preferences.locations.some(loc => 
    item.location?.toLowerCase().includes(loc.toLowerCase())
  )) {
    return `Near ${item.location}`;
  }
  const daysOld = (Date.now() - new Date(item.created_at).getTime()) / (1000 * 60 * 60 * 24);
  if (daysOld < 7) {
    return 'Recently posted';
  }
  return 'Recommended for you';
}
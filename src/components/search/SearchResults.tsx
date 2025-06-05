
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useSearchStore } from './store/searchStore';
import SearchResultCard from './SearchResultCard';
import SearchEmptyState from './SearchEmptyState';
import { Loader2 } from 'lucide-react';

const SearchResults = () => {
  const { searchQuery, selectedCategory } = useSearchStore();

  const { data: results, isLoading } = useQuery({
    queryKey: ['search-results', searchQuery, selectedCategory],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];

      const searchResults: any[] = [];

      // Search Jobs
      if (selectedCategory === 'all' || selectedCategory === 'jobs') {
        const { data: jobs } = await supabase
          .from('jobs')
          .select('*')
          .eq('status', 'active')
          .ilike('title', `%${searchQuery}%`)
          .limit(5);
        
        if (jobs) {
          searchResults.push(...jobs.map(job => ({ ...job, type: 'job' })));
        }
      }

      // Search Salons
      if (selectedCategory === 'all' || selectedCategory === 'salons') {
        const { data: salons } = await supabase
          .from('salon_listings')
          .select('*')
          .eq('status', 'active')
          .ilike('salon_name', `%${searchQuery}%`)
          .limit(5);
        
        if (salons) {
          searchResults.push(...salons.map(salon => ({ ...salon, type: 'salon' })));
        }
      }

      // Search Services
      if (selectedCategory === 'all' || selectedCategory === 'services') {
        const { data: services } = await supabase
          .from('services')
          .select(`
            *,
            users!inner(id, full_name, avatar_url)
          `)
          .eq('is_visible', true)
          .ilike('title', `%${searchQuery}%`)
          .limit(5);
        
        if (services) {
          searchResults.push(...services.map(service => ({ ...service, type: 'service' })));
        }
      }

      // Search Artists (Users with artist role)
      if (selectedCategory === 'all' || selectedCategory === 'artists') {
        const { data: artists } = await supabase
          .from('users')
          .select('*')
          .in('role', ['artist', 'nail technician/artist'])
          .ilike('full_name', `%${searchQuery}%`)
          .limit(5);
        
        if (artists) {
          searchResults.push(...artists.map(artist => ({ ...artist, type: 'artist' })));
        }
      }

      return searchResults;
    },
    enabled: !!searchQuery.trim(),
  });

  // Group results by type
  const groupedResults = results?.reduce((acc: any, item: any) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {}) || {};

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        <span className="ml-2 text-gray-600">Searching...</span>
      </div>
    );
  }

  if (!searchQuery.trim()) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Start typing to search for salons, jobs, artists, and services...</p>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return <SearchEmptyState searchQuery={searchQuery} />;
  }

  return (
    <div className="space-y-8">
      {Object.entries(groupedResults).map(([type, items]: [string, any]) => (
        <div key={type} className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 capitalize">
            {type}s ({items.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item: any) => (
              <SearchResultCard key={`${type}-${item.id}`} item={item} type={type} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;

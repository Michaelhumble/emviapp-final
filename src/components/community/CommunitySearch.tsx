import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, X, User, MessageSquare, Hash } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { supabaseBypass } from "@/types/supabase-bypass";
import { useDebounce } from '@/hooks/useDebounce';

interface SearchResult {
  id: string;
  type: 'post' | 'user' | 'hashtag';
  title: string;
  content: string;
  metadata?: any;
  avatar_url?: string;
}

interface CommunitySearchProps {
  onSearch: (query: string, results: SearchResult[]) => void;
  onSelect?: (result: SearchResult) => void;
  placeholder?: string;
}

const CommunitySearch: React.FC<CommunitySearchProps> = ({
  onSearch,
  onSelect,
  placeholder = "Search posts, users, and hashtags..."
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('community_recent_searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (debouncedQuery.trim().length >= 2) {
      performSearch(debouncedQuery);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const performSearch = async (searchQuery: string) => {
    try {
      setIsSearching(true);
      const searchResults: SearchResult[] = [];

      // Search posts - simplified approach
      const { data: posts } = await supabaseBypass
        .from('community_posts')
        .select('id, content, created_at, user_id')
        .ilike('content', `%${searchQuery}%`)
        .limit(5);

      if (posts && posts.length > 0) {
        // Get user profiles separately
        const userIds = [...new Set((posts as any[]).map((post: any) => post.user_id))];
        const { data: profiles } = await supabaseBypass
          .from('profiles')
          .select('id, full_name, avatar_url')
          .in('id', userIds);

        const profileMap = new Map((profiles as any[])?.map((p: any) => [p.id, p]) || []);

        searchResults.push(...(posts as any[]).map((post: any) => {
          const profile = profileMap.get(post.user_id);
          return {
            id: post.id,
            type: 'post' as const,
            title: profile?.full_name || 'Unknown User',
            content: post.content.length > 100 ? 
              post.content.substring(0, 100) + '...' : post.content,
            metadata: { created_at: post.created_at },
            avatar_url: profile?.avatar_url
          };
        }));
      }

      // Search users (profiles)
      const { data: profiles } = await supabaseBypass
        .from('profiles')
        .select('id, full_name, avatar_url')
        .ilike('full_name', `%${searchQuery}%`)
        .limit(5);

      if (profiles) {
        searchResults.push(...(profiles as any[]).map((profile: any) => ({
          id: profile.id,
          type: 'user' as const,
          title: profile.full_name || 'Unnamed User',
          content: 'User profile',
          avatar_url: profile.avatar_url
        })));
      }

      // Extract hashtags from query
      const hashtagMatch = searchQuery.match(/#\w+/g);
      if (hashtagMatch) {
        searchResults.push(...hashtagMatch.map(tag => ({
          id: tag,
          type: 'hashtag' as const,
          title: tag,
          content: `Search for ${tag}`,
        })));
      }

      setResults(searchResults);
      setShowResults(true);
      onSearch(searchQuery, searchResults);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim().length >= 2) {
      setShowResults(true);
    }
  };

  const handleResultSelect = (result: SearchResult) => {
    // Save to recent searches
    const newRecentSearches = [
      result.title,
      ...recentSearches.filter(search => search !== result.title)
    ].slice(0, 5);
    
    setRecentSearches(newRecentSearches);
    localStorage.setItem('community_recent_searches', JSON.stringify(newRecentSearches));
    
    setShowResults(false);
    setQuery(result.title);
    
    if (onSelect) {
      onSelect(result);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <User className="h-4 w-4 text-blue-500" />;
      case 'hashtag':
        return <Hash className="h-4 w-4 text-purple-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-green-500" />;
    }
  };

  const getResultTypeLabel = (type: string) => {
    switch (type) {
      case 'user':
        return 'User';
      case 'hashtag':
        return 'Hashtag';
      default:
        return 'Post';
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.trim().length >= 2 && setShowResults(true)}
          className="pl-10 pr-10 bg-white border-gray-200 focus:border-purple-500 focus:ring-purple-500"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {showResults && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto shadow-lg border-0">
          <CardContent className="p-0">
            {isSearching ? (
              <div className="p-4 text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 mx-auto"></div>
                <p className="text-sm text-gray-600 mt-2">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="py-2">
                {results.map((result) => (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleResultSelect(result)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {result.avatar_url ? (
                          <img
                            src={result.avatar_url}
                            alt=""
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            {getResultIcon(result.type)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-gray-900 truncate">
                            {result.title}
                          </p>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {getResultTypeLabel(result.type)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {result.content}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : query.trim().length >= 2 ? (
              <div className="p-4 text-center">
                <Search className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">No results found for "{query}"</p>
              </div>
            ) : (
              recentSearches.length > 0 && (
                <div className="py-2">
                  <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Recent Searches
                  </div>
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(search)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Search className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">{search}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CommunitySearch;
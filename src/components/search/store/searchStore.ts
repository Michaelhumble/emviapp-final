
import { create } from 'zustand';

interface SearchState {
  searchQuery: string;
  selectedCategory: string;
  searchResults: any[];
  isLoading: boolean;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSearchResults: (results: any[]) => void;
  setIsLoading: (loading: boolean) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchQuery: '',
  selectedCategory: 'all',
  searchResults: [],
  isLoading: false,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSearchResults: (results) => set({ searchResults: results }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));

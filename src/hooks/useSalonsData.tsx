
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Job } from "@/types/job";
import { salonsForSaleJobs } from "@/utils/jobs/mockJobData";
import { differenceInDays } from 'date-fns';

export interface SalonFilters {
  featured?: boolean;
  location?: string;
  priceRange?: [number, number];
  showExpired?: boolean;
  hasHousing?: boolean;
  industry?: string;
  stations?: number;
  squareFeet?: [number, number];
}

export const useSalonsData = (initialFilters: SalonFilters = {}) => {
  const [salons, setSalons] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<SalonFilters>(initialFilters);
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredSalons, setFeaturedSalons] = useState<Job[]>([]);
  const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([]);

  const fetchSalons = useCallback(async () => {
    setLoading(true);
    try {
      // Use mock data for now
      let filteredSalons = [...salonsForSaleJobs];
      
      // Apply keyword search
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        filteredSalons = filteredSalons.filter(salon => 
          (salon.company && salon.company.toLowerCase().includes(query)) ||
          (salon.description && salon.description.toLowerCase().includes(query)) ||
          (salon.vietnamese_description && salon.vietnamese_description.toLowerCase().includes(query)) ||
          (salon.location && salon.location.toLowerCase().includes(query)) ||
          (salon.salon_features && salon.salon_features.some(f => f.toLowerCase().includes(query)))
        );
      }
      
      // Apply filters
      if (filters.featured) {
        filteredSalons = filteredSalons.filter(salon => salon.is_featured);
      }
      
      if (filters.location && filters.location !== 'all') {
        filteredSalons = filteredSalons.filter(salon => 
          salon.location && salon.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
      
      if (filters.hasHousing) {
        filteredSalons = filteredSalons.filter(salon => salon.has_housing === true);
      }
      
      if (filters.industry && filters.industry !== 'all') {
        filteredSalons = filteredSalons.filter(salon => 
          salon.salon_features?.some(f => f.toLowerCase().includes(filters.industry!.toLowerCase()))
        );
      }
      
      if (filters.priceRange && filters.priceRange.length === 2) {
        filteredSalons = filteredSalons.filter(salon => {
          const priceString = salon.asking_price || "";
          const price = parseInt(priceString.replace(/[^0-9]/g, ""));
          return price >= filters.priceRange![0] && price <= filters.priceRange![1];
        });
      }
      
      if (filters.squareFeet && filters.squareFeet.length === 2) {
        filteredSalons = filteredSalons.filter(salon => {
          const sizeString = salon.square_feet || "";
          const size = parseInt(sizeString.replace(/[^0-9]/g, ""));
          return size >= filters.squareFeet![0] && size <= filters.squareFeet![1];
        });
      }
      
      if (filters.stations && filters.stations > 0) {
        filteredSalons = filteredSalons.filter(salon => 
          salon.number_of_stations && salon.number_of_stations >= filters.stations!
        );
      }
      
      // Only show active salons unless showExpired is true
      if (!filters.showExpired) {
        filteredSalons = filteredSalons.filter(salon => {
          if (salon.status === 'expired') return false;
          
          const createdDate = new Date(salon.created_at);
          const now = new Date();
          return differenceInDays(now, createdDate) < 30;
        });
      }

      // Sort by featured status - featured listings first
      filteredSalons.sort((a, b) => {
        if (a.is_featured === b.is_featured) return 0;
        return a.is_featured ? -1 : 1;
      });

      // Set featured salons
      const featured = salonsForSaleJobs
        .filter(salon => salon.is_featured)
        .slice(0, 3);
      setFeaturedSalons(featured);
      
      // Generate suggested keywords
      const keywords = new Set<string>();
      salonsForSaleJobs.forEach(salon => {
        if (salon.salon_features) {
          salon.salon_features.forEach(f => keywords.add(f));
        }
        if (salon.location) {
          keywords.add(salon.location);
        }
      });
      setSuggestedKeywords(Array.from(keywords));

      setSalons(filteredSalons);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      console.error("Error fetching salons:", err);
    } finally {
      setLoading(false);
    }
  }, [filters, searchTerm]);

  useEffect(() => {
    fetchSalons();
  }, [fetchSalons]);

  const updateFilters = (newFilters: Partial<SalonFilters>) => {
    setFilters({ ...filters, ...newFilters });
  };

  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  return { 
    salons, 
    loading, 
    error, 
    filters, 
    searchTerm, 
    updateFilters, 
    updateSearchTerm, 
    fetchSalons,
    featuredSalons,
    suggestedKeywords
  };
};

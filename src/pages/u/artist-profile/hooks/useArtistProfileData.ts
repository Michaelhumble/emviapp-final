
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

// Define proper type for ArtistProfile
interface ArtistProfile {
  id: string;
  created_at: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  website?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  city?: string;
  state?: string;
  country?: string;
  bio?: string;
  services?: any[];
  specialties?: string[];
  title?: string;
  username?: string;
  phone_number?: string;
  business_name?: string;
  profile_views?: number;
  location?: string;
  job_types?: string[];
  verification_status?: string;
  stripe_account_id?: string;
  stripe_customer_id?: string;
  is_stripe_account_onboarded?: boolean;
  email_confirmed?: boolean;
  is_visible?: boolean;
  address?: string;
  lat?: number;
  lng?: number;
  zip?: string;
  timezone?: string;
  ratings?: number;
  num_reviews?: number;
  avg_rating?: number;
}

// Define the Service type to match what's expected
interface Service {
  id: string;
  title: string;
  price: number;
  duration_minutes: number;
  description: string;
  is_visible: boolean;
  name?: string; // For compatibility
  duration?: number; // For compatibility
}

// Define the PortfolioImage type to match what's expected
interface PortfolioImage {
  id: string;
  url: string;
  alt: string;
  name: string;
}

export const useArtistProfileData = (username: string | undefined) => {
  const [viewCount, setViewCount] = useState(0);
  
  // Use the properly formatted query with Tanstack React Query v5
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['artistProfile', username],
    queryFn: async () => {
      try {
        // This is a mock implementation - in a real app, you'd query your actual profiles table
        // For demo purposes, we'll simulate a successful response
        const mockProfile: ArtistProfile = {
          id: '123',
          created_at: new Date().toISOString(),
          full_name: 'Sample Artist',
          username: username,
          profile_views: 100,
          // Add other fields as needed
        };
        
        setViewCount(mockProfile.profile_views || 0);
        return mockProfile;
      } catch (err) {
        console.error('Error fetching artist profile:', err);
        throw err;
      }
    },
    enabled: !!username, // Only run query if username is provided
  });

  // Mock portfolio images for demo - updated with the required name property
  const portfolioImages: PortfolioImage[] = [
    { id: '1', url: '/lovable-uploads/1b5ea814-ad33-4a65-b01e-6c406c98ffc1.png', alt: 'Portfolio image 1', name: 'Image 1' },
    { id: '2', url: '/lovable-uploads/253b19a3-141f-40c7-9cce-fc10464f0615.png', alt: 'Portfolio image 2', name: 'Image 2' },
    { id: '3', url: '/lovable-uploads/9f39ea95-e42c-4f4e-89a9-b44cb4e215e2.png', alt: 'Portfolio image 3', name: 'Image 3' },
  ];

  // Mock services for demo - updated to match the Service interface
  const services: Service[] = [
    { id: '1', title: 'Nail Art', price: 50, duration_minutes: 60, description: 'Beautiful nail art service', is_visible: true, name: 'Nail Art', duration: 60 },
    { id: '2', title: 'Manicure', price: 35, duration_minutes: 45, description: 'Classic manicure service', is_visible: true, name: 'Manicure', duration: 45 },
    { id: '3', title: 'Pedicure', price: 45, duration_minutes: 60, description: 'Relaxing pedicure service', is_visible: true, name: 'Pedicure', duration: 60 },
  ];

  const incrementViewCount = async () => {
    if (profile) {
      const newCount = viewCount + 1;
      setViewCount(newCount);
      // In a real app, you would update this in your database
      console.log('Incrementing view count to:', newCount);
    }
  };

  return {
    profile,
    services,
    portfolioImages,
    viewCount,
    loading: isLoading,
    error,
    isSalonOwner: false, // Mock value
    incrementViewCount
  };
};

export { type ArtistProfile, type Service, type PortfolioImage };
export default useArtistProfileData;

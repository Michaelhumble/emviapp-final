import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { ArtistProfile } from "../types";

export const useArtistProfileData = (username: string) => {
  const [profile, setProfile] = useState<ArtistProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfileData = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        const processedData = processProfileData(data);
        setProfile(processedData);
        return processedData;
      } else {
        return null;
      }
    } catch (err: any) {
      setError(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useQuery(['artistProfile', username], fetchProfileData);

  const processProfileData = (rawProfileData: any): ArtistProfile => {
    return {
      id: rawProfileData.id,
      created_at: rawProfileData.created_at,
      email: rawProfileData.email,
      full_name: rawProfileData.full_name,
      avatar_url: rawProfileData.avatar_url,
      website: rawProfileData.website,
      instagram: rawProfileData.instagram,
      tiktok: rawProfileData.tiktok,
      youtube: rawProfileData.youtube,
      city: rawProfileData.city,
      state: rawProfileData.state,
      country: rawProfileData.country,
      bio: rawProfileData.bio,
      services: rawProfileData.services,
      specialties: rawProfileData.specialties,
      title: rawProfileData.title,
      username: rawProfileData.username,
      phone_number: rawProfileData.phone_number,
      business_name: rawProfileData.business_name,
      profile_views: rawProfileData.profile_views || 0,
      location: rawProfileData.location,
      job_types: rawProfileData.job_types,
      verification_status: rawProfileData.verification_status,
      stripe_account_id: rawProfileData.stripe_account_id,
      stripe_customer_id: rawProfileData.stripe_customer_id,
      is_stripe_account_onboarded: rawProfileData.is_stripe_account_onboarded,
      email_confirmed: rawProfileData.email_confirmed,
      is_visible: rawProfileData.is_visible,
      address: rawProfileData.address,
      lat: rawProfileData.lat,
      lng: rawProfileData.lng,
      zip: rawProfileData.zip,
      timezone: rawProfileData.timezone,
      ratings: rawProfileData.ratings,
      num_reviews: rawProfileData.num_reviews,
      avg_rating: rawProfileData.avg_rating,
    };
  };

  const updateProfileViews = async (currentViews: number) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ 
          profile_views: currentViews + 1,
        })
        .eq('username', username);
        
      if (error) {
        console.error("Error updating profile views:", error);
      } else {
        console.log("Profile views updated successfully:", data);
      }
    } catch (err) {
      console.error("Error updating profile views:", err);
    }
  };

  return { profile, isLoading, error, updateProfileViews };
};

export default useArtistProfileData;

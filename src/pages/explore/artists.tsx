import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet";
import ArtistSearchFilters from "@/components/explore/ArtistSearchFilters";
import ArtistGrid from "@/components/explore/ArtistGrid";
import { UserProfile } from "@/types/profile";

const ArtistDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [sortBy, setSortBy] = useState("boosted");
  const [location, setLocation] = useState("");
  
  const { data: artists, isLoading, error } = useQuery({
    queryKey: ['artists', specialty, sortBy, location],
    queryFn: async () => {
      let query = supabase
        .from('users')
        .select('*')
        .in('role', ['artist', 'freelancer', 'nail technician/artist'])
        .neq('full_name', '')
        .neq('avatar_url', '');
      
      if (specialty !== 'all') {
        query = query.eq('specialty', specialty);
      }
      
      if (location) {
        query = query.ilike('location', `%${location}%`);
      }
      
      if (sortBy === 'boosted') {
        query = query.order('boosted_until', { ascending: false, nullsFirst: false });
      } else if (sortBy === 'newest') {
        query = query.order('created_at', { ascending: false });
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as UserProfile[];
    }
  });
  
  const filteredArtists = artists?.filter(artist => {
    if (!searchQuery) return true;
    
    const fullName = artist.full_name?.toLowerCase() || "";
    const bio = artist.bio?.toLowerCase() || "";
    const artistSpecialty = artist.specialty?.toLowerCase() || "";
    const artistLocation = artist.location?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();
    
    return (
      fullName.includes(query) || 
      bio.includes(query) || 
      artistSpecialty.includes(query) || 
      artistLocation.includes(query)
    );
  });
  
  return (
    <Layout>
      <Helmet>
        <title>Explore Artists | EmviApp</title>
        <meta name="description" content="Discover talented beauty professionals on EmviApp" />
      </Helmet>
      
      <section className="bg-gradient-to-b from-background to-muted/20 py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Explore Beauty Artists
            </h1>
            <p className="text-muted-foreground text-lg">
              Khám phá những nghệ sĩ làm đẹp nổi bật nhất gần bạn
            </p>
          </div>
          
          <ArtistSearchFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            specialty={specialty}
            setSpecialty={setSpecialty}
            sortBy={sortBy}
            setSortBy={setSortBy}
            location={location}
            setLocation={setLocation}
          />
          
          <ArtistGrid 
            artists={filteredArtists || []} 
            isLoading={isLoading} 
            error={error}
          />
        </div>
      </section>
    </Layout>
  );
};

export default ArtistDirectory;

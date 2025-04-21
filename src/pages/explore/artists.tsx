
import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet";
import ArtistSearchFilters from "@/components/explore/ArtistSearchFilters";
import ArtistGrid from "@/components/explore/ArtistGrid";
import SuggestedArtists from "@/components/artists/SuggestedArtists";
import { UserProfile } from "@/types/profile";
import { useAuth } from "@/context/auth";
import { useLocation } from "react-router-dom";

const categoryMap: Record<string, string[]> = {
  hair: ["hair stylist", "hair", "hairdresser", "barber"],
  nails: ["nail", "nail artist", "nail technician", "manicure", "pedicure"],
  massage: ["massage", "masseuse", "spa"],
  tattoo: ["tattoo", "tattoo artist"],
  brows: ["brow", "brows", "brow artist"],
  lashes: ["lash", "lashes", "lash artist", "lash technician"],
  skin: ["skin", "esthetician", "facial", "facials"],
  barber: ["barber", "haircut"],
};

function useQueryCategory(): string | null {
  // Get ?category=key from URL, lowercase it
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const cat = params.get("category");
  return cat ? cat.toLowerCase() : null;
}

const ArtistDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [sortBy, setSortBy] = useState("boosted");
  const [location, setLocation] = useState("");
  const { userRole } = useAuth();
  const urlCategory = useQueryCategory();

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
      if (error) throw new Error(error.message);
      return data as unknown as UserProfile[];
    }
  });
  
  // On a category page, filter by the mapped specialties:
  const filteredArtists = useMemo(() => {
    if (!artists) return [];
    let list = artists;
    // URL-based filtering (takes priority)
    if (urlCategory && categoryMap[urlCategory]) {
      list = artists.filter(a => {
        // specialty is user entered, try to match against map.
        const spec = (a.specialty || "").toLowerCase();
        // some artists may have multiple specialties comma separated
        return categoryMap[urlCategory].some(keyword =>
          spec.includes(keyword)
        );
      });
    }
    // Also filter by searchQuery if present
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      list = list.filter(artist => {
        const fullName = artist.full_name?.toLowerCase() || "";
        const bio = artist.bio?.toLowerCase() || "";
        const artistSpecialty = artist.specialty?.toLowerCase() || "";
        const artistLocation = typeof artist.location === 'string'
          ? artist.location.toLowerCase() 
          : artist.location?.address?.toLowerCase() || "";
        return (
          fullName.includes(query) || 
          bio.includes(query) || 
          artistSpecialty.includes(query) || 
          artistLocation.includes(query)
        );
      })
    }
    return list;
  }, [artists, urlCategory, searchQuery]);
  
  const showSuggestions = userRole !== 'artist' && 
                         userRole !== 'freelancer' && 
                         userRole !== 'nail technician/artist';

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
            {urlCategory && (
              <div className="mt-2 text-primary font-semibold">
                Showing results for&nbsp;
                <span className="capitalize">{urlCategory.replace("-", " ")}</span>
              </div>
            )}
          </div>
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-9">
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
              {filteredArtists.length === 0 && !isLoading && !error ? (
                <div className="p-8 bg-gray-50 text-gray-500 rounded-lg text-center font-medium">
                  No artists found in this category yet.
                </div>
              ) : (
                <ArtistGrid 
                  artists={filteredArtists || []}
                  isLoading={isLoading} 
                  error={error}
                />
              )}
            </div>
            {showSuggestions && (
              <div className="md:col-span-3">
                <SuggestedArtists className="sticky top-20" />
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ArtistDirectory;


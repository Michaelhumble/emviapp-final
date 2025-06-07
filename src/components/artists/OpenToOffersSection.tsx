
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Sparkles, MessageCircle, Clock, Briefcase } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/types/profile";
import { OpenToOffersData } from "../dashboard/artist/components/OpenToOffersModal";
import { Link } from "react-router-dom";

interface OpenToOffersArtist extends UserProfile {
  offers_data: OpenToOffersData;
  spotlight_until?: string;
}

const OpenToOffersSection = () => {
  const [artists, setArtists] = useState<OpenToOffersArtist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOpenArtists = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('open_to_offers', true)
          .in('role', ['artist', 'nail technician/artist'])
          .order('created_at', { ascending: false })
          .limit(20);

        if (error) throw error;

        const transformedArtists = (data || [])
          .filter(artist => artist.offers_data)
          .map(artist => ({
            ...artist,
            offers_data: artist.offers_data as OpenToOffersData
          })) as OpenToOffersArtist[];

        // Sort spotlighted artists first
        const sortedArtists = transformedArtists.sort((a, b) => {
          const aSpotlighted = a.spotlight_until && new Date(a.spotlight_until) > new Date();
          const bSpotlighted = b.spotlight_until && new Date(b.spotlight_until) > new Date();
          
          if (aSpotlighted && !bSpotlighted) return -1;
          if (!aSpotlighted && bSpotlighted) return 1;
          return 0;
        });

        setArtists(sortedArtists);
      } catch (error) {
        console.error('Error fetching open artists:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOpenArtists();
  }, []);

  const handleSendOffer = (artistId: string) => {
    // This would typically open a chat or contact modal
    console.log('Sending offer to artist:', artistId);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-muted rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                  <div className="h-3 bg-muted rounded w-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (artists.length === 0) {
    return (
      <div className="text-center py-12">
        <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Artists Currently Open</h3>
        <p className="text-muted-foreground">
          Check back soon as talented artists join our platform daily!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Briefcase className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Open to Offers</h2>
        <Badge variant="outline" className="text-xs">
          {artists.length} Available
        </Badge>
      </div>

      <div className="space-y-4">
        {artists.map((artist) => {
          const isSpotlighted = artist.spotlight_until && 
            new Date(artist.spotlight_until) > new Date();
          
          return (
            <Card 
              key={artist.id} 
              className={`transition-all hover:shadow-md ${
                isSpotlighted ? 'ring-2 ring-amber-200 bg-gradient-to-r from-amber-50/50 to-orange-50/50' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={artist.avatar_url || ""} alt={artist.full_name || ""} />
                      <AvatarFallback>
                        {artist.full_name?.charAt(0) || "A"}
                      </AvatarFallback>
                    </Avatar>
                    {isSpotlighted && (
                      <div className="absolute -top-1 -right-1">
                        <Sparkles className="h-4 w-4 text-amber-500" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {artist.full_name || "Artist"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {artist.specialty || "Nail Artist"}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {isSpotlighted && (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300 text-xs">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          Available
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <h4 className="font-medium text-sm mb-1">
                        {artist.offers_data.headline}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {artist.offers_data.bio}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      {artist.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{artist.location}</span>
                        </div>
                      )}
                      {artist.offers_data.preferredHours && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{artist.offers_data.preferredHours}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleSendOffer(artist.id)}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Send Offer
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/u/${artist.id}`}>
                          View Profile
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default OpenToOffersSection;

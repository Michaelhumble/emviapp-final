
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin, Award, Sparkles, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/hooks/useTranslation";
import ProAccessGate from "@/components/pro-access/ProAccessGate";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserProfile } from "@/types/profile";
import { useSuggestedArtists } from "@/hooks/useSuggestedArtists";

const TopLocalArtists = () => {
  const { user, userProfile } = useAuth();
  const { t } = useTranslation();
  const { suggestedArtists, isLoading } = useSuggestedArtists();
  
  // Display only the top 4 artists
  const displayedArtists = suggestedArtists.slice(0, 4);
  
  // Tooltip content based on language preference
  const tooltipText = userProfile?.preferred_language?.toLowerCase() === 'vietnamese' 
    ? "Nâng cấp để tiếp cận và mời họ về tiệm bạn"
    : "Upgrade to Emvi Pro to contact top artists in your area";
  
  // Artist rating mock - would be from actual reviews in production
  const getArtistRating = (artistId: string): number => {
    // Using a deterministic random based on the ID for demonstration
    const hash = artistId.split('').reduce((a, b) => {
      return a + b.charCodeAt(0);
    }, 0);
    
    // Rating between 4.0 and 5.0
    return 4 + (hash % 10) / 10;
  };
  
  // Artist display component
  const ArtistCard = ({ artist }: { artist: UserProfile }) => (
    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
      <Avatar className="h-12 w-12 border border-primary/10">
        <AvatarImage src={artist.avatar_url || ""} alt={artist.full_name || "Artist"} />
        <AvatarFallback className="bg-primary/5 text-primary">
          {artist.full_name?.substring(0, 2) || "NA"}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{artist.full_name}</p>
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground truncate">
            {artist.specialty || 'Nail Artist'}
          </span>
          
          {artist.boosted_until && new Date(artist.boosted_until) > new Date() && (
            <Badge variant="outline" className="text-[0.65rem] py-0 px-1 border-amber-300 text-amber-600 bg-amber-50">
              <Sparkles className="h-2.5 w-2.5 mr-0.5" />
              Pro
            </Badge>
          )}
        </div>
      </div>
      
      <div className="flex flex-col items-end">
        <div className="flex items-center text-amber-500">
          <Award className="h-3 w-3" />
          <span className="text-xs font-medium ml-0.5">{getArtistRating(artist.id)}</span>
        </div>
        <span className="text-[0.65rem] text-muted-foreground">
          {artist.location?.split(',')[0] || 'Local'}
        </span>
      </div>
    </div>
  );
  
  // Show loading indicators or empty state if needed
  const renderArtistList = () => {
    if (isLoading) {
      return (
        <div className="space-y-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex items-center gap-3 p-2 animate-pulse">
              <div className="h-12 w-12 rounded-full bg-muted"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    if (displayedArtists.length === 0) {
      return (
        <div className="text-center py-6">
          <Camera className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">{t("No artists found in your area yet")}</p>
          <p className="text-xs text-muted-foreground mt-1">{t("Check back soon as our network grows!")}</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-1">
        {displayedArtists.map(artist => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    );
  };
  
  return (
    <Card className="border-amber-100">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-1">
          <CardTitle className="text-lg flex items-center">
            <MapPin className="h-5 w-5 text-amber-500 mr-2" />
            {t("Top Artists Near You")}
          </CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          {t("View top-rated freelancers and rising stars in your area.")}
          <span className="text-[0.65rem] block mt-0.5">
            {userProfile?.preferred_language?.toLowerCase() === 'vietnamese' 
              ? "Xem những nghệ sĩ hàng đầu gần bạn"
              : ""}
          </span>
        </p>
      </CardHeader>
      
      <CardContent>
        <ProAccessGate tooltipText={tooltipText}>
          <div className="space-y-4">
            {renderArtistList()}
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full border-dashed border-primary/30 text-primary"
            >
              {t("View all top artists in your area")}
              <MapPin className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        </ProAccessGate>
      </CardContent>
    </Card>
  );
};

export default TopLocalArtists;

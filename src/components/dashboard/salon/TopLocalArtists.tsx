
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useTranslation } from "@/hooks/useTranslation";
import ProAccessGate from "@/components/pro-access/ProAccessGate";
import { useSuggestedArtists } from "@/hooks/useSuggestedArtists";
import ArtistList from "./artists/ArtistList";
import CardDescription from "./artists/CardDescription";
import { useArtistRating } from "./artists/useArtistRating";

const TopLocalArtists = () => {
  const { userProfile } = useAuth();
  const { t } = useTranslation();
  const { suggestedArtists, isLoading } = useSuggestedArtists();
  const { getArtistRating } = useArtistRating();
  
  // Display only the top 4 artists
  const displayedArtists = suggestedArtists.slice(0, 4);
  
  // Tooltip content based on language preference
  const tooltipText = userProfile?.preferred_language?.toLowerCase() === 'vietnamese' 
    ? "Nâng cấp để tiếp cận và mời họ về tiệm bạn"
    : "Upgrade to Emvi Pro to contact top artists in your area";
  
  return (
    <Card className="border-amber-100">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <MapPin className="h-5 w-5 text-amber-500 mr-2" />
          {t({
            english: "Top Artists Near You",
            vietnamese: "Nghệ Sĩ Hàng Đầu Gần Bạn"
          })}
        </CardTitle>
        <CardDescription />
      </CardHeader>
      
      <CardContent>
        <ProAccessGate tooltipText={tooltipText}>
          <ArtistList 
            displayedArtists={displayedArtists}
            isLoading={isLoading}
            getArtistRating={getArtistRating}
          />
        </ProAccessGate>
      </CardContent>
    </Card>
  );
};

export default TopLocalArtists;

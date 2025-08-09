import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PremiumContactGate from "@/components/common/PremiumContactGate";
import { Badge } from "@/components/ui/badge";
import { User2, MapPin } from "lucide-react";
import React from "react";

export interface ArtistForHireCardProps {
  name?: string | null;
  specialties?: string | null; // e.g., Nails, Hair, Lashes, Makeup, Massage, Skin
  location?: string | null;  // City, State
  headline?: string | null;  // "Available for Work", etc.
  available?: boolean;       // availability flag
  viewMode: "public" | "signedIn"; // affects status badge color/text
}

const StatusBadge: React.FC<{ available?: boolean; viewMode: "public" | "signedIn" }> = ({ available, viewMode }) => {
  const isAvailable = viewMode === "signedIn" && !!available;
  const label = viewMode === "signedIn" ? (isAvailable ? "Available now" : "Unavailable") : "Recently hired";
  const cls = isAvailable
    ? "bg-green-600/90 text-white"
    : "bg-muted text-muted-foreground";
  return <Badge className={cls}>{label}</Badge>;
};

const ArtistForHireCard: React.FC<ArtistForHireCardProps> = ({
  name,
  specialties,
  location,
  headline,
  available,
  viewMode,
}) => {
  const hasName = !!(name && name.trim().length > 0);

  return (
    <Card className="border-muted overflow-hidden">
      <div className="relative">
        <CardHeader className="flex flex-row items-center gap-3 pb-2">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            <User2 className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg truncate">
              {hasName ? name : (specialties || "Beauty Professional")}
            </CardTitle>
            <div className="text-sm text-muted-foreground truncate">
              {hasName ? (specialties || "Beauty Professional") : (location || "")}
            </div>
          </div>
          <StatusBadge available={available} viewMode={viewMode} />
        </CardHeader>

        {viewMode === "public" && (
          <div className="absolute inset-0 backdrop-blur-[1px]" aria-hidden="true" />
        )}
      </div>

      <CardContent className="space-y-3">
        {location && (
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="truncate">{location}</span>
          </div>
        )}
        {headline && (
          <p className="text-sm leading-relaxed text-foreground/80">{headline}</p>
        )}

        {viewMode === "public" ? (
          <div className="mt-2 text-xs text-muted-foreground">Check back soon or post a job to hire faster.</div>
        ) : (
          <PremiumContactGate>
            <div className="mt-2 text-sm text-muted-foreground">Contact: ••• ••• ••••</div>
          </PremiumContactGate>
        )}
      </CardContent>
    </Card>
  );
};

export default ArtistForHireCard;

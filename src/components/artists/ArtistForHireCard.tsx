import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PremiumContactGate from "@/components/common/PremiumContactGate";
import { Badge } from "@/components/ui/badge";
import { User2, MapPin, Lock } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export interface ArtistForHireCardProps {
  id?: string;
  name?: string | null;
  specialties?: string | null; // e.g., Nails, Hair, Lashes, Makeup, Massage, Skin
  location?: string | null;  // City, State
  headline?: string | null;  // "Available for Work", etc.
  available?: boolean;       // availability flag
  years_experience?: number | null;
  hourly_rate?: number | null;
  profileId?: string; // explicit routing id
  viewMode: "public" | "signedIn"; // affects status badge color/text
  theme?: 'default' | 'blue';
  hidePhoto?: boolean;
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
  id,
  name,
  specialties,
  location,
  headline,
  available,
  years_experience,
  hourly_rate,
  profileId,
  viewMode,
  theme = 'default',
  hidePhoto = false,
}) => {
  const hasName = !!(name && name.trim().length > 0);
  const displayTitle = headline || (hasName ? name! : specialties || 'Beauty Professional');
  const initials = (hasName ? name! : (specialties || 'Artist'))
    .split(' ')
    .filter(Boolean)
    .map(p => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const profileHref = `/artists/${profileId || id || ''}`;
  const isBlue = theme === 'blue';

  return (
    <Card 
      className={`${isBlue ? 'rounded-2xl border-primary/20 bg-primary/5 hover:bg-primary/10 transition' : 'border-muted'} overflow-hidden`}
      aria-label={`Artist profile — ${displayTitle}`}
    >
      <div className="relative">
        <CardHeader className="flex flex-row items-center gap-3 pb-2">
          <div className={`h-12 w-12 rounded-full flex items-center justify-center ${isBlue ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
            {hidePhoto ? (
              <span className="font-semibold">{initials}</span>
            ) : (
              <User2 className="h-6 w-6" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className={`text-lg truncate ${isBlue ? 'text-primary' : ''}`}>
              {displayTitle}
            </CardTitle>
            <div className="text-sm text-muted-foreground truncate">
              {location || (hasName ? (specialties || 'Beauty Professional') : '')}
            </div>
          </div>
          <StatusBadge available={available} viewMode={viewMode} />
        </CardHeader>
      </div>

      <CardContent className="space-y-3">
        {/* Meta */}
        {(location || years_experience || hourly_rate) && (
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {location && (
              <span className="inline-flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="truncate">{location}</span>
              </span>
            )}
            {typeof years_experience === 'number' && (
              <span>{years_experience}+ yrs</span>
            )}
            {typeof hourly_rate === 'number' && (
              <span>${'{'}hourly_rate{'}'}/hr</span>
            )}
          </div>
        )}

        {/* Specialties chips */}
        {specialties && (
          <div className="flex flex-wrap gap-2">
            {specialties.split(',').map((s, i) => (
              <span 
                key={i}
                className={`text-xs rounded-full px-2 py-0.5 ${isBlue ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}
              >
                {s.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <Link to={profileHref} className={`${isBlue ? 'text-primary' : 'text-foreground'} text-sm underline underline-offset-4`}>
            View Profile
          </Link>
          <PremiumContactGate>
            <div className="text-sm flex items-center gap-2 text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span>Contact details are available to verified employers.</span>
            </div>
          </PremiumContactGate>
        </div>

        {/* Gate copy */}
        <div className="text-xs text-muted-foreground">
          <span>Sign in to request access.</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistForHireCard;

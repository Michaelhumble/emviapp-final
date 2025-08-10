import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PremiumContactGate from "@/components/common/PremiumContactGate";
import { Badge } from "@/components/ui/badge";
import { User2, MapPin, Lock } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import type { ArtistForHireProfile } from "@/hooks/artist/useArtistForHire";
import type { ArtistListItem } from "@/hooks/useOptimizedArtistsData";

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
  // Added minimal variant support and gating flag (no behavioral change by default)
  variant?: 'default' | 'blueMinimal';
  contactGated?: boolean;
  // New: allow passing the full artist object directly
  artist?: ArtistForHireProfile | ArtistListItem;
  // Display controls
  showHeadline?: boolean;
  showExperience?: boolean;
  showSpecialties?: boolean;
  showRate?: boolean;
  showLocation?: boolean;
  showAvailability?: boolean;
  showBio?: boolean;
}

const StatusBadge: React.FC<{ available?: boolean; show?: boolean; isVietnamese: boolean }> = ({ available, show = true, isVietnamese }) => {
  if (!show || !available) return null;
  const label = isVietnamese ? 'Có thể nhận việc' : 'Available now';
  return <Badge className="bg-green-600/90 text-white">{label}</Badge>;
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
  variant = 'default',
  contactGated,
  artist,
  showHeadline = true,
  showExperience = true,
  showSpecialties = true,
  showRate = true,
  showLocation = true,
  showAvailability = true,
  showBio = true,
}) => {
  const { isVietnamese } = useTranslation();
  
  // Derive fields from provided artist object if present
  const source: any = artist || {};

  const effectiveId = id ?? profileId ?? source.user_id ?? source.id;
  const effectiveName = name ?? source.full_name ?? undefined;
  const effectiveHeadline = headline ?? source.headline ?? undefined;
  const effectiveSpecialties = specialties ?? source.specialties ?? undefined;
  const effectiveLocation = location ?? source.location ?? undefined;
  const effectiveAvailable = typeof available === 'boolean' ? available : (source.available_for_work as boolean | undefined);
  const effectiveYears = typeof years_experience === 'number'
    ? years_experience
    : (typeof source.years_experience === 'number' ? source.years_experience : parseInt(source.years_experience || '', 10)) || undefined;
  const effectiveRate = typeof hourly_rate === 'number'
    ? hourly_rate
    : (typeof source.hourly_rate === 'number' ? source.hourly_rate : parseInt(source.hourly_rate || '', 10)) || undefined;

  const hasName = !!(effectiveName && (effectiveName as string).trim().length > 0);
  const displayTitle = effectiveHeadline || (hasName ? (effectiveName as string) : effectiveSpecialties || 'Beauty Professional');
  const initials = (hasName ? (effectiveName as string) : (effectiveSpecialties || 'Artist'))
    .split(' ')
    .filter(Boolean)
    .map(p => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const profileHref = `/artists/${effectiveId || ''}`;
  const isBlue = theme === 'blue' || variant === 'blueMinimal';

  // Bio teaser
  const bioRaw = typeof source.bio === 'string' ? source.bio : '';
  const bioTeaser = bioRaw.trim();
  const limitedBio = bioTeaser.length > 140 ? `${bioTeaser.slice(0, 140).trimEnd()}…` : bioTeaser;

  return (
    <Card 
      className={`${isBlue ? 'rounded-2xl border-primary/20 bg-primary/5 hover:bg-primary/10 transition' : 'border-muted'} overflow-hidden`}
      aria-label={`Artist profile — ${displayTitle}`}
    >
      <div className="relative">
        <CardHeader className={`flex flex-row items-center gap-3 pb-2 ${variant === 'blueMinimal' ? 'py-3' : ''}`}>
          <div className={`h-12 w-12 rounded-full flex items-center justify-center ${isBlue ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
            {(hidePhoto || variant === 'blueMinimal') ? (
              <span role="img" aria-label={`Artist profile – ${displayTitle}`} className="font-semibold">{initials}</span>
            ) : (
              <User2 className="h-6 w-6" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className={`text-lg truncate ${isBlue ? 'text-primary' : ''}`}>
              {displayTitle}
            </CardTitle>
            <div className="text-sm text-muted-foreground truncate">
              {effectiveLocation || (hasName ? (effectiveSpecialties || 'Beauty Professional') : '')}
            </div>
          </div>
          <StatusBadge available={effectiveAvailable} show={showAvailability} isVietnamese={isVietnamese} />
        </CardHeader>
      </div>

      <CardContent className="space-y-3">
        {/* Meta */}
        {((showLocation && !!effectiveLocation) || (showExperience && typeof effectiveYears === 'number') || (showRate && typeof effectiveRate === 'number') || (showAvailability && !!source.shifts_available)) && (
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {showLocation && effectiveLocation && (
              <span className="inline-flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="truncate">{effectiveLocation}</span>
              </span>
            )}
            {showExperience && typeof effectiveYears === 'number' && (
              <span>{effectiveYears}+ yrs</span>
            )}
            {showRate && typeof effectiveRate === 'number' && (
              <span>${'{'}effectiveRate{'}'}/hr</span>
            )}
            {showAvailability && source.shifts_available && (
              <span className="inline-flex items-center">{String(source.shifts_available)}</span>
            )}
          </div>
        )}

        {/* Specialties chips */}
        {showSpecialties && effectiveSpecialties && (
          <div className="flex flex-wrap gap-2">
            {String(effectiveSpecialties).split(',').slice(0, 3).map((s, i) => (
              <span 
                key={i}
                className={`text-xs rounded-full px-2 py-0.5 ${isBlue ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}
              >
                {s.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Bio teaser */}
        {showBio && limitedBio && (
          <p className="text-sm text-muted-foreground">{limitedBio}</p>
        )}
        <div className="flex items-center justify-between pt-2">
          <Link to={profileHref} className={`${isBlue ? 'text-primary' : 'text-foreground'} text-sm underline underline-offset-4`} aria-label={isVietnamese ? 'Xem hồ sơ' : 'View Profile'}>
            {isVietnamese ? 'Xem hồ sơ' : 'View Profile'}
          </Link>
          {contactGated ? (
            <PremiumContactGate>
              <Button size="sm" variant="outline" className={`${isBlue ? 'border-primary/30' : ''}`}
                onClick={() => {
                  try {
                    window.dispatchEvent(new CustomEvent('ArtistsContactRequested', { detail: { artistId: effectiveId } }));
                  } catch {}
                }}
              >
                <Lock className="h-4 w-4 mr-1" />
                {isVietnamese ? 'Yêu cầu liên hệ' : 'Request Contact'}
              </Button>
            </PremiumContactGate>
          ) : null}
        </div>

        {/* Gate copy */}
        {contactGated && (
          <div className="text-xs text-muted-foreground">
            <span>{isVietnamese ? 'Đăng nhập để yêu cầu quyền truy cập.' : 'Sign in to request access.'}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ArtistForHireCard;
export { ArtistForHireCard };

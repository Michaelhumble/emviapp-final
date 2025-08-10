import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { useOptimizedArtistsData } from "@/hooks/useOptimizedArtistsData";
import { ArtistForHireCard } from "@/components/artists/ArtistForHireCard";
import { useAuth } from "@/context/auth";
import { Link } from "react-router-dom";
import { getUiFlag } from "@/config/premiumFeatures";
import { useEffect } from "react";
import { track } from "@/lib/telemetry";

const ArtistsForHireStrip = () => {
  const { isSignedIn } = useAuth();
  const { artists, loading } = useOptimizedArtistsData({ isSignedIn, limit: 8 });
  const hidePhotos = getUiFlag('ARTISTS_HIDE_PHOTOS');
  const theme = getUiFlag('ARTISTS_CARD_THEME');

  useEffect(() => {
    if (artists && artists.length > 0) {
      track('artists_strip_impression', { count: artists.length });
    }
  }, [artists]);

  const items = artists ?? [];

  return (
    <section className="py-12 bg-background">
      <Container>
        <div className="text-center mb-10">
          <h2 className="font-playfair text-3xl font-bold mb-2">
            Artists Available for Hire
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            {isSignedIn
              ? "Browse currently available artists across the U.S."
              : "These artists were just hired. Sign in free to see who’s available today."}
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/artists">
              <Button variant="outline">View All Artists</Button>
            </Link>
          </div>
        </div>

        <Card className="border-muted">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-medium">
              {isSignedIn ? "Currently Available" : "Recently Hired"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="bg-muted rounded-lg border p-6 animate-pulse h-[220px]" />
                ))}
              </div>
            ) : items.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.slice(0, 6).map((a) => (
                  <ArtistForHireCard
                    key={a.user_id || a.id}
                    name={undefined}
                    specialties={a.specialties ?? undefined}
                    location={a.location ?? undefined}
                    headline={a.headline ?? undefined}
                    available={!!a.available_for_work}
                    viewMode={isSignedIn ? "signedIn" : "public"}
                    theme="blue"
                    hidePhoto
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No artists available yet.
              </div>
            )}
          </CardContent>
        </Card>
      </Container>
    </section>
  );
};

export default ArtistsForHireStrip;

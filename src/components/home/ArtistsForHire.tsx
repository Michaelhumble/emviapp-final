import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/context/auth";
import { Link } from "react-router-dom";
import { useOptimizedArtistsData } from "@/hooks/useOptimizedArtistsData";
import ArtistForHireCard from "@/components/artists/ArtistForHireCard";
import { Badge } from "@/components/ui/badge";
import { showDemoBadges } from "@/demo/demoFlags";

const ArtistsForHire = () => {
  const { isSignedIn } = useAuth();
  const { artists, loading } = useOptimizedArtistsData({ isSignedIn, limit: 6 });

  return (
    <section className="py-12 bg-background">
      <Container>
        <div className="text-center mb-10">
          <h2 className="font-playfair text-3xl font-bold mb-2">Available Artists</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            {isSignedIn
              ? "Browse currently available artists across the U.S."
              : "These artists were recently hired. Sign in free to see who’s available today."}
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/artists">
              <Button variant="outline">View All</Button>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map((i) => (
                  <div key={i} className="bg-muted rounded-lg border p-6 animate-pulse h-[180px]" />
                ))}
              </div>
            ) : artists.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {artists.map((a: any) => (
                  <div key={a.user_id} className="space-y-2">
                    <ArtistForHireCard
                      key={a.user_id}
                      name={undefined}
                      specialties={a.specialties}
                      location={a.location}
                      headline={a.headline}
                      available={!!a.available_for_work}
                      viewMode={isSignedIn ? "signedIn" : "public"}
                    />
                    {showDemoBadges() && a.__demo && (
                      <div className="flex justify-end">
                        <Badge variant="secondary" className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-foreground/70">Demo</Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {isSignedIn ? (
                  <div>No artists available yet — post a job and we’ll notify matches.</div>
                ) : (
                  <div>No artists to display yet — sign in to see who’s available.</div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </Container>
    </section>
  );
};

export default ArtistsForHire;

import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/context/auth";
import { useOptimizedArtistsData } from "@/hooks/useOptimizedArtistsData";
import ArtistForHireCard from "@/components/artists/ArtistForHireCard";

const Artists = () => {
  const { isSignedIn } = useAuth();
  const { artists, loading } = useOptimizedArtistsData({ isSignedIn, limit: 20 });

  return (
    <Layout>
      <Helmet>
        <title>Artists Available for Hire | EmviApp</title>
        <meta name="description" content="Browse talented beauty professionals across the U.S. Sign in to see who’s available now." />
        <link rel="canonical" href="/artists" />
      </Helmet>

      <section className="py-12">
        <Container>
          <header className="mb-6 text-center">
            <h1 className="font-playfair text-3xl font-bold">Artists Available for Hire</h1>
            <p className="text-muted-foreground mt-2">
              {isSignedIn
                ? "You’re seeing artists available now. Message or post a job to hire faster."
                : "These artists were recently hired. Sign in free to see who’s available today."}
            </p>
          </header>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-muted rounded-lg border p-6 animate-pulse h-[180px]" />
              ))}
            </div>
          ) : artists.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artists.map((a) => (
                <ArtistForHireCard
                  key={a.user_id}
                  name={undefined}
                  specialties={a.specialties}
                  location={a.location}
                  headline={a.headline}
                  available={!!a.available_for_work}
                  viewMode={isSignedIn ? "signedIn" : "public"}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              {isSignedIn ? (
                <div>No one available yet — post a job and we’ll notify matches.</div>
              ) : (
                <div>Nothing to show yet — sign in to see who’s available.</div>
              )}
            </div>
          )}
        </Container>
      </section>
    </Layout>
  );
};

export default Artists;

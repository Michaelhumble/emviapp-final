import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/context/auth";
import { useArtistsForHireList } from "@/hooks/useOptimizedArtistsData";
import { ArtistForHireCard } from "@/components/artists/ArtistForHireCard";

const Artists = () => {
  const { isSignedIn } = useAuth();
  const { artists, loading } = useArtistsForHireList({ isSignedIn, limit: 24 });
  const items = artists ?? [];

  return (
    <Layout>
      <Helmet>
        <title>Artists Available for Hire | EmviApp</title>
        <meta name="description" content="Browse talented beauty professionals across the U.S. Sign in to see who’s available now." />
        <link rel="canonical" href={`${window.location.origin}/artists`} />
      </Helmet>

      {/* Hero styled like Blog page */}
      <section className="relative w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 via-purple-600/30 to-indigo-800/40"></div>
          <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-pink-400/15 via-purple-500/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-amber-300/15 via-pink-400/20 to-transparent rounded-full blur-3xl"></div>
        </div>
        <Container className="relative z-10 py-14 md:py-18">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm mx-auto bg-primary/10 text-primary border-primary/20">
              <span>AI-Verified Artists</span>
            </div>
            <h1 className="mt-4 font-playfair text-4xl md:text-6xl font-bold tracking-tight text-white">
              Artists Available for Hire
            </h1>
            <p className="mt-3 text-white/85 text-base md:text-lg">
              {isSignedIn
                ? "You’re seeing artists available now. Message or post a job to hire faster."
                : "These artists were recently hired. Sign in free to see who’s available today."}
            </p>
          </div>
        </Container>
      </section>

      {/* Artists grid */}
      <section className="py-12">
        <Container>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-muted rounded-lg border p-6 animate-pulse h-[220px]" />
              ))}
            </div>
          ) : items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((a) => (
                <ArtistForHireCard
                  key={a.user_id || a.id}
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

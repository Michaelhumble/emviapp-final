import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/context/auth";
import { ArtistForHireCard } from "@/components/artists/ArtistForHireCard";
import { Button } from "@/components/ui/button";
import ArtistsFilters from "@/components/artists/ArtistsFilters";
import { useArtistsSearch } from "@/hooks/useArtistsSearch";
import { useMemo } from "react";

const Artists = () => {
  const { isSignedIn } = useAuth();
  const { items, loading, hasMore, loadMore, filters, setFilters, specialtyChips, featured } = useArtistsSearch({ available: true });

  const jsonLd = useMemo(() => {
    const firstTen = items.slice(0, 10);
    const itemListElement = firstTen.map((a, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Person",
        name: a.headline || undefined,
        jobTitle: a.headline || undefined,
        areaServed: a.location || undefined,
      },
    }));
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement,
    } as any;
  }, [items]);

  return (
    <Layout>
      <Helmet>
        <title>Artists for Hire | EmviApp</title>
        <meta name="description" content="Browse verified beauty professionals and hire fast. Real profiles, contact gated for verified employers." />
        <link rel="canonical" href={`${window.location.origin}/artists`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 via-purple-600/30 to-indigo-800/40"></div>
          <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-pink-400/15 via-purple-500/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-amber-300/15 via-pink-400/20 to-transparent rounded-full blur-3xl"></div>
        </div>
        <Container className="relative z-10 py-14 md:py-18">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="mt-2 font-playfair text-4xl md:text-6xl font-bold tracking-tight text-white">
              Top Vietnamese Beauty Pros — Available Now
            </h1>
            <p className="mt-3 text-white/85 text-base md:text-lg">
              Real artists, verified profiles. Contact details for verified employers.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <a href="#artists-grid">
                <Button size="lg" variant="default">Hire Talent</Button>
              </a>
              <a href="/dashboard/profile">
                <Button size="lg" variant="outline" className="backdrop-blur">Create Free Profile</Button>
              </a>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm mx-auto bg-white/10 text-white border-white/20">
              <span>4.9 avg rating • 10K+ pros • 50+ cities</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Sticky Filters */}
      <ArtistsFilters
        q={filters.q}
        location={filters.location}
        specialty={filters.specialty}
        available={filters.available}
        vietnamese={filters.vietnamese}
        sort={filters.sort}
        onChange={setFilters as any}
        specialtyChips={specialtyChips}
      />

      {/* Featured Pros (optional) */}
      {featured.length > 0 && (
        <section className="py-10 bg-gradient-to-br from-slate-50 via-white to-purple-50/40">
          <Container>
            <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-gray-200/50 shadow-xl p-6 md:p-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-playfair font-bold">Featured Pros</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featured.map((a) => (
                  <ArtistForHireCard
                    key={(a as any).user_id || (a as any).id}
                    artist={a as any}
                    viewMode={isSignedIn ? "signedIn" : "public"}
                    theme="blue"
                    hidePhoto
                    contactGated
                  />
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Artists Grid */}
      <section className="py-12 bg-gradient-to-b from-white to-purple-50/30" id="artists-grid">
        <Container>
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/60 p-6 md:p-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-playfair font-bold">Available Now</h2>
            </div>
            {loading && items.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-muted rounded-lg border p-6 animate-pulse h-[220px]" />
                ))}
              </div>
            ) : items.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {items.map((a) => (
                    <ArtistForHireCard
                      key={(a as any).user_id || (a as any).id}
                      artist={a as any}
                      viewMode={isSignedIn ? "signedIn" : "public"}
                      theme="blue"
                      hidePhoto
                      contactGated
                      variant="blueMinimal"
                    />
                  ))}
                </div>
                {hasMore && (
                  <div className="text-center mt-8">
                    <Button onClick={loadMore} disabled={loading} variant="outline">
                      {loading ? "Loading..." : "Load more"}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                {isSignedIn ? (
                  <div>No one available yet — post a job and we will notify matches.</div>
                ) : (
                  <div>Nothing to show yet — sign in to see who is available.</div>
                )}
                <div className="mt-4">
                  <a href="/dashboard/profile">
                    <Button>Create Free Profile</Button>
                  </a>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Social Proof band */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-purple-50/40 py-10">
        <Container>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border p-6 shadow">
              <h3 className="font-playfair text-xl font-bold mb-2">Success Stories That Prove It Works</h3>
              <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                <li>Verified employers connect with top artists in days</li>
                <li>AI-suggested matches improve response rates</li>
                <li>Private contact sharing protects artists</li>
              </ul>
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border p-6 shadow">
              <h3 className="font-playfair text-xl font-bold mb-2">Built for Fast, Quality Hiring</h3>
              <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                <li>Updated daily with actively available talent</li>
                <li>Filters for specialties, location, and experience</li>
                <li>Posting a job alerts matching artists</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA band */}
      <section className="py-12">
        <Container>
          <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-3xl border p-8 text-center">
            <h3 className="font-playfair text-2xl md:text-3xl font-bold">Need talent fast?</h3>
            <p className="text-muted-foreground mt-2">Post a job and we’ll notify matching artists within minutes.</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <a href="/post-job">
                <Button size="lg">Post a Job</Button>
              </a>
              <a href="/dashboard/profile">
                <Button size="lg" variant="outline">Create Free Artist Profile</Button>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default Artists;

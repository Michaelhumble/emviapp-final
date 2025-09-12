import React, { useMemo, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { useArtistById } from '@/hooks/useOptimizedArtistsData';
import { Button } from '@/components/ui/button';
import ArtistProfile from '@/components/artists/ArtistProfile';
import { ArtistForHireCard } from '@/components/artists/ArtistForHireCard';
import { useSuggestedArtists } from '@/hooks/useSuggestedArtists';
export default function ArtistDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { artist, loading } = useArtistById(id);
  const navigate = useNavigate();

  // artists-404-guard: Handle broken/missing artist profiles
  useEffect(() => {
    if (!loading && (!artist || !id)) {
      console.info('[Artists Redirect]', { 
        id, 
        reason: 'missing_or_wrong_role',
        found: !!artist 
      });
      
      // Redirect after brief delay for UX
      const redirectTimer = setTimeout(() => {
        window.location.replace('/artists');
      }, 1500);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [artist, loading, id]);

  const jsonLd = useMemo(() => {
    if (!artist) return null;
    const firstSkill = (artist.specialties || '').split(',').map(s=>s.trim()).filter(Boolean)[0];
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: artist.headline || 'Beauty Professional',
      jobTitle: firstSkill || 'Beauty Professional',
      address: artist.location || undefined,
      image: artist.avatar_url || undefined,
    } as any;
  }, [artist]);

  return (
    <Layout>
      <Helmet>
        {/* artists-404-guard: SEO handling for broken profiles */}
        {(!loading && !artist) ? (
          <>
            <title>Profile Unavailable | EmviApp</title>
            <meta name="description" content="This artist profile is no longer available. Browse all artists on EmviApp." />
            <meta name="robots" content="noindex, nofollow" />
            <link rel="canonical" href="https://www.emvi.app/artists" />
          </>
        ) : (
          <>
            <title>{artist?.headline ? `${artist.headline} — Artist Profile | EmviApp` : 'Artist Profile | EmviApp'}</title>
            <meta name="description" content={artist?.bio?.slice(0, 150) || 'View artist profile on EmviApp'} />
            <link rel="canonical" href={`https://www.emvi.app/artists/${id}`} />
            {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
          </>
        )}
      </Helmet>

      <section className="py-10">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="max-w-5xl mx-auto">
              <div className="h-24 w-24 rounded-full bg-muted animate-pulse" />
              <div className="mt-4 h-6 bg-muted w-64 animate-pulse rounded" />
            </div>
          ) : artist ? (
            <ArtistProfile artist={artist} />
          ) : (
            // artists-404-guard: Friendly redirect message
            <div className="text-center text-muted-foreground max-w-2xl mx-auto">
              <div className="bg-orange-50 p-8 rounded-lg border border-orange-100">
                <h2 className="text-2xl font-medium text-orange-600 mb-2">Profile Unavailable</h2>
                <p className="text-gray-600 mb-6">
                  This artist profile is no longer available or has been moved. You'll be redirected to browse all artists shortly.
                </p>
                <Button 
                  className="bg-orange-500 hover:bg-orange-600 text-white" 
                  onClick={() => window.location.replace('/artists')}
                >
                  Browse All Artists
                </Button>
              </div>
              
              {/* Quick discovery links while redirecting */}
              <nav aria-label="Browse artists" className="mt-8">
                <p className="text-sm text-gray-500 mb-3">Or explore by specialty:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  <a href="/artists" className="text-primary hover:underline">All Artists</a>
                  <a href="/nails" className="text-primary hover:underline">Nail Artists</a>
                  <a href="/hair" className="text-primary hover:underline">Hair Stylists</a>
                  <a href="/makeup" className="text-primary hover:underline">Makeup Artists</a>
                </div>
              </nav>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

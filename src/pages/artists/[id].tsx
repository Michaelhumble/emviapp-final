import React, { useMemo } from 'react';
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
        <title>{artist?.headline ? `${artist.headline} — Artist Profile | EmviApp` : 'Artist Profile | EmviApp'}</title>
        <meta name="description" content={artist?.bio?.slice(0, 150) || 'View artist profile on EmviApp'} />
        <link rel="canonical" href={`${window.location.origin}/artists/${id}`} />
        {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
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
            <div className="text-center text-muted-foreground">
              <p>Artist not found.</p>
              <Button className="mt-4" variant="outline" onClick={() => navigate('/artists')}>Back to Artists</Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

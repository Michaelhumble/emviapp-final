import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import ArtistForHireCard from '@/components/artists/ArtistForHireCard';
import { analytics } from '@/lib/analytics';

interface ArtistForHireProfile {
  id: string;
  user_id: string;
  headline: string | null;
  specialties: string | null;
  location: string | null;
  available_for_work: boolean | null;
  hourly_rate: string | null;
  avatar_url: string | null;
  years_experience: string | null;
  shifts_available: string | null;
  bio: string | null;
  updated_at: string | null;
}

const ArtistsForHireSection: React.FC = () => {
  const { isSignedIn } = useAuth();
  const [profiles, setProfiles] = useState<ArtistForHireProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('artist_for_hire_profiles')
          .select('id, user_id, headline, specialties, location, available_for_work, hourly_rate, avatar_url, years_experience, shifts_available, bio, updated_at')
          .eq('available_for_work', true)
          .order('updated_at', { ascending: false, nullsFirst: false })
          .limit(6);
        if (!mounted) return;
        if (error) {
          console.error('[ArtistsForHireSection] load error', error);
          setProfiles([]);
        } else {
          setProfiles(data ?? []);
        }
      } catch (e) {
        console.error('[ArtistsForHireSection] exception', e);
        if (mounted) setProfiles([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading || profiles.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <h2 className="text-xl font-semibold mb-4">Artists Available for Hire</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {profiles.map((p) => (
          <ArtistForHireCard
            key={p.id}
            name={undefined}
            headline={p.headline ?? undefined}
            specialties={p.specialties ?? undefined}
            location={p.location ?? undefined}
            available={Boolean(p.available_for_work)}
            viewMode={isSignedIn ? 'signedIn' : 'public'}
          />
        ))}
      </div>
    </section>
  );
};

export default ArtistsForHireSection;

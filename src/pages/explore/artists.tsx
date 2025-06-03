
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/context/auth/types';

const Artists = () => {
  const [artists, setArtists] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .in('role', ['artist', 'nail technician/artist'])
          .limit(20);

        if (error) throw error;

        // Transform data to UserProfile type with safe property access
        const transformedArtists: UserProfile[] = (data || []).map((artist: any) => ({
          id: artist.id,
          email: artist.email || '',
          full_name: artist.full_name || null,
          phone: artist.phone || null,
          role: artist.role || null,
          avatar_url: artist.avatar_url || null,
          specialty: artist.specialty || null,
          location: artist.location || null,
          bio: artist.bio || null,
          instagram: artist.instagram || null,
          website: artist.website || null,
          created_at: artist.created_at || null,
          updated_at: artist.updated_at || null,
          custom_role: artist.custom_role || null,
          contact_link: artist.contact_link || null,
          badges: artist.badges || null,
          accepts_bookings: artist.accepts_bookings || null,
          completed_profile_tasks: artist.completed_profile_tasks || null,
          portfolio_urls: artist.portfolio_urls || null,
          referral_code: artist.referral_code || null,
          credits: artist.credits || null,
          profile_views: artist.profile_views || null,
          booking_url: artist.booking_url || null,
          boosted_until: artist.boosted_until || null,
          salon_name: artist.salon_name || null,
          company_name: artist.company_name || null,
          professional_name: artist.professional_name || null,
          address: artist.address || null, // Safe property access
          years_experience: artist.years_experience || null,
          services: artist.services || null,
          gallery: artist.gallery || null,
          preferences: artist.preferences || null,
        }));

        setArtists(transformedArtists);
      } catch (error) {
        console.error('Error fetching artists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Find Artists</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map((artist) => (
            <div 
              key={artist.id} 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/artist/${artist.id}`)}
            >
              <div className="flex items-center mb-4">
                {artist.avatar_url ? (
                  <img 
                    src={artist.avatar_url} 
                    alt={artist.full_name || 'Artist'} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <span className="text-gray-500 font-semibold">
                      {artist.full_name?.charAt(0) || 'A'}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-lg">{artist.full_name || 'Unknown Artist'}</h3>
                  <p className="text-gray-600 text-sm">{artist.specialty || 'Nail Artist'}</p>
                </div>
              </div>
              
              {artist.bio && (
                <p className="text-gray-700 text-sm mb-3 line-clamp-2">{artist.bio}</p>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {artist.location || artist.address || 'Location not specified'}
                </span>
                {artist.accepts_bookings && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Available
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {artists.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No artists found. Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Artists;

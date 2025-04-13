
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users } from 'lucide-react';
import ProfileHeader from '@/components/artist-profile/ProfileHeader';
import PublicPortfolioViewer from '@/components/artist/portfolio/PublicPortfolioViewer';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';

const ArtistProfilePage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [viewCount, setViewCount] = useState<number | null>(null);
  const [portfolioImages, setPortfolioImages] = useState([]);
  
  // Check if the current user is a salon owner
  const isSalonOwner = false; // This would be determined by your auth context
  
  useEffect(() => {
    if (id) {
      fetchArtistProfile(id);
      fetchPortfolioImages(id);
    }
  }, [id]);
  
  const fetchArtistProfile = async (artistId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', artistId)
        .single();
      
      if (error) throw error;
      setProfile(data);
      
      // Track profile view
      // ...code for tracking profile view...
      
    } catch (error) {
      console.error('Error fetching artist profile:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchPortfolioImages = async (artistId: string) => {
    try {
      // Get list of files from the artist's folder
      const { data, error } = await supabase.storage
        .from('artist_portfolios')
        .list(`${artistId}`);
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        // Get public URLs for each file
        const formattedImages = data.map(file => {
          const { data: urlData } = supabase.storage
            .from('artist_portfolios')
            .getPublicUrl(`${artistId}/${file.name}`);
          
          return {
            id: file.id,
            url: urlData.publicUrl
          };
        });
        
        setPortfolioImages(formattedImages);
      }
    } catch (error) {
      console.error('Error fetching portfolio images:', error);
    }
  };
  
  const handleBooking = () => {
    // Booking logic would go here
    console.log('Book with artist:', id);
  };
  
  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto py-10 px-4">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-lg mb-6"></div>
          <div className="space-y-3">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!profile) {
    return (
      <div className="container max-w-4xl mx-auto py-10 px-4">
        <Card className="p-10 text-center">
          <h1 className="text-2xl font-semibold mb-4">Artist Not Found</h1>
          <p className="text-gray-500 mb-6">
            The artist profile you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <a href="/artists">Browse Artists</a>
          </Button>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <ProfileHeader 
        profile={profile}
        isSalonOwner={isSalonOwner}
        handleBooking={handleBooking}
        viewCount={viewCount}
      />
      
      <Tabs defaultValue="portfolio" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="portfolio" className="space-y-6">
          <PublicPortfolioViewer 
            images={portfolioImages}
            artistName={profile.full_name || 'Artist'}
          />
        </TabsContent>
        
        <TabsContent value="services">
          <Card className="p-6">
            <h2 className="text-xl font-serif mb-4">Services</h2>
            {/* Services content would go here */}
            <p className="text-gray-500">No services listed yet.</p>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews">
          <Card className="p-6">
            <h2 className="text-xl font-serif mb-4">Reviews</h2>
            {/* Reviews content would go here */}
            <p className="text-gray-500">No reviews yet.</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArtistProfilePage;


import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SalonDetailContent from '@/components/salons/SalonDetailContent';
import SalonListingCta from '@/components/salons/SalonListingCta';
import SalonNotFound from '@/components/salon/SalonNotFound';
import UniversalShareButton from '@/components/shared/UniversalShareButton';
import DynamicSEO from '@/components/seo/DynamicSEO';
import { Job } from '@/types/job';
import ListingRouteGuard from '@/components/common/ListingRouteGuard';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { fetchSalonById } from '@/utils/salonFetcher';

/**
 * Enhanced SalonDetailPage component with robust validation and a single data source
 */
const SalonDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [salon, setSalon] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSalon = async () => {
      if (!id) {
        setError(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { salon: salonData, error: hasError, validId } = await fetchSalonById(id);
        
        if (hasError || !validId) {
          setError(true);
          toast.error('This salon listing could not be found');
          navigate('/salon-not-found');
        } else {
          setSalon(salonData);
        }
      } finally {
        setLoading(false);
      }
    };

    loadSalon();
  }, [id, navigate]);

  // Enhanced loading state with skeleton
  const LoadingState = () => (
    <div className="container mx-auto py-12">
      <div className="flex flex-col items-center justify-center p-8">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
        <p className="text-lg text-muted-foreground">Loading salon details...</p>
      </div>
    </div>
  );

  // Back button component with share functionality
  const BackToListings = () => {
    const currentDomain = typeof window !== 'undefined' ? window.location.origin : 'https://emviapp.com';
    const salonUrl = `${currentDomain}/salon/${id}`;
    
    return (
      <div className="container mx-auto pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <Link to="/salons">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Listings</span>
            </Button>
          </Link>
          
          {salon && (
            <UniversalShareButton
              title={`${salon.title} - Salon for Sale`}
              description={`Check out this salon opportunity: ${salon.title} ${salon.location ? `in ${salon.location}` : ''}. View details on EmviApp!`}
              hashtags={['EmviApp', 'SalonForSale', 'BeautyBusiness']}
              utmSource="salon_detail"
              variant="button"
              size="default"
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <ListingRouteGuard 
      listingType="salon"
      notifyOnInvalid={true}
      loadingComponent={
        <Layout>
          <div className="min-h-screen bg-background">
            <LoadingState />
          </div>
        </Layout>
      }
    >
      <Layout>
        <div className="min-h-screen bg-background">
          {salon && (
            <DynamicSEO
              title={`${salon.title} - Salon for Sale | EmviApp`}
              description={`${salon.title} salon for sale ${salon.location ? `in ${salon.location}` : ''}. ${salon.description?.substring(0, 150) || 'Explore this salon business opportunity.'}`}
              type="website"
              image={salon.image || 'https://emviapp.com/og-salon-image.jpg'}
              tags={['salon', 'business', 'sale', salon.location || '', salon.category || '']}
            />
          )}
          
          {loading ? (
            <LoadingState />
          ) : error ? (
            <SalonNotFound />
          ) : (
            <>
              <BackToListings />
              <SalonDetailContent salon={salon} />
              <SalonListingCta />
            </>
          )}
        </div>
      </Layout>
    </ListingRouteGuard>
  );
};

export default SalonDetailPage;

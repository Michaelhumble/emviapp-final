
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SalonDetailContent from '@/components/salons/SalonDetailContent';
import SalonListingCta from '@/components/salons/SalonListingCta';
import SalonNotFound from '@/components/salon/SalonNotFound';
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
        // For debugging
        console.log(`SalonDetailPage: Loading salon with ID: ${id}`);
        
        const { salon: salonData, error: hasError, validId } = await fetchSalonById(id);
        
        if (hasError || !validId) {
          console.error(`SalonDetailPage: Error loading salon with ID: ${id}`);
          setError(true);
          toast.error('This salon listing could not be found');
          navigate('/salon-not-found');
        } else {
          console.log(`SalonDetailPage: Successfully loaded salon: ${salonData?.title || salonData?.company}`);
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

  // Back button component
  const BackToListings = () => (
    <div className="container mx-auto pt-6">
      <Link to="/salons">
        <Button variant="outline" className="mb-4 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Listings</span>
        </Button>
      </Link>
    </div>
  );

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


import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SalonDetailContent from '@/components/salons/SalonDetailContent';
import SalonListingCta from '@/components/salons/SalonListingCta';
import SalonNotFound from '@/components/salon/SalonNotFound';
import { fetchJob } from '@/utils/jobs';
import { getSalonByIdAsJob } from '@/utils/featuredContent';
import { Job } from '@/types/job';
import ListingRouteGuard from '@/components/common/ListingRouteGuard';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { validateListingExists } from '@/utils/listingValidator';
import { toast } from 'sonner';

/**
 * Enhanced SalonDetailPage component with robust validation
 */
const SalonDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [salon, setSalon] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validateAndLoadSalon = async () => {
      if (!id) {
        setError(true);
        return;
      }

      setLoading(true);
      try {
        // First validate that the salon ID exists
        const exists = await validateListingExists(id, 'salon');
        
        if (!exists) {
          console.error('Invalid salon ID:', id);
          setError(true);
          navigate('/salon-not-found');
          return;
        }
        
        // Try to get from the featured salons first (converted to Job type)
        const salonData = getSalonByIdAsJob(id);
        
        if (salonData) {
          setSalon(salonData);
          console.log('Salon loaded from featured content:', id);
        } else {
          // Fall back to fetching from jobs
          try {
            const jobData = await fetchJob(id);
            
            if (!jobData || !jobData.id) {
              throw new Error('Invalid salon data received');
            }
            
            setSalon(jobData);
            console.log('Salon loaded from jobs API:', id);
          } catch (jobError) {
            console.error('Error loading salon from jobs API:', jobError);
            setError(true);
            toast.error('This salon listing could not be found');
            navigate('/salon-not-found');
          }
        }
      } catch (err) {
        console.error('Error loading salon:', err);
        setError(true);
        navigate('/salon-not-found');
      } finally {
        setLoading(false);
      }
    };

    validateAndLoadSalon();
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

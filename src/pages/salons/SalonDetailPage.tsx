
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SalonDetailContent from '@/components/salons/SalonDetailContent';
import SalonListingCta from '@/components/salons/SalonListingCta';
import SalonNotFound from '@/components/salon/SalonNotFound';
import { fetchJob } from '@/utils/jobs';
import { getSalonByIdAsJob } from '@/utils/featuredContent';
import { Job } from '@/types/job';
import ListingRouteGuard from '@/components/common/ListingRouteGuard';

const SalonDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [salon, setSalon] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadSalon = async () => {
      if (!id) {
        setError(true);
        return;
      }

      setLoading(true);
      try {
        // Try to get from the featured salons first (converted to Job type)
        const salonData = getSalonByIdAsJob(id);
        
        if (salonData) {
          setSalon(salonData);
        } else {
          // Fall back to fetching from jobs
          const jobData = await fetchJob(id);
          setSalon(jobData);
        }
      } catch (err) {
        console.error('Error loading salon:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadSalon();
  }, [id]);

  return (
    <ListingRouteGuard 
      listingType="salon"
      notifyOnInvalid={true}
      loadingComponent={
        <Layout>
          <div className="min-h-screen bg-background">
            <div className="container mx-auto py-12">
              <div className="flex flex-col items-center justify-center p-8">
                <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
                <p className="text-lg text-muted-foreground">Loading salon details...</p>
              </div>
            </div>
          </div>
        </Layout>
      }
    >
      <Layout>
        <div className="min-h-screen bg-background">
          {loading ? (
            <div className="container mx-auto py-12">
              <div className="flex flex-col items-center justify-center p-8">
                <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
                <p className="text-lg text-muted-foreground">Loading salon details...</p>
              </div>
            </div>
          ) : error ? (
            <SalonNotFound />
          ) : (
            <>
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

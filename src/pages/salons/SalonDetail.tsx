
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SalonDetailContent from '@/components/salons/SalonDetailContent';
import SalonListingCta from '@/components/salons/SalonListingCta';
import SalonNotFound from '@/components/salon/SalonNotFound';
import { fetchJob } from '@/utils/jobs';
import { getSalonByIdAsJob } from '@/utils/featuredContent';
import { Job } from '@/types/job';

const SalonDetail = () => {
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

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-background">
          <div className="container mx-auto py-12">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-2">Loading salon details...</span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) return <SalonNotFound />;

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <SalonDetailContent salon={salon} />
        <SalonListingCta />
      </div>
    </Layout>
  );
};

export default SalonDetail;

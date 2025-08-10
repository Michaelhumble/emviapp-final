
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import JobDetailContent from '@/components/jobs/JobDetailContent';
import JobNotFound from '@/components/jobs/JobNotFound';
import JobFilledPage from '@/components/jobs/JobFilledPage';
import JobSEO from '@/components/seo/JobSEO';
import { Job } from '@/types/job';
import { fetchJob } from '@/utils/jobs';
import { shouldNoIndex, shouldReturn410, getValidThrough, isFilled } from '@/utils/seo/jobSeoLogic';

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadJob = async () => {
      if (!id) {
        setError(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const jobData = await fetchJob(id);
        setJob(jobData);
      } catch (err) {
        console.error('Error loading job:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-background">
          <div className="container mx-auto py-12">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-2">Loading job details...</span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !job) {
    return <JobNotFound />;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Inject Job SEO JSON-LD */}
        <JobSEO job={job} />

        {shouldNoIndex(job) && (
          <Helmet>
            <meta name="robots" content="noindex, follow" />
            {/* Note: 410 status headers cannot be set from SPA. shouldReturn410(job) indicates when servers should return 410. */}
          </Helmet>
        )}
        {isFilled(job) || getValidThrough(job) < new Date() ? (
          <JobFilledPage job={job} />
        ) : (
          <JobDetailContent job={job} />
        )}
      </div>
    </Layout>
  );
};

export default JobDetail;

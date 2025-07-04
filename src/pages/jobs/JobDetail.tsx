
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import JobDetailContent from '@/components/jobs/JobDetailContent';
import JobNotFound from '@/components/jobs/JobNotFound';
import { Job } from '@/types/job';
import { fetchJob } from '@/utils/jobs';

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
        <JobDetailContent job={job} />
      </div>
    </Layout>
  );
};

export default JobDetail;

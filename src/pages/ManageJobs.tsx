
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { Job } from '@/types/job';
import Layout from '@/components/layout/Layout';

interface JobWithApplications extends Job {
  _count: {
    applications: number;
  };
}

const ManageJobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<JobWithApplications[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserJobs = async () => {
      if (!user?.id) return;

      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const transformedJobs: JobWithApplications[] = (data || []).map(job => ({
          id: job.id,
          title: job.title || 'Job Title',
          role: job.title,
          company: job.title || 'Company',
          location: job.location || '',
          compensation_type: job.compensation_type || '',
          compensation_details: job.compensation_details || '',
          posted_at: job.created_at,
          created_at: job.created_at || new Date().toISOString(),
          expires_at: job.expires_at || '',
          status: job.status || 'active',
          requirements: job.requirements || '',
          description: job.description || '',
          category: job.category || "Other",
          _count: {
            applications: 0
          }
        }));

        setJobs(transformedJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserJobs();
  }, [user?.id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <div className="text-center">Loading your job posts...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 max-w-3xl">
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <h1 className="text-3xl font-bold">Manage Your Jobs</h1>
          <a
            href="/post-job"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Post a job — Free
          </a>
        </div>

        {!user ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Sign in to see the jobs you posted.</p>
            <a href="/signin?redirect=%2Fmy-jobs" className="text-primary underline">
              Sign in
            </a>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">You haven't posted any jobs yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-lg border shadow-sm">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-gray-600">{job.location}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Posted: {new Date(job.created_at).toLocaleDateString()}
                      {job.expires_at
                        ? ` · Expires: ${new Date(job.expires_at).toLocaleDateString()}`
                        : ''}
                    </p>
                    {job.category && (
                      <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                        {job.category}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-3 text-sm">
                    <a href={`/jobs/${job.id}`} className="text-primary underline">
                      View
                    </a>
                    <a href={`/jobs/edit/${job.id}`} className="text-primary underline">
                      Edit
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};


export default ManageJobs;

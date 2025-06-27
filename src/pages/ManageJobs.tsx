
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
          role: job.title,
          company: job.company,
          location: job.location,
          title: job.title,
          compensation_type: job.compensation_type,
          compensation_details: job.compensation_details,
          posted_at: job.created_at,
          created_at: job.created_at,
          expires_at: job.expires_at,
          status: job.status,
          requirements: job.requirements,
          description: job.description,
          category: job.category || "Other", // Default category
          _count: {
            applications: 0 // Mock count for now
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
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Manage Your Jobs</h1>
        
        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">You haven't posted any jobs yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="text-gray-600">{job.location}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Posted: {new Date(job.created_at).toLocaleDateString()}
                </p>
                {job.category && (
                  <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                    {job.category}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ManageJobs;

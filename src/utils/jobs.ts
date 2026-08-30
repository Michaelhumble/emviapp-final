
import { Job } from '@/types/job';
import { supabase } from '@/integrations/supabase/client';
import { PUBLIC_JOB_COLUMNS } from '@/lib/jobs/publicJobColumns';

/**
 * Fetches a job from the database by ID
 */
export const fetchJob = async (id: string): Promise<Job> => {
  console.log('🔍 Fetching job with ID:', id);
  
  const { data: job, error } = await supabase
    .from('jobs')
    .select(PUBLIC_JOB_COLUMNS)
    .eq('id', id)
    .eq('status', 'active')
    .single();
  
  if (error) {
    console.error('❌ Error fetching job:', error);
    throw new Error(`Job with ID ${id} not found`);
  }
  
  if (!job) {
    throw new Error(`Job with ID ${id} not found`);
  }
  
  console.log('✅ Job fetched successfully:', job);
  
  // Transform database job to Job interface
  return {
    id: job.id,
    title: job.title || 'Job Title',
    company: job.title || 'Company Name',
    location: job.location || '',
    created_at: job.created_at || new Date().toISOString(),
    description: job.description || '',
    compensation_type: job.compensation_type || '',
    compensation_details: job.compensation_details || '',
    contact_info: typeof job.contact_info === 'object' && job.contact_info ? job.contact_info as any : {},
    user_id: job.user_id || '',
    status: job.status || 'active',
    expires_at: job.expires_at || '',
    requirements: job.requirements || '',
    pricing_tier: job.pricing_tier || 'free',
    category: job.category || "Other"
  };
};

/**
 * Fetches a paginated list of jobs with optional filtering
 */
export const fetchJobs = async (page: number = 1, limit: number = 9): Promise<{
  jobs: Job[];
  totalPages: number;
}> => {
  console.log('🔍 Fetching jobs from database, page:', page);
  
  const start = (page - 1) * limit;
  
  const { data: jobs, error, count } = await supabase
    .from('jobs')
    .select(PUBLIC_JOB_COLUMNS, { count: 'exact' })
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .range(start, start + limit - 1);
  
  if (error) {
    console.error('❌ Error fetching jobs:', error);
    throw error;
  }
  
  const transformedJobs: Job[] = (jobs || []).map(job => ({
    id: job.id,
    title: job.title || 'Job Title',
    company: job.title || 'Company Name',
    location: job.location || '',
    created_at: job.created_at || new Date().toISOString(),
    description: job.description || '',
    compensation_type: job.compensation_type || '',
    compensation_details: job.compensation_details || '',
    contact_info: typeof job.contact_info === 'object' && job.contact_info ? job.contact_info as any : {},
    user_id: job.user_id || '',
    status: job.status || 'active',
    expires_at: job.expires_at || '',
    requirements: job.requirements || '',
    pricing_tier: job.pricing_tier || 'free',
    category: job.category || "Other"
  }));
  
  const totalPages = Math.ceil((count || 0) / limit);
  
  console.log('✅ Jobs fetched:', transformedJobs.length, 'Total pages:', totalPages);
  
  return {
    jobs: transformedJobs,
    totalPages
  };
};

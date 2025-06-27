
import React, { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import JobsGrid from "@/components/jobs/JobsGrid";
import JobSearchBar from "@/components/jobs/JobSearchBar";
import { JobDetailModal } from "@/components/jobs/JobDetailModal";
import { Job } from "@/types/job";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";

const JobsPage: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [renewalJobId, setRenewalJobId] = useState<string | null>(null);

  // Fetch real jobs from Supabase
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform Supabase data to Job type
      const transformedJobs: Job[] = data?.map(job => ({
        id: job.id,
        title: job.title,
        company: job.title, // Use title as company if no separate company field
        location: job.location || '',
        created_at: job.created_at,
        description: job.description || '',
        employment_type: job.compensation_type || '',
        compensation_details: job.compensation_details || '',
        contact_info: job.contact_info || {},
        pricing_tier: job.pricing_tier || 'free',
        user_id: job.user_id,
        status: job.status,
        expires_at: job.expires_at
      })) || [];

      setJobs(transformedJobs);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(job => 
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const viewJobDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const closeJobDetails = () => {
    setSelectedJob(null);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleRenew = async (job: Job) => {
    setRenewalJobId(job.id);
    // Add renewal logic here if needed
    console.log('Renewing job:', job.id);
    setTimeout(() => setRenewalJobId(null), 2000);
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', jobId)
        .eq('user_id', user.id); // Ensure user can only delete their own jobs

      if (error) throw error;
      
      // Refresh jobs list
      fetchJobs();
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  if (loading) {
    return (
      <Container className={`py-8 max-w-7xl ${isMobile ? 'pb-20' : ''}`}>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2">Loading jobs...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className={`py-8 max-w-7xl ${isMobile ? 'pb-20' : ''}`}>
      {/* Back to Home button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Home
        </Button>
      </div>
      
      <h1 className="text-3xl font-playfair font-bold mb-6">
        Beauty Industry Jobs
      </h1>

      <JobSearchBar 
        value={searchTerm} 
        onSearchChange={handleSearchChange}
        placeholder="Search jobs by title, location, or description..."
      />

      {error && (
        <Alert className="mb-8 bg-red-50 border-red-200">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'No jobs found matching your search.' : 'No jobs available at the moment.'}
          </p>
          <Button onClick={() => navigate('/post-job')} className="bg-purple-600 hover:bg-purple-700">
            Post the First Job
          </Button>
        </div>
      ) : (
        <JobsGrid
          jobs={filteredJobs}
          expirations={{}}
          currentUserId={user?.id}
          onRenew={handleRenew}
          isRenewing={false}
          renewalJobId={renewalJobId}
          onDelete={handleDeleteJob}
        />
      )}
      
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          isOpen={!!selectedJob}
          onClose={closeJobDetails}
        />
      )}
    </Container>
  );
};

export default JobsPage;

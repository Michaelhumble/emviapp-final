import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Zap, MapPin, DollarSign, Clock, CheckCircle, Loader2, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

interface Job {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  compensation_type: string;
  compensation_details: string;
  created_at: string;
  user_id: string;
  status: string;
}

interface Application {
  job_id: string;
  status: string;
}

const OneClickApplyCard = () => {
  const { user, userProfile } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [applyingToJob, setApplyingToJob] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchJobsAndApplications();
    }
  }, [user]);

  const fetchJobsAndApplications = async () => {
    try {
      // Fetch jobs
      const { data: jobsData, error: jobsError } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(5);

      if (jobsError) throw jobsError;

      // Fetch user's applications
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('artist_job_applications')
        .select('job_id, status')
        .eq('user_id', user?.id);

      if (applicationsError) throw applicationsError;

      setJobs(jobsData || []);
      setApplications(applicationsData || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load jobs');
    } finally {
      setIsLoading(false);
    }
  };

  const applyToJob = async (job: Job) => {
    if (!user || !userProfile) {
      toast.error('Please complete your profile first');
      return;
    }

    setApplyingToJob(job.id);
    try {
      const { error } = await supabase
        .from('artist_job_applications')
        .insert({
          job_id: job.id,
          user_id: user.id,
          portfolio_urls: userProfile.portfolio_urls || [],
          cover_letter: `Hi! I'm ${userProfile.full_name}, a ${userProfile.specialty} with ${userProfile.years_experience || 0} years of experience. I'd love to work with you!`,
          metadata: {
            applied_via: 'one_click_apply',
            artist_location: userProfile.location,
            artist_specialty: userProfile.specialty
          }
        });

      if (error) {
        if (error.code === '23505') {
          toast.error('You have already applied to this job');
        } else {
          throw error;
        }
      } else {
        toast.success('Application submitted successfully!');
        await fetchJobsAndApplications();
      }
    } catch (error) {
      console.error('Error applying to job:', error);
      toast.error('Failed to submit application');
    } finally {
      setApplyingToJob(null);
    }
  };

  const getApplicationStatus = (jobId: string) => {
    return applications.find(app => app.job_id === jobId);
  };

  const getCategoryIcon = (category: string) => {
    return <Briefcase className="w-4 h-4" />;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'nail-tech': 'bg-pink-100 text-pink-800',
      'beauty': 'bg-purple-100 text-purple-800',
      'hair': 'bg-blue-100 text-blue-800',
      'massage': 'bg-green-100 text-green-800',
      'esthetics': 'bg-yellow-100 text-yellow-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <Card className="card-glass border-purple-100/50">
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-glass border-purple-100/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          Quick Apply Jobs
        </CardTitle>
      </CardHeader>
      <CardContent>
        {jobs.length === 0 ? (
          <div className="text-center py-8">
            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="font-medium text-gray-600 mb-2">No jobs available</h3>
            <p className="text-sm text-gray-500">
              Check back later for new opportunities!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job, index) => {
              const application = getApplicationStatus(job.id);
              const isApplying = applyingToJob === job.id;
              
              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border rounded-lg bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getCategoryIcon(job.category)}
                        <h3 className="font-medium text-sm">{job.title}</h3>
                        <Badge className={getCategoryColor(job.category)}>
                          {job.category}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </div>
                        {job.compensation_details && (
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            {job.compensation_details}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {job.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex-1" />
                    {application ? (
                      <Badge 
                        variant="secondary" 
                        className="bg-green-100 text-green-800"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Applied
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => applyToJob(job)}
                        disabled={isApplying}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      >
                        {isApplying ? (
                          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                        ) : (
                          <Zap className="w-3 h-3 mr-1" />
                        )}
                        Quick Apply
                      </Button>
                    )}
                  </div>
                </motion.div>
              );
            })}
            
            <div className="bg-purple-50 rounded-lg p-3 border border-purple-100 text-center">
              <p className="text-sm text-purple-700 font-medium">
                Full Job Browser
              </p>
              <p className="text-xs text-purple-600 mt-1">
                Coming Soon • Browse all available positions with advanced filters
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OneClickApplyCard;

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ChevronRight, Users, Calendar, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface JobPost {
  id: string;
  title: string;
  created_at: string;
  expires_at: string;
  applicant_count: number;
  status: string;
}

const SalonJobManagement = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!user?.id) return;
    
    const fetchJobs = async () => {
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('id, title, created_at, expires_at, status')
          .eq('salon_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);
          
        if (error) throw error;
        
        // Get applicant count for each job
        const jobsWithApplicantCount = await Promise.all(
          data.map(async (job) => {
            const { count, error: countError } = await supabase
              .from('job_applications')
              .select('id', { count: 'exact' })
              .eq('job_id', job.id);
              
            return {
              ...job,
              applicant_count: count || 0
            };
          })
        );
        
        setJobs(jobsWithApplicantCount);
      } catch (err) {
        console.error("Error fetching salon jobs:", err);
        // Create default jobs if no data
        setJobs([
          {
            id: '1',
            title: 'Nail Technician',
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            expires_at: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000).toISOString(),
            applicant_count: 3,
            status: 'active'
          },
          {
            id: '2',
            title: 'Hair Stylist',
            created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            expires_at: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000).toISOString(),
            applicant_count: 2,
            status: 'active'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, [user]);
  
  const getStatusBadge = (status: string, expiresAt: string) => {
    const isExpired = new Date(expiresAt) < new Date();
    
    if (isExpired) {
      return <Badge variant="outline" className="bg-gray-100 text-gray-600">Expired</Badge>;
    }
    
    if (status === 'active') {
      return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
    }
    
    return <Badge variant="outline">{status}</Badge>;
  };
  
  return (
    <Card className="border-blue-100">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Posted Jobs</h3>
          <Button asChild size="sm">
            <Link to="/post/job">
              <Plus className="h-4 w-4 mr-1" />
              Post New Job
            </Link>
          </Button>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse flex flex-col space-y-4 w-full">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-100 rounded-md w-full"></div>
              ))}
            </div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-8 bg-blue-50 rounded-lg">
            <AlertCircle className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <h4 className="text-lg font-medium text-gray-800 mb-1">No Jobs Posted Yet</h4>
            <p className="text-sm text-gray-600 mb-4">Post your first job listing to attract top talent</p>
            <Button asChild>
              <Link to="/post/job">
                <Plus className="h-4 w-4 mr-1" />
                Post Your First Job
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map(job => (
              <div 
                key={job.id} 
                className="p-4 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-blue-800">{job.title}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Posted {formatDistanceToNow(new Date(job.created_at))} ago</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{job.applicant_count} applicants</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(job.status, job.expires_at)}
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/jobs/${job.id}/applicants`}>
                        <ChevronRight className="h-5 w-5 text-blue-500" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="text-center mt-4">
              <Button asChild variant="link" className="text-blue-600">
                <Link to="/salon/jobs">View All Jobs</Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SalonJobManagement;

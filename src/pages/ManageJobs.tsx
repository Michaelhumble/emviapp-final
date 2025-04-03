import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Edit, Trash2, UserCheck, Clock, Eye, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/types/job";

const ManageJobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (user) {
      loadJobs();
    }
  }, [user]);
  
  const loadJobs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          _count {
            applications
          }
        `)
        .eq('salon_id', user?.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setJobs(data || []);
    } catch (error) {
      console.error("Error loading jobs:", error);
      toast.error("Failed to load your job posts.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteJob = async (jobId: string) => {
    if (confirm("Are you sure you want to delete this job post? This action cannot be undone.")) {
      try {
        const { error } = await supabase
          .from('jobs')
          .delete()
          .eq('id', jobId);
        
        if (error) throw error;
        
        setJobs(jobs.filter(job => job.id !== jobId));
        toast.success("Job deleted successfully.");
      } catch (error) {
        console.error("Error deleting job:", error);
        toast.error("Failed to delete the job.");
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const isExpiring = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const daysLeft = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft <= 7 && daysLeft > 0;
  };
  
  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date();
  };
  
  const getStatusBadge = (job: Job) => {
    if (job.status === 'inactive') {
      return <Badge variant="outline" className="bg-gray-100 text-gray-700">Inactive</Badge>;
    }
    if (isExpired(job.expires_at)) {
      return <Badge variant="destructive">Expired</Badge>;
    }
    if (isExpiring(job.expires_at)) {
      return <Badge variant="outline" className="border-yellow-400 text-yellow-600">Expiring Soon</Badge>;
    }
    return <Badge variant="outline" className="border-green-500 text-green-600">Active</Badge>;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-serif mb-2">Manage Your Job Postings</h1>
              <p className="text-gray-600">Edit, renew, or remove your job listings</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/post-job">
                <Button>
                  Post a New Job
                </Button>
              </Link>
            </div>
          </div>
          
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <Skeleton className="h-6 w-1/3" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-2/3" />
                      <div className="flex space-x-2 pt-4">
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-20" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : jobs.length > 0 ? (
            <div className="space-y-6">
              {jobs.map((job) => (
                <Card key={job.id} className="overflow-hidden">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle>{job.title}</CardTitle>
                    {getStatusBadge(job)}
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        <span>Posted: {formatDate(job.created_at)}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-2 text-gray-400" />
                        <span>
                          {job.compensation_type}: {job.compensation_details || 'Not specified'}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <UserCheck className="h-4 w-4 mr-2 text-gray-400" />
                        <span>
                          {job._count?.applications || 0} Application{job._count?.applications !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                    
                    {isExpiring(job.expires_at) && !isExpired(job.expires_at) && (
                      <div className="flex items-center bg-yellow-50 text-yellow-600 px-4 py-2 rounded-md mb-4">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        <span className="text-sm">
                          This job posting will expire on {formatDate(job.expires_at)}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      <Link to={`/jobs/${job.id}/applicants`}>
                        <Button variant="outline" size="sm">
                          <UserCheck className="h-4 w-4 mr-2" />
                          View Applicants
                        </Button>
                      </Link>
                      <Link to={`/jobs/${job.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteJob(job.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center p-8">
              <h3 className="text-xl font-medium mb-4">No Jobs Posted Yet</h3>
              <p className="text-gray-600 mb-6">Start posting jobs to find talented professionals for your salon.</p>
              <Link to="/post-job">
                <Button>
                  Post Your First Job
                </Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ManageJobs;

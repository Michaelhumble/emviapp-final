
import { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { CalendarClock, Users, FileText, ArrowRight, Building, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Job {
  id: string;
  title: string;
  created_at: string;
  expires_at: string;
  status: string;
  applications_count?: number;
}

const SalonManagementTools = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!user?.id) return;
    
    const fetchJobs = async () => {
      setLoading(true);
      try {
        // Fetch active job posts with application counts
        const { data, error } = await supabase
          .from('jobs')
          .select(`
            id, 
            title, 
            created_at, 
            expires_at, 
            status
          `)
          .eq('salon_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);
          
        if (error) throw error;
        
        // For each job, fetch the application count
        const jobsWithApplicationCounts = await Promise.all(
          (data || []).map(async (job) => {
            const { count, error: countError } = await supabase
              .from('job_applications')
              .select('id', { count: 'exact', head: true })
              .eq('job_id', job.id);
              
            return {
              ...job,
              applications_count: countError ? 0 : count || 0
            };
          })
        );
        
        setJobs(jobsWithApplicationCounts);
      } catch (error) {
        console.error('Error fetching salon jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, [user?.id]);
  
  // Format date to readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };
  
  // Check if job is expired
  const isJobExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };
  
  return (
    <Tabs defaultValue="jobs" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="jobs" className="flex items-center gap-1.5">
          <FileText className="h-4 w-4" />
          {t("Job Posts")}
        </TabsTrigger>
        <TabsTrigger value="applicants" className="flex items-center gap-1.5">
          <Users className="h-4 w-4" />
          {t("Applicants")}
        </TabsTrigger>
        <TabsTrigger value="booth" className="flex items-center gap-1.5">
          <Building className="h-4 w-4" />
          {t("Booth Rental")}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="jobs">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{t("Active Job Listings")}</CardTitle>
            <CardDescription>
              {t("Manage your current job postings")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="h-12 bg-gray-100 animate-pulse rounded"></div>
                ))}
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-500 mb-4">{t("You haven't posted any jobs yet")}</p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link to="/post/job">{t("Post Your First Job")}</Link>
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("Job Title")}</TableHead>
                      <TableHead>{t("Posted")}</TableHead>
                      <TableHead>{t("Status")}</TableHead>
                      <TableHead>{t("Applicants")}</TableHead>
                      <TableHead>{t("Actions")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>{formatDate(job.created_at)}</TableCell>
                        <TableCell>
                          <Badge variant={
                            job.status === 'active' && !isJobExpired(job.expires_at) 
                              ? 'success' 
                              : 'destructive'
                          }>
                            {job.status === 'active' && !isJobExpired(job.expires_at) 
                              ? t("Active") 
                              : t("Expired")}
                          </Badge>
                        </TableCell>
                        <TableCell>{job.applications_count || 0}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/jobs/manage/${job.id}`}>{t("Manage")}</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/jobs/manage" className="flex items-center gap-1">
                      {t("View All Jobs")}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="applicants">
        <Card className="border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle>{t("Recent Applicants")}</CardTitle>
            <CardDescription>
              {t("Candidates who have applied to your jobs")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 px-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">{t("Applicant Tracking System")}</h3>
              <p className="text-gray-500 mb-4 max-w-md mx-auto">
                {t("Easily manage all candidates who have applied to your job listings in one place.")}
              </p>
              <Button asChild>
                <Link to="/jobs/applicants">{t("View All Applicants")}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="booth">
        <Card className="border-indigo-100">
          <CardHeader className="pb-2">
            <CardTitle>{t("Booth Rental Management")}</CardTitle>
            <CardDescription>
              {t("Manage your salon booth rentals")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 px-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">{t("Booth Rental System")}</h3>
              <p className="text-gray-500 mb-4 max-w-md mx-auto">
                {t("The booth rental management system will be available soon. Track booth rent, payments, and occupancy.")}
              </p>
              <Button variant="outline">
                {t("Coming Soon")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SalonManagementTools;

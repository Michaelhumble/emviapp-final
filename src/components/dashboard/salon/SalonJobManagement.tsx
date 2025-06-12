
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Eye, TrendingUp, RefreshCw, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface JobPost {
  id: string;
  title: string;
  location: string;
  status: string;
  created_at: string;
  expires_at: string;
  pricing_tier?: string;
}

const SalonJobManagement = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);

  console.log('🟪 SalonJobManagement component loaded');

  useEffect(() => {
    fetchJobs();
  }, [user]);

  const fetchJobs = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('id, title, location, status, created_at, expires_at, pricing_tier')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load job posts');
    } finally {
      setLoading(false);
    }
  };

  const handlePostJob = () => {
    navigate('/post-job');
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPricingTierBadge = (tier?: string) => {
    if (!tier) return null;
    
    const colors = {
      'diamond': 'bg-purple-100 text-purple-800',
      'premium': 'bg-blue-100 text-blue-800',
      'featured': 'bg-amber-100 text-amber-800',
      'standard': 'bg-gray-100 text-gray-800'
    };
    
    return (
      <Badge className={colors[tier as keyof typeof colors] || colors.standard}>
        {tier?.toUpperCase()}
      </Badge>
    );
  };

  return (
    <Card className="border-indigo-100">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-xl font-serif flex items-center">
            <Eye className="h-5 w-5 mr-2 text-indigo-500" />
            Job Management
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Post, boost, and track your job listings
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchJobs} variant="outline" size="sm" disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handlePostJob} className="bg-indigo-600 hover:bg-indigo-700">
            <PlusCircle className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-indigo-500" />
            <p>Loading your job posts...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-indigo-200 rounded-lg">
            <Eye className="h-12 w-12 text-indigo-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No job posts yet</h3>
            <p className="text-gray-500 mb-4">Start hiring by posting your first job</p>
            <Button onClick={handlePostJob} className="bg-indigo-600 hover:bg-indigo-700">
              <PlusCircle className="h-4 w-4 mr-2" />
              Post Your First Job
              
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-gray-900">{job.title}</h4>
                      <Badge className={getStatusColor(job.status)}>
                        {job.status?.toUpperCase()}
                      </Badge>
                      {getPricingTierBadge(job.pricing_tier)}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{job.location}</p>
                    <div className="flex items-center text-xs text-gray-400">
                      <span>Posted: {new Date(job.created_at).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>Expires: {new Date(job.expires_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Boost
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="text-center pt-4">
              <Button variant="outline" onClick={() => navigate('/jobs')}>
                View All Job Posts →
              </Button>
            </div>
          </div>
        )}
        
        {/* Debug marker */}
        <div className="mt-4 text-xs text-indigo-500 border-t pt-2">
          🟪 Job Management Component | Jobs Loaded: {jobs.length} | Status: {loading ? 'Loading' : 'Ready'}
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonJobManagement;

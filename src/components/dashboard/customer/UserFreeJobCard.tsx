import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, MapPin, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from '@/components/ui/alert';

const UserFreeJobCard = () => {
  const navigate = useNavigate();
  const { user, isSignedIn } = useAuth();
  const [freeJob, setFreeJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserFreeJob = async () => {
      if (!isSignedIn || !user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('user_id', user.id)
          .eq('pricing_tier', 'free')
          .eq('status', 'active')
          .limit(1);

        if (error) {
          console.error('Error fetching user free job:', error);
          setError('Failed to load your free job');
          return;
        }

        if (data && data.length > 0) {
          setFreeJob(data[0]);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserFreeJob();
  }, [isSignedIn, user]);

  const handleEditJob = () => {
    if (freeJob) {
      navigate(`/jobs/edit/${freeJob.id}`);
    }
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            <span className="text-sm text-gray-600">Loading your free job...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!freeJob) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Your Free Job Post</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-gray-600 mb-4">You haven't posted your free job yet.</p>
            <Button onClick={() => navigate('/post-job')} className="bg-green-600 hover:bg-green-700">
              Post Your Free Job
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">Your Free Job Post</CardTitle>
        <Badge variant="secondary" className="bg-green-100 text-green-700">
          FREE
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg">{freeJob.title}</h3>
            <p className="text-sm text-gray-600">{freeJob.category}</p>
          </div>
          
          {freeJob.location && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              {freeJob.location}
            </div>
          )}
          
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-1" />
            Posted {new Date(freeJob.created_at).toLocaleDateString()}
          </div>
          
          {freeJob.description && (
            <p className="text-sm text-gray-700 line-clamp-3">
              {freeJob.description}
            </p>
          )}
          
          <div className="pt-3 border-t">
            <Button 
              onClick={handleEditJob}
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit Job
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserFreeJobCard;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, MapPin, Calendar, Clock, Phone, Mail, Briefcase } from 'lucide-react';
import { format } from 'date-fns';

interface Job {
  id: string;
  title: string;
  location: string;
  description: string;
  compensation_details: string;
  employment_type?: string;
  contact_info: any;
  created_at: string;
  expires_at: string;
  pricing_tier: string;
}

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) {
        setError('Job ID not provided');
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', id)
          .eq('status', 'active')
          .single();

        if (error) throw error;
        
        if (!data) {
          setError('Job not found');
        } else {
          setJob(data);
        }
      } catch (err) {
        console.error('Error fetching job:', err);
        setError('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The job you are looking for does not exist.'}</p>
          <Button onClick={() => navigate('/jobs')} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Button 
        onClick={() => navigate('/jobs')} 
        variant="ghost" 
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Jobs
      </Button>

      <Card>
        <CardContent className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {job.title}
              </h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                {job.location}
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              job.pricing_tier === 'free' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-purple-100 text-purple-800'
            }`}>
              {job.pricing_tier === 'free' ? 'Free Listing' : `${job.pricing_tier} Listing`}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center text-gray-600">
              <Briefcase className="h-5 w-5 mr-2" />
              <span>{job.employment_type || 'Full-time'}</span>
            </div>
            {job.compensation_details && (
              <div className="flex items-center text-gray-600">
                <span className="text-lg mr-2">💰</span>
                <span>{job.compensation_details}</span>
              </div>
            )}
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-2" />
              <span>Posted {format(new Date(job.created_at), 'MMM d, yyyy')}</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {job.contact_info?.phone && (
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-gray-400" />
                  <a 
                    href={`tel:${job.contact_info.phone}`} 
                    className="text-purple-600 hover:underline"
                  >
                    {job.contact_info.phone}
                  </a>
                </div>
              )}
              {job.contact_info?.email && (
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-gray-400" />
                  <a 
                    href={`mailto:${job.contact_info.email}`} 
                    className="text-purple-600 hover:underline"
                  >
                    {job.contact_info.email}
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>This listing expires on {format(new Date(job.expires_at), 'MMMM d, yyyy')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobDetail;

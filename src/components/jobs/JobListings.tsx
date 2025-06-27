
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, Clock, Phone, Mail } from 'lucide-react';
import { format } from 'date-fns';

interface Job {
  id: string;
  title: string;
  company?: string;
  location: string;
  description: string;
  compensation_details: string;
  employment_type?: string;
  contact_info: any;
  created_at: string;
  expires_at: string;
}

const JobListings = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our Job interface
      const transformedJobs = (data || []).map(job => ({
        id: job.id,
        title: job.title,
        company: job.title, // Use title as company name since company field doesn't exist
        location: job.location || 'Location not specified',
        description: job.description || '',
        compensation_details: job.compensation_details || '',
        employment_type: job.compensation_type || 'Full-time',
        contact_info: job.contact_info,
        created_at: job.created_at,
        expires_at: job.expires_at
      }));
      
      setJobs(transformedJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs posted yet</h3>
          <p className="text-gray-600">Be the first to post a job opportunity!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <Card key={job.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {job.title}
                </h3>
                <p className="text-lg text-gray-700 mb-2">{job.company}</p>
              </div>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Free Listing
              </span>
            </div>

            <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {job.employment_type}
              </div>
              {job.compensation_details && (
                <div className="flex items-center gap-1">
                  <span className="text-lg">💰</span>
                  {job.compensation_details}
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Posted {format(new Date(job.created_at), 'MMM d, yyyy')}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-700 line-clamp-3">{job.description}</p>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm font-medium text-gray-900 mb-2">Contact Information:</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {job.contact_info?.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    <a href={`tel:${job.contact_info.phone}`} className="hover:text-purple-600">
                      {job.contact_info.phone}
                    </a>
                  </div>
                )}
                {job.contact_info?.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${job.contact_info.email}`} className="hover:text-purple-600">
                      {job.contact_info.email}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Expires: {format(new Date(job.expires_at), 'MMM d, yyyy')}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JobListings;

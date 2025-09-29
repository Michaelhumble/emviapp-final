import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Job } from '@/types/job';
import { fetchRelatedJobs } from '@/utils/jobsRelated';

interface RelatedJobsProps {
  currentJob: Job;
  limit?: number;
}

const RelatedJobs: React.FC<RelatedJobsProps> = ({ currentJob, limit = 4 }) => {
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRelatedJobs = async () => {
      try {
        const jobs = await fetchRelatedJobs({
          category: currentJob.category,
          location: currentJob.location,
          limit: limit + 1 // Get one extra to filter out current job
        });
        
        // Filter out the current job
        const filteredJobs = jobs.filter(job => job.id !== currentJob.id).slice(0, limit);
        setRelatedJobs(filteredJobs);
      } catch (error) {
        console.error('Failed to load related jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRelatedJobs();
  }, [currentJob.id, currentJob.category, currentJob.location, limit]);

  if (loading) {
    return (
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Related Job Opportunities</h2>
            <p className="text-muted-foreground">Discover more positions in your field</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded mb-4 w-3/4"></div>
                  <div className="h-3 bg-muted rounded mb-2 w-1/2"></div>
                  <div className="h-8 bg-muted rounded mt-4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (relatedJobs.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Related Job Opportunities</h2>
          <p className="text-muted-foreground">Discover more positions in your field</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedJobs.map((job) => (
            <Card key={job.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {job.title}
                </h3>
                
                {job.location && (
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="line-clamp-1">{job.location}</span>
                  </div>
                )}
                
                {job.salary_range && (
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span className="line-clamp-1">{job.salary_range}</span>
                  </div>
                )}
                
                <Button asChild className="w-full">
                  <Link to={`/jobs/${job.id}`}>
                    View Job
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {relatedJobs.length >= limit && (
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/jobs">View All Jobs</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RelatedJobs;

import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Briefcase, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchJobs } from '@/utils/jobs';
import { Job } from '@/types/job';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

const JobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const { jobs: jobsData } = await fetchJobs(1, 12);
        setJobs(jobsData);
      } catch (error) {
        console.error('Error loading jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(job => 
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Beauty Industry Jobs</h1>
          <p className="text-gray-600 mb-8">
            Find your next opportunity in the beauty industry
          </p>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Search jobs by title, company, or location" 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Button>Filter Results</Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="shadow-sm animate-pulse">
                  <CardContent className="h-40"></CardContent>
                </Card>
              ))}
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <Link to={`/jobs/${job.id}`} key={job.id}>
                  <Card className="overflow-hidden hover:shadow-md transition-all h-full">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden mr-3">
                            <ImageWithFallback
                              src={job.image || ''}
                              alt={job.company || 'Company logo'}
                              className="w-full h-full object-cover"
                              businessName={job.company || 'Beauty Company'}
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-lg">{job.title}</h3>
                            <p className="text-gray-600">{job.company}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-500 mb-2 text-sm">
                        <MapPin className="h-3.5 w-3.5 mr-1.5" />
                        <span>{job.location}</span>
                      </div>

                      <div className="flex items-center text-gray-500 mb-3 text-sm">
                        <Clock className="h-3.5 w-3.5 mr-1.5" />
                        <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
                      </div>

                      {job.description && (
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                          {job.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Briefcase className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-medium mb-2">No jobs found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <Button variant="outline" className="mr-2">Previous</Button>
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobsPage;

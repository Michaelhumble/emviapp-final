
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, MapPin, Calendar } from 'lucide-react';
import { bilingualJobListings } from '@/data/bilingualJobs';
import { Job } from '@/types/job';
import JobGrid from '@/components/jobs/JobGrid';
import { GradientBackground } from '@/components/ui/gradient-background';

const JobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>(bilingualJobListings);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Nail Salon Jobs & Opportunities | EmviApp";
    setIsLoading(true);
    // Simulate loading for better UX
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(job => 
    (job.title?.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (job.company?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (job.location?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (job.description?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (job.vietnamese_description?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (job.specialties?.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <GradientBackground 
          variant="default" 
          className="p-6 md:p-10 mb-8"
        >
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-2">
              Beauty Industry Job Board
            </h1>
            <p className="text-gray-600 mb-8">
              Find your perfect position with our curated nail salon job listings
            </p>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input 
                    placeholder="Search jobs by title, salon, location, or skills" 
                    className="pl-10 h-12"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Button className="h-12 gap-2">
                <Filter size={18} /> Filter Results
              </Button>
            </div>

            <div className="flex flex-wrap gap-3 text-sm">
              <Button variant="outline" size="sm" className="rounded-full">
                All Jobs
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Full-time
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Part-time
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Weekly Pay
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Housing Available
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Training Provided
              </Button>
            </div>
          </div>
        </GradientBackground>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="bg-gray-100 rounded-lg h-80 animate-pulse"
              ></div>
            ))}
          </div>
        ) : filteredJobs.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="text-gray-600">
                Showing {filteredJobs.length} job opportunities
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Latest</Button>
                <Button variant="outline" size="sm">Featured</Button>
              </div>
            </div>
            <JobGrid 
              jobs={filteredJobs} 
              expirations={{}} 
              onRenew={() => {}} 
              isRenewing={false}
              renewalJobId={null}
            />
          </>
        ) : (
          <div className="text-center py-16">
            <div className="rounded-full bg-gray-100 w-16 h-16 mx-auto flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">No jobs found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
            <Button onClick={() => setSearchTerm('')}>Clear Search</Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default JobsPage;

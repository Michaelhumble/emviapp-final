
import React from 'react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Link } from 'react-router-dom';
import jobsData from '@/data/jobsData';
import { ArrowRight } from 'lucide-react';
import ListingsGrid from '@/components/listings/ListingsGrid';

// Limit to 3 job samples for the highlight section
const sampleJobs = jobsData.slice(0, 3).map(job => ({
  ...job, 
  type: 'job'
}));

const JobsHighlight = () => {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="font-playfair text-3xl font-bold mb-4">
            Find Your Dream Job in Beauty
          </h2>
          <p className="text-gray-600 mb-6">
            Discover opportunities in nail salons, hair styling, barbershops, and more. Connect with businesses looking for talented professionals like you.
          </p>
          <Link to="/jobs">
            <Button className="px-8">
              View All Opportunities <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-8">
          <ListingsGrid listings={sampleJobs} />
        </div>

        <div className="text-center mt-10">
          <Link to="/jobs">
            <Button variant="outline">
              Browse All Jobs <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default JobsHighlight;

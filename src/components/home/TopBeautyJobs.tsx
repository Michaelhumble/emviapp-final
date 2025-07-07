
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, DollarSign } from 'lucide-react';

// Static showcase data for homepage
const topJobs = [
  {
    id: 'top-1',
    title: 'Senior Nail Technician',
    company: 'Premium Nails Studio',
    location: 'Los Angeles, CA',
    salary: '$30-40/hr',
    type: 'Full-time',
    posted: '2 days ago'
  },
  {
    id: 'top-2', 
    title: 'Hair Stylist',
    company: 'Elite Beauty Salon',
    location: 'San Francisco, CA',
    salary: '$25-35/hr + tips',
    type: 'Part-time',
    posted: '1 week ago'
  },
  {
    id: 'top-3',
    title: 'Lash Specialist',
    company: 'Beauty Lounge',
    location: 'San Diego, CA', 
    salary: '$20-30/hr',
    type: 'Contract',
    posted: '3 days ago'
  }
];

const TopBeautyJobs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Top Beauty Jobs This Week</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the most sought-after positions in the beauty industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {topJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                <p className="text-gray-600 mb-3">{job.company}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <DollarSign className="h-4 w-4 mr-2" />
                    {job.salary}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    {job.posted}
                  </div>
                </div>

                <Link to="/jobs">
                  <Button className="w-full">View Job Details</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/jobs">
            <Button size="lg" variant="outline">
              View All Job Listings
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopBeautyJobs;


import React from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import jobsData from '@/data/jobsData';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Job } from '@/types/job';

// Define the custom nail salon images from your uploads
const nailSalonImages = [
  "/lovable-uploads/c0ac3c79-c24e-447d-8f7e-054431430c71.png", // Luxury nail salon with gold mirrors
  "/lovable-uploads/7824740d-825d-4819-a4f0-d15534ed13b0.png", // Elegant nail salon with blue chairs
  "/lovable-uploads/499bb702-e4bb-4b1e-8220-ceacadbaf885.png", // Nail salon with gold pendants
  "/lovable-uploads/aeb82d96-8ea7-4da3-855a-984cf34a09a5.png"  // Nail salon with nail art display
];

// Utility function to transform job data to match required Job type
const transformJobData = (job: any): Job => {
  return {
    id: job.id?.toString() || '',
    title: job.title || '',
    company: job.company || '',
    location: job.location || '',
    created_at: job.posted || new Date().toISOString(), 
    description: job.description || '',
    image: job.image || '',
    price: job.price || '',
    status: 'active',
    // Add other required fields with safe defaults
    type: 'job',
    role: job.role || job.title || '',
  };
};

// Get a nail salon image by index, with fallback to prevent out-of-bounds errors
const getNailSalonImage = (index: number): string => {
  return nailSalonImages[index % nailSalonImages.length];
};

export default function HiringSalonsShowcase() {
  // Filter to find hiring-related jobs
  const hiringJobs = jobsData
    .filter(job => 
      job.title?.toLowerCase().includes('hiring') || 
      job.description?.toLowerCase().includes('hiring') ||
      job.title?.toLowerCase().includes('technician') ||
      job.title?.toLowerCase().includes('artist')
    )
    .slice(0, 3)
    .map(transformJobData);
  
  if (hiringJobs.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <Container>
        <div className="text-center mb-8">
          <h2 className="font-playfair text-3xl font-bold mb-2">Nail & Beauty Salons Hiring Now</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find your next opportunity at these premier salons looking for talented professionals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {hiringJobs.map((job, index) => (
            <Card key={index} className="overflow-hidden h-full hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gray-100 w-full overflow-hidden">
                {/* Always use one of the custom uploaded images */}
                <img
                  src={getNailSalonImage(index)}
                  alt={job.title || 'Salon job opportunity'}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="font-medium text-lg mb-1">{job.title}</h3>
                
                <div className="flex items-center text-gray-500 mb-1 text-sm">
                  <Building className="h-3.5 w-3.5 mr-1.5" />
                  <span>{job.company}</span>
                </div>
                
                <div className="flex items-center text-gray-500 mb-2 text-sm">
                  <MapPin className="h-3.5 w-3.5 mr-1.5" />
                  <span>{job.location}</span>
                </div>
                
                <div className="text-gray-600 text-sm line-clamp-2 mb-4">
                  {job.description?.substring(0, 120)}...
                </div>
                
                <Link to={`/jobs/${job.id}`} className="text-primary text-sm font-medium hover:underline">
                  View Job Details →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/jobs">
            <Button variant="outline" size="lg">View All Job Listings</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}

import React from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import jobsData from '@/data/jobsData';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Job } from '@/types/job';

// Define your beautiful uploaded nail salon images
const nailSalonImages = [
  "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png", // Large spacious nail salon with cream chairs
  "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png", // Modern salon with sitting area and large windows
  "/lovable-uploads/d1da4b24-248e-4e84-9289-06237e7d4458.png", // Nail salon with art gallery walls and hanging lights
  "/lovable-uploads/e1ce1662-fb69-4ad9-995a-364ee16e42f6.png", // Clean cream interior with plenty of natural light
  "/lovable-uploads/7a58770c-404e-4259-b1a6-f044c8eefdc0.png", // Modern minimalist white interior with reception
  "/lovable-uploads/c0ac3c79-c24e-447d-8f7e-054431430c71.png"  // Luxury nail salon with gold mirrors
];

// Image tracking to avoid repetition
let currentImageIndex = 0;

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

// Get the next nail salon image without repeating adjacent images
const getNailSalonImage = (): string => {
  // Get current image path
  const imagePath = nailSalonImages[currentImageIndex];
  
  // Advance to next image, loop back when we reach the end
  currentImageIndex = (currentImageIndex + 1) % nailSalonImages.length;
  
  return imagePath;
};

export default function HiringSalonsShowcase() {
  // Reset image index when component renders to ensure consistent rotation
  React.useEffect(() => {
    currentImageIndex = 0;
  }, []);

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
                {/* Use your beautiful uploaded nail salon images */}
                <img
                  src={getNailSalonImage()}
                  alt={job.title || 'Premium nail salon opportunity'}
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

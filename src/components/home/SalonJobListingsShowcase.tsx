
import React from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Building, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchLiveListings } from '@/utils/fetchLiveListings';
import { Job } from '@/types/job';
import ValidatedLink from '@/components/common/ValidatedLink';

export default function SalonJobListingsShowcase() {
  const [hiringSalons, setHiringSalons] = React.useState<Job[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Use these specific nail salon images from your uploads for a consistent look
  const nailSalonImages = [
    "/lovable-uploads/b704ea4b-0b33-4df7-82b7-fc09b0fd3f87.png", // First uploaded image
    "/lovable-uploads/309e611b-a055-4c18-be15-db9fa1da4a03.png", // Second uploaded image  
    "/lovable-uploads/c3f5bfae-e121-4a6c-9703-33ec0b092447.png", // Third uploaded image
  ];

  React.useEffect(() => {
    // Attempt to fetch real listings first
    const fetchSalons = async () => {
      try {
        const listings = await fetchLiveListings({ 
          limit: 3, 
          type: 'job',
          featured: false 
        });
        
        if (listings && listings.length > 0) {
          setHiringSalons(listings);
        } else {
          // Fallback to sample data if no listings found
          setHiringSalons(getSampleSalonJobs());
        }
      } catch (error) {
        console.error('Error loading salon job listings:', error);
        setHiringSalons(getSampleSalonJobs());
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalons();
  }, []);

  if (isLoading) {
    return (
      <section className="py-12 bg-gray-50">
        <Container>
          <div className="text-center">
            <h2 className="font-playfair text-3xl font-bold mb-8">Loading Opportunities...</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <Card key={i} className="overflow-hidden h-full">
                  <div className="aspect-video bg-gray-200 animate-pulse"></div>
                  <CardContent className="p-5">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-1/2"></div>
                    <div className="h-16 bg-gray-200 rounded animate-pulse mb-2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (hiringSalons.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <Container>
        <div className="text-center mb-8">
          <h2 className="font-playfair text-3xl font-bold mb-2">Nail & Beauty Salons Hiring Now</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find your next opportunity at these premier beauty salons looking for talented professionals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {hiringSalons.map((job, index) => (
            <Card key={index} className="overflow-hidden h-full hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gray-100 w-full overflow-hidden">
                {/* Use the specific nail salon images */}
                <img
                  src={nailSalonImages[index % nailSalonImages.length]}
                  alt={job.title || 'Nail salon job opportunity'}
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
                
                <div className="flex justify-between items-center">
                  {job.price && (
                    <div className="text-primary font-medium">{job.price}</div>
                  )}
                  <div className="text-xs text-gray-500 flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>Posted recently</span>
                  </div>
                </div>
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

// Fallback sample data if no live listings are available
function getSampleSalonJobs(): Job[] {
  return [
    {
      id: "1",
      title: "Nail Technician - Full Time",
      company: "Luxury Nail & Spa",
      location: "Los Angeles, CA",
      created_at: new Date().toISOString(),
      description: "We are looking for experienced nail technicians to join our luxury salon. Competitive pay plus tips and benefits.",
      price: "$25-35/hr + tips",
      status: "active",
      type: "job",
    },
    {
      id: "2",
      title: "Senior Nail Artist",
      company: "Glam Nails Studio",
      location: "New York, NY",
      created_at: new Date().toISOString(),
      description: "High-end nail studio seeking creative senior nail artist with excellent client service skills and 3+ years experience.",
      price: "$30-40/hr + tips",
      status: "active",
      type: "job",
    },
    {
      id: "3", 
      title: "Nail Salon Manager",
      company: "Elite Beauty Bar",
      location: "Miami, FL",
      created_at: new Date().toISOString(),
      description: "Experienced salon manager needed for upscale nail salon. Must have leadership experience and cosmetology license.",
      price: "$65K-75K/year",
      status: "active",
      type: "job",
    }
  ];
}

// Export the sample salon jobs for other components to use if needed
export const sampleSalonJobs = getSampleSalonJobs;

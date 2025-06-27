
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import SalonListings from '@/components/salons/SalonListings';
import jobsData from '@/data/jobsData';
import { vietnameseSalonListings } from '@/data/salonData';
import SalonsLoadingState from '@/components/salons/SalonsLoadingState';
import { Link } from 'react-router-dom';
import { Job } from '@/types/job';
import { determineSalonCategory, getDefaultSalonImage } from '@/utils/salonImageFallbacks';
import ValidatedLink from '@/components/common/ValidatedLink';

// Transform job data to match the Job type with enhanced image selection
const transformSalonData = (job: any): Job => {
  // Determine the appropriate salon category for image selection
  const category = determineSalonCategory(job.description || '', job.title || job.name || '');
  
  // Get an appropriate image based on salon type
  let imageUrl = job.image || job.imageUrl || '';
  
  // Only assign a new image if one doesn't already exist
  if (!imageUrl || !imageUrl.includes('lovable-uploads')) {
    imageUrl = getDefaultSalonImage(category, job.is_featured || false);
  }
  
  return {
    id: job.id?.toString() || '',
    title: job.title || job.name || '',
    company: job.company || job.name || '',
    location: job.location || '',
    created_at: job.posted || job.created_at || new Date().toISOString(),
    description: job.description || '',
    image: imageUrl,
    imageUrl: imageUrl, // Ensure both image fields are set for compatibility
    price: job.price?.toString() || '',
    salon_features: job.features || [],
    type: 'salon',
    for_sale: true,
    category: 'Other', // Default category for salon listings
    // Vietnamese fields if available
    vietnamese_description: job.vietnamese_description || '',
    is_vietnamese_listing: job.is_vietnamese_listing || false,
    contact_info: {
      owner_name: job.contact_info?.owner_name || "Salon Owner",
      phone: job.contact_info?.phone || "(555) 123-4567",
      email: job.contact_info?.email || "contact@emviapp.com"
    }
  };
};

export default function SalonsForSale() {
  const [loading, setLoading] = useState(true);

  // Simulate loading for a better user experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Get Vietnamese salon listings first with enhanced image selection
  const vietnameseListings = vietnameseSalonListings?.map(transformSalonData) || [];

  // Convert jobsData to Job type and filter for salon listings with enhanced image selection
  const salonJobListings = jobsData
    .filter(job => 
      job.title?.includes("Salon") || 
      job.company?.includes("Salon") || 
      job.description?.includes("salon") ||
      job.price // If it has a price, it's likely for sale
    )
    .map(transformSalonData);
    
  // Combine Vietnamese and regular listings
  const allSalonListings = [...vietnameseListings, ...salonJobListings];

  return (
    <section className="py-12 bg-gray-50">
      <Container>
        <div className="text-center mb-10">
          <h2 className="font-playfair text-3xl font-bold mb-2">Tiệm Nail Cần Bán</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Browse our curated selection of nail salons for sale across the United States.
            Find your next business opportunity with EmviApp.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/salons">
              <Button variant="outline">View All Listings</Button>
            </Link>
            <ValidatedLink to="/salon-owners" listingId="salon-owners" listingType="page" fallbackRoute="/signup">
              <Button>List Your Salon</Button>
            </ValidatedLink>
          </div>
        </div>

        <Card className="border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-medium">Featured Salon Listings</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SalonsLoadingState count={4} />
            ) : (
              <SalonListings salonsForSale={allSalonListings} />
            )}
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}

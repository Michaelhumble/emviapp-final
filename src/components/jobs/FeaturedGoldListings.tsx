
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign } from 'lucide-react';
import { Job } from '@/types/job';
import BilingualJobCard from './BilingualJobCard';

// Sample gold-tier job listings with categories
const goldJobs: Job[] = [
  {
    id: "gold-1",
    title: "Senior Nail Technician - Premium Salon",
    company: "Luxe Nail Studio",
    location: "Beverly Hills, CA",
    created_at: new Date().toISOString(),
    description: "Premium nail salon seeking experienced technician for high-end clientele. Advanced nail art skills required.",
    image: "/lovable-uploads/583cdb14-9991-4d8f-8d00-711aa760fdeb.png",
    pricingTier: "gold",
    category: "Nail Tech"
  },
  {
    id: "gold-2", 
    title: "Master Hair Colorist Position",
    company: "Elite Hair Collective",
    location: "Manhattan, NY",
    created_at: new Date().toISOString(),
    description: "Seeking master colorist for upscale salon. Celebrity clientele, high compensation package.",
    image: "/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png",
    pricingTier: "gold",
    category: "Hair Stylist"
  },
  {
    id: "gold-3",
    title: "Volume Lash Specialist",
    company: "Bella Vista Lashes",
    location: "Miami Beach, FL", 
    created_at: new Date().toISOString(),
    description: "Expert lash artist needed for luxury lash studio. Russian volume technique required.",
    image: "/lovable-uploads/8fce2e0f-98d1-4ee6-8e30-a81575dee63a.png",
    pricingTier: "gold",
    category: "Lash Tech"
  }
];

const FeaturedGoldListings = () => {
  const viewJobDetails = (job: Job) => {
    console.log('Viewing job details for:', job.id);
    // Handle job details view
  };

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
          <DollarSign className="h-4 w-4 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gold Featured Listings</h2>
          <p className="text-gray-600">Premium opportunities from top-tier salons and studios</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goldJobs.map((job) => (
          <BilingualJobCard 
            key={job.id}
            job={job}
            onViewDetails={() => viewJobDetails(job)} 
            onRenew={() => {}}
            isRenewing={false}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedGoldListings;

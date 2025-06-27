
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Briefcase } from 'lucide-react';
import { Job } from '@/types/job';
import BilingualJobCard from './BilingualJobCard';

// Sample premium job listings with categories
const premiumJobs: Job[] = [
  {
    id: "premium-1",
    title: "Nail Artist - High-End Salon",
    company: "Diamond Nail Spa",
    location: "Los Angeles, CA",
    created_at: new Date().toISOString(),
    description: "Exclusive nail salon seeking talented artist for celebrity and VIP clientele. Exceptional compensation.",
    image: "/lovable-uploads/583cdb14-9991-4d8f-8d00-711aa760fdeb.png",
    pricingTier: "premium",
    category: "Nail Tech"
  },
  {
    id: "premium-2",
    title: "Senior Hair Stylist",
    company: "Platinum Hair Studio",
    location: "New York, NY", 
    created_at: new Date().toISOString(),
    description: "Prestigious hair studio seeking senior stylist with extensive fashion and editorial experience.",
    image: "/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png",
    pricingTier: "premium",
    category: "Hair Stylist"
  },
  {
    id: "premium-3",
    title: "Master Lash Technician",
    company: "Elite Lash Lounge",
    location: "San Francisco, CA",
    created_at: new Date().toISOString(),
    description: "Luxury lash studio seeking master technician specializing in advanced lash techniques.",
    image: "/lovable-uploads/8fce2e0f-98d1-4ee6-8e30-a81575dee63a.png",
    pricingTier: "premium",
    category: "Lash Tech"
  }
];

const PremiumListingsSection = () => {
  const viewJobDetails = (job: Job) => {
    console.log('Viewing premium job details for:', job.id);
    // Handle job details view
  };

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
          <Star className="h-4 w-4 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Premium Listings</h2>
          <p className="text-gray-600">Exclusive opportunities from elite beauty establishments</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {premiumJobs.map((job) => (
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

export default PremiumListingsSection;

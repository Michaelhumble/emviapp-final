
import React, { useState, useEffect } from 'react';
import { Job } from '@/types/job';
import { getFeaturedJobs, getAllJobs, getAllBooths, getSalonsForSale } from '@/utils/featuredContent';
import OpportunitiesSection from './opportunities/OpportunitiesSection';

const LatestIndustryOpportunities = () => {
  const [diverseListings, setDiverseListings] = useState<Job[]>([]);

  useEffect(() => {
    const loadDiverseListings = async () => {
      const booths = getAllBooths(3);
      const salonsForSale = getSalonsForSale(3);
      const allJobs = getAllJobs(15);
      
      let mixed: Job[] = [
        // Hair industry position
        {
          id: '1',
          title: "Senior Hair Stylist",
          company: "Luxe Hair Studio",
          location: "Denver, CO",
          description: "Seeking experienced hair stylist with color expertise. Base + commission structure, flexible schedule.",
          specialties: ["Hair", "Color", "Styling"],
          for_sale: false,
          created_at: new Date().toISOString()
        },
        // Nail position
        {
          id: '2',
          title: "Nail Tech - Private Suite",
          company: "The Nail Collective",
          location: "Austin, TX",
          description: "Private suite available for experienced nail technician. High-end clientele, modern facility.",
          specialties: ["Nails", "Manicure", "Pedicure"],
          for_sale: false,
          created_at: new Date().toISOString()
        },
        // Spa position
        {
          id: '3',
          title: "Spa Manager",
          company: "Serenity Wellness Center",
          location: "Seattle, WA",
          description: "Leading luxury day spa seeking experienced manager. Full benefits package.",
          specialties: ["Management", "Spa", "Wellness"],
          for_sale: false,
          created_at: new Date().toISOString()
        },
        // Salon for sale
        {
          id: '4',
          title: "Established Hair Salon For Sale",
          company: "Premier Salon",
          location: "Phoenix, AZ",
          description: "10-year established salon, prime location, 8 stations, strong clientele base.",
          specialties: ["Business", "Salon"],
          for_sale: true,
          asking_price: "$175,000",
          created_at: new Date().toISOString()
        },
        // Booth rental
        {
          id: '5',
          title: "Luxury Booth Rental",
          company: "The Style House",
          location: "Miami, FL",
          description: "Premium booth space available in upscale salon. High foot traffic area.",
          specialties: ["Booth Rental", "Hair"],
          for_sale: false,
          created_at: new Date().toISOString()
        },
        // Tattoo artist
        {
          id: '6',
          title: "Experienced Tattoo Artist",
          company: "Black Iris Tattoo",
          location: "Portland, OR",
          description: "Seeking professional tattoo artist for established studio. Commission-based position.",
          specialties: ["Tattoo", "Art"],
          for_sale: false,
          created_at: new Date().toISOString()
        },
        // Beauty supply business
        {
          id: '7',
          title: "Beauty Supply Store For Sale",
          company: "Beauty Essentials",
          location: "Atlanta, GA",
          description: "Profitable beauty supply store with loyal customer base. Includes inventory.",
          specialties: ["Retail", "Beauty Supply"],
          for_sale: true,
          asking_price: "$220,000",
          created_at: new Date().toISOString()
        },
        // Esthetician
        {
          id: '8',
          title: "Licensed Esthetician",
          company: "Glow Skincare",
          location: "San Diego, CA",
          description: "Full-time position for licensed esthetician. Medical spa environment.",
          specialties: ["Skincare", "Esthetics"],
          for_sale: false,
          created_at: new Date().toISOString()
        },
        // Wellness studio
        {
          id: '9',
          title: "Wellness Studio Partnership",
          company: "Balance Wellness",
          location: "Chicago, IL",
          description: "Seeking partner for established wellness studio. Ideal for licensed massage therapist.",
          specialties: ["Wellness", "Massage", "Partnership"],
          for_sale: true,
          created_at: new Date().toISOString()
        }
      ];

      setDiverseListings(mixed);
    };
    
    loadDiverseListings();
  }, []);

  return <OpportunitiesSection diverseListings={diverseListings} />;
};

export default LatestIndustryOpportunities;


import React, { useState, useEffect } from 'react';
import { Job } from '@/types/job';
import OpportunitiesSection from './opportunities/OpportunitiesSection';
import { v4 as uuidv4 } from 'uuid';
import { verifyOpportunityListings, enhanceListingWithImage } from '@/utils/listingsVerification';

const LatestIndustryOpportunities = () => {
  const [diverseListings, setDiverseListings] = useState<Job[]>([]);

  useEffect(() => {
    const loadDiverseListings = async () => {
      // Create a diverse set of listings with unique IDs
      let mixed: Job[] = [
        // Nail industry position - Proper title to match image mapping
        {
          id: 'op-nail-' + uuidv4().slice(0, 8),
          title: "Nail Tech - Private Suite",
          company: "The Nail Collective",
          location: "Austin, TX",
          description: "Private suite available for experienced nail technician. High-end clientele, modern facility.",
          specialties: ["Nails", "Manicure", "Pedicure"],
          for_sale: false,
          created_at: new Date().toISOString(),
          type: 'job',
          imageUrl: "/lovable-uploads/72f0f6c8-5793-4750-993d-f250b495146d.png" // Ensure correct image
        },
        // Hair industry position
        {
          id: 'op-hair-' + uuidv4().slice(0, 8),
          title: "Senior Hair Stylist",
          company: "Luxe Hair Studio",
          location: "Denver, CO",
          description: "Seeking experienced hair stylist with color expertise. Base + commission structure, flexible schedule.",
          specialties: ["Hair", "Color", "Styling"],
          for_sale: false,
          created_at: new Date().toISOString(),
          type: 'job'
        },
        // Spa position
        {
          id: 'op-spa-' + uuidv4().slice(0, 8),
          title: "Spa Manager",
          company: "Serenity Wellness Center",
          location: "Seattle, WA",
          description: "Leading luxury day spa seeking experienced manager. Full benefits package.",
          specialties: ["Management", "Spa", "Wellness"],
          for_sale: false,
          created_at: new Date().toISOString(),
          type: 'opportunity',
          imageUrl: "/lovable-uploads/4c2d8a4c-e191-40a0-8666-147cbcc488d4.png" // Spa manager image
        },
        // Salon for sale
        {
          id: 'op-sale-' + uuidv4().slice(0, 8),
          title: "Established Hair Salon For Sale",
          company: "Premier Salon",
          location: "Phoenix, AZ",
          description: "10-year established salon, prime location, 8 stations, strong clientele base.",
          specialties: ["Business", "Salon"],
          for_sale: true,
          asking_price: "$175,000",
          created_at: new Date().toISOString(),
          type: 'salon'
        },
        // Booth rental - Proper title to match image mapping
        {
          id: 'op-booth-' + uuidv4().slice(0, 8),
          title: "Luxury Booth Rental",
          company: "The Style House",
          location: "Miami, FL",
          description: "Premium booth space available in upscale salon. High foot traffic area.",
          specialties: ["Booth Rental", "Hair"],
          for_sale: false,
          created_at: new Date().toISOString(),
          type: 'salon',
          imageUrl: "/lovable-uploads/52b943aa-d9b3-46ce-9f7f-94f3b223cb28.png" // Ensure correct image
        },
        // Tattoo artist - Proper title to match image mapping
        {
          id: 'op-tattoo-' + uuidv4().slice(0, 8),
          title: "Experienced Tattoo Artist",
          company: "Black Iris Tattoo",
          location: "Portland, OR",
          description: "Seeking professional tattoo artist for established studio. Commission-based position.",
          specialties: ["Tattoo", "Art"],
          for_sale: false,
          created_at: new Date().toISOString(),
          type: 'opportunity',
          imageUrl: "/lovable-uploads/21d69945-acea-4057-9ff0-df824cd3c607.png" // Ensure correct image
        },
        // Beauty supply business
        {
          id: 'op-supply-' + uuidv4().slice(0, 8),
          title: "Beauty Supply Store For Sale",
          company: "Beauty Essentials",
          location: "Atlanta, GA",
          description: "Profitable beauty supply store with loyal customer base. Includes inventory.",
          specialties: ["Retail", "Beauty Supply"],
          for_sale: true,
          asking_price: "$220,000",
          created_at: new Date().toISOString(),
          type: 'opportunity'
        },
        // Esthetician - Proper title to match image mapping
        {
          id: 'op-esth-' + uuidv4().slice(0, 8),
          title: "Licensed Esthetician",
          company: "Glow Skincare",
          location: "San Diego, CA",
          description: "Full-time position for licensed esthetician. Medical spa environment.",
          specialties: ["Skincare", "Esthetics"],
          for_sale: false,
          created_at: new Date().toISOString(),
          type: 'job',
          imageUrl: "/lovable-uploads/16e16a16-df62-4741-aec7-3364fdc958ca.png" // Ensure correct image
        },
        // Wellness studio
        {
          id: 'op-well-' + uuidv4().slice(0, 8),
          title: "Wellness Studio Partnership",
          company: "Balance Wellness",
          location: "Chicago, IL",
          description: "Seeking partner for established wellness studio. Ideal for licensed massage therapist.",
          specialties: ["Wellness", "Massage", "Partnership"],
          for_sale: true,
          created_at: new Date().toISOString(),
          type: 'opportunity',
          imageUrl: "/lovable-uploads/ec5e520a-440f-4a62-bee8-23ba0c7e7c4c.png" // Wellness studio image
        }
      ];

      // Verify each listing has a valid ID
      mixed = mixed.map(listing => {
        if (!listing.id) {
          console.warn('Found listing without ID, generating one:', listing);
          return { ...listing, id: 'op-' + uuidv4().slice(0, 8) };
        }
        return listing;
      });

      // Run verification to ensure all listings have proper routing
      const verificationResults = verifyOpportunityListings(mixed);
      
      // Enhance all listings with appropriate images, but keep the user-specified images
      const enhancedListings = verificationResults.validListings.map(listing => {
        // If a user specified image exists, don't enhance it
        if (listing.imageUrl && listing.imageUrl.includes('lovable-uploads')) {
          return listing;
        }
        return enhanceListingWithImage(listing);
      });
      
      if (!verificationResults.isValid) {
        console.error("⚠️ Opportunity listings verification failed:", verificationResults.issues);
        console.log(`✅ Using ${enhancedListings.length} valid listings after filtering out ${mixed.length - enhancedListings.length} invalid ones`);
      } else {
        console.log(`✅ All ${verificationResults.totalListings} opportunity listings verified and enhanced with proper images`);
      }

      setDiverseListings(enhancedListings);
    };
    
    loadDiverseListings();
  }, []);

  return <OpportunitiesSection diverseListings={diverseListings} />;
};

export default LatestIndustryOpportunities;

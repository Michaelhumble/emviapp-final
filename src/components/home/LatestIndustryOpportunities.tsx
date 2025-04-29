
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
        // Nail position
        {
          id: 'op-nail-' + uuidv4().slice(0, 8),
          title: "Nail Tech - Private Suite",
          company: "The Nail Collective",
          location: "Austin, TX",
          description: "Private suite available for experienced nail technician. High-end clientele, modern facility.",
          specialties: ["Nails", "Manicure", "Pedicure"],
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
          type: 'opportunity'
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
        // Booth rental
        {
          id: 'op-booth-' + uuidv4().slice(0, 8),
          title: "Luxury Booth Rental",
          company: "The Style House",
          location: "Miami, FL",
          description: "Premium booth space available in upscale salon. High foot traffic area.",
          specialties: ["Booth Rental", "Hair"],
          for_sale: false,
          created_at: new Date().toISOString(),
          type: 'salon'
        },
        // Tattoo artist
        {
          id: 'op-tattoo-' + uuidv4().slice(0, 8),
          title: "Experienced Tattoo Artist",
          company: "Black Iris Tattoo",
          location: "Portland, OR",
          description: "Seeking professional tattoo artist for established studio. Commission-based position.",
          specialties: ["Tattoo", "Art"],
          for_sale: false,
          created_at: new Date().toISOString(),
          type: 'opportunity'
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
        // Esthetician
        {
          id: 'op-esth-' + uuidv4().slice(0, 8),
          title: "Licensed Esthetician",
          company: "Glow Skincare",
          location: "San Diego, CA",
          description: "Full-time position for licensed esthetician. Medical spa environment.",
          specialties: ["Skincare", "Esthetics"],
          for_sale: false,
          created_at: new Date().toISOString(),
          type: 'job'
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
          type: 'opportunity'
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
      
      // Enhance all listings with appropriate images
      const enhancedListings = verificationResults.validListings.map(listing => 
        enhanceListingWithImage(listing)
      );
      
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

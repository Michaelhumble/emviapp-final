import React, { useState, useEffect } from 'react';
import { Job } from '@/types/job';
import OpportunitiesSection from './opportunities/OpportunitiesSection';
import { v4 as uuidv4 } from 'uuid';
import { verifyOpportunityListings, enhanceListingWithImage, isListingDisplayable } from '@/utils/listingsVerification';

const LatestIndustryOpportunities = () => {
  const [diverseListings, setDiverseListings] = useState<Job[]>([]);
  const [validationStats, setValidationStats] = useState({
    total: 0,
    valid: 0,
    removed: 0,
    fixed: 0
  });

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

      const initialCount = mixed.length;
      let fixedCount = 0;
      let removedCount = 0;
      
      // Step 1: Verify each listing has a valid ID
      mixed = mixed.map(listing => {
        if (!listing.id) {
          console.warn('Found listing without ID, generating one:', listing);
          fixedCount++;
          return { ...listing, id: 'op-' + uuidv4().slice(0, 8) };
        }
        return listing;
      });

      // Step 2: Run verification to ensure all listings have proper routing
      const verificationResults = verifyOpportunityListings(mixed);
      
      // Step 3: Remove listings with critical issues but log what was removed
      if (!verificationResults.isValid) {
        removedCount += (mixed.length - verificationResults.validListings.length);
        console.error("⚠️ Removed invalid listings:", verificationResults.issues);
        mixed = verificationResults.validListings;
      }
      
      // Step 4: Enhance remaining listings with appropriate images
      let enhancedListings = mixed.map(listing => {
        // If a user specified image exists, don't enhance it
        if (listing.imageUrl && typeof listing.imageUrl === 'string' && listing.imageUrl.indexOf('lovable-uploads') !== -1) {
          return listing;
        }
        fixedCount++;
        return enhanceListingWithImage(listing);
      });
      
      // Step 5: Final validation pass - only keep listings that are fully displayable
      const finalListings = enhancedListings.filter(listing => isListingDisplayable(listing));
      
      if (finalListings.length < enhancedListings.length) {
        removedCount += (enhancedListings.length - finalListings.length);
        console.warn(`⚠️ Filtered out ${enhancedListings.length - finalListings.length} listings that failed final validation`);
      }
      
      // Log final validation statistics
      console.log(`✅ Beauty Exchange Validation Complete:`);
      console.log(`   - Total listings: ${initialCount}`);
      console.log(`   - Fixed listings: ${fixedCount}`);
      console.log(`   - Removed listings: ${removedCount}`);
      console.log(`   - Final valid listings: ${finalListings.length}`);
      
      setValidationStats({
        total: initialCount,
        valid: finalListings.length,
        removed: removedCount,
        fixed: fixedCount
      });

      setDiverseListings(finalListings);
    };
    
    loadDiverseListings();
  }, []);

  return <OpportunitiesSection diverseListings={diverseListings} />;
};

export default LatestIndustryOpportunities;

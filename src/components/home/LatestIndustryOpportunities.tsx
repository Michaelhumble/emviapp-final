
import React, { useState, useEffect } from 'react';
import { Job } from '@/types/job';
import { getFeaturedJobs, getAllJobs, getAllBooths, getSalonsForSale } from '@/utils/featuredContent';
import OpportunitiesSection from './opportunities/OpportunitiesSection';

const LatestIndustryOpportunities = () => {
  const [diverseListings, setDiverseListings] = useState<Job[]>([]);

  useEffect(() => {
    const loadDiverseListings = async () => {
      // Get all types of listings
      const booths = getAllBooths(3);
      const salonsForSale = getSalonsForSale(3);
      const allJobs = getAllJobs(15);
      
      let mixed: Job[] = [];
      
      // Add a hair salon position
      const hairSalon = allJobs.find(job => 
        job.specialties?.some(s => s.toLowerCase().includes('hair')) || 
        job.title?.toLowerCase().includes('hair stylist')
      );
      if (hairSalon) mixed.push(hairSalon);
      
      // Add a nail technician position
      const nailTech = allJobs.find(job => 
        job.specialties?.some(s => s.toLowerCase().includes('nail')) && 
        !mixed.some(item => item.id === job.id)
      );
      if (nailTech) mixed.push(nailTech);
      
      // Add a spa or wellness position
      const spa = allJobs.find(job => 
        (job.specialties?.some(s => 
          s.toLowerCase().includes('spa') || 
          s.toLowerCase().includes('massage')
        ) ||
        job.title?.toLowerCase().includes('spa manager')) &&
        !mixed.some(item => item.id === job.id)
      );
      if (spa) mixed.push(spa);
      
      // Add a booth rental
      if (booths.length > 0) {
        const booth = booths.find(b => !mixed.some(item => item.id === b.id));
        if (booth) mixed.push(booth);
      }
      
      // Add a salon for sale
      if (salonsForSale.length > 0) {
        const salonSale = salonsForSale.find(s => !mixed.some(item => item.id === s.id));
        if (salonSale) mixed.push(salonSale);
      }
      
      // Add a tattoo artist or beauty supply position
      const other = allJobs.find(job => 
        (job.specialties?.some(s => 
          s.toLowerCase().includes('tattoo') || 
          s.toLowerCase().includes('beauty supply')
        ) ||
        job.title?.toLowerCase().includes('tattoo artist')) &&
        !mixed.some(item => item.id === job.id)
      );
      if (other) mixed.push(other);
      
      // Fill remaining slots with diverse positions
      while (mixed.length < 9) {
        const remaining = allJobs.filter(job => 
          !mixed.some(item => item.id === job.id) &&
          !job.specialties?.some(s => 
            mixed.some(m => m.specialties?.includes(s))
          )
        );
        
        if (remaining.length === 0) break;
        mixed.push(remaining[Math.floor(Math.random() * remaining.length)]);
      }
      
      // Ensure exactly 9 listings
      mixed = mixed.slice(0, 9);
      
      // Randomize order for variety
      mixed.sort(() => Math.random() - 0.5);
      
      setDiverseListings(mixed);
    };
    
    loadDiverseListings();
  }, []);

  return <OpportunitiesSection diverseListings={diverseListings} />;
};

export default LatestIndustryOpportunities;

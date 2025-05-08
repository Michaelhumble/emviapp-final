import React, { useState, useEffect } from "react";
import { Job } from "@/types/job";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, DollarSign, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface VietnameseJobSectionProps {
  vietnameseJobs: Job[];
  onViewDetails: (job: Job) => void;
  searchTerm?: string;
}

const VietnameseJobSection = ({ 
  vietnameseJobs, 
  onViewDetails, 
  searchTerm = "" 
}: VietnameseJobSectionProps) => {
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(vietnameseJobs);
  const [nailImages, setNailImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch nail salon images from Supabase bucket
  useEffect(() => {
    const fetchNailImages = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.storage.from('nails').list('', {
          sortBy: { column: 'name', order: 'asc' },
        });
        
        if (error) {
          console.error('Error fetching nail images:', error);
          return;
        }
        
        if (data) {
          // Get public URLs for all images
          const imageUrls = data.map(file => {
            const publicUrl = supabase.storage.from('nails').getPublicUrl(file.name).data.publicUrl;
            return publicUrl;
          });
          
          setNailImages(imageUrls);
        }
      } catch (err) {
        console.error('Failed to fetch nail salon images:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNailImages();
  }, []);
  
  // Filter jobs based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredJobs(vietnameseJobs);
      return;
    }
    
    const filtered = vietnameseJobs.filter(job => 
      job.location && 
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredJobs(filtered);
  }, [vietnameseJobs, searchTerm]);

  // This component functionality has been moved to TopDiamondFeaturedSection
  // We're keeping this empty component for compatibility
  return null;
};

export default VietnameseJobSection;


import React, { useState, useEffect } from "react";
import { Job } from "@/types/job";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, DollarSign, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";

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
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  
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

  // Filter jobs that are salons for sale
  const salonSaleJobs = filteredJobs.filter(job => job.is_salon_for_sale === true);

  // Handle view details - respecting sign-in state
  const handleViewDetails = (job: Job) => {
    if (isSignedIn) {
      onViewDetails(job);
    } else {
      // If not signed in, still show modal but with limited info
      onViewDetails(job);
    }
  };

  if (!salonSaleJobs.length) return null;

  return (
    <motion.section
      className="mt-8 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl lg:text-3xl font-playfair font-semibold">
          💼 Salons For Sale
        </h2>
        <Button variant="outline" className="hidden md:flex">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {salonSaleJobs.map((job) => (
          <Card
            key={job.id}
            className="overflow-hidden border border-emerald-100 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="aspect-video relative">
              <img
                src={job.image}
                alt={job.title}
                className="w-full h-full object-cover"
              />
            </div>

            <CardContent className="p-6">
              <div className="mb-3">
                <h3 className="font-playfair font-semibold text-lg">{job.title}</h3>
                <p className="text-gray-600">{job.location}</p>
              </div>

              {job.sale_price && (
                <div className="flex items-center text-emerald-600 font-semibold text-lg mb-2">
                  <DollarSign className="h-5 w-5 mr-1" /> {job.sale_price || "290,000"}
                </div>
              )}

              <div className="flex items-center text-sm text-gray-600 mb-3">
                <Calendar className="h-4 w-4 mr-1" /> {new Date(job.created_at).toLocaleDateString()}
              </div>

              {job.station_count && (
                <div className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Stations:</span> {job.station_count || "10"}
                </div>
              )}

              {job.monthly_revenue && (
                <div className="text-sm text-gray-700 mb-3">
                  <span className="font-medium">Monthly Revenue:</span> {job.monthly_revenue || "$25,000"}
                </div>
              )}

              <Button
                className="w-full font-bold bg-emerald-500 hover:bg-emerald-600 text-white mt-2"
                onClick={() => handleViewDetails(job)}
              >
                Xem Chi Tiết
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
};

export default VietnameseJobSection;

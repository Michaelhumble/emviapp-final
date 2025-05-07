import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Lock } from "lucide-react";
import { Job } from "@/types/job";
import { useAuth } from "@/context/auth";
import { useNavigate } from 'react-router-dom';
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface VietnameseJobCardProps {
  job: Job;
  onViewDetails: () => void;
}

const VietnameseJobCard = ({ job, onViewDetails }: VietnameseJobCardProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (user) {
      onViewDetails();
    } else {
      // Redirect to sign in if needed
      navigate('/jobs');
    }
  };
  
  // Determine if this is a pinned job
  const isPinned = job.isPinned === true;
  const isMagicNails = job.title?.includes('Magic Nails') || job.company?.includes('Magic Nails');
  const isExpired = job.status === 'expired';
  
  // Get job image based on job ID - ensuring each job has a unique image
  const getJobImage = () => {
    // If it's Magic Nails (pinned showcase), keep its specific image
    if (isMagicNails) {
      return "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png";
    }
    
    // For other jobs, assign a unique image based on job ID or index
    const jobId = job.id;
    
    // Map specific job IDs to unique nail salon images
    switch(jobId) {
      // Active jobs with unique images
      case "job-001": return "/lovable-uploads/c1533abd-8de5-4ec3-8ee5-868538a5d6dd.png";
      case "job-002": return "/lovable-uploads/11925359-6327-46e7-b52e-79b4a4111e34.png";
      case "job-003": return "/lovable-uploads/1575b88f-f835-4d89-9109-bf518fc4cfb1.png";
      case "job-004": return "/lovable-uploads/7a729a53-192a-40cd-a28f-e28023529d8f.png";
      case "job-005": return "/lovable-uploads/19f9a395-4b4e-4e60-bd13-e0cde9064550.png";
      
      // Expired jobs with unique images
      case "job-006": return "/lovable-uploads/8283328c-3a93-4562-be8b-32c35c31a600.png";
      case "job-007": return "/lovable-uploads/8858fff4-1fa3-4803-86b1-beadca5fd1df.png";
      case "job-008": return "/lovable-uploads/2542d0a3-5117-433d-baee-5c0fe2bfeca2.png";
      case "job-009": return "/lovable-uploads/89855878-2908-47b5-98b0-1935d73cdd71.png";
      
      // Default in case of any other job ID
      default: return job.image || "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png";
    }
  };
  
  const jobImage = getJobImage();
  
  return (
    <Card 
      className={`
        overflow-hidden hover:shadow-lg transition-all duration-300 rounded-2xl
        ${isPinned && isMagicNails ? 'ring-2 ring-[#FFD700] bg-[#FAF3E0] shadow-xl' : 'ring-1 ring-gray-100 bg-white'}
        ${isExpired ? 'opacity-80' : ''}
        transform hover:-translate-y-1 hover:scale-[1.01]
      `}
    >
      {(jobImage || isMagicNails) && (
        <div className="h-40 w-full overflow-hidden relative">
          <ImageWithFallback 
            src={jobImage} 
            alt={job.title || "Job listing"}
            className="w-full h-full object-cover"
            fallbackImage="/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png"
          />
          
          {isPinned && isMagicNails && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-[#FFD700] text-black px-3 py-1 rounded-full text-xs shadow-md hover:animate-pulse">
                🏆 EmviApp Premium Showcase
              </Badge>
            </div>
          )}
        </div>
      )}
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-playfair font-semibold text-lg leading-tight">
              {job.title}
            </h3>
            
            {isPinned && isMagicNails && (
              <p className="text-emerald-700 text-sm mt-1 italic">
                ✨ Featured by EmviApp. Our most loved salon this month.
              </p>
            )}
          </div>
          
          <div className="flex flex-wrap gap-1">
            {isExpired && (
              <Badge className="bg-red-100 text-red-800 font-medium">
                Đã hết hạn
              </Badge>
            )}
            
            {isPinned && !isMagicNails && !isExpired && (
              <Badge className="bg-amber-100 text-amber-800 font-medium">
                Tin Gấp
              </Badge>
            )}
            
            {job.is_urgent && !isPinned && !isExpired && (
              <Badge className="bg-rose-100 text-rose-800 font-medium">
                Gấp
              </Badge>
            )}
            
            {job.is_featured && !job.is_urgent && !isPinned && !isExpired && (
              <Badge className="bg-blue-100 text-blue-800 font-medium">
                Nổi Bật
              </Badge>
            )}
          </div>
        </div>
        
        <p className="text-gray-700 mt-1 font-medium">{job.company}</p>
        
        <div className="flex items-center text-gray-600 mt-3 text-sm">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span>{job.location}</span>
        </div>
        
        <p className="mt-4 text-gray-800 line-clamp-3">
          {job.description}
        </p>
        
        <div className="mt-4 font-medium text-emerald-700 text-lg">
          {job.salary_range || job.compensation_details}
        </div>
        
        {/* Add FOMO line below salary for Magic Nails */}
        {isPinned && isMagicNails && (
          <div className="mt-2 text-red-500 font-medium text-sm flex items-center">
            🔥 Most Viewed Listing of the Month
          </div>
        )}
        
        <div className="flex flex-wrap gap-1.5 mt-4">
          {job.specialties && job.specialties.map((specialty, index) => (
            <Badge key={index} variant="outline" className="bg-gray-50 px-2.5 py-1">
              {specialty}
            </Badge>
          ))}
        </div>
        
        <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
          <div className="flex items-center text-gray-600 text-sm">
            {user ? (
              <div className="flex items-center">
                <Phone className="h-3.5 w-3.5 mr-1.5" />
                <span className="font-medium">{job.contact_info?.phone}</span>
              </div>
            ) : (
              <div className="flex items-center text-gray-500">
                <Lock className="h-3.5 w-3.5 mr-1.5" />
                <span>🔒 Đăng nhập để xem liên hệ</span>
              </div>
            )}
          </div>
          
          <Button 
            onClick={handleClick}
            className="bg-[#9B51E0] hover:bg-[#8A3FD1] text-white transition-all duration-200 
                     hover:shadow-md hover:shadow-purple-200 transform hover:scale-105"
            size="sm"
          >
            Xem Chi Tiết
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VietnameseJobCard;

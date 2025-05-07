
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
  
  // Get a specific image for Magic Nails
  const magicNailsImage = isMagicNails ? 
    "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png" : 
    job.image;
  
  // Get a nail salon image from our collection if the job doesn't have one
  const jobImage = job.image || 
    isMagicNails ? 
      "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png" : 
      "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png";
  
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

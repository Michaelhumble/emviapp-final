
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Lock } from "lucide-react";
import { Job } from "@/types/job";
import { useAuth } from "@/context/auth";
import { useNavigate } from 'react-router-dom';

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
  
  return (
    <Card 
      className={`
        overflow-hidden hover:shadow-lg transition-all duration-300 rounded-2xl
        ${isPinned && isMagicNails ? 'ring-2 ring-[#FFD700] bg-[#FFF8E7]' : 'ring-1 ring-gray-100 bg-white'}
        transform hover:-translate-y-1 hover:scale-[1.01]
      `}
    >
      {job.image && (
        <div className="h-40 w-full overflow-hidden">
          <img 
            src={job.image} 
            alt={job.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-playfair font-semibold text-lg leading-tight">
            {job.title}
          </h3>
          
          <div className="flex flex-wrap gap-1">
            {isPinned && isMagicNails && (
              <Badge className="bg-amber-100 text-amber-800 font-medium flex items-center gap-1">
                <span className="text-amber-600">🌟</span> Top Featured
              </Badge>
            )}
            
            {isPinned && !isMagicNails && (
              <Badge className="bg-amber-100 text-amber-800 font-medium">
                Tin Gấp
              </Badge>
            )}
            
            {job.is_urgent && !isPinned && (
              <Badge className="bg-rose-100 text-rose-800 font-medium">
                Gấp
              </Badge>
            )}
            
            {job.is_featured && !job.is_urgent && !isPinned && (
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

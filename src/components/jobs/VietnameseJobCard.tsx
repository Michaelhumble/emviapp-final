
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
  
  return (
    <Card className={`overflow-hidden hover:shadow-md transition-all ${isPinned ? 'border-amber-400 border-2' : ''}`}>
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="font-playfair font-semibold text-lg leading-tight">
            {job.title}
          </h3>
          
          {isPinned && (
            <Badge className="bg-amber-100 text-amber-800 font-medium">
              Tin Gấp
            </Badge>
          )}
        </div>
        
        <p className="text-gray-700 mt-1">{job.company}</p>
        
        <div className="flex items-center text-gray-600 mt-2 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{job.location}</span>
        </div>
        
        <p className="mt-3 text-gray-800 line-clamp-3">
          {job.description}
        </p>
        
        <div className="mt-3 font-medium text-emerald-700">
          {job.salary_range || job.compensation_details}
        </div>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {job.specialties && job.specialties.map((specialty, index) => (
            <Badge key={index} variant="outline" className="bg-gray-50">
              {specialty}
            </Badge>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
          <div className="flex items-center text-gray-600 text-sm">
            {user ? (
              <div className="flex items-center">
                <Phone className="h-3.5 w-3.5 mr-1" />
                <span>{job.contact_info?.phone}</span>
              </div>
            ) : (
              <div className="flex items-center text-gray-500">
                <Lock className="h-3.5 w-3.5 mr-1" />
                <span>🔒 Đăng nhập để xem liên hệ</span>
              </div>
            )}
          </div>
          
          <Button 
            onClick={handleClick}
            className="bg-[#9B51E0] hover:bg-[#8A3FD1] text-white"
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

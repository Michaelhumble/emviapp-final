import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Lock } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { Job } from '@/types/job';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface VietnameseJobCardProps {
  job: Job;
  onViewDetails?: () => void; // Keep for backwards compatibility but make optional
}

const VietnameseJobCard = ({ job, onViewDetails }: VietnameseJobCardProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      // Navigate to actual job detail page instead of modal
      navigate(`/job/${job.id}`, {
        state: { fromGlobalJobs: true }
      });
    } else {
      // Redirect to sign in if needed
      navigate('/auth/signin?redirect=' + encodeURIComponent(`/job/${job.id}`));
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
    
    // For other Vietnamese jobs, use appropriate nail salon images
    const images = [
      "/lovable-uploads/583cdb14-9991-4d8f-8d00-711aa760fdeb.png",
      "/lovable-uploads/583cdb14-9991-4d8f-8d00-711aa760fdeb.png"
    ];
    
    // Create a simple hash based on job ID to ensure consistency
    const hash = job.id?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 0;
    return images[hash % images.length];
  };

  return (
    <Card className={`overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-all cursor-pointer bg-white border border-gray-200 
      ${isPinned && isMagicNails ? 'ring-2 ring-yellow-400 shadow-lg' : ''}
      ${isExpired ? 'opacity-75 grayscale' : ''}
    `}>
      {/* Job Image */}
      {getJobImage() && (
        <div className="relative aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden">
          <ImageWithFallback 
            src={getJobImage()} 
            alt={job.title || 'Salon job'} 
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
            
            {!isPinned && !isExpired && (
              <Badge className="bg-blue-100 text-blue-800 font-medium">
                Việc Làm
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="font-medium">{job.location}</span>
        </div>
        
        {job.salary_range && (
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-emerald-600 uppercase tracking-wide">
                  Lương
                </span>
                <p className="text-lg font-bold text-emerald-800 mt-1">
                  {job.salary_range}
                </p>
              </div>
            </div>
          </div>
        )}

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

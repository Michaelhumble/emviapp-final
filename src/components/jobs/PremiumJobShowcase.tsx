
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Job } from '@/types/job';
import { useAuth } from '@/context/auth';
import AuthAction from '@/components/common/AuthAction';

interface PremiumJobShowcaseProps {
  job: Job;
  onViewDetails: () => void;
}

const PremiumJobShowcase: React.FC<PremiumJobShowcaseProps> = ({ 
  job, 
  onViewDetails,
}) => {
  const { isSignedIn } = useAuth();
  
  return (
    <Card className="overflow-hidden border-2 border-amber-300 bg-gradient-to-b from-amber-50 to-white mb-6">
      <div className="bg-gradient-to-r from-amber-400 to-yellow-300 px-3 py-2 text-amber-900 font-medium flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Trophy className="h-4 w-4" />
          <span>EmviApp Premium Showcase</span>
        </div>
        <Badge className="bg-white text-amber-700 hover:bg-white/90 border-0">
          Nổi Bật
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 overflow-hidden">
        <div className="aspect-[4/3] md:aspect-auto relative overflow-hidden">
          <img
            src="/lovable-uploads/5a1ba245-85f7-4036-95f9-0e08ada34602.png"
            alt="Magic Nails - Great Falls, Montana"
            className="w-full h-full object-cover"
          />
        </div>
        
        <CardContent className="p-5 col-span-2 flex flex-col">
          <div className="mb-4">
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-bold">{job.title}</h3>
              <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Gấp</Badge>
            </div>
            
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0" />
              <span>{job.location}</span>
            </div>
          </div>
          
          <div className="space-y-2 mb-4 flex-grow">
            <p className="text-gray-700 whitespace-pre-line">{job.vietnamese_description}</p>
            
            <div className="text-lg font-medium text-green-700 mt-2">
              💰 $1,200–$1,500/tuần
            </div>
          </div>
          
          {job.contact_info?.phone && (
            <div className="border-t border-amber-100 pt-4 mt-2">
              {isSignedIn ? (
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-amber-600" />
                  <span className="text-lg">{job.contact_info.phone}</span>
                </div>
              ) : (
                <AuthAction
                  customTitle="Đăng nhập để xem thông tin liên hệ"
                  onAction={() => true}
                  buttonClassNames="w-full bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-500 hover:to-yellow-400 text-amber-900"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>Đăng nhập để xem số điện thoại</span>
                  </div>
                </AuthAction>
              )}
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1 text-amber-600">
                  <Star className="h-4 w-4 fill-amber-500 stroke-amber-500" />
                  <span className="text-xs font-medium">Most Loved Listing of the Month</span>
                </div>
                
                <Button 
                  onClick={onViewDetails}
                  className="bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-500 hover:to-yellow-400 text-amber-900 border-0"
                >
                  Xem Chi Tiết
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export default PremiumJobShowcase;

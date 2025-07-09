
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Star, Phone, LockIcon } from 'lucide-react';
import { useAuth } from "@/context/auth";
import AuthAction from "@/components/common/AuthAction";

type NailSalonDetailModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listing: {
    id: string;
    title: string;
    description: string;
    category: string;
    location: string;
    photos: string[];
    price: string;
    rating: number;
    contact?: string;
  } | null;
}

const NailSalonDetailModal = ({ open, onOpenChange, listing }: NailSalonDetailModalProps) => {
  const { isSignedIn } = useAuth();
  
  if (!listing) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0">
        {/* Detail image (second photo in the array) */}
        <div className="relative w-full h-[300px] sm:h-[400px]">
          <img 
            src={listing.photos[1]} 
            alt={`${listing.title} interior`} 
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>
        
        <div className="p-6">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-serif">{listing.title}</DialogTitle>
              <Badge variant="outline" className="font-semibold">{listing.price}</Badge>
            </div>
            <DialogDescription className="flex items-center text-sm mt-2">
              <span className="flex items-center mr-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                {listing.rating}
              </span> 
              | {listing.location}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            <h3 className="font-medium mb-2">Chi tiết</h3>
            <p className="text-gray-600">{listing.description}</p>
          </div>
          
          {listing.contact && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
              {isSignedIn ? (
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-primary mr-2" />
                  <span className="font-medium">{listing.contact}</span>
                </div>
              ) : (
                <AuthAction
                  customTitle="Sign in to see contact details"
                  onAction={() => true}
                  redirectPath={`/nails`}
                  fallbackContent={
                    <div className="flex items-center text-gray-500 cursor-pointer">
                      <LockIcon className="w-4 h-4 mr-2" />
                      <span className="text-sm">Sign in to see contact details</span>
                    </div>
                  }
                />
              )}
            </div>
          )}
          
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between">
            <Button variant="outline">Gửi tin nhắn</Button>
            <Button className="bg-primary hover:bg-primary/90">Đặt lịch</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Import the Button component to avoid TypeScript errors
import { Button } from '@/components/ui/button';

export default NailSalonDetailModal;


import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Star } from 'lucide-react';

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
  } | null;
}

const NailSalonDetailModal = ({ open, onOpenChange, listing }: NailSalonDetailModalProps) => {
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
            <h3 className="font-medium mb-2">About this salon</h3>
            <p className="text-gray-600">{listing.description}</p>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between">
            <Button variant="outline">Send Message</Button>
            <Button className="bg-primary hover:bg-primary/90">Book Appointment</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Import the Button component to avoid TypeScript errors
import { Button } from '@/components/ui/button';

export default NailSalonDetailModal;

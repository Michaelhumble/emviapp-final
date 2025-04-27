
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, MapPin, DollarSign } from "lucide-react";
import { Job } from "@/types/salon";

interface SalonDetailModalProps {
  salon: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const SalonDetailModal = ({ salon, isOpen, onClose }: SalonDetailModalProps) => {
  if (!isOpen || !salon) return null;

  const formatPrice = (price?: string) => {
    if (!price) return "Price not available";
    
    // Simple formatting for now
    return price;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{salon.name}</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        {/* Basic salon info */}
        <div className="space-y-4">
          {salon.image && (
            <div className="aspect-video rounded-md overflow-hidden">
              <img 
                src={salon.image} 
                alt={salon.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              {salon.location}
            </div>
            
            {salon.asking_price && (
              <div className="text-lg font-semibold text-green-600">
                {formatPrice(salon.asking_price)}
              </div>
            )}
          </div>
          
          <p className="text-gray-700">{salon.description}</p>
          
          {/* Contact buttons */}
          <div className="pt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button>
              Contact Seller
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SalonDetailModal;

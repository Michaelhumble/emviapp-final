
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, MapPin, DollarSign } from "lucide-react";
import { SalonSale } from "@/types/salon";

interface SalonListingDetailProps {
  salon: SalonSale;
  onClose: () => void;
}

const SalonListingDetail = ({ salon, onClose }: SalonListingDetailProps) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{salon.salon_name || salon.name}</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="absolute right-4 top-4">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Business Details</h3>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Location</dt>
                <dd className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                  {salon.city}, {salon.state}
                </dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Asking Price</dt>
                <dd className="flex items-center font-medium">
                  <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                  {salon.asking_price || 'Contact for price'}
                </dd>
              </div>
              
              {salon.square_feet && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Square Footage</dt>
                  <dd>{salon.square_feet} sq ft</dd>
                </div>
              )}
              
              {salon.number_of_stations && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Number of Stations</dt>
                  <dd>{salon.number_of_stations}</dd>
                </div>
              )}
            </dl>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{salon.description}</p>
            
            {salon.reason_for_selling && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-500">Reason for Selling</h4>
                <p className="text-gray-700">{salon.reason_for_selling}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SalonListingDetail;

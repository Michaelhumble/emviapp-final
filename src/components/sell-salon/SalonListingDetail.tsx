
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SalonListing } from "@/types/salon";

// Stub component for SalonListingDetail
interface SalonListingDetailProps {
  salon?: SalonListing;
  isOpen: boolean;
  onClose: () => void;
}

const SalonListingDetail = ({ salon, isOpen, onClose }: SalonListingDetailProps) => {
  if (!isOpen || !salon) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl overflow-hidden">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">{salon.name}</h2>
          <p className="mb-4">This is a placeholder for the SalonListingDetail component.</p>
          <Button onClick={onClose}>Close</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonListingDetail;

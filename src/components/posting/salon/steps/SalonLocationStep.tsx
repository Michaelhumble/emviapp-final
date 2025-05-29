
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SalonLocationStepProps {
  salonLocation: any;
  setSalonLocation: React.Dispatch<React.SetStateAction<any>>;
}

export const SalonLocationStep: React.FC<SalonLocationStepProps> = ({ 
  salonLocation, 
  setSalonLocation 
}) => {
  const handleInputChange = (field: string, value: string) => {
    setSalonLocation((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salon Location</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="address">Street Address</Label>
          <Input
            id="address"
            value={salonLocation.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="Enter street address"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={salonLocation.city || ''}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="Enter city"
            />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={salonLocation.state || ''}
              onChange={(e) => handleInputChange('state', e.target.value)}
              placeholder="Enter state"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input
            id="zipCode"
            value={salonLocation.zipCode || ''}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            placeholder="Enter ZIP code"
          />
        </div>
      </CardContent>
    </Card>
  );
};

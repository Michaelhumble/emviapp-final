
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface SalonDetailsStepProps {
  salonDetails: any;
  setSalonDetails: React.Dispatch<React.SetStateAction<any>>;
}

export const SalonDetailsStep: React.FC<SalonDetailsStepProps> = ({ 
  salonDetails, 
  setSalonDetails 
}) => {
  const handleInputChange = (field: string, value: string) => {
    setSalonDetails((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salon Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="salonName">Salon Name</Label>
          <Input
            id="salonName"
            value={salonDetails.salonName || ''}
            onChange={(e) => handleInputChange('salonName', e.target.value)}
            placeholder="Enter salon name"
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={salonDetails.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe your salon..."
            rows={4}
          />
        </div>
        
        <div>
          <Label htmlFor="askingPrice">Asking Price</Label>
          <Input
            id="askingPrice"
            type="number"
            value={salonDetails.askingPrice || ''}
            onChange={(e) => handleInputChange('askingPrice', e.target.value)}
            placeholder="Enter asking price"
          />
        </div>
      </CardContent>
    </Card>
  );
};

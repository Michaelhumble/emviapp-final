
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Building, MapPin, DollarSign, Users } from 'lucide-react';
import { SalonFormValues } from './salonFormSchema';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';

interface SalonReviewSectionProps {
  formData: SalonFormValues;
  options: SalonPricingOptions;
  onNext: () => void;
  onBack: () => void;
}

const SalonReviewSection: React.FC<SalonReviewSectionProps> = ({
  formData,
  options,
  onNext,
  onBack
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Review Your Listing</h2>
        <p className="text-gray-600">Please review all information before proceeding to payment</p>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Salon Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Salon Name</label>
              <p className="font-medium">{formData.salonName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Business Type</label>
              <p className="font-medium">{formData.businessType}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Số bàn / Tables</label>
              <p className="font-medium">{formData.numberOfTables}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Số ghế / Chairs</label>
              <p className="font-medium">{formData.numberOfChairs}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Number of Staff</label>
              <p className="font-medium">{formData.numberOfStaff}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Established Year</label>
              <p className="font-medium">{formData.establishedYear || 'Not specified'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="font-medium">{formData.address}</p>
            <p className="text-gray-600">
              {formData.city}, {formData.state} {formData.zipCode}
            </p>
            {formData.neighborhood && (
              <p className="text-sm text-gray-500">Neighborhood: {formData.neighborhood}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Financial Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Financial Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Asking Price</label>
              <p className="font-medium text-lg">${formData.askingPrice}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Monthly Rent</label>
              <p className="font-medium">${formData.monthlyRent}</p>
            </div>
            {formData.revenue && (
              <div>
                <label className="text-sm font-medium text-gray-500">Annual Revenue</label>
                <p className="font-medium">${formData.revenue}</p>
              </div>
            )}
            {formData.squareFeet && (
              <div>
                <label className="text-sm font-medium text-gray-500">Square Feet</label>
                <p className="font-medium">{formData.squareFeet} sq ft</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Additional Features */}
      {(formData.hasHousing || formData.hasWaxRoom || formData.hasDiningRoom || formData.hasLaundry) && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {formData.hasHousing && <Badge variant="secondary">Housing Available</Badge>}
              {formData.hasWaxRoom && <Badge variant="secondary">Wax Room</Badge>}
              {formData.hasDiningRoom && <Badge variant="secondary">Dining Room</Badge>}
              {formData.hasLaundry && <Badge variant="secondary">Laundry</Badge>}
              {formData.willTrain && <Badge variant="secondary">Will Train</Badge>}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Descriptions */}
      <Card>
        <CardHeader>
          <CardTitle>Descriptions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500">English Description</label>
            <p className="text-sm">{formData.englishDescription}</p>
          </div>
          {formData.vietnameseDescription && (
            <div>
              <label className="text-sm font-medium text-gray-500">Vietnamese Description</label>
              <p className="text-sm">{formData.vietnameseDescription}</p>
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-gray-500">Reason for Selling</label>
            <p className="text-sm">{formData.reasonForSelling}</p>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Pricing
        </Button>
        
        <Button 
          onClick={onNext}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 flex items-center gap-2"
        >
          Proceed to Payment
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default SalonReviewSection;

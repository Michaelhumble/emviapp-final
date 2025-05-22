
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, MapPin, Clock, DollarSign, Briefcase, ChevronLeft } from 'lucide-react';
import { JobFormValues } from './jobFormSchema';
import { PricingOptions } from '@/utils/posting/types';
import confetti from 'canvas-confetti';

interface JobSummaryProps {
  formData: JobFormValues;
  photos: File[];
  pricingOptions: PricingOptions;
  onEdit: () => void;
  onSubmit: (data: JobFormValues) => void;
}

const JobSummary: React.FC<JobSummaryProps> = ({
  formData,
  photos,
  pricingOptions,
  onEdit,
  onSubmit
}) => {
  const handlePublish = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    onSubmit(formData);
  };

  const getPricingTierLabel = (tier: string) => {
    switch (tier) {
      case 'premium': return 'Premium';
      case 'gold': return 'Gold';
      case 'diamond': return 'Diamond';
      case 'free': return 'Free';
      default: return 'Standard';
    }
  };

  const getPricingTierColor = (tier: string) => {
    switch (tier) {
      case 'premium': return 'bg-blue-100 text-blue-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'diamond': return 'bg-purple-100 text-purple-800';
      case 'free': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Preview Your Job Post</h2>
        <p className="text-sm text-muted-foreground mt-1">Review your job posting before publishing</p>
      </div>

      <Card className="overflow-hidden">
        {/* Preview Header */}
        <div className="bg-gradient-to-r from-primary/90 to-primary p-6 text-white">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <Badge className={`${getPricingTierColor(pricingOptions.selectedPricingTier)} border-none mb-2`}>
                {getPricingTierLabel(pricingOptions.selectedPricingTier)} Listing
              </Badge>
              <h1 className="text-2xl font-bold">{formData.title}</h1>
              <div className="flex items-center mt-1">
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  <span className="text-sm">{formData.salonName}</span>
                </div>
                <div className="w-1 h-1 bg-white/50 rounded-full mx-2" />
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{formData.location}</span>
                </div>
              </div>
            </div>
            
            {photos.length > 0 && (
              <div className="h-20 w-20 rounded-md overflow-hidden bg-white/10 shrink-0">
                <img
                  src={URL.createObjectURL(photos[0])}
                  alt="Job preview"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
        
        <CardContent className="p-6 space-y-6">
          {/* Job Details */}
          <div>
            <h3 className="font-medium text-lg mb-3">Job Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Job Type</p>
                  <p className="text-sm text-gray-600">{formData.jobType?.replace('-', ' ')}</p>
                </div>
              </div>
              
              {formData.salary_range && (
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Salary Range</p>
                    <p className="text-sm text-gray-600">{formData.salary_range}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4">
              <h4 className="font-medium text-sm mb-2">Description</h4>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{formData.description}</p>
              
              {formData.vietnameseDescription && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h5 className="font-medium text-sm mb-2">Vietnamese Description</h5>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{formData.vietnameseDescription}</p>
                </div>
              )}
            </div>
          </div>

          {/* Requirements */}
          {Array.isArray(formData.requirements) && formData.requirements.length > 0 && (
            <div>
              <h3 className="font-medium text-lg mb-2">Requirements</h3>
              <ul className="space-y-1">
                {formData.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mt-1 mr-2" />
                    <span className="text-sm text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specialties */}
          {Array.isArray(formData.specialties) && formData.specialties.length > 0 && (
            <div>
              <h3 className="font-medium text-lg mb-2">Specialties & Services</h3>
              <div className="flex flex-wrap gap-2">
                {formData.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary">{specialty}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Benefits & Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {formData.has_housing && (
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Housing Available</span>
              </div>
            )}
            {formData.has_wax_room && (
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Wax Room Available</span>
              </div>
            )}
            {formData.owner_will_train && (
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Owner Will Train</span>
              </div>
            )}
            {formData.no_supply_deduction && (
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">No Supply Deduction</span>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="border-t pt-6">
            <h3 className="font-medium text-lg mb-3">Contact Information</h3>
            <div className="space-y-2">
              <p className="text-sm"><span className="font-medium">Name:</span> {formData.contactName}</p>
              <p className="text-sm"><span className="font-medium">Email:</span> {formData.contactEmail}</p>
              <p className="text-sm"><span className="font-medium">Phone:</span> {formData.contactPhone}</p>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="bg-gray-50 -mx-6 px-6 py-4 mt-6">
            <h3 className="font-medium text-lg mb-2">Listing Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-sm font-medium">Listing Plan</p>
                <p className="text-sm">{getPricingTierLabel(pricingOptions.selectedPricingTier)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-medium">Duration</p>
                <p className="text-sm">{pricingOptions.durationMonths} {pricingOptions.durationMonths === 1 ? 'Month' : 'Months'}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-medium">Auto-Renew</p>
                <p className="text-sm">{pricingOptions.autoRenew ? 'Yes' : 'No'}</p>
              </div>
              {photos.length > 0 && (
                <div className="flex justify-between">
                  <p className="text-sm font-medium">Photos</p>
                  <p className="text-sm">{photos.length}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onEdit}
          className="flex items-center"
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Edit Post
        </Button>
        <Button 
          type="button" 
          onClick={handlePublish}
        >
          Publish Job Post
        </Button>
      </div>
    </div>
  );
};

export default JobSummary;

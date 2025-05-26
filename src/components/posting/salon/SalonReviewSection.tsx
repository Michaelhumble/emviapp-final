
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Star, Edit, MapPin, DollarSign, FileText, Camera, ArrowLeft, Check, Loader2 } from "lucide-react";
import { SalonFormValues } from "./salonFormSchema";
import { uploadImage } from "@/utils/uploadImage";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface SalonReviewSectionProps {
  form: UseFormReturn<SalonFormValues>;
  onEditStep: (step: number) => void;
}

export const SalonReviewSection = ({ form, onEditStep }: SalonReviewSectionProps) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const formData = form.getValues();

  const handleSubmit = async () => {
    if (!isConfirmed) return;
    
    setIsSubmitting(true);
    
    try {
      // Final validation
      const isValid = await form.trigger();
      if (!isValid) {
        toast.error("Please check all required fields");
        setIsSubmitting(false);
        return;
      }

      // Upload photos
      const photoUrls: string[] = [];
      for (const photo of formData.photos) {
        try {
          const url = await uploadImage(photo);
          photoUrls.push(url);
        } catch (error) {
          console.error("Error uploading photo:", error);
          toast.error("Failed to upload one or more photos");
          setIsSubmitting(false);
          return;
        }
      }

      // Prepare listing data
      const listingData = {
        salon_name: formData.salonName,
        business_type: formData.businessType,
        established_year: formData.establishedYear ? parseInt(formData.establishedYear) : null,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zipCode,
        neighborhood: formData.neighborhood,
        hide_address: formData.hideAddressFromPublic,
        description: formData.salonDescription,
        asking_price: parseInt(formData.askingPrice),
        reason_for_selling: formData.reasonForSelling,
        virtual_tour_url: formData.virtualTourUrl,
        photos: photoUrls,
        cover_photo_index: formData.coverPhotoIndex,
        status: 'pending',
        created_at: new Date().toISOString()
      };

      // Here you would submit to your backend/Supabase
      console.log("Submitting listing:", listingData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Analytics event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'listing_submitted', {
          event_category: 'salon_sales',
          event_label: 'salon_listing_wizard'
        });
      }

      toast.success("Your salon listing has been submitted successfully!");
      navigate("/salon-listing-success");
      
    } catch (error) {
      console.error("Error submitting listing:", error);
      toast.error("Failed to submit listing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Review & Confirm
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Please review all information before submitting your salon listing
        </p>
      </div>

      <div className="space-y-6">
        {/* Salon Identity */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                Salon Identity
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEditStep(1)}
                className="flex items-center gap-1"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            </div>
            <div className="space-y-3">
              <div>
                <span className="font-medium">Salon Name:</span> {formData.salonName}
              </div>
              <div>
                <span className="font-medium">Business Type:</span> {formData.businessType}
              </div>
              {formData.establishedYear && (
                <div>
                  <span className="font-medium">Established:</span> {formData.establishedYear}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                Location
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEditStep(2)}
                className="flex items-center gap-1"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            </div>
            <div className="space-y-3">
              <div>
                <span className="font-medium">Address:</span> {formData.address}
              </div>
              <div>
                <span className="font-medium">City:</span> {formData.city}, {formData.state} {formData.zipCode}
              </div>
              {formData.neighborhood && (
                <div>
                  <span className="font-medium">Neighborhood:</span> {formData.neighborhood}
                </div>
              )}
              {formData.hideAddressFromPublic && (
                <Badge variant="secondary" className="text-xs">
                  Address hidden from public
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Description & Pricing */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-purple-600" />
                Description & Pricing
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEditStep(3)}
                className="flex items-center gap-1"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            </div>
            <div className="space-y-3">
              <div>
                <span className="font-medium">Asking Price:</span> ${parseInt(formData.askingPrice).toLocaleString()} USD
              </div>
              <div>
                <span className="font-medium">Description:</span>
                <p className="text-gray-600 mt-1">{formData.salonDescription}</p>
              </div>
              {formData.reasonForSelling && (
                <div>
                  <span className="font-medium">Reason for Selling:</span>
                  <p className="text-gray-600 mt-1">{formData.reasonForSelling}</p>
                </div>
              )}
              {formData.virtualTourUrl && (
                <div>
                  <span className="font-medium">Virtual Tour:</span>
                  <a href={formData.virtualTourUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline ml-2">
                    View Tour
                  </a>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Photos */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Camera className="w-5 h-5 text-purple-600" />
                Photos ({formData.photos.length})
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEditStep(4)}
                className="flex items-center gap-1"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {formData.photos.map((photo, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg border"
                  />
                  {index === formData.coverPhotoIndex && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-amber-500 text-white text-xs flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Cover
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Confirmation */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl">
          <CardContent className="p-6">
            <FormField
              control={form.control}
              name="salonName" // Using a dummy field name since this isn't part of the schema
              render={() => (
                <FormItem>
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="confirm"
                      checked={isConfirmed}
                      onCheckedChange={(checked) => setIsConfirmed(checked as boolean)}
                    />
                    <FormLabel htmlFor="confirm" className="text-sm leading-relaxed cursor-pointer">
                      I confirm that all information provided is accurate and complete. I understand that this listing will be reviewed before being published.
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => onEditStep(4)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Photos
          </Button>
          
          <Button
            onClick={handleSubmit}
            disabled={!isConfirmed || isSubmitting}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Submit Listing
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

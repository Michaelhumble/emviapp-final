
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle, 
  ArrowLeft, 
  Edit3, 
  MapPin, 
  DollarSign, 
  Camera,
  Building2,
  Loader2,
  AlertCircle,
  Star
} from "lucide-react";
import { SalonFormValues } from "./salonFormSchema";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { showSuccessToast, showErrorToast } from "@/utils/toastUtils";

interface SalonReviewSectionProps {
  form: UseFormReturn<SalonFormValues>;
  onBack: () => void;
  onEditStep: (step: number) => void;
}

export const SalonReviewSection = ({ form, onBack, onEditStep }: SalonReviewSectionProps) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const formData = form.getValues();

  const validateAllData = (): boolean => {
    const result = form.trigger();
    return result as boolean;
  };

  const submitListing = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Final validation
      const isValid = await validateAllData();
      if (!isValid) {
        throw new Error("Please fix all validation errors before submitting.");
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("You must be logged in to submit a listing.");
      }

      // Prepare salon data for submission
      const salonData = {
        user_id: user.id,
        salon_name: formData.salonName,
        business_type: formData.businessType,
        city: formData.city,
        state: formData.state,
        asking_price: parseFloat(formData.askingPrice),
        description: formData.salonDescription,
        is_urgent: false,
        is_private: formData.hideAddressFromPublic,
        status: 'active'
      };

      // Submit to salon_sales table
      const { data: salonSale, error: salonError } = await supabase
        .from('salon_sales')
        .insert([salonData])
        .select()
        .single();

      if (salonError) {
        throw new Error(`Failed to create salon listing: ${salonError.message}`);
      }

      // Upload photos if any
      if (formData.photos && formData.photos.length > 0) {
        for (let i = 0; i < formData.photos.length; i++) {
          const photo = formData.photos[i];
          if (photo instanceof File) {
            // Upload photo to storage
            const fileName = `${salonSale.id}/photo-${i}-${Date.now()}.${photo.name.split('.').pop()}`;
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('salon_photos')
              .upload(fileName, photo);

            if (uploadError) {
              console.error('Photo upload error:', uploadError);
              continue; // Continue with other photos if one fails
            }

            // Get public URL
            const { data: urlData } = supabase.storage
              .from('salon_photos')
              .getPublicUrl(fileName);

            // Save photo record
            await supabase
              .from('salon_sale_photos')
              .insert([{
                salon_sale_id: salonSale.id,
                photo_url: urlData.publicUrl,
                order_number: i
              }]);
          }
        }
      }

      // Analytics event
      console.log('Analytics: listing_submitted', {
        listing_id: salonSale.id,
        business_type: formData.businessType,
        asking_price: formData.askingPrice,
        location: `${formData.city}, ${formData.state}`
      });

      // Success - redirect to success page
      showSuccessToast("Salon listing submitted successfully!");
      navigate('/salon-listing-success');

    } catch (err) {
      console.error('Submission error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
      setError(errorMessage);
      showErrorToast("Failed to submit listing", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (price: string) => {
    const num = parseFloat(price);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Review & Confirm
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Please review all information before submitting your salon listing
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-red-800">Submission Error</h4>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Review Cards */}
      <div className="space-y-6">
        {/* Identity Section */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-800">Salon Identity</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditStep(1)}
                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-700">Salon Name: </span>
                <span className="text-gray-900">{formData.salonName}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Business Type: </span>
                <span className="text-gray-900">{formData.businessType}</span>
              </div>
              {formData.establishedYear && (
                <div>
                  <span className="font-medium text-gray-700">Established: </span>
                  <span className="text-gray-900">{formData.establishedYear}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Location Section */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-800">Location</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditStep(2)}
                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-700">Address: </span>
                <span className="text-gray-900">{formData.address}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">City, State ZIP: </span>
                <span className="text-gray-900">{formData.city}, {formData.state} {formData.zipCode}</span>
              </div>
              {formData.neighborhood && (
                <div>
                  <span className="font-medium text-gray-700">Neighborhood: </span>
                  <span className="text-gray-900">{formData.neighborhood}</span>
                </div>
              )}
              <div>
                <span className="font-medium text-gray-700">Address Privacy: </span>
                <span className="text-gray-900">
                  {formData.hideAddressFromPublic ? "Hidden from public" : "Visible to buyers"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description Section */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-800">Description & Pricing</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditStep(3)}
                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-700">Asking Price: </span>
                <span className="text-gray-900 text-xl font-semibold text-green-600">
                  {formatPrice(formData.askingPrice)}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Description: </span>
                <p className="text-gray-900 mt-1 text-sm leading-relaxed">
                  {formData.salonDescription}
                </p>
              </div>
              {formData.reasonForSelling && (
                <div>
                  <span className="font-medium text-gray-700">Reason for Selling: </span>
                  <span className="text-gray-900">{formData.reasonForSelling}</span>
                </div>
              )}
              {formData.virtualTourUrl && (
                <div>
                  <span className="font-medium text-gray-700">Virtual Tour: </span>
                  <a 
                    href={formData.virtualTourUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 underline"
                  >
                    View Tour
                  </a>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Photos Section */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Camera className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-800">Photos</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditStep(4)}
                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.photos?.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={photo instanceof File ? URL.createObjectURL(photo) : photo}
                    alt={`Salon photo ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                  />
                  {index === formData.coverPhotoIndex && (
                    <div className="absolute top-1 right-1 bg-yellow-500 text-white p-1 rounded-full">
                      <Star className="w-3 h-3" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-3">
              {formData.photos?.length || 0} photo(s) uploaded
              {formData.coverPhotoIndex !== undefined && ` • Photo ${formData.coverPhotoIndex + 1} set as cover`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Checkbox */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="confirm"
            checked={isConfirmed}
            onCheckedChange={(checked) => setIsConfirmed(checked as boolean)}
            className="mt-1"
          />
          <label htmlFor="confirm" className="text-gray-700 font-medium cursor-pointer">
            I confirm that all information is correct and ready to publish. I understand that this listing will be reviewed before going live.
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
          className="order-2 sm:order-1 bg-white/50 hover:bg-white/70 border-gray-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Photos
        </Button>

        <Button
          type="button"
          onClick={submitListing}
          disabled={!isConfirmed || isSubmitting}
          className="order-1 sm:order-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Listing'
          )}
        </Button>
      </div>
    </div>
  );
};


import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "./salonFormSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit2, CheckCircle2, DollarSign, MapPin, FileText, Camera } from "lucide-react";
import StripeCheckout from "@/components/payments/StripeCheckout";

interface SalonReviewSectionProps {
  form: UseFormReturn<SalonFormValues>;
  photoUploads: File[];
  onEditStep: (step: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const SalonReviewSection = ({ 
  form, 
  photoUploads, 
  onEditStep, 
  onSubmit,
  isSubmitting 
}: SalonReviewSectionProps) => {
  const formData = form.getValues();
  const listingFee = 29.99; // Fixed listing fee

  const handlePaymentSuccess = () => {
    console.log("Payment successful, submitting form...");
    onSubmit();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <CheckCircle2 className="w-5 h-5 text-purple-600" />
        <h2 className="text-2xl font-playfair font-medium">Review & Payment</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Review your salon listing details and complete payment to publish your listing
      </p>

      {/* Identity Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="w-4 h-4" />
            Salon Identity
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEditStep(1)}
            className="text-purple-600 hover:text-purple-700"
          >
            <Edit2 className="w-4 h-4 mr-1" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h3 className="font-semibold text-xl">{formData.salonName || "Salon Name"}</h3>
            <p className="text-gray-600">{formData.businessType || "Business Type"}</p>
            {formData.establishedYear && (
              <p className="text-sm text-gray-500">Established: {formData.establishedYear}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Location Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="w-4 h-4" />
            Location
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEditStep(2)}
            className="text-purple-600 hover:text-purple-700"
          >
            <Edit2 className="w-4 h-4 mr-1" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {formData.address && <p>{formData.address}</p>}
            <p>{formData.city || "City"}, {formData.state || "State"} {formData.zipCode || "ZIP"}</p>
            {formData.neighborhood && <p className="text-sm text-gray-600">Neighborhood: {formData.neighborhood}</p>}
            {formData.hideExactAddress && (
              <Badge variant="secondary" className="mt-2">
                Exact address hidden for privacy
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Description & Pricing Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="w-4 h-4" />
            Details & Pricing
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEditStep(3)}
            className="text-purple-600 hover:text-purple-700"
          >
            <Edit2 className="w-4 h-4 mr-1" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {formData.askingPrice && (
              <div>
                <span className="font-medium">Asking Price:</span>
                <p>{formData.askingPrice}</p>
              </div>
            )}
            {formData.monthlyRent && (
              <div>
                <span className="font-medium">Monthly Rent:</span>
                <p>{formData.monthlyRent}</p>
              </div>
            )}
            {formData.revenue && (
              <div>
                <span className="font-medium">Monthly Revenue:</span>
                <p>{formData.revenue}</p>
              </div>
            )}
            {formData.squareFeet && (
              <div>
                <span className="font-medium">Square Feet:</span>
                <p>{formData.squareFeet}</p>
              </div>
            )}
          </div>
          {formData.englishDescription && (
            <div>
              <span className="font-medium">Description:</span>
              <p className="text-gray-600 text-sm mt-1 line-clamp-3">{formData.englishDescription}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Photos Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Camera className="w-4 h-4" />
            Photos ({photoUploads.length})
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEditStep(4)}
            className="text-purple-600 hover:text-purple-700"
          >
            <Edit2 className="w-4 h-4 mr-1" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          {photoUploads.length > 0 ? (
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
              {photoUploads.slice(0, 6).map((file, index) => (
                <div key={index} className="aspect-square rounded border overflow-hidden">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {photoUploads.length > 6 && (
                <div className="aspect-square rounded border bg-gray-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    +{photoUploads.length - 6}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No photos uploaded</p>
          )}
        </CardContent>
      </Card>

      {/* Payment Section */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-purple-600" />
            Listing Payment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Salon Listing Fee:</span>
            <span>${listingFee}</span>
          </div>
          <p className="text-sm text-gray-600">
            Your listing will be active for 60 days and promoted to qualified buyers in your area.
          </p>
          
          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <p className="text-sm">
                    I agree to the{" "}
                    <a href="/terms" className="text-purple-600 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-purple-600 hover:underline">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </FormItem>
            )}
          />

          <div className="pt-4">
            <StripeCheckout
              amount={listingFee}
              productName="Salon Listing"
              buttonText={`Pay $${listingFee} & Publish Listing`}
              onSuccess={handlePaymentSuccess}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

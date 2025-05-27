
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { SalonPostBasicInfo } from "./SalonPostBasicInfo";
import { SalonPostDescription } from "./SalonPostDescription";
import { SalonPostPhotoUpload } from "./SalonPostPhotoUpload";
import { salonFormSchema, SalonFormValues } from "./salonFormSchema";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";

interface SalonPostFormProps {
  onSubmit: (values: SalonFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  onNationwideChange: (checked: boolean) => void;
  onFastSaleChange: (checked: boolean) => void;
}

export const SalonPostForm = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads,
  onNationwideChange,
  onFastSaleChange
}: SalonPostFormProps) => {
  const [showPhotoValidationError, setShowPhotoValidationError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SalonFormValues>({
    resolver: zodResolver(salonFormSchema),
    defaultValues: {
      salonName: "",
      city: "",
      state: "",
      askingPrice: "",
      monthlyRent: "",
      numberOfStaff: "",
      squareFeet: "",
      revenue: "",
      reasonForSelling: "",
      vietnameseDescription: "",
      englishDescription: "",
      willTrain: false,
      isNationwide: false,
      fastSalePackage: false,
      hasHousing: false,
      hasWaxRoom: false,
      hasDiningRoom: false,
      hasLaundry: false,
    },
  });

  // Watch for changes in nationwide and fast sale options
  const isNationwide = form.watch("isNationwide");
  const fastSalePackage = form.watch("fastSalePackage");
  
  // Update parent component when these values change
  useEffect(() => {
    onNationwideChange(isNationwide);
  }, [isNationwide, onNationwideChange]);
  
  useEffect(() => {
    onFastSaleChange(fastSalePackage);
  }, [fastSalePackage, onFastSaleChange]);

  const handleFormSubmit = async (values: SalonFormValues) => {
    console.log('Form submission started with photos:', photoUploads.length);
    
    // Validate photos
    if (photoUploads.length === 0) {
      setShowPhotoValidationError(true);
      // Scroll to photo section
      const photoSection = document.querySelector('[data-photo-section]');
      if (photoSection) {
        photoSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setShowPhotoValidationError(false);
    setIsSubmitting(true);
    
    try {
      console.log('Calling onSubmit with form values and photos');
      await onSubmit(values);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <SalonPostBasicInfo form={form} />
          
          <Separator className="my-8" />
          
          <SalonPostDescription form={form} />
          
          <Separator className="my-8" />
          
          <div data-photo-section>
            <SalonPostPhotoUpload
              photoUploads={photoUploads}
              setPhotoUploads={setPhotoUploads}
              showValidationError={showPhotoValidationError}
            />
          </div>
          
          <Separator className="my-8" />
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
            <h3 className="font-medium flex items-center mb-2">
              <Check className="w-5 h-5 mr-2 text-blue-600" />
              Tips for a Fast Sale
            </h3>
            <ul className="text-sm text-blue-700 space-y-1 pl-7 list-disc">
              <li>Include clear photos of the salon interior and exterior</li>
              <li>Be specific about revenue, equipment included, and lease terms</li>
              <li>Highlight unique selling points like location or established clientele</li>
              <li>Consider the "Fast Sale Package" for nationwide exposure</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8">
          {showPhotoValidationError && photoUploads.length === 0 && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Please upload at least 1 photo before continuing to the next step.
              </AlertDescription>
            </Alert>
          )}
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Continue to Pricing'}
          </Button>
          <p className="text-center text-sm text-gray-500 mt-2">
            Next: Choose your listing plan and pricing options
          </p>
        </div>
      </form>
    </Form>
  );
};

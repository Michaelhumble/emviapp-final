
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Layout from "@/components/layout/Layout";
import { SalonPostForm } from "@/components/posting/salon/SalonPostForm";
import { SalonFormValues } from "@/components/posting/salon/salonFormSchema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const SalonListingForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNationwide, setIsNationwide] = useState(false);
  const [isFastSale, setIsFastSale] = useState(false);
  
  const handleSubmit = async (values: SalonFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, we would send the form data and photos to an API
      // For now, we'll just simulate a submission with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', values);
      console.log('Photos:', photoUploads);
      
      toast({
        title: "Listing Created Successfully",
        description: "Your salon listing has been created and will be reviewed shortly.",
        duration: 5000,
      });
      
      // Navigate to the salon listings page or a success page
      navigate("/salons");
    } catch (error) {
      console.error('Error submitting form:', error);
      
      toast({
        title: "Error Creating Listing",
        description: "There was a problem creating your listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleNationwideChange = (checked: boolean) => {
    setIsNationwide(checked);
  };
  
  const handleFastSaleChange = (checked: boolean) => {
    setIsFastSale(checked);
  };

  return (
    <Layout>
      <Helmet>
        <title>List Your Salon For Sale | EmviApp</title>
        <meta 
          name="description" 
          content="Create a new salon for sale listing on EmviApp. Reach potential buyers and sell your salon business faster." 
        />
      </Helmet>

      <div className="container max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/salons")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Listings
          </Button>
          <h1 className="text-3xl font-playfair font-semibold text-gray-900">List Your Salon</h1>
        </div>

        <div className="mb-8">
          <p className="text-gray-600 max-w-3xl">
            Complete the form below to create your salon listing. 
            Provide as much detail as possible to attract serious buyers.
          </p>
        </div>

        {/* Top pricing cards */}
        {(isNationwide || isFastSale) && (
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {isNationwide && (
              <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg text-purple-800">Nationwide Visibility</h3>
                      <p className="text-purple-600 text-sm mt-1">
                        Your listing will be visible to buyers across the country
                      </p>
                    </div>
                    <div className="bg-purple-100 text-purple-800 font-medium rounded-full px-3 py-1 text-sm">
                      $199
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-purple-700">
                    <Check className="h-4 w-4 mr-2" />
                    <span className="text-sm">Added to your total</span>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {isFastSale && (
              <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg text-amber-800">Fast Sale Package</h3>
                      <p className="text-amber-600 text-sm mt-1">
                        Featured placement, social media promotion, and priority support
                      </p>
                    </div>
                    <div className="bg-amber-100 text-amber-800 font-medium rounded-full px-3 py-1 text-sm">
                      $299
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-amber-700">
                    <Check className="h-4 w-4 mr-2" />
                    <span className="text-sm">Added to your total</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <SalonPostForm 
          onSubmit={handleSubmit}
          photoUploads={photoUploads}
          setPhotoUploads={setPhotoUploads}
          onNationwideChange={handleNationwideChange}
          onFastSaleChange={handleFastSaleChange}
        />

        <div className="mt-12 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => navigate("/salons")}
          >
            Cancel
          </Button>
          
          <Button 
            onClick={() => document.querySelector<HTMLFormElement>('form')?.requestSubmit()}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
          >
            {isSubmitting ? (
              <>Processing...</>
            ) : (
              <>
                List Your Salon
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SalonListingForm;

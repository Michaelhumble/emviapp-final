
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { usePostPayment } from '@/hooks/usePostPayment';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';

const PostSalon = () => {
  const navigate = useNavigate();
  const { initiatePayment, isLoading } = usePostPayment();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  
  const handleSubmit = async (data: any, uploads: File[]) => {
    try {
      setIsSubmitting(true);
      setPhotoUploads(uploads);
      
      // Convert form data to the expected format for the API
      const salonDetails = {
        title: data.title,
        description: data.description,
        location: data.location,
        price: data.price,
        monthly_rent: data.monthlyRent,
        contact_info: {
          owner_name: data.contactName,
          phone: data.contactPhone,
          email: data.contactEmail,
        },
        post_type: 'salon'
      };
      
      // Define pricing options
      const pricingOptions: PricingOptions = {
        selectedPricingTier: 'standard' as JobPricingTier,
        durationMonths: 1,
        autoRenew: true,
        isFirstPost: true
      };
      
      // Initiate payment with our consolidated hook
      const result = await initiatePayment('salon', salonDetails, pricingOptions);
      
      if (result.success) {
        toast.success('Salon post created successfully!');
        navigate('/dashboard');
        return true;
      } else {
        toast.error('Error processing your salon posting. Please try again.');
        return false;
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error creating salon post');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Post Your Salon | EmviApp</title>
        <meta 
          name="description" 
          content="List your salon for rent or sale on EmviApp. Reach thousands of beauty professionals looking for salon space."
        />
      </Helmet>
      <div className="container max-w-4xl mx-auto py-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Post Your Salon</h1>
          <p className="text-gray-600">List your salon for rent or sale</p>
        </div>
        
        <Card className="bg-white shadow-md rounded-lg p-6">
          {/* Salon form will be implemented here */}
          <p className="text-center py-8">Salon posting form coming soon!</p>
        </Card>
      </div>
    </Layout>
  );
};

export default PostSalon;

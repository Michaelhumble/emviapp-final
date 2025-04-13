import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { useProfile } from '@/context/profile';
import { useProfileCompletion } from '@/context/profile/ProfileCompletionProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import BasicInfoForm from '@/components/profile/setup/BasicInfoForm';
import PortfolioSetup from '@/components/profile/setup/PortfolioSetup';
import ServicesSetup from '@/components/profile/setup/ServicesSetup';
import BookingSetup from '@/components/profile/setup/BookingSetup';
import SocialMediaSetup from '@/components/profile/setup/SocialMediaSetup';
import { UserProfile } from '@/context/auth/types';

const FreelancerProfileSetup = () => {
  const { userProfile, updateProfile } = useAuth();
  const { refreshProfile } = useProfile();
  const { calculateProfileCompletion, getIncompleteFields } = useProfileCompletion();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('basic-info');
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [incompleteFields, setIncompleteFields] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (userProfile) {
      const percentage = calculateProfileCompletion(userProfile);
      setCompletionPercentage(percentage);
      setIncompleteFields(getIncompleteFields(userProfile));
    }
  }, [userProfile, calculateProfileCompletion, getIncompleteFields]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const handleBasicInfoSubmit = async (data: Partial<UserProfile>) => {
    setIsSubmitting(true);
    try {
      const result = await updateProfile({
        ...data,
        role: 'freelancer',
      });
      
      if (result.success) {
        await refreshProfile();
        toast.success('Basic information updated successfully');
        setActiveTab('portfolio');
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      toast.error('An error occurred while updating your profile');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handlePortfolioSubmit = async (portfolioUrls: string[]) => {
    setIsSubmitting(true);
    try {
      const result = await updateProfile({
        portfolio_urls: portfolioUrls,
      });
      
      if (result.success) {
        await refreshProfile();
        toast.success('Portfolio updated successfully');
        setActiveTab('services');
      } else {
        toast.error('Failed to update portfolio');
      }
    } catch (error) {
      toast.error('An error occurred while updating your portfolio');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleServicesSubmit = async (services: any[]) => {
    setIsSubmitting(true);
    try {
      // Services are typically stored in a separate table, but we'll update the profile
      // to mark that services have been set up
      const result = await updateProfile({
        completed_profile_tasks: [
          ...(userProfile?.completed_profile_tasks || []),
          'services_setup',
        ],
      });
      
      if (result.success) {
        await refreshProfile();
        toast.success('Services updated successfully');
        setActiveTab('booking');
      } else {
        toast.error('Failed to update services');
      }
    } catch (error) {
      toast.error('An error occurred while updating your services');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleBookingSubmit = async (bookingData: {
    accepts_bookings: boolean;
    booking_url?: string;
  }) => {
    setIsSubmitting(true);
    try {
      const result = await updateProfile({
        accepts_bookings: bookingData.accepts_bookings,
        booking_url: bookingData.booking_url,
        completed_profile_tasks: [
          ...(userProfile?.completed_profile_tasks || []),
          'booking_setup',
        ],
      });
      
      if (result.success) {
        await refreshProfile();
        toast.success('Booking preferences updated successfully');
        setActiveTab('social');
      } else {
        toast.error('Failed to update booking preferences');
      }
    } catch (error) {
      toast.error('An error occurred while updating your booking preferences');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSocialMediaSubmit = async (socialData: {
    instagram?: string;
    website?: string;
  }) => {
    setIsSubmitting(true);
    try {
      const result = await updateProfile({
        instagram: socialData.instagram,
        website: socialData.website,
        completed_profile_tasks: [
          ...(userProfile?.completed_profile_tasks || []),
          'social_media_setup',
        ],
      });
      
      if (result.success) {
        await refreshProfile();
        toast.success('Social media information updated successfully');
        
        // Check if profile is complete enough to navigate to dashboard
        const updatedPercentage = calculateProfileCompletion({
          ...userProfile,
          ...socialData,
          completed_profile_tasks: [
            ...(userProfile?.completed_profile_tasks || []),
            'social_media_setup',
          ],
        } as UserProfile);
        
        if (updatedPercentage >= 80) {
          toast.success('Profile setup complete! Redirecting to your dashboard...');
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        }
      } else {
        toast.error('Failed to update social media information');
      }
    } catch (error) {
      toast.error('An error occurred while updating your social media information');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleFinish = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Complete Your Freelancer Profile</h1>
        <p className="text-lg text-gray-600">
          Let's set up your professional profile to showcase your work and attract clients.
        </p>
      </div>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Profile Completion</h3>
            <span className="text-sm font-medium">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          
          {incompleteFields.length > 0 && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800">
                    Complete these fields to improve your profile:
                  </p>
                  <ul className="mt-1 text-xs text-amber-700 list-disc list-inside">
                    {incompleteFields.map((field) => (
                      <li key={field}>{field.replace(/_/g, ' ')}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="basic-info" className="text-xs md:text-sm">
            Basic Info
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="text-xs md:text-sm">
            Portfolio
          </TabsTrigger>
          <TabsTrigger value="services" className="text-xs md:text-sm">
            Services
          </TabsTrigger>
          <TabsTrigger value="booking" className="text-xs md:text-sm">
            Booking
          </TabsTrigger>
          <TabsTrigger value="social" className="text-xs md:text-sm">
            Social
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic-info">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              <p className="text-gray-600 mb-6">
                Let's start with your professional details and contact information.
              </p>
              
              <BasicInfoForm 
                userProfile={userProfile}
                onSubmit={handleBasicInfoSubmit}
                isSubmitting={isSubmitting}
                showRoleField={false}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="portfolio">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Portfolio & Skills</h2>
              <p className="text-gray-600 mb-6">
                Show off your best work and highlight your specialties.
              </p>
              
              <PortfolioSetup
                userProfile={userProfile}
                onSubmit={handlePortfolioSubmit}
                isSubmitting={isSubmitting}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Services</h2>
              <p className="text-gray-600 mb-6">
                Add the services you offer, along with pricing and descriptions.
              </p>
              
              <ServicesSetup
                userProfile={userProfile}
                onSubmit={handleServicesSubmit}
                isSubmitting={isSubmitting}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="booking">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Booking Preferences</h2>
              <p className="text-gray-600 mb-6">
                Set up how clients can book appointments with you.
              </p>
              
              <BookingSetup
                userProfile={userProfile}
                onSubmit={handleBookingSubmit}
                isSubmitting={isSubmitting}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="social">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Social Media & Contact</h2>
              <p className="text-gray-600 mb-6">
                Add your social media profiles and additional contact information.
              </p>
              
              <SocialMediaSetup
                userProfile={userProfile}
                onSubmit={handleSocialMediaSubmit}
                isSubmitting={isSubmitting}
              />
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-green-600">
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium">
                      {completionPercentage >= 80 
                        ? "Your profile is ready to go!" 
                        : `Profile ${completionPercentage}% complete`}
                    </span>
                  </div>
                  
                  <Button onClick={handleFinish}>
                    {completionPercentage >= 80 ? "Go to Dashboard" : "Finish Later"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FreelancerProfileSetup;

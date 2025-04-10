
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/auth';
import Layout from '@/components/layout/Layout';
import ArtistProfileEditor from '@/components/profile/ArtistProfileEditor';
import SalonProfileEditor from '@/components/profile/SalonProfileEditor';
import CustomerProfileEditor from '@/components/profile/CustomerProfileEditor';
import OtherProfileEditor from '@/components/profile/OtherProfileEditor';
import ProfileLoading from '@/components/profile/ProfileLoading';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ProfileEdit = () => {
  const { userProfile, userRole, loading, refreshUserProfile } = useAuth();
  const [pageTitle, setPageTitle] = useState('Edit Profile');
  const [loadError, setLoadError] = useState(false);
  const [longLoading, setLongLoading] = useState(false);
  const navigate = useNavigate();
  
  // Set up error and extended loading detection
  useEffect(() => {
    let timeoutId: number | undefined;
    
    if (loading) {
      timeoutId = window.setTimeout(() => {
        setLongLoading(true);
      }, 5000);
    } else {
      setLongLoading(false);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [loading]);
  
  useEffect(() => {
    if (userRole) {
      let title = 'Edit Your Profile';
      
      switch (userRole) {
        case 'artist':
        case 'nail technician/artist':
          title = 'Edit Artist Profile';
          break;
        case 'salon':
        case 'owner':
          title = 'Edit Salon Profile';
          break;
        case 'vendor':
        case 'supplier':
        case 'beauty supplier':
          title = 'Edit Vendor Profile';
          break;
        case 'freelancer':
          title = 'Edit Freelancer Profile';
          break;
        default:
          title = 'Edit Profile';
      }
      
      setPageTitle(title);
      document.title = `${title} | EmviApp`;
    }
  }, [userRole]);
  
  const handleRefresh = useCallback(async () => {
    if (!refreshUserProfile) return;
    
    try {
      setLoadError(false);
      await refreshUserProfile();
    } catch (error) {
      console.error("Error refreshing profile:", error);
      setLoadError(true);
      toast.error("Could not load your profile. Please try again later.");
    }
  }, [refreshUserProfile]);
  
  const renderProfileEditor = () => {
    if (loading) {
      return (
        <ProfileLoading 
          message="Loading your profile editor..."
          duration={5000}
          onRefresh={handleRefresh}
          loadingType="edit"
        />
      );
    }
    
    if (loadError || !userProfile) {
      return (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Could not load your profile</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            There was a problem loading your profile information. This might be due to 
            a connection issue or the profile may not be available.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={handleRefresh} variant="default">
              Try Again
            </Button>
            <Button onClick={() => navigate('/dashboard')} variant="outline">
              Go to Dashboard
            </Button>
          </div>
        </div>
      );
    }
    
    switch (userRole) {
      case 'artist':
      case 'nail technician/artist':
        return <ArtistProfileEditor />;
      case 'salon':
      case 'owner':
        return <SalonProfileEditor />;
      case 'customer':
        return <CustomerProfileEditor />;
      case 'vendor':
      case 'supplier':
      case 'beauty supplier':
        return <SalonProfileEditor />; // Reuse salon editor for now
      case 'freelancer':
        return <ArtistProfileEditor />; // Reuse artist editor for freelancers
      case 'other':
        return <OtherProfileEditor />;
      default:
        return <CustomerProfileEditor />; // Default to customer editor
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-serif mb-8">{pageTitle}</h1>
          {renderProfileEditor()}
        </div>
      </div>
    </Layout>
  );
};

export default ProfileEdit;

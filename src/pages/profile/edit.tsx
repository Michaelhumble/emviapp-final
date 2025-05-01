import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/auth';
import Layout from '@/components/layout/Layout';
import ArtistProfileEditor from '@/components/profile/ArtistProfileEditor';
import SalonProfileEditor from '@/components/profile/SalonProfileEditor';
import CustomerProfileEditor from '@/components/profile/CustomerProfileEditor';
import OtherProfileEditor from '@/components/profile/OtherProfileEditor';
import ProfileLoadingManager from '@/components/profile/ProfileLoadingManager';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Cache for editor selection to prevent flicker
const editorCache = new Map<string, JSX.Element>();

const ProfileEdit = () => {
  const { userProfile, userRole, loading, refreshUserProfile, isError } = useAuth();
  const [pageTitle, setPageTitle] = useState('Edit Profile');
  const navigate = useNavigate();
  
  // Set page title based on role - optimized to reduce re-renders
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
  
  // Optimized refresh function with type adapter pattern
  const handleRefresh = useCallback(async () => {
    if (!refreshUserProfile) return;
    
    try {
      // Call refreshUserProfile without checking return value
      await refreshUserProfile();
    } catch (error) {
      console.error("Error refreshing profile:", error);
      toast.error("Could not load your profile. Please try again later.");
    }
  }, [refreshUserProfile]);
  
  // Memoized editor selection to reduce re-renders and improve performance
  const renderProfileEditor = useCallback(() => {
    // If still loading, show loading state
    if (loading) {
      return (
        <ProfileLoadingManager 
          message="Loading your profile editor..."
          duration={3000}
          onRefresh={handleRefresh}
          loadingType="edit"
        />
      );
    }
    
    // If error or no profile, show error state
    if (isError || !userProfile) {
      return (
        <ProfileLoadingManager 
          isError={true}
          onRefresh={handleRefresh}
          loadingType="edit"
        />
      );
    }
    
    // Check if we have a cached editor component
    const cacheKey = `${userRole}-editor`;
    if (editorCache.has(cacheKey)) {
      return editorCache.get(cacheKey);
    }
    
    // Select appropriate editor based on role
    let editorComponent: JSX.Element;
    
    switch (userRole) {
      case 'artist':
      case 'nail technician/artist':
        editorComponent = <ArtistProfileEditor />;
        break;
      case 'salon':
      case 'owner':
        editorComponent = <SalonProfileEditor />;
        break;
      case 'customer':
        editorComponent = <CustomerProfileEditor />;
        break;
      case 'vendor':
      case 'supplier':
      case 'beauty supplier':
        editorComponent = <SalonProfileEditor />; // Reuse salon editor for now
        break;
      case 'freelancer':
        editorComponent = <ArtistProfileEditor />; // Reuse artist editor for freelancers
        break;
      case 'other':
        editorComponent = <OtherProfileEditor />;
        break;
      default:
        editorComponent = <CustomerProfileEditor />; // Default to customer editor
    }
    
    // Cache the component to prevent unnecessary re-renders
    editorCache.set(cacheKey, editorComponent);
    return editorComponent;
    
  }, [userRole, userProfile, loading, isError, handleRefresh]);
  
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

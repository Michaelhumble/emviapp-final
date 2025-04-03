import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';
import ArtistProfileEditor from '@/components/profile/ArtistProfileEditor';

const ProfileEdit = () => {
  const { userProfile, userRole, loading } = useAuth();
  const [pageTitle, setPageTitle] = useState('Edit Profile');
  
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
          title = 'Edit Supplier Profile';
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
  
  // Display appropriate editor based on user role
  const renderProfileEditor = () => {
    if (loading) {
      return (
        <div className="animate-pulse space-y-4 my-8">
          <div className="h-12 bg-muted rounded w-1/3"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      );
    }
    
    // Check user role and display appropriate editor
    switch (userRole) {
      case 'artist':
      case 'nail technician/artist':
        return <ArtistProfileEditor />;
      // For now we're only implementing the Artist profile editor
      // Other role types will be added in future updates
      default:
        return (
          <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-2">Profile editor for {userRole || 'your role'} coming soon!</h3>
            <p className="text-muted-foreground">Please check back later for updates.</p>
          </div>
        );
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


import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import Layout from '@/components/layout/Layout';
import ArtistProfileEditor from '@/components/profile/ArtistProfileEditor';
import SalonProfileEditor from '@/components/profile/SalonProfileEditor';
import CustomerProfileEditor from '@/components/profile/CustomerProfileEditor';
import OtherProfileEditor from '@/components/profile/OtherProfileEditor';
import { Loader2 } from 'lucide-react';

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
  
  const renderProfileEditor = () => {
    if (loading) {
      return (
        <div className="animate-pulse space-y-4 my-8">
          <div className="h-12 bg-muted rounded w-1/3"></div>
          <div className="h-64 bg-muted rounded"></div>
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


import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ArtistProfile from '@/components/artist-profile/ArtistProfile';

const Profile = () => {
  const { id } = useParams();
  
  // Mock profile data to satisfy ArtistProfile component requirements
  const mockProfile = {
    id: id || '1',
    name: 'Sample Artist',
    bio: 'Professional beauty artist',
    location: 'Sample City',
    rating: 4.8,
    reviewCount: 25,
    verified: true,
    avatar: null,
    coverImage: null
  };

  const mockServices = [
    {
      id: '1',
      name: 'Sample Service',
      price: 100,
      duration: 60,
      description: 'Sample service description'
    }
  ];

  const mockPortfolioImages = [
    {
      id: '1',
      url: '/placeholder-image.jpg',
      caption: 'Sample work'
    }
  ];
  
  return (
    <Layout>
      <Helmet>
        <title>Profile | EmviApp</title>
        <meta name="description" content="View profile on EmviApp" />
      </Helmet>
      
      <ArtistProfile 
        profile={mockProfile}
        services={mockServices}
        portfolioImages={mockPortfolioImages}
      />
    </Layout>
  );
};

export default Profile;

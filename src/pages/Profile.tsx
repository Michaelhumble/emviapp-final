
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ArtistProfile from '@/components/artist-profile/ArtistProfile';

const Profile = () => {
  const { id } = useParams();
  
  return (
    <Layout>
      <Helmet>
        <title>Profile | EmviApp</title>
        <meta name="description" content="View profile on EmviApp" />
      </Helmet>
      
      <ArtistProfile />
    </Layout>
  );
};

export default Profile;


import React from 'react';
import Layout from "@/components/layout/Layout";
import { ArtistProfileSetupForm } from '@/components/artist/ArtistProfileSetupForm';
import { ArtistProfileCompletionTracker } from '@/components/artist/ArtistProfileCompletionTracker';

const ArtistProfileSetup = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-semibold mb-6">Complete Your Artist Profile</h1>
        <ArtistProfileCompletionTracker />
        <ArtistProfileSetupForm />
      </div>
    </Layout>
  );
};

export default ArtistProfileSetup;

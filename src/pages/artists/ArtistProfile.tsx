
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';

const ArtistProfile = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-4">Artist Profile</h1>
                <p className="text-gray-600 mb-6">Artist ID: {id}</p>
              </div>
            </div>
            <div className="grid gap-6">
              <p className="text-gray-600">
                The requested artist profile is not available or has been removed.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ArtistProfile;

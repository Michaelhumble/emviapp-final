
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ArtistProfile = () => {
  // Force log component load
  console.log('🎨 ARTIST PROFILE COMPONENT LOADED');
  
  return (
    <div className="min-h-screen">
      {/* GIANT DEBUG BANNER */}
      <div className="w-full py-12 px-8 mb-8 bg-purple-600 border-4 border-purple-800 rounded-lg shadow-2xl">
        <div className="text-center">
          <h1 className="text-6xl font-black text-white mb-4">🎨 ARTIST PROFILE LOADED 🎨</h1>
          <p className="text-2xl font-bold text-purple-100">This is the ArtistProfile.tsx component</p>
          <p className="text-xl font-semibold text-purple-200 mt-2">If you see this, Artist routing worked!</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-purple-800 mb-4">Artist Dashboard</h2>
              <p className="text-lg text-purple-600 mb-6">
                Welcome to your artist profile! This is where you manage your portfolio, bookings, and services.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-purple-100">
                  <h3 className="text-xl font-semibold text-purple-700 mb-2">Portfolio</h3>
                  <p className="text-purple-600">Showcase your best work</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border border-purple-100">
                  <h3 className="text-xl font-semibold text-purple-700 mb-2">Bookings</h3>
                  <p className="text-purple-600">Manage your appointments</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border border-purple-100">
                  <h3 className="text-xl font-semibold text-purple-700 mb-2">Services</h3>
                  <p className="text-purple-600">Update your service menu</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArtistProfile;

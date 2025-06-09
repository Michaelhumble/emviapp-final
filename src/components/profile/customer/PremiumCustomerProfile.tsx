
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { UserProfile } from "@/context/auth/types";

interface PremiumCustomerProfileProps {
  userProfile: UserProfile;
}

const PremiumCustomerProfile = ({ userProfile }: PremiumCustomerProfileProps) => {
  // Force log component load
  console.log('👤 CUSTOMER PROFILE COMPONENT LOADED');
  console.log('👤 Customer userProfile:', userProfile);
  
  return (
    <div className="min-h-screen">
      {/* GIANT DEBUG BANNER */}
      <div className="w-full py-12 px-8 mb-8 bg-pink-600 border-4 border-pink-800 rounded-lg shadow-2xl">
        <div className="text-center">
          <h1 className="text-6xl font-black text-white mb-4">👤 CUSTOMER PROFILE LOADED 👤</h1>
          <p className="text-2xl font-bold text-pink-100">This is the PremiumCustomerProfile.tsx component</p>
          <p className="text-xl font-semibold text-pink-200 mt-2">If you see this, Customer routing worked!</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="border-pink-200 bg-pink-50">
          <CardContent className="p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-pink-800 mb-4">Premium Customer Experience</h2>
              <p className="text-lg text-pink-600 mb-6">
                Welcome to your premium customer profile! Discover amazing beauty services and manage your bookings.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-pink-100">
                  <h3 className="text-xl font-semibold text-pink-700 mb-2">My Bookings</h3>
                  <p className="text-pink-600">Track your appointments</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border border-pink-100">
                  <h3 className="text-xl font-semibold text-pink-700 mb-2">Favorites</h3>
                  <p className="text-pink-600">Your saved artists & salons</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border border-pink-100">
                  <h3 className="text-xl font-semibold text-pink-700 mb-2">Beauty Journey</h3>
                  <p className="text-pink-600">Your beauty transformation</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PremiumCustomerProfile;

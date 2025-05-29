
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
  location: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  avatar: any;
  coverImage: any;
}

interface Service {
  id: string;
  title: string;
  price: number;
  price_type: string;
  duration_minutes: number;
  description: string;
  created_at: string;
  updated_at: string;
}

const Profile = () => {
  // Mock data to satisfy the interface requirements
  const mockProfile: UserProfile = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    bio: "Professional nail artist with 5 years of experience",
    location: "Los Angeles, CA",
    rating: 4.8,
    reviewCount: 124,
    verified: true,
    avatar: null,
    coverImage: null
  };

  const mockServices: Service[] = [
    {
      id: "1",
      title: "Gel Manicure",
      price: 35,
      price_type: "fixed",
      duration_minutes: 60,
      description: "Full gel manicure with design",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  return (
    <>
      <Helmet>
        <title>Profile | EmviApp</title>
        <meta name="description" content="User Profile Page" />
      </Helmet>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">Profile</h1>
          <div className="space-y-4 text-gray-700">
            <p className="text-lg mb-4">
              Profile page is currently under development. Please check back later.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="font-semibold">Profile: {mockProfile.name}</h2>
              <p>Email: {mockProfile.email}</p>
              <p>Location: {mockProfile.location}</p>
              <p>Services: {mockServices.length}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

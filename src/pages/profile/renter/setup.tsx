
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Temporary setup page until proper components are implemented
const BoothRenterSetup = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  
  const handleSkip = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Booth Renter Profile Setup</h1>
        <p className="text-gray-600">Complete your profile to start getting more visibility</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Setup Your Booth Renter Profile</CardTitle>
          <CardDescription>
            Some components are currently unavailable. Please come back later or contact support.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline" onClick={handleSkip}>Skip for now</Button>
            <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BoothRenterSetup;

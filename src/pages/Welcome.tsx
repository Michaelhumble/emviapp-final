
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Welcome = () => {
  const navigate = useNavigate();
  const { userProfile, userRole } = useAuth();
  
  const handleGetStarted = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-50/30 p-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to EmviApp!</CardTitle>
          <CardDescription>
            We're excited to have you join our community
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="h-20 w-20 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4">
              <span className="text-3xl text-primary">✨</span>
            </div>
            
            <h3 className="text-lg font-medium mb-2">
              Hi, {userProfile?.full_name || 'there'}!
            </h3>
            
            <p className="text-muted-foreground">
              {userRole === 'artist' || userRole === 'nail technician/artist' ? (
                "You're now part of our artist community. Let's set up your profile and start attracting clients."
              ) : userRole === 'salon' || userRole === 'owner' ? (
                "You're now part of our salon community. Let's set up your salon and start connecting with artists."
              ) : (
                "You're now part of our community. Let's explore what EmviApp has to offer."
              )}
            </p>
          </div>
          
          <div className="bg-primary/5 p-4 rounded-lg">
            <h4 className="font-medium mb-2">What's next:</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 text-xs">1</span>
                <span>Complete your profile</span>
              </li>
              <li className="flex items-center">
                <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 text-xs">2</span>
                <span>{userRole === 'artist' ? 'Add your portfolio' : 'Explore the platform'}</span>
              </li>
              <li className="flex items-center">
                <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 text-xs">3</span>
                <span>{userRole === 'artist' ? 'Set up your services' : 'Connect with others'}</span>
              </li>
            </ul>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button className="w-full" onClick={handleGetStarted}>
            Get Started
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Welcome;

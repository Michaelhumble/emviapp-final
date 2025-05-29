
import React from 'react';
import { useAuth } from '@/context/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Building } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

interface SalonOwnerGuardProps {
  children: React.ReactNode;
}

const SalonOwnerGuard: React.FC<SalonOwnerGuardProps> = ({ children }) => {
  const { user, userProfile, loading } = useAuth();

  // Show loading state while auth is being determined
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="text-center p-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if user is authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <CardTitle>Authentication Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              You need to login to post a salon listing
            </p>
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link to="/auth/signin">
                  Sign In
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link to="/auth/signup">
                  Sign Up
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if user is a salon owner - fix the role comparison
  const isSalonOwner = userProfile?.role === 'salon' || userProfile?.role === 'manager';

  if (!isSalonOwner) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Building className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle>Salon Owners Only</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              You are not authorized to post a salon. This feature is only available to salon owners.
            </p>
            <p className="text-sm text-gray-500">
              Current role: {userProfile?.role || 'No role assigned'}
            </p>
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link to="/dashboard">
                  Go to Dashboard
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link to="/contact">
                  Contact Support
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User is authenticated and is a salon owner
  return <>{children}</>;
};

export default SalonOwnerGuard;

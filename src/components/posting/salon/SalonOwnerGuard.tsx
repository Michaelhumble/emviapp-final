
import React from 'react';
import { useAuth } from '@/context/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Users, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SalonOwnerGuardProps {
  children: React.ReactNode;
}

const SalonOwnerGuard: React.FC<SalonOwnerGuardProps> = ({ children }) => {
  const { user, userProfile, isLoading } = useAuth();

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="text-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Checking authentication...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Debug logging for QA
  console.log('SalonOwnerGuard Debug:', {
    user: user?.email,
    userProfile: userProfile,
    role: userProfile?.role,
    isHumbleInsider: user?.email === 'humbleinsider@gmail.com'
  });

  // Check if user is authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <CardTitle>Yêu Cầu Đăng Nhập / Login Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Bạn cần đăng nhập để đăng tin bán salon / You need to login to post a salon listing
            </p>
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link to="/auth/signin">
                  Đăng nhập / Sign In
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link to="/auth/signup">
                  Đăng ký / Sign Up
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Special QA bypass for humbleinsider@gmail.com
  const isQAUser = user.email === 'humbleinsider@gmail.com';
  
  // For now, allow all authenticated users to post salon listings
  // In production, you would check specific roles or salon ownership
  const canPostSalon = true; // Allow all authenticated users for now
  
  if (!canPostSalon && !isQAUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Building className="h-6 w-6 text-orange-600" />
            </div>
            <CardTitle>Chỉ Dành Cho Chủ Salon / Salon Owners Only</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Tính năng này chỉ dành cho các chủ salon đã được xác minh / This feature is only available to verified salon owners
            </p>
            {isQAUser && (
              <p className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                QA Mode: Role detected as "{userProfile?.role}". Contact support if access issues persist.
              </p>
            )}
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link to="/dashboard">
                  Về Dashboard / Go to Dashboard
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link to="/contact">
                  Liên hệ hỗ trợ / Contact Support
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Log successful access for QA
  if (isQAUser) {
    console.log('QA Access Granted: humbleinsider@gmail.com accessing Sell Salon wizard');
  }

  // User is authenticated and can post salon listings
  return <>{children}</>;
};

export default SalonOwnerGuard;

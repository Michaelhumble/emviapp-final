
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
  const { user, userProfile } = useAuth();

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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-xl font-playfair">Yêu Cầu Đăng Nhập / Login Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-gray-600 leading-relaxed">
              Bạn cần đăng nhập để đăng tin bán salon / You need to login to post a salon listing
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium shadow-lg">
                <Link to="/auth/signin">
                  Đăng nhập / Sign In
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full h-12 border-2 border-purple-200 hover:bg-purple-50">
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <Building className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-xl font-playfair">Chỉ Dành Cho Chủ Salon / Salon Owners Only</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-gray-600 leading-relaxed">
              Tính năng này chỉ dành cho các chủ salon đã được xác minh / This feature is only available to verified salon owners
            </p>
            {isQAUser && (
              <p className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
                QA Mode: Role detected as "{userProfile?.role}". Contact support if access issues persist.
              </p>
            )}
            <div className="space-y-3">
              <Button asChild className="w-full h-12 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-medium shadow-lg">
                <Link to="/dashboard">
                  Về Dashboard / Go to Dashboard
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full h-12 border-2 border-orange-200 hover:bg-orange-50">
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

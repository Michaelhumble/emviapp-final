
import React from 'react';
import { useAuth } from '@/context/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

interface SalonOwnerGuardProps {
  children: React.ReactNode;
}

const SalonOwnerGuard: React.FC<SalonOwnerGuardProps> = ({ children }) => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!user) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <Shield className="h-5 w-5" />
              {t({ english: 'Authentication Required', vietnamese: 'Yêu cầu đăng nhập' })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-600 mb-4">
              {t({ 
                english: 'Please sign in to access the salon listing feature.',
                vietnamese: 'Vui lòng đăng nhập để truy cập tính năng đăng bán salon.'
              })}
            </p>
            <Button onClick={() => navigate('/sign-in')} className="bg-orange-600 hover:bg-orange-700">
              {t({ english: 'Sign In', vietnamese: 'Đăng nhập' })}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if user has salon owner role
  const isSalonOwner = userRole === 'salon_owner' || userRole === 'owner' || userRole === 'salon';

  if (!isSalonOwner) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <AlertCircle className="h-5 w-5" />
              {t({ english: 'Access Restricted', vietnamese: 'Truy cập bị hạn chế' })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600 mb-4">
              {t({ 
                english: 'Only verified salon owners can post a salon for sale. Please update your profile or contact support for access.',
                vietnamese: 'Chỉ chủ salon đã xác minh mới có thể đăng bán salon. Vui lòng cập nhật hồ sơ hoặc liên hệ hỗ trợ để được truy cập.'
              })}
            </p>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => navigate('/dashboard')}
                className="border-red-300 text-red-700 hover:bg-red-100"
              >
                {t({ english: 'Update Profile', vietnamese: 'Cập nhật hồ sơ' })}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/contact')}
                className="border-red-300 text-red-700 hover:bg-red-100"
              >
                {t({ english: 'Contact Support', vietnamese: 'Liên hệ hỗ trợ' })}
              </Button>
            </div>
            <p className="text-sm text-red-500 mt-3">
              {t({ 
                english: `Current role: ${userRole}. Required role: salon_owner`,
                vietnamese: `Vai trò hiện tại: ${userRole}. Vai trò yêu cầu: salon_owner`
              })}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User is authorized, render children
  return <>{children}</>;
};

export default SalonOwnerGuard;

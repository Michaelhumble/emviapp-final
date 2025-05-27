
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { User, Mail, Phone, MapPin, Star, Calendar } from 'lucide-react';

const UserProfile: React.FC = () => {
  const { userProfile } = useAuth();
  const { t } = useTranslation();

  if (!userProfile) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-gray-500">
            {t({ english: "No profile data available", vietnamese: "Không có dữ liệu hồ sơ" })}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            {t({ english: "Profile Information", vietnamese: "Thông tin hồ sơ" })}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            {userProfile.avatar_url && (
              <img
                src={userProfile.avatar_url}
                alt={userProfile.full_name || 'Profile'}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div>
              <h3 className="text-xl font-semibold">{userProfile.full_name}</h3>
              <Badge variant="outline" className="mt-1">
                {userProfile.role || t({ english: "User", vietnamese: "Người dùng" })}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{userProfile.email}</span>
            </div>

            {userProfile.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{userProfile.phone}</span>
              </div>
            )}

            {userProfile.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{userProfile.location}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm">
                {t({ english: "Joined", vietnamese: "Tham gia" })}: {new Date(userProfile.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>

          {userProfile.bio && (
            <div>
              <h4 className="font-medium mb-2">
                {t({ english: "About", vietnamese: "Giới thiệu" })}
              </h4>
              <p className="text-sm text-gray-600">{userProfile.bio}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button variant="outline">
          {t({ english: "Edit Profile", vietnamese: "Chỉnh sửa hồ sơ" })}
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;

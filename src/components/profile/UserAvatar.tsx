
import React from 'react';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface UserAvatarProps {
  avatar_url: string | null;
  email: string;
  created_at: string | null;
}

const UserAvatar = ({ avatar_url, email, created_at }: UserAvatarProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Picture</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
          {avatar_url ? (
            <img 
              src={avatar_url} 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="h-12 w-12 text-gray-400" />
          )}
        </div>
        <Button variant="outline" disabled className="w-full">
          Upload Photo
        </Button>
        <p className="text-xs text-gray-500 mt-2">
          (Coming soon)
        </p>
      </CardContent>
    </Card>
  );
};

export default UserAvatar;


import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface AccountInfoProps {
  email: string;
  created_at: string | null;
}

const AccountInfo = ({ email, created_at }: AccountInfoProps) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Account Info</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{email}</p>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500">Member Since</p>
          <p className="font-medium">
            {created_at ? new Date(created_at).toLocaleDateString() : "N/A"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountInfo;

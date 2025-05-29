
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, RefreshCw } from 'lucide-react';

interface ProfileLoadingManagerProps {
  message?: string;
  duration?: number;
  onRefresh?: () => void;
  loadingType?: string;
  isError?: boolean;
}

const ProfileLoadingManager = ({ 
  message = "Loading...", 
  onRefresh, 
  isError = false 
}: ProfileLoadingManagerProps) => {
  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error Loading Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>There was an error loading your profile. Please try again.</p>
          {onRefresh && (
            <Button onClick={onRefresh} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="flex items-center justify-center py-8">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>{message}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileLoadingManager;

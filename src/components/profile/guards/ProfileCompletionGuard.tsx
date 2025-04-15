
import { useProfileCompletion } from '@/hooks/useProfileCompletion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '@/context/auth/types';

interface ProfileCompletionGuardProps {
  children: React.ReactNode;
  role: UserRole;
}

export function ProfileCompletionGuard({ children, role }: ProfileCompletionGuardProps) {
  const { completionStatus, isLoading } = useProfileCompletion();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Card className="max-w-md mx-auto my-8">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-2 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!completionStatus?.isComplete) {
    return (
      <Card className="max-w-md mx-auto my-8">
        <CardContent className="space-y-4 p-6">
          <Progress 
            value={completionStatus?.completionPercentage || 0} 
            className="w-full"
          />
          <p className="text-sm text-gray-600">
            Please complete your profile to access all features.
            Required: {completionStatus?.minCompletionPercentage}% completion.
          </p>
          <Button 
            className="w-full" 
            onClick={() => navigate(`/setup/${role}`)}
          >
            Complete Profile
          </Button>
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
}

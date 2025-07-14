import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, ExternalLink } from 'lucide-react';

interface FreeJobPostingFormProps {
  initialData?: any;
  onSuccess?: (data: any) => Promise<void>;
  isEditMode?: boolean;
}

const FreeJobPostingForm: React.FC<FreeJobPostingFormProps> = ({
  initialData,
  onSuccess,
  isEditMode = false
}) => {
  const navigate = useNavigate();

  // Automatically redirect to paid job posting flow
  useEffect(() => {
    console.log('🔒 FreeJobPostingForm: Redirecting to paid job posting flow');
    navigate('/post-job', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Lock className="h-12 w-12 text-blue-500" />
          </div>
          <CardTitle className="text-xl">Secure Job Posting System</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-blue-800 mb-2">Premium Job Posting Available</h4>
            <p className="text-blue-700 text-sm mb-3">
              To post a job and reach top talent, please use our official Post a Job system with premium visibility and secure payment protection.
            </p>
          </div>
          <p className="text-gray-600 mb-4">Redirecting you to our secure job posting system...</p>
          <Button onClick={() => navigate('/post-job')} className="bg-blue-600 hover:bg-blue-700">
            <ExternalLink className="h-4 w-4 mr-2" />
            Continue to Post Job
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeJobPostingForm;
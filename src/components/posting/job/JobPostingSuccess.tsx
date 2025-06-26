
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Share2, Eye, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface JobPostingSuccessProps {
  jobId?: string;
  jobTitle?: string;
  planType?: string;
}

const JobPostingSuccess: React.FC<JobPostingSuccessProps> = ({
  jobId = 'sample-job-id',
  jobTitle = 'Your Job Post',
  planType = 'Standard'
}) => {
  const navigate = useNavigate();

  const handleViewPost = () => {
    navigate(`/jobs/${jobId}`);
  };

  const handleCreateAnother = () => {
    navigate('/post-job');
  };

  const handleSharePost = () => {
    const url = `${window.location.origin}/jobs/${jobId}`;
    if (navigator.share) {
      navigator.share({
        title: jobTitle,
        text: `Check out this job opportunity: ${jobTitle}`,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      // You could show a toast here
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Job Posted Successfully!
            </h1>
            <p className="text-gray-600 text-lg">
              Your job posting is now live and ready to attract qualified candidates.
            </p>
          </div>

          <Card className="bg-gray-50 border-dashed">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Job Title:</span>
                  <span className="font-medium">{jobTitle}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-medium text-purple-600">{planType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Live
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Job ID:</span>
                  <span className="font-mono text-sm bg-white px-2 py-1 rounded border">
                    {jobId}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-blue-50 rounded-lg p-4 text-left">
            <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Your job will appear in search results within 5 minutes</li>
              <li>• You'll receive email notifications when candidates apply</li>
              <li>• Track applications in your dashboard</li>
              <li>• Your posting will remain active for the selected duration</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={handleViewPost}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Post
            </Button>
            
            <Button
              onClick={handleSharePost}
              variant="outline"
              className="border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            
            <Button
              onClick={handleCreateAnother}
              variant="outline"
              className="border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              <Edit className="h-4 w-4 mr-2" />
              Post Another
            </Button>
          </div>

          <div className="text-xs text-gray-500 pt-4 border-t">
            Need help? Contact our support team or check out our{' '}
            <a href="/help" className="text-purple-600 hover:underline">
              help center
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobPostingSuccess;

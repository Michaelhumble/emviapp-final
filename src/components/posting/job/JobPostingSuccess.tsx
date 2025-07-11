import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Share2, Eye, Edit, Copy, ArrowRight, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface JobPostingSuccessProps {
  jobId: string;
  jobData: {
    title: string;
    location?: string;
    pricing_tier: string;
    image_url?: string;
    category?: string;
    compensation_details?: string;
  };
}

const JobPostingSuccess: React.FC<JobPostingSuccessProps> = ({
  jobId,
  jobData
}) => {
  const navigate = useNavigate();

  const handleViewPost = () => {
    // Navigate to jobs page and scroll to the new post
    navigate('/jobs', { 
      state: { highlightJobId: jobId }
    });
  };

  const handleEditPost = () => {
    navigate(`/jobs/edit/${jobId}`);
  };

  const handleSharePost = () => {
    const url = `${window.location.origin}/jobs`;
    if (navigator.share) {
      navigator.share({
        title: jobData.title,
        text: `Check out this job opportunity: ${jobData.title}`,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleCreateAnother = () => {
    navigate('/post-job');
  };

  const getPricingTierDisplay = (tier: string) => {
    switch (tier) {
      case 'free': return { label: 'Free', color: 'bg-gray-100 text-gray-800' };
      case 'gold': return { label: 'Gold', color: 'bg-yellow-100 text-yellow-800' };
      case 'premium': return { label: 'Premium', color: 'bg-purple-100 text-purple-800' };
      case 'diamond': return { label: 'Diamond', color: 'bg-blue-100 text-blue-800' };
      default: return { label: tier, color: 'bg-gray-100 text-gray-800' };
    }
  };

  const pricingDisplay = getPricingTierDisplay(jobData.pricing_tier);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full">
        <CardContent className="p-8 text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-4 mb-4">
              <Check className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          {/* Success Message */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              🎉 Your Job Was Posted!
            </h1>
            <p className="text-gray-600 text-lg">
              Your job posting is now live and ready to attract qualified candidates.
            </p>
          </div>

          {/* Job Details Preview */}
          <Card className="bg-white border-2 border-green-200">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Title and Tier */}
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-semibold text-gray-900">{jobData.title}</h2>
                  <Badge className={pricingDisplay.color}>
                    {pricingDisplay.label} Listing
                  </Badge>
                </div>

                {/* Job Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  {jobData.location && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{jobData.location}</span>
                    </div>
                  )}
                  {jobData.category && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{jobData.category}</span>
                    </div>
                  )}
                  {jobData.compensation_details && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Compensation:</span>
                      <span className="font-medium">{jobData.compensation_details}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-green-600 flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Live
                    </span>
                  </div>
                </div>

                {/* Image Preview if available */}
                {jobData.image_url && (
                  <div className="mt-4">
                    <img 
                      src={jobData.image_url} 
                      alt="Job posting image" 
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Info Alert */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
              <RefreshCw className="h-4 w-4 mr-2" />
              What happens next?
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Your job will appear in search results within a few seconds</li>
              <li>• You'll receive notifications when candidates apply</li>
              <li>• Track applications in your dashboard</li>
              <li>• If you don't see it immediately, please refresh the Jobs page</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              onClick={handleViewPost}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
            >
              <Eye className="h-4 w-4" />
              View Your Post
            </Button>
            
            <Button
              onClick={handleSharePost}
              variant="outline"
              className="border-blue-200 text-blue-600 hover:bg-blue-50 flex items-center justify-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            
            <Button
              onClick={handleEditPost}
              variant="outline"
              className="border-purple-200 text-purple-600 hover:bg-purple-50 flex items-center justify-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit Post
            </Button>
            
            <Button
              onClick={handleCreateAnother}
              variant="outline"
              className="border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <ArrowRight className="h-4 w-4" />
              Post Another
            </Button>
          </div>

          {/* Footer */}
          <div className="text-xs text-gray-500 pt-4 border-t">
            Need help? Contact our support team or check out our{' '}
            <a href="/help" className="text-blue-600 hover:underline">
              help center
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobPostingSuccess;
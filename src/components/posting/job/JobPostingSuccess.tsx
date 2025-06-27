
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ExternalLink, Share2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface JobPostingSuccessProps {
  jobId?: string;
  jobTitle: string;
  planType: string;
}

const JobPostingSuccess: React.FC<JobPostingSuccessProps> = ({
  jobId,
  jobTitle,
  planType
}) => {
  const navigate = useNavigate();

  const handleViewJob = () => {
    if (jobId) {
      navigate(`/jobs/${jobId}`);
    } else {
      navigate('/jobs');
    }
  };

  const handleShareJob = async () => {
    const jobUrl = `${window.location.origin}/jobs/${jobId}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: jobTitle,
          text: `Check out this job opportunity: ${jobTitle}`,
          url: jobUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(jobUrl);
        alert('Job URL copied to clipboard!');
      } catch (error) {
        console.log('Error copying to clipboard:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-2xl w-full"
      >
        <Card className="text-center p-8 shadow-xl border-0">
          <CardContent className="space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className="flex justify-center"
            >
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                🎉 Job Posted Successfully!
              </h1>
              
              <p className="text-lg text-gray-600">
                Your <span className="font-semibold text-purple-600">{planType}</span> job posting for{' '}
                <span className="font-semibold">"{jobTitle}"</span> is now live and visible to candidates.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-blue-50 p-6 rounded-lg"
            >
              <h3 className="font-semibold text-blue-900 mb-3">What happens next?</h3>
              <ul className="text-left space-y-2 text-blue-800">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Your job is immediately visible in search results
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Candidates can apply directly through the platform
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  You'll receive email notifications for new applications
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Manage applications through your dashboard
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={handleViewJob}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3"
                size="lg"
              >
                <Eye className="h-5 w-5 mr-2" />
                View Your Job Posting
              </Button>
              
              {jobId && (
                <Button
                  onClick={handleShareJob}
                  variant="outline"
                  className="border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-3"
                  size="lg"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share Job
                </Button>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="text-sm text-gray-500"
            >
              <p>
                Need help? Contact our support team or visit your{' '}
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-purple-600 hover:underline"
                >
                  dashboard
                </button>{' '}
                to manage your postings.
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default JobPostingSuccess;

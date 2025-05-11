
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, addDays } from 'date-fns';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, Share2, Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar'; // Added the missing import
import Layout from '@/components/layout/Layout';
import ThankYouModal from '@/components/posting/ThankYouModal';

const PostSuccess = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [postType, setPostType] = useState<'job' | 'salon' | 'booth' | 'supply'>('job');
  
  // Try to get post type from URL parameters or local storage
  React.useEffect(() => {
    // Check URL query params first
    const params = new URLSearchParams(window.location.search);
    const typeFromParams = params.get('type');
    
    if (typeFromParams && ['job', 'salon', 'booth', 'supply'].includes(typeFromParams as string)) {
      setPostType(typeFromParams as 'job' | 'salon' | 'booth' | 'supply');
    } else {
      // Fall back to local storage
      const storedType = localStorage.getItem('emvi_post_type');
      if (storedType && ['job', 'salon', 'booth', 'supply'].includes(storedType)) {
        setPostType(storedType as 'job' | 'salon' | 'booth' | 'supply');
      }
    }
  }, []);

  const handleCloseModal = () => {
    setOpen(false);
    // Navigate to dashboard after closing the modal
    navigate('/dashboard');
  };
  
  const handleBoostClick = () => {
    // Navigate to boost page specific to post type
    switch(postType) {
      case 'job':
        navigate('/boost/job');
        break;
      case 'salon':
        navigate('/boost/salon');
        break;
      case 'booth':
        navigate('/boost/booth');
        break;
      case 'supply':
        navigate('/boost/supply');
        break;
      default:
        navigate('/boost');
    }
  };

  // Render main success page with thank you message and next steps
  return (
    <Layout>
      <div className="container max-w-3xl mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-3 font-playfair">🎉 Your Post is Live!</h1>
          <p className="text-gray-600 mb-2">
            People in your area are being notified right now.
          </p>
          <p className="text-gray-500">
            Thank you for trusting EmviApp. You're helping raise the bar for beauty professionals everywhere.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center mb-6">
            <CalendarIcon className="h-5 w-5 text-primary mr-2" />
            <span className="text-gray-700">
              Your post will be active until {format(addDays(new Date(), 30), "MMMM d, yyyy")}
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Button 
              onClick={handleBoostClick}
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700"
            >
              <TrendingUp className="h-4 w-4" />
              Boost Visibility
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center justify-center gap-2"
              onClick={() => navigate('/dashboard')}
            >
              <Share2 className="h-4 w-4" />
              Go to Dashboard
            </Button>
          </div>
        </div>

        <div className="text-center">
          <Button 
            variant="ghost" 
            className="text-primary hover:text-primary-dark"
            onClick={() => navigate('/post-job')}
          >
            Post Another Job
          </Button>
        </div>
      </div>
      
      {/* This modal will show automatically when the page loads */}
      <ThankYouModal 
        open={open} 
        onOpenChange={handleCloseModal} 
        postType={postType}
        onBoostClick={handleBoostClick}
      />
    </Layout>
  );
};

export default PostSuccess;


import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft, Plus, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SalonListingSuccess = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Helmet>
        <title>Listing Submitted Successfully | EmviApp</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {/* Success Card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl p-8 text-center">
            {/* Success Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            {/* Success Message */}
            <h1 className="text-4xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Your salon listing has been submitted!
            </h1>
            
            <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto">
              Thank you for choosing EmviApp! Your salon listing is now under review and will be published within 24 hours.
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/dashboard')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Dashboard
                </Button>
                
                <Button
                  onClick={() => navigate('/sell-salon')}
                  variant="outline"
                  className="border-2 border-purple-200 hover:border-purple-300 bg-white/50 hover:bg-white/70 text-purple-700 px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Post Another Salon
                </Button>
              </div>
              
              <Button
                onClick={() => navigate('/my-listings')}
                variant="ghost"
                className="text-gray-600 hover:text-gray-800 font-medium flex items-center gap-2 mx-auto"
              >
                <Eye className="w-4 h-4" />
                View My Listings
              </Button>
            </div>
          </div>

          {/* Next Steps Info */}
          <div className="mt-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">What happens next?</h2>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                <p>Our team will review your listing within 24 hours</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                <p>You'll receive an email confirmation once your listing is live</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                <p>Interested buyers will be able to contact you directly through the platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalonListingSuccess;

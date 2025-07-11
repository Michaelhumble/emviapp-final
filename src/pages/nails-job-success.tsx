import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Eye, Edit, ArrowRight } from 'lucide-react';

const NailJobSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { jobId, jobData } = location.state || {};

  const handleViewPost = () => {
    navigate('/nails');
  };

  const handleEditPost = () => {
    // Navigate to edit form (would need to be implemented)
    console.log('Edit post:', jobId);
  };

  if (!jobData) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50/30 to-indigo-50/20 flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="p-6 text-center">
              <p className="text-gray-600 mb-4">No job data found</p>
              <Button onClick={() => navigate('/nails')}>
                View Nail Jobs
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Nail Job Posted Successfully | EmviApp</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50/30 to-indigo-50/20">
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-2xl mx-auto">
            
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Your Nail Job Is Live!
              </h1>
              <p className="text-gray-600">
                Your job posting has been successfully created and is now visible to nail technicians.
              </p>
            </div>

            {/* Job Summary Card */}
            <Card className="border-2 border-green-200 mb-6">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-gray-900">
                    {jobData.vietnamese_title || jobData.title}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-pink-100 text-pink-700">
                      Nails
                    </Badge>
                    {jobData.pricing_tier === 'paid' && (
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                        Premium
                      </Badge>
                    )}
                  </div>
                </div>
                {jobData.vietnamese_title && jobData.title && jobData.vietnamese_title !== jobData.title && (
                  <p className="text-gray-600 text-sm mt-1">{jobData.title}</p>
                )}
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{jobData.location}</span>
                  </div>
                  {jobData.compensation_details && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Salary:</span>
                      <span className="font-medium text-green-600">{jobData.compensation_details}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Posted:</span>
                    <span className="font-medium">Just now</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <Badge variant="default" className="bg-green-100 text-green-700">
                      Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button 
                onClick={handleViewPost}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                size="lg"
              >
                <Eye className="mr-2 h-5 w-5" />
                View Your Post in Nail Jobs Feed
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                onClick={handleEditPost}
                variant="outline"
                className="w-full border-purple-200 hover:bg-purple-50"
                size="lg"
              >
                <Edit className="mr-2 h-5 w-5" />
                Edit Post Details
              </Button>
            </div>

            {/* Tips */}
            <Card className="mt-8 border-blue-200">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-lg text-blue-900">Tips for Success</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Your job is now visible to nail technicians searching for opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Candidates can contact you directly using the information provided</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Your post will remain active for 30 days</span>
                  </li>
                  {jobData.pricing_tier === 'paid' && (
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Premium posts get priority placement and enhanced visibility</span>
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NailJobSuccessPage;
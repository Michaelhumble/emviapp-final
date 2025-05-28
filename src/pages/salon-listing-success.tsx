
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const SalonListingSuccessPage = () => {
  return (
    <>
      <Helmet>
        <title>Salon Listing Published Successfully | EmviApp</title>
        <meta name="description" content="Your salon listing has been published successfully on EmviApp" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-playfair text-green-800">
              Listing Published Successfully!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Your salon listing is now live and visible to potential buyers on EmviApp.
            </p>
            <p className="text-sm text-gray-500">
              Danh sách salon của bạn hiện đã được công bố và có thể nhìn thấy đối với những người mua tiềm năng trên EmviApp.
            </p>
            <div className="space-y-2 pt-4">
              <Button asChild className="w-full">
                <Link to="/salons">
                  View All Salon Listings
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link to="/dashboard">
                  Go to Dashboard
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SalonListingSuccessPage;

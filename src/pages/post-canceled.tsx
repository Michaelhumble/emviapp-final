
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const PostCanceled = () => {
  return (
    <>
      <Helmet>
        <title>Post Canceled | EmviApp</title>
        <meta name="description" content="Your post was canceled" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-playfair text-red-800">
              Post Canceled
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Your post was not published. You can try again or contact support if you need help.
            </p>
            <div className="space-y-2 pt-4">
              <Button asChild className="w-full">
                <Link to="/post-job">
                  Try Again
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link to="/contact">
                  Contact Support
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PostCanceled;


import React from 'react';
import { Helmet } from 'react-helmet-async';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const CheckoutFallback = () => {
  return (
    <>
      <Helmet>
        <title>Checkout | EmviApp</title>
        <meta name="description" content="Complete your purchase on EmviApp" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
            <CardTitle className="text-2xl font-playfair text-orange-800">
              Checkout Unavailable
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              The checkout system is currently being updated. Please try again later or contact support.
            </p>
            <div className="space-y-2 pt-4">
              <Button asChild className="w-full">
                <Link to="/contact">
                  Contact Support
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link to="/">
                  Return Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CheckoutFallback;

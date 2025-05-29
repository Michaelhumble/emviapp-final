
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CheckoutFallback = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-orange-600" />
          </div>
          <CardTitle className="text-xl">Checkout Not Available</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            The checkout system is currently being set up. Please try again later or contact support.
          </p>
          <div className="space-y-2">
            <Button asChild className="w-full">
              <Link to="/">
                Return to Home
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
  );
};

export default CheckoutFallback;

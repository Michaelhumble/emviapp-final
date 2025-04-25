
import React from 'react';
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const RouteErrorBoundary = () => {
  const error = useRouteError();
  
  let errorMessage = 'An unexpected error occurred';
  let statusCode = 500;
  
  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }
  
  const is404 = statusCode === 404;
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="max-w-md w-full shadow-md border-gray-200">
        <CardHeader className={`bg-${is404 ? 'blue' : 'red'}-50 border-b border-${is404 ? 'blue' : 'red'}-100`}>
          <CardTitle className={`text-xl flex items-center gap-2 text-${is404 ? 'blue' : 'red'}-700`}>
            <AlertTriangle className="h-5 w-5" />
            {is404 ? 'Page Not Found' : 'Something Went Wrong'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600 mb-6">
            {is404 
              ? "The page you're looking for doesn't exist or has been moved." 
              : "We encountered an error while loading this page."}
          </p>
          
          {!is404 && errorMessage && (
            <div className={`mb-6 p-3 bg-red-50 border border-red-100 rounded-md text-sm text-red-700`}>
              {errorMessage}
            </div>
          )}
          
          <div className="flex flex-col space-y-2">
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
              className="w-full"
            >
              Try Again
            </Button>
            
            <Button 
              asChild
              variant={is404 ? "default" : "outline"}
              className="w-full"
            >
              <Link to="/">
                <Home className="h-4 w-4 mr-2" /> Go to Homepage
              </Link>
            </Button>
            
            <Button 
              onClick={() => window.history.back()} 
              variant="outline"
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteErrorBoundary;

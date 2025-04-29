
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import SalonsFinal from './SalonsFinal';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

/**
 * This component serves as a stable wrapper for the salon pages.
 * It will catch any errors in the salon pages and display a fallback UI.
 */
const StableSalonPage: React.FC = () => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    // Log that we're using the stable version
    console.log('Using StableSalonPage wrapper - v1.0.1');
  }, []);

  // Error boundary functionality
  const handleError = () => {
    setHasError(true);
    console.error('Error in SalonsFinal component');
  };

  return (
    <React.Fragment>
      {hasError ? (
        <Layout>
          <div className="container mx-auto px-4 py-12">
            <Card>
              <CardContent className="pt-6">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    We encountered an issue loading the salon listings. 
                    Our team has been notified and is working on a fix.
                  </AlertDescription>
                </Alert>
                
                <div className="mt-8 text-center">
                  <h2 className="text-xl font-semibold mb-4">
                    Please try one of our other features
                  </h2>
                  <div className="flex justify-center gap-4">
                    <a href="/jobs" className="text-primary hover:underline">Jobs</a>
                    <a href="/" className="text-primary hover:underline">Homepage</a>
                    <a href="/dashboard" className="text-primary hover:underline">Dashboard</a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Layout>
      ) : (
        <React.Suspense fallback={<div className="container mx-auto px-4 py-12">Loading...</div>}>
          <ErrorBoundary onError={handleError}>
            <SalonsFinal />
          </ErrorBoundary>
        </React.Suspense>
      )}
    </React.Fragment>
  );
};

// Simple error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: () => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError: () => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return null; // Parent will handle the error UI
    }
    return this.props.children;
  }
}

export default StableSalonPage;

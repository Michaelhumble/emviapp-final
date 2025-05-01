
import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface StablePageWrapperProps {
  children: ReactNode;
  title: string;
  description: string;
  fallbackLinks?: Array<{href: string, label: string}>;
  version?: string;
}

/**
 * A reusable wrapper component that provides error boundary functionality
 * Can be applied to any page that needs stability guarantees
 */
const StablePageWrapper: React.FC<StablePageWrapperProps> = ({
  children,
  title,
  description,
  fallbackLinks = [
    { href: "/", label: "Homepage" },
    { href: "/dashboard", label: "Dashboard" }
  ],
  version = "1.0.0"
}) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    console.log(`Using StablePageWrapper for ${title} - v${version}`);
  }, [title, version]);

  // Error boundary functionality
  const handleError = () => {
    setHasError(true);
    console.error(`Error in ${title} component`);
  };

  return (
    <Layout>
      <Helmet>
        <title>{title} | EmviApp</title>
        <meta name="description" content={description} />
      </Helmet>

      {hasError ? (
        <div className="container mx-auto px-4 py-12">
          <Card>
            <CardContent className="pt-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  We encountered an issue loading this page. 
                  Our team has been notified and is working on a fix.
                </AlertDescription>
              </Alert>
              
              <div className="mt-8 text-center">
                <h2 className="text-xl font-semibold mb-4">
                  Please try one of our other features
                </h2>
                <div className="flex justify-center gap-4">
                  {fallbackLinks.map((link, index) => (
                    <a 
                      key={index}
                      href={link.href} 
                      className="text-primary hover:underline"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <React.Suspense fallback={<div className="container mx-auto px-4 py-12">Loading...</div>}>
          <ErrorBoundary onError={handleError}>
            {children}
          </ErrorBoundary>
        </React.Suspense>
      )}
    </Layout>
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

export default StablePageWrapper;

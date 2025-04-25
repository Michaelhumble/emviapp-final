
import React, { Component, ErrorInfo, ReactNode } from 'react';
import ErrorLayout from '@/components/layout/ErrorLayout';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface GlobalErrorBoundaryProps {
  children: ReactNode;
}

interface GlobalErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// The error boundary component needs to be a class component
class GlobalErrorBoundaryClass extends Component<
  GlobalErrorBoundaryProps & { navigate: (path: string) => void },
  GlobalErrorBoundaryState
> {
  constructor(props: GlobalErrorBoundaryProps & { navigate: (path: string) => void }) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): GlobalErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true, 
      error, 
      errorInfo: null 
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    console.error('Global error caught:', error, errorInfo);
    this.setState({
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleGoHome = () => {
    this.handleReset();
    this.props.navigate('/');
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorLayout hideNavbar={false}>
          <div className="flex flex-col items-center justify-center p-6">
            <AlertTriangle size={48} className="text-red-500 mb-4" />
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-6 text-center max-w-md">
              We encountered an unexpected error. Please try refreshing the page or return to the homepage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => window.location.reload()} 
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh Page
              </Button>
              <Button 
                variant="outline" 
                onClick={this.handleGoHome}
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Go to Homepage
              </Button>
            </div>
            {this.state.error && (
              <div className="mt-8 p-4 bg-gray-100 rounded-md w-full max-w-md overflow-auto">
                <p className="text-sm font-mono text-gray-700">
                  {this.state.error.toString()}
                </p>
              </div>
            )}
          </div>
        </ErrorLayout>
      );
    }

    return this.props.children;
  }
}

// Wrapper function component to provide history navigation
export default function GlobalErrorBoundary({ children }: GlobalErrorBoundaryProps) {
  // Using try/catch since this component might be used outside Router context
  let navigate = (path: string) => {}; // Fixed: Explicitly define navigate as a function that takes a path argument
  try {
    const navigateFunction = useNavigate();
    navigate = (path: string) => navigateFunction(path); // Wrap the navigate function to match our expected signature
  } catch (error) {
    console.warn('GlobalErrorBoundary used outside Router context');
  }

  return <GlobalErrorBoundaryClass navigate={navigate}>{children}</GlobalErrorBoundaryClass>;
}

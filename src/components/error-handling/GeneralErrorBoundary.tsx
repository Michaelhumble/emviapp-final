
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import ErrorLayout from '../layout/ErrorLayout';

interface GeneralErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface GeneralErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class GeneralErrorBoundary extends Component<GeneralErrorBoundaryProps, GeneralErrorBoundaryState> {
  constructor(props: GeneralErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<GeneralErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Application Error:", error);
    console.error("Component Stack:", errorInfo.componentStack);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <ErrorLayout>
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-6">
              We apologize for the inconvenience. An unexpected error has occurred.
            </p>
            
            <div className="max-w-lg mx-auto bg-orange-50 p-4 rounded-md mb-6 overflow-auto text-left">
              <p className="font-medium text-orange-700 mb-2">Error details:</p>
              <p className="text-sm text-orange-800 mb-2">{this.state.error?.message || "Unknown error"}</p>
              {this.state.errorInfo && (
                <details className="text-xs text-orange-700">
                  <summary className="cursor-pointer font-medium">View technical details</summary>
                  <pre className="mt-2 whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                </details>
              )}
            </div>

            <Button 
              onClick={this.handleReload}
              size="lg"
              className="bg-orange-500 hover:bg-orange-600"
            >
              Try Again
            </Button>
          </div>
        </ErrorLayout>
      );
    }

    return this.props.children;
  }
}

export default GeneralErrorBoundary;

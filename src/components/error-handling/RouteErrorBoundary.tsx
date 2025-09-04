import React, { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Route-level error boundary to catch WebSocket and other route-specific errors
 * Provides graceful fallback UI instead of crashing the entire app
 */
export class RouteErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    console.error('🚨 [ROUTE-ERROR-BOUNDARY] Error caught:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('🚨 [ROUTE-ERROR-BOUNDARY] Error details:', error, errorInfo);
    
    // Log specific WebSocket errors for debugging
    if (error.message?.includes('WebSocket') || error.message?.includes('insecure')) {
      console.warn('🔒 [ROUTE-ERROR-BOUNDARY] WebSocket error detected - likely iOS/PWA security restriction');
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Check if this is a WebSocket/security related error
      const isWebSocketError = this.state.error?.message?.includes('WebSocket') || 
                              this.state.error?.message?.includes('insecure') ||
                              this.state.error?.message?.includes('operation is insecure');

      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {isWebSocketError ? 'Loading...' : 'Something went wrong'}
            </h2>
            
            <p className="text-gray-600 mb-6">
              {isWebSocketError 
                ? 'Setting up the latest job listings for you. This may take a moment in app mode.'
                : 'We encountered an unexpected error. Please try refreshing the page.'
              }
            </p>

            <Button onClick={this.handleRetry} className="inline-flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              {isWebSocketError ? 'Continue' : 'Try Again'}
            </Button>
            
            {isWebSocketError && (
              <p className="text-xs text-gray-500 mt-4">
                For the best experience, visit emvi.app directly in your browser
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default RouteErrorBoundary;
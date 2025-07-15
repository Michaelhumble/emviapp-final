import React, { Component, ReactNode } from 'react';
import ErrorBoundaryUI from './ErrorBoundaryUI';
import { toast } from 'sonner';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  context?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorId?: string;
}

class CommunityErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true, 
      error,
      errorId: Date.now().toString()
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error
    console.error('CommunityErrorBoundary caught an error:', error, errorInfo);
    
    // Call the onError prop if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Show a toast notification
    toast.error('Something went wrong. Please try refreshing the page.');

    // In production, you could send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: sendErrorToService(error, errorInfo);
    }
  }

  handleRetry = () => {
    // Clear the error state to retry rendering
    this.setState({ hasError: false, error: undefined, errorId: undefined });
    
    // Show a loading toast
    toast.info('Retrying...');
  };

  handleGoHome = () => {
    // Navigate to home page
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Render default error UI
      return (
        <ErrorBoundaryUI
          error={this.state.error}
          onRetry={this.handleRetry}
          onGoHome={this.handleGoHome}
          context={this.props.context}
        />
      );
    }

    return this.props.children;
  }
}

export default CommunityErrorBoundary;
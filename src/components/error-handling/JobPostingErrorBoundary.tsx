
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackUI?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error boundary specifically for job posting flow
 * Provides a fallback UI and recovery options
 */
class JobPostingErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to console
    console.error('Job posting error caught by boundary:', error);
    console.error('Component stack:', errorInfo.componentStack);
    
    // Update state with error info
    this.setState({
      error,
      errorInfo
    });
    
    // Optional: Send to error reporting service
    // reportError(error, errorInfo);
  }

  handleReset = () => {
    // Clear job posting state from localStorage
    localStorage.removeItem('emviapp_job_posting_state');
    
    // Reload page
    window.location.reload();
  };
  
  handleSwitchToLegacy = () => {
    // Set flag to use legacy flow
    localStorage.setItem('useJobPostingLegacyFlow', 'true');
    
    // Reload page
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Render fallback UI or custom provided fallback
      return this.props.fallbackUI || (
        <div className="p-6 bg-red-50 border border-red-200 rounded-md text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-red-700 mb-2">
            There was a problem with job posting
          </h2>
          <p className="text-red-600 mb-4">
            We're sorry, but something went wrong with processing your job posting.
          </p>
          
          {/* Display error for developers */}
          {process.env.NODE_ENV === 'development' && (
            <div className="my-4 p-3 bg-red-100 text-red-800 text-left overflow-auto max-h-40 rounded">
              <p className="font-mono text-sm">{this.state.error?.toString()}</p>
              <pre className="font-mono text-xs mt-2 whitespace-pre-wrap">
                {this.state.errorInfo?.componentStack}
              </pre>
            </div>
          )}
          
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center mt-6">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
            
            <Button 
              variant="destructive" 
              className="flex items-center gap-2"
              onClick={this.handleSwitchToLegacy}
            >
              Use Legacy Flow
            </Button>
            
            <Button 
              className="flex items-center gap-2"
              onClick={this.handleReset}
            >
              <RefreshCw className="h-4 w-4" />
              Reset & Try Again
            </Button>
          </div>
        </div>
      );
    }

    // When there's no error, render children normally
    return this.props.children;
  }
}

export default JobPostingErrorBoundary;

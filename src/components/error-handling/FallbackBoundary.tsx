
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface FallbackBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  errorMessage?: string;
}

interface FallbackBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * FallbackBoundary component that catches errors in its child component tree
 * and displays a fallback UI instead of crashing the entire app
 */
class FallbackBoundary extends Component<FallbackBoundaryProps, FallbackBoundaryState> {
  constructor(props: FallbackBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): FallbackBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("[FallbackBoundary] Error caught:", error, errorInfo);
    
    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="p-4 border rounded-lg bg-muted/30 flex flex-col items-center justify-center space-y-4 min-h-[200px]">
          <div className="flex items-center gap-2 text-amber-600">
            <AlertTriangle className="h-5 w-5" />
            <h3 className="font-medium">
              {this.props.errorMessage || "Something went wrong displaying this content"}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            {this.state.error?.message || "The application encountered an unexpected error"}
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={this.handleRetry}
            className="mt-4"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default FallbackBoundary;

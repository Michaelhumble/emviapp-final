
import React, { Component, ErrorInfo, ReactNode } from 'react';

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

class FallbackBoundary extends Component<FallbackBoundaryProps, FallbackBoundaryState> {
  constructor(props: FallbackBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): FallbackBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by FallbackBoundary:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="p-4 border border-red-300 bg-red-50 rounded-md m-2">
          <h2 className="text-lg font-medium text-red-800 mb-2">
            {this.props.errorMessage || "Something went wrong"}
          </h2>
          <p className="text-sm text-red-600">
            {this.state.error?.message || "An unexpected error occurred"}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default FallbackBoundary;

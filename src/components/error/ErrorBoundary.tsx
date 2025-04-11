
import React, { Component, ErrorInfo, ReactNode } from "react";
import ErrorLayout from "@/components/layout/ErrorLayout";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    console.error("Uncaught error:", error, errorInfo);
  }

  public resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <ErrorLayout>
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Something went wrong</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-md">
              The application encountered an unexpected error. Please try refreshing the page.
            </p>
            {this.state.error && (
              <div className="text-xs text-gray-400 bg-gray-50 p-3 rounded mb-6 max-w-md overflow-auto">
                <p className="font-medium">Error: {this.state.error.message}</p>
                {this.state.errorInfo && (
                  <pre className="mt-2 text-left whitespace-pre-wrap">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}
            <div className="flex gap-4">
              <Button onClick={() => window.location.reload()} className="flex items-center gap-2">
                <RefreshCcw className="h-4 w-4" />
                Refresh Page
              </Button>
              <Link to="/">
                <Button variant="outline" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Go to Home
                </Button>
              </Link>
            </div>
          </div>
        </ErrorLayout>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

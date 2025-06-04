
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  constructor(props: AppErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<AppErrorBoundaryState> {
    console.error("App Error Boundary caught error:", error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("App Error Details:", error);
    console.error("Component Stack:", errorInfo.componentStack);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md mx-auto text-center p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Application Error
            </h1>
            <p className="text-gray-600 mb-6">
              Something went wrong while loading the application.
            </p>
            
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6 text-left">
              <p className="font-medium text-red-800 mb-2">Error details:</p>
              <p className="text-sm text-red-700 break-all">
                {this.state.error?.message || "Unknown error"}
              </p>
              {this.state.error?.stack && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm font-medium text-red-800">
                    Stack trace
                  </summary>
                  <pre className="mt-2 text-xs text-red-700 whitespace-pre-wrap overflow-auto max-h-32">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </div>

            <button 
              onClick={this.handleReload}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;

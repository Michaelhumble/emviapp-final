
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class GeneralErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">Oops, Something Went Wrong</h2>
            <p className="mb-4 text-gray-700">
              The application encountered an unexpected error.
            </p>
            <div className="bg-red-50 p-3 rounded-md mb-4 overflow-auto max-h-40 text-left">
              <code className="text-red-700 text-sm whitespace-pre-wrap">
                {this.state.error?.message || "An unknown error occurred"}
              </code>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GeneralErrorBoundary;

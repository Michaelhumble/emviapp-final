import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('Blog section error (non-critical):', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={`py-8 ${this.props.className || ''}`}>
          <div className="max-w-2xl mx-auto text-center px-4">
            <AlertTriangle className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Section temporarily unavailable
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              This section is experiencing issues but the rest of the blog is working fine.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => this.setState({ hasError: false })}
              className="text-xs"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
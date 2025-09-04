/**
 * iOS PWA Crash Prevention: Realtime-Specific Error Boundary
 * 
 * Catches WebSocket/realtime errors and provides graceful fallback UI
 * without crashing the entire page on iOS Safari, PWAs, or in-app webviews.
 */

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, Wifi, WifiOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
  showRetry?: boolean;
}

interface State {
  hasError: boolean;
  error?: Error;
  isRetrying: boolean;
}

class RealtimeErrorBoundary extends Component<Props, State> {
  private retryTimeout: NodeJS.Timeout | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      isRetrying: false
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Check if this is a realtime/WebSocket related error
    const isRealtimeError = error.message?.toLowerCase().includes('websocket') ||
                           error.message?.toLowerCase().includes('insecure') ||
                           error.message?.toLowerCase().includes('realtime') ||
                           error.message?.toLowerCase().includes('pwa') ||
                           error.stack?.toLowerCase().includes('websocket');

    return {
      hasError: isRealtimeError,
      error: isRealtimeError ? error : undefined,
      isRetrying: false
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Only handle realtime-related errors
    const isRealtimeError = error.message?.toLowerCase().includes('websocket') ||
                           error.message?.toLowerCase().includes('insecure') ||
                           error.message?.toLowerCase().includes('realtime');

    if (isRealtimeError) {
      console.warn('🚫 [REALTIME-ERROR-BOUNDARY] Caught realtime error:', {
        error: error.message,
        componentStack: errorInfo.componentStack,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
        isSecureContext: typeof window !== 'undefined' ? window.isSecureContext : 'N/A'
      });
    } else {
      // Re-throw non-realtime errors to be handled by parent boundaries
      throw error;
    }
  }

  handleRetry = () => {
    this.setState({ isRetrying: true });
    
    // Clear any existing timeout
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }

    // Reset error state after a brief delay
    this.retryTimeout = setTimeout(() => {
      this.setState({
        hasError: false,
        error: undefined,
        isRetrying: false
      });
    }, 1000);
  };

  componentWillUnmount() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }
  }

  render() {
    if (this.state.hasError) {
      const { fallbackMessage, showRetry = true } = this.props;
      const { isRetrying } = this.state;

      return (
        <div className="p-4">
          <Alert className="border-orange-200 bg-orange-50">
            <div className="flex items-start gap-3">
              <WifiOff className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-orange-800">
                    Live Updates Unavailable
                  </span>
                </div>
                <AlertDescription className="text-orange-700 text-sm">
                  {fallbackMessage || 
                   "Live updates are temporarily unavailable. Showing latest data from our servers."
                  }
                </AlertDescription>
                {showRetry && (
                  <div className="mt-3 flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={this.handleRetry}
                      disabled={isRetrying}
                      className="border-orange-300 text-orange-700 hover:bg-orange-100"
                    >
                      <Wifi className="h-4 w-4 mr-2" />
                      {isRetrying ? 'Reconnecting...' : 'Retry Connection'}
                    </Button>
                    <span className="text-xs text-orange-600">
                      Data will refresh automatically
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

export default RealtimeErrorBoundary;
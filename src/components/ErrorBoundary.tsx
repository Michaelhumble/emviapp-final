import React, { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analytics } from '@/lib/analytics';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: any) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: any;
  retryCount: number;
  isOnline: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  private retryTimeouts: NodeJS.Timeout[] = [];

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
      isOnline: navigator.onLine
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('🚨 [ERROR-BOUNDARY] Caught error:', error, errorInfo);
    
    // Track error in analytics
    analytics.trackError('component_error', error.message, {
      component_stack: errorInfo.componentStack,
      error_stack: error.stack,
      route: window.location.pathname,
      retry_count: this.state.retryCount,
      is_online: navigator.onLine
    });

    // Log error to Supabase if available
    this.logErrorToSupabase(error, errorInfo);

    this.setState({
      error,
      errorInfo
    });

    this.props.onError?.(error, errorInfo);
  }

  componentDidMount() {
    // Listen for online/offline events
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
    
    // Clear any pending retry timeouts
    this.retryTimeouts.forEach(clearTimeout);
  }

  handleOnline = () => {
    this.setState({ isOnline: true });
    
    // Auto-retry when coming back online
    if (this.state.hasError) {
      this.handleRetry();
    }
  };

  handleOffline = () => {
    this.setState({ isOnline: false });
  };

  handleRetry = () => {
    const { retryCount } = this.state;
    const maxRetries = 3;
    const retryDelay = Math.min(1000 * Math.pow(2, retryCount), 10000); // Exponential backoff, max 10s

    if (retryCount >= maxRetries) {
      console.warn('🚨 [ERROR-BOUNDARY] Max retries exceeded');
      return;
    }

    console.log(`🔄 [ERROR-BOUNDARY] Retrying in ${retryDelay}ms (attempt ${retryCount + 1}/${maxRetries})`);

    const timeout = setTimeout(() => {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: retryCount + 1
      });

      // Track retry attempt
      analytics.trackEvent({
        action: 'error_boundary_retry',
        category: 'error_handling',
        label: 'component_retry',
        custom_parameters: {
          retry_count: retryCount + 1,
          error_message: this.state.error?.message,
          is_online: this.state.isOnline
        }
      });
    }, retryDelay);

    this.retryTimeouts.push(timeout);
  };

  private async logErrorToSupabase(error: Error, errorInfo: any) {
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      await supabase.from('error_logs').insert({
        error_type: 'component_error',
        error_message: error.message,
        route: window.location.pathname,
        user_agent: navigator.userAgent,
        metadata: {
          error_stack: error.stack,
          component_stack: errorInfo.componentStack,
          retry_count: this.state.retryCount,
          is_online: navigator.onLine,
          timestamp: Date.now()
        }
      });
    } catch (logError) {
      console.warn('Failed to log error to Supabase:', logError);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, retryCount, isOnline } = this.state;
      const maxRetries = 3;
      const canRetry = retryCount < maxRetries;

      return (
        <Card className="mx-auto max-w-lg border-red-200 bg-red-50">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-red-900">Something went wrong</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-red-700">
              {!isOnline ? (
                <div className="flex items-center gap-2 rounded-lg bg-orange-100 p-3">
                  <WifiOff className="h-4 w-4 text-orange-600" />
                  <span>You appear to be offline. Check your internet connection.</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 rounded-lg bg-green-100 p-3">
                  <Wifi className="h-4 w-4 text-green-600" />
                  <span>Connected to internet</span>
                </div>
              )}
            </div>

            {error && (
              <div className="rounded-lg bg-red-100 p-3">
                <p className="text-xs font-medium text-red-800">Error Details:</p>
                <p className="text-xs text-red-600 font-mono">{error.message}</p>
              </div>
            )}

            <div className="flex flex-col gap-2">
              {canRetry ? (
                <Button 
                  onClick={this.handleRetry}
                  className="w-full"
                  disabled={!isOnline}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retry {retryCount > 0 && `(${retryCount}/${maxRetries})`}
                </Button>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-red-600 mb-2">
                    Maximum retry attempts exceeded
                  </p>
                  <Button 
                    onClick={() => window.location.reload()}
                    variant="outline"
                    className="w-full"
                  >
                    Reload Page
                  </Button>
                </div>
              )}

              <Button 
                variant="outline" 
                onClick={() => window.history.back()}
                className="w-full"
              >
                Go Back
              </Button>
            </div>

            <div className="text-xs text-gray-500 text-center">
              If this problem persists, please contact support with the error details above.
            </div>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}
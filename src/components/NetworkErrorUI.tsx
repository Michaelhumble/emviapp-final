import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Wifi, WifiOff, ArrowLeft } from 'lucide-react';
import { useRetryableFetch } from '@/hooks/useRetryableFetch';

interface NetworkErrorUIProps {
  error: Error;
  onRetry: () => void;
  onBack?: () => void;
  isRetrying?: boolean;
  retryCount?: number;
  maxRetries?: number;
  title?: string;
  description?: string;
}

export const NetworkErrorUI: React.FC<NetworkErrorUIProps> = ({
  error,
  onRetry,
  onBack,
  isRetrying = false,
  retryCount = 0,
  maxRetries = 3,
  title = "Connection Problem",
  description
}) => {
  const isOnline = navigator.onLine;
  const canRetry = retryCount < maxRetries;

  const getErrorType = () => {
    if (!isOnline) return 'offline';
    if (error.message.includes('404') || error.message.includes('Not Found')) return '404';
    if (error.message.includes('403') || error.message.includes('Forbidden')) return '403';
    if (error.message.includes('500') || error.message.includes('Internal Server')) return '500';
    if (error.message.includes('timeout')) return 'timeout';
    return 'network';
  };

  const getErrorMessage = () => {
    const errorType = getErrorType();
    
    switch (errorType) {
      case 'offline':
        return "You're currently offline. Please check your internet connection.";
      case '404':
        return "The page or data you're looking for couldn't be found. This might be a temporary issue.";
      case '403':
        return "Access denied. You might need to log in again.";
      case '500':
        return "Our servers are experiencing issues. We're working to fix this.";
      case 'timeout':
        return "The request timed out. This might be due to a slow connection.";
      default:
        return description || "We're having trouble connecting. This could be due to network issues or server problems.";
    }
  };

  const getErrorIcon = () => {
    return isOnline ? (
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
        <AlertTriangle className="h-6 w-6 text-red-600" />
      </div>
    ) : (
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
        <WifiOff className="h-6 w-6 text-orange-600" />
      </div>
    );
  };

  return (
    <Card className="mx-auto max-w-lg border-red-200 bg-red-50">
      <CardHeader className="text-center">
        {getErrorIcon()}
        <CardTitle className="text-red-900">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Connection Status */}
        <div className="text-sm">
          {isOnline ? (
            <div className="flex items-center gap-2 rounded-lg bg-green-100 p-3">
              <Wifi className="h-4 w-4 text-green-600" />
              <span className="text-green-700">Connected to internet</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-lg bg-orange-100 p-3">
              <WifiOff className="h-4 w-4 text-orange-600" />
              <span className="text-orange-700">No internet connection</span>
            </div>
          )}
        </div>

        {/* Error Message */}
        <div className="text-sm text-gray-700">
          {getErrorMessage()}
        </div>

        {/* Error Details */}
        <details className="rounded-lg bg-gray-100 p-3">
          <summary className="cursor-pointer text-xs font-medium text-gray-600">
            Technical Details
          </summary>
          <div className="mt-2 text-xs text-gray-500 font-mono">
            {error.message}
          </div>
        </details>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          {canRetry && isOnline ? (
            <Button 
              onClick={onRetry}
              disabled={isRetrying}
              className="w-full"
            >
              {isRetrying ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Retrying...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again {retryCount > 0 && `(${retryCount}/${maxRetries})`}
                </>
              )}
            </Button>
          ) : !isOnline ? (
            <Button 
              onClick={onRetry}
              disabled={true}
              variant="outline"
              className="w-full"
            >
              <WifiOff className="mr-2 h-4 w-4" />
              Waiting for connection...
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

          {onBack && (
            <Button 
              variant="outline" 
              onClick={onBack}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          )}
        </div>

        {/* Help Text */}
        <div className="text-xs text-gray-500 text-center">
          If this problem continues, try:
          <ul className="mt-1 text-left list-disc list-inside space-y-1">
            <li>Refreshing the page</li>
            <li>Checking your internet connection</li>
            <li>Trying again in a few minutes</li>
            {getErrorType() === '404' && <li>Going back and trying a different route</li>}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
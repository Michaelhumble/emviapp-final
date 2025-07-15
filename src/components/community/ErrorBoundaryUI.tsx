import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home, MessageCircle } from 'lucide-react';

interface ErrorBoundaryUIProps {
  error?: Error;
  onRetry?: () => void;
  onGoHome?: () => void;
  context?: string;
}

const ErrorBoundaryUI: React.FC<ErrorBoundaryUIProps> = ({ 
  error, 
  onRetry, 
  onGoHome,
  context = 'community'
}) => {
  const getErrorMessage = () => {
    if (!error) return "Something went wrong";
    
    if (error.message.includes('Failed to fetch')) {
      return "Connection issue - please check your internet and try again";
    }
    
    if (error.message.includes('Network')) {
      return "Network error - please try again in a moment";
    }
    
    if (error.message.includes('auth')) {
      return "Authentication issue - please sign in again";
    }
    
    return "An unexpected error occurred";
  };

  const getContextualSuggestions = () => {
    switch (context) {
      case 'posts':
        return [
          "Check your internet connection",
          "Try refreshing the page",
          "Make sure you're signed in"
        ];
      case 'search':
        return [
          "Try different search terms",
          "Check your spelling",
          "Use simpler keywords"
        ];
      case 'ai':
        return [
          "Try rephrasing your question",
          "Check your internet connection",
          "Try again in a few moments"
        ];
      default:
        return [
          "Refresh the page",
          "Check your connection",
          "Try signing out and back in"
        ];
    }
  };

  return (
    <Card className="border-red-200 bg-red-50">
      <CardContent className="p-6 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="p-3 bg-red-100 rounded-full">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-red-900 mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-red-700 mb-4">
              {getErrorMessage()}
            </p>
          </div>
          
          {/* Quick suggestions */}
          <div className="bg-white p-4 rounded-lg border border-red-200 w-full max-w-md">
            <h4 className="font-medium text-red-900 mb-2">Quick fixes:</h4>
            <ul className="text-sm text-red-700 space-y-1 text-left">
              {getContextualSuggestions().map((suggestion, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-3">
            {onRetry && (
              <Button
                onClick={onRetry}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            )}
            
            {onGoHome && (
              <Button
                onClick={onGoHome}
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                <Home className="h-4 w-4 mr-2" />
                Go to Home
              </Button>
            )}
          </div>
          
          {/* Support link */}
          <div className="text-sm text-red-600">
            Still having trouble?{' '}
            <button 
              className="underline hover:text-red-800"
              onClick={() => {
                // Could open a support modal or navigate to help
                console.log('Contact support clicked');
              }}
            >
              Contact Support
            </button>
          </div>
          
          {/* Error details (for development) */}
          {process.env.NODE_ENV === 'development' && error && (
            <details className="w-full mt-4">
              <summary className="text-xs text-red-600 cursor-pointer hover:text-red-800">
                Technical Details (Development Only)
              </summary>
              <pre className="text-xs bg-red-100 p-2 rounded mt-2 overflow-auto text-left">
                {error.stack || error.message}
              </pre>
            </details>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ErrorBoundaryUI;

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface SalonDashboardErrorBoundaryProps {
  children: ReactNode;
}

interface SalonDashboardErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class SalonDashboardErrorBoundary extends Component<
  SalonDashboardErrorBoundaryProps,
  SalonDashboardErrorBoundaryState
> {
  constructor(props: SalonDashboardErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<SalonDashboardErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("🏢 Salon Dashboard Error:", error);
    console.error("🏢 Error Info:", errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 p-6">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle className="text-2xl text-gray-800">
                  Salon Dashboard Error
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    We encountered an issue loading your salon dashboard. 
                    Don't worry - your data is safe and we're working to fix this.
                  </p>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
                    <h4 className="font-semibold text-red-800 mb-2">Technical Details:</h4>
                    <p className="text-sm text-red-700 mb-2">
                      {this.state.error?.message || "Unknown error occurred"}
                    </p>
                    {this.state.errorInfo && (
                      <details className="text-xs text-red-600">
                        <summary className="cursor-pointer font-medium">View stack trace</summary>
                        <pre className="mt-2 whitespace-pre-wrap overflow-auto max-h-32">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    onClick={this.handleReset}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </Button>
                  
                  <Button 
                    onClick={this.handleReload}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reload Page
                  </Button>
                </div>

                <div className="text-center text-sm text-gray-500">
                  <p>Need help? Contact support with the error details above.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SalonDashboardErrorBoundary;

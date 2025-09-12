import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { signInWithGoogle } from '@/services/auth';
import { AUTH_CONFIG, validateAuthProvider } from '@/utils/authConfig';
import { getAuthCallbackUrl } from '@/utils/getBaseUrl';
import { toast } from 'sonner';

interface AuthTestResult {
  step: string;
  status: 'success' | 'warning' | 'error';
  message: string;
  details?: string;
}

export const GoogleAuthTestPanel: React.FC = () => {
  const [testResults, setTestResults] = useState<AuthTestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  
  const addResult = (result: AuthTestResult) => {
    setTestResults(prev => [...prev, result]);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const runAuthTests = async () => {
    setIsRunning(true);
    clearResults();
    
    // Test 1: Environment Variables
    const clientId = (import.meta.env as any)?.VITE_GOOGLE_CLIENT_ID as string;
    const googleEnabled = (import.meta.env?.VITE_GOOGLE_ENABLED ?? 'true') !== 'false';
    
    if (!clientId) {
      addResult({
        step: 'Environment Check',
        status: 'error',
        message: 'VITE_GOOGLE_CLIENT_ID not found',
        details: 'Make sure the environment variable is set in your hosting configuration'
      });
    } else {
      addResult({
        step: 'Environment Check',
        status: 'success',
        message: `Google Client ID detected: ${clientId.slice(0, 20)}...`
      });
    }

    // Test 2: Auth Config
    const configEnabled = AUTH_CONFIG.GOOGLE_ENABLED;
    const providerValidation = validateAuthProvider('google');
    
    addResult({
      step: 'Config Validation',
      status: configEnabled ? 'success' : 'error',
      message: `Google OAuth ${configEnabled ? 'enabled' : 'disabled'} in auth config`,
      details: `Provider validation: ${providerValidation}`
    });

    // Test 3: Callback URL Generation
    const callbackUrl = getAuthCallbackUrl('/auth/callback');
    addResult({
      step: 'Callback URL',
      status: 'success',
      message: `Generated callback: ${callbackUrl}`
    });

    // Test 4: Test OAuth Initiation (if enabled)
    if (configEnabled) {
      try {
        console.log('🧪 [AUTH TEST] Testing Google OAuth initiation...');
        const result = await signInWithGoogle(callbackUrl);
        
        if (result.success) {
          addResult({
            step: 'OAuth Initiation',
            status: 'success',
            message: 'Google OAuth flow initiated successfully',
            details: 'User should be redirected to Google'
          });
        } else {
          addResult({
            step: 'OAuth Initiation',
            status: 'error',
            message: 'OAuth failed to initiate',
            details: result.error?.message || 'Unknown error'
          });
        }
      } catch (error: any) {
        addResult({
          step: 'OAuth Initiation',
          status: 'error',
          message: 'OAuth test failed',
          details: error.message
        });
      }
    } else {
      addResult({
        step: 'OAuth Initiation',
        status: 'warning',
        message: 'Skipped - Google OAuth not enabled'
      });
    }

    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variant = status === 'success' ? 'default' : status === 'warning' ? 'secondary' : 'destructive';
    return <Badge variant={variant}>{status.toUpperCase()}</Badge>;
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Google OAuth Test Panel
          <Button 
            variant="outline" 
            size="sm" 
            onClick={runAuthTests}
            disabled={isRunning}
          >
            {isRunning ? (
              <><RefreshCw className="h-4 w-4 animate-spin mr-1" /> Running...</>
            ) : (
              'Run Tests'
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {testResults.length === 0 && (
          <p className="text-muted-foreground">
            Click "Run Tests" to diagnose Google OAuth configuration
          </p>
        )}
        
        {testResults.map((result, index) => (
          <div key={index} className="border rounded p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(result.status)}
                <span className="font-medium">{result.step}</span>
              </div>
              {getStatusBadge(result.status)}
            </div>
            <p className="text-sm">{result.message}</p>
            {result.details && (
              <p className="text-xs text-muted-foreground bg-gray-50 p-2 rounded">
                {result.details}
              </p>
            )}
          </div>
        ))}
        
        {testResults.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Next Steps:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• If environment variables are missing, set them in your hosting configuration</li>
              <li>• If OAuth fails, check Supabase Auth provider settings</li>
              <li>• Verify redirect URLs match in Google Cloud Console and Supabase</li>
              <li>• Check browser console for detailed error messages</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
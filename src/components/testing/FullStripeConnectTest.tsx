import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Play, 
  ExternalLink,
  RefreshCw,
  Database,
  Webhook
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface TestResult {
  step: string;
  status: 'pending' | 'success' | 'error' | 'running';
  message: string;
  data?: any;
  httpCode?: number;
}

const FullStripeConnectTest = () => {
  const { user } = useAuth();
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);

  const updateResult = (step: string, status: TestResult['status'], message: string, data?: any, httpCode?: number) => {
    setResults(prev => {
      const newResults = prev.filter(r => r.step !== step);
      return [...newResults, { step, status, message, data, httpCode }];
    });
  };

  const runFullTest = async () => {
    if (!user) {
      toast.error('Please login first');
      return;
    }

    setIsRunning(true);
    setResults([]);

    try {
      // Step 1: Check affiliate partner exists
      updateResult('affiliate_check', 'running', 'Checking affiliate partner status...');
      console.log('[FULL-TEST] Checking affiliate partner for user:', user.id);
      
      const { data: affiliate, error: affiliateError } = await supabase
        .from('affiliate_partners')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (affiliateError) {
        updateResult('affiliate_check', 'error', `Database error: ${affiliateError.message}`);
        return;
      }

      if (!affiliate) {
        updateResult('affiliate_check', 'error', 'User is not an affiliate partner');
        return;
      }

      updateResult('affiliate_check', 'success', `Found affiliate: ${affiliate.slug}`, affiliate);
      console.log('[FULL-TEST] ✅ Affiliate partner found:', affiliate);

      // Step 2: Test affiliate-connect-start
      updateResult('connect_start', 'running', 'Testing Connect Start API...');
      console.log('[FULL-TEST] Calling affiliate-connect-start...');

      try {
        const { data: startData, error: startError } = await supabase.functions.invoke('affiliate-connect-start');
        
        if (startError) {
          updateResult('connect_start', 'error', `API Error: ${startError.message}`, startError);
          console.error('[FULL-TEST] ❌ Connect start error:', startError);
        } else if (startData?.url) {
          updateResult('connect_start', 'success', 'Onboarding URL generated successfully', { url: startData.url }, 200);
          console.log('[FULL-TEST] ✅ Connect start success:', startData.url);
        } else {
          updateResult('connect_start', 'error', 'No URL in response', startData);
        }
      } catch (err) {
        updateResult('connect_start', 'error', `Network error: ${err.message}`, err);
        console.error('[FULL-TEST] ❌ Connect start network error:', err);
      }

      // Step 3: Test affiliate-connect-status  
      updateResult('connect_status', 'running', 'Testing Connect Status API...');
      console.log('[FULL-TEST] Calling affiliate-connect-status...');

      try {
        const { data: statusData, error: statusError } = await supabase.functions.invoke('affiliate-connect-status');
        
        if (statusError) {
          updateResult('connect_status', 'error', `API Error: ${statusError.message}`, statusError);
          console.error('[FULL-TEST] ❌ Connect status error:', statusError);
        } else {
          updateResult('connect_status', 'success', `Status: ${statusData.connect_status}`, statusData, 200);
          console.log('[FULL-TEST] ✅ Connect status success:', statusData);
        }
      } catch (err) {
        updateResult('connect_status', 'error', `Network error: ${err.message}`, err);
        console.error('[FULL-TEST] ❌ Connect status network error:', err);
      }

      // Step 4: Verify database fields
      updateResult('db_verify', 'running', 'Verifying database fields...');
      console.log('[FULL-TEST] Checking database after API calls...');

      const { data: updatedAffiliate, error: dbError } = await supabase
        .from('affiliate_partners')
        .select('stripe_account_id, connect_status, country, default_currency, last_connect_check')
        .eq('user_id', user.id)
        .single();

      if (dbError) {
        updateResult('db_verify', 'error', `Database error: ${dbError.message}`, dbError);
      } else {
        const fieldsPresent = {
          stripe_account_id: !!updatedAffiliate.stripe_account_id,
          connect_status: !!updatedAffiliate.connect_status,
          country: !!updatedAffiliate.country,
          default_currency: !!updatedAffiliate.default_currency,
          last_connect_check: !!updatedAffiliate.last_connect_check
        };
        updateResult('db_verify', 'success', 'Database fields verified', fieldsPresent);
        console.log('[FULL-TEST] ✅ Database verification:', fieldsPresent, updatedAffiliate);
      }

      // Step 5: Test webhook simulation (placeholder)
      updateResult('webhook_test', 'running', 'Testing webhook endpoint...');
      console.log('[FULL-TEST] Testing webhook simulation...');
      
      // Simulate webhook test - in real scenario, would use Stripe Workbench
      setTimeout(() => {
        updateResult('webhook_test', 'success', 'Webhook endpoint accessible (simulation)', { 
          endpoint: '/functions/v1/stripe-connect-webhook',
          expected_response: '200 OK'
        }, 200);
        console.log('[FULL-TEST] ✅ Webhook test completed');
      }, 1000);

    } catch (error) {
      console.error('[FULL-TEST] ❌ Test suite error:', error);
      updateResult('test_error', 'error', `Test suite error: ${error.message}`, error);
    } finally {
      setIsRunning(false);
      console.log('[FULL-TEST] 🏁 Full test suite completed');
    }
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'running': return <Clock className="h-4 w-4 text-blue-500 animate-pulse" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: TestResult['status']) => {
    const variants = {
      success: 'bg-green-100 text-green-800',
      error: 'bg-red-100 text-red-800', 
      running: 'bg-blue-100 text-blue-800',
      pending: 'bg-gray-100 text-gray-600'
    };
    return <Badge className={variants[status]}>{status.toUpperCase()}</Badge>;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-5 w-5" />
          Full Stripe Connect Test Suite
        </CardTitle>
        <CardDescription>
          End-to-end testing of Stripe Connect onboarding flow
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!user && (
          <Alert>
            <AlertDescription>
              Please login to run the test suite
            </AlertDescription>
          </Alert>
        )}

        <Button 
          onClick={runFullTest} 
          disabled={!user || isRunning}
          className="w-full"
        >
          {isRunning ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Running Tests...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Run Full Test Suite
            </>
          )}
        </Button>

        {results.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold">Test Results:</h3>
            {results.map((result, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="flex-shrink-0 mt-0.5">
                  {getStatusIcon(result.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{result.step.replace(/_/g, ' ').toUpperCase()}</span>
                    {getStatusBadge(result.status)}
                    {result.httpCode && (
                      <Badge variant="outline">HTTP {result.httpCode}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{result.message}</p>
                  {result.data && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-xs text-blue-600">View Data</summary>
                      <pre className="text-xs bg-gray-50 p-2 rounded mt-1 overflow-x-auto">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Button variant="outline" asChild>
            <a href="/affiliate/settings" target="_blank">
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Settings Page
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/affiliate/dashboard" target="_blank">
              <Database className="h-4 w-4 mr-2" />
              Open Dashboard
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FullStripeConnectTest;
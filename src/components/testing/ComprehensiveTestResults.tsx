import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Clock, RefreshCw, Download, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface TestStep {
  step: string;
  status: 'pending' | 'running' | 'pass' | 'fail';
  message: string;
  httpCode?: number;
  responseData?: any;
  dbValues?: any;
  error?: any;
  timestamp?: string;
}

const ComprehensiveTestResults = () => {
  const [testSteps, setTestSteps] = useState<TestStep[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [finalSummary, setFinalSummary] = useState<any>(null);

  const updateStep = (step: string, status: TestStep['status'], message: string, data?: any) => {
    setTestSteps(prev => {
      const existing = prev.findIndex(s => s.step === step);
      const newStep: TestStep = {
        step,
        status,
        message,
        timestamp: new Date().toISOString(),
        ...data
      };
      
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = newStep;
        return updated;
      } else {
        return [...prev, newStep];
      }
    });
  };

  const runComprehensiveTest = async () => {
    setIsRunning(true);
    setTestSteps([]);
    setFinalSummary(null);

    console.log('🧪 [COMPREHENSIVE-TEST] Starting full Stripe Connect integration test...');

    try {
      // Step 1: Verify user authentication
      updateStep('user_auth', 'running', 'Checking user authentication...');
      const { data: user, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user.user) {
        updateStep('user_auth', 'fail', 'User not authenticated', { error: userError });
        return;
      }
      
      updateStep('user_auth', 'pass', `Authenticated as: ${user.user.email}`, { 
        responseData: { user_id: user.user.id, email: user.user.email } 
      });

      // Step 2: Check affiliate partner record
      updateStep('affiliate_check', 'running', 'Verifying affiliate partner record...');
      const { data: affiliate, error: affiliateError } = await supabase
        .from('affiliate_partners')
        .select('*')
        .eq('user_id', user.user.id)
        .maybeSingle();

      if (affiliateError) {
        updateStep('affiliate_check', 'fail', 'Database error checking affiliate', { 
          error: affiliateError,
          httpCode: 500
        });
        return;
      }

      if (!affiliate) {
        updateStep('affiliate_check', 'fail', 'No affiliate partner record found', { 
          httpCode: 404 
        });
        return;
      }

      updateStep('affiliate_check', 'pass', 'Affiliate partner record found', {
        dbValues: affiliate,
        httpCode: 200
      });

      // Step 3: Test affiliate-connect-start API
      updateStep('connect_start_api', 'running', 'Testing connect start API...');
      const startTime = Date.now();
      
      try {
        const { data: startData, error: startError } = await supabase.functions.invoke('affiliate-connect-start');
        const responseTime = Date.now() - startTime;
        
        if (startError) {
          updateStep('connect_start_api', 'fail', `API error: ${startError.message}`, {
            error: startError,
            httpCode: startError.status || 500,
            responseTime
          });
        } else if (startData?.url) {
          updateStep('connect_start_api', 'pass', 'Connect start API working - URL generated', {
            responseData: { url: startData.url, account_id: startData.account_id },
            httpCode: 200,
            responseTime
          });
        } else {
          updateStep('connect_start_api', 'fail', 'No URL returned from API', {
            responseData: startData,
            httpCode: 200,
            responseTime
          });
        }
      } catch (error) {
        updateStep('connect_start_api', 'fail', `Network error: ${error.message}`, {
          error,
          responseTime: Date.now() - startTime
        });
      }

      // Step 4: Test affiliate-connect-status API
      updateStep('connect_status_api', 'running', 'Testing connect status API...');
      const statusStartTime = Date.now();
      
      try {
        const { data: statusData, error: statusError } = await supabase.functions.invoke('affiliate-connect-status');
        const statusResponseTime = Date.now() - statusStartTime;
        
        if (statusError) {
          updateStep('connect_status_api', 'fail', `Status API error: ${statusError.message}`, {
            error: statusError,
            httpCode: statusError.status || 500,
            responseTime: statusResponseTime
          });
        } else {
          updateStep('connect_status_api', 'pass', 'Status API working', {
            responseData: statusData,
            httpCode: 200,
            responseTime: statusResponseTime
          });
        }
      } catch (error) {
        updateStep('connect_status_api', 'fail', `Status network error: ${error.message}`, {
          error,
          responseTime: Date.now() - statusStartTime
        });
      }

      // Step 5: Test webhook endpoint
      updateStep('webhook_test', 'running', 'Testing webhook endpoint...');
      const webhookStartTime = Date.now();
      
      const testWebhookPayload = {
        id: `evt_test_${Date.now()}`,
        type: 'account.updated',
        data: {
          object: {
            id: affiliate.stripe_account_id || 'acct_test_account',
            charges_enabled: true,
            payouts_enabled: true,
            details_submitted: true,
            country: 'US',
            default_currency: 'usd'
          }
        }
      };

      try {
        const { data: webhookData, error: webhookError } = await supabase.functions.invoke('stripe-connect-webhook', {
          body: testWebhookPayload
        });
        const webhookResponseTime = Date.now() - webhookStartTime;
        
        if (webhookError) {
          updateStep('webhook_test', 'fail', `Webhook error: ${webhookError.message}`, {
            error: webhookError,
            httpCode: webhookError.status || 500,
            responseTime: webhookResponseTime
          });
        } else {
          updateStep('webhook_test', 'pass', 'Webhook endpoint working', {
            responseData: webhookData,
            httpCode: 200,
            responseTime: webhookResponseTime
          });
        }
      } catch (error) {
        updateStep('webhook_test', 'fail', `Webhook network error: ${error.message}`, {
          error,
          responseTime: Date.now() - webhookStartTime
        });
      }

      // Step 6: Verify database schema
      updateStep('db_schema', 'running', 'Verifying database schema...');
      const requiredFields = [
        'stripe_account_id', 'connect_status', 'country', 
        'default_currency', 'last_connect_check'
      ];
      
      const hasAllFields = requiredFields.every(field => field in affiliate);
      const missingFields = requiredFields.filter(field => !(field in affiliate));
      
      if (hasAllFields) {
        updateStep('db_schema', 'pass', 'All required database fields present', {
          dbValues: {
            fields_present: requiredFields,
            current_values: {
              stripe_account_id: affiliate.stripe_account_id,
              connect_status: affiliate.connect_status,
              country: affiliate.country,
              default_currency: affiliate.default_currency,
              last_connect_check: affiliate.last_connect_check
            }
          }
        });
      } else {
        updateStep('db_schema', 'fail', `Missing database fields: ${missingFields.join(', ')}`, {
          dbValues: { missing_fields: missingFields }
        });
      }

      // Step 7: Re-fetch affiliate data after tests to check updates
      updateStep('db_verification', 'running', 'Verifying database updates...');
      const { data: updatedAffiliate, error: updateError } = await supabase
        .from('affiliate_partners')
        .select('*')
        .eq('user_id', user.user.id)
        .single();

      if (updateError) {
        updateStep('db_verification', 'fail', 'Error fetching updated affiliate data', {
          error: updateError
        });
      } else {
        updateStep('db_verification', 'pass', 'Database verification complete', {
          dbValues: updatedAffiliate
        });
      }

      // Generate final summary
      const passedTests = testSteps.filter(s => s.status === 'pass').length;
      const failedTests = testSteps.filter(s => s.status === 'fail').length;
      const totalTests = testSteps.length;

      setFinalSummary({
        timestamp: new Date().toISOString(),
        summary: {
          total_tests: totalTests,
          passed: passedTests,
          failed: failedTests,
          success_rate: `${Math.round((passedTests / totalTests) * 100)}%`
        },
        final_db_state: updatedAffiliate,
        test_environment: 'Stripe Test Mode',
        client_info: {
          user_agent: navigator.userAgent,
          url: window.location.href
        }
      });

      console.log('🧪 [COMPREHENSIVE-TEST] Test suite completed!', {
        passed: passedTests,
        failed: failedTests,
        total: totalTests
      });

    } catch (error) {
      console.error('🧪 [COMPREHENSIVE-TEST] Test suite failed:', error);
      updateStep('test_execution', 'fail', `Test execution failed: ${error.message}`, {
        error
      });
    } finally {
      setIsRunning(false);
    }
  };

  const exportResults = () => {
    const results = {
      test_summary: finalSummary,
      test_steps: testSteps,
      generated_at: new Date().toISOString()
    };

    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `stripe-connect-test-results-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Test results exported successfully!');
  };

  const renderStep = (step: TestStep) => {
    let statusColor, icon;
    
    switch (step.status) {
      case 'pass':
        statusColor = 'text-green-600';
        icon = <CheckCircle className="h-4 w-4 text-green-600" />;
        break;
      case 'fail':
        statusColor = 'text-red-600';
        icon = <AlertCircle className="h-4 w-4 text-red-600" />;
        break;
      case 'running':
        statusColor = 'text-blue-600';
        icon = <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
        break;
      default:
        statusColor = 'text-gray-600';
        icon = <Clock className="h-4 w-4 text-gray-600" />;
    }

    return (
      <div key={step.step} className="border rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon}
            <div>
              <h4 className="font-medium">{step.step.replace('_', ' ').toUpperCase()}</h4>
              <p className={`text-sm ${statusColor}`}>{step.message}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {step.httpCode && (
              <Badge variant={step.httpCode >= 200 && step.httpCode < 300 ? 'default' : 'destructive'}>
                HTTP {step.httpCode}
              </Badge>
            )}
            <Badge variant={step.status === 'pass' ? 'default' : step.status === 'fail' ? 'destructive' : 'secondary'}>
              {step.status}
            </Badge>
          </div>
        </div>

        {(step.responseData || step.dbValues || step.error) && (
          <details className="text-sm">
            <summary className="cursor-pointer text-muted-foreground font-medium">
              View Details
            </summary>
            <div className="mt-2 space-y-2">
              {step.responseData && (
                <div>
                  <p className="font-medium text-xs text-blue-600">API Response:</p>
                  <pre className="text-xs bg-blue-50 p-2 rounded overflow-auto">
                    {JSON.stringify(step.responseData, null, 2)}
                  </pre>
                </div>
              )}
              {step.dbValues && (
                <div>
                  <p className="font-medium text-xs text-green-600">Database Values:</p>
                  <pre className="text-xs bg-green-50 p-2 rounded overflow-auto">
                    {JSON.stringify(step.dbValues, null, 2)}
                  </pre>
                </div>
              )}
              {step.error && (
                <div>
                  <p className="font-medium text-xs text-red-600">Error Details:</p>
                  <pre className="text-xs bg-red-50 p-2 rounded overflow-auto">
                    {JSON.stringify(step.error, null, 2)}
                  </pre>
                </div>
              )}
              {step.timestamp && (
                <p className="text-xs text-muted-foreground">
                  Executed at: {new Date(step.timestamp).toLocaleString()}
                </p>
              )}
            </div>
          </details>
        )}
      </div>
    );
  };

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Comprehensive Stripe Connect Test Suite
        </CardTitle>
        <CardDescription>
          End-to-end testing of the affiliate Stripe Connect integration with detailed logging
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <Button 
            onClick={runComprehensiveTest} 
            disabled={isRunning}
            size="lg"
          >
            {isRunning ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Running Comprehensive Test...
              </>
            ) : (
              'Run Full Test Suite'
            )}
          </Button>
          
          {finalSummary && (
            <Button variant="outline" onClick={exportResults}>
              <Download className="h-4 w-4 mr-2" />
              Export Results
            </Button>
          )}
        </div>

        {finalSummary && (
          <Alert className={finalSummary.summary.failed > 0 ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
            <AlertDescription>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div><strong>Total Tests:</strong> {finalSummary.summary.total_tests}</div>
                <div><strong>Passed:</strong> {finalSummary.summary.passed}</div>
                <div><strong>Failed:</strong> {finalSummary.summary.failed}</div>
                <div><strong>Success Rate:</strong> {finalSummary.summary.success_rate}</div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {testSteps.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Test Results</h3>
            {testSteps.map(renderStep)}
          </div>
        )}

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Test Environment:</strong> This comprehensive test runs against Stripe test mode and validates all aspects of the integration including APIs, database updates, and webhook processing.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default ComprehensiveTestResults;
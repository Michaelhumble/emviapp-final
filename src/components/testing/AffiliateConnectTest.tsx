import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Clock, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface TestResult {
  name: string;
  status: 'pass' | 'fail' | 'pending' | 'running';
  message: string;
  details?: any;
}

const AffiliateConnectTest = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const updateTestResult = (name: string, status: TestResult['status'], message: string, details?: any) => {
    setTestResults(prev => {
      const existing = prev.find(t => t.name === name);
      if (existing) {
        existing.status = status;
        existing.message = message;
        existing.details = details;
        return [...prev];
      } else {
        return [...prev, { name, status, message, details }];
      }
    });
  };

  const runFullTest = async () => {
    setIsRunning(true);
    setTestResults([]);

    // Test 1: Check if user has affiliate partner record
    try {
      updateTestResult('Affiliate Partner Check', 'running', 'Checking affiliate partner record...');
      
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        updateTestResult('Affiliate Partner Check', 'fail', 'User not authenticated');
        return;
      }

      const { data: affiliate, error } = await supabase
        .from('affiliate_partners')
        .select('*')
        .eq('user_id', user.user.id)
        .maybeSingle();

      if (error) {
        updateTestResult('Affiliate Partner Check', 'fail', `Database error: ${error.message}`);
        return;
      }

      if (!affiliate) {
        updateTestResult('Affiliate Partner Check', 'fail', 'No affiliate partner record found');
        return;
      }

      updateTestResult('Affiliate Partner Check', 'pass', 'Affiliate partner record found', affiliate);

      // Test 2: Test affiliate-connect-status function
      updateTestResult('Connect Status API', 'running', 'Testing connect status endpoint...');
      
      const { data: statusData, error: statusError } = await supabase.functions.invoke('affiliate-connect-status');
      
      if (statusError) {
        updateTestResult('Connect Status API', 'fail', `API error: ${statusError.message}`, statusError);
      } else {
        updateTestResult('Connect Status API', 'pass', 'Status API working', statusData);
      }

      // Test 3: Test affiliate-connect-start function (if not already connected)
      if (!affiliate.stripe_account_id) {
        updateTestResult('Connect Start API', 'running', 'Testing connect start endpoint...');
        
        const { data: startData, error: startError } = await supabase.functions.invoke('affiliate-connect-start');
        
        if (startError) {
          updateTestResult('Connect Start API', 'fail', `API error: ${startError.message}`, startError);
        } else if (startData?.url) {
          updateTestResult('Connect Start API', 'pass', 'Start API working - onboarding URL generated', startData);
        } else {
          updateTestResult('Connect Start API', 'fail', 'No URL returned from API', startData);
        }
      } else {
        updateTestResult('Connect Start API', 'pass', 'Skipped - already has Stripe account');
      }

      // Test 4: Database field verification
      updateTestResult('Database Schema', 'running', 'Checking database fields...');
      
      const expectedFields = ['stripe_account_id', 'connect_status', 'country', 'default_currency', 'last_connect_check'];
      const hasAllFields = expectedFields.every(field => field in affiliate);
      
      if (hasAllFields) {
        updateTestResult('Database Schema', 'pass', 'All required fields present in database', expectedFields);
      } else {
        const missingFields = expectedFields.filter(field => !(field in affiliate));
        updateTestResult('Database Schema', 'fail', `Missing fields: ${missingFields.join(', ')}`, missingFields);
      }

    } catch (error) {
      console.error('Test execution error:', error);
      updateTestResult('Test Execution', 'fail', `Unexpected error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const renderTestResult = (result: TestResult) => {
    let icon, badgeVariant, textColor;
    
    switch (result.status) {
      case 'pass':
        icon = <CheckCircle className="h-4 w-4 text-green-600" />;
        badgeVariant = 'default';
        textColor = 'text-green-800';
        break;
      case 'fail':
        icon = <AlertCircle className="h-4 w-4 text-red-600" />;
        badgeVariant = 'destructive';
        textColor = 'text-red-800';
        break;
      case 'running':
        icon = <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
        badgeVariant = 'secondary';
        textColor = 'text-blue-800';
        break;
      default:
        icon = <Clock className="h-4 w-4 text-gray-600" />;
        badgeVariant = 'outline';
        textColor = 'text-gray-800';
    }

    return (
      <div key={result.name} className="flex items-center justify-between p-3 border rounded-lg">
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <p className="font-medium">{result.name}</p>
            <p className={`text-sm ${textColor}`}>{result.message}</p>
            {result.details && (
              <details className="mt-1">
                <summary className="text-xs cursor-pointer text-muted-foreground">View details</summary>
                <pre className="text-xs mt-1 p-2 bg-gray-100 rounded overflow-auto">
                  {JSON.stringify(result.details, null, 2)}
                </pre>
              </details>
            )}
          </div>
        </div>
        <Badge variant={badgeVariant as any}>{result.status}</Badge>
      </div>
    );
  };

  const generateTestSummary = () => {
    const passed = testResults.filter(r => r.status === 'pass').length;
    const failed = testResults.filter(r => r.status === 'fail').length;
    const total = testResults.length;
    
    return { passed, failed, total };
  };

  const summary = generateTestSummary();

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          Stripe Connect Test Suite
        </CardTitle>
        <CardDescription>
          Comprehensive testing of the affiliate Stripe Connect integration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <Button 
            onClick={runFullTest} 
            disabled={isRunning}
            className="w-full sm:w-auto"
          >
            {isRunning ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Running Tests...
              </>
            ) : (
              'Run Full Test Suite'
            )}
          </Button>
          
          {testResults.length > 0 && (
            <div className="text-sm text-muted-foreground">
              {summary.passed}/{summary.total} tests passed
            </div>
          )}
        </div>

        {testResults.length > 0 && (
          <>
            <Alert className={summary.failed > 0 ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
              <AlertDescription>
                <strong>Test Results Summary:</strong> {summary.passed} passed, {summary.failed} failed, {summary.total} total
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              {testResults.map(renderTestResult)}
            </div>
          </>
        )}

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Test Environment:</strong> This test runs against Stripe test mode. 
            Make sure STRIPE_CONNECT_CLIENT_ID is configured in your edge function secrets.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default AffiliateConnectTest;
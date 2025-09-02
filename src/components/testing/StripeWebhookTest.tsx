import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle, AlertCircle, Webhook, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const StripeWebhookTest = () => {
  const [testResult, setTestResult] = useState<{
    status: 'idle' | 'testing' | 'success' | 'error';
    message: string;
    details?: any;
  }>({ status: 'idle', message: '' });

  const [webhookPayload, setWebhookPayload] = useState(`{
  "id": "evt_test_webhook",
  "object": "event",
  "api_version": "2023-10-16",
  "created": ${Math.floor(Date.now() / 1000)},
  "data": {
    "object": {
      "id": "acct_test_account",
      "object": "account",
      "business_type": "individual",
      "charges_enabled": true,
      "country": "US",
      "default_currency": "usd",
      "details_submitted": true,
      "email": "test@example.com",
      "payouts_enabled": true,
      "requirements": {
        "currently_due": [],
        "disabled_reason": null,
        "eventually_due": [],
        "past_due": [],
        "pending_verification": []
      },
      "type": "express"
    }
  },
  "livemode": false,
  "pending_webhooks": 1,
  "request": {
    "id": "req_test_request",
    "idempotency_key": null
  },
  "type": "account.updated"
}`);

  const testWebhook = async () => {
    setTestResult({ status: 'testing', message: 'Sending test webhook...' });
    
    try {
      // Parse the JSON payload
      const payload = JSON.parse(webhookPayload);
      
      // Send to our stripe-connect-webhook function
      const { data, error } = await supabase.functions.invoke('stripe-connect-webhook', {
        body: payload
      });
      
      if (error) {
        setTestResult({
          status: 'error',
          message: `Webhook failed: ${error.message}`,
          details: error
        });
        toast.error('Webhook test failed');
        return;
      }
      
      setTestResult({
        status: 'success',
        message: 'Webhook processed successfully',
        details: data
      });
      toast.success('Webhook test completed successfully');
      
    } catch (error) {
      setTestResult({
        status: 'error',
        message: `Invalid JSON or request failed: ${error.message}`,
        details: error
      });
      toast.error('Webhook test failed');
    }
  };

  const sampleWebhooks = [
    {
      name: 'Account Updated - Connected',
      payload: {
        id: "evt_test_connected",
        type: "account.updated",
        data: {
          object: {
            id: "acct_test_connected",
            charges_enabled: true,
            payouts_enabled: true,
            details_submitted: true,
            country: "US",
            default_currency: "usd"
          }
        }
      }
    },
    {
      name: 'Account Updated - Pending',
      payload: {
        id: "evt_test_pending",
        type: "account.updated",
        data: {
          object: {
            id: "acct_test_pending",
            charges_enabled: false,
            payouts_enabled: false,
            details_submitted: false,
            requirements: {
              currently_due: ["individual.ssn_last_4", "individual.dob.day"]
            }
          }
        }
      }
    },
    {
      name: 'External Account Created',
      payload: {
        id: "evt_test_external_account",
        type: "account.external_account.created",
        data: {
          object: {
            id: "ba_test_bank_account",
            object: "bank_account",
            account: "acct_test_account",
            country: "US",
            currency: "usd",
            status: "new"
          }
        }
      }
    }
  ];

  const loadSampleWebhook = (payload: any) => {
    setWebhookPayload(JSON.stringify({
      ...payload,
      created: Math.floor(Date.now() / 1000),
      livemode: false
    }, null, 2));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Webhook className="h-5 w-5" />
          Stripe Webhook Testing
        </CardTitle>
        <CardDescription>
          Test webhook handling for Stripe Connect events
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Sample Webhook Events</Label>
          <div className="flex flex-wrap gap-2">
            {sampleWebhooks.map((webhook, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => loadSampleWebhook(webhook.payload)}
              >
                {webhook.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="webhook-payload">Webhook Payload (JSON)</Label>
          <Textarea
            id="webhook-payload"
            value={webhookPayload}
            onChange={(e) => setWebhookPayload(e.target.value)}
            rows={12}
            className="font-mono text-sm"
            placeholder="Enter your webhook JSON payload here..."
          />
        </div>

        <Button 
          onClick={testWebhook} 
          disabled={testResult.status === 'testing'}
          className="w-full"
        >
          {testResult.status === 'testing' ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Testing Webhook...
            </>
          ) : (
            <>
              <Webhook className="h-4 w-4 mr-2" />
              Test Webhook
            </>
          )}
        </Button>

        {testResult.status !== 'idle' && (
          <Alert className={testResult.status === 'success' ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
            <div className="flex items-center gap-2">
              {testResult.status === 'success' ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : testResult.status === 'error' ? (
                <AlertCircle className="h-4 w-4 text-red-600" />
              ) : (
                <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
              )}
              <Badge variant={testResult.status === 'success' ? 'default' : 'destructive'}>
                {testResult.status}
              </Badge>
            </div>
            <AlertDescription className="mt-2">
              <strong>Result:</strong> {testResult.message}
              {testResult.details && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm">View response details</summary>
                  <pre className="text-xs mt-1 p-2 bg-gray-100 rounded overflow-auto">
                    {JSON.stringify(testResult.details, null, 2)}
                  </pre>
                </details>
              )}
            </AlertDescription>
          </Alert>
        )}

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Note:</strong> This tests the webhook endpoint processing. 
            In production, webhooks are sent by Stripe automatically when account events occur.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default StripeWebhookTest;
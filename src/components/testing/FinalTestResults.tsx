import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, XCircle, FileText } from 'lucide-react';

interface TestResultsSummaryProps {
  results: {
    affiliatePartnerCheck: 'pass' | 'fail' | 'pending';
    connectStatusAPI: 'pass' | 'fail' | 'pending';
    connectStartAPI: 'pass' | 'fail' | 'pending';
    databaseSchema: 'pass' | 'fail' | 'pending';
    stripeConnectFlow: 'pass' | 'fail' | 'pending';
    webhookProcessing: 'pass' | 'fail' | 'pending';
    uiStatusBadges: 'pass' | 'fail' | 'pending';
    manageStripeLink: 'pass' | 'fail' | 'pending';
  };
}

const FinalTestResults: React.FC<TestResultsSummaryProps> = ({ results }) => {
  const testCategories = [
    {
      name: 'Affiliate Partner Check',
      key: 'affiliatePartnerCheck' as keyof typeof results,
      description: 'Verify user has affiliate partner record in database'
    },
    {
      name: 'Connect Status API',
      key: 'connectStatusAPI' as keyof typeof results,
      description: 'Test affiliate-connect-status edge function'
    },
    {
      name: 'Connect Start API',
      key: 'connectStartAPI' as keyof typeof results,
      description: 'Test affiliate-connect-start edge function'
    },
    {
      name: 'Database Schema',
      key: 'databaseSchema' as keyof typeof results,
      description: 'Verify all required database fields exist'
    },
    {
      name: 'Stripe Connect Flow',
      key: 'stripeConnectFlow' as keyof typeof results,
      description: 'Complete onboarding flow with Stripe test mode'
    },
    {
      name: 'Webhook Processing',
      key: 'webhookProcessing' as keyof typeof results,
      description: 'Process Stripe Connect webhook events'
    },
    {
      name: 'UI Status Badges',
      key: 'uiStatusBadges' as keyof typeof results,
      description: 'Status badges update correctly in settings UI'
    },
    {
      name: 'Manage Stripe Link',
      key: 'manageStripeLink' as keyof typeof results,
      description: 'Deep link to Stripe dashboard works correctly'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'fail':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pass':
        return <Badge className="bg-green-100 text-green-800">PASS</Badge>;
      case 'fail':
        return <Badge variant="destructive">FAIL</Badge>;
      default:
        return <Badge variant="outline">PENDING</Badge>;
    }
  };

  const passed = Object.values(results).filter(r => r === 'pass').length;
  const failed = Object.values(results).filter(r => r === 'fail').length;
  const pending = Object.values(results).filter(r => r === 'pending').length;
  const total = testCategories.length;

  const overallStatus = failed > 0 ? 'fail' : pending > 0 ? 'pending' : 'pass';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Final Test Results Summary
        </CardTitle>
        <CardDescription>
          Complete testing results for Stripe Connect affiliate integration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert className={
          overallStatus === 'pass' 
            ? "border-green-200 bg-green-50" 
            : overallStatus === 'fail' 
            ? "border-red-200 bg-red-50" 
            : "border-yellow-200 bg-yellow-50"
        }>
          <div className="flex items-center gap-2">
            {getStatusIcon(overallStatus)}
            <span className="font-semibold">
              Overall Status: {overallStatus.toUpperCase()}
            </span>
          </div>
          <AlertDescription className="mt-2">
            <strong>Summary:</strong> {passed}/{total} tests passed • {failed} failed • {pending} pending
            <br />
            {overallStatus === 'pass' && "✅ All tests passed! Stripe Connect integration is working correctly."}
            {overallStatus === 'fail' && "❌ Some tests failed. Review failed tests and fix issues before production."}
            {overallStatus === 'pending' && "⏳ Some tests are still pending. Complete all tests for full verification."}
          </AlertDescription>
        </Alert>

        <div className="space-y-3">
          {testCategories.map((test) => (
            <div key={test.key} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(results[test.key])}
                <div>
                  <p className="font-medium">{test.name}</p>
                  <p className="text-sm text-muted-foreground">{test.description}</p>
                </div>
              </div>
              {getStatusBadge(results[test.key])}
            </div>
          ))}
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-semibold mb-2">Next Steps:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {failed > 0 && (
              <li>• Fix all failed tests before proceeding to production</li>
            )}
            {pending > 0 && (
              <li>• Complete all pending tests for full verification</li>
            )}
            {overallStatus === 'pass' && (
              <>
                <li>• ✅ Ready for production deployment</li>
                <li>• Set up production webhook endpoints in Stripe dashboard</li>
                <li>• Update STRIPE_CONNECT_CLIENT_ID to production value</li>
                <li>• Test with real Stripe accounts in production</li>
              </>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinalTestResults;
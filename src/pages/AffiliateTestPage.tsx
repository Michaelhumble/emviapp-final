import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import AffiliateConnectTest from '@/components/testing/AffiliateConnectTest';
import StripeWebhookTest from '@/components/testing/StripeWebhookTest';
import ComprehensiveTestResults from '@/components/testing/ComprehensiveTestResults';
import FullStripeConnectTest from '@/components/testing/FullStripeConnectTest';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

const AffiliateTestPage = () => {
  return (
    <>
      <Helmet>
        <title>Affiliate Connect Test Suite - EmviApp</title>
        <meta name="description" content="Test and verify Stripe Connect affiliate integration" />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4 py-8 space-y-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Affiliate Connect Test Suite</h1>
            <p className="text-muted-foreground mb-4">
              Comprehensive testing tool for the Stripe Connect affiliate integration
            </p>
            
            <Alert className="border-blue-200 bg-blue-50">
              <Shield className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Test Environment:</strong> This page is for testing and development purposes only. 
                All operations run against Stripe test mode.
              </AlertDescription>
            </Alert>
          </div>

          <FullStripeConnectTest />
          
          <ComprehensiveTestResults />
          
          <AffiliateConnectTest />
          
          <StripeWebhookTest />
        </div>
      </Layout>
    </>
  );
};

export default AffiliateTestPage;
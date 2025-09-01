import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';

const AffiliateTerms = () => {
  return (
    <>
      <Helmet>
        <title>Affiliate Program Terms - EmviApp</title>
        <meta name="description" content="Terms and conditions for the EmviApp Affiliate Program. Commission structure, payment terms, and program rules." />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Affiliate Program Terms & Conditions</h1>
          
          <Card>
            <CardContent className="p-8 prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-6">
                Last updated: January 2025
              </p>

              <h2>1. Program Overview</h2>
              <p>
                The EmviApp Affiliate Program allows approved partners to earn commissions by referring 
                customers to EmviApp services. By participating, you agree to these terms.
              </p>

              <h2>2. Commission Structure</h2>
              <ul>
                <li>30% commission on all paid subscriptions and services</li>
                <li>Recurring monthly commissions for subscription renewals</li>
                <li>90-day attribution window from initial click</li>
                <li>Last-touch attribution model</li>
              </ul>

              <h2>3. Payment Terms</h2>
              <ul>
                <li>$50 minimum payout threshold</li>
                <li>Monthly payments processed on the 15th</li>
                <li>Net-15 payment terms (paid 15 days after month end)</li>
                <li>Payments via Stripe Connect to connected bank accounts</li>
                <li>30-day hold period for fraud protection on new accounts</li>
              </ul>

              <h2>4. Prohibited Activities</h2>
              <ul>
                <li>Bidding on EmviApp trademark terms in paid search</li>
                <li>Self-referrals or fake accounts</li>
                <li>Spamming or unsolicited email marketing</li>
                <li>Misleading or false advertising claims</li>
                <li>Incentivizing users to cancel and re-signup</li>
              </ul>

              <h2>5. FTC Compliance</h2>
              <p>
                All affiliate relationships must be clearly disclosed according to FTC guidelines. 
                Use #ad, #affiliate, or #sponsored hashtags when promoting EmviApp content on social media.
              </p>

              <h2>6. Program Termination</h2>
              <p>
                EmviApp reserves the right to terminate affiliate accounts for violations of these terms, 
                fraudulent activity, or at our discretion. Outstanding commissions may be forfeited upon termination.
              </p>

              <h2>7. Changes to Terms</h2>
              <p>
                We may update these terms at any time. Continued participation constitutes acceptance of updated terms.
              </p>

              <h2>8. Contact</h2>
              <p>
                Questions about the affiliate program? Contact us at affiliates@emvi.app
              </p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default AffiliateTerms;
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Users, TrendingUp, Shield, Download, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AffiliatesLanding = () => {
  return (
    <>
      <Helmet>
        <title>EmviApp Affiliate Program - Earn 30% Commission</title>
        <meta name="description" content="Join 500+ creators earning money promoting beauty industry jobs. 30% recurring commissions, $50 minimum payout, 30-day attribution window." />
        <link rel="canonical" href="https://www.emvi.app/affiliates" />
        
        <meta property="og:title" content="EmviApp Affiliate Program - Earn 30% Commission" />
        <meta property="og:description" content="Join 500+ creators earning money promoting beauty industry jobs. 30% recurring commissions, $50 minimum payout." />
        <meta property="og:url" content="https://www.emvi.app/affiliates" />
        <meta property="og:image" content="https://www.emvi.app/affiliate-og-image.jpg" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EmviApp Affiliate Program - Earn 30% Commission" />
        <meta name="twitter:description" content="Join 500+ creators earning money promoting beauty industry jobs. 30% recurring commissions, $50 minimum payout." />
        <meta name="twitter:image" content="https://www.emvi.app/affiliate-og-image.jpg" />
      </Helmet>
      
      <Layout>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-6 px-4 py-2 text-sm font-medium">
              💰 Now Accepting New Affiliates
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Earn 30% Promoting EmviApp
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join 500+ creators earning money by promoting the beauty industry's fastest-growing job platform. 
              Help beauty professionals find their dream jobs while building your income.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild>
                <Link to="/affiliate">Join as Affiliate</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="#calculator">Calculate Earnings</Link>
              </Button>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">30%</div>
                <div className="text-sm text-muted-foreground">Commission Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">$50</div>
                <div className="text-sm text-muted-foreground">Minimum Payout</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">30</div>
                <div className="text-sm text-muted-foreground">Day Cookie Window</div>
              </div>
            </div>
          </div>
        </section>

        {/* Earnings Calculator */}
        <section id="calculator" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Calculate Your Potential Earnings</h2>
              <p className="text-muted-foreground mb-12">See how much you could earn promoting EmviApp</p>
              
              <Card className="p-8">
                <CardHeader>
                  <CardTitle>Earnings Calculator</CardTitle>
                  <CardDescription>Based on average conversion rates and revenue per customer</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Monthly Referrals</label>
                    <input 
                      type="range" 
                      min="1" 
                      max="100" 
                      defaultValue="10"
                      className="w-full"
                      onChange={(e) => {
                        const referrals = parseInt(e.target.value);
                        const avgRevenue = 29.99; // Average subscription price
                        const commissionRate = 0.30;
                        const monthlyEarnings = referrals * avgRevenue * commissionRate;
                        document.getElementById('earnings-result')!.textContent = `$${monthlyEarnings.toFixed(2)}`;
                        document.getElementById('referrals-count')!.textContent = referrals.toString();
                      }}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>1</span>
                      <span id="referrals-count">10</span>
                      <span>100</span>
                    </div>
                  </div>
                  
                  <div className="text-center py-8">
                    <div className="text-4xl font-bold text-primary mb-2" id="earnings-result">$89.97</div>
                    <div className="text-sm text-muted-foreground">Estimated Monthly Earnings</div>
                    <div className="text-xs text-muted-foreground mt-2">
                      * Based on $29.99 average revenue per user and 30% commission
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose EmviApp */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Promote EmviApp?</h2>
              <p className="text-muted-foreground">The beauty industry's most trusted job platform</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <TrendingUp className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Growing Market</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The beauty industry is booming with over 1.2M professionals seeking better opportunities daily.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <DollarSign className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>High Conversion</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Beauty professionals are actively looking for jobs, leading to higher conversion rates.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Recurring Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Earn 30% on initial subscriptions plus ongoing renewals for lifetime value.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Program Rules */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Program Rules & Benefits</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <Shield className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Commission Structure</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>30% commission on all sales</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Recurring monthly commissions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>$50 minimum payout threshold</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Monthly payouts on the 15th</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <Download className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Attribution & Tracking</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>30-day attribution window</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Last-touch attribution model</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Real-time analytics dashboard</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Comprehensive reporting tools</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How do payouts work?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Payouts are processed monthly on the 15th via Stripe Connect. You'll need to connect your bank account 
                      to receive payments. There's a $50 minimum payout threshold and a 30-day hold period for fraud protection.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What can I promote?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      You can promote any EmviApp service including job postings, subscriptions, and premium features. 
                      We provide marketing materials, banners, and assets to help you succeed.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How long do cookies last?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Attribution cookies last for 30 days. This means you'll get credit for any purchase made within 
                      30 days of someone clicking your affiliate link, even if they don't purchase immediately.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Do I need to be an existing user?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      While being familiar with EmviApp helps, you don't need to be an existing customer. However, 
                      we recommend signing up for a free account to better understand the platform you're promoting.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Earning?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of creators already earning with EmviApp
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/affiliate">Apply Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Questions? Contact Us</Link>
              </Button>
            </div>
            
            <div className="mt-12 text-sm opacity-75">
              <p>
                <strong>FTC Compliance:</strong> All affiliate relationships must be disclosed according to FTC guidelines. 
                Use #ad, #affiliate, or #sponsored when promoting EmviApp content.
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default AffiliatesLanding;
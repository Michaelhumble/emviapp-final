import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import {
  AffiliateHero,
  ValuePropsSection,
  EarningsCalculator,
  HowItWorksSection,
  SocialProofSection,
  FAQSection,
  FinalCTASection
} from '@/components/affiliates';

const AffiliatesLanding = () => {
  useEffect(() => {
    // Light GA4 event dispatch (guarded)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'affiliate_lp_view', {
        event_category: 'affiliate',
        page_title: 'Affiliates Landing Page'
      });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>EmviApp Affiliate Program — Earn Monthly Payouts Growing Beauty Community</title>
        <meta name="description" content="Join 500+ creators earning 30% recurring commissions promoting EmviApp. Transparent tracking, Stripe Connect payouts, 90-day attribution. Start earning today." />
        <link rel="canonical" href="https://www.emvi.app/affiliates" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* OpenGraph */}
        <meta property="og:title" content="EmviApp Affiliate Program — Earn Monthly Payouts" />
        <meta property="og:description" content="Join 500+ creators earning 30% recurring commissions promoting EmviApp. Transparent tracking, Stripe Connect payouts, 90-day attribution." />
        <meta property="og:url" content="https://www.emvi.app/affiliates" />
        <meta property="og:image" content="https://www.emvi.app/og-affiliate-program.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="EmviApp" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EmviApp Affiliate Program — Earn Monthly Payouts" />
        <meta name="twitter:description" content="Join 500+ creators earning 30% recurring commissions promoting EmviApp. Transparent tracking, Stripe Connect payouts, 90-day attribution." />
        <meta name="twitter:image" content="https://www.emvi.app/og-affiliate-program.jpg" />
        
        {/* Structured Data - Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "EmviApp Affiliate Program",
            "description": "Join 500+ creators earning 30% recurring commissions promoting EmviApp. Transparent tracking, Stripe Connect payouts, 90-day attribution.",
            "url": "https://www.emvi.app/affiliates",
            "mainEntity": {
              "@type": "Service",
              "name": "EmviApp Affiliate Program",
              "provider": {
                "@type": "Organization",
                "name": "EmviApp",
                "url": "https://www.emvi.app"
              },
              "description": "Earn 30% recurring commissions promoting the beauty industry's fastest-growing job platform",
              "offers": {
                "@type": "Offer",
                "name": "Affiliate Partnership",
                "description": "30% recurring commission, 90-day attribution, monthly Stripe Connect payouts"
              }
            }
          })}
        </script>
      </Helmet>
      
      <Layout>
        <AffiliateHero />
        <ValuePropsSection />
        <EarningsCalculator />
        <HowItWorksSection />
        <SocialProofSection />
        <FAQSection />
        <FinalCTASection />

        {/* How It Works */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground">Get started in 3 simple steps</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Apply</h3>
                <p className="text-muted-foreground">Submit your application and get approved within 24 hours</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Share</h3>
                <p className="text-muted-foreground">Create custom links and promote EmviApp to your audience</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Get Paid</h3>
                <p className="text-muted-foreground">Earn 30% recurring commissions paid monthly via Stripe</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose EmviApp */}
        <section className="py-20 bg-background">
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
                       <span>90-day attribution window</span>
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

        {/* Assets Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Marketing Assets</h2>
              <p className="text-muted-foreground">Professional banners, logos, and screenshots to boost your conversions</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-full h-32 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-primary font-semibold">Banner 1200x628</span>
                  </div>
                  <h3 className="font-semibold mb-2">Social Media Banners</h3>
                  <p className="text-sm text-muted-foreground mb-4">Optimized for Facebook, Twitter, and LinkedIn</p>
                  <Button variant="outline" size="sm" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-full h-32 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-secondary-foreground font-semibold">Logo Pack</span>
                  </div>
                  <h3 className="font-semibold mb-2">Brand Assets</h3>
                  <p className="text-sm text-muted-foreground mb-4">EmviApp logos in various formats and sizes</p>
                  <Button variant="outline" size="sm" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-full h-32 bg-gradient-to-r from-accent/20 to-accent/10 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-accent-foreground font-semibold">Screenshots</span>
                  </div>
                  <h3 className="font-semibold mb-2">Product Screenshots</h3>
                  <p className="text-sm text-muted-foreground mb-4">High-quality app screenshots and mockups</p>
                  <Button variant="outline" size="sm" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Program Rules */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Program Rules</h2>
              
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>30% recurring commission</strong> on all paid subscriptions and services
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>$50 minimum payout</strong> threshold with monthly payments on the 15th
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Net-15 payment terms</strong> - commissions paid 15 days after the end of each month
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>No brand-term PPC allowed</strong> - cannot bid on "EmviApp" or related trademarked terms
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>FTC disclosure required</strong> - must clearly identify affiliate relationships per FTC guidelines
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
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
                       Attribution cookies last for 90 days. This means you'll get credit for any purchase made within 
                       90 days of someone clicking your affiliate link, even if they don't purchase immediately.
                     </p>
                   </CardContent>
                 </Card>
                 
                 <Card>
                   <CardHeader>
                     <CardTitle className="text-lg">What countries are supported?</CardTitle>
                   </CardHeader>
                   <CardContent>
                     <p className="text-muted-foreground">
                       Our affiliate program is available worldwide. Payouts are processed via Stripe Connect, 
                       which supports most countries and currencies globally.
                     </p>
                   </CardContent>
                 </Card>
                 
                 <Card>
                   <CardHeader>
                     <CardTitle className="text-lg">How are taxes handled?</CardTitle>
                   </CardHeader>
                   <CardContent>
                     <p className="text-muted-foreground">
                       You're responsible for reporting affiliate earnings according to your local tax laws. 
                       We'll provide 1099s for US affiliates earning over $600 annually.
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
                <Link to="/affiliate">Open Creator Portal</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/affiliate/terms">View Terms</Link>
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
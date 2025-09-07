import React from 'react';
import Layout from '@/components/layout/Layout';
import BaseSEO from '@/components/seo/BaseSEO';
import { buildBreadcrumbJsonLd } from '@/components/seo/jsonld';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HowToGetMoreNailClients: React.FC = () => {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: 'https://www.emvi.app' },
    { name: 'Blog', url: 'https://www.emvi.app/blog' },
    { name: 'How to Get More Nail Clients', url: 'https://www.emvi.app/blog/how-to-get-more-nail-clients' }
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Get More Nail Clients: 15 Proven Marketing Strategies",
    "description": "Proven strategies to attract new nail clients and grow your business. Marketing tips, client retention tactics, and promotion ideas that work.",
    "author": {
      "@type": "Organization",
      "name": "EmviApp"
    },
    "publisher": {
      "@type": "Organization",
      "name": "EmviApp",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.emvi.app/logo.png"
      }
    },
    "datePublished": "2025-01-01",
    "dateModified": "2025-01-01",
    "image": "https://www.emvi.app/og-nail-clients.jpg",
    "url": "https://www.emvi.app/blog/how-to-get-more-nail-clients"
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Get More Nail Clients",
    "description": "Step-by-step guide to attracting new nail clients and growing your business",
    "image": "https://www.emvi.app/og-nail-clients.jpg",
    "totalTime": "PT30M",
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Social media accounts"
      },
      {
        "@type": "HowToSupply", 
        "name": "Professional portfolio"
      },
      {
        "@type": "HowToSupply",
        "name": "Business cards"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "name": "Optimize Your Social Media",
        "text": "Create professional Instagram and TikTok accounts showcasing your best work with consistent posting and engagement."
      },
      {
        "@type": "HowToStep",
        "name": "Offer New Client Promotions",
        "text": "Create attractive first-time client discounts and referral programs to encourage bookings."
      },
      {
        "@type": "HowToStep",
        "name": "Network in Your Community",
        "text": "Attend local events, partner with other businesses, and build relationships in your area."
      },
      {
        "@type": "HowToStep",
        "name": "Focus on Client Retention",
        "text": "Provide exceptional service and follow up with clients to encourage repeat bookings."
      }
    ]
  };

  return (
    <Layout>
      <BaseSEO
        title="How to Get More Nail Clients: 15 Proven Marketing Strategies | EmviApp"
        description="Proven strategies to attract new nail clients and grow your business. Marketing tips, client retention tactics, and promotion ideas that work."
        canonical="https://www.emvi.app/blog/how-to-get-more-nail-clients"
        ogImage="https://www.emvi.app/og-nail-clients.jpg"
        jsonLd={[breadcrumbJsonLd, articleJsonLd, howToJsonLd]}
        type="article"
      />

      <main className="w-full">
        <article>
          {/* Hero Section */}
          <section className="py-12 bg-gradient-to-br from-primary/5 to-secondary/5">
            <Container>
              <div className="max-w-4xl mx-auto">
                <Link to="/guides/nail-jobs-in-the-us" className="text-primary hover:underline text-sm mb-4 block">
                  ← Back to Complete Guide
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  How to Get More Nail Clients: 15 Proven Marketing Strategies
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Grow your nail business with these proven strategies for attracting new clients 
                  and keeping them coming back.
                </p>
                <div className="flex gap-4">
                  <Link to="/jobs?category=nails">
                    <Button>Find Nail Tech Jobs</Button>
                  </Link>
                  <Link to="/guides/nail-jobs-in-the-us">
                    <Button variant="outline">Complete Career Guide</Button>
                  </Link>
                </div>
              </div>
            </Container>
          </section>

          {/* Quick Overview */}
          <section className="py-8 bg-blue-50">
            <Container>
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-bold mb-4">Quick Action Plan</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">🎯 Focus Areas:</h3>
                      <ul className="text-sm space-y-1">
                        <li>• Social media marketing</li>
                        <li>• Word-of-mouth referrals</li>
                        <li>• Client retention strategies</li>
                        <li>• Local community partnerships</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">⏱️ Time Investment:</h3>
                      <ul className="text-sm space-y-1">
                        <li>• Daily: 30 min social media</li>
                        <li>• Weekly: 2 hours content creation</li>
                        <li>• Monthly: networking events</li>
                        <li>• Ongoing: excellent service</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* Strategy 1-5: Digital Marketing */}
          <section className="py-12 bg-white">
            <Container>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-8">Digital Marketing Strategies</h2>
                
                <div className="space-y-8">
                  <div className="border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-3">Master Instagram Marketing</h3>
                        <p className="text-gray-600 mb-4">
                          Instagram is your most powerful tool for attracting nail clients. Visual content performs exceptionally well in the beauty industry.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Content Strategy:</h4>
                            <ul className="text-sm space-y-1">
                              <li>• Post 1-2 times daily</li>
                              <li>• Use Stories for behind-the-scenes</li>
                              <li>• Share client transformations</li>
                              <li>• Create Reels with trending audio</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Hashtag Strategy:</h4>
                            <ul className="text-sm space-y-1">
                              <li>• #NailsOfInstagram #NailArt</li>
                              <li>• #YourCityNails #LocalSalon</li>
                              <li>• #GelNails #NailTech</li>
                              <li>• Mix popular & niche hashtags</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-3">Leverage TikTok for Younger Clients</h3>
                        <p className="text-gray-600 mb-4">
                          TikTok's algorithm can help you reach thousands of potential clients organically.
                        </p>
                        <div className="bg-gray-50 p-4 rounded">
                          <h4 className="font-medium mb-2">Content Ideas:</h4>
                          <ul className="text-sm space-y-1">
                            <li>• Time-lapse nail transformations</li>
                            <li>• "Get Ready With Me" videos</li>
                            <li>• Nail art tutorials</li>
                            <li>• Behind-the-scenes salon life</li>
                            <li>• Client reaction videos</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-3">Google My Business Optimization</h3>
                        <p className="text-gray-600 mb-4">
                          Local SEO is crucial for attracting nearby clients searching for nail services.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Profile Optimization:</h4>
                            <ul className="text-sm space-y-1">
                              <li>• Complete all profile fields</li>
                              <li>• Add high-quality photos</li>
                              <li>• List all services offered</li>
                              <li>• Keep hours updated</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Review Management:</h4>
                            <ul className="text-sm space-y-1">
                              <li>• Ask satisfied clients for reviews</li>
                              <li>• Respond to all reviews professionally</li>
                              <li>• Share positive reviews on social media</li>
                              <li>• Address negative feedback promptly</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-3">Email Marketing for Retention</h3>
                        <p className="text-gray-600 mb-4">
                          Build an email list to keep in touch with clients and promote special offers.
                        </p>
                        <div className="bg-gray-50 p-4 rounded">
                          <h4 className="font-medium mb-2">Email Campaign Ideas:</h4>
                          <ul className="text-sm space-y-1">
                            <li>• Monthly nail care tips newsletter</li>
                            <li>• Seasonal promotion announcements</li>
                            <li>• Appointment reminders</li>
                            <li>• New service introductions</li>
                            <li>• Birthday discounts</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">5</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-3">Professional Website & Online Booking</h3>
                        <p className="text-gray-600 mb-4">
                          Make it easy for clients to find and book with you online.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Website Essentials:</h4>
                            <ul className="text-sm space-y-1">
                              <li>• Mobile-responsive design</li>
                              <li>• Clear service menu with prices</li>
                              <li>• Photo gallery of your work</li>
                              <li>• Contact information</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Booking Features:</h4>
                            <ul className="text-sm space-y-1">
                              <li>• Online appointment scheduling</li>
                              <li>• Automated confirmations</li>
                              <li>• Payment processing</li>
                              <li>• Cancellation policies</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* Strategy 6-10: Offline Marketing */}
          <section className="py-12 bg-gray-50">
            <Container>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-8">Offline Marketing & Networking</h2>
                
                <div className="space-y-6">
                  <div className="bg-white border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-sm">6</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Referral Program</h3>
                        <p className="text-gray-600">
                          Reward existing clients for bringing new customers. Offer both the referrer and new client incentives.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-sm">7</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Partner with Local Businesses</h3>
                        <p className="text-gray-600">
                          Cross-promote with hair salons, spas, gyms, and bridal shops in your area.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-sm">8</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Attend Local Events</h3>
                        <p className="text-gray-600">
                          Set up booths at farmer's markets, bridal shows, and community events to showcase your work.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-sm">9</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Professional Business Cards</h3>
                        <p className="text-gray-600">
                          Always carry high-quality business cards with your best nail art photo and contact information.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-sm">10</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Mobile Nail Services</h3>
                        <p className="text-gray-600">
                          Offer mobile services for busy clients, office events, and special occasions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* Strategy 11-15: Client Experience */}
          <section className="py-12 bg-white">
            <Container>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-8">Client Experience & Retention</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">11</div>
                      <h3 className="text-lg font-semibold">Exceptional Customer Service</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Provide a memorable experience that clients want to share with friends.
                    </p>
                  </div>

                  <div className="border rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">12</div>
                      <h3 className="text-lg font-semibold">Loyalty Programs</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Reward repeat clients with punch cards, discounts, or free services.
                    </p>
                  </div>

                  <div className="border rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">13</div>
                      <h3 className="text-lg font-semibold">Follow-Up Communication</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Send thank you messages and nail care tips after appointments.
                    </p>
                  </div>

                  <div className="border rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">14</div>
                      <h3 className="text-lg font-semibold">Seasonal Promotions</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Create buzz with holiday specials and limited-time offers.
                    </p>
                  </div>

                  <div className="border rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">15</div>
                      <h3 className="text-lg font-semibold">Continuing Education</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Stay current with trends and techniques to offer the latest services.
                    </p>
                  </div>

                  <div className="border rounded-lg p-6 md:col-span-2">
                    <h3 className="text-lg font-semibold mb-3">🎯 Pro Tip: Track Your Results</h3>
                    <p className="text-gray-600 mb-3">
                      Monitor which strategies work best for your business:
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• Ask new clients how they found you</li>
                      <li>• Track social media engagement and bookings</li>
                      <li>• Monitor referral program success</li>
                      <li>• Calculate customer lifetime value</li>
                      <li>• Adjust strategies based on data</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* Implementation Timeline */}
          <section className="py-12 bg-blue-50">
            <Container>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">30-Day Implementation Plan</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-6">
                    <h3 className="font-semibold text-blue-700 mb-3">Week 1-2: Foundation</h3>
                    <ul className="text-sm space-y-2">
                      <li>✓ Optimize Google My Business</li>
                      <li>✓ Create professional social accounts</li>
                      <li>✓ Design referral program</li>
                      <li>✓ Order business cards</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6">
                    <h3 className="font-semibold text-blue-700 mb-3">Week 3-4: Content & Promotion</h3>
                    <ul className="text-sm space-y-2">
                      <li>✓ Start daily social media posting</li>
                      <li>✓ Launch referral program</li>
                      <li>✓ Contact local businesses for partnerships</li>
                      <li>✓ Set up email marketing</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6">
                    <h3 className="font-semibold text-blue-700 mb-3">Month 2+: Scale & Optimize</h3>
                    <ul className="text-sm space-y-2">
                      <li>✓ Analyze what's working</li>
                      <li>✓ Expand successful strategies</li>
                      <li>✓ Attend networking events</li>
                      <li>✓ Refine service offerings</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* CTA Section */}
          <section className="py-12 bg-primary text-white">
            <Container>
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Grow Your Nail Business?</h2>
                <p className="text-lg mb-8 opacity-90">
                  Start implementing these strategies today and watch your client base grow.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/jobs?category=nails">
                    <Button size="lg" variant="secondary">
                      Find Nail Tech Opportunities
                    </Button>
                  </Link>
                  <Link to="/guides/nail-jobs-in-the-us">
                    <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                      Complete Career Guide
                    </Button>
                  </Link>
                </div>
              </div>
            </Container>
          </section>
        </article>
      </main>
    </Layout>
  );
};

export default HowToGetMoreNailClients;
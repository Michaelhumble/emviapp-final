import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Users, TrendingUp, Calendar, BarChart3, Megaphone, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ForSalons: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: 'Staff Management',
      description: 'Easily manage your team, track performance, and handle scheduling all in one place.'
    },
    {
      icon: TrendingUp,
      title: 'Business Growth',
      description: 'AI-powered insights help you identify opportunities to grow your revenue and customer base.'
    },
    {
      icon: Calendar,
      title: 'Advanced Booking',
      description: 'Sophisticated booking system that handles multiple staff members, services, and time slots.'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Track key metrics like revenue, customer retention, and staff performance in real-time.'
    },
    {
      icon: Megaphone,
      title: 'Marketing Tools',
      description: 'Built-in marketing features to help you attract new customers and retain existing ones.'
    },
    {
      icon: Star,
      title: 'Reputation Management',
      description: 'Monitor and manage your online reputation with review tracking and response tools.'
    }
  ];

  const benefits = [
    'Increase booking efficiency by 40%',
    'Reduce no-shows with automated reminders',
    'Boost customer retention through personalized service',
    'Streamline staff scheduling and payroll',
    'Gain valuable insights with detailed analytics',
    'Improve online visibility and attract new clients'
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How can EmviApp help my salon grow?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "EmviApp provides AI-powered tools for customer acquisition, staff management, booking optimization, and business analytics to help salons increase revenue and efficiency."
        }
      },
      {
        "@type": "Question",
        "name": "What features does EmviApp offer for salon owners?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "EmviApp offers staff management, advanced booking systems, analytics dashboards, marketing tools, reputation management, and AI-powered business insights for salon owners."
        }
      },
      {
        "@type": "Question",
        "name": "Can EmviApp handle multiple staff members and services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, EmviApp's booking system is designed to handle multiple staff members, various services, complex scheduling, and team management for salons of all sizes."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>For Salons - Grow Your Beauty Business with AI | EmviApp</title>
        <meta name="description" content="Empower your salon with EmviApp's AI tools. Manage staff, boost bookings, track analytics, and grow your beauty business. Join successful salon owners nationwide." />
        <meta name="keywords" content="salon management software, beauty business tools, salon booking system, staff management, salon analytics, beauty marketing" />
        <link rel="canonical" href="https://www.emvi.app/for-salons" />
        
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Grow Your Salon with AI-Powered Tools
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join thousands of successful salon owners who use EmviApp to manage staff, boost bookings, and grow their beauty business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/salons">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Everything Your Salon Needs to Succeed
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="p-6 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
                  <feature.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3 text-card-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
                Proven Results for Salon Owners
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-card rounded-lg border">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span className="text-card-foreground font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Simple, Transparent Pricing
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="p-6 border rounded-lg bg-card">
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">Starter</h3>
                <div className="text-3xl font-bold mb-4 text-primary">$29<span className="text-base font-normal text-muted-foreground">/month</span></div>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li>• Up to 3 staff members</li>
                  <li>• Basic booking system</li>
                  <li>• Customer management</li>
                  <li>• Email support</li>
                </ul>
                <Button className="w-full" variant="outline">Get Started</Button>
              </div>
              <div className="p-6 border-2 border-primary rounded-lg bg-card relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">Most Popular</div>
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">Professional</h3>
                <div className="text-3xl font-bold mb-4 text-primary">$79<span className="text-base font-normal text-muted-foreground">/month</span></div>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li>• Up to 10 staff members</li>
                  <li>• Advanced booking & scheduling</li>
                  <li>• Analytics dashboard</li>
                  <li>• Marketing tools</li>
                  <li>• Priority support</li>
                </ul>
                <Button className="w-full">Get Started</Button>
              </div>
              <div className="p-6 border rounded-lg bg-card">
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">Enterprise</h3>
                <div className="text-3xl font-bold mb-4 text-primary">$149<span className="text-base font-normal text-muted-foreground">/month</span></div>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li>• Unlimited staff members</li>
                  <li>• Multi-location support</li>
                  <li>• Advanced analytics</li>
                  <li>• Custom integrations</li>
                  <li>• Dedicated support</li>
                </ul>
                <Button className="w-full" variant="outline">Contact Sales</Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">How can EmviApp help my salon grow?</h3>
                <p className="text-muted-foreground">EmviApp provides AI-powered tools for customer acquisition, staff management, booking optimization, and business analytics to help salons increase revenue and efficiency.</p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">What features does EmviApp offer for salon owners?</h3>
                <p className="text-muted-foreground">EmviApp offers staff management, advanced booking systems, analytics dashboards, marketing tools, reputation management, and AI-powered business insights for salon owners.</p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">Can EmviApp handle multiple staff members and services?</h3>
                <p className="text-muted-foreground">Yes, EmviApp's booking system is designed to handle multiple staff members, various services, complex scheduling, and team management for salons of all sizes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Salon?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of successful salon owners who chose EmviApp to grow their business.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-primary">
                  Schedule Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ForSalons;
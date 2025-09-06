import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calendar, DollarSign, Users, Smartphone, Camera, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ForArtists: React.FC = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Smart Booking',
      description: 'Manage your appointments with an intelligent booking system that works around your schedule.'
    },
    {
      icon: DollarSign,
      title: 'Maximize Earnings',
      description: 'AI-powered pricing recommendations and client management to boost your income.'
    },
    {
      icon: Users,
      title: 'Client Management',
      description: 'Keep track of client preferences, history, and build lasting relationships.'
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Run your entire business from your phone with our mobile-optimized platform.'
    },
    {
      icon: Camera,
      title: 'Portfolio Showcase',
      description: 'Display your best work with a professional portfolio that attracts new clients.'
    },
    {
      icon: Star,
      title: 'Build Reputation',
      description: 'Collect reviews and build your professional reputation in the beauty community.'
    }
  ];

  const artistTypes = [
    { name: 'Nail Technicians', description: 'Specialize in manicures, pedicures, and nail art' },
    { name: 'Hair Stylists', description: 'Cuts, color, styling, and hair treatments' },
    { name: 'Barbers', description: 'Men\'s grooming, cuts, and traditional barbering' },
    { name: 'Estheticians', description: 'Skincare treatments, facials, and beauty therapy' },
    { name: 'Makeup Artists', description: 'Event makeup, bridal, and beauty applications' },
    { name: 'Lash & Brow Artists', description: 'Extensions, lifts, and brow shaping services' }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How can EmviApp help me grow my beauty business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "EmviApp provides AI-powered tools for client management, booking optimization, portfolio showcasing, and reputation building to help beauty professionals increase their earnings and client base."
        }
      },
      {
        "@type": "Question",
        "name": "Is EmviApp suitable for independent beauty professionals?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, EmviApp is perfect for independent beauty professionals including nail technicians, hair stylists, barbers, estheticians, and makeup artists who want to manage their own client base."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use EmviApp on my mobile device?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! EmviApp is mobile-first, allowing you to manage your entire beauty business from your smartphone, including bookings, client communications, and payments."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>For Artists - Grow Your Beauty Career with AI Tools | EmviApp</title>
        <meta name="description" content="Empower your beauty career with EmviApp's AI tools. Manage clients, showcase your portfolio, boost bookings, and maximize earnings as an independent beauty professional." />
        <meta name="keywords" content="beauty artist tools, independent beauty professional, nail technician app, hair stylist tools, barber app, makeup artist platform" />
        <link rel="canonical" href="https://www.emvi.app/for-artists" />
        
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Your Beauty Career, Powered by AI
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join thousands of independent beauty professionals who use EmviApp to manage clients, showcase their work, and grow their business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                  Start Free Profile
                </Button>
              </Link>
              <Link to="/artists">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                  See Artist Profiles
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Artist Types */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Perfect for Every Beauty Professional
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artistTypes.map((type) => (
                <div key={type.name} className="p-6 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
                  <h3 className="font-semibold text-lg mb-2 text-card-foreground">{type.name}</h3>
                  <p className="text-muted-foreground text-sm">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Everything You Need to Succeed
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

        {/* Success Stories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Real Success Stories
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="p-6 border rounded-lg bg-card">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary font-bold">MR</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">Maria Rodriguez</h3>
                    <p className="text-sm text-muted-foreground">Nail Technician</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"EmviApp helped me triple my client base in just 6 months. The booking system is amazing!"</p>
              </div>
              <div className="p-6 border rounded-lg bg-card">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary font-bold">JS</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">James Smith</h3>
                    <p className="text-sm text-muted-foreground">Barber</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"The portfolio feature showcases my work perfectly. I get more bookings than ever before."</p>
              </div>
              <div className="p-6 border rounded-lg bg-card">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary font-bold">AL</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">Ashley Lee</h3>
                    <p className="text-sm text-muted-foreground">Hair Stylist</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"Managing my schedule has never been easier. The mobile app lets me run my business anywhere."</p>
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
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">How can EmviApp help me grow my beauty business?</h3>
                <p className="text-muted-foreground">EmviApp provides AI-powered tools for client management, booking optimization, portfolio showcasing, and reputation building to help beauty professionals increase their earnings and client base.</p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">Is EmviApp suitable for independent beauty professionals?</h3>
                <p className="text-muted-foreground">Yes, EmviApp is perfect for independent beauty professionals including nail technicians, hair stylists, barbers, estheticians, and makeup artists who want to manage their own client base.</p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">Can I use EmviApp on my mobile device?</h3>
                <p className="text-muted-foreground">Absolutely! EmviApp is mobile-first, allowing you to manage your entire beauty business from your smartphone, including bookings, client communications, and payments.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Beauty Career?</h2>
            <p className="text-xl mb-8 opacity-90">Join the community of successful beauty professionals who chose EmviApp to grow their business.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
                  Create Your Profile
                </Button>
              </Link>
              <Link to="/beauty-jobs">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-primary">
                  Browse Opportunities
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ForArtists;
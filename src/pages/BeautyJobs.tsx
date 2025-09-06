import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BeautyJobs: React.FC = () => {
  const cities = [
    { name: 'New York', state: 'NY', jobs: 2847 },
    { name: 'Los Angeles', state: 'CA', jobs: 2156 },
    { name: 'Chicago', state: 'IL', jobs: 1324 },
    { name: 'Houston', state: 'TX', jobs: 987 },
    { name: 'Phoenix', state: 'AZ', jobs: 756 },
    { name: 'Philadelphia', state: 'PA', jobs: 654 },
    { name: 'San Antonio', state: 'TX', jobs: 543 },
    { name: 'San Diego', state: 'CA', jobs: 432 }
  ];

  const categories = [
    { name: 'Nail Technician', count: 3456, icon: '💅' },
    { name: 'Hair Stylist', count: 2987, icon: '✂️' },
    { name: 'Barber', count: 1876, icon: '🪒' },
    { name: 'Esthetician', count: 1543, icon: '✨' },
    { name: 'Makeup Artist', count: 987, icon: '💄' },
    { name: 'Massage Therapist', count: 756, icon: '💆' }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I find beauty jobs near me?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use EmviApp's location filter to find beauty jobs in your city. We have thousands of opportunities for nail technicians, hair stylists, barbers, and more across all major US cities."
        }
      },
      {
        "@type": "Question", 
        "name": "What types of beauty jobs are available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "EmviApp features nail technician positions, hair stylist roles, barber opportunities, esthetician jobs, makeup artist gigs, massage therapy positions, and specialized beauty roles."
        }
      },
      {
        "@type": "Question",
        "name": "How much do beauty professionals earn?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Beauty professional salaries vary by role and location. Nail technicians earn $25K-$60K+, hair stylists $30K-$80K+, and barbers $28K-$65K+ annually, with top performers earning significantly more."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Beauty Jobs - Find Nail, Hair & Salon Opportunities | EmviApp</title>
        <meta name="description" content="Discover thousands of beauty jobs including nail technician, hair stylist, barber, and esthetician positions. Find your perfect beauty career opportunity with EmviApp." />
        <meta name="keywords" content="beauty jobs, nail technician jobs, hair stylist jobs, barber jobs, esthetician jobs, makeup artist jobs, salon careers" />
        <link rel="canonical" href="https://www.emvi.app/beauty-jobs" />
        
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Find Your Dream Beauty Job
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover thousands of opportunities for nail technicians, hair stylists, barbers, and beauty professionals nationwide.
            </p>
            <Link to="/jobs">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                Browse All Jobs
              </Button>
            </Link>
          </div>
        </section>

        {/* Job Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Popular Beauty Career Paths
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Link 
                  key={category.name}
                  to={`/jobs?category=${category.name.toLowerCase().replace(' ', '-')}`}
                  className="block p-6 border rounded-lg hover:shadow-lg transition-shadow bg-card hover:bg-accent/50"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{category.icon}</span>
                    <div>
                      <h3 className="font-semibold text-lg text-card-foreground">{category.name}</h3>
                      <p className="text-muted-foreground">{category.count.toLocaleString()} jobs available</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* City Facets */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Beauty Jobs by City
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {cities.map((city) => (
                <Link 
                  key={`${city.name}-${city.state}`}
                  to={`/jobs/in/${city.name.toLowerCase()}-${city.state.toLowerCase()}`}
                  className="block p-4 border rounded-lg hover:shadow-lg transition-shadow bg-card hover:bg-accent/50"
                >
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-primary w-5 h-5" />
                    <div>
                      <h3 className="font-semibold text-card-foreground">{city.name}, {city.state}</h3>
                      <p className="text-sm text-muted-foreground">{city.jobs} jobs</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Why Choose EmviApp for Beauty Jobs?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <Briefcase className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">Verified Opportunities</h3>
                <p className="text-muted-foreground">Every job is verified by our team to ensure quality and legitimacy.</p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">Top Salons</h3>
                <p className="text-muted-foreground">Connect with leading salons and beauty businesses nationwide.</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">Career Growth</h3>
                <p className="text-muted-foreground">Find opportunities that match your skills and career goals.</p>
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
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">How do I find beauty jobs near me?</h3>
                <p className="text-muted-foreground">Use EmviApp's location filter to find beauty jobs in your city. We have thousands of opportunities for nail technicians, hair stylists, barbers, and more across all major US cities.</p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">What types of beauty jobs are available?</h3>
                <p className="text-muted-foreground">EmviApp features nail technician positions, hair stylist roles, barber opportunities, esthetician jobs, makeup artist gigs, massage therapy positions, and specialized beauty roles.</p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">How much do beauty professionals earn?</h3>
                <p className="text-muted-foreground">Beauty professional salaries vary by role and location. Nail technicians earn $25K-$60K+, hair stylists $30K-$80K+, and barbers $28K-$65K+ annually, with top performers earning significantly more.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Beauty Career?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of beauty professionals who found their dream job with EmviApp.</p>
            <Link to="/jobs">
              <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
                Browse Jobs Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default BeautyJobs;
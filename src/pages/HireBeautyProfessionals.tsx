import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, Users, Clock, Trophy, Shield, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HireBeautyProfessionals: React.FC = () => {
  const professionalTypes = [
    { name: 'Nail Technicians', description: 'Certified professionals for manicures, pedicures, and nail art', count: '5,000+' },
    { name: 'Hair Stylists', description: 'Experienced stylists for cuts, color, and styling services', count: '4,200+' },
    { name: 'Barbers', description: 'Skilled barbers specializing in men\'s cuts and grooming', count: '2,800+' },
    { name: 'Estheticians', description: 'Licensed skincare specialists and facial treatment experts', count: '2,100+' },
    { name: 'Makeup Artists', description: 'Professional makeup artists for events and everyday looks', count: '1,500+' },
    { name: 'Massage Therapists', description: 'Licensed therapists for relaxation and therapeutic treatments', count: '1,200+' }
  ];

  const benefits = [
    {
      icon: Search,
      title: 'Advanced Matching',
      description: 'AI-powered matching connects you with professionals who fit your specific needs and style.'
    },
    {
      icon: Shield,
      title: 'Verified Professionals',
      description: 'All professionals are background-checked and have verified credentials and licenses.'
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Book appointments that work with your schedule, including evenings and weekends.'
    },
    {
      icon: Trophy,
      title: 'Top Talent',
      description: 'Access to the best beauty professionals in your area with proven track records.'
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I hire beauty professionals through EmviApp?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply browse our verified professionals, view their profiles and portfolios, then book directly through our platform. You can filter by location, services, availability, and ratings."
        }
      },
      {
        "@type": "Question",
        "name": "Are all beauty professionals on EmviApp licensed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all professionals on EmviApp are required to have valid licenses and certifications for their services. We verify credentials before approving profiles."
        }
      },
      {
        "@type": "Question",
        "name": "What services can I book through EmviApp?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can book nail services, hair cuts and styling, barbering, facials and skincare, makeup application, massage therapy, and many other beauty and wellness services."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Hire Beauty Professionals - Find Licensed Stylists & Artists | EmviApp</title>
        <meta name="description" content="Hire verified beauty professionals including nail technicians, hair stylists, barbers, estheticians, and makeup artists. Book trusted experts in your area with EmviApp." />
        <meta name="keywords" content="hire beauty professionals, book beauty services, nail technicians, hair stylists, barbers, estheticians, makeup artists" />
        <link rel="canonical" href="https://emvi.app/hire-beauty-professionals" />
        
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Hire Trusted Beauty Professionals
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Connect with licensed, verified beauty experts in your area. From nail technicians to hair stylists, find the perfect professional for your needs.
            </p>
            <Link to="/artists">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                Browse Professionals
              </Button>
            </Link>
          </div>
        </section>

        {/* Professional Types */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Find the Right Professional for You
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {professionalTypes.map((type) => (
                <div key={type.name} className="p-6 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg text-card-foreground">{type.name}</h3>
                    <span className="text-sm text-primary font-medium">{type.count}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Why Choose EmviApp?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="text-center">
                  <benefit.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Browse & Filter</h3>
                <p className="text-muted-foreground">Search professionals by location, service, availability, and ratings to find your perfect match.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">View Profiles</h3>
                <p className="text-muted-foreground">Check portfolios, read reviews, and view credentials to make an informed decision.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Book & Enjoy</h3>
                <p className="text-muted-foreground">Schedule your appointment online and enjoy professional beauty services at your convenience.</p>
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
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">How do I hire beauty professionals through EmviApp?</h3>
                <p className="text-muted-foreground">Simply browse our verified professionals, view their profiles and portfolios, then book directly through our platform. You can filter by location, services, availability, and ratings.</p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">Are all beauty professionals on EmviApp licensed?</h3>
                <p className="text-muted-foreground">Yes, all professionals on EmviApp are required to have valid licenses and certifications for their services. We verify credentials before approving profiles.</p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">What services can I book through EmviApp?</h3>
                <p className="text-muted-foreground">You can book nail services, hair cuts and styling, barbering, facials and skincare, makeup application, massage therapy, and many other beauty and wellness services.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Book Your Next Beauty Service?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of satisfied customers who trust EmviApp for their beauty needs.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/artists">
                <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
                  Find Professionals
                </Button>
              </Link>
              <Link to="/beauty-jobs">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-primary">
                  Looking to Hire?
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default HireBeautyProfessionals;
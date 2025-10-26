import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Briefcase, 
  Store, 
  Sparkles, 
  TrendingUp, 
  Users, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function ProductPage() {
  const features = [
    {
      icon: Briefcase,
      title: 'Jobs System',
      description: 'Post beauty jobs in seconds. Reach thousands of qualified nail technicians, hair stylists, and beauty professionals actively searching for opportunities.'
    },
    {
      icon: Store,
      title: 'Salon Tools',
      description: 'Manage your salon listings, showcase your services, and attract clients. Built for independent salons and multi-location beauty businesses.'
    },
    {
      icon: Sparkles,
      title: 'AI Agents',
      description: 'Smart automation that writes compelling job posts, optimizes listings for search, and suggests perfect candidate matches based on your needs.'
    },
    {
      icon: TrendingUp,
      title: 'Marketing Automation',
      description: 'Auto-promote your listings across social channels. Get intelligent insights on what works and reach more candidates without extra effort.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Join 10,000+ beauty professionals. Share success stories, get hiring advice, and connect with the Vietnamese beauty community nationwide.'
    }
  ];

  const faqs = [
    {
      q: 'How much does EmviApp cost?',
      a: 'EmviApp is free to browse and create a profile. Job postings start at $49 for 30 days of premium visibility. Salon listings are $99/month with unlimited updates.'
    },
    {
      q: 'Who uses EmviApp?',
      a: 'Nail salon owners, spa managers, independent beauty professionals, hair stylists, and anyone hiring in the beauty industry. Our community is strongest among Vietnamese-American salon owners.'
    },
    {
      q: 'How is EmviApp different from Indeed or Craigslist?',
      a: 'EmviApp specializes exclusively in beauty jobs. We understand nail salon culture, licensing requirements, and booth rental dynamics. Plus, our AI helps you write better job posts.'
    },
    {
      q: 'Can I post jobs in Vietnamese?',
      a: 'Yes! EmviApp fully supports bilingual job posts in English and Vietnamese. Many of our top-performing listings use both languages.'
    },
    {
      q: 'Do you offer a salary calculator?',
      a: 'Yes. Our free salary calculator helps you estimate realistic compensation based on role, city, tips, and commission structure.'
    },
    {
      q: 'How long does it take to post a job?',
      a: 'Less than 3 minutes. Our AI-powered wizard asks simple questions and writes the job description for you. No marketing experience needed.'
    }
  ];

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "EmviApp",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "url": "https://www.emvi.app",
    "publisher": {
      "@type": "Organization",
      "name": "EmviApp"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "ratingCount": 42
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "The leading platform for beauty industry hiring and salon management. Post jobs, find talent, and grow your beauty business with AI-powered tools.",
    "screenshot": "https://www.emvi.app/og/emvi-og-product.png"
  };

  return (
    <>
      <Helmet>
        <title>Product | EmviApp - Beauty Industry Hiring & Salon Management Platform</title>
        <meta name="description" content="EmviApp is the leading platform for beauty professionals. Post jobs, find talent, manage salons, and grow your beauty business with AI-powered tools trusted by 10,000+ professionals." />
        <link rel="canonical" href="https://www.emvi.app/product" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="EmviApp - Beauty Industry Hiring Platform" />
        <meta property="og:description" content="The platform trusted by 10,000+ beauty professionals to post jobs, find talent, and grow their businesses." />
        <meta property="og:image" content="https://www.emvi.app/og/emvi-og-product.png" />
        <meta property="og:url" content="https://www.emvi.app/product" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EmviApp - Beauty Industry Hiring Platform" />
        <meta name="twitter:description" content="Post jobs, find talent, and grow your beauty business with AI-powered tools." />
        <meta name="twitter:image" content="https://www.emvi.app/og/emvi-og-product.png" />
        
        <script type="application/ld+json">
          {JSON.stringify(softwareAppSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-[#FDFDFD]">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 max-w-5xl text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 mb-8">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
            The Beauty Industry's<br />Hiring & Growth Platform
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            EmviApp helps beauty professionals find jobs, salon owners hire faster, and businesses grow smarter. Trusted by 10,000+ nail techs, stylists, and spa owners.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/signup">Try EmviApp Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link to="/jobs">Browse Jobs</Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            ✨ No credit card required • ⚡ Post your first job in 3 minutes
          </p>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need to Grow Your Beauty Business
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Social Proof */}
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-8 flex-wrap">
                <div>
                  <div className="text-4xl font-bold text-primary">10,000+</div>
                  <div className="text-sm text-muted-foreground">Active Professionals</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary">5,000+</div>
                  <div className="text-sm text-muted-foreground">Jobs Posted</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Salons Listed</div>
                </div>
              </div>
              <p className="text-lg text-muted-foreground">
                "EmviApp helped me fill 3 nail tech positions in one week. The Vietnamese community feature made all the difference."
              </p>
              <p className="text-sm font-medium">
                — Linh N., Salon Owner, Orange County, CA
              </p>
            </div>
          </Card>
        </section>

        {/* FAQs */}
        <section className="container mx-auto px-4 py-16 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20 max-w-4xl">
          <Card className="p-12 text-center bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Beauty Business?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of beauty professionals who trust EmviApp for hiring and growth.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                <Link to="/signup">
                  Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-white/10 border-white/20 hover:bg-white/20">
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </>
  );
}

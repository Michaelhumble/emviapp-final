import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, DollarSign, Star, TrendingUp } from 'lucide-react';
import BaseSEO from '@/components/seo/BaseSEO';

const guides = [
  {
    title: 'Nail Salon Hiring: The Complete 2025 Playbook',
    description: 'Master every step of hiring nail technicians—from crafting job posts to onboarding top talent. The definitive guide for salon owners.',
    href: '/guides/nail-salon-hiring-playbook-2025',
    icon: BookOpen,
    category: 'Pillar Guide',
    readTime: '25 min read',
    featured: true
  },
  {
    title: 'How to Write a Nail Technician Job Post',
    description: 'Learn what converts browsers into applicants with 10 real job post examples from top-performing salons.',
    href: '/guides/nail-tech-job-post-examples',
    icon: Users,
    category: 'Job Posting',
    readTime: '12 min read'
  },
  {
    title: 'Interview Questions for Salon Managers',
    description: 'Essential interview questions to identify skilled, reliable salon managers who will elevate your business.',
    href: '/guides/salon-manager-interview-questions',
    icon: Users,
    category: 'Hiring',
    readTime: '10 min read'
  },
  {
    title: 'Nail Tech Salary & Commission Guide',
    description: 'City-by-city breakdown of competitive wages, commission structures, and total compensation packages.',
    href: '/guides/nail-tech-salary-commission-guide',
    icon: DollarSign,
    category: 'Compensation',
    readTime: '15 min read'
  },
  {
    title: 'Boost Reviews: Scripts & Templates',
    description: 'Proven scripts and text templates that get clients to leave 5-star reviews without sounding pushy.',
    href: '/guides/boost-salon-reviews-scripts',
    icon: Star,
    category: 'Marketing',
    readTime: '8 min read'
  }
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  'name': 'Salon Hiring & Management Guides',
  'description': 'Expert guides for nail salon owners covering hiring, compensation, management, and growth strategies.',
  'url': 'https://www.emvi.app/guides',
  'publisher': {
    '@type': 'Organization',
    'name': 'EmviApp',
    'url': 'https://www.emvi.app'
  },
  'hasPart': guides.map(guide => ({
    '@type': 'Article',
    'headline': guide.title,
    'description': guide.description,
    'url': `https://www.emvi.app${guide.href}`
  }))
};

export default function GuidesIndex() {
  const featuredGuide = guides.find(g => g.featured);
  const supportingGuides = guides.filter(g => !g.featured);

  return (
    <Layout>
      <Helmet>
        <title>Salon Hiring & Management Guides | EmviApp</title>
        <meta name="description" content="Expert guides for nail salon owners: hiring strategies, compensation guides, interview templates, and proven tactics to build exceptional teams." />
        <link rel="canonical" href="https://www.emvi.app/guides" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Salon Hiring & Management Guides | EmviApp" />
        <meta property="og:description" content="Expert guides for nail salon owners covering hiring, compensation, and team management." />
      </Helmet>
      <BaseSEO jsonLd={[jsonLd]} />

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-primary/5 to-transparent">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Salon Hiring & Management Guides
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Expert strategies for hiring, managing, and growing your nail salon team. 
              Written by industry veterans who've built successful multi-location businesses.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild size="lg">
                <Link to="/post-job">Post a Job</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/jobs">Browse Candidates</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Guide */}
      {featuredGuide && (
        <section className="py-12">
          <Container>
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                <TrendingUp className="h-4 w-4" />
                Featured Guide
              </span>
            </div>
            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <featuredGuide.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {featuredGuide.category}
                      </span>
                      <span className="text-sm text-muted-foreground">{featuredGuide.readTime}</span>
                    </div>
                    <CardTitle className="text-2xl mb-2">
                      <Link to={featuredGuide.href} className="hover:text-primary transition-colors">
                        {featuredGuide.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-base">
                      {featuredGuide.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link to={featuredGuide.href}>Read the Complete Playbook</Link>
                </Button>
              </CardContent>
            </Card>
          </Container>
        </section>
      )}

      {/* Supporting Guides Grid */}
      <section className="py-12">
        <Container>
          <h2 className="text-3xl font-bold mb-8">Essential Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportingGuides.map((guide) => (
              <Card key={guide.href} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <guide.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted">
                          {guide.category}
                        </span>
                        <span className="text-xs text-muted-foreground">{guide.readTime}</span>
                      </div>
                      <CardTitle className="text-xl mb-2">
                        <Link to={guide.href} className="hover:text-primary transition-colors">
                          {guide.title}
                        </Link>
                      </CardTitle>
                      <CardDescription>
                        {guide.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="w-full">
                    <Link to={guide.href}>Read Guide →</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-t from-primary/5 to-transparent">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your Dream Team?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Put these strategies into action. Post your job and start receiving applications 
              from qualified nail technicians in your area.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild size="lg">
                <Link to="/post-job">Post Your First Job</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/jobs">View Active Jobs</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}

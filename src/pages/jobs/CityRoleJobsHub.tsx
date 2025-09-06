import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import BaseSEO from '@/components/seo/BaseSEO';
import { buildBreadcrumbJsonLd, buildFAQJsonLd } from '@/components/seo/jsonld';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, Users, TrendingUp } from 'lucide-react';
import { TARGET_CITIES, BEAUTY_ROLES, generateRoleIntro, generateRoleFAQs } from '@/data/citiesRolesSeed';

const CityRoleJobsHub: React.FC = () => {
  const { citySlug, roleSlug } = useParams<{ citySlug: string; roleSlug: string }>();
  
  const city = useMemo(() => 
    TARGET_CITIES.find(c => c.slug === citySlug), [citySlug]
  );
  
  const role = useMemo(() => 
    BEAUTY_ROLES.find(r => r.slug === roleSlug), [roleSlug]
  );

  // 404 if invalid city/role combination
  if (!city || !role) {
    return (
      <Layout>
        <Container className="py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
            <p className="text-muted-foreground mb-6">The requested job hub page could not be found.</p>
            <Link to="/jobs">
              <Button>Browse All Jobs</Button>
            </Link>
          </div>
        </Container>
      </Layout>
    );
  }

  const pageTitle = `${role.name} Jobs in ${city.name}, ${city.state} | EmviApp`;
  const pageDescription = generateRoleIntro(role, city).substring(0, 160);
  const canonical = `/jobs/${citySlug}/${roleSlug}`;
  
  const faqs = generateRoleFAQs(role, city);
  
  const breadcrumbData = [
    { name: "Jobs", url: "https://www.emvi.app/jobs" },
    { name: city.name, url: `https://www.emvi.app/jobs/${citySlug}` },
    { name: role.name, url: `https://www.emvi.app/jobs/${citySlug}/${roleSlug}` }
  ];

  // Market insights based on city data
  const marketInsights = {
    demandLevel: city.population > 1000000 ? 'High' : city.population > 500000 ? 'Moderate' : 'Growing',
    competitionLevel: city.averageIncome > 60000 ? 'Competitive' : 'Moderate',
    growthTrend: 'Positive'
  };

  return (
    <Layout>
      <BaseSEO
        title={pageTitle}
        description={pageDescription}
        canonical={canonical}
        jsonLd={[
          buildBreadcrumbJsonLd(breadcrumbData),
          buildFAQJsonLd(faqs)
        ]}
        type="website"
      />

      <main className="py-12">
        <Container>
          {/* Header Section */}
          <header className="mb-12">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link to="/jobs" className="hover:text-primary">Jobs</Link>
              <span>/</span>
              <Link to={`/jobs/${citySlug}`} className="hover:text-primary">{city.name}</Link>
              <span>/</span>
              <span className="text-primary">{role.name}</span>
            </nav>
            
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{role.category}</Badge>
              <Badge variant="outline">
                <MapPin className="w-3 h-3 mr-1" />
                {city.name}, {city.state}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {role.name} Jobs in {city.name}
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-4xl">
              {generateRoleIntro(role, city)}
            </p>
          </header>

          {/* Market Overview */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="font-semibold">Market Demand</span>
                </div>
                <p className="text-2xl font-bold">{marketInsights.demandLevel}</p>
                <p className="text-sm text-muted-foreground">Strong opportunities available</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Population</span>
                </div>
                <p className="text-2xl font-bold">{(city.population / 1000000).toFixed(1)}M</p>
                <p className="text-sm text-muted-foreground">Large client base</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold">Average Income</span>
                </div>
                <p className="text-2xl font-bold">${(city.averageIncome / 1000).toFixed(0)}K</p>
                <p className="text-sm text-muted-foreground">Market spending power</p>
              </CardContent>
            </Card>
          </section>

          {/* Job Opportunities Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Current {role.name} Opportunities</h2>
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-semibold mb-4">
                Find {role.name} Jobs in {city.name}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Browse active job listings, connect with local salons, and discover opportunities 
                that match your skills and career goals in {city.name}'s beauty industry.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={`/jobs?location=${citySlug}&category=${role.category}`}>
                  <Button size="lg" className="w-full sm:w-auto">
                    View Available Jobs
                  </Button>
                </Link>
                <Link to="/jobs">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Browse All Cities
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Related Opportunities */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Explore Related Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Other Beauty Roles in {city.name}</h3>
                  <div className="space-y-2">
                    {BEAUTY_ROLES.filter(r => r.slug !== roleSlug).slice(0, 4).map((otherRole) => (
                      <Link 
                        key={otherRole.slug}
                        to={`/jobs/${citySlug}/${otherRole.slug}`}
                        className="block px-3 py-2 rounded-md hover:bg-accent/50 transition-colors"
                      >
                        {otherRole.name} Jobs →
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{role.name} Jobs in Other Cities</h3>
                  <div className="space-y-2">
                    {TARGET_CITIES.filter(c => c.slug !== citySlug).slice(0, 4).map((otherCity) => (
                      <Link 
                        key={otherCity.slug}
                        to={`/jobs/${otherCity.slug}/${roleSlug}`}
                        className="block px-3 py-2 rounded-md hover:bg-accent/50 transition-colors"
                      >
                        {otherCity.name}, {otherCity.state} →
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-12 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your {role.name} Career in {city.name}?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of beauty professionals who have found their dream jobs through EmviApp. 
              Start your search today and connect with top employers in {city.name}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={`/jobs?location=${citySlug}&category=${role.category}`}>
                <Button size="lg">
                  Start Job Search
                </Button>
              </Link>
              <Link to="/artists">
                <Button variant="outline" size="lg">
                  Browse {role.name}s
                </Button>
              </Link>
            </div>
          </section>
        </Container>
      </main>
    </Layout>
  );
};

export default CityRoleJobsHub;
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import SeoHead from '@/components/seo/SeoHead';
import { SEO_ROLES } from '@/data/seo-roles';
import { SEO_LOCATIONS } from '@/data/seo-locations';
import { buildBreadcrumbJsonLd } from '@/components/seo/jsonld';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

const CityIndexPage: React.FC = () => {
  const { cityState } = useParams<{ cityState: string }>();
  
  const locationData = SEO_LOCATIONS.find(l => l.id === cityState);
  
  if (!locationData) {
    return (
      <Layout>
        <SeoHead
          title="City Not Found | EmviApp"
          description="The requested city could not be found."
          canonicalUrl={`https://www.emvi.app/artists/cities/${cityState}`}
          robots="noindex, follow"
        />
        <Container className="py-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">City Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The city you're looking for doesn't exist in our directory.
            </p>
            <Link to="/artists">
              <Button>Browse All Artists</Button>
            </Link>
          </div>
        </Container>
      </Layout>
    );
  }

  const pageTitle = `Beauty Artists in ${locationData.fullName} – EmviApp`;
  const metaDescription = `Find top beauty professionals in ${locationData.fullName}. Browse nail artists, hair stylists, barbers, and more skilled specialists in ${locationData.city}, ${locationData.state}.`;
  const canonicalUrl = `https://www.emvi.app/artists/cities/${cityState}`;

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Artists', href: '/artists' },
    { name: 'Cities', href: '/artists' },
    { name: locationData.fullName, href: `/artists/cities/${cityState}`, current: true }
  ];

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: 'https://www.emvi.app' },
    { name: 'Artists', url: 'https://www.emvi.app/artists' },
    { name: locationData.fullName, url: canonicalUrl }
  ]);

  return (
    <Layout>
      <SeoHead
        title={pageTitle}
        description={metaDescription}
        canonicalUrl={canonicalUrl}
        robots="index, follow"
        additionalMeta={[
          { name: 'keywords', content: `beauty artists ${locationData.city}, ${locationData.state} beauty professionals, hire beauty artists` }
        ]}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd, null, 0)
        }}
      />

      {/* Breadcrumbs */}
      <section className="bg-white border-b border-gray-200">
        <Container className="py-4">
          <Breadcrumbs items={breadcrumbItems} />
        </Container>
      </section>

      <main className="w-full">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-primary/5 to-secondary/5">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Beauty Artists in {locationData.fullName}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
                Discover talented beauty professionals in {locationData.city}, {locationData.state}. 
                From nail artists to hair stylists, find the perfect specialist for your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/post-job">
                  <Button size="lg">Post a Job</Button>
                </Link>
                <Link to="/artists">
                  <Button size="lg" variant="outline">Browse All Artists</Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Specialties Grid */}
        <section className="py-12 bg-white">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="mb-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Beauty Specialists in {locationData.city}
                </h2>
                <p className="text-muted-foreground">
                  Browse by specialty to find the right professional for your needs
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {SEO_ROLES.map((role) => (
                  <Link
                    key={role.id}
                    to={`/artists/${role.id}/${cityState}`}
                    className="block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-sm hover:border-primary/30 transition-all duration-200"
                  >
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                        {role.pluralName}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {role.description}
                      </p>
                      <span className="inline-flex items-center text-primary text-sm font-medium">
                        Find {role.pluralName} →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Local Information */}
        <section className="py-8 bg-gray-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  Why Choose Beauty Professionals in {locationData.city}?
                </h2>
                <p className="text-lg text-muted-foreground">
                  {locationData.city} offers a thriving beauty industry with top-tier professionals
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-3">Local Expertise</h3>
                  <p className="text-muted-foreground">
                    Beauty professionals in {locationData.city} understand local trends, climate considerations, 
                    and client preferences that make a difference in service quality.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-3">Established Network</h3>
                  <p className="text-muted-foreground">
                    Connect with artists who are already established in the {locationData.city} beauty scene 
                    and have built strong client relationships.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-3">Convenient Location</h3>
                  <p className="text-muted-foreground">
                    Work with professionals based in {locationData.fullName} for easy scheduling, 
                    reduced travel costs, and better collaboration.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-3">Verified Quality</h3>
                  <p className="text-muted-foreground">
                    All beauty professionals on EmviApp are verified, licensed, and committed to 
                    maintaining high standards regardless of location.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </Layout>
  );
};

export default CityIndexPage;
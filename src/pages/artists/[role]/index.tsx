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

const RoleIndexPage: React.FC = () => {
  const { role } = useParams<{ role: string }>();
  
  const roleData = SEO_ROLES.find(r => r.id === role);
  
  if (!roleData) {
    return (
      <Layout>
        <SeoHead
          title="Artists Not Found | EmviApp"
          description="The requested artist role could not be found."
          canonicalUrl={`https://www.emvi.app/artists/${role}`}
          robots="noindex, follow"
        />
        <Container className="py-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Role Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The artist role you're looking for doesn't exist.
            </p>
            <Link to="/artists">
              <Button>Browse All Artists</Button>
            </Link>
          </div>
        </Container>
      </Layout>
    );
  }

  const pageTitle = `${roleData.pluralName} by City – EmviApp`;
  const metaDescription = `Find ${roleData.pluralName.toLowerCase()} in cities across the US. ${roleData.description} Browse by location to discover talented professionals in your area.`;
  const canonicalUrl = `https://www.emvi.app/artists/${role}`;

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Artists', href: '/artists' },
    { name: roleData.pluralName, href: `/artists/${role}`, current: true }
  ];

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: 'https://www.emvi.app' },
    { name: 'Artists', url: 'https://www.emvi.app/artists' },
    { name: roleData.pluralName, url: canonicalUrl }
  ]);

  return (
    <Layout>
      <SeoHead
        title={pageTitle}
        description={metaDescription}
        canonicalUrl={canonicalUrl}
        robots="index, follow"
        additionalMeta={[
          { name: 'keywords', content: `${roleData.pluralName.toLowerCase()}, beauty professionals, hire ${roleData.name.toLowerCase()} artists` }
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
                {roleData.pluralName} by City
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
                {roleData.description} Find talented professionals in your area and connect with verified {roleData.pluralName.toLowerCase()}.
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

        {/* Cities Grid */}
        <section className="py-12 bg-white">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="mb-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Find {roleData.pluralName} by City
                </h2>
                <p className="text-muted-foreground">
                  Browse {roleData.pluralName.toLowerCase()} across {SEO_LOCATIONS.length} major cities
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {SEO_LOCATIONS.map((location) => (
                  <Link
                    key={location.id}
                    to={`/artists/${role}/${location.id}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-sm hover:border-primary/30 transition-all duration-200"
                  >
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {location.city}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {location.state}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* SEO Content */}
        <section className="py-8 bg-gray-50">
          <Container>
            <div className="max-w-4xl mx-auto prose prose-gray">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">
                  Why Choose {roleData.pluralName} from EmviApp?
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  All professionals are verified, licensed, and committed to delivering exceptional results.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Verified Professionals</h3>
                  <p>
                    Every {roleData.name.toLowerCase()} artist on our platform undergoes thorough verification including 
                    license validation, portfolio review, and background checks.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Nationwide Coverage</h3>
                  <p>
                    Find {roleData.pluralName.toLowerCase()} in major cities across the United States, 
                    from coast to coast with consistent quality standards.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Flexible Options</h3>
                  <p>
                    Whether you need full-time staff, part-time coverage, or event services, 
                    our professionals offer flexible arrangements to meet your needs.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Direct Communication</h3>
                  <p>
                    Connect directly with {roleData.pluralName.toLowerCase()} through our secure platform, 
                    review their work, and hire with confidence.
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

export default RoleIndexPage;
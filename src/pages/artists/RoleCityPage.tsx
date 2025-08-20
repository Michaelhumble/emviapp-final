import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import BaseSEO from '@/components/seo/BaseSEO';
import { buildBreadcrumbJsonLd } from '@/components/seo/jsonld';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { SEO_ROLES, RoleId } from '@/data/seo-roles';
import { SEO_LOCATIONS, LocationId, getNearbyLocations } from '@/data/seo-locations';
import { ArtistForHireCard } from '@/components/artists/ArtistForHireCard';
import { useArtistsSearch } from '@/hooks/useArtistsSearch';
import { useAuth } from '@/context/auth';

const RoleCityPage: React.FC = () => {
  const { role, cityState } = useParams<{ role: string; cityState: string }>();
  const { isSignedIn } = useAuth();
  
  // Find role and location data
  const roleData = SEO_ROLES.find(r => r.id === role);
  const locationData = SEO_LOCATIONS.find(l => l.id === cityState);
  
  // Get nearby locations for internal linking
  const nearbyLocations = useMemo(() => {
    if (!cityState) return [];
    return getNearbyLocations(cityState as LocationId, 3);
  }, [cityState]);
  
  // Search for artists with filters
  const { items, loading, hasMore, loadMore } = useArtistsSearch({
    specialty: role,
    location: locationData?.fullName,
    available: true
  });

  if (!roleData || !locationData) {
    return (
      <Layout>
        <BaseSEO
          title="Artists Not Found | EmviApp"
          description="The requested artist page could not be found."
          canonical={`https://www.emvi.app/artists/${role}/${cityState}`}
          noindex={true}
        />
        <Container className="py-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The artist page you're looking for doesn't exist.
            </p>
            <Link to="/artists">
              <Button>Browse All Artists</Button>
            </Link>
          </div>
        </Container>
      </Layout>
    );
  }

  const pageTitle = `Top ${roleData.pluralName} in ${locationData.fullName} – EmviApp`;
  const metaDescription = `Find the best ${roleData.pluralName.toLowerCase()} in ${locationData.fullName}. ${roleData.description} Browse verified professionals on EmviApp.`;
  const canonicalUrl = `https://www.emvi.app/artists/${role}/${cityState}`;

  // JSON-LD structured data
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: 'https://www.emvi.app' },
    { name: 'Artists', url: 'https://www.emvi.app/artists' },
    { name: roleData.pluralName, url: `https://www.emvi.app/artists?specialty=${role}` },
    { name: locationData.fullName, url: canonicalUrl }
  ]);

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageTitle,
    "description": metaDescription,
    "url": canonicalUrl,
    "about": {
      "@type": "Service",
      "name": roleData.pluralName,
      "description": roleData.description
    },
    "areaServed": {
      "@type": "City",
      "name": locationData.city,
      "addressRegion": locationData.state,
      "addressCountry": "US"
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": items.length,
      "itemListElement": items.slice(0, 10).map((artist: any, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Person",
          "name": artist.full_name || artist.headline || "Beauty Professional",
          "jobTitle": roleData.name + " Artist",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": locationData.city,
            "@addressRegion": locationData.state,
            "addressCountry": "US"
          }
        }
      }))
    }
  };

  return (
    <Layout>
      <BaseSEO
        title={pageTitle}
        description={metaDescription}
        canonical={canonicalUrl}
        ogImage={`https://www.emvi.app/og-artists-${role}.jpg`}
        jsonLd={[breadcrumbJsonLd, collectionJsonLd]}
        type="website"
      />

      <main className="w-full">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-primary/5 to-secondary/5">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Top {roleData.pluralName} in {locationData.fullName}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
                {roleData.description} Browse verified professionals in {locationData.city}, {locationData.state}.
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

        {/* SEO Content Section */}
        <section className="py-8 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto prose prose-gray">
              <p>
                EmviApp connects you with the top {roleData.pluralName.toLowerCase()} in {locationData.fullName}. 
                Whether you need {roleData.description.toLowerCase()} our verified professionals are ready to help. 
                Browse artists by specialty, view their portfolios, and book with confidence.
              </p>
              <p>
                Looking for {roleData.pluralName.toLowerCase()} in nearby areas? Check out opportunities in{' '}
                {nearbyLocations.map((loc, index) => (
                  <span key={loc.id}>
                    <Link 
                      to={`/artists/${role}/${loc.id}`}
                      className="text-primary hover:underline"
                    >
                      {loc.fullName}
                    </Link>
                    {index < nearbyLocations.length - 1 && (index === nearbyLocations.length - 2 ? ', and ' : ', ')}
                  </span>
                ))}
                {nearbyLocations.length > 0 && '. '}
                You can also explore our full{' '}
                <Link to="/artists" className="text-primary hover:underline">
                  artist directory
                </Link>{' '}
                to find professionals across all specialties and locations.
              </p>
            </div>
          </Container>
        </section>

        {/* Artists Grid */}
        <section className="py-12 bg-gray-50">
          <Container>
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Available {roleData.pluralName} in {locationData.city}
              </h2>
              <p className="text-muted-foreground">
                {items.length} {roleData.pluralName.toLowerCase()} available in {locationData.fullName}
              </p>
            </div>

            {loading && items.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg border p-6 animate-pulse h-[220px]" />
                ))}
              </div>
            ) : items.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {items.map((artist) => (
                    <ArtistForHireCard
                      key={(artist as any).user_id || (artist as any).id}
                      artist={artist as any}
                      viewMode={isSignedIn ? "signedIn" : "public"}
                      theme="blue"
                      hidePhoto
                      contactGated
                      variant="blueMinimal"
                    />
                  ))}
                </div>
                {hasMore && (
                  <div className="text-center mt-8">
                    <Button onClick={loadMore} disabled={loading} variant="outline">
                      {loading ? "Loading..." : "Load More"}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-xl font-semibold mb-4">
                    No {roleData.pluralName} Yet in {locationData.city}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Be the first to join EmviApp in {locationData.fullName}! 
                    Create your profile and start connecting with clients today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/dashboard/profile">
                      <Button>Create Artist Profile</Button>
                    </Link>
                    <Link to="/post-job">
                      <Button variant="outline">Post a Job</Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </Container>
        </section>

        {/* Nearby Cities Section */}
        {nearbyLocations.length > 0 && (
          <section className="py-12 bg-white">
            <Container>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">
                  {roleData.pluralName} in Nearby Cities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {nearbyLocations.map((location) => (
                    <Link
                      key={location.id}
                      to={`/artists/${role}/${location.id}`}
                      className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-semibold">{roleData.pluralName} in {location.city}</h3>
                      <p className="text-sm text-muted-foreground">{location.fullName}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </Container>
          </section>
        )}
      </main>
    </Layout>
  );
};

export default RoleCityPage;
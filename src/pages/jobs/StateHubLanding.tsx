import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { STATE_HUB_SEEDS, getStateBySlug, generateStateHubContent, getCitiesByState } from '@/data/seo-state-seeds';
import { CITY_ROLE_SEEDS } from '@/data/seo-city-role-seeds';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Briefcase, TrendingUp } from 'lucide-react';
import Layout from '@/components/layout/Layout';

export default function StateHubLanding() {
  const { stateSlug } = useParams();
  
  const state = getStateBySlug(stateSlug || '');
  
  if (!state) {
    return (
      <Layout>
        <div className="container mx-auto py-12">
          <h1 className="text-3xl font-bold">State not found</h1>
          <p className="mt-4">
            <Link to="/jobs" className="text-primary hover:underline">
              Browse all jobs
            </Link>
          </p>
        </div>
      </Layout>
    );
  }
  
  const content = generateStateHubContent(state.name, state.code);
  const cities = getCitiesByState(state.code);
  const pageTitle = `Beauty Jobs in ${state.name} | EmviApp`;
  const canonical = `https://www.emvi.app/jobs/us/${state.slug}`;
  
  // Schema: BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.emvi.app" },
      { "@type": "ListItem", "position": 2, "name": "Jobs", "item": "https://www.emvi.app/jobs" },
      { "@type": "ListItem", "position": 3, "name": `${state.name}`, "item": canonical }
    ]
  };
  
  // Schema: ItemList of city links
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Cities with Beauty Jobs in ${state.name}`,
    "description": `Find beauty jobs in ${cities.length} cities across ${state.name}`,
    "numberOfItems": cities.length * CITY_ROLE_SEEDS.roles.length,
    "itemListElement": cities.flatMap((city, cityIndex) => 
      CITY_ROLE_SEEDS.roles.map((role, roleIndex) => ({
        "@type": "ListItem",
        "position": cityIndex * CITY_ROLE_SEEDS.roles.length + roleIndex + 1,
        "item": {
          "@type": "WebPage",
          "name": `${role.name} Jobs in ${city.name}`,
          "url": `https://www.emvi.app/jobs/${role.id}/${city.id}`
        }
      }))
    ).slice(0, 50) // Limit to first 50 items for schema size
  };

  return (
    <Layout>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={content.intro} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={content.intro} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(itemListSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 pt-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to="/jobs" className="hover:text-foreground transition-colors">Jobs</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{state.name}</span>
          </nav>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Beauty Jobs in {state.name}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {content.intro}
            </p>
            
            {/* Quick Search Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {content.searchTips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="shadow-lg">
                <Link to="/jobs">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Browse All Jobs
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/signup">Create Profile</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/jobs/post">Post a Job</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* UGC: Top 3 Cities People Are Searching (only if data exists) */}
        {content.trendingCities && content.trendingCities.length > 0 && (
          <div className="container mx-auto px-4 py-8 bg-accent/30 rounded-lg mb-12">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              🔥 Top Cities People Are Searching
            </h3>
            <div className="flex flex-wrap gap-3">
              {content.trendingCities.slice(0, 3).map((city, idx) => (
                <Link
                  key={idx}
                  to={`/jobs/${CITY_ROLE_SEEDS.roles[0].id}/${city.id}`}
                  className="px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-sm font-medium transition-colors"
                >
                  {city.name} →
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Top Cities Highlight */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Top Cities in {state.name}</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {content.topCities.map((city) => (
              <Link
                key={city.id}
                to={`/jobs/${CITY_ROLE_SEEDS.roles[0].id}/${city.id}`}
                className="group p-4 rounded-lg border border-border bg-card hover:bg-accent hover:border-primary transition-all"
              >
                <div className="flex items-start gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold group-hover:text-primary transition-colors">
                      {city.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {city.jobCount}+ jobs
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* City Grid */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">All Cities in {state.name}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city) => (
              <div key={city.id} className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  {city.name}
                </h3>
                
                <div className="space-y-2">
                  {CITY_ROLE_SEEDS.roles.map((role) => (
                    <Link
                      key={role.id}
                      to={`/jobs/${role.id}/${city.id}`}
                      className="block text-sm text-muted-foreground hover:text-primary hover:underline transition-colors"
                    >
                      {role.name} Jobs in {city.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* UGC: Recent Success Stories (only if data exists) */}
        {content.successStories && content.successStories.length > 0 && (
          <div className="container mx-auto px-4 py-12 bg-muted/30 rounded-lg mb-12">
            <h3 className="text-lg font-semibold mb-6">✨ Recent Success Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.successStories.slice(0, 2).map((story, idx) => (
                <div key={idx} className="p-5 rounded-lg bg-card border border-border">
                  <p className="text-sm text-muted-foreground italic mb-3">"{story.text}"</p>
                  {story.author && (
                    <p className="text-xs font-medium text-primary">— {story.author}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Links Footer */}
        <div className="container mx-auto px-4 py-12">
          <div className="border-t border-border pt-8">
            <h3 className="text-lg font-semibold mb-4">Related Resources</h3>
            <div className="flex flex-wrap gap-4">
              {content.relatedLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.url}
                  className="text-sm text-muted-foreground hover:text-primary hover:underline"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

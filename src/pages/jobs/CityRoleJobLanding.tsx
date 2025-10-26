import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CITY_ROLE_SEEDS, generateCityRoleContent } from '@/data/seo-city-role-seeds';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Briefcase } from 'lucide-react';

export default function CityRoleJobLanding() {
  const { roleSlug, citySlug } = useParams();

  const role = CITY_ROLE_SEEDS.roles.find(r => r.id === roleSlug);
  const city = CITY_ROLE_SEEDS.cities.find(c => c.id === citySlug);

  if (!role || !city) {
    return <div>Page not found</div>;
  }

  const content = generateCityRoleContent(role.name, city.name, city.state);
  const pageTitle = `${role.name} Jobs in ${city.name}, ${city.state} | EmviApp`;
  const canonical = `https://www.emvi.app/jobs/${roleSlug}/${citySlug}`;

  // Get state info for breadcrumbs
  const stateSlug = city.state.toLowerCase().replace(/\s+/g, '-');
  const stateUrl = `https://www.emvi.app/jobs/us/${stateSlug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.emvi.app" },
      { "@type": "ListItem", "position": 2, "name": "Jobs", "item": "https://www.emvi.app/jobs" },
      { "@type": "ListItem", "position": 3, "name": `${city.state}`, "item": stateUrl },
      { "@type": "ListItem", "position": 4, "name": `${city.name}`, "item": canonical }
    ]
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${role.name} Jobs in ${city.name}`,
    "description": content.intro,
    "url": canonical
  };

  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": `${role.name} Positions in ${city.name}, ${city.state}`,
    "description": content.intro,
    "datePosted": new Date().toISOString(),
    "hiringOrganization": {
      "@type": "Organization",
      "name": "EmviApp",
      "sameAs": "https://www.emvi.app"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": city.name,
        "addressRegion": city.state,
        "addressCountry": "US"
      }
    },
    "employmentType": ["FULL_TIME", "PART_TIME", "CONTRACTOR"],
    "industry": "Beauty & Wellness"
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={content.intro} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(jobPostingSchema)}</script>
      </Helmet>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/jobs" className="hover:text-primary">Jobs</Link>
            <span>/</span>
            <Link to={stateUrl} className="hover:text-primary">{city.state}</Link>
            <span>/</span>
            <span>{city.name}</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Briefcase className="h-8 w-8 text-primary" />
            {role.name} Jobs in {city.name}, {city.state}
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6">{content.intro}</p>

          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link to="/jobs">
                Browse All Jobs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/signup">Post a Job</Link>
            </Button>
          </div>
        </div>

        {/* UGC: Local Tips from the Community (only render if data exists) */}
        {content.localTips && content.localTips.length > 0 && (
          <section className="mb-12 bg-accent/50 rounded-lg p-6 border border-primary/20">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              💡 Local Tips from the Community
            </h3>
            <div className="space-y-3">
              {content.localTips.slice(0, 3).map((tip, idx) => (
                <p key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{tip}</span>
                </p>
              ))}
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            Top Salons Hiring {role.name}s in {city.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {content.topSalons?.map((salon, idx) => (
              <Link 
                key={idx} 
                to="/salons" 
                className="border rounded-lg p-5 hover:shadow-lg transition-shadow bg-card"
              >
                <h3 className="font-semibold text-lg mb-2">{salon.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  <MapPin className="h-3 w-3 inline mr-1" />
                  {salon.location}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium">{salon.rating} ★</span>
                  <span className="text-xs text-muted-foreground">({salon.reviewCount} reviews)</span>
                </div>
                <p className="text-sm mb-4">{salon.description}</p>
                <Button size="sm" className="w-full">
                  View Open Positions <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </Link>
            )) || (
              <div className="col-span-3 text-center text-muted-foreground py-8">
                <p>Browse all salons hiring in {city.name}</p>
                <Button asChild variant="outline" size="lg" className="mt-4">
                  <Link to="/salons">View All Salons</Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {content.faqs?.map((faq, idx) => (
              <div key={idx} className="border-l-4 border-primary pl-4">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            )) || (
              <div className="text-center text-muted-foreground py-4">
                <p>No FAQs available at this time.</p>
              </div>
            )}
          </div>
        </section>

        {/* UGC: Mini Gallery (only render if data exists) */}
        {content.gallery && content.gallery.length > 0 && (
          <section className="mb-12">
            <h3 className="text-lg font-semibold mb-4">Local Work Showcase</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {content.gallery.slice(0, 4).map((image, idx) => (
                <div 
                  key={idx} 
                  className="aspect-square rounded-lg overflow-hidden bg-muted hover:shadow-lg transition-shadow"
                >
                  <img 
                    src={image.url} 
                    alt={image.alt || `${role.name} work in ${city.name}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="bg-muted/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Explore More Opportunities</h2>
          <div className="grid gap-3">
            <Link to="/jobs" className="flex items-center gap-2 text-primary hover:underline">
              <Briefcase className="h-4 w-4" />
              View All Beauty Jobs
            </Link>
            <Link to="/salons" className="flex items-center gap-2 text-primary hover:underline">
              <MapPin className="h-4 w-4" />
              Find Salons Hiring
            </Link>
            <Link to="/signup" className="flex items-center gap-2 text-primary hover:underline">
              <ArrowRight className="h-4 w-4" />
              Create Your Profile
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

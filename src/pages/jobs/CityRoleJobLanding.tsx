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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.emvi.app" },
      { "@type": "ListItem", "position": 2, "name": "Jobs", "item": "https://www.emvi.app/jobs" },
      { "@type": "ListItem", "position": 3, "name": `${role.name} Jobs`, "item": `https://www.emvi.app/jobs/${roleSlug}` },
      { "@type": "ListItem", "position": 4, "name": `${city.name}, ${city.state}`, "item": canonical }
    ]
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${role.name} Jobs in ${city.name}`,
    "description": content.intro,
    "url": canonical
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={content.intro} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
      </Helmet>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/jobs" className="hover:text-primary">Jobs</Link>
            <span>/</span>
            <span>{role.name}</span>
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

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {content.faqs.map((faq, idx) => (
              <div key={idx} className="border-l-4 border-primary pl-4">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

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

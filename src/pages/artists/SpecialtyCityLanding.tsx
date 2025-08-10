import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';
import BaseSEO from '@/components/seo/BaseSEO';
import { buildBreadcrumbJsonLd } from '@/components/seo/jsonld';
import { useArtistsSearch } from '@/hooks/useArtistsSearch';
import { Container } from '@/components/ui/container';
import { ArtistForHireCard } from '@/components/artists/ArtistForHireCard';

function toTitle(s: string) { return s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()); }
function parseCityState(slug?: string) {
  if (!slug) return { city: '', state: '', label: '' };
  const [rawCity, rawState] = slug.split('-');
  const city = toTitle(rawCity || '');
  const state = (rawState || '').toUpperCase();
  return { city, state, label: `${city}, ${state}` };
}

export default function SpecialtyCityLanding() {
  const { specialty = '', cityState } = useParams();
  const specTitle = toTitle(specialty);
  const { city, state, label } = parseCityState(cityState);
  const canonical = `https://www.emvi.app/artists/${specialty}/${cityState}`;

  const { items = [] } = useArtistsSearch({ available: true });
  const filtered = useMemo(() => items.filter((a: any) =>
    (a.location || '').toLowerCase().includes(`${city.toLowerCase()}`) &&
    ((a.specialties || a.specialty || '').toLowerCase().includes(specialty.toLowerCase()))
  ), [items, city, specialty]);
  const count = filtered.length;

  const title = `Hire ${specTitle} in ${label} | ${count} available | EmviApp`;
  const description = `Hire ${specTitle} in ${label}. ${count} verified pros available now. Post a job or contact talent on EmviApp.`;

  const breadcrumb = buildBreadcrumbJsonLd([
    { name: 'Home', url: 'https://www.emvi.app' },
    { name: 'Artists', url: 'https://www.emvi.app/artists' },
    { name: `${specTitle} in ${label}`, url: canonical },
  ]);

  const itemList = {
    '@context': 'https://schema.org', '@type': 'ItemList',
    itemListElement: filtered.slice(0, 12).map((a: any, idx: number) => ({ '@type': 'ListItem', position: idx + 1, name: a.headline || a.full_name, url: `https://www.emvi.app/artists/${a.id}` }))
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What are typical ${specTitle.toLowerCase()} rates in ${label}?`,
        acceptedAnswer: { '@type': 'Answer', text: `Rates vary by experience and service type. Many ${specTitle.toLowerCase()} pros in ${label} charge competitive market rates; request contact to get precise quotes.` }
      },
      {
        '@type': 'Question',
        name: `Do I need a license to hire ${specTitle.toLowerCase()} in ${label}?`,
        acceptedAnswer: { '@type': 'Answer', text: `Most services require state licensing in ${state}. Always verify credentials and permits when hiring in ${label}.` }
      },
      {
        '@type': 'Question',
        name: `When is demand highest for ${specTitle.toLowerCase()} in ${label}?`,
        acceptedAnswer: { '@type': 'Answer', text: `Peak seasons include weekends, holidays, and event-heavy months. Book early to secure talent in popular neighborhoods of ${city}.` }
      },
      {
        '@type': 'Question',
        name: `Which neighborhoods are popular for ${specTitle.toLowerCase()} services in ${city}?`,
        acceptedAnswer: { '@type': 'Answer', text: `Demand clusters around central districts and high-traffic shopping areas. Explore nearby areas to widen your options.` }
      }
    ]
  };

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
      </Helmet>
      <BaseSEO jsonLd={[breadcrumb, itemList, faqJsonLd]} />

      <section className="py-10">
        <Container>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Hire {specTitle} in {label}</h1>
          <p className="text-muted-foreground mb-6">{specTitle} pros in {label} are in steady demand across downtown and surrounding neighborhoods. We’ve found {count} verified artists accepting new clients right now. Compare specialties, years of experience, and availability at a glance, then request contact to confirm rates and schedule. For busy weekends and event seasons, book early to lock in your preferred time. If you don’t see the perfect fit, post a job and we’ll notify matching talent in minutes.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.slice(0, 12).map((a: any) => (
              <ArtistForHireCard key={(a as any).user_id || (a as any).id} artist={a as any} viewMode="public" theme="blue" hidePhoto contactGated variant="blueMinimal" />
            ))}
          </div>
        </Container>
      </section>
    </Layout>
  );
}

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

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
      </Helmet>
      <BaseSEO jsonLd={[breadcrumb, itemList]} />

      <section className="py-10">
        <Container>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Hire {specTitle} in {label}</h1>
          <p className="text-muted-foreground mb-6">{count} verified pros available in {label}.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.slice(0, 12).map((a: any) => (
              <ArtistForHireCard key={(a as any).user_id || (a as any).id} artist={a as any} viewMode="public" theme="blue" hidePhoto contactGated />
            ))}
          </div>
        </Container>
      </section>
    </Layout>
  );
}

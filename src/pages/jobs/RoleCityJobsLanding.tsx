import React, { useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';
import BaseSEO from '@/components/seo/BaseSEO';
import { buildBreadcrumbJsonLd } from '@/components/seo/jsonld';
import { useOptimizedJobsData } from '@/hooks/useOptimizedJobsData';
import { JobCard } from '@/components/jobs/JobCard';
import { Container } from '@/components/ui/container';
import { normalizeCityStateSlug } from '@/utils/slug';

function toTitle(s: string) {
  return s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function parseCityState(slug?: string) {
  if (!slug) return { city: '', state: '', label: '' };
  const [rawCity, rawState] = slug.split('-');
  const city = toTitle(rawCity || '');
  const state = (rawState || '').toUpperCase();
  return { city, state, label: `${city}, ${state}` };
}

export default function RoleCityJobsLanding() {
  const { role = '', cityState } = useParams();
  const navigate = useNavigate();
  const normalized = cityState ? normalizeCityStateSlug(cityState) : '';
  useEffect(() => {
    if (cityState && normalized && cityState.toLowerCase() !== normalized) {
      navigate(`/jobs/${role}/${normalized}`, { replace: true });
    }
  }, [cityState, normalized, role, navigate]);
  const roleTitle = toTitle(role);
  const { city, state, label } = parseCityState(normalized || cityState);
  const canonical = `https://www.emvi.app/jobs/${role}/${normalized || cityState}`;

  const { jobs = [] } = useOptimizedJobsData({ isSignedIn: false, limit: 200 });
  const filtered = useMemo(() => jobs.filter((j: any) =>
    (j.location || '').toLowerCase().includes(`${city.toLowerCase()}, ${state.toLowerCase()}`) &&
    ((j.category || '').toLowerCase().includes(role.toLowerCase()) || (j.title || '').toLowerCase().includes(role.toLowerCase()))
  ), [jobs, city, state, role]);
  const count = filtered.length;

  const title = `${roleTitle} jobs in ${label} | ${count} hiring now | EmviApp`;
  const description = `Hiring ${roleTitle} in ${label}. ${count} openings from verified salons. Apply today on EmviApp.`;

  const breadcrumb = buildBreadcrumbJsonLd([
    { name: 'Home', url: 'https://www.emvi.app' },
    { name: 'Jobs', url: 'https://www.emvi.app/jobs' },
    { name: city, url: `https://www.emvi.app/jobs/in/${cityState}` },
    { name: roleTitle, url: canonical },
  ]);

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: filtered.slice(0, 24).map((job: any, idx: number) => ({
      '@type': 'ListItem', position: idx + 1, url: `https://www.emvi.app${job.slug || `/jobs/${job.id}`}`, name: job.title
    })),
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{roleTitle} jobs in {label}</h1>
          <p className="text-muted-foreground mb-6">{count} openings in {label}. Apply directly on EmviApp.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.slice(0, 24).map((j: any) => (<JobCard key={j.id} job={j} />))}
          </div>
        </Container>
      </section>
    </Layout>
  );
}

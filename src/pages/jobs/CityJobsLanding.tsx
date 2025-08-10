import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';
import BaseSEO from '@/components/seo/BaseSEO';
import { buildBreadcrumbJsonLd } from '@/components/seo/jsonld';
import { useOptimizedJobsData } from '@/hooks/useOptimizedJobsData';
import { JobCard } from '@/components/jobs/JobCard';
import { Container } from '@/components/ui/container';

function toCityStateLabel(slug?: string) {
  if (!slug) return { city: '', state: '', label: '' };
  const [rawCity, rawState] = slug.split('-');
  const city = rawCity?.replace(/\b(st|ft)\b/gi, (m) => (m.toLowerCase() === 'st' ? 'St' : 'Ft')).replace(/-/g, ' ');
  const state = (rawState || '').toUpperCase();
  const labelCity = city
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  return { city: labelCity, state, label: `${labelCity}, ${state}` };
}

export default function CityJobsLanding() {
  const { cityState } = useParams();
  const { city, state, label } = toCityStateLabel(cityState);
  const canonical = `https://www.emvi.app/jobs/in/${cityState}`;

  const { jobs = [] } = useOptimizedJobsData({ isSignedIn: false, limit: 200 });
  const cityJobs = useMemo(() => jobs.filter((j: any) => (j.location || '').toLowerCase().includes(`${city.toLowerCase()}, ${state.toLowerCase()}`)), [jobs, city, state]);
  const count = cityJobs.length;

  const title = `Beauty jobs in ${label} | ${count} open roles | EmviApp`;
  const description = `Find beauty jobs in ${label}. Nails, hair, brows, makeup and more — ${count} open roles. Apply today on EmviApp.`;

  const breadcrumb = buildBreadcrumbJsonLd([
    { name: 'Home', url: 'https://www.emvi.app' },
    { name: 'Jobs', url: 'https://www.emvi.app/jobs' },
    { name: `Beauty jobs in ${label}`, url: canonical },
  ]);

  // Minimal ItemList for jobs
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: cityJobs.slice(0, 24).map((job: any, idx: number) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `https://www.emvi.app${job.slug || `/jobs/${job.id}`}`,
      name: job.title,
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Beauty jobs in {label}</h1>
          <p className="text-muted-foreground mb-6">{count} open roles in {label}. Apply directly on EmviApp.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {cityJobs.slice(0, 24).map((j: any) => (
              <JobCard key={j.id} job={j} />
            ))}
          </div>
        </Container>
      </section>
    </Layout>
  );
}

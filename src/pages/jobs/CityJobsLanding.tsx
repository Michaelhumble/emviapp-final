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
  const navigate = useNavigate();
  const normalized = cityState ? normalizeCityStateSlug(cityState) : '';
  useEffect(() => {
    if (cityState && normalized && cityState.toLowerCase() !== normalized) {
      navigate(`/jobs/in/${normalized}`, { replace: true });
    }
  }, [cityState, normalized, navigate]);
  const { city, state, label } = toCityStateLabel(normalized || cityState);
  const canonical = `https://www.emvi.app/jobs/in/${normalized || cityState}`;

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

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: `What are popular beauty roles in ${label}?`, acceptedAnswer: { '@type': 'Answer', text: `Top hiring categories in ${label} include nails, hair, brows/lashes, makeup, skincare, and barber.` }},
      { '@type': 'Question', name: `How often do jobs update in ${label}?`, acceptedAnswer: { '@type': 'Answer', text: 'Listings refresh throughout the day; check back or post a job to notify local talent.' }},
      { '@type': 'Question', name: `What neighborhoods hire most in ${city}?`, acceptedAnswer: { '@type': 'Answer', text: 'Hiring clusters around central districts, shopping corridors, and busy residential zones.' }}
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

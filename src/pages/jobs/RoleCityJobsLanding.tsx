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
import { buildLeadCopy } from '@/seo/locations/lead';

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
  const lead = buildLeadCopy({ city, state, role, countJobs: count, slug: normalized || cityState });

  const title = `${roleTitle} jobs in ${label} | ${count} hiring now | EmviApp`;
  const description = `Hiring ${roleTitle} in ${label}. ${count} openings from verified salons. Apply today on EmviApp.`;

  const breadcrumb = buildBreadcrumbJsonLd([
    { name: 'Home', url: 'https://www.emvi.app' },
    { name: 'Jobs', url: 'https://www.emvi.app/jobs' },
    { name: city, url: `https://www.emvi.app/jobs/${cityState}` },
    { name: roleTitle, url: canonical },
  ]);


  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: filtered.slice(0, 24).map((job: any, idx: number) => ({
      '@type': 'ListItem', position: idx + 1, url: `https://www.emvi.app${job.slug || `/jobs/${job.id}`}`, name: job.title
    })),
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: `What skills are in demand for ${roleTitle} in ${label}?`, acceptedAnswer: { '@type': 'Answer', text: `${roleTitle} roles in ${label} favor consistent quality, speed, and client care. Certifications and portfolios help.` }},
      { '@type': 'Question', name: `How often do ${roleTitle} jobs update in ${label}?`, acceptedAnswer: { '@type': 'Answer', text: 'Listings refresh throughout the day; follow this page or post a job to reach local talent quickly.' }},
      { '@type': 'Question', name: `Where are most ${roleTitle} jobs located in ${city}?`, acceptedAnswer: { '@type': 'Answer', text: 'Hiring clusters around central corridors, shopping areas, and busy neighborhoods.' }}
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{roleTitle} jobs in {label}</h1>
          <p className="text-muted-foreground mb-6">{lead}</p>

          {/* Sibling cities */}
          <div className="mb-6 flex flex-wrap gap-2 text-sm text-muted-foreground">
            {["new-york-ny","los-angeles-ca","chicago-il","houston-tx","dallas-tx","phoenix-az"].map((c) => (
              <a key={c} href={`/jobs/${role}/${c}`} className="rounded-full border border-border bg-card px-3 py-1 hover:bg-accent/30 transition-colors">
                {c.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.slice(0, 24).map((j: any) => (<JobCard key={j.id} job={j} />))}
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="/post-job" className="rounded-xl border border-border bg-card px-4 py-2 hover:bg-accent/30 transition-colors">Post a job</a>
            <a href={`/artists/${role}/${normalized || cityState}`} className="rounded-xl border border-border bg-card px-4 py-2 hover:bg-accent/30 transition-colors">Browse artists</a>
          </div>
        </Container>
      </section>
    </Layout>
  );
}

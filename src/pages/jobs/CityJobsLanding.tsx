import React, { useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';
import BaseSEO from '@/components/seo/BaseSEO';
import { buildBreadcrumbJsonLd } from '@/components/seo/jsonld';
import { useOptimizedJobsData } from '@/hooks/useOptimizedJobsData';
import { JobCard } from '@/components/jobs/JobCard';
import { Container } from '@/components/ui/container';
import { useOptimizedArtistsData } from '@/hooks/useOptimizedArtistsData';
import { ArtistForHireCard } from '@/components/artists/ArtistForHireCard';
import { Link } from 'react-router-dom';
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
  const { artists = [] } = useOptimizedArtistsData({ isSignedIn: false, limit: 12 });
  const cityJobs = useMemo(() => jobs.filter((j: any) => (j.location || '').toLowerCase().includes(`${city.toLowerCase()}, ${state.toLowerCase()}`)), [jobs, city, state]);
  const cityArtists = useMemo(() => artists.filter((a: any) => (a.location || '').toLowerCase().includes(city.toLowerCase())), [artists, city]);
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

  const artistsItemList = {
    '@context': 'https://schema.org', '@type': 'ItemList',
    itemListElement: cityArtists.slice(0, 12).map((a: any, idx: number) => ({ '@type': 'ListItem', position: idx + 1, name: a.headline || a.full_name, url: `https://www.emvi.app/artists/${(a as any).id || (a as any).user_id}` }))
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
      <BaseSEO jsonLd={[breadcrumb, itemList, artistsItemList, faqJsonLd]} />

      <section className="py-10">
        <Container>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Beauty jobs in {label}</h1>
          <p className="text-muted-foreground mb-6">{count} open roles in {label}. Apply directly on EmviApp.</p>

          {/* Top roles in city */}
          <div className="mb-6 flex flex-wrap gap-2 text-sm text-muted-foreground">
            {["nails","hair","brows-lashes","makeup","skincare","barber"].map((r) => (
              <Link key={r} to={`/jobs/${r}/${normalized || cityState}`} className="rounded-full border border-border bg-card px-3 py-1 hover:bg-accent/30 transition-colors">
                {r.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </Link>
            ))}
          </div>

          {/* Featured jobs */}
          <h2 className="text-xl font-semibold mb-3">Featured jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
            {cityJobs.slice(0, 6).map((j: any) => (
              <JobCard key={j.id} job={j} />
            ))}
          </div>

          {/* Latest jobs */}
          <h2 className="text-xl font-semibold mb-3">Latest in {label}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {cityJobs.slice(6, 24).map((j: any) => (
              <JobCard key={j.id} job={j} />
            ))}
          </div>

          {/* Artists strip */}
          {cityArtists.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-3">Hire artists in {label}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cityArtists.slice(0, 12).map((a: any) => (
                  <ArtistForHireCard key={(a as any).user_id || (a as any).id} artist={a as any} viewMode="public" theme="blue" hidePhoto contactGated variant="blueMinimal" />
                ))}
              </div>
            </div>
          )}

          {/* Recently filled (collapsed) */}
          <details className="mt-10">
            <summary className="cursor-pointer text-sm text-muted-foreground">Recently filled in {label}</summary>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {(useOptimizedJobsData({ isSignedIn: false, limit: 50 }).jobs || []).filter((j: any) => (j.location || '').toLowerCase().includes(`${city.toLowerCase()}, ${state.toLowerCase()}`)).slice(0, 6).map((j: any) => (
                <JobCard key={j.id} job={j} />
              ))}
            </div>
          </details>

          {/* Nearby areas */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-3">Nearby areas</h2>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              {["dallas-tx","austin-tx","san-antonio-tx","ft-worth-tx","oklahoma-city-ok","new-orleans-la"].map((c) => (
                <Link key={c} to={`/jobs/in/${c}`} className="rounded-full border border-border bg-card px-3 py-1 hover:bg-accent/30 transition-colors">
                  {c.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ').replace('OklaHoma', 'Oklahoma').replace('Ft', 'Ft')}
                </Link>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/post-job" className="rounded-xl border border-border bg-card px-4 py-2 hover:bg-accent/30 transition-colors">Post a job</Link>
            <Link to={`/artists/nails/${normalized || cityState}`} className="rounded-xl border border-border bg-card px-4 py-2 hover:bg-accent/30 transition-colors">Browse artists</Link>
          </div>
        </Container>
      </section>
    </Layout>
  );
}

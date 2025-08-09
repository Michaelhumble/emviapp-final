import React, { useEffect, Suspense, lazy, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Routes, Route, Link } from 'react-router-dom';
import CreateJobPosting from './jobs/CreateJobPosting';
import EditJobPage from './jobs/EditJobPage';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { analytics } from '@/lib/analytics';
import '@/utils/demoSeed';
import { ensureDemoSeededOnMount, isOverlayEnabled, registerDumpDemoState, debugLog } from '@/lib/demoOverlay';
import { previewJobs, previewExpiredJobs, previewSalonsForSale, previewArtists } from '@/demo/jobsPreviewData';
const BrowseJobsPage = lazy(() => import('./jobs/OptimizedJobsPageContent'));
const preloadBrowse = () => import('./jobs/OptimizedJobsPageContent');

// Jobs landing page with CTA to browse
const JobsLanding: React.FC<{ onPreload: () => void }> = ({ onPreload }) => {
  useEffect(() => {
    analytics.trackEvent({ action: 'jobs_funnel_step', category: 'navigation', label: 'landing' });
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <Helmet>
        <title>Beauty Industry Jobs | EmviApp</title>
        <meta name="description" content="Browse beauty industry jobs on EmviApp. Discover roles and hire talent fast." />
        <link rel="canonical" href="/jobs" />
      </Helmet>
      <section className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Find your next beauty industry job</h1>
        <p className="mt-3 text-muted-foreground">Explore the latest roles and opportunities from top salons and studios.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/jobs/browse" onMouseEnter={onPreload} onClick={() => analytics.trackEvent({ action: 'jobs_funnel_step', category: 'navigation', label: 'landing_to_browse' })}>Browse Jobs</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/post-job">Post a Job</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

// Simple preview fallback page when lazy import fails in non-production
const FallbackJobsPreview: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Beauty Industry Jobs | EmviApp</title>
        <meta name="description" content="Browse beauty industry jobs on EmviApp. Discover roles and hire talent fast." />
        <link rel="canonical" href="/jobs/browse" />
      </Helmet>

      <section className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Browse Jobs</h1>
        <p className="mt-2 text-muted-foreground">Preview data shown (non‑production) so you can see the full design.</p>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Latest Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewJobs.map(job => (
            <div key={job.id} className="relative rounded-xl border bg-background">
              <img src={job.photo} alt={`${job.title} at ${job.shop}`} loading="lazy" className="w-full h-40 object-cover rounded-t-xl" />
              <div className="p-4 space-y-1">
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-muted-foreground">{job.shop} • {job.city}{job.state ? `, ${job.state}` : ''}</p>
                {job.salary && <p className="text-sm">{job.salary}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">What You Missed</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewExpiredJobs.map(job => (
            <div key={job.id} className="relative rounded-xl border bg-muted/40 opacity-80">
              <div className="absolute top-2 right-2 flex gap-2">
                {job.expired && <span className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/10 text-foreground/70 border">Expired</span>}
                {job.filled && <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-foreground/70 border">Position Filled</span>}
              </div>
              <img src={job.photo} alt={`${job.title} at ${job.shop}`} loading="lazy" className="w-full h-40 object-cover rounded-t-xl" />
              <div className="p-4 space-y-1">
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-muted-foreground">{job.shop} • {job.city}{job.state ? `, ${job.state}` : ''}</p>
                {job.salary && <p className="text-sm">{job.salary}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Salons for Sale</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {previewSalonsForSale.map(salon => (
            <div key={salon.id} className="rounded-xl border bg-background p-4">
              <img src={salon.photo} alt={salon.name} loading="lazy" className="w-full h-40 object-cover rounded-lg mb-3" />
              <div className="font-semibold">{salon.name}</div>
              <div className="text-sm text-muted-foreground">{salon.city}</div>
              {salon.askingPrice && <div className="text-sm mt-1">Asking: {salon.askingPrice}</div>}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-4">Artists for Hire</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewArtists.map(artist => (
            <div key={artist.id} className="rounded-xl border bg-background p-4">
              <img src={artist.photo} alt={artist.name} loading="lazy" className="w-full h-40 object-cover rounded-lg mb-3" />
              <div className="font-semibold">{artist.name}</div>
              <div className="text-sm text-muted-foreground">{artist.specialty}</div>
              <div className="text-sm text-muted-foreground">{artist.city}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const Jobs = () => {
  const { isVietnamese } = useTranslation();
  const [usePreview, setUsePreview] = useState(false);
  const isProd = (() => {
    try {
      const ve = (typeof process !== 'undefined' ? (process as any)?.env?.VERCEL_ENV : undefined);
      const nodeEnv = (typeof process !== 'undefined' ? (process as any)?.env?.NODE_ENV : undefined);
      return String(ve || '').toLowerCase() === 'production' || String(nodeEnv || '').toLowerCase() === 'production';
    } catch { return false; }
  })();
  
  useEffect(() => {
    // Log page visit
    console.log("Jobs page accessed, rendering OptimizedJobsPageContent component");
    document.title = isVietnamese ? "Việc Làm Ngành Làm Đẹp | EmviApp" : "Beauty Industry Jobs | EmviApp";
  }, [isVietnamese]);

  // Preview-only: auto-seed demo content and pre-check lazy import
  useEffect(() => {
    if (!isOverlayEnabled()) return;
    registerDumpDemoState();
    debugLog('Jobs page mount: ensuring demo seed');
    void ensureDemoSeededOnMount();

    // Try preloading the lazy page; if it fails in preview, switch to hard preview
    if (!isProd) {
      preloadBrowse().catch(() => setUsePreview(true));
    }

    try {
      const seeded = localStorage.getItem('emvi_demo_seeded_v1');
      const w = window as any;
      if (!seeded && typeof w.__seedDemoContent === 'function') {
        w.__seedDemoContent().catch(() => {});
      }
      console.info('Preview helpers: window.__seedDemoContent(), window.__clearDemoContent(), window.__clearDemoCache(), window.__dumpDemoState()');
    } catch {}
  }, []);

  return (
    <>
      <div className="w-full">
        <Routes>
          <Route path="/" element={<JobsLanding onPreload={preloadBrowse} />} />
          <Route
            path="/browse"
            element={
              !isProd && usePreview ? (
                <FallbackJobsPreview />
              ) : (
                <Suspense fallback={<div className="container mx-auto px-4 py-8"><p>Loading jobs…</p></div>}>
                  <BrowseJobsPage />
                </Suspense>
              )
            }
          />
          <Route path="/create" element={<CreateJobPosting />} />
          <Route path="/edit/:jobId" element={<EditJobPage />} />
        </Routes>
      </div>
    </>
  );
};

export default Jobs;

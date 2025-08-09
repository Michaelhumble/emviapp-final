import React, { useEffect, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import { Routes, Route, Link } from 'react-router-dom';
import CreateJobPosting from './jobs/CreateJobPosting';
import EditJobPage from './jobs/EditJobPage';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { analytics } from '@/lib/analytics';
import '@/utils/demoSeed';
import { ensureDemoSeededOnMount, isOverlayEnabled, registerDumpDemoState, debugLog } from '@/lib/demoOverlay';
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

const Jobs = () => {
  const { isVietnamese } = useTranslation();
  
  useEffect(() => {
    // Log page visit
    console.log("Jobs page accessed, rendering OptimizedJobsPageContent component");
    document.title = isVietnamese ? "Việc Làm Ngành Làm Đẹp | EmviApp" : "Beauty Industry Jobs | EmviApp";
  }, [isVietnamese]);

  // Preview-only: auto-seed demo content on first visit if not already seeded
  useEffect(() => {
    if (!isOverlayEnabled()) return;
    registerDumpDemoState();
    debugLog('Jobs page mount: ensuring demo seed');
    void ensureDemoSeededOnMount();

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
              <Suspense fallback={<div className="container mx-auto px-4 py-8"><p>Loading jobs…</p></div>}>
                <BrowseJobsPage />
              </Suspense>
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

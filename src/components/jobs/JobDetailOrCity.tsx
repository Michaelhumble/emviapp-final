import { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import SimpleLoadingFallback from '@/components/error-handling/SimpleLoadingFallback';

const JobDetailPage = lazy(() => import('@/pages/JobDetailPage'));
const CityJobsLanding = lazy(() => import('@/pages/jobs/CityJobsLanding'));

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * `/jobs/:id` (real job detail) and `/jobs/:cityState` (city landing) share the
 * same single-dynamic-segment shape, so the router cannot disambiguate them by
 * order alone. This wrapper resolves the param: UUID → job detail, otherwise →
 * city landing page. URLs and SEO behavior are unchanged.
 */
const JobDetailOrCity = () => {
  const { cityState } = useParams();
  const isJobId = UUID_RE.test(cityState ?? '');

  return (
    <Suspense fallback={<SimpleLoadingFallback />}>
      {isJobId ? <JobDetailPage /> : <CityJobsLanding />}
    </Suspense>
  );
};

export default JobDetailOrCity;

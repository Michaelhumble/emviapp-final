import { useLocation, useNavigate } from 'react-router-dom';
import { generateJobUrl, generateSalonUrl, extractIdFromSlug } from '@/utils/seoHelpers';

export function useSEORouting() {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateToJob = (job: { title: string; location?: string; id: string; category: string }) => {
    const seoUrl = generateJobUrl(job);
    navigate(seoUrl);
  };

  const navigateToSalon = (salon: { title: string; location?: string; id: string }) => {
    const seoUrl = generateSalonUrl(salon);
    navigate(seoUrl);
  };

  const getCurrentId = (): string | null => {
    const pathname = location.pathname;
    const segments = pathname.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    
    return extractIdFromSlug(lastSegment);
  };

  const isLegacyUrl = (): boolean => {
    const pathname = location.pathname;
    // Check if URL is in old format (just ID without SEO slug)
    const segments = pathname.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    
    return lastSegment && lastSegment.length === 36 && !lastSegment.includes('-');
  };

  const redirectToSEOUrl = (item: any, category?: string) => {
    if (isLegacyUrl()) {
      let seoUrl: string;
      
      if (category) {
        seoUrl = generateJobUrl({ 
          title: item.title, 
          location: item.location, 
          id: item.id, 
          category 
        });
      } else {
        seoUrl = generateSalonUrl({
          title: item.title,
          location: item.location,
          id: item.id
        });
      }
      
      navigate(seoUrl, { replace: true });
    }
  };

  return {
    navigateToJob,
    navigateToSalon,
    getCurrentId,
    isLegacyUrl,
    redirectToSEOUrl,
    currentPath: location.pathname
  };
}
import { useEffect } from 'react';
import { preloadCriticalResources } from '@/utils/performanceOptimizer';

interface ResourcePreloaderProps {
  criticalImages?: string[];
  criticalFonts?: string[];
  criticalScripts?: string[];
  criticalStyles?: string[];
}

const ResourcePreloader: React.FC<ResourcePreloaderProps> = ({
  criticalImages = [],
  criticalFonts = [],
  criticalScripts = [],
  criticalStyles = []
}) => {
  useEffect(() => {
    const resources = [
      // Critical images
      ...criticalImages.map(href => ({ href, as: 'image' as const })),
      
      // Critical fonts
      ...criticalFonts.map(href => ({ 
        href, 
        as: 'font' as const, 
        type: 'font/woff2',
        crossorigin: true 
      })),
      
      // Critical scripts
      ...criticalScripts.map(href => ({ href, as: 'script' as const })),
      
      // Critical styles
      ...criticalStyles.map(href => ({ href, as: 'style' as const }))
    ];

    if (resources.length > 0) {
      preloadCriticalResources(resources);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('🚀 Preloading critical resources:', resources.length);
      }
    }
  }, [criticalImages, criticalFonts, criticalScripts, criticalStyles]);

  return null;
};

export default ResourcePreloader;
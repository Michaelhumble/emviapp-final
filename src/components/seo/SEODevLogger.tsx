import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEODevLogger = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' || window.location.hostname.includes('lovable.app')) {
      console.log('🔍 SEO Debug - Current Page:', location.pathname);
      
      // Log meta tags
      const title = document.title;
      const description = document.querySelector('meta[name="description"]')?.getAttribute('content');
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
      const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content');
      
      console.log('📝 SEO Meta Data:');
      console.log('  Title:', title);
      console.log('  Description:', description);
      console.log('  Canonical:', canonical);
      console.log('  Robots:', robots);
      
      // Log structured data
      const structuredData = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      if (structuredData.length > 0) {
        console.log('🏗️ Structured Data Found:', structuredData.length, 'blocks');
        structuredData.forEach((script, index) => {
          try {
            const data = JSON.parse(script.textContent || '');
            console.log(`  Block ${index + 1}:`, data['@type'] || 'Unknown type', data);
          } catch (e) {
            console.log(`  Block ${index + 1}: Invalid JSON`);
          }
        });
      }
      
      // Log Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
      const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content');
      if (ogTitle || ogImage) {
        console.log('📊 Open Graph:');
        console.log('  OG Title:', ogTitle);
        console.log('  OG Image:', ogImage);
      }
    }
  }, [location]);

  return null;
};

export default SEODevLogger;
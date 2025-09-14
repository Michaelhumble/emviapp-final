import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * 301 Redirect Component for Old Blog Post
 * Redirects /blog/ho-chi-minh-nail-salon-guide -> /blog/los-angeles-nail-salon-guide
 */
const HoChiMinhNailSalonGuideRedirect = () => {
  useEffect(() => {
    // Immediate redirect using window.location.replace (no back button history)
    window.location.replace('/blog/salon-guide/los-angeles-nail-salon-guide');
  }, []);

  return (
    <>
      <Helmet>
        <title>Redirecting to Los Angeles Nail Salon Guide | EmviApp</title>
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://emvi.app/blog/salon-guide/los-angeles-nail-salon-guide" />
        <meta http-equiv="refresh" content="0;url=/blog/salon-guide/los-angeles-nail-salon-guide" />
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting to updated guide...</p>
        </div>
      </div>
    </>
  );
};

export default HoChiMinhNailSalonGuideRedirect;
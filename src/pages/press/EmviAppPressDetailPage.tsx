import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, Building2 } from 'lucide-react';
import { OUTLETS, getOutletByKey, formatDate, getLogoUrl } from '@/lib/press';
import PressDetailSEO from '@/components/press/PressDetailSEO';
import RelatedResources from '@/components/press/RelatedResources';
import PressShareButtons from '@/components/press/PressShareButtons';
import { Button } from '@/components/ui/button';

const EmviAppPressDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  
  // Find outlet by key/slug
  const outlet = getOutletByKey(slug || '');
  
  if (!outlet) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Press Article Not Found</h1>
          <p className="text-muted-foreground mb-6">The press mention you're looking for doesn't exist.</p>
          <Link to="/press" className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Press Coverage
          </Link>
        </div>
      </div>
    );
  }

  const logoUrl = getLogoUrl(outlet);
  
  // Enhanced excerpt based on outlet type
  const getEnhancedExcerpt = (outlet: any) => {
    const baseExcerpt = `${outlet.name} covers EmviApp's launch as the first AI-powered growth engine for the global beauty industry.`;
    
    if (outlet.tier === 'national') {
      return `Major national coverage: ${baseExcerpt} This milestone represents a significant validation of our technology's potential to transform how beauty professionals connect, grow, and succeed.`;
    } else if (outlet.tier === 'finance') {
      return `Financial industry coverage: ${baseExcerpt} Industry analysts recognize the massive market opportunity in digitizing the $532 billion global beauty industry through AI-powered technology.`;
    } else if (outlet.tier === 'local_tv') {
      return `Local television coverage from ${outlet.city}: ${baseExcerpt} Local markets are seeing firsthand how EmviApp is transforming beauty professional opportunities in their communities.`;
    }
    
    return baseExcerpt;
  };

  const excerpt = getEnhancedExcerpt(outlet);
  
  // Pull quote for the article  
  const getPullQuote = (outlet: any) => {
    if (outlet.tier === 'finance') {
      return "EmviApp represents the convergence of artificial intelligence and beauty services, creating unprecedented opportunities for industry growth and professional development.";
    } else if (outlet.tier === 'national') {
      return "This platform isn't just about technology—it's about empowering every beauty professional to reach their full potential in an increasingly connected world.";
    }
    
    return "The beauty industry has been waiting for this kind of innovation. EmviApp delivers the missing piece that connects talent, opportunity, and growth.";
  };

  const pullQuote = getPullQuote(outlet);

  // UTM tracking for outbound clicks
  const getTrackedOutletUrl = (outlet: any) => {
    const baseUrl = outlet.url;
    if (!baseUrl.includes('?')) {
      return `${baseUrl}?utm_source=press&utm_medium=referral&utm_campaign=${outlet.key}`;
    }
    return `${baseUrl}&utm_source=press&utm_medium=referral&utm_campaign=${outlet.key}`;
  };

  const trackedUrl = getTrackedOutletUrl(outlet);

  return (
    <>
      <PressDetailSEO
        outlet={outlet}
        headline={outlet.headline}
        excerpt={excerpt}
        canonicalUrl={`https://www.emvi.app/press/${outlet.key}`}
        featuredImage={`https://www.emvi.app/press/${outlet.key}-hero.jpg`}
      />

      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <div className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <Link 
              to="/press" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Press Coverage
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Outlet Info */}
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={logoUrl} 
                alt={`${outlet.name} logo`}
                className="w-12 h-12 rounded-lg object-cover bg-white shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/icons/emvi-master-512.png';
                }}
              />
              <div>
                <h2 className="font-semibold text-foreground">{outlet.name}</h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(outlet.dateISO)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    {outlet.city}
                  </span>
                </div>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
              {outlet.headline}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {excerpt}
            </p>

            {/* CTA to Original Article */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                <a 
                  href={trackedUrl}
                  target="_blank"
                  rel={outlet.tier === 'aggregator' ? 'nofollow sponsored' : 'nofollow'}
                  className="inline-flex items-center gap-2"
                  onClick={() => {
                    // Track outbound click
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'press_outbound_click', {
                        outlet: outlet.name,
                        url: outlet.url,
                        tier: outlet.tier
                      });
                    }
                  }}
                >
                  Read on {outlet.name}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            
            {/* Pull Quote */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-l-4 border-primary p-6 rounded-r-lg my-8">
              <blockquote className="text-lg font-medium text-foreground italic mb-0">
                "{pullQuote}"
              </blockquote>
            </div>

            {/* Article Summary */}
            <div className="space-y-6 text-muted-foreground">
              <p>
                {outlet.name}'s coverage of EmviApp's launch marks a significant milestone in our mission to revolutionize the beauty industry through artificial intelligence. This recognition from {outlet.tier === 'national' ? 'a major national outlet' : outlet.tier === 'finance' ? 'the financial press' : 'local media'} validates our approach to connecting beauty professionals with better opportunities.
              </p>

              <p>
                The coverage highlights how EmviApp addresses critical challenges in the beauty industry: talent discovery, professional growth, and business optimization. Our AI-powered platform creates connections that were previously impossible, enabling beauty professionals to find their ideal positions while helping salons and clients discover exceptional talent.
              </p>

              <p>
                As featured in {outlet.name}, EmviApp's technology represents more than just another job platform—it's a comprehensive growth engine that empowers every stakeholder in the beauty ecosystem. From individual artists building their careers to established salons seeking top talent, our platform delivers results through intelligent matching and professional development tools.
              </p>

              {outlet.tier === 'finance' && (
                <p>
                  <strong>Market Impact:</strong> The financial press coverage underscores the significant market opportunity EmviApp addresses in the $532 billion global beauty industry. By applying artificial intelligence to talent acquisition and business growth, we're unlocking efficiency gains that translate directly to improved outcomes for professionals and businesses alike.
                </p>
              )}

              {outlet.tier === 'local_tv' && (
                <p>
                  <strong>Local Impact:</strong> The {outlet.city} market represents exactly the kind of community where EmviApp makes an immediate difference. Local beauty professionals gain access to opportunities that extend beyond their immediate geographic area, while local salons can attract talent from a much broader pool of qualified candidates.
                </p>
              )}

              <p>
                This coverage in {outlet.name} reflects our commitment to transparency and thought leadership in the beauty technology space. We're not just building a platform—we're fostering an entire ecosystem where beauty professionals can thrive, businesses can grow, and clients can access the best possible services.
              </p>
            </div>

            {/* Press Share Buttons */}
            <PressShareButtons 
              title={outlet.headline}
              url={location.pathname}
              outlet={outlet.name}
              className="mt-8 p-6 bg-muted/30 rounded-lg"
            />

            {/* Related Resources */}
            <RelatedResources 
              outletTier={outlet.tier}
              outletCity={outlet.city}
            />

          </div>
        </div>

        {/* Press Carousel - "As seen in..." */}
        <div className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-8">As seen in...</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
              {OUTLETS.slice(0, 6).map((pressOutlet) => (
                <div key={pressOutlet.key} className="flex items-center justify-center">
                  <img 
                    src={getLogoUrl(pressOutlet)} 
                    alt={pressOutlet.name}
                    className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmviAppPressDetailPage;
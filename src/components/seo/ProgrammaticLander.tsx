// 🛡️ GUARD: This file is scanned for banned terms - US-only content

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  DollarSign, 
  Users, 
  Clock, 
  Star,
  ArrowRight,
  Briefcase,
  GraduationCap,
  TrendingUp
} from 'lucide-react';
import { US_BEAUTY_ROLES, type BeautyRole } from '../../../data/roles.us';
import { US_CITIES, type USCity } from '../../../data/cities.us';
import { generateSearchUrl } from '@/lib/seo/slug-utils';
import { buildUTM, trackGA4Event } from '@/lib/seo/utm';

interface ProgrammaticLanderProps {
  roleSlug: string;
  citySlug: string;
  pageType: 'jobs' | 'salons';
}

const ProgrammaticLander: React.FC<ProgrammaticLanderProps> = ({ 
  roleSlug, 
  citySlug, 
  pageType 
}) => {
  const role = US_BEAUTY_ROLES.find(r => r.slug === roleSlug);
  const city = US_CITIES.find(c => c.slug === citySlug);

  if (!role || !city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the page you're looking for.</p>
          <Button onClick={() => window.location.href = '/'}>
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  const pageTitle = pageType === 'jobs' 
    ? `${role.label} Jobs in ${city.city}, ${city.state}` 
    : `Find ${role.label} Salons in ${city.city}, ${city.state}`;
  
  const metaTitle = `${pageTitle} | EmviApp`;
  const metaDescription = `Find premium ${role.label.toLowerCase()} ${pageType} in ${city.city}, ${city.state}. Browse high-paying opportunities at top salons and spas. Average salary: $${role.avgSalary.toLocaleString()}/year. Apply today!`;

  const canonicalUrl = `https://www.emvi.app/${pageType}-in/${citySlug}/${roleSlug}`;

  // Generate breadcrumb structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.emvi.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": pageType === 'jobs' ? 'Jobs' : 'Salons',
        "item": `https://www.emvi.app/${pageType}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${city.city}, ${city.state}`,
        "item": `https://www.emvi.app/${pageType}-in/${citySlug}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": role.label,
        "item": canonicalUrl
      }
    ]
  };

  // Generate page structured data
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageTitle,
    "description": metaDescription,
    "url": canonicalUrl,
    "mainEntity": {
      "@type": pageType === 'jobs' ? "JobPosting" : "LocalBusiness",
      "name": `${role.label} ${pageType === 'jobs' ? 'Opportunities' : 'Services'} in ${city.city}`,
      "description": role.description,
      "location": {
        "@type": "Place",
        "name": `${city.city}, ${city.state}`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": city.city,
          "addressRegion": city.state,
          "addressCountry": "US"
        }
      },
      ...(pageType === 'jobs' && {
        "occupationalCategory": role.category,
        "estimatedSalary": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": {
            "@type": "QuantitativeValue",
            "value": role.avgSalary,
            "unitText": "YEAR"
          }
        }
      })
    }
  };

  const tldrText = `Looking for ${role.label.toLowerCase()} ${pageType} in ${city.city}? EmviApp connects beauty professionals with top opportunities. Average ${role.label.toLowerCase()} salary: $${role.avgSalary.toLocaleString()}/year. ${city.population.toLocaleString()} residents, growing beauty market.`;

  const getSearchUrl = (type: 'jobs' | 'salons' | 'artists') => {
    return generateSearchUrl(type, city, role);
  };

  const getSignupUrl = (contentType: string = 'cta-hero') => {
    const qp = new URLSearchParams({
      role: role.slug,
      city: city.slug,
    });
    qp.append("next", "/");
    
    const utm = buildUTM({
      source: "seo",
      medium: "organic", 
      campaign: `${pageType}-in-${city.slug}-${role.slug}`,
      content: contentType,
    });
    
    return `/auth/signup?${qp.toString()}&${utm}`;
  };

  const handleSignupClick = (contentType: string = 'cta-hero') => {
    // Track click event
    window.dispatchEvent(new CustomEvent("lander_signup_click", {
      detail: { route: pageType, city: city.slug, role: role.slug }
    }));
    
    // Track GA4 if available
    trackGA4Event('lander_signup_click', {
      route_prefix: pageType,
      city: city.slug,
      role: role.slug
    });
    
    window.location.href = getSignupUrl(contentType);
  };

  const neighborhoods = [
    'Downtown', 'Midtown', 'Uptown', 'Historic District',
    'Arts District', 'Business District', 'Suburban Areas'
  ];

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        
        {/* Keywords */}
        <meta name="keywords" content={[
          `${role.label.toLowerCase()} ${pageType} ${city.city}`,
          `${role.label.toLowerCase()} careers ${city.city} ${city.state}`,
          `${city.city} ${role.label.toLowerCase()} positions`,
          `${city.city} ${city.state} ${role.label.toLowerCase()} hiring`,
          `${role.label.toLowerCase()} near me ${city.city}`,
          ...role.synonyms.map(syn => `${syn} ${city.city}`)
        ].join(', ')} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(pageSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Header Section */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
                <MapPin className="h-4 w-4" />
                <span>{city.city}, {city.state}</span>
                {city.metro && (
                  <>
                    <span>•</span>
                    <span>{city.metro}</span>
                  </>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {pageTitle}
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {role.description} Connect with top {pageType} in {city.city} and advance your beauty career.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* TL;DR Section */}
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Star className="h-5 w-5" />
                TL;DR - Quick Facts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800 text-lg leading-relaxed">
                {tldrText}
              </p>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Average Pay & Demand */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Average Pay & Market Demand
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-700">
                        ${role.avgSalary.toLocaleString()}
                      </div>
                      <div className="text-sm text-green-600">Average Annual Salary</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-700">
                        {city.population.toLocaleString()}
                      </div>
                      <div className="text-sm text-blue-600">Local Population</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700">
                    {role.label} professionals in {city.city} earn competitive salaries with strong job growth. 
                    The beauty industry in {city.metro || city.city} is thriving, offering excellent career 
                    opportunities for skilled professionals.
                  </p>
                </CardContent>
              </Card>

              {/* Top Neighborhoods */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-purple-600" />
                    Top Areas in {city.city}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {neighborhoods.map((neighborhood, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-700">{neighborhood}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-600 mt-4 text-sm">
                    Popular locations for {role.label.toLowerCase()} {pageType} across {city.city}, {city.state}.
                  </p>
                </CardContent>
              </Card>

              {/* Certification & Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-indigo-600" />
                    Requirements & Certification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-indigo-600 text-sm font-semibold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">State License Required</h4>
                        <p className="text-gray-600 text-sm">Valid {city.state} beauty license for {role.label.toLowerCase()} practice.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-indigo-600 text-sm font-semibold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Professional Training</h4>
                        <p className="text-gray-600 text-sm">Completed cosmetology or specialized {role.category} program.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-indigo-600 text-sm font-semibold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Portfolio & Experience</h4>
                        <p className="text-gray-600 text-sm">Demonstrated skills and client service experience preferred.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* How to Get Hired */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                    How to Get Hired (3 Steps)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-700 font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Build Your Profile</h4>
                        <p className="text-gray-600">Create a standout portfolio showcasing your {role.label.toLowerCase()} skills and experience.</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-700 font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Apply to Top {pageType === 'jobs' ? 'Jobs' : 'Salons'}</h4>
                        <p className="text-gray-600">Browse and apply to {pageType} that match your skills and career goals in {city.city}.</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-700 font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Start Your Career</h4>
                        <p className="text-gray-600">Connect with employers and begin your beauty career journey in {city.city}.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA Card */}
              <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Ready to Start?</h3>
                  <p className="mb-6 text-purple-100">
                    Join thousands of beauty professionals finding their dream {pageType} in {city.city}.
                  </p>
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-white text-purple-600 hover:bg-gray-100"
                      onClick={() => window.location.href = getSearchUrl(pageType)}
                    >
                      <Briefcase className="h-4 w-4 mr-2" />
                      Find {pageType === 'jobs' ? 'Work' : 'Salons'}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full border-white text-white hover:bg-white hover:text-purple-600"
                      onClick={() => window.location.href = getSearchUrl('artists')}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Explore Artists
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full border-white text-white hover:bg-white hover:text-purple-600"
                      onClick={() => handleSignupClick('cta-sidebar')}
                    >
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Join EmviApp — Free
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Market Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="font-semibold">Growing Demand</div>
                      <div className="text-sm text-gray-600">Beauty industry expanding</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-semibold">Career Growth</div>
                      <div className="text-sm text-gray-600">Multiple advancement paths</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <div>
                      <div className="font-semibold">Top Rated Platform</div>
                      <div className="text-sm text-gray-600">Trusted by professionals</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Searches */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Searches</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {role.synonyms.slice(0, 4).map((synonym, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start text-left h-auto p-2"
                        onClick={() => window.location.href = getSearchUrl(pageType)}
                      >
                        <span className="text-sm">{synonym} in {city.city}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgrammaticLander;
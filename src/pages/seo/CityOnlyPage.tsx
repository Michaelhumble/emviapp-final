import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SEO_KEYWORDS } from '@/data/seo-keywords';
import { SEO_ROLES } from '@/data/seo-roles';
import { SEO_LOCATIONS } from '@/data/seo-locations';
import FAQSchema, { BEAUTY_FAQS, SALON_FAQS } from '@/components/seo/FAQSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import InternalLinkSystem from '@/components/seo/InternalLinkSystem';

const CityOnlyPage: React.FC = () => {
  const { city } = useParams<{ city: string }>();
  
  const locationData = SEO_LOCATIONS.find(loc => loc.id === city);
  const cityKeywords = { searchVolume: 5000 }; // Default search volume
  
  if (!locationData) {
    return <div>City not found</div>;
  }

  const title = `Beauty Jobs in ${locationData.fullName} | Salons & Spas | EmviApp`;
  const description = `Find premium beauty jobs in ${locationData.fullName}. ${cityKeywords.searchVolume}+ monthly job searches. Browse nail tech, hair stylist, barber, spa & massage positions. Competitive pay, flexible schedules. Apply today!`;
  
  const topCategories = SEO_ROLES.slice(0, 8);
  
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://www.emvi.app/seo/city/${city}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://www.emvi.app/seo/city/${city}`} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      
      <BreadcrumbSchema />
      <FAQSchema faqs={[...BEAUTY_FAQS.slice(0, 3), ...SALON_FAQS.slice(0, 2)]} pageTitle={`Beauty Jobs in ${locationData.city} FAQ`} />
      
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Beauty Jobs in {locationData.fullName}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Discover the best beauty career opportunities in {locationData.city}. 
                Connect with top salons, spas, and beauty businesses in the {locationData.city} area.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <h3 className="text-2xl font-bold text-primary mb-2">{cityKeywords.searchVolume}+</h3>
                  <p className="text-muted-foreground">Monthly Job Searches</p>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <h3 className="text-2xl font-bold text-primary mb-2">150+</h3>
                  <p className="text-muted-foreground">Beauty Businesses</p>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <h3 className="text-2xl font-bold text-primary mb-2">25+</h3>
                  <p className="text-muted-foreground">Job Categories</p>
                </div>
              </div>
            </div>

            {/* Job Search CTA */}
            <div className="bg-card p-8 rounded-lg mb-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Find Your Perfect Beauty Job in {locationData.city}</h2>
              <p className="text-muted-foreground mb-6">
                Browse hundreds of beauty positions from entry-level to senior management
              </p>
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                View {locationData.city} Beauty Jobs
              </button>
            </div>

            {/* Top Categories Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8">Popular Beauty Categories in {locationData.city}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {topCategories.map((role) => (
                  <a
                    key={role.id}
                    href={`/seo/${role.id}/${city}`}
                    className="bg-card p-4 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-foreground mb-1">{role.pluralName}</h3>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* City Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold mb-4">Why Choose {locationData.city}?</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Growing beauty industry market</li>
                  <li>• Competitive salary ranges</li>
                  <li>• Diverse clientele and opportunities</li>
                  <li>• Strong professional community</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Available Positions</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Full-time and part-time roles</li>
                  <li>• Commission and hourly positions</li>
                  <li>• Booth rental opportunities</li>
                  <li>• Management and ownership paths</li>
                </ul>
              </div>
            </div>

            {/* Salary Information */}
            <div className="bg-secondary/30 p-8 rounded-lg mb-12">
              <h3 className="text-2xl font-bold mb-4">Average Beauty Professional Salaries in {locationData.city}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-lg font-semibold text-primary">$35-55K</p>
                  <p className="text-sm text-muted-foreground">Nail Technicians</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-primary">$40-65K</p>
                  <p className="text-sm text-muted-foreground">Hair Stylists</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-primary">$35-50K</p>
                  <p className="text-sm text-muted-foreground">Massage Therapists</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-primary">$30-45K</p>
                  <p className="text-sm text-muted-foreground">Estheticians</p>
                </div>
              </div>
            </div>

            {/* Internal Linking System */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8">Explore More Opportunities</h2>
              <InternalLinkSystem 
                currentLocation={city}
                type="city-hub"
                maxLinks={12}
              />
            </div>

            {/* CTA Section */}
            <div className="text-center bg-primary/10 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Start Your Beauty Career in {locationData.city}</h2>
              <p className="text-muted-foreground mb-6">
                Join the thriving beauty community in {locationData.fullName}. Find your next opportunity today.
              </p>
              <div className="space-x-4">
                <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Search Jobs
                </button>
                <button className="bg-transparent border border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                  Find Salons
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CityOnlyPage;
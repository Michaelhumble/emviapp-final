import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SEO_KEYWORDS } from '@/data/seo-keywords';
import { SEO_ROLES } from '@/data/seo-roles';
import { SEO_LOCATIONS } from '@/data/seo-locations';
import FAQSchema, { BEAUTY_FAQS } from '@/components/seo/FAQSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import InternalLinkSystem from '@/components/seo/InternalLinkSystem';

const CategoryOnlyPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  
  const roleData = SEO_ROLES.find(role => role.id === category);
  const keywordData = SEO_KEYWORDS.services.find(service => service.keyword.toLowerCase().includes(roleData?.name.toLowerCase() || ''));
  
  if (!roleData) {
    return <div>Category not found</div>;
  }

  const title = `${roleData.pluralName} Jobs & Career Opportunities | EmviApp`;
  const description = `Find the best ${roleData.name.toLowerCase()} jobs and career opportunities. Browse hundreds of ${roleData.pluralName.toLowerCase()} positions across the US. Join thousands of beauty professionals on EmviApp.`;
  
  const topCities = SEO_LOCATIONS.slice(0, 12);
  
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://www.emvi.app/seo/category/${category}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://www.emvi.app/seo/category/${category}`} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      
      <BreadcrumbSchema />
      <FAQSchema faqs={BEAUTY_FAQS} pageTitle={`${roleData.pluralName} Jobs FAQ`} />
      
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {roleData.pluralName} Jobs & Opportunities
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Discover thousands of {roleData.name.toLowerCase()} positions nationwide. 
                Connect with top beauty salons and advance your career in the beauty industry.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <h3 className="text-2xl font-bold text-primary mb-2">15K+</h3>
                  <p className="text-muted-foreground">Monthly Job Searches</p>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <h3 className="text-2xl font-bold text-primary mb-2">500+</h3>
                  <p className="text-muted-foreground">Active Employers</p>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <h3 className="text-2xl font-bold text-primary mb-2">50+</h3>
                  <p className="text-muted-foreground">Cities Covered</p>
                </div>
              </div>
            </div>

            {/* Job Search CTA */}
            <div className="bg-card p-8 rounded-lg mb-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Start Your {roleData.name} Career Today</h2>
              <p className="text-muted-foreground mb-6">
                Browse {roleData.name.toLowerCase()} positions from entry-level to senior roles
              </p>
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                View {roleData.pluralName} Jobs
              </button>
            </div>

            {/* Top Cities Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8">Top Cities for {roleData.pluralName}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {topCities.map((location) => (
                  <a
                    key={location.id}
                    href={`/seo/${category}/${location.id}`}
                    className="bg-card p-4 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-foreground mb-1">{location.city}</h3>
                    <p className="text-sm text-muted-foreground">{location.state}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Career Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold mb-4">Career Path</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Entry-level {roleData.name.toLowerCase()} positions</li>
                  <li>• Senior {roleData.name.toLowerCase()} roles</li>
                  <li>• Management and training positions</li>
                  <li>• Freelance and contract opportunities</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Requirements</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Valid state license (where required)</li>
                  <li>• Professional certification</li>
                  <li>• Portfolio of work</li>
                  <li>• Customer service skills</li>
                </ul>
              </div>
            </div>

            {/* Internal Linking System */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8">Explore Related Opportunities</h2>
              <InternalLinkSystem 
                currentRole={category}
                type="category-hub"
                maxLinks={12}
              />
            </div>

            {/* CTA Section */}
            <div className="text-center bg-primary/10 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Ready to Find Your Dream {roleData.name} Job?</h2>
              <p className="text-muted-foreground mb-6">
                Join thousands of beauty professionals who found their perfect position through EmviApp
              </p>
              <div className="space-x-4">
                <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Browse Jobs
                </button>
                <button className="bg-transparent border border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                  Post Your Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryOnlyPage;
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Users, Star, Briefcase, Building2 } from 'lucide-react';
import { PRIORITY_CITIES, BEAUTY_CATEGORIES, generatePageMeta, generateBreadcrumbs, meetsContentThreshold } from '@/lib/programmatic';
import ComprehensiveSEO from '@/components/seo/ComprehensiveSEO';

const CityLandingPage = () => {
  const { citySlug, categorySlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    jobCount: 0,
    salonCount: 0,
    artistCount: 0
  });

  // Find city and category data
  const city = PRIORITY_CITIES.find(c => c.slug === citySlug);
  const category = BEAUTY_CATEGORIES.find(c => c.slug === categorySlug);

  useEffect(() => {
    // Simulate data loading - in real app, fetch from Supabase
    const loadData = async () => {
      setLoading(true);
      // Mock data based on city population for realistic numbers
      const populationFactor = city ? city.population / 1000000 : 0.5;
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      
      setData({
        jobCount: Math.floor(Math.random() * 20 + 5) * populationFactor,
        salonCount: Math.floor(Math.random() * 15 + 3) * populationFactor,
        artistCount: Math.floor(Math.random() * 50 + 10) * populationFactor
      });
      setLoading(false);
    };

    if (city && category) {
      loadData();
    }
  }, [citySlug, categorySlug, city]);

  if (!city || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600">The requested city or category could not be found.</p>
        </div>
      </div>
    );
  }

  const meta = generatePageMeta(city, category);
  const breadcrumbs = generateBreadcrumbs(city, category);
  const showPage = meetsContentThreshold({ 
    jobCount: data.jobCount, 
    salonCount: data.salonCount,
    contentLength: 800 
  });

  // Generate FAQ structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How many ${category.name.toLowerCase()} are available in ${city.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `There are currently ${Math.floor(data.jobCount)} active ${category.name.toLowerCase()} positions in ${city.name}, ${city.state} on EmviApp.`
        }
      },
      {
        "@type": "Question", 
        "name": `What's the average salary for ${category.name.toLowerCase()} in ${city.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${category.name} salaries in ${city.name} vary by experience and location, typically ranging from $35,000 to $85,000 annually.`
        }
      },
      {
        "@type": "Question",
        "name": `How do I find the best beauty salons in ${city.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `EmviApp features ${Math.floor(data.salonCount)} verified beauty salons in ${city.name}. Browse by ratings, services, and location to find the perfect match.`
        }
      }
    ]
  };

  if (loading) {
    return (
      <>
        <ComprehensiveSEO
          title={meta.title}
          description={meta.description}
          canonicalUrl={meta.canonical}
          structuredData={[faqSchema]}
          breadcrumbs={breadcrumbs}
          noIndex={!showPage}
        />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <ComprehensiveSEO
        title={meta.title}
        description={meta.description}
        canonicalUrl={meta.canonical}
        structuredData={[faqSchema]}
        breadcrumbs={breadcrumbs}
        noIndex={!showPage}
        tags={meta.keywords}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 mr-2" />
                <span className="text-lg font-medium">{city.name}, {city.state}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {category.name} in {city.name}
              </h1>
              <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
                {category.description} Connect with {city.name}'s top beauty salons and discover your next career opportunity.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Briefcase className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{Math.floor(data.jobCount)}</div>
                  <div className="text-sm">Active Jobs</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Building2 className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{Math.floor(data.salonCount)}</div>
                  <div className="text-sm">Partner Salons</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Users className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{Math.floor(data.artistCount)}</div>
                  <div className="text-sm">Professionals</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* About Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {category.name} Opportunities in {city.name}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                {city.name} is home to a thriving beauty industry with numerous opportunities for {category.name.toLowerCase()}. 
                The city's diverse population of {city.population.toLocaleString()} creates high demand for professional beauty services.
              </p>
              <p>
                Whether you're an experienced professional or just starting your career, {city.name} offers competitive salaries, 
                diverse clientele, and growth opportunities in the beauty sector. EmviApp connects you with the city's top 
                salons and beauty establishments.
              </p>
            </div>
          </section>

          {/* Quick Links */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Jobs</h3>
              <p className="text-gray-600 mb-4">Discover {category.name.toLowerCase()} positions in {city.name}</p>
              <Link 
                to={`/jobs?category=${categorySlug}&location=${citySlug}`}
                className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Browse {Math.floor(data.jobCount)} Jobs
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Salons</h3>
              <p className="text-gray-600 mb-4">Connect with leading beauty establishments</p>
              <Link 
                to={`/salons?city=${citySlug}&category=${categorySlug}`}
                className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                View {Math.floor(data.salonCount)} Salons
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Local Artists</h3>
              <p className="text-gray-600 mb-4">Meet {city.name}'s talented professionals</p>
              <Link 
                to={`/artists?specialty=${categorySlug}&location=${citySlug}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                See {Math.floor(data.artistCount)} Artists
              </Link>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-8">
              {faqSchema.mainEntity.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {faq.name}
                  </h3>
                  <p className="text-gray-600">
                    {faq.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default CityLandingPage;
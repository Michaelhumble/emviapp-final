import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Briefcase, Star, ArrowRight } from 'lucide-react';

interface CityPageProps {
  citySlug?: string;
  categorySlug?: string;
}

interface CityData {
  name: string;
  state: string;
  population: string;
  averageSalary: string;
  jobCount: number;
  topEmployers: string[];
  description: string;
}

interface CategoryData {
  name: string;
  displayName: string;
  description: string;
  averageSalary: string;
  requiredSkills: string[];
  careerPath: string[];
}

const CITY_DATA: Record<string, CityData> = {
  'houston-tx': {
    name: 'Houston',
    state: 'Texas',
    population: '2.3M',
    averageSalary: '$45,000',
    jobCount: 1250,
    topEmployers: ['Salon Suites', 'Beauty Brands', 'Independent Salons'],
    description: 'Houston\'s diverse beauty market offers excellent opportunities for professionals in all specialties.'
  },
  'los-angeles-ca': {
    name: 'Los Angeles',
    state: 'California', 
    population: '4.0M',
    averageSalary: '$52,000',
    jobCount: 2100,
    topEmployers: ['Hollywood Salons', 'Beverly Hills Spas', 'Chain Salons'],
    description: 'The entertainment capital offers premium beauty opportunities with celebrity clientele.'
  },
  'chicago-il': {
    name: 'Chicago',
    state: 'Illinois',
    population: '2.7M', 
    averageSalary: '$47,000',
    jobCount: 1400,
    topEmployers: ['Salon Chains', 'Boutique Salons', 'Hotel Spas'],
    description: 'Chicago\'s vibrant beauty scene combines traditional techniques with modern trends.'
  }
};

const CATEGORY_DATA: Record<string, CategoryData> = {
  'nails': {
    name: 'nails',
    displayName: 'Nail Technician',
    description: 'Nail technicians provide manicures, pedicures, and nail art services.',
    averageSalary: '$35,000',
    requiredSkills: ['Nail care', 'Art design', 'Sanitation', 'Customer service'],
    careerPath: ['Entry Level', 'Senior Tech', 'Salon Owner', 'Educator']
  },
  'hair': {
    name: 'hair',
    displayName: 'Hair Stylist',
    description: 'Hair stylists cut, color, and style hair for diverse clientele.',
    averageSalary: '$42,000',
    requiredSkills: ['Cutting techniques', 'Color theory', 'Styling', 'Product knowledge'],
    careerPath: ['Assistant', 'Stylist', 'Senior Stylist', 'Salon Owner']
  },
  'barber': {
    name: 'barber',
    displayName: 'Barber',
    description: 'Barbers specialize in men\'s haircuts, shaves, and grooming services.',
    averageSalary: '$40,000',
    requiredSkills: ['Precision cutting', 'Straight razor', 'Beard trimming', 'Men\'s styling'],
    careerPath: ['Apprentice', 'Barber', 'Master Barber', 'Shop Owner']
  }
};

const CityPage: React.FC<CityPageProps> = () => {
  const { citySlug, categorySlug } = useParams<{ citySlug: string; categorySlug: string }>();
  
  const cityData = citySlug ? CITY_DATA[citySlug] : null;
  const categoryData = categorySlug ? CATEGORY_DATA[categorySlug] : null;

  if (!cityData || !categoryData) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
            <p className="text-muted-foreground mb-4">The requested city or category could not be found.</p>
            <Button asChild>
              <a href="/jobs">Browse All Jobs</a>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const pageTitle = `${categoryData.displayName} Jobs in ${cityData.name}, ${cityData.state} | EmviApp`;
  const pageDescription = `Find ${categoryData.displayName.toLowerCase()} opportunities in ${cityData.name}, ${cityData.state}. Average salary ${categoryData.averageSalary}. ${cityData.jobCount}+ active positions.`;

  // FAQ JSON-LD structured data
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How much do ${categoryData.displayName.toLowerCase()}s make in ${cityData.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${categoryData.displayName}s in ${cityData.name}, ${cityData.state} earn an average of ${categoryData.averageSalary} annually, with experienced professionals earning significantly more.`
        }
      },
      {
        "@type": "Question", 
        "name": `What skills are required for ${categoryData.displayName.toLowerCase()} jobs in ${cityData.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Key skills include: ${categoryData.requiredSkills.join(', ')}. Professional licensing and certification are typically required.`
        }
      },
      {
        "@type": "Question",
        "name": `How do I find ${categoryData.displayName.toLowerCase()} jobs in ${cityData.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Use EmviApp to browse current openings, connect with local salons, and apply directly. We have ${cityData.jobCount}+ active positions in the ${cityData.name} area.`
        }
      }
    ]
  };

  // ItemList JSON-LD for job listings
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${categoryData.displayName} Jobs in ${cityData.name}`,
    "description": pageDescription,
    "numberOfItems": cityData.jobCount,
    "itemListElement": Array.from({ length: Math.min(5, cityData.jobCount) }, (_, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "JobPosting",
        "title": `${categoryData.displayName} - ${cityData.name}`,
        "description": `Exciting ${categoryData.displayName.toLowerCase()} opportunity in ${cityData.name}`,
        "hiringOrganization": {
          "@type": "Organization",
          "name": cityData.topEmployers[i % cityData.topEmployers.length]
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": cityData.name,
            "addressRegion": cityData.state
          }
        }
      }
    }))
  };

  return (
    <Layout>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://www.emvi.app/cities/${citySlug}/${categorySlug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.emvi.app/cities/${citySlug}/${categorySlug}`} />
        
        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(faqJsonLd)}
        </script>
        <script type="application/ld+json"> 
          {JSON.stringify(itemListJsonLd)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-primary" />
                <Badge variant="secondary">{cityData.state}</Badge>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                {categoryData.displayName} Jobs in {cityData.name}
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                {pageDescription}
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{cityData.population} residents</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>{cityData.jobCount}+ active jobs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>Avg. ${categoryData.averageSalary}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href={`/jobs?location=${citySlug}&category=${categorySlug}`}>
                    View {categoryData.displayName} Jobs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/post-job">Post a Job</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Market Overview */}
        <section className="py-16 px-4 bg-card/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  {cityData.name} Beauty Market Overview  
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {cityData.description}
                </p>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-background rounded-lg">
                    <span className="font-medium">Average Salary</span>
                    <Badge variant="default">{categoryData.averageSalary}</Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-background rounded-lg">
                    <span className="font-medium">Active Positions</span>
                    <Badge variant="default">{cityData.jobCount}+</Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-background rounded-lg">
                    <span className="font-medium">Top Employers</span>
                    <span className="text-sm text-muted-foreground">
                      {cityData.topEmployers.slice(0, 2).join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>{categoryData.displayName} Career Path</CardTitle>
                  <CardDescription>
                    Typical progression in {cityData.name}'s beauty industry
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categoryData.careerPath.map((stage, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <span>{stage}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Required Skills */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Essential Skills for {categoryData.displayName}s
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryData.requiredSkills.map((skill, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{skill}</h3>
                    <p className="text-sm text-muted-foreground">
                      Essential for success in {cityData.name}'s market
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-card/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {faqJsonLd.mainEntity.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.acceptedAnswer.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your {categoryData.displayName} Career in {cityData.name}?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of beauty professionals finding their perfect opportunities
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href={`/jobs?location=${citySlug}&category=${categorySlug}`}>
                  Browse {categoryData.displayName} Jobs
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/artists">Create Artist Profile</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CityPage;
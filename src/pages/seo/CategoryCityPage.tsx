import React from 'react';
import { useParams } from 'react-router-dom';
import { generateSEOTitle, generateSEODescription } from '@/data/seo-keywords';
import ComprehensiveSEO from '@/components/seo/ComprehensiveSEO';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema, { BEAUTY_FAQS } from '@/components/seo/FAQSchema';
import JobPostingSchema from '@/components/seo/JobPostingSchema';
import { SEO_ROLES } from '@/data/seo-roles';
import { SEO_LOCATIONS } from '@/data/seo-locations';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, Star, Users } from 'lucide-react';

const CategoryCityPage: React.FC = () => {
  const { category, cityState } = useParams<{ category: string; cityState: string }>();
  
  const roleData = SEO_ROLES.find(role => role.id === category);
  const locationData = SEO_LOCATIONS.find(loc => loc.id === cityState);
  
  if (!roleData || !locationData) {
    return <div>Page not found</div>;
  }

  const pageTitle = generateSEOTitle(category!, locationData.city, locationData.state);
  const pageDescription = generateSEODescription(category!, locationData.city, locationData.state);

  // Mock job data for schema
  const mockJobs = [
    {
      id: `${category}-${cityState}-1`,
      title: `Senior ${roleData.name} Technician`,
      description: `Join our team as a ${roleData.name} professional in ${locationData.fullName}`,
      company: 'Premium Beauty Salon',
      location: locationData.fullName,
      compensationDetails: '$25-35/hour plus tips',
      compensationType: 'hourly',
      category: category!,
      createdAt: new Date().toISOString()
    }
  ];

  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.emvi.app' },
    { name: 'Beauty Artists', url: 'https://www.emvi.app/artists' },
    { name: roleData.pluralName, url: `https://www.emvi.app/artists/${category}` },
    { name: locationData.fullName, url: `https://www.emvi.app/artists/${category}/${cityState}` }
  ];

  const localFAQs = [
    {
      question: `How many ${roleData.name} jobs are available in ${locationData.fullName}?`,
      answer: `${locationData.fullName} has a thriving beauty industry with numerous opportunities for ${roleData.pluralName}. The market continues to grow with new salons and spas opening regularly.`
    },
    {
      question: `What is the average salary for ${roleData.pluralName} in ${locationData.fullName}?`,
      answer: `${roleData.name} professional salaries in ${locationData.fullName} typically range from $25,000 to $60,000 annually, with experienced professionals earning significantly more through tips and commission.`
    },
    {
      question: `Do I need a license to work as a ${roleData.name} professional in ${locationData.state}?`,
      answer: `Yes, ${locationData.state} requires proper licensing for ${roleData.pluralName}. Contact your state cosmetology board for specific requirements and approved training programs.`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <ComprehensiveSEO 
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={`https://www.emvi.app/artists/${category}/${cityState}`}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema faqs={[...localFAQs, ...BEAUTY_FAQS.slice(0, 2)]} />
      {mockJobs.map(job => (
        <JobPostingSchema key={job.id} job={job} />
      ))}

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {roleData.pluralName} in {locationData.fullName}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground">
              Discover premium {roleData.name.toLowerCase()} opportunities in {locationData.fullName}.
              Connect with top salons and grow your beauty career.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Briefcase className="mr-2 h-5 w-5" />
                Browse Jobs
              </Button>
              <Button size="lg" variant="outline">
                <Users className="mr-2 h-5 w-5" />
                View Artists
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-4 text-2xl font-bold text-foreground">50+ Locations</h3>
              <p className="text-muted-foreground">Active salons hiring in {locationData.fullName}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-4 text-2xl font-bold text-foreground">100+ Jobs</h3>
              <p className="text-muted-foreground">{roleData.name} positions available now</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-4 text-2xl font-bold text-foreground">Top Rated</h3>
              <p className="text-muted-foreground">Premium salons and spas</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-foreground">
            Your {roleData.name} Career in {locationData.fullName}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            {locationData.fullName} offers excellent opportunities for {roleData.pluralName} with its vibrant beauty scene, 
            diverse clientele, and growing demand for professional services. Whether you're starting your career or 
            looking to advance, our platform connects you with the best opportunities in the area.
          </p>
        </div>

        {/* Job Categories */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-card-foreground">Full-Time Positions</h3>
            <p className="mt-2 text-muted-foreground">
              Stable career opportunities with benefits, consistent income, and growth potential.
            </p>
          </div>
          <div className="rounded-lg bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-card-foreground">Part-Time Work</h3>
            <p className="mt-2 text-muted-foreground">
              Flexible schedules perfect for balancing work with other commitments.
            </p>
          </div>
          <div className="rounded-lg bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-card-foreground">Freelance & Contract</h3>
            <p className="mt-2 text-muted-foreground">
              Independent work opportunities with competitive compensation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCityPage;
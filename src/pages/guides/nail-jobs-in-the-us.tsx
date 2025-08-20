import React from 'react';
import Layout from '@/components/layout/Layout';
import BaseSEO from '@/components/seo/BaseSEO';
import { buildBreadcrumbJsonLd } from '@/components/seo/jsonld';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NailJobsGuide: React.FC = () => {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: 'https://www.emvi.app' },
    { name: 'Guides', url: 'https://www.emvi.app/guides' },
    { name: 'Nail Jobs in the US', url: 'https://www.emvi.app/guides/nail-jobs-in-the-us' }
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Nail Jobs in the US: The Complete Guide (2025)",
    "description": "Complete guide to nail technician jobs in the US. Discover salaries by city, demand trends, licensing requirements, and where to find the best opportunities.",
    "author": {
      "@type": "Organization",
      "name": "EmviApp"
    },
    "publisher": {
      "@type": "Organization",
      "name": "EmviApp",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.emvi.app/logo.png"
      }
    },
    "datePublished": "2025-01-01",
    "dateModified": "2025-01-01",
    "image": "https://www.emvi.app/og-nail-jobs-guide.jpg",
    "url": "https://www.emvi.app/guides/nail-jobs-in-the-us"
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the average salary for nail technicians in the US?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The average salary for nail technicians in the US ranges from $25,000 to $45,000 annually, with top earners in major cities like New York and Los Angeles making $50,000+. Hourly rates typically range from $12-25 per hour plus tips."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need a license to work as a nail technician?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all states require nail technicians to be licensed. Requirements typically include completing 300-600 hours of training at a state-approved school and passing written and practical exams."
        }
      },
      {
        "@type": "Question",
        "name": "Which cities have the highest demand for nail technicians?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cities with the highest demand include New York, Los Angeles, Miami, Las Vegas, Atlanta, and Houston. These metropolitan areas offer the most job opportunities and highest earning potential."
        }
      },
      {
        "@type": "Question",
        "name": "Can nail technicians work independently?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, many nail technicians work as independent contractors, rent booth space in salons, or operate their own nail studios. This provides more flexibility and potentially higher earnings."
        }
      },
      {
        "@type": "Question",
        "name": "What skills are most important for nail technicians?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Essential skills include technical nail care expertise, artistic ability for nail art, customer service skills, attention to detail, and knowledge of health and safety protocols."
        }
      }
    ]
  };

  return (
    <Layout>
      <BaseSEO
        title="Nail Jobs in the US: The Complete Guide (2025) | EmviApp"
        description="Complete guide to nail technician jobs in the US. Discover salaries by city, demand trends, licensing requirements, and where to find the best opportunities."
        canonical="https://www.emvi.app/guides/nail-jobs-in-the-us"
        ogImage="https://www.emvi.app/og-nail-jobs-guide.jpg"
        jsonLd={[breadcrumbJsonLd, articleJsonLd, faqJsonLd]}
        type="article"
      />

      <main className="w-full">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-primary/5 to-secondary/5">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Nail Jobs in the US: The Complete Guide (2025)
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
                Everything you need to know about nail technician careers, from salaries by city to licensing requirements and job opportunities.
              </p>
              <Link to="/jobs?category=nails">
                <Button size="lg">Browse Nail Jobs</Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Table of Contents */}
        <section className="py-8 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
                <ul className="space-y-2">
                  <li><a href="#salaries" className="text-primary hover:underline">1. Nail Tech Salaries by City</a></li>
                  <li><a href="#demand" className="text-primary hover:underline">2. Industry Demand & Growth Trends</a></li>
                  <li><a href="#licensing" className="text-primary hover:underline">3. Licensing Requirements by State</a></li>
                  <li><a href="#portfolio" className="text-primary hover:underline">4. Building Your Portfolio</a></li>
                  <li><a href="#job-search" className="text-primary hover:underline">5. Where to Find Jobs</a></li>
                  <li><a href="#faq" className="text-primary hover:underline">6. Frequently Asked Questions</a></li>
                </ul>
              </div>
            </div>
          </Container>
        </section>

        {/* Salaries Section */}
        <section id="salaries" className="py-12 bg-gray-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Nail Tech Salaries by City</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
                <p className="text-muted-foreground mb-6">
                  Nail technician salaries vary significantly by location. Here's what you can expect to earn in major US cities:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-medium">New York, NY</span>
                      <span className="text-primary font-semibold">$45,000 - $65,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-medium">Los Angeles, CA</span>
                      <span className="text-primary font-semibold">$42,000 - $60,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-medium">Miami, FL</span>
                      <span className="text-primary font-semibold">$35,000 - $50,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-medium">Las Vegas, NV</span>
                      <span className="text-primary font-semibold">$38,000 - $55,000</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-medium">Atlanta, GA</span>
                      <span className="text-primary font-semibold">$32,000 - $45,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-medium">Houston, TX</span>
                      <span className="text-primary font-semibold">$30,000 - $42,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-medium">Chicago, IL</span>
                      <span className="text-primary font-semibold">$33,000 - $47,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-medium">Phoenix, AZ</span>
                      <span className="text-primary font-semibold">$28,000 - $40,000</span>
                    </div>
                  </div>
                </div>

                <Link to="/blog/nail-tech-salary-by-city-2025">
                  <Button variant="outline">View Detailed Salary Guide</Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Demand & Trends */}
        <section id="demand" className="py-12 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Industry Demand & Growth Trends</h2>
              <div className="prose prose-gray max-w-none">
                <p>
                  The nail care industry continues to show strong growth, with employment of nail technicians 
                  projected to grow 19% from 2021 to 2031, much faster than the average for all occupations.
                </p>
                
                <h3 className="text-xl font-semibold mt-8 mb-4">Key Growth Drivers:</h3>
                <ul className="space-y-2">
                  <li>• Increasing focus on personal grooming and self-care</li>
                  <li>• Growing popularity of nail art and specialized services</li>
                  <li>• Rise of social media showcasing nail designs</li>
                  <li>• Expansion of nail salon chains and independent studios</li>
                  <li>• Male clientele growth in nail care services</li>
                </ul>

                <h3 className="text-xl font-semibold mt-8 mb-4">Emerging Trends:</h3>
                <ul className="space-y-2">
                  <li>• Eco-friendly and non-toxic nail products</li>
                  <li>• Mobile nail services and home visits</li>
                  <li>• Specialized services like Russian manicures</li>
                  <li>• Integration of nail art with fashion trends</li>
                  <li>• Advanced nail enhancement techniques</li>
                </ul>
              </div>
            </div>
          </Container>
        </section>

        {/* Licensing Section */}
        <section id="licensing" className="py-12 bg-gray-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Licensing Requirements by State</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-muted-foreground mb-6">
                  All states require nail technicians to obtain a license before practicing. Here are the general requirements:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Typical Requirements:</h3>
                    <ul className="space-y-2">
                      <li>• Complete 300-600 hours of training</li>
                      <li>• Graduate from state-approved nail school</li>
                      <li>• Pass written examination</li>
                      <li>• Pass practical skills test</li>
                      <li>• Pay licensing fees ($50-$200)</li>
                      <li>• Maintain continuing education credits</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">High-Requirement States:</h3>
                    <ul className="space-y-2">
                      <li>• California: 600 hours</li>
                      <li>• New York: 500 hours</li>
                      <li>• Florida: 500 hours</li>
                      <li>• Texas: 600 hours</li>
                      <li>• Illinois: 500 hours</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Pro Tip:</strong> Some states offer reciprocity agreements, allowing licensed 
                    technicians to transfer their license when moving. Check with your state board for details.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-12 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Building Your Portfolio</h2>
              <div className="bg-white rounded-lg p-6 border shadow-sm">
                <p className="text-muted-foreground mb-6">
                  A strong portfolio is essential for landing top nail tech positions and attracting clients. 
                  Here's what to include:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Essential Portfolio Elements:</h3>
                    <ul className="space-y-2">
                      <li>• High-quality before/after photos</li>
                      <li>• Variety of nail art styles</li>
                      <li>• Different nail shapes and lengths</li>
                      <li>• Seasonal and trending designs</li>
                      <li>• Specialized techniques (gel, acrylics)</li>
                      <li>• Client testimonials</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Photography Tips:</h3>
                    <ul className="space-y-2">
                      <li>• Use natural lighting when possible</li>
                      <li>• Clean, uncluttered backgrounds</li>
                      <li>• Multiple angles of each design</li>
                      <li>• Consistent editing style</li>
                      <li>• High resolution images</li>
                      <li>• Professional presentation</li>
                    </ul>
                  </div>
                </div>

                <Link to="/blog/nail-artist-portfolio-examples">
                  <Button variant="outline">See Portfolio Examples</Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Job Search Section */}
        <section id="job-search" className="py-12 bg-gray-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Where to Find Jobs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Online Job Platforms</h3>
                  <ul className="space-y-2">
                    <li>• <Link to="/jobs" className="text-primary hover:underline">EmviApp</Link> - Beauty industry specialists</li>
                    <li>• Indeed - General job search</li>
                    <li>• LinkedIn - Professional networking</li>
                    <li>• Glassdoor - Salary insights and reviews</li>
                    <li>• ZipRecruiter - Quick applications</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Direct Approaches</h3>
                  <ul className="space-y-2">
                    <li>• Visit salons in person</li>
                    <li>• Network at beauty trade shows</li>
                    <li>• Connect with beauty school alumni</li>
                    <li>• Social media professional groups</li>
                    <li>• Industry publications and forums</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Link to="/jobs?category=nails">
                  <Button size="lg">Browse Current Nail Tech Jobs</Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Related Articles */}
        <section className="py-12 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/blog/how-to-get-more-nail-clients" className="block p-6 border rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold mb-2">How to Get More Nail Clients</h3>
                  <p className="text-sm text-muted-foreground">Marketing strategies and client retention tips for nail technicians.</p>
                </Link>
                
                <Link to="/blog/nail-salon-interview-questions-answers" className="block p-6 border rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold mb-2">Nail Salon Interview Questions & Answers</h3>
                  <p className="text-sm text-muted-foreground">Prepare for your next nail tech interview with these common questions.</p>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-12 bg-gray-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-semibold mb-2">What is the average salary for nail technicians in the US?</h3>
                  <p className="text-muted-foreground">
                    The average salary ranges from $25,000 to $45,000 annually, with top earners in major cities making $50,000+. 
                    Hourly rates typically range from $12-25 per hour plus tips.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-semibold mb-2">Do I need a license to work as a nail technician?</h3>
                  <p className="text-muted-foreground">
                    Yes, all states require nail technicians to be licensed. Requirements typically include completing 
                    300-600 hours of training at a state-approved school and passing written and practical exams.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-semibold mb-2">Which cities have the highest demand for nail technicians?</h3>
                  <p className="text-muted-foreground">
                    Cities with the highest demand include New York, Los Angeles, Miami, Las Vegas, Atlanta, and Houston. 
                    These metropolitan areas offer the most job opportunities and highest earning potential.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-semibold mb-2">Can nail technicians work independently?</h3>
                  <p className="text-muted-foreground">
                    Yes, many nail technicians work as independent contractors, rent booth space in salons, or operate 
                    their own nail studios. This provides more flexibility and potentially higher earnings.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-semibold mb-2">What skills are most important for nail technicians?</h3>
                  <p className="text-muted-foreground">
                    Essential skills include technical nail care expertise, artistic ability for nail art, customer service 
                    skills, attention to detail, and knowledge of health and safety protocols.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </Layout>
  );
};

export default NailJobsGuide;
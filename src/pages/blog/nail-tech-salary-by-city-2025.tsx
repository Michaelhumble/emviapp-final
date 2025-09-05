import React from 'react';
import Layout from '@/components/layout/Layout';
import BaseSEO from '@/components/seo/BaseSEO';
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from '@/components/seo/jsonld';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NailTechSalaryGuide: React.FC = () => {
  const title = "Nail Tech Salary by City 2025: Complete Breakdown | EmviApp";
  const description = "Comprehensive salary data for nail technicians across major US cities in 2025. Compare earnings, hourly rates, and tips by location.";
  const canonical = "/blog/nail-tech-salary-by-city-2025";
  const publishedAt = "2025-01-01";

  const articleData = {
    title,
    description,
    author: "Michael Nguyen",
    datePublished: publishedAt,
    url: `https://www.emvi.app${canonical}`,
    image: "https://www.emvi.app/og-nail-tech-salary.jpg"
  };

  const breadcrumbData = [
    { name: "Blog", url: "https://www.emvi.app/blog" },
    { name: title, url: `https://www.emvi.app${canonical}` }
  ];

  return (
    <Layout>
      <BaseSEO
        title={title}
        description={description}
        canonical={canonical}
        jsonLd={[
          buildArticleJsonLd(articleData),
          buildBreadcrumbJsonLd(breadcrumbData)
        ]}
        type="article"
      />

      <main className="w-full">
        <article>
          {/* Hero Section */}
          <section className="py-12 bg-gradient-to-br from-primary/5 to-secondary/5">
            <Container>
              <div className="max-w-4xl mx-auto">
                  <Link to="/guides/nail-jobs-in-the-us" className="text-primary hover:underline text-sm mb-4 block">
                    ← Back to Complete Guide
                  </Link>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Nail Tech Salary by City 2025: Complete Breakdown
                  </h1>
                  <p className="text-lg text-muted-foreground mb-6">
                    Comprehensive salary data for nail technicians across major US cities. 
                    Find out what you can earn in your location and discover <Link to="/blog/how-to-find-the-best-beauty-professionals" className="text-primary hover:underline">how to find the best beauty professionals</Link> in your market.
                  </p>
                <div className="flex gap-4">
                  <Link to="/jobs?category=nails">
                    <Button>Find Nail Tech Jobs</Button>
                  </Link>
                  <Link to="/artists/nails/los-angeles-ca">
                    <Button variant="outline">Browse LA Nail Artists</Button>
                  </Link>
                </div>
              </div>
            </Container>
          </section>

          {/* Salary Table */}
          <section className="py-12 bg-white">
            <Container>
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                  2025 Nail Technician Salary by City
                </h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200 bg-white shadow-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold">City</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Annual Salary Range</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Hourly Rate</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Average Tips/Month</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Cost of Living</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-200 px-4 py-3 font-medium">New York, NY</td>
                        <td className="border border-gray-200 px-4 py-3">$45,000 - $65,000</td>
                        <td className="border border-gray-200 px-4 py-3">$18 - $28</td>
                        <td className="border border-gray-200 px-4 py-3">$1,200 - $2,000</td>
                        <td className="border border-gray-200 px-4 py-3">Very High</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-200 px-4 py-3 font-medium">Los Angeles, CA</td>
                        <td className="border border-gray-200 px-4 py-3">$42,000 - $60,000</td>
                        <td className="border border-gray-200 px-4 py-3">$17 - $26</td>
                        <td className="border border-gray-200 px-4 py-3">$1,000 - $1,800</td>
                        <td className="border border-gray-200 px-4 py-3">Very High</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 px-4 py-3 font-medium">San Francisco, CA</td>
                        <td className="border border-gray-200 px-4 py-3">$46,000 - $62,000</td>
                        <td className="border border-gray-200 px-4 py-3">$19 - $27</td>
                        <td className="border border-gray-200 px-4 py-3">$1,100 - $1,900</td>
                        <td className="border border-gray-200 px-4 py-3">Very High</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-200 px-4 py-3 font-medium">Miami, FL</td>
                        <td className="border border-gray-200 px-4 py-3">$35,000 - $50,000</td>
                        <td className="border border-gray-200 px-4 py-3">$15 - $22</td>
                        <td className="border border-gray-200 px-4 py-3">$800 - $1,400</td>
                        <td className="border border-gray-200 px-4 py-3">High</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 px-4 py-3 font-medium">Las Vegas, NV</td>
                        <td className="border border-gray-200 px-4 py-3">$38,000 - $55,000</td>
                        <td className="border border-gray-200 px-4 py-3">$16 - $24</td>
                        <td className="border border-gray-200 px-4 py-3">$900 - $1,600</td>
                        <td className="border border-gray-200 px-4 py-3">Moderate</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-200 px-4 py-3 font-medium">Atlanta, GA</td>
                        <td className="border border-gray-200 px-4 py-3">$32,000 - $45,000</td>
                        <td className="border border-gray-200 px-4 py-3">$14 - $20</td>
                        <td className="border border-gray-200 px-4 py-3">$700 - $1,200</td>
                        <td className="border border-gray-200 px-4 py-3">Moderate</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 px-4 py-3 font-medium">Houston, TX</td>
                        <td className="border border-gray-200 px-4 py-3">$30,000 - $42,000</td>
                        <td className="border border-gray-200 px-4 py-3">$13 - $19</td>
                        <td className="border border-gray-200 px-4 py-3">$650 - $1,100</td>
                        <td className="border border-gray-200 px-4 py-3">Moderate</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-200 px-4 py-3 font-medium">Chicago, IL</td>
                        <td className="border border-gray-200 px-4 py-3">$33,000 - $47,000</td>
                        <td className="border border-gray-200 px-4 py-3">$14 - $21</td>
                        <td className="border border-gray-200 px-4 py-3">$750 - $1,300</td>
                        <td className="border border-gray-200 px-4 py-3">High</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 px-4 py-3 font-medium">Phoenix, AZ</td>
                        <td className="border border-gray-200 px-4 py-3">$28,000 - $40,000</td>
                        <td className="border border-gray-200 px-4 py-3">$12 - $18</td>
                        <td className="border border-gray-200 px-4 py-3">$600 - $1,000</td>
                        <td className="border border-gray-200 px-4 py-3">Moderate</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-200 px-4 py-3 font-medium">Dallas, TX</td>
                        <td className="border border-gray-200 px-4 py-3">$31,000 - $43,000</td>
                        <td className="border border-gray-200 px-4 py-3">$13 - $19</td>
                        <td className="border border-gray-200 px-4 py-3">$700 - $1,200</td>
                        <td className="border border-gray-200 px-4 py-3">Moderate</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Salary ranges include base pay only. Total compensation including tips 
                    can be 30-50% higher. Data compiled from industry reports and job postings as of 2025.
                  </p>
                </div>
              </div>
            </Container>
          </section>

          {/* Factors Affecting Salary */}
          <section className="py-12 bg-gray-50">
            <Container>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Factors That Affect Your Salary</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Experience Level</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong>Entry Level (0-1 years):</strong> $12-16/hour</li>
                      <li>• <strong>Experienced (2-5 years):</strong> $16-22/hour</li>
                      <li>• <strong>Senior (5+ years):</strong> $22-28/hour</li>
                      <li>• <strong>Master Level/Educator:</strong> $28-35/hour</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Salon Type</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong>High-end Spas:</strong> Highest pay + benefits</li>
                      <li>• <strong>Chain Salons:</strong> Consistent pay + benefits</li>
                      <li>• <strong>Independent Salons:</strong> Variable pay</li>
                      <li>• <strong>Booth Rental:</strong> Keep 100% of earnings</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Specializations</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong>Nail Art:</strong> +$5-10/hour premium</li>
                      <li>• <strong>Gel Extensions:</strong> Higher service prices</li>
                      <li>• <strong>Luxury Services:</strong> Premium clientele</li>
                      <li>• <strong>Mobile Services:</strong> Travel surcharges</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Location Factors</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong>Tourist Areas:</strong> Higher tips</li>
                      <li>• <strong>Affluent Neighborhoods:</strong> Premium pricing</li>
                      <li>• <strong>Shopping Centers:</strong> High foot traffic</li>
                      <li>• <strong>Resort Areas:</strong> Seasonal peaks</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* FAQ Section */}
          <section className="py-12 bg-white">
            <Container>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Salary FAQs</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="font-semibold mb-2">Which city pays nail technicians the highest salary?</h3>
                    <p className="text-muted-foreground">
                      New York City typically offers the highest salaries for nail technicians, with annual earnings 
                      ranging from $45,000 to $65,000, plus substantial tips that can add $10,000-$20,000 annually.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="font-semibold mb-2">How much do nail techs make per hour?</h3>
                    <p className="text-muted-foreground">
                      Nail technicians typically earn $12-25 per hour base pay, with the potential to earn $20-40 per hour 
                      including tips. High-end salons in major cities often pay higher base rates.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="font-semibold mb-2">Do nail technicians get benefits?</h3>
                    <p className="text-muted-foreground">
                      Benefits vary by employer. Chain salons often offer health insurance, paid time off, and employee 
                      discounts. Independent contractors typically don't receive traditional benefits but have more earning flexibility.
                    </p>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        </article>
      </main>
    </Layout>
  );
};

export default NailTechSalaryGuide;
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import BaseSEO from '@/components/seo/BaseSEO';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': 'Nail Tech Salary & Commission Guide: City-by-City Breakdown for 2025',
  'description': 'City-by-city breakdown of competitive wages, commission structures, and total compensation packages for nail technicians.',
  'author': { '@type': 'Organization', 'name': 'EmviApp' },
  'publisher': {
    '@type': 'Organization',
    'name': 'EmviApp',
    'logo': { '@type': 'ImageObject', 'url': 'https://www.emvi.app/icons/emvi-master-512.png' }
  },
  'datePublished': '2025-01-15',
  'image': 'https://www.emvi.app/icons/emvi-master-512.png',
  'url': 'https://www.emvi.app/guides/nail-tech-salary-commission-guide'
};

export default function NailTechSalaryCommissionGuide() {
  return (
    <Layout>
      <Helmet>
        <title>Nail Tech Salary & Commission Guide 2025 | EmviApp</title>
        <meta name="description" content="City-by-city breakdown of nail technician wages, commission structures, and total compensation. Compare Houston, LA, Miami, NYC, and more." />
        <link rel="canonical" href="https://www.emvi.app/guides/nail-tech-salary-commission-guide" />
      </Helmet>
      <BaseSEO jsonLd={[articleSchema]} />

      <article className="py-12">
        <Container className="max-w-4xl">
          <header className="mb-12">
            <Link to="/guides" className="text-primary hover:underline mb-4 inline-block">← Back to Guides</Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nail Tech Salary & Commission Guide 2025
            </h1>
            <p className="text-xl text-muted-foreground">
              City-by-city breakdown of competitive wages, commission structures, and total compensation packages.
            </p>
          </header>

          <Card className="p-6 mb-12 bg-muted/50">
            <h2 className="font-semibold mb-4">Quick Navigation</h2>
            <nav className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              <a href="#houston" className="text-primary hover:underline">Houston, TX</a>
              <a href="#dallas" className="text-primary hover:underline">Dallas, TX</a>
              <a href="#miami" className="text-primary hover:underline">Miami, FL</a>
              <a href="#los-angeles" className="text-primary hover:underline">Los Angeles, CA</a>
              <a href="#new-york" className="text-primary hover:underline">New York, NY</a>
              <a href="#chicago" className="text-primary hover:underline">Chicago, IL</a>
              <a href="#commission" className="text-primary hover:underline">Commission Structures</a>
              <a href="#benefits" className="text-primary hover:underline">Benefits Packages</a>
            </nav>
          </Card>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2>How to Use This Guide</h2>
              <p>
                Salary data compiled from 1,500+ job postings on EmviApp in 2024-2025, plus survey responses 
                from 800+ nail technicians. Ranges reflect typical compensation for licensed technicians with 
                1-3 years experience at established salons.
              </p>
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 p-4 rounded-lg">
                <p className="font-semibold mb-2">💡 Reading the Data:</p>
                <ul>
                  <li><strong>Base range:</strong> Hourly or guaranteed minimum before commission</li>
                  <li><strong>Commission:</strong> Percentage of service revenue you keep</li>
                  <li><strong>Total comp:</strong> Base + commission + average tips annually</li>
                  <li><strong>Top earners:</strong> Experienced techs with loyal clientele at premium salons</li>
                </ul>
              </div>
            </section>

            <section id="houston" className="mb-12">
              <h2>Houston, TX</h2>
              <div className="bg-muted p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Hourly Positions</h3>
                    <ul className="space-y-2">
                      <li><strong>Entry-level:</strong> $16-$20/hour + tips</li>
                      <li><strong>Experienced:</strong> $22-$28/hour + tips</li>
                      <li><strong>Average total:</strong> $42,000-$58,000/year</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Commission Positions</h3>
                    <ul className="space-y-2">
                      <li><strong>Standard:</strong> 45-55% commission</li>
                      <li><strong>Premium salons:</strong> 50-60% commission</li>
                      <li><strong>Average total:</strong> $45,000-$65,000/year</li>
                      <li><strong>Top earners:</strong> $70,000-$85,000+</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  <strong>Cost of living impact:</strong> No state income tax. Housing costs moderate. 
                  $55k in Houston feels like $70k in Los Angeles.{' '}
                  <Link to="/jobs/nails/houston-tx" className="text-primary hover:underline">
                    View Houston nail tech jobs →
                  </Link>
                </p>
              </div>
            </section>

            <section id="dallas" className="mb-12">
              <h2>Dallas, TX</h2>
              <div className="bg-muted p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Hourly Positions</h3>
                    <ul className="space-y-2">
                      <li><strong>Entry-level:</strong> $17-$22/hour + tips</li>
                      <li><strong>Experienced:</strong> $24-$30/hour + tips</li>
                      <li><strong>Average total:</strong> $44,000-$62,000/year</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Commission Positions</h3>
                    <ul className="space-y-2">
                      <li><strong>Standard:</strong> 45-55% commission</li>
                      <li><strong>Uptown/Highland Park:</strong> 50-65% commission</li>
                      <li><strong>Average total:</strong> $47,000-$68,000/year</li>
                      <li><strong>Top earners:</strong> $75,000-$95,000+</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  <strong>Market notes:</strong> Dallas clients expect high-end service and pay premium prices. 
                  Tips average 20-25%, higher than most markets.{' '}
                  <Link to="/jobs/nails/dallas-tx" className="text-primary hover:underline">
                    View Dallas nail tech jobs →
                  </Link>
                </p>
              </div>
            </section>

            <section id="miami" className="mb-12">
              <h2>Miami, FL</h2>
              <div className="bg-muted p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Hourly Positions</h3>
                    <ul className="space-y-2">
                      <li><strong>Entry-level:</strong> $15-$19/hour + tips</li>
                      <li><strong>Experienced:</strong> $21-$27/hour + tips</li>
                      <li><strong>Average total:</strong> $40,000-$56,000/year</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Commission Positions</h3>
                    <ul className="space-y-2">
                      <li><strong>Standard:</strong> 50-60% commission (high volume)</li>
                      <li><strong>Luxury resorts:</strong> Hourly $25-$35 + tips</li>
                      <li><strong>Average total:</strong> $43,000-$62,000/year</li>
                      <li><strong>Top earners:</strong> $70,000-$85,000+</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  <strong>Bilingual bonus:</strong> Spanish speakers earn 15-20% more due to market demand. 
                  No state income tax.{' '}
                  <Link to="/jobs/nails/miami-fl" className="text-primary hover:underline">
                    View Miami nail tech jobs →
                  </Link>
                </p>
              </div>
            </section>

            <section id="los-angeles" className="mb-12">
              <h2>Los Angeles, CA</h2>
              <div className="bg-muted p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Hourly Positions</h3>
                    <ul className="space-y-2">
                      <li><strong>Entry-level:</strong> $18-$23/hour + tips</li>
                      <li><strong>Experienced:</strong> $26-$35/hour + tips</li>
                      <li><strong>Average total:</strong> $48,000-$68,000/year</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Commission Positions</h3>
                    <ul className="space-y-2">
                      <li><strong>Standard:</strong> 50-60% commission</li>
                      <li><strong>Beverly Hills/WeHo:</strong> 60-70% commission</li>
                      <li><strong>Average total:</strong> $52,000-$78,000/year</li>
                      <li><strong>Top earners:</strong> $85,000-$120,000+</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  <strong>High cost offset:</strong> Despite high salaries, rent eats significant income. 
                  Celebrity clients and editorial work boost top earners.{' '}
                  <Link to="/jobs/nails/los-angeles-ca" className="text-primary hover:underline">
                    View LA nail tech jobs →
                  </Link>
                </p>
              </div>
            </section>

            <section id="new-york" className="mb-12">
              <h2>New York, NY</h2>
              <div className="bg-muted p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Hourly Positions</h3>
                    <ul className="space-y-2">
                      <li><strong>Entry-level:</strong> $18-$24/hour + tips</li>
                      <li><strong>Experienced:</strong> $28-$38/hour + tips</li>
                      <li><strong>Average total:</strong> $50,000-$72,000/year</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Commission Positions</h3>
                    <ul className="space-y-2">
                      <li><strong>Standard:</strong> 45-55% commission</li>
                      <li><strong>Manhattan luxury:</strong> $30-$45/hour + tips</li>
                      <li><strong>Average total:</strong> $55,000-$82,000/year</li>
                      <li><strong>Top earners:</strong> $90,000-$130,000+</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  <strong>Market premium:</strong> Highest wages in US, but also highest cost of living. 
                  Fashion Week and editorial opportunities.{' '}
                  <Link to="/jobs/nails/new-york-ny" className="text-primary hover:underline">
                    View NYC nail tech jobs →
                  </Link>
                </p>
              </div>
            </section>

            <section id="chicago" className="mb-12">
              <h2>Chicago, IL</h2>
              <div className="bg-muted p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Hourly Positions</h3>
                    <ul className="space-y-2">
                      <li><strong>Entry-level:</strong> $16-$21/hour + tips</li>
                      <li><strong>Experienced:</strong> $24-$31/hour + tips</li>
                      <li><strong>Average total:</strong> $44,000-$62,000/year</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Commission Positions</h3>
                    <ul className="space-y-2">
                      <li><strong>Standard:</strong> 45-55% commission</li>
                      <li><strong>Gold Coast:</strong> 50-60% commission</li>
                      <li><strong>Average total:</strong> $46,000-$66,000/year</li>
                      <li><strong>Top earners:</strong> $72,000-$92,000+</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  <strong>Seasonal note:</strong> Winter sees 10-15% dip due to weather. Summer wedding season spikes earnings.{' '}
                  <Link to="/jobs/nails/chicago-il" className="text-primary hover:underline">
                    View Chicago nail tech jobs →
                  </Link>
                </p>
              </div>
            </section>

            <section id="commission" className="mb-12">
              <h2>Understanding Commission Structures</h2>
              <div className="space-y-6">
                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">Straight Commission (40-60%)</h3>
                  <p className="mb-3">You earn a percentage of every service you perform. No guaranteed base pay.</p>
                  <p><strong>Example:</strong> 50% commission, you do $800 in services = $400 earned + tips</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    <strong>Best for:</strong> Experienced techs with established clientele who can fill their schedule
                  </p>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">Base + Commission</h3>
                  <p className="mb-3">Hourly wage ($15-$20) plus commission (15-30%) on services over a threshold.</p>
                  <p><strong>Example:</strong> $18/hour + 20% commission on services over $500/day</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    <strong>Best for:</strong> New techs building clientele, anyone seeking income stability
                  </p>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">Booth/Chair Rental</h3>
                  <p className="mb-3">Pay weekly rent ($150-$400) and keep 100% of service revenue and tips.</p>
                  <p><strong>Example:</strong> $250/week rent, you earn $1,200/week = $950 take-home</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    <strong>Best for:</strong> Established techs who want full control and high earning potential
                  </p>
                </div>
              </div>
            </section>

            <section id="benefits" className="mb-12">
              <h2>Benefits Packages: What to Expect</h2>
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Corporate Chains (e.g., Ulta, Massage Envy)</h3>
                  <ul>
                    <li>✅ Health insurance (medical, dental, vision)</li>
                    <li>✅ 401(k) with employer match (3-5%)</li>
                    <li>✅ Paid time off (1-2 weeks after 1 year)</li>
                    <li>✅ Product discounts (20-50%)</li>
                    <li>⚠️ Lower commission rates (35-45%)</li>
                  </ul>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Mid-Size Independent Salons (3-10 locations)</h3>
                  <ul>
                    <li>⚠️ Health insurance often available after 90 days</li>
                    <li>✅ Paid holidays (6-8 days/year)</li>
                    <li>✅ Product discounts (30-40%)</li>
                    <li>✅ Continuing education budget ($300-$800/year)</li>
                    <li>✅ Higher commission rates (45-55%)</li>
                  </ul>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Small/Single-Location Salons</h3>
                  <ul>
                    <li>❌ Rarely offer health insurance</li>
                    <li>⚠️ PTO negotiable case-by-case</li>
                    <li>✅ Flexible scheduling</li>
                    <li>✅ Highest commission rates (50-65%)</li>
                    <li>✅ Family-like atmosphere</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* CTA Section */}
          <div className="mt-12 p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">Explore Jobs in Your City</h3>
            <p className="mb-6">
              Now that you know market rates, browse current openings and compare compensation packages.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              <Link to="/jobs/nails/houston-tx" className="p-3 bg-background rounded-lg hover:shadow-md text-center text-sm">
                Houston
              </Link>
              <Link to="/jobs/nails/dallas-tx" className="p-3 bg-background rounded-lg hover:shadow-md text-center text-sm">
                Dallas
              </Link>
              <Link to="/jobs/nails/miami-fl" className="p-3 bg-background rounded-lg hover:shadow-md text-center text-sm">
                Miami
              </Link>
              <Link to="/jobs/nails/los-angeles-ca" className="p-3 bg-background rounded-lg hover:shadow-md text-center text-sm">
                Los Angeles
              </Link>
              <Link to="/jobs/nails/new-york-ny" className="p-3 bg-background rounded-lg hover:shadow-md text-center text-sm">
                New York
              </Link>
              <Link to="/jobs/nails/chicago-il" className="p-3 bg-background rounded-lg hover:shadow-md text-center text-sm">
                Chicago
              </Link>
            </div>
            <div className="flex gap-3">
              <Button asChild size="lg">
                <Link to="/post-job">Post a Job</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/guides">More Guides</Link>
              </Button>
            </div>
          </div>
        </Container>
      </article>
    </Layout>
  );
}

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
  'headline': 'Interview Questions for Salon Managers: Essential Questions to Identify Top Talent',
  'description': 'Essential interview questions to identify skilled, reliable salon managers who will elevate your business.',
  'author': { '@type': 'Organization', 'name': 'EmviApp' },
  'publisher': {
    '@type': 'Organization',
    'name': 'EmviApp',
    'logo': { '@type': 'ImageObject', 'url': 'https://www.emvi.app/icons/emvi-master-512.png' }
  },
  'datePublished': '2025-01-15',
  'image': 'https://www.emvi.app/icons/emvi-master-512.png',
  'url': 'https://www.emvi.app/guides/salon-manager-interview-questions'
};

export default function SalonManagerInterviewQuestions() {
  return (
    <Layout>
      <Helmet>
        <title>Interview Questions for Salon Managers | EmviApp</title>
        <meta name="description" content="Essential interview questions to identify skilled, reliable salon managers. Includes follow-up questions and red flag responses to watch for." />
        <link rel="canonical" href="https://www.emvi.app/guides/salon-manager-interview-questions" />
      </Helmet>
      <BaseSEO jsonLd={[articleSchema]} />

      <article className="py-12">
        <Container className="max-w-4xl">
          <header className="mb-12">
            <Link to="/guides" className="text-primary hover:underline mb-4 inline-block">← Back to Guides</Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Interview Questions for Salon Managers
            </h1>
            <p className="text-xl text-muted-foreground">
              Essential questions to identify skilled, reliable managers who will elevate your business.
            </p>
          </header>

          <Card className="p-6 mb-12 bg-muted/50">
            <h2 className="font-semibold mb-4">Table of Contents</h2>
            <nav className="space-y-2">
              <a href="#leadership" className="block text-primary hover:underline">Leadership & Team Management</a>
              <a href="#operations" className="block text-primary hover:underline">Operations & Problem-Solving</a>
              <a href="#sales" className="block text-primary hover:underline">Sales & Customer Service</a>
              <a href="#conflict" className="block text-primary hover:underline">Conflict Resolution</a>
              <a href="#red-flags" className="block text-primary hover:underline">Red Flags to Watch For</a>
            </nav>
          </Card>

          <div className="prose prose-lg max-w-none">
            <section id="leadership" className="mb-12">
              <h2>Leadership & Team Management Questions</h2>
              
              <div className="space-y-8">
                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="text-primary">1. "Tell me about a time you had to let an employee go. How did you handle it?"</h3>
                  <p><strong>What you're assessing:</strong> Decision-making under pressure, professionalism, documentation</p>
                  <p><strong>Good answer includes:</strong></p>
                  <ul>
                    <li>Clear performance issues documented over time</li>
                    <li>Multiple warnings given with improvement plans</li>
                    <li>Respectful, private termination conversation</li>
                    <li>Reflection on what they learned</li>
                  </ul>
                  <p className="text-red-600 dark:text-red-400"><strong>Red flag:</strong> "I just fired them on the spot" or inability to cite specific examples</p>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="text-primary">2. "How do you motivate technicians during slow periods?"</h3>
                  <p><strong>What you're assessing:</strong> Creativity, understanding of employee psychology, proactive mindset</p>
                  <p><strong>Good answer includes:</strong></p>
                  <ul>
                    <li>Training on new techniques during downtime</li>
                    <li>Team challenges or games to boost morale</li>
                    <li>Focusing on salon maintenance, social media content</li>
                    <li>Transparent communication about business cycles</li>
                  </ul>
                  <p className="text-red-600 dark:text-red-400"><strong>Red flag:</strong> "I cut hours immediately" without other solutions</p>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="text-primary">3. "What's your approach to training new nail technicians?"</h3>
                  <p><strong>What you're assessing:</strong> Patience, structured thinking, commitment to quality</p>
                  <p><strong>Good answer includes:</strong></p>
                  <ul>
                    <li>Structured onboarding plan (shadowing, then gradual independence)</li>
                    <li>Pairing new techs with experienced mentors</li>
                    <li>Regular check-ins and feedback sessions</li>
                    <li>Setting clear 30/60/90-day performance goals</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="operations" className="mb-12">
              <h2>Operations & Problem-Solving Questions</h2>
              
              <div className="space-y-8">
                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="text-primary">4. "Walk me through how you would handle a day when three technicians call in sick."</h3>
                  <p><strong>What you're assessing:</strong> Crisis management, prioritization, customer service instincts</p>
                  <p><strong>Good answer includes:</strong></p>
                  <ul>
                    <li>Immediately assess schedule and contact clients</li>
                    <li>Offer reschedule options or other techs if possible</li>
                    <li>Jump in to cover simple services personally if licensed</li>
                    <li>Document the situation and address attendance patterns later</li>
                  </ul>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="text-primary">5. "How do you manage inventory and prevent product waste?"</h3>
                  <p><strong>What you're assessing:</strong> Attention to detail, cost consciousness, systems thinking</p>
                  <p><strong>Good answer includes:</strong></p>
                  <ul>
                    <li>Regular inventory checks (weekly or biweekly)</li>
                    <li>First-in-first-out (FIFO) rotation</li>
                    <li>Tracking product usage per service</li>
                    <li>Training staff on proper portion control</li>
                  </ul>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="text-primary">6. "What metrics do you track to measure salon performance?"</h3>
                  <p><strong>What you're assessing:</strong> Data literacy, business acumen, goal-oriented thinking</p>
                  <p><strong>Good answer includes:</strong></p>
                  <ul>
                    <li>Revenue per technician and overall daily/weekly targets</li>
                    <li>Client retention rate and rebooking percentage</li>
                    <li>Average service price and upsell rate</li>
                    <li>Employee attendance and punctuality</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="sales" className="mb-12">
              <h2>Sales & Customer Service Questions</h2>
              
              <div className="space-y-8">
                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="text-primary">7. "How do you increase retail product sales without being pushy?"</h3>
                  <p><strong>What you're assessing:</strong> Sales skills, customer service philosophy, training ability</p>
                  <p><strong>Good answer includes:</strong></p>
                  <ul>
                    <li>Educating clients on at-home care benefits</li>
                    <li>Personal product recommendations based on nail condition</li>
                    <li>Offering small samples to try before buying</li>
                    <li>Training team on product knowledge and soft selling</li>
                  </ul>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="text-primary">8. "Describe your strategy for handling negative online reviews."</h3>
                  <p><strong>What you're assessing:</strong> Professionalism under criticism, problem-solving, brand protection</p>
                  <p><strong>Good answer includes:</strong></p>
                  <ul>
                    <li>Responding publicly within 24 hours with empathy</li>
                    <li>Taking the conversation private to resolve issues</li>
                    <li>Offering to make things right (discount, redo, refund)</li>
                    <li>Learning from feedback to improve operations</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="conflict" className="mb-12">
              <h2>Conflict Resolution Questions</h2>
              
              <div className="space-y-8">
                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="text-primary">9. "Two technicians constantly argue and it's affecting team morale. What do you do?"</h3>
                  <p><strong>What you're assessing:</strong> Mediation skills, firmness, empathy</p>
                  <p><strong>Good answer includes:</strong></p>
                  <ul>
                    <li>Private conversations with each tech to understand perspectives</li>
                    <li>Joint mediation session with clear expectations</li>
                    <li>Setting boundaries (no arguments in front of clients/staff)</li>
                    <li>Follow-up to ensure resolution sticks</li>
                  </ul>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="text-primary">10. "A client demands a refund after leaving the salon. How do you handle it?"</h3>
                  <p><strong>What you're assessing:</strong> Customer service recovery, policy enforcement, judgment</p>
                  <p><strong>Good answer includes:</strong></p>
                  <ul>
                    <li>Listening fully to the complaint without defensiveness</li>
                    <li>Assessing if service was genuinely subpar or client is unreasonable</li>
                    <li>Offering solutions: redo with different tech, partial refund, store credit</li>
                    <li>Knowing when to say no to protect business/staff</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="red-flags" className="mb-12">
              <h2>Red Flags to Watch For</h2>
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-900 dark:text-red-100">🚩 Blaming Previous Employers</h3>
                  <p className="text-red-800 dark:text-red-200">"My last boss was terrible, all my coworkers were lazy"—shows lack of accountability</p>
                </div>
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-900 dark:text-red-100">🚩 Vague Answers</h3>
                  <p className="text-red-800 dark:text-red-200">Can't provide specific examples when asked behavioral questions</p>
                </div>
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-900 dark:text-red-100">🚩 Unrealistic Growth Promises</h3>
                  <p className="text-red-800 dark:text-red-200">"I'll triple your revenue in 3 months"—shows overconfidence, not realistic planning</p>
                </div>
              </div>
            </section>
          </div>

          {/* CTA Section */}
          <div className="mt-12 p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">Find Your Next Salon Manager</h3>
            <p className="mb-6">
              Use these interview questions to identify managers who will drive your salon's success. 
              Ready to post your opening?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Link to="/jobs/nails/new-york-ny" className="p-4 bg-background rounded-lg hover:shadow-md">
                <h4 className="font-semibold">Nail Jobs in New York</h4>
              </Link>
              <Link to="/jobs/nails/chicago-il" className="p-4 bg-background rounded-lg hover:shadow-md">
                <h4 className="font-semibold">Nail Jobs in Chicago</h4>
              </Link>
              <Link to="/guides/nail-salon-hiring-playbook-2025" className="p-4 bg-background rounded-lg hover:shadow-md">
                <h4 className="font-semibold">Complete Hiring Playbook</h4>
              </Link>
              <Link to="/guides/nail-tech-salary-commission-guide" className="p-4 bg-background rounded-lg hover:shadow-md">
                <h4 className="font-semibold">Salary & Commission Guide</h4>
              </Link>
            </div>
            <Button asChild size="lg">
              <Link to="/post-job">Post Manager Position</Link>
            </Button>
          </div>
        </Container>
      </article>
    </Layout>
  );
}

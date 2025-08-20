import React from 'react';
import Layout from '@/components/layout/Layout';
import BaseSEO from '@/components/seo/BaseSEO';
import { buildBreadcrumbJsonLd } from '@/components/seo/jsonld';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NailSalonInterviewQA: React.FC = () => {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: 'https://www.emvi.app' },
    { name: 'Blog', url: 'https://www.emvi.app/blog' },
    { name: 'Nail Salon Interview Questions', url: 'https://www.emvi.app/blog/nail-salon-interview-questions-answers' }
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "50+ Nail Salon Interview Questions & Answers (2025 Guide)",
    "description": "Ace your nail technician job interview with these common questions and expert answers. Preparation tips for salon interviews.",
    "author": { "@type": "Organization", "name": "EmviApp" },
    "publisher": { "@type": "Organization", "name": "EmviApp", "logo": { "@type": "ImageObject", "url": "https://www.emvi.app/logo.png" } },
    "datePublished": "2025-01-01",
    "image": "https://www.emvi.app/og-nail-interview.jpg",
    "url": "https://www.emvi.app/blog/nail-salon-interview-questions-answers"
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What should I bring to a nail technician interview?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bring your portfolio, nail license, references, resume, and basic nail tools. Dress professionally and arrive 10 minutes early."
        }
      }
    ]
  };

  return (
    <Layout>
      <BaseSEO
        title="50+ Nail Salon Interview Questions & Answers (2025 Guide) | EmviApp"
        description="Ace your nail technician job interview with these common questions and expert answers. Preparation tips for salon interviews."
        canonical="https://www.emvi.app/blog/nail-salon-interview-questions-answers"
        ogImage="https://www.emvi.app/og-nail-interview.jpg"
        jsonLd={[breadcrumbJsonLd, articleJsonLd, faqJsonLd]}
        type="article"
      />

      <main className="w-full">
        <article>
          <section className="py-12 bg-gradient-to-br from-primary/5 to-secondary/5">
            <Container>
              <div className="max-w-4xl mx-auto">
                <Link to="/guides/nail-jobs-in-the-us" className="text-primary hover:underline text-sm mb-4 block">
                  ← Back to Complete Guide
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  50+ Nail Salon Interview Questions & Answers (2025 Guide)
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Prepare for your nail technician interview with these common questions and expert answers.
                </p>
                <div className="flex gap-4">
                  <Link to="/jobs?category=nails">
                    <Button>Find Nail Tech Jobs</Button>
                  </Link>
                  <Link to="/guides/nail-jobs-in-the-us">
                    <Button variant="outline">Complete Career Guide</Button>
                  </Link>
                </div>
              </div>
            </Container>
          </section>

          <section className="py-12 bg-white">
            <Container>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Common Interview Questions</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="font-semibold mb-2">Why do you want to work as a nail technician?</h3>
                    <p className="text-muted-foreground">Focus on your passion for beauty, helping clients feel confident, and artistic creativity.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="font-semibold mb-2">What's your experience with different nail techniques?</h3>
                    <p className="text-muted-foreground">Mention specific techniques like gel application, nail art, extensions, and any specializations.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="font-semibold mb-2">How do you handle difficult clients?</h3>
                    <p className="text-muted-foreground">Emphasize patience, active listening, and finding solutions to meet client needs.</p>
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

export default NailSalonInterviewQA;
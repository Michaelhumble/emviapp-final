import React from 'react';
import Layout from '@/components/layout/Layout';
import BaseSEO from '@/components/seo/BaseSEO';
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from '@/components/seo/jsonld';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NailSalonInterviewQA: React.FC = () => {
  const postData = {
    title: "50+ Nail Salon Interview Questions & Answers (2025 Guide)",
    description: "Ace your nail technician job interview with these common questions and expert answers. Preparation tips for salon interviews.",
    author: "EmviApp Team",
    datePublished: "2025-01-01",
    dateModified: "2025-01-01",
    url: "https://www.emvi.app/blog/nail-salon-interview-questions-answers",
    image: "https://www.emvi.app/og-nail-interview.jpg"
  };

  const breadcrumbData = [
    { name: "Home", url: "https://www.emvi.app" },
    { name: "Blog", url: "https://www.emvi.app/blog" },
    { name: "Career", url: "https://www.emvi.app/blog/category/career" },
    { name: postData.title, url: postData.url }
  ];

  return (
    <Layout>
      <BaseSEO
        title={`${postData.title} | EmviApp`}
        description={postData.description}
        canonical="/blog/nail-salon-interview-questions-answers"
        jsonLd={[
          buildArticleJsonLd(postData),
          buildBreadcrumbJsonLd(breadcrumbData)
        ]}
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
                  Prepare for your nail technician interview with these common questions and expert answers. Ready to interview? Check out <Link to="/blog/how-to-find-the-best-beauty-professionals" className="text-primary hover:underline">how to find the best beauty professionals</Link> and salon opportunities.
                </p>
                <div className="flex gap-4">
                  <Link to="/jobs?category=nails">
                    <Button>Find Nail Tech Jobs</Button>
                  </Link>
                  <Link to="/salons">
                    <Button variant="outline">Browse Salons</Button>
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
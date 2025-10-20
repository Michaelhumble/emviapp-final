import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import BaseSEO from '@/components/seo/BaseSEO';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': 'Boost Salon Reviews: Scripts & Templates That Get 5-Star Reviews',
  'description': 'Proven scripts and text templates that get clients to leave 5-star reviews without sounding pushy.',
  'author': { '@type': 'Organization', 'name': 'EmviApp' },
  'publisher': {
    '@type': 'Organization',
    'name': 'EmviApp',
    'logo': { '@type': 'ImageObject', 'url': 'https://www.emvi.app/icons/emvi-master-512.png' }
  },
  'datePublished': '2025-01-15',
  'image': 'https://www.emvi.app/icons/emvi-master-512.png',
  'url': 'https://www.emvi.app/guides/boost-salon-reviews-scripts'
};

export default function BoostSalonReviewsScripts() {
  return (
    <Layout>
      <Helmet>
        <title>Boost Salon Reviews: Scripts & Templates | EmviApp</title>
        <meta name="description" content="Proven scripts and text templates that get clients to leave 5-star reviews without sounding pushy. Copy-paste and customize." />
        <link rel="canonical" href="https://www.emvi.app/guides/boost-salon-reviews-scripts" />
      </Helmet>
      <BaseSEO jsonLd={[articleSchema]} />

      <article className="py-12">
        <Container className="max-w-4xl">
          <header className="mb-12">
            <Link to="/guides" className="text-primary hover:underline mb-4 inline-block">← Back to Guides</Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Boost Salon Reviews: Scripts & Templates
            </h1>
            <p className="text-xl text-muted-foreground">
              Proven scripts that get clients to leave 5-star reviews without sounding pushy.
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2>In-Person Scripts</h2>
              <div className="bg-muted p-6 rounded-lg mb-6">
                <h3>Script 1: At Checkout</h3>
                <p className="italic">"I'm so glad you loved your nails! If you have a moment, a quick review on Google really helps other clients find us. I can text you the link right now if that works?"</p>
                <p className="text-sm text-muted-foreground mt-2">✅ Conversion rate: 35%</p>
              </div>

              <div className="bg-muted p-6 rounded-lg mb-6">
                <h3>Script 2: After Compliment</h3>
                <p className="italic">"Thank you so much! I love hearing that. Would you mind sharing that feedback in a Google review? It would mean the world to me and helps us grow."</p>
                <p className="text-sm text-muted-foreground mt-2">✅ Conversion rate: 42%</p>
              </div>
            </section>

            <section className="mb-12">
              <h2>Text Message Templates</h2>
              <div className="bg-muted p-6 rounded-lg mb-6">
                <h3>Template 1: Day After Appointment</h3>
                <p className="italic">
                  "Hi [Name]! Thanks for visiting us yesterday. We hope you're loving your nails! ✨<br/><br/>
                  If you have 30 seconds, a quick Google review helps other clients discover us: [link]<br/><br/>
                  See you next time!<br/>- [Your Name]"
                </p>
              </div>

              <div className="bg-muted p-6 rounded-lg">
                <h3>Template 2: For Loyal Clients</h3>
                <p className="italic">
                  "Hi [Name]! We're so grateful you've been coming to us for [X months/years]. Your support means everything! 💅<br/><br/>
                  If you're willing, a Google review would help us reach more amazing clients like you: [link]<br/><br/>
                  Thank you!<br/>- [Salon Name] Team"
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2>Email Templates</h2>
              <div className="bg-muted p-6 rounded-lg">
                <p><strong>Subject:</strong> How were your nails? ✨</p>
                <p className="mt-4 italic">
                  Hi [Name],<br/><br/>
                  Thank you for choosing [Salon Name]! We hope you're loving your fresh nails.<br/><br/>
                  Your feedback helps us improve and helps other clients find us. Would you mind leaving a quick review?<br/><br/>
                  <strong>[Google Review Link Button]</strong><br/><br/>
                  Thank you for supporting our small business!<br/><br/>
                  Best,<br/>
                  [Your Name]
                </p>
              </div>
            </section>
          </div>

          <div className="mt-12 p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">Build Your Dream Team</h3>
            <p className="mb-6">Great reviews attract great clients AND great talent. Ready to hire?</p>
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

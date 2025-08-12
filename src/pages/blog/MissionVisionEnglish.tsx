import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Heart, Users, Globe, Calendar as CalendarIcon, Clock as ClockIcon } from 'lucide-react';
import OptimizedBlogImage from '@/components/blog/OptimizedBlogImage';
import heroImage from '@/assets/viral-article-hero.jpg';
import communityImage from '@/assets/viral-article-community.jpg';
import seoLocalSearchImg from '@/assets/emvi/seo-local-search-premium.jpg';
import salonOffersImg from '@/assets/emvi/salon-offers-premium.jpg';


const CANONICAL = 'https://emvi.app/blog/emviapp-vision/mission-vision-en';

const MissionVisionEnglish: React.FC = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'EmviApp — Mission & Vision',
    inLanguage: 'en',
    author: { '@type': 'Organization', name: 'EmviApp Editorial' },
    publisher: { '@type': 'Organization', name: 'EmviApp' },
    mainEntityOfPage: CANONICAL,
  };

  return (
    <article className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <Helmet>
        <title>EmviApp — Mission & Vision</title>
        <meta name="description" content="Our promise: a premium, human-first platform that automates growth for salons and elevates artists worldwide." />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="EmviApp — Mission & Vision" />
        <meta property="og:description" content="A premium, human-first platform for bookings, SEO, and community growth." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <header className="container mx-auto px-4 py-12 max-w-4xl text-center">
        <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">Featured Story</span>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-6 leading-tight">EmviApp — Mission & Vision</h1>
        <h2 className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">From a family beauty story to an automation platform for the industry — bookings, SEO, and growth built in.</h2>
        <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
          <span className="flex items-center"><CalendarIcon className="w-4 h-4 mr-1" /> Aug 2025</span>
          <span className="flex items-center"><ClockIcon className="w-4 h-4 mr-1" /> 12 min read</span>
          <span className="flex items-center"><Globe className="w-4 h-4 mr-1" /> English</span>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-16 max-w-4xl">
        {/* Hero Image */}
        <div className="relative mb-12 rounded-2xl overflow-hidden shadow-xl">
          <OptimizedBlogImage src={heroImage} alt="Beauty professionals and clients — human-first technology" aspectRatio="16/9" sizes="(min-width: 1024px) 1100px, 100vw" className="w-full h-full object-cover" />
        </div>

        <section className="prose prose-lg max-w-none text-foreground/90">
          <p className="text-xl leading-relaxed">EmviApp began as a simple promise to family: remove the friction so we can focus on people. Today, that promise has grown into a mission to empower every salon and artist with automation that feels human and growth that compounds daily.</p>

          <h3>Why we exist</h3>
          <p>Great salons aren’t built on software—they’re built on care, trust, and craft. Software should protect that, not complicate it. EmviApp is a premium, human-first platform that handles the invisible work—SEO, booking logistics, retention touchpoints—so owners and artists can do the visible work that matters.</p>

          <h3>Our product pillars</h3>
          <ul>
            <li><strong>Effortless bookings:</strong> A modern booking experience that’s fast, clear, and mobile-first.</li>
            <li><strong>Automatic local SEO:</strong> Every salon and job post becomes a high-performance landing page for nearby clients.</li>
            <li><strong>Community flywheel:</strong> Artists, salons, and clients grow together through trust and visibility.</li>
            <li><strong>Little Sunshine:</strong> Your 24/7 bilingual assistant that helps book, guide, and nurture relationships.</li>
          </ul>

          <figure className="overflow-hidden rounded-2xl border bg-background shadow-md my-8">
            <OptimizedBlogImage src="/lovable-uploads/bdef2029-146a-4a98-aaef-39e85aa6add3.png" alt="EmviApp booking confirmation — premium, beautiful design" aspectRatio="16/9" sizes="(min-width: 1024px) 1100px, 100vw" className="w-full h-full object-cover" />
            <figcaption className="px-4 py-2 text-sm text-muted-foreground">Elegant booking confirmation, designed for trust</figcaption>
          </figure>

          <h3>The economic truth</h3>
          <p>Commission fees, ad dependencies, and scattered tools drain margins and attention. EmviApp removes the middlemen and compounds your visibility by default: every publish, every review, every offer improves search placement and conversion.</p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <figure className="overflow-hidden rounded-2xl border bg-background shadow-md">
              <OptimizedBlogImage src={salonOffersImg} alt="Personalized offers and promotions" aspectRatio="16/9" sizes="(min-width: 1024px) 540px, 100vw" className="w-full h-full object-cover" />
              <figcaption className="px-4 py-2 text-xs md:text-sm text-muted-foreground">Personalized offers that convert</figcaption>
            </figure>
            <figure className="overflow-hidden rounded-2xl border bg-background shadow-md">
              <OptimizedBlogImage src={seoLocalSearchImg} alt="Local SEO map results" aspectRatio="16/9" sizes="(min-width: 1024px) 540px, 100vw" className="w-full h-full object-cover" />
              <figcaption className="px-4 py-2 text-xs md:text-sm text-muted-foreground">Automatic local SEO for every publish</figcaption>
            </figure>
          </div>

          <h3>Little Sunshine — the assistant who never sleeps</h3>
          <p>She’s not a chatbot. She’s a concierge: recommending services, confirming bookings, and guiding clients in English and Vietnamese. Soon, assistants will coordinate directly with each other—client to salon—confirming time, service, and preparation in seconds.</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <figure className="overflow-hidden rounded-2xl border bg-background shadow-md">
              <OptimizedBlogImage src="/lovable-uploads/49d61ee7-a56d-4594-9874-7202526bdca7.png" alt="Little Sunshine chat — English interface preview" aspectRatio="9/16" sizes="(min-width: 1024px) 520px, 100vw" className="w-full h-full object-contain" />
              <figcaption className="px-4 py-2 text-xs md:text-sm text-muted-foreground">Little Sunshine — English</figcaption>
            </figure>
            <figure className="overflow-hidden rounded-2xl border bg-background shadow-md">
              <OptimizedBlogImage src="/lovable-uploads/9821b730-8ec5-410d-9102-a5ebb74be6c5.png" alt="Little Sunshine chat — Vietnamese interface preview" aspectRatio="9/16" sizes="(min-width: 1024px) 520px, 100vw" className="w-full h-full object-contain" />
              <figcaption className="px-4 py-2 text-xs md:text-sm text-muted-foreground">Little Sunshine — Vietnamese</figcaption>
            </figure>
          </div>

          <h3>Vision</h3>
          <p>We believe every neighborhood deserves thriving beauty businesses. EmviApp creates a web of opportunity where artists are discovered for their craft, salons are booked at the right price, and clients feel at home.</p>

          <h3>What never changes</h3>
          <ul>
            <li>Premium experience, always. Thoughtful design, fast performance, trusted privacy.</li>
            <li>Human-first decisions. We build for people, not for metrics.</li>
            <li>Compound value. Every action should make the next one easier and more valuable.</li>
          </ul>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 my-10">
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <span className="flex items-center"><Heart className="w-4 h-4 mr-2 text-red-400" />Built for trust</span>
              <span className="flex items-center"><Users className="w-4 h-4 mr-2 text-blue-400" />Community-led</span>
              <span className="flex items-center"><Globe className="w-4 h-4 mr-2 text-green-400" />Bilingual by default</span>
            </div>
          </div>

          <h3>Invitation</h3>
          <p>Whether you’re opening your first salon or scaling your fifth, EmviApp gives you leverage: automation where it matters, storytelling where it converts, and a community that celebrates your craft. Welcome to the future of beauty. Welcome to EmviApp.</p>
        </section>
      </div>
    </article>
  );
};

export default MissionVisionEnglish;

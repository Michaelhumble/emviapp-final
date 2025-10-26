import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LaunchAIAgents() {
  const publishDate = '2025-01-15';
  const headline = 'EmviApp Launches AI Salon Agents to Transform Beauty Business Operations';
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline,
    datePublished: publishDate,
    dateModified: publishDate,
    author: {
      '@type': 'Person',
      name: 'Michael Nguyen',
      jobTitle: 'Founder & CEO'
    },
    publisher: {
      '@type': 'Organization',
      name: 'EmviApp',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.emvi.app/icons/emvi-master-512.png'
      }
    },
    image: 'https://www.emvi.app/og/emvi-og-press.png',
    articleBody: 'EmviApp announces AI Salon Agents — smart assistants that help nail and beauty businesses manage bookings, reviews, and marketing in real time. Built by founder Michael Nguyen, EmviApp bridges technology and Vietnamese-American entrepreneurship, helping salons grow with authentic tools and AI automation.',
    url: 'https://www.emvi.app/press/launch-ai-agents',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.emvi.app/press/launch-ai-agents'
    }
  };

  return (
    <>
      <Helmet>
        <title>EmviApp Launches AI Salon Agents | Press Release</title>
        <meta 
          name="description" 
          content="EmviApp announces AI Salon Agents — smart assistants that help nail and beauty businesses manage bookings, reviews, and marketing in real time." 
        />
        <link rel="canonical" href="https://www.emvi.app/press/launch-ai-agents" />
        <meta property="og:title" content="EmviApp Launches AI Salon Agents | Press Release" />
        <meta property="og:description" content="Smart assistants for beauty businesses to manage operations and grow with AI automation." />
        <meta property="og:url" content="https://www.emvi.app/press/launch-ai-agents" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.emvi.app/og/emvi-og-press.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container max-w-4xl mx-auto px-4 py-12">
          {/* Back Button */}
          <Link to="/press" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Press Room
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Calendar className="w-4 h-4" />
              <time dateTime={publishDate}>January 15, 2025</time>
              <span className="mx-2">•</span>
              <span>EmviApp Press Room</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {headline}
            </h1>
            
            <p className="text-xl text-muted-foreground">
              AI-powered assistants help nail and beauty salons automate bookings, reviews, and marketing—built with authenticity for Vietnamese-American entrepreneurs.
            </p>
          </header>

          {/* Body */}
          <article className="prose prose-lg max-w-none">
            <p className="lead">
              <strong>San Jose, CA</strong> — EmviApp, the leading platform for beauty industry hiring and salon management, today announced the launch of AI Salon Agents, intelligent assistants designed to help nail salons, barbershops, and beauty businesses automate routine operations and accelerate growth.
            </p>

            <h2>Bridging Technology and Vietnamese-American Entrepreneurship</h2>
            <p>
              Built by founder Michael Nguyen, EmviApp emerged from a deep understanding of the Vietnamese-American beauty community. With thousands of nail salons and beauty businesses across the United States, many owners struggle with time-consuming administrative tasks—managing bookings, responding to reviews, tracking staff schedules, and coordinating marketing campaigns.
            </p>

            <p>
              "We created AI Salon Agents to give salon owners their time back," said Michael Nguyen, Founder and CEO of EmviApp. "These aren't generic chatbots—they're purpose-built assistants that understand the unique challenges of running a beauty business. Whether it's responding to a customer review at 11 PM or automatically scheduling a manicure appointment, our AI agents work 24/7 so owners can focus on what matters most: their craft and their customers."
            </p>

            <h2>Key Features of AI Salon Agents</h2>
            <ul>
              <li><strong>Smart Booking Management:</strong> Automate appointment scheduling, send reminders, and handle cancellations via SMS and email.</li>
              <li><strong>Review Response Automation:</strong> Generate professional, authentic responses to Google and Yelp reviews in seconds.</li>
              <li><strong>Marketing Assistant:</strong> Create social media posts, email campaigns, and promotional content tailored to the beauty industry.</li>
              <li><strong>Multilingual Support:</strong> Full support for English and Vietnamese to serve diverse communities.</li>
              <li><strong>Real-Time Analytics:</strong> Track customer trends, peak hours, and staff performance with AI-powered insights.</li>
            </ul>

            <h2>Empowering Growth with Authentic Tools</h2>
            <p>
              Unlike generic business software, EmviApp's AI Salon Agents are trained specifically on beauty industry workflows. The platform integrates seamlessly with existing tools like Google Business, Instagram, and popular booking systems—ensuring salon owners don't need to overhaul their operations to benefit from AI.
            </p>

            <p>
              "We're not just building technology—we're building trust," Nguyen added. "Every feature is designed with input from real salon owners who told us what they needed. That's why AI Salon Agents feel natural, not intrusive."
            </p>

            <h2>Availability and Pricing</h2>
            <p>
              AI Salon Agents are available now to all EmviApp users. Salon owners can try the platform free for 14 days, with premium plans starting at $49/month. EmviApp also offers a complete hiring and job marketplace for beauty professionals, helping salons find qualified nail technicians, stylists, and barbers.
            </p>

            <h2>About EmviApp</h2>
            <p>
              EmviApp is a technology platform built for the beauty industry. Founded in 2023 by Michael Nguyen, EmviApp connects thousands of salon owners and beauty professionals across the United States. The platform offers job listings, salon management tools, AI-powered assistants, and marketing automation—all designed with authenticity and cultural understanding at its core.
            </p>

            <p>
              For more information, visit <a href="https://www.emvi.app" className="text-primary hover:underline">www.emvi.app</a> or contact <a href="mailto:press@emvi.app" className="text-primary hover:underline">press@emvi.app</a>.
            </p>
          </article>

          {/* CTA Section */}
          <div className="mt-16 p-8 bg-muted/30 rounded-2xl border border-border">
            <h3 className="text-2xl font-bold mb-4">Media Resources</h3>
            <p className="text-muted-foreground mb-6">
              Access our full media kit with logos, screenshots, and brand assets.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="default">
                <Link to="/product">
                  View Product Page
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a href="/press-kit.zip" download>
                  <Download className="w-4 h-4 mr-2" />
                  Download Press Kit
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

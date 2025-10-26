import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Newspaper, 
  Download, 
  Image as ImageIcon, 
  FileText,
  ExternalLink,
  Award,
  Quote,
  Mail
} from 'lucide-react';

export default function PressMediaPage() {
  const pressReleases = [
    {
      title: 'EmviApp Launches AI-Powered Beauty Hiring Platform',
      date: 'January 15, 2025',
      outlet: 'AP News',
      url: 'https://apnews.com/press-release/emviapp-beauty-hiring-platform',
      excerpt: 'Revolutionary platform connects beauty professionals with salon opportunities nationwide using advanced AI matching.'
    },
    {
      title: 'Vietnamese-American Entrepreneur Tackles Beauty Industry Hiring Crisis',
      date: 'December 2024',
      outlet: 'Tech Innovation Daily',
      url: '#',
      excerpt: 'EmviApp addresses the $500B beauty industry\'s chronic staffing challenges with culturally-aware technology.'
    },
    {
      title: 'EmviApp Reaches 10,000 Active Beauty Professionals',
      date: 'November 2024',
      outlet: 'Beauty Business News',
      url: '#',
      excerpt: 'Platform celebrates milestone growth as nail salons nationwide adopt the hiring solution.'
    }
  ];

  const brandAssets = [
    {
      title: 'Logo Package',
      description: 'PNG, SVG, and AI formats in full color, white, and black variations',
      icon: ImageIcon
    },
    {
      title: 'Screenshots',
      description: 'High-resolution product screenshots for editorial use',
      icon: FileText
    },
    {
      title: 'Brand Guidelines',
      description: 'Colors, typography, and usage guidelines',
      icon: Award
    }
  ];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EmviApp",
    "url": "https://www.emvi.app",
    "logo": "https://www.emvi.app/icons/emvi-master-512.png",
    "description": "The leading platform for beauty industry hiring and salon management, trusted by 10,000+ professionals.",
    "foundingDate": "2023",
    "sameAs": [
      "https://www.linkedin.com/company/emviapp",
      "https://twitter.com/emviapp"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Media Relations",
      "email": "press@emvi.app"
    }
  };

  return (
    <>
      <Helmet>
        <title>Press & Media Kit | EmviApp - Beauty Industry Hiring Platform</title>
        <meta name="description" content="Press releases, brand assets, and media resources for EmviApp. Download our press kit and learn about our mission to transform beauty industry hiring." />
        <link rel="canonical" href="https://www.emvi.app/press" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="EmviApp Press & Media Kit" />
        <meta property="og:description" content="Press releases, brand assets, and media resources for journalists covering EmviApp." />
        <meta property="og:image" content="https://www.emvi.app/og/emvi-og-press.png" />
        <meta property="og:url" content="https://www.emvi.app/press" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EmviApp Press & Media Kit" />
        <meta name="twitter:description" content="Press resources for journalists covering the beauty industry's leading hiring platform." />
        <meta name="twitter:image" content="https://www.emvi.app/og/emvi-og-press.png" />
        
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-[#FDFDFD]">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 mb-6">
              <Newspaper className="w-8 h-8 text-primary" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Press & Media Kit
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              EmviApp in the News — Resources for journalists, bloggers, and media professionals covering the beauty industry.
            </p>

            <Button asChild size="lg">
              <a href="/press-kit.zip" download>
                <Download className="mr-2 w-5 h-5" />
                Download Press Kit
              </a>
            </Button>
          </div>
        </section>

        {/* Press Releases */}
        <section className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-8">
            <Newspaper className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">Press Releases</h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>EmviApp Launches AI Salon Agents</CardTitle>
                <CardDescription>January 15, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  AI-powered assistants help nail and beauty salons automate bookings, reviews, and marketing—built with authenticity for Vietnamese-American entrepreneurs.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/press/launch-ai-agents">
                    Read Full Release <ExternalLink className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            {pressReleases.map((pr, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{pr.title}</CardTitle>
                  <CardDescription>{pr.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{pr.excerpt}</p>
                  {pr.url !== '#' && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={pr.url} target="_blank" rel="noopener noreferrer">
                        Read More <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Media Assets Section */}
        <section className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-8">
            <Download className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">Media Assets</h2>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-3">
                {brandAssets.map((asset, idx) => {
                  const Icon = asset.icon;
                  return (
                    <div key={idx} className="text-center">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{asset.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{asset.description}</p>
                      <Button variant="outline" size="sm" asChild>
                        <a href="/press-kit.zip" download>
                          Download
                        </a>
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Founder Quotes Section */}
        <section className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-8">
            <Quote className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">Founder Quotes</h2>
          </div>
          
          <div className="space-y-6">
            <Card className="border-l-4 border-l-primary">
              <CardContent className="pt-6">
                <blockquote className="text-lg italic mb-4">
                  "EmviApp was born from a simple truth: the Vietnamese-American beauty community deserves technology that understands them. Every feature we build starts with listening to real salon owners—their struggles, their dreams, their daily reality. This isn't just software. It's a bridge between tradition and innovation."
                </blockquote>
                <p className="text-sm font-semibold">— Michael Nguyen, Founder & CEO</p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-primary">
              <CardContent className="pt-6">
                <blockquote className="text-lg italic mb-4">
                  "AI should empower, not replace. Our AI Salon Agents don't eliminate the human touch—they amplify it. By automating the routine tasks, we give salon owners more time to do what they love: creating beauty and building relationships with their clients."
                </blockquote>
                <p className="text-sm font-semibold">— Michael Nguyen, Founder & CEO</p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-primary">
              <CardContent className="pt-6">
                <blockquote className="text-lg italic mb-4">
                  "Growing up, I watched my family and community build businesses with their hands and hearts. EmviApp is my way of honoring that legacy—giving them tools that respect their craft while helping them thrive in a digital world."
                </blockquote>
                <p className="text-sm font-semibold">— Michael Nguyen, Founder & CEO</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* About the Founder */}
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">About the Founder</h2>
          
          <Card className="p-8 md:p-10">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-4">
                EmviApp was founded by <strong>a Vietnamese-American entrepreneur</strong> who witnessed firsthand the hiring challenges facing nail salon owners and beauty professionals across the United States.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Growing up in a family of salon owners, the founder understood that traditional job boards weren't designed for the unique needs of the beauty industry — from understanding booth rental dynamics to supporting bilingual job posts for Vietnamese communities.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, EmviApp serves over 10,000 beauty professionals nationwide, combining cutting-edge AI technology with deep cultural understanding to solve the $500 billion beauty industry's most persistent challenge: connecting talented professionals with great opportunities.
              </p>
            </div>
          </Card>
        </section>

        {/* Press Contact Section */}
        <section className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-8">
            <Mail className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">Press Contact</h2>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <p className="text-lg mb-6">
                For press inquiries, interviews, or additional information:
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button asChild>
                  <a href="mailto:press@emvi.app">
                    <Mail className="w-4 h-4 mr-2" />
                    press@emvi.app
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/press-kit.zip" download>
                    <Download className="w-4 h-4 mr-2" />
                    Download Full Press Kit
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}

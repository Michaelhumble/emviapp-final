import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Newspaper, 
  Download, 
  Image as ImageIcon, 
  FileText,
  ExternalLink,
  Award
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
          
          <div className="space-y-4">
            {pressReleases.map((pr, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-primary">{pr.outlet}</span>
                      <span className="text-sm text-muted-foreground">{pr.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{pr.title}</h3>
                    <p className="text-muted-foreground mb-4">{pr.excerpt}</p>
                  </div>
                  {pr.url !== '#' && (
                    <Button asChild variant="outline" size="sm">
                      <a href={pr.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Brand Assets */}
        <section className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-8">
            <ImageIcon className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">Brand Assets</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {brandAssets.map((asset, idx) => {
              const Icon = asset.icon;
              return (
                <Card key={idx} className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{asset.title}</h3>
                  <p className="text-sm text-muted-foreground">{asset.description}</p>
                </Card>
              );
            })}
          </div>

          <Card className="p-6 bg-muted/50">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold mb-1">High-Resolution Assets</h3>
                <p className="text-sm text-muted-foreground">
                  Logo files, product screenshots, and founder photos for editorial use
                </p>
              </div>
              <Button asChild variant="default">
                <a href="/press-kit.zip" download>
                  <Download className="mr-2 w-4 h-4" />
                  Download All
                </a>
              </Button>
            </div>
          </Card>
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

        {/* Media Contact */}
        <section className="container mx-auto px-4 py-16 max-w-3xl">
          <Card className="p-8 text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <h2 className="text-2xl font-bold mb-4">Media Inquiries</h2>
            <p className="text-muted-foreground mb-6">
              For press inquiries, interviews, or additional information, please contact:
            </p>
            <Button asChild size="lg">
              <Link to="/contact">
                Contact Press Team
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Email: <a href="mailto:press@emvi.app" className="text-primary hover:underline">press@emvi.app</a>
            </p>
          </Card>
        </section>
      </div>
    </>
  );
}

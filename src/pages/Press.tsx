import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, ExternalLink, Mail, User, Building, Calendar } from 'lucide-react';
import BaseSEO from '@/components/seo/BaseSEO';
import { buildOrganizationJsonLd, buildPressArticleJsonLd } from '@/components/seo/jsonld';

const Press: React.FC = () => {
  const handleDownload = (assetType: string) => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'press_kit_download',
        asset_type: assetType
      });
    }
  };

  const handleContactClick = () => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'press_contact_click',
        location: 'press_page'
      });
    }
  };

  const pressAssets = [
    {
      title: "Logo Package",
      description: "High-resolution logos in SVG and PNG formats, light and dark variants",
      icon: Building,
      downloadUrl: "/press-kit/logos.zip"
    },
    {
      title: "Product Screenshots",
      description: "App interface screenshots and mockups for editorial use",
      icon: Download,
      downloadUrl: "/press-kit/screenshots.zip"
    },
    {
      title: "Company Factsheet",
      description: "PDF with company information, statistics, and key facts",
      icon: Calendar,
      downloadUrl: "/press-kit/factsheet.pdf"
    }
  ];

  return (
    <>
      <BaseSEO
        title="EmviApp Press Kit & Media Resources"
        description="Download high-resolution logos, product screenshots, and company information. Media resources for journalists covering EmviApp and the beauty technology industry."
        canonical="/press"
        ogImage="/images/og-press.jpg"
        jsonLd={[
          buildOrganizationJsonLd(),
          buildPressArticleJsonLd()
        ]}
        type="article"
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                  Press Kit & 
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block">
                    Media Resources
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  High-resolution assets, company information, and media resources for journalists 
                  and content creators covering EmviApp.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button size="lg" asChild>
                  <a
                    href="mailto:press@emvi.app?subject=Media%20Inquiry"
                    onClick={handleContactClick}
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Contact Press Team
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a
                    href="https://www.einpresswire.com/article/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry"
                    target="_blank"
                    rel="noopener nofollow"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Latest Press Release
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Press Assets */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Media Assets
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Download high-resolution assets for your editorial coverage.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {pressAssets.map((asset, index) => (
                  <motion.div
                    key={asset.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300">
                      <CardHeader className="text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <asset.icon className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{asset.title}</CardTitle>
                        <CardDescription>{asset.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => handleDownload(asset.title.toLowerCase().replace(' ', '_'))}
                          asChild
                        >
                          <a href={asset.downloadUrl} download>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Company Information */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  About EmviApp
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-foreground">Company Overview</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    EmviApp is the first AI-powered growth engine for the global beauty industry, 
                    connecting salons, beauty professionals, and customers through intelligent technology. 
                    Founded in 2025, we're transforming how beauty professionals discover opportunities 
                    and grow their careers.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Our platform serves thousands of nail technicians, hair stylists, barbers, and 
                    beauty professionals, offering AI-powered job matching, verified opportunities, 
                    and professional networking tools.
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-foreground">Key Facts</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="font-medium text-foreground mr-2">Founded:</span>
                      2025
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium text-foreground mr-2">Industry:</span>
                      Beauty Technology
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium text-foreground mr-2">Users:</span>
                      22,000+ beauty professionals
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium text-foreground mr-2">Jobs Posted:</span>
                      12,000+ verified opportunities
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium text-foreground mr-2">Mission:</span>
                      Connecting beauty professionals with premium opportunities through AI
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Information */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Leadership
                </h2>
              </div>

              <Card className="max-w-2xl mx-auto">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Michael Humble</CardTitle>
                  <CardDescription className="text-lg">CEO & Founder</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-center">
                    Michael Humble founded EmviApp with a vision to revolutionize the beauty industry 
                    through technology. With extensive experience in building platforms that connect 
                    professionals with opportunities, he leads EmviApp's mission to empower beauty 
                    professionals worldwide through AI-driven growth tools.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Media Contact
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                For press inquiries, interview requests, or additional information, please contact our media team.
              </p>
              
              <Card className="max-w-md mx-auto">
                <CardContent className="pt-6 text-center space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground">Press Contact</h3>
                    <p className="text-muted-foreground">press@emvi.app</p>
                  </div>
                  
                  <Button className="w-full" asChild>
                    <a
                      href="mailto:press@emvi.app?subject=Media%20Inquiry"
                      onClick={handleContactClick}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Press Team
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Press;
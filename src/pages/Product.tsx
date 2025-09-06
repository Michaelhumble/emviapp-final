import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Users, TrendingUp, Brain, Shield, Zap } from 'lucide-react';
import BaseSEO from '@/components/seo/BaseSEO';
import { buildSoftwareApplicationJsonLd, buildOrganizationJsonLd } from '@/components/seo/jsonld';

const Product: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Our intelligent algorithm connects beauty professionals with perfect opportunities based on skills, location, and preferences."
    },
    {
      icon: Users,
      title: "Professional Network",
      description: "Join thousands of nail technicians, hair stylists, barbers, and beauty professionals in one unified platform."
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Access exclusive opportunities, skill development resources, and industry insights to accelerate your career."
    },
    {
      icon: Shield,
      title: "Verified Opportunities",
      description: "All job postings and salon listings are verified to ensure quality and authenticity for our community."
    },
    {
      icon: Zap,
      title: "Instant Connections",
      description: "Connect with salons and professionals instantly through our streamlined communication system."
    },
    {
      icon: Sparkles,
      title: "Premium Visibility",
      description: "Stand out with premium features that showcase your work and attract the right opportunities."
    }
  ];

  return (
    <>
      <BaseSEO
        title="EmviApp Product - AI-Powered Beauty Industry Platform"
        description="Discover how EmviApp's AI-powered platform connects beauty professionals with premium opportunities. Features, pricing, and growth tools for the modern beauty industry."
        canonical="/product"
        ogImage="/images/og-product.jpg"
        jsonLd={[
          buildSoftwareApplicationJsonLd(),
          buildOrganizationJsonLd()
        ]}
        type="website"
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
                <Badge variant="outline" className="mb-4">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI-Powered Platform
                </Badge>
                
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                  The Beauty Industry's
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block">
                    Missing Piece
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  EmviApp connects beauty professionals with premium opportunities through intelligent matching, 
                  verified listings, and powerful growth tools.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button size="lg" asChild>
                  <a href="/jobs">Get Started Free</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/contact">Request Demo</a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Everything You Need to Succeed
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Powerful features designed specifically for beauty professionals and salon owners.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                          <feature.icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base leading-relaxed">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Summary */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                Simple, Transparent Pricing
              </h2>
              
              <Card className="max-w-md mx-auto">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Professional Plan</CardTitle>
                  <CardDescription>
                    Everything you need to grow your beauty career
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <div>
                    <div className="text-3xl font-bold text-foreground">Plans Available</div>
                    <p className="text-muted-foreground">Contact for pricing</p>
                  </div>
                  
                  <ul className="space-y-3 text-left">
                    <li className="flex items-center">
                      <Sparkles className="w-4 h-4 text-primary mr-3" />
                      AI-powered job matching
                    </li>
                    <li className="flex items-center">
                      <Sparkles className="w-4 h-4 text-primary mr-3" />
                      Verified opportunities
                    </li>
                    <li className="flex items-center">
                      <Sparkles className="w-4 h-4 text-primary mr-3" />
                      Professional networking
                    </li>
                    <li className="flex items-center">
                      <Sparkles className="w-4 h-4 text-primary mr-3" />
                      Career development tools
                    </li>
                  </ul>

                  <Button className="w-full" asChild>
                    <a href="/contact">Contact Sales</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Transform Your Beauty Career?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of beauty professionals who have already discovered their next opportunity through EmviApp.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" asChild>
                  <a href="/jobs">Start Your Journey</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/about">Learn More</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Product;
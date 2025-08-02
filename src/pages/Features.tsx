import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Check, Star, Zap, Users, Calendar, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Smart Booking System",
      description: "AI-powered appointment scheduling that reduces no-shows by 75% and optimizes your calendar automatically.",
      benefits: ["Real-time availability", "Automated reminders", "Client preferences learning"]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Client Management",
      description: "Advanced CRM system that tracks client history, preferences, and lifetime value to boost retention.",
      benefits: ["Client history tracking", "Personalized recommendations", "Loyalty program integration"]
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Business Analytics",
      description: "Comprehensive insights into your business performance with actionable recommendations for growth.",
      benefits: ["Revenue tracking", "Performance metrics", "Growth predictions"]
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI Matching",
      description: "Intelligent client-artist matching based on style preferences, location, and availability.",
      benefits: ["Perfect client matches", "Style compatibility", "Automatic suggestions"]
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Reputation Management",
      description: "Build and maintain your professional reputation with integrated review management and portfolio showcase.",
      benefits: ["Review monitoring", "Portfolio builder", "Social proof optimization"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Features - EmviApp | Comprehensive Beauty Business Platform</title>
        <meta name="description" content="Discover EmviApp's powerful features designed for beauty professionals. Smart booking, client management, AI matching, and business analytics in one platform." />
        <meta name="keywords" content="beauty booking software, salon management, client management, appointment scheduling, beauty business tools" />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Everything You Need to Grow Your Beauty Business
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                EmviApp provides comprehensive tools designed specifically for beauty professionals. 
                From smart booking to AI-powered client matching, we've got everything covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth/signup">
                  <Button size="lg" className="px-8 py-3">
                    Start Free Trial
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" size="lg" className="px-8 py-3">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                  Powerful Features for Modern Beauty Businesses
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Every feature is designed with beauty professionals in mind, 
                  helping you save time, increase bookings, and grow your business.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-primary mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold mb-12">
                Trusted by Beauty Professionals Worldwide
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                  <div className="text-gray-600">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">1M+</div>
                  <div className="text-gray-600">Bookings Made</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">98%</div>
                  <div className="text-gray-600">Satisfaction Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-gray-600">Support</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Ready to Transform Your Beauty Business?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of beauty professionals who've already discovered 
                the power of EmviApp's comprehensive platform.
              </p>
              <Link to="/auth/signup">
                <Button size="lg" variant="secondary" className="px-8 py-3">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Features;
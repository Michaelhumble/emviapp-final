import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { CheckCircle, Instagram, Facebook, TrendingUp, Camera, Megaphone, Target } from 'lucide-react';
import { useAuth } from '@/context/auth';

const MarketingPackagesPricing = () => {
  const { user } = useAuth();

  const packages = [
    {
      name: "Social Starter",
      price: "$99",
      period: "per month",
      description: "Perfect for salons just starting their social media journey",
      features: [
        "10 custom posts per month",
        "Instagram & Facebook management",
        "Basic content calendar",
        "Hashtag research",
        "Monthly performance report",
        "Email support"
      ],
      cta: user ? "Get Started" : "Start Trial",
      popular: false,
      color: "gray"
    },
    {
      name: "Growth Pro",
      price: "$249",
      period: "per month",
      description: "Best for salons serious about growing their online presence",
      features: [
        "20 custom posts per month",
        "Multi-platform management",
        "Professional photo editing",
        "Story templates",
        "Client testimonial campaigns",
        "Influencer outreach",
        "Vietnamese language content",
        "Bi-weekly strategy calls",
        "Advanced analytics"
      ],
      cta: user ? "Upgrade Now" : "Start Free Trial",
      popular: true,
      color: "primary"
    },
    {
      name: "Marketing Mastery",
      price: "$499",
      period: "per month",
      description: "Complete marketing solution for ambitious salon chains",
      features: [
        "40+ custom posts per month",
        "Full-service content creation",
        "Professional photography",
        "Video content production",
        "Paid ad management ($500 ad spend included)",
        "Email marketing campaigns",
        "Website optimization",
        "Brand development",
        "Dedicated marketing manager",
        "Weekly strategy sessions"
      ],
      cta: "Contact Sales",
      popular: false,
      color: "accent"
    }
  ];

  const services = [
    {
      icon: Instagram,
      title: "Social Media Management",
      description: "Professional content creation and posting across all major platforms"
    },
    {
      icon: Camera,
      title: "Content Creation",
      description: "High-quality photos, videos, and graphics that showcase your work"
    },
    {
      icon: Target,
      title: "Targeted Advertising",
      description: "Facebook and Instagram ads that bring in qualified leads"
    },
    {
      icon: TrendingUp,
      title: "Growth Strategy",
      description: "Data-driven strategies to increase followers and bookings"
    },
    {
      icon: Megaphone,
      title: "Brand Building",
      description: "Develop a strong brand identity that resonates with your target audience"
    },
    {
      icon: Facebook,
      title: "Community Engagement",
      description: "Build relationships with clients and local beauty enthusiasts"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Container>
        <div className="py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Marketing That Actually Works
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional marketing services designed specifically for Vietnamese-American beauty businesses. 
              We understand your culture, your clients, and what it takes to succeed.
            </p>
          </div>

          {/* Results Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">300%</div>
              <div className="text-gray-600">Follower Growth</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">150%</div>
              <div className="text-gray-600">Booking Increase</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.8x</div>
              <div className="text-gray-600">ROI Average</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600">Successful Campaigns</div>
            </div>
          </div>

          {/* Package Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {packages.map((pkg, index) => (
              <div 
                key={index}
                className={`relative p-8 rounded-2xl border ${
                  pkg.popular 
                    ? 'border-primary bg-white shadow-xl scale-105' 
                    : 'border-gray-200 bg-white shadow-lg'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-gray-900">{pkg.price}</span>
                    <span className="text-gray-600 ml-1">{pkg.period}</span>
                  </div>
                  <p className="text-gray-600">{pkg.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={
                    pkg.cta === "Contact Sales" 
                      ? "/contact" 
                      : user 
                        ? "/dashboard?utm_source=pricing&utm_medium=marketing&utm_campaign=upgrade"
                        : "/signup?utm_source=pricing&utm_medium=marketing&utm_campaign=trial"
                  }
                  className={`block w-full text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                    pkg.popular
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : pkg.color === 'gray'
                        ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        : 'bg-accent text-white hover:bg-accent/90'
                  }`}
                >
                  {pkg.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Services Grid */}
          <div className="bg-white rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Complete Marketing Services
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="text-center">
                  <service.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Case Study */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-12 mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Success Story</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <blockquote className="text-xl font-medium mb-4">
                    "In just 6 months, EmviApp's marketing team helped us go from 200 to 2,400 Instagram followers. 
                    Our bookings increased by 180% and we had to hire 3 more nail technicians!"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full"></div>
                    <div>
                      <div className="font-semibold">Lisa Tran</div>
                      <div className="opacity-90">Owner, Lotus Nail Spa</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold">2,400</div>
                    <div className="opacity-90">New Followers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">180%</div>
                    <div className="opacity-90">Booking Increase</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">4.9</div>
                    <div className="opacity-90">Star Rating</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">$12K</div>
                    <div className="opacity-90">Monthly Revenue</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Grow Your Beauty Business?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Let our marketing experts create a custom strategy that brings in more clients and grows your revenue
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact?utm_source=pricing&utm_medium=cta&utm_campaign=marketing"
                className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Get Free Marketing Audit
              </Link>
              <Link
                to="/blog/categories/salon-management?utm_source=pricing&utm_medium=cta&utm_campaign=learn-more"
                className="border border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary/5 transition-colors"
              >
                Read Success Stories
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MarketingPackagesPricing;
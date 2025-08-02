import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { CheckCircle, Calendar, Users, BarChart3, Smartphone, Shield } from 'lucide-react';
import { useAuth } from '@/context/auth';

const SalonManagementPricing = () => {
  const { user } = useAuth();

  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "forever",
      description: "Perfect for independent beauty professionals",
      features: [
        "Basic booking system",
        "Client management (up to 100)",
        "Mobile app access",
        "Email notifications",
        "Basic reporting",
        "Community access"
      ],
      cta: user ? "Current Plan" : "Get Started Free",
      popular: false,
      color: "gray"
    },
    {
      name: "Professional",
      price: "$49",
      period: "per month",
      description: "Best for growing salons and spa businesses",
      features: [
        "Unlimited clients",
        "Advanced scheduling",
        "Staff management",
        "Payment processing",
        "Marketing automation",
        "Custom branding",
        "Vietnamese language support",
        "Analytics & insights",
        "Priority support"
      ],
      cta: user ? "Upgrade Now" : "Start Free Trial",
      popular: true,
      color: "primary"
    },
    {
      name: "Enterprise",
      price: "$149",
      period: "per month",
      description: "For multi-location salon chains",
      features: [
        "Multi-location management",
        "Advanced reporting",
        "Custom integrations",
        "White-label options",
        "Dedicated success manager",
        "Training & onboarding",
        "24/7 phone support",
        "Custom workflows",
        "API access"
      ],
      cta: "Contact Sales",
      popular: false,
      color: "accent"
    }
  ];

  const features = [
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "AI-powered booking that maximizes your revenue and minimizes gaps"
    },
    {
      icon: Users,
      title: "Staff Management",
      description: "Track performance, manage payroll, and optimize team productivity"
    },
    {
      icon: BarChart3,
      title: "Business Analytics",
      description: "Real-time insights into revenue, client retention, and growth opportunities"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Manage your salon from anywhere with our beautiful mobile app"
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Bank-level security with HIPAA compliance for client privacy"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/5 via-white to-primary/5">
      <Container>
        <div className="py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Transform Your Salon Management
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The all-in-one platform designed specifically for Vietnamese-American beauty businesses. 
              Streamline operations, boost revenue, and delight clients with EmviApp.
            </p>
          </div>

          {/* ROI Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">35%</div>
              <div className="text-gray-600">Revenue Increase</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50%</div>
              <div className="text-gray-600">Time Saved Daily</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">90%</div>
              <div className="text-gray-600">Client Retention</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-600">Online Booking</div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`relative p-8 rounded-2xl border ${
                  plan.popular 
                    ? 'border-primary bg-white shadow-xl scale-105' 
                    : 'border-gray-200 bg-white shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.price !== "Free" && <span className="text-gray-600 ml-1">{plan.period}</span>}
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={
                    plan.cta === "Contact Sales" 
                      ? "/contact" 
                      : user 
                        ? "/dashboard?utm_source=pricing&utm_medium=salon-management&utm_campaign=upgrade"
                        : "/signup?utm_source=pricing&utm_medium=salon-management&utm_campaign=trial"
                  }
                  className={`block w-full text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : plan.color === 'gray'
                        ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        : 'bg-accent text-white hover:bg-accent/90'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="bg-white rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Everything You Need to Run a Successful Salon
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-gradient-to-r from-primary to-accent text-white rounded-2xl p-12 mb-16">
            <div className="text-center max-w-4xl mx-auto">
              <blockquote className="text-2xl font-medium mb-6">
                "EmviApp transformed our salon from chaos to organized success. We increased bookings by 40% 
                and our staff loves how easy everything is now. The Vietnamese language support was a game-changer for our team."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full"></div>
                <div>
                  <div className="font-semibold">Mai Nguyen</div>
                  <div className="opacity-90">Owner, Golden Nail Spa</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Salon?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join 3,000+ successful salon owners who grew their business with EmviApp
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup?utm_source=pricing&utm_medium=cta&utm_campaign=salon-management"
                className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Start Free Trial
              </Link>
              <Link
                to="/features?utm_source=pricing&utm_medium=cta&utm_campaign=learn-more"
                className="border border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary/5 transition-colors"
              >
                See All Features
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SalonManagementPricing;
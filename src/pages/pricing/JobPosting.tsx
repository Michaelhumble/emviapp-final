import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { CheckCircle, Users, Target, TrendingUp, Star } from 'lucide-react';
import { useAuth } from '@/context/auth';

const JobPostingPricing = () => {
  const { user } = useAuth();

  const plans = [
    {
      name: "Single Job Post",
      price: "$29",
      period: "per posting",
      description: "Perfect for hiring one nail technician or beauty professional",
      features: [
        "30-day active listing",
        "AI-powered candidate matching",
        "Pre-screened applicants",
        "Mobile-optimized job board",
        "Basic analytics",
        "Email support"
      ],
      cta: user ? "Post Your Job" : "Get Started",
      popular: false
    },
    {
      name: "Professional Package",
      price: "$79",
      period: "per month",
      description: "Best for salons hiring multiple positions",
      features: [
        "5 active job postings",
        "Advanced AI matching",
        "Priority placement",
        "Candidate screening tools",
        "Detailed analytics",
        "Vietnamese language support",
        "Phone & email support",
        "Hiring best practices guide"
      ],
      cta: user ? "Upgrade Now" : "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "per month",
      description: "For salon chains and large beauty businesses",
      features: [
        "Unlimited job postings",
        "Custom branding",
        "Multi-location management",
        "Advanced reporting",
        "Dedicated account manager",
        "Custom integrations",
        "Training & onboarding",
        "Priority support"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5">
      <Container>
        <div className="py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Find Top Beauty Talent
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with pre-screened Vietnamese nail technicians, makeup artists, and beauty professionals. 
              Our AI-powered platform makes hiring faster, smarter, and more successful.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
              <div className="text-gray-600">Active Candidates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">92%</div>
              <div className="text-gray-600">Hire Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">7 Days</div>
              <div className="text-gray-600">Average Fill Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-gray-600">Employer Rating</div>
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
                    <span className="text-gray-600 ml-1">{plan.period}</span>
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
                  to={plan.cta === "Contact Sales" ? "/contact" : "/jobs/nail-technician?utm_source=pricing&utm_medium=job-posting&utm_campaign=hiring"}
                  className={`block w-full text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why EmviApp for Beauty Hiring?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Pre-Screened Talent</h3>
                <p className="text-gray-600">Every candidate goes through our verification process</p>
              </div>
              <div className="text-center">
                <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Matching</h3>
                <p className="text-gray-600">Smart algorithms find the perfect cultural and skill fit</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Faster Hiring</h3>
                <p className="text-gray-600">Fill positions 3x faster than traditional methods</p>
              </div>
              <div className="text-center">
                <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
                <p className="text-gray-600">Satisfaction guaranteed or your money back</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-primary text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your Dream Team?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join 2,000+ successful salon owners who found their perfect staff through EmviApp
            </p>
            <Link
              to="/jobs/nail-technician?utm_source=pricing&utm_medium=cta&utm_campaign=hiring"
              className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Hiring Today
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default JobPostingPricing;
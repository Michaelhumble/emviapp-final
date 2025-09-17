import React from 'react';
import Layout from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';
import { MainContent } from '@/components/layout/MainContent';
import { Check, Star, Sparkles, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingOverview = () => {
  return (
    <Layout>
      <Helmet>
        <title>Pricing Overview - EmviApp Plans & Features</title>
        <meta name="description" content="Simple, transparent pricing for beauty professionals. Start free, upgrade when you're ready. No hidden fees, cancel anytime." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.emvi.app/pricing/overview" />
      </Helmet>

      <MainContent className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free and grow with us. No surprise fees, no hidden costs. 
            Upgrade only when you're ready to unlock premium features.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 mb-12">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 relative">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-6 h-6 text-gray-600" />
              <h3 className="text-2xl font-bold text-gray-900">Free</h3>
            </div>
            
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">$0</span>
              <span className="text-gray-600">/month</span>
            </div>
            
            <p className="text-gray-600 mb-6">
              Perfect for getting started and exploring opportunities
            </p>
            
            <ul className="space-y-3 mb-8">
              {[
                'Create professional profile',
                'Browse all job listings', 
                'Apply to unlimited positions',
                'Connect with 5 professionals/month',
                'Basic messaging features',
                'Mobile app access'
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Link 
              to="/auth/signup" 
              className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-center block"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-300 p-8 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-900">Pro</h3>
            </div>
            
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">$19</span>
              <span className="text-gray-600">/month</span>
            </div>
            
            <p className="text-gray-600 mb-6">
              For professionals ready to accelerate their career
            </p>
            
            <ul className="space-y-3 mb-8">
              {[
                'Everything in Free',
                'Unlimited professional connections',
                'Advanced portfolio showcase',
                'Priority in search results', 
                'Direct messaging with clients',
                'Calendar integration',
                'Analytics & insights',
                'Featured profile badge'
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors"
              disabled
            >
              Coming Soon
            </button>
          </div>

          {/* Business Plan */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 relative">
            <div className="flex items-center gap-2 mb-4">
              <Crown className="w-6 h-6 text-yellow-600" />
              <h3 className="text-2xl font-bold text-gray-900">Business</h3>
            </div>
            
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">$49</span>
              <span className="text-gray-600">/month</span>
            </div>
            
            <p className="text-gray-600 mb-6">
              For salons and agencies managing multiple professionals
            </p>
            
            <ul className="space-y-3 mb-8">
              {[
                'Everything in Pro',
                'Team management tools',
                'Bulk job posting',
                'Advanced analytics dashboard',
                'Custom branding options',
                'Priority customer support',
                'API access',
                'Dedicated account manager'
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button 
              className="w-full bg-yellow-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
              disabled
            >
              Coming Soon
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Why Our Pricing is Different
          </h2>
          
          <div className="grid gap-6 md:grid-cols-3 text-center">
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">No Hidden Fees</h3>
              <p className="text-sm text-gray-600">
                What you see is what you pay. No setup fees, no surprise charges.
              </p>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Cancel Anytime</h3>
              <p className="text-sm text-gray-600">
                No long-term contracts. Downgrade or cancel with one click.
              </p>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Value First</h3>
              <p className="text-sm text-gray-600">
                We only charge when we're adding real value to your career.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Questions About Pricing?
          </h2>
          
          <p className="text-gray-600 mb-6">
            We're here to help you find the perfect plan for your needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="bg-white text-gray-900 border-2 border-gray-300 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Contact Sales
            </Link>
            
            <Link 
              to="/trust/data-and-privacy" 
              className="text-gray-600 hover:text-gray-900 py-3 px-6 rounded-lg transition-colors"
            >
              View Privacy Policy
            </Link>
          </div>
          
          <p className="text-sm text-gray-500 mt-6">
            All plans include our standard terms of service. Payment processing by Stripe.
          </p>
        </div>
      </MainContent>
    </Layout>
  );
};

export default PricingOverview;
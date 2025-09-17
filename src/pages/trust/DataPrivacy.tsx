import React from 'react';
import Layout from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';
import { MainContent } from '@/components/layout/MainContent';
import { Shield, Lock, Download, Trash2, Mail } from 'lucide-react';

const DataPrivacy = () => {
  // FAQ structured data
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What personal data does EmviApp collect?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We collect only essential information: your email, name, professional role, and location to help you connect with relevant opportunities. We never collect sensitive personal information like social security numbers or financial data."
        }
      },
      {
        "@type": "Question", 
        "name": "How is my data protected?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "All data is encrypted in transit and at rest using industry-standard AES-256 encryption. We use Supabase's secure infrastructure with SOC 2 compliance and regular security audits."
        }
      },
      {
        "@type": "Question",
        "name": "Can I export or delete my data?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! You can request a full export of your data or complete account deletion at any time. Contact our support team and we'll process your request within 30 days."
        }
      },
      {
        "@type": "Question",
        "name": "How does OAuth sign-in work?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "When you sign in with Google or Facebook, we only receive your basic profile information (name, email, profile photo). We never get access to your social media posts, contacts, or other private information."
        }
      }
    ]
  };

  return (
    <Layout>
      <Helmet>
        <title>Data & Privacy - How EmviApp Protects Your Information</title>
        <meta name="description" content="Learn how EmviApp handles your personal data, our privacy practices, and your rights regarding data export and deletion." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.emvi.app/trust/data-and-privacy" />
      </Helmet>

      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <MainContent className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Data & Privacy at EmviApp
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your privacy matters. Here's exactly how we handle your data, what we store, 
            and what rights you have.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3 mb-12">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <Lock className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Encrypted & Secure</h3>
            <p className="text-sm text-gray-600">
              All data encrypted with AES-256. SOC 2 compliant infrastructure.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
            <Download className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Export Anytime</h3>
            <p className="text-sm text-gray-600">
              Request a complete export of all your data in standard formats.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <Trash2 className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Delete Anytime</h3>
            <p className="text-sm text-gray-600">
              Complete account deletion with full data removal available.
            </p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>What We Collect</h2>
          <p>
            EmviApp collects only the information necessary to provide our professional networking services:
          </p>
          <ul>
            <li><strong>Basic Profile:</strong> Name, email address, professional role, and location</li>
            <li><strong>Professional Info:</strong> Skills, experience level, portfolio items you choose to share</li>
            <li><strong>Usage Data:</strong> How you interact with our platform (anonymized)</li>
            <li><strong>Communications:</strong> Messages you send through our platform</li>
          </ul>

          <h2>What We Never Collect</h2>
          <p>
            We are committed to minimal data collection. We never collect:
          </p>
          <ul>
            <li>Social Security Numbers or government IDs</li>
            <li>Financial information (credit cards, bank accounts)</li>
            <li>Social media posts or private messages from other platforms</li>
            <li>Location tracking or device fingerprinting</li>
            <li>Biometric data</li>
          </ul>

          <h2>How OAuth Sign-In Works</h2>
          <p>
            When you sign in with Google or Facebook, we use OAuth 2.0, an industry-standard protocol:
          </p>
          <ol>
            <li>You're redirected to Google/Facebook's secure login page</li>
            <li>You authorize EmviApp to access only basic profile info</li>
            <li>We receive your name, email, and profile photo - nothing else</li>
            <li>Your social media content, contacts, and posts remain private</li>
          </ol>

          <h2>Data Security</h2>
          <p>
            Your data is protected with enterprise-grade security:
          </p>
          <ul>
            <li><strong>Encryption:</strong> AES-256 encryption for data at rest, TLS 1.3 for data in transit</li>
            <li><strong>Infrastructure:</strong> Hosted on Supabase with SOC 2 Type II compliance</li>
            <li><strong>Access Controls:</strong> Multi-factor authentication required for all team access</li>
            <li><strong>Monitoring:</strong> 24/7 security monitoring and automated threat detection</li>
          </ul>

          <h2>Your Data Rights</h2>
          <p>
            You have complete control over your personal data:
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 my-6">
            <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">How do I export my data?</h4>
                <p className="text-gray-600">
                  Contact our support team at privacy@emvi.app with your export request. 
                  We'll provide a complete export in JSON format within 30 days.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">How do I delete my account?</h4>
                <p className="text-gray-600">
                  You can delete your account through your profile settings, or email 
                  privacy@emvi.app. All personal data will be permanently removed within 30 days.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Do you share data with third parties?</h4>
                <p className="text-gray-600">
                  We never sell your data. We only share minimal necessary information with 
                  service providers (like email delivery) who are bound by strict data agreements.
                </p>
              </div>
            </div>
          </div>

          <h2>Contact Us</h2>
          <p>
            Questions about your privacy or data? We're here to help:
          </p>
          
          <div className="flex items-center gap-2 text-blue-600">
            <Mail className="w-5 h-5" />
            <a href="mailto:privacy@emvi.app" className="hover:underline">
              privacy@emvi.app
            </a>
          </div>
          
          <p className="text-sm text-gray-500 mt-8">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </MainContent>
    </Layout>
  );
};

export default DataPrivacy;
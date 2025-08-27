import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ComprehensiveSEO from '@/components/seo/ComprehensiveSEO';

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const source = searchParams.get('source');

  return (
    <Layout>
      <ComprehensiveSEO
        title="Thank You - EmviApp"
        description="Thank you for contacting EmviApp. We'll get back to you soon!"
        canonicalUrl="https://www.emvi.app/thank-you"
        noIndex={true}
        tags={["thank you", "confirmation", "contact"]}
      />
      
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Thank you — we'll get back to you within 1 business day.
            </h1>
            
            <p className="text-gray-600 leading-relaxed">
              We've received your message and will respond as quickly as possible. 
              Your inquiry is important to us, and we're committed to providing you 
              with the best possible support.
            </p>
            
            {source === 'contact' && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  📧 Your message has been delivered to our support team
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ThankYou;
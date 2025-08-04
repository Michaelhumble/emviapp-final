import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | EmviApp</title>
        <meta name="description" content="EmviApp Privacy Policy - How we collect, use, and protect your personal information" />
      </Helmet>
      <div className="container mx-auto py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center font-playfair">Privacy Policy</h1>
            <div className="prose prose-lg max-w-none space-y-6">
              
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">1. Information We Collect</h2>
                <p>
                  We collect information you provide directly to us, such as when you create an account, 
                  post a job listing, or contact us for support. This includes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Personal information (name, email address, phone number)</li>
                  <li>Professional information (location, specialties, experience)</li>
                  <li>Payment information (processed securely through Stripe)</li>
                  <li>Content you create (job posts, salon listings, messages)</li>
                  <li>Profile photos and portfolio images</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">2. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and maintain our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Communicate about promotions and updates</li>
                  <li>Monitor and analyze usage patterns</li>
                  <li>Prevent fraud and ensure platform security</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">3. Information Sharing</h2>
                <p>
                  We do not sell or rent your personal information to third parties. We may share 
                  your information only in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>With your consent</li>
                  <li>With service providers who help us operate our platform</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and prevent fraud</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">4. Data Security</h2>
                <p>
                  We implement industry-standard security measures to protect your personal information:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>SSL encryption for all data transmission</li>
                  <li>Secure database storage with access controls</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Two-factor authentication options</li>
                  <li>Automatic session expiration</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">5. Your Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your account and data</li>
                  <li>Export your data</li>
                  <li>Opt out of marketing communications</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">6. Cookies and Tracking</h2>
                <p>
                  We use cookies and similar technologies to improve your experience, analyze usage, 
                  and provide personalized content. You can control cookies through your browser settings.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">7. Children's Privacy</h2>
                <p>
                  Our services are not intended for children under 18. We do not knowingly collect 
                  personal information from children under 18.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">8. International Users</h2>
                <p>
                  If you are accessing our services from outside the United States, please note that 
                  your information may be transferred to and processed in countries with different 
                  privacy laws.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">9. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any 
                  material changes by posting the new policy on this page and updating the 
                  "Last Updated" date.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">10. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy or our privacy practices, 
                  please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Email:</strong> <a href="mailto:security@emvi.app" className="text-primary hover:underline">security@emvi.app</a></p>
                  <p><strong>Support:</strong> <a href="mailto:support@emvi.app" className="text-primary hover:underline">support@emvi.app</a></p>
                </div>
              </section>

              <div className="text-center mt-8 pt-8 border-t">
                <p className="text-sm text-gray-600">
                  Last Updated: {new Date().toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Trang Chính sách Bảo mật này có sẵn bằng tiếng Việt theo yêu cầu.
                </p>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Privacy;
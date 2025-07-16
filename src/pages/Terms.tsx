import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | EmviApp</title>
        <meta name="description" content="EmviApp Terms of Service - Rules and conditions for using our platform" />
      </Helmet>
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center font-playfair">Terms of Service</h1>
            <div className="prose prose-lg max-w-none space-y-6">
              
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using EmviApp ("the Platform"), you accept and agree to be bound by 
                  these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">2. Description of Service</h2>
                <p>
                  EmviApp is a marketplace platform connecting beauty professionals with job opportunities 
                  and clients. We provide tools for job posting, salon listings, professional networking, 
                  and business management in the beauty industry.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">3. User Accounts</h2>
                <p>To use our services, you must:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Be at least 18 years old</li>
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Notify us immediately of any unauthorized use</li>
                  <li>Be responsible for all activities under your account</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">4. Acceptable Use</h2>
                <p>You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Post false, misleading, or fraudulent content</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use our platform for illegal activities</li>
                  <li>Spam or send unsolicited communications</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">5. Content and Intellectual Property</h2>
                <p>
                  You retain ownership of content you post on our platform. By posting content, you grant 
                  us a non-exclusive, worldwide license to use, display, and distribute your content in 
                  connection with our services.
                </p>
                <p>
                  All platform features, design, and functionality are owned by EmviApp and protected by 
                  intellectual property laws.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">6. Payment Terms</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Job posting fees are processed through Stripe</li>
                  <li>All payments are final and non-refundable unless required by law</li>
                  <li>Prices may change with reasonable notice</li>
                  <li>You are responsible for all applicable taxes</li>
                  <li>Failed payments may result in service suspension</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">7. Privacy and Data Protection</h2>
                <p>
                  Your privacy is important to us. Please review our Privacy Policy to understand how 
                  we collect, use, and protect your information. By using our services, you consent to 
                  our privacy practices.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">8. Termination</h2>
                <p>
                  We may suspend or terminate your account at any time for violation of these terms or 
                  for any other reason. You may also delete your account at any time through your 
                  account settings.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">9. Disclaimers</h2>
                <p>
                  Our platform is provided "as is" without warranties of any kind. We do not guarantee 
                  the accuracy of user-generated content or the success of job placements. Users are 
                  responsible for verifying all information independently.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">10. Limitation of Liability</h2>
                <p>
                  EmviApp shall not be liable for any indirect, incidental, special, or consequential 
                  damages arising from your use of our platform. Our liability is limited to the amount 
                  you paid for our services in the past 12 months.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">11. Dispute Resolution</h2>
                <p>
                  Any disputes arising from these terms shall be resolved through binding arbitration 
                  in accordance with the rules of the American Arbitration Association. Class action 
                  lawsuits are waived.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">12. Changes to Terms</h2>
                <p>
                  We may update these Terms of Service from time to time. We will notify users of 
                  material changes and the updated terms will be effective upon posting. Continued 
                  use constitutes acceptance of the new terms.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">13. Contact Information</h2>
                <p>
                  For questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Legal:</strong> <a href="mailto:legal@emvi.app" className="text-primary hover:underline">legal@emvi.app</a></p>
                  <p><strong>Support:</strong> <a href="mailto:support@emvi.app" className="text-primary hover:underline">support@emvi.app</a></p>
                  <p><strong>Security:</strong> <a href="mailto:security@emvi.app" className="text-primary hover:underline">security@emvi.app</a></p>
                </div>
              </section>

              <div className="text-center mt-8 pt-8 border-t">
                <p className="text-sm text-gray-600">
                  Last Updated: {new Date().toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Điều khoản Dịch vụ này có sẵn bằng tiếng Việt theo yêu cầu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Terms;
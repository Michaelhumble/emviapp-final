import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | EmviApp</title>
        <meta name="description" content="EmviApp Terms of Service - Legal terms and conditions for using our platform." />
        <link rel="canonical" href="https://www.emvi.app/terms" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-[#FDFDFD]">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using EmviApp ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                EmviApp is a platform connecting beauty professionals with job opportunities and helping salon owners manage their businesses. We provide tools for job posting, candidate matching, salon listings, and community features.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                When you create an account with us, you must provide accurate, complete, and current information. You are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Maintaining the security of your account and password</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">User Content</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                By posting content on EmviApp, you:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Retain ownership of your content</li>
                <li>Grant us a license to use, display, and distribute your content</li>
                <li>Represent that your content is accurate and does not violate any laws</li>
                <li>Agree not to post discriminatory, offensive, or illegal content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Prohibited Uses</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                You may not use the Service to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Violate any laws or regulations</li>
                <li>Post false, misleading, or fraudulent job listings</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Scrape or copy content without permission</li>
                <li>Interfere with the operation of the Service</li>
                <li>Use the Service for any illegal employment practices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Payment Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                Certain features of the Service require payment. All payments are processed securely through Stripe. Fees are non-refundable except as required by law or as stated in our <Link to="/refund" className="text-primary hover:underline">Refund Policy</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Job Posting Guidelines</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Job postings must:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Be for legitimate employment opportunities</li>
                <li>Comply with all applicable employment laws</li>
                <li>Not discriminate based on protected characteristics</li>
                <li>Accurately represent the position and compensation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Service and its original content (excluding user content) are owned by EmviApp and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, or distribute our content without permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Disclaimer of Warranties</h2>
              <p className="text-muted-foreground leading-relaxed">
                THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE. WE ARE NOT RESPONSIBLE FOR THE ACCURACY OF USER-GENERATED CONTENT.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, EMVIAPP SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF THE SERVICE.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to indemnify and hold EmviApp harmless from any claims, damages, or expenses arising from your use of the Service or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may terminate or suspend your account and access to the Service immediately, without prior notice, for any reason, including breach of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by the laws of the State of California, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the new Terms on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about these Terms, please contact us:
              </p>
              <p className="text-muted-foreground">
                Email: <a href="mailto:legal@emvi.app" className="text-primary hover:underline">legal@emvi.app</a><br />
                Or visit our <Link to="/contact" className="text-primary hover:underline">Contact page</Link>
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

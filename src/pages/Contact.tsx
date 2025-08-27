
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ContactForm from '@/components/ContactForm';
import ComprehensiveSEO from '@/components/seo/ComprehensiveSEO';

const ContactPage = () => {
  return (
    <>
      <ComprehensiveSEO
        title="Contact Us - Get in Touch with EmviApp"
        description="Contact EmviApp for support, partnerships, or feedback. We're here to help beauty professionals and salons connect and grow together."
        canonicalUrl="https://www.emvi.app/contact"
        tags={["contact", "support", "beauty industry", "customer service"]}
      />
      <div className="min-h-screen bg-gray-50">
          {/* Header Section */}
          <div className="bg-white border-b border-gray-200">
            <div className="container max-w-4xl mx-auto px-4 py-12">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-playfair font-bold text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text mb-4 leading-tight">
                  🗣️ Your Voice Builds the Future of EmviApp
                </h1>
                <p className="text-lg text-gray-600 mb-2">
                  Tell us anything. We're here to listen, improve, and build together.
                </p>
                <p className="text-gray-500">
                  This isn't a contact form. This is where EmviApp becomes better because of you. 
                  Whether you're here to dream big, point out a bug, or just show love — we read every word.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="container max-w-4xl mx-auto px-4 py-12">
            <ContactForm />
          </div>
        </div>
    </>
  );
};

export default ContactPage;

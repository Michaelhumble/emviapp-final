
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import ContactForm from '@/components/ContactForm';

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact EmviApp</title>
        <meta name="description" content="Contact EmviApp - We'd love to hear from you!" />
      </Helmet>
      <Layout>
        <div className="min-h-screen bg-gray-50">
          {/* Header Section */}
          <div className="bg-white border-b border-gray-200">
            <div className="container max-w-4xl mx-auto px-4 py-12">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
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
      </Layout>
    </>
  );
};

export default ContactPage;

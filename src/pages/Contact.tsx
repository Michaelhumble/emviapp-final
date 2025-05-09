
import React from 'react';
import Layout from '@/components/layout/Layout';
import ContactForm from '@/components/ContactForm';

const ContactPage = () => {
  return (
    <Layout>
      <div className="container max-w-4xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            🗣️ Your Voice Builds the Future of EmviApp
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Tell us anything. We're here to listen, improve, and build together.
          </p>
          
          <div className="prose prose-slate mx-auto max-w-md">
            <p>
              This isn't a contact form. This is where EmviApp becomes better because of you. 
              Whether you're here to dream big, point out a bug, or just show love — we read every word.
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-950 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 p-6 md:p-8">
          <ContactForm />
        </div>
        
        <div className="text-center mt-10 text-muted-foreground">
          <div className="mb-2 flex items-center justify-center">
            <span className="inline-block w-8 h-0.5 bg-gradient-to-r from-purple-600/50 to-blue-600/50 mr-2"></span>
            <span className="text-sm font-medium uppercase tracking-wider">Final Message</span>
            <span className="inline-block w-8 h-0.5 bg-gradient-to-r from-blue-600/50 to-purple-600/50 ml-2"></span>
          </div>
          <p className="text-sm max-w-md mx-auto">
            We read every message. Your words guide EmviApp's growth.
            Together, we'll make something unforgettable.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;

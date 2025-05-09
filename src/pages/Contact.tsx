
import React from 'react';
import Layout from '@/components/layout/Layout';
import ContactForm from '@/components/ContactForm';

const ContactPage = () => {
  return (
    <Layout>
      <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">💬 What's on your mind?</h1>
          <p className="text-muted-foreground">
            Tell us anything. We're here to listen, improve, and build together.
          </p>
        </div>
        
        <ContactForm />
        
        <div className="text-center mt-8 text-sm text-muted-foreground">
          We read every message. Your voice helps shape EmviApp's future.
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;

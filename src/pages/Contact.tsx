
import React from 'react';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | EmviApp</title>
        <meta name="description" content="Get in touch with EmviApp support team" />
      </Helmet>
      
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">Contact Us</h1>
          <div className="space-y-4 text-gray-700">
            <p className="text-lg mb-4">
              Our Contact page is currently under development. Please check back later.
            </p>
            <p className="text-lg mb-4 italic">
              Trang Liên hệ hiện đang được phát triển. Vui lòng quay lại sau.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

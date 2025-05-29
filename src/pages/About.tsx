
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About EmviApp</title>
        <meta name="description" content="About EmviApp - The Beauty Industry Platform" />
      </Helmet>
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">About EmviApp</h1>
            <div className="space-y-4 text-gray-700">
              <p className="text-lg mb-4">
                Our About page is currently under development. Please check back later.
              </p>
              <p className="text-lg mb-4 italic">
                Trang giới thiệu hiện đang được phát triển. Vui lòng quay lại sau.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default About;

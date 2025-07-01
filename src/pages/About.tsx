
import React from 'react';
import Layout from '@/components/layout/Layout';

const About = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">About</h1>
            <p className="text-gray-600">
              Learn more about our platform
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;

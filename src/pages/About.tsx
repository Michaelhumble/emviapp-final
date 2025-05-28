
import React from 'react';
import Layout from '@/components/layout/Layout';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">About EmviApp</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              EmviApp is the premier platform connecting beauty professionals with clients across the industry.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-gray-600">
                  To create a thriving ecosystem where beauty professionals can showcase their talents, 
                  connect with clients, and grow their businesses while providing clients with easy access 
                  to top-quality beauty services.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
                <ul className="text-gray-600 space-y-2">
                  <li>• Professional portfolio showcases</li>
                  <li>• Job board for beauty professionals</li>
                  <li>• Client booking system</li>
                  <li>• Salon management tools</li>
                  <li>• Community networking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;

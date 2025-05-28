
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Welcome to EmviApp
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The premier platform connecting beauty professionals with clients
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">For Artists</h3>
              <p className="text-gray-600 mb-4">
                Showcase your portfolio and connect with clients
              </p>
              <Link to="/artists">
                <Button className="w-full">Explore Artists</Button>
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Find Jobs</h3>
              <p className="text-gray-600 mb-4">
                Discover opportunities in the beauty industry
              </p>
              <Link to="/jobs">
                <Button className="w-full">Browse Jobs</Button>
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Post a Job</h3>
              <p className="text-gray-600 mb-4">
                Find the perfect beauty professional for your salon
              </p>
              <Link to="/post-job">
                <Button className="w-full">Post Job</Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
            <p className="text-gray-600 mb-6">
              Join thousands of beauty professionals and clients on EmviApp
            </p>
            <Link to="/dashboard">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

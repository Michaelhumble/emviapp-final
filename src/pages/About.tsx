
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About EmviApp</title>
        <meta name="description" content="Learn more about EmviApp and our mission to connect beauty professionals with clients." />
      </Helmet>
      <Layout>
        <div className="container max-w-4xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              About EmviApp
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Our story, mission, and the people behind the platform.
            </p>
          </div>
          
          <div className="prose prose-lg mx-auto">
            <h2>Our Mission</h2>
            <p>
              EmviApp was created to bridge the gap between beauty professionals and clients, 
              making it easier than ever for talented artists to showcase their work and for 
              clients to discover skilled professionals in their area.
            </p>
            
            <h2>Our Story</h2>
            <p>
              Founded with a passion for empowering beauty industry professionals, EmviApp began as a simple idea: 
              what if we could create a platform that truly serves both independent artists and established salons?
            </p>
            <p>
              Today, we're building the most comprehensive beauty professional networking platform, 
              designed specifically for the unique needs of nail technicians, hair stylists, 
              lash artists, barbers, makeup artists, and more.
            </p>
            
            <h2>Our Values</h2>
            <ul>
              <li><strong>Community First</strong> - We believe in building a supportive network where professionals help each other grow.</li>
              <li><strong>Quality Service</strong> - We champion excellence in beauty services through education and showcasing top talent.</li>
              <li><strong>Inclusivity</strong> - Our platform welcomes all skill levels, backgrounds, and beauty specialties.</li>
              <li><strong>Innovation</strong> - We continuously improve our platform to better serve the evolving beauty industry.</li>
            </ul>
            
            <h2>Our Team</h2>
            <p>
              EmviApp is brought to you by a dedicated team of beauty industry enthusiasts and technology experts 
              who understand the challenges facing modern beauty professionals. We're working every day to build 
              features that make your professional life easier and help your business thrive.
            </p>
            
            <div className="text-center my-12">
              <p className="italic text-lg text-gray-600">
                "We believe that technology should make the beauty industry more human, not less."
              </p>
            </div>
            
            <h2>Join Our Community</h2>
            <p>
              Whether you're a salon owner looking to grow your business, an independent artist seeking new clients, 
              or someone passionate about beauty looking for skilled professionals, EmviApp is here for you.
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AboutPage;

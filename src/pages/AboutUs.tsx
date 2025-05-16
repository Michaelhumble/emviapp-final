
import React from 'react';
import { 
  Lightbulb, 
  Rocket, 
  BookOpen, 
  Sparkles, 
  MapPin 
} from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { Card } from '@/components/ui/card';

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center mb-16 text-center">
        <div className="mb-8">
          <Logo showText size="large" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Our Story. Our Journey. Our Purpose.
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl">
          Discover the heart behind EmviApp—a platform built by beauty professionals, for beauty professionals and customers.
        </p>
      </div>

      {/* Timeline Section */}
      <div className="max-w-4xl mx-auto mb-16 relative">
        <h2 className="text-3xl font-playfair font-semibold mb-12 text-center">Our Journey</h2>
        
        {/* Vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-600 via-indigo-500 to-blue-500 rounded-full"></div>
        
        {/* Timeline Items */}
        <div className="space-y-24 relative">
          {/* 2014: The Idea */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
              <h3 className="text-2xl font-playfair font-semibold mb-2">2014: The Idea</h3>
              <p className="text-gray-700">A spark of inspiration from 25 years in beauty.</p>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg">
                <Lightbulb size={24} />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <Card className="p-6 backdrop-blur-sm bg-white/80 border border-gray-100 shadow-xl rounded-xl">
                <p className="text-gray-700">
                  Our journey began with a simple observation: there was a disconnect in the beauty industry. 
                  With 25 years of experience, we recognized that something essential was missing.
                </p>
              </Card>
            </div>
          </div>
          
          {/* 2015: First Attempt */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0 md:order-1 md:-order-1">
              <Card className="p-6 backdrop-blur-sm bg-white/80 border border-gray-100 shadow-xl rounded-xl">
                <p className="text-gray-700">
                  We launched our first app with high hopes. Despite investing years and all our resources, 
                  we learned that building the right solution would take more than we initially thought.
                </p>
              </Card>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg">
                <Rocket size={24} />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12 md:order-2">
              <h3 className="text-2xl font-playfair font-semibold mb-2">2015: First Attempt</h3>
              <p className="text-gray-700">Our first app was born; we spent years and all our resources, but still fell short.</p>
            </div>
          </div>
          
          {/* 2015–2023: Lessons & Perseverance */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
              <h3 className="text-2xl font-playfair font-semibold mb-2">2015–2023: Lessons & Perseverance</h3>
              <p className="text-gray-700">Eight years of hard work, setbacks, but never giving up.</p>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg">
                <BookOpen size={24} />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <Card className="p-6 backdrop-blur-sm bg-white/80 border border-gray-100 shadow-xl rounded-xl">
                <p className="text-gray-700">
                  These years were filled with learning, adjusting, and never losing sight of our vision. 
                  Every setback taught us something valuable about what the beauty industry truly needed.
                </p>
              </Card>
            </div>
          </div>
          
          {/* 2024: Rebirth */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0 md:order-1 md:-order-1">
              <Card className="p-6 backdrop-blur-sm bg-white/80 border border-gray-100 shadow-xl rounded-xl">
                <p className="text-gray-700">
                  With renewed vision and inspiration, EmviApp was reborn. We approached the problem with 
                  fresh eyes and a deeper understanding of the industry's needs.
                </p>
              </Card>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg">
                <Sparkles size={24} />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12 md:order-2">
              <h3 className="text-2xl font-playfair font-semibold mb-2">2024: Rebirth</h3>
              <p className="text-gray-700">With new vision and the help of Sunshine, EmviApp is reborn.</p>
            </div>
          </div>
          
          {/* Now: Our Journey Continues */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
              <h3 className="text-2xl font-playfair font-semibold mb-2">Now: Our Journey Continues</h3>
              <p className="text-gray-700">We build bridges between artists, salons, and clients—so no one is ever lost again.</p>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg">
                <MapPin size={24} />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <Card className="p-6 backdrop-blur-sm bg-white/80 border border-gray-100 shadow-xl rounded-xl">
                <p className="text-gray-700">
                  Today, we're committed to building the ultimate connection platform for the beauty industry. 
                  Every feature is designed to ensure nobody feels lost or disconnected again.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

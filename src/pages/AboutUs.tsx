
import React, { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { GradientBackground } from '@/components/ui/gradient-background';
import { MobileButton } from '@/components/ui/mobile-button';
import { Bulb, ArrowRight } from 'lucide-react';

const AboutUs = () => {
  // Animation refs for the timeline items
  const timeline1Ref = useRef<HTMLDivElement>(null);
  const timeline2Ref = useRef<HTMLDivElement>(null);
  const timeline3Ref = useRef<HTMLDivElement>(null);
  const timeline4Ref = useRef<HTMLDivElement>(null);
  const timeline5Ref = useRef<HTMLDivElement>(null);

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      {/* Hero Section */}
      <section className="mb-20">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/emvilogo//emvi-logo-transparent.png"
              alt="EmviApp Logo" 
              className="h-32 md:h-40 w-auto"
            />
          </div>

          {/* Hero Text */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent leading-tight">
            Our Story. Our Journey. Our Purpose.
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl">
            Discover the heart behind EmviApp—a platform built by beauty professionals, for beauty professionals and customers.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="mb-20">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-12 text-center">
          Our Journey
        </h2>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-400 to-indigo-500"></div>

          {/* Timeline Items */}
          <div className="space-y-24 relative">
            {/* 2014: The Idea */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0 md:text-right">
                <Card className="p-6 bg-white/60 backdrop-blur-sm border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-playfair font-bold mb-2 text-purple-700">2014: The Idea</h3>
                  <p className="text-gray-700">A spark of inspiration from 25 years in beauty.</p>
                </Card>
              </div>
              <div className="relative mx-auto md:mx-0 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
                <Bulb className="w-6 h-6 text-white" />
              </div>
              <div className="md:w-1/2 md:pl-8 hidden md:block"></div>
            </div>

            {/* 2015: First Attempt */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0 hidden md:block"></div>
              <div className="relative mx-auto md:mx-0 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10"></polyline>
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                </svg>
              </div>
              <div className="md:w-1/2 md:pl-8">
                <Card className="p-6 bg-white/60 backdrop-blur-sm border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-playfair font-bold mb-2 text-purple-700">2015: First Attempt</h3>
                  <p className="text-gray-700">Our first app was born; we spent years and all our resources, but still fell short.</p>
                </Card>
              </div>
            </div>

            {/* 2015-2023: Lessons & Perseverance */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0 md:text-right">
                <Card className="p-6 bg-white/60 backdrop-blur-sm border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-playfair font-bold mb-2 text-purple-700">2015–2023: Lessons & Perseverance</h3>
                  <p className="text-gray-700">Eight years of hard work, setbacks, but never giving up.</p>
                </Card>
              </div>
              <div className="relative mx-auto md:mx-0 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </div>
              <div className="md:w-1/2 md:pl-8 hidden md:block"></div>
            </div>

            {/* 2024: Rebirth */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0 hidden md:block"></div>
              <div className="relative mx-auto md:mx-0 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 16.36v-2.36a7 7 0 1 0-14 0v2.36"></path>
                  <polyline points="12 12 12 16"></polyline>
                  <line x1="12" y1="20" x2="12" y2="20"></line>
                </svg>
              </div>
              <div className="md:w-1/2 md:pl-8">
                <Card className="p-6 bg-white/60 backdrop-blur-sm border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-playfair font-bold mb-2 text-purple-700">2024: Rebirth</h3>
                  <p className="text-gray-700">With new vision and the help of Sunshine, EmviApp is reborn.</p>
                </Card>
              </div>
            </div>

            {/* Now: Our Journey Continues */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0 md:text-right">
                <Card className="p-6 bg-white/60 backdrop-blur-sm border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-playfair font-bold mb-2 text-purple-700">Now: Our Journey Continues</h3>
                  <p className="text-gray-700">We build bridges between artists, salons, and clients—so no one is ever lost again.</p>
                </Card>
              </div>
              <div className="relative mx-auto md:mx-0 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              <div className="md:w-1/2 md:pl-8 hidden md:block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mb-10">
        <GradientBackground 
          variant="premium" 
          className="p-8 md:p-12 text-center rounded-2xl shadow-xl"
        >
          <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">
            Ready to join our journey?
          </h2>
          <p className="text-gray-700 mb-6">
            Become part of something beautiful.
          </p>
          <MobileButton 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
            mobileFullWidth={true}
          >
            Get Started Free
          </MobileButton>
        </GradientBackground>
      </section>
    </div>
  );
};

export default AboutUs;

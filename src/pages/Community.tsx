
import React from 'react';
import Layout from '@/components/layout/Layout';
import PremiumHeroSection from '@/components/community/PremiumHeroSection';
import FOMOBanner from '@/components/community/FOMOBanner';
import CommunityStories from '@/components/community/CommunityStories';
import CommunityPostingRestriction from '@/components/community/CommunityPostingRestriction';
import FeatureSuggestionCard from '@/components/community/FeatureSuggestionCard';
import CommunityQA from '@/components/community/CommunityQA';
import CommunityActionCTAs from '@/components/community/CommunityActionCTAs';
import ViralGrowthButtons from '@/components/community/ViralGrowthButtons';
import SponsorTeasers from '@/components/community/SponsorTeasers';

const Community = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* FOMO Banner - Sticky top banner */}
        <FOMOBanner />
        
        {/* Premium Hero Section */}
        <PremiumHeroSection />
        
        {/* Main Content Container */}
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
          
          {/* Community Guidelines */}
          <CommunityPostingRestriction />
          
          {/* Feature Suggestion Card */}
          <FeatureSuggestionCard />
          
          {/* Sponsor Teasers */}
          <SponsorTeasers />
          
          {/* Main Stories Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Community Stories */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Community Stories</h2>
                <p className="text-gray-600">
                  Share your beauty journey and connect with our community
                </p>
              </div>
              <CommunityStories />
            </div>
            
            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Viral Growth Buttons */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Grow Your Network
                </h3>
                <ViralGrowthButtons />
              </div>
              
              {/* Community Action CTAs */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Take Action
                </h3>
                <CommunityActionCTAs />
              </div>
            </div>
          </div>
          
          {/* Q&A Section */}
          <div className="mt-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Expert Q&A Corner
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get answers from industry experts and learn from the community's collective wisdom
              </p>
            </div>
            <CommunityQA />
          </div>
          
          {/* Bottom Call-to-Action Section */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center mt-12 border border-purple-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Join Our Premium Community?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Unlock exclusive features, get priority support, and connect with top professionals in the beauty industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
                Upgrade to Premium
              </button>
              <button className="border-2 border-purple-300 text-purple-700 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Community;

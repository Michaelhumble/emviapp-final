import React from 'react';

const ArtistsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            💅 Discover Talented Artists
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Connect with skilled beauty professionals near you
          </p>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <p className="text-gray-700">
              Artist directory coming soon! We're curating the best beauty professionals for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistsPage;
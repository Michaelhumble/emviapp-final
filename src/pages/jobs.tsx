import React from 'react';

const JobsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🔍 Find Your Dream Beauty Job
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover amazing opportunities in the beauty industry
          </p>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <p className="text-gray-700">
              Job listings coming soon! We're building an amazing marketplace for beauty professionals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
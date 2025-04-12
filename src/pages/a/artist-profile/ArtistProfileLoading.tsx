
import React from "react";

const ArtistProfileLoading: React.FC = () => {
  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <div className="animate-pulse space-y-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="rounded-full bg-gray-200 h-32 w-32"></div>
          <div className="flex-1 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="h-40 bg-gray-200 rounded"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="aspect-square bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistProfileLoading;

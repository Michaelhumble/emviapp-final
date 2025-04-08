
import React from "react";

const ProfileLoading: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <div className="h-16 w-16 rounded-full animate-pulse bg-purple-100"></div>
        <div className="h-8 w-64 animate-pulse bg-gray-200 rounded"></div>
        <div className="h-4 w-48 animate-pulse bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default ProfileLoading;


import React from "react";

type Props = {
  children: React.ReactNode;
};

const FreelancerDashboardLayout: React.FC<Props> = ({ children }) => (
  <div className="min-h-screen w-full bg-gradient-to-b from-purple-50 to-purple-100 px-2 sm:px-4 md:px-8 py-4 md:py-10">
    <div className="max-w-5xl mx-auto w-full rounded-lg md:rounded-2xl shadow-lg border border-purple-200 bg-white/95 backdrop-blur-lg">
      <header className="px-4 sm:px-6 py-4 md:py-7 bg-gradient-to-r from-purple-200/60 to-purple-100/60 rounded-t-lg md:rounded-t-2xl flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0 border-b border-purple-100/60">
        <div className="text-center md:text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-purple-700">Freelancer Dashboard</h1>
          <p className="text-gray-600 font-medium mt-1 text-xs sm:text-sm md:text-base max-w-sm">Track your business, manage services, and connect with clients in style.</p>
        </div>
        <div className="flex gap-2 sm:gap-4">
          <div className="text-xs sm:text-sm text-purple-600 bg-white/50 px-2 sm:px-3 py-1 rounded-full">
            ✨ MVP Version
          </div>
        </div>
      </header>
      <main className="p-3 sm:p-5 md:p-8">{children}</main>
    </div>
  </div>
);

export default FreelancerDashboardLayout;

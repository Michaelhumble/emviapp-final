import React from 'react';
import { expiredJobsData } from '@/data/expiredJobsData';

interface ExpiredJob {
  id: string;
  title: string;
  vietnamese_title?: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  vietnamese_description?: string;
  category: string;
  employment_type: string;
  image_url: string;
  created_at: string;
  expired_at: string;
  filled_date: string;
}

const ExpiredJobCard: React.FC<{ job: ExpiredJob }> = ({ job }) => {
  return (
    <div className="relative border border-gray-300 rounded-lg overflow-hidden bg-white opacity-75 hover:opacity-85 transition-opacity">
      {/* Expired Overlay */}
      <div className="absolute inset-0 bg-gray-900/40 z-10 flex items-center justify-center">
        <div className="bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
          ❌ Position Filled
        </div>
      </div>
      
      <div className="p-4 filter grayscale">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              {job.vietnamese_title || job.title}
            </h3>
            {job.vietnamese_title && job.title !== job.vietnamese_title && (
              <p className="text-sm text-gray-500">{job.title}</p>
            )}
          </div>
          <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full font-medium">
            {job.category}
          </span>
        </div>
        
        <p className="text-gray-600 mb-1 font-medium">{job.company}</p>
        <p className="text-gray-500 text-sm mb-2">{job.location}</p>
        <p className="text-gray-600 text-sm font-semibold mb-2">{job.salary}</p>
        
        {/* Job Image */}
        {job.image_url && (
          <div className="mt-3 mb-3">
            <img
              src={job.image_url}
              alt={job.title}
              className="w-full h-32 object-cover rounded filter grayscale"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
        
        {/* Description - truncated */}
        <div className="text-gray-600 text-sm line-clamp-2">
          {job.category === 'Nail Tech' && job.vietnamese_description ? (
            <p>{job.vietnamese_description}</p>
          ) : (
            <p>{job.description}</p>
          )}
        </div>
        
        {/* Filled date and FOMO message */}
        <div className="mt-3 text-xs text-gray-500">
          Position filled on {new Date(job.filled_date).toLocaleDateString()}
        </div>
        <div className="mt-2 text-xs text-red-600 font-medium">
          Missed out? Check back daily for new opportunities!
        </div>
      </div>
    </div>
  );
};

const ExpiredJobsSection: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto pt-12 pb-8 relative z-0">
      {/* Clear visual separator */}
      <div className="border-t border-gray-200 mb-12"></div>
      
      {/* Prominent Banner */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-6 text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-2">These jobs filled FAST—Sign up to unlock first access to the next wave</h2>
          <p className="text-red-100">Join thousands who get priority access to new opportunities</p>
        </div>
      </div>
      
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-700 mb-4">Recently Filled Positions</h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          These high-paying positions filled within days of posting. 
          <span className="font-semibold text-purple-700"> Don't miss out—sign in for instant notifications.</span>
        </p>
        
        {/* Testimonial */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-center mb-3">
              <div className="flex text-yellow-400">
                ★★★★★
              </div>
            </div>
            <p className="text-blue-900 font-medium mb-3 italic">
              "I got my dream nail tech job in just 2 days! The salon owner contacted me within hours of posting."
            </p>
            <p className="text-blue-700 text-sm font-semibold">
              — T. Nguyen, Nail Technician, Houston
            </p>
            <p className="text-blue-600 text-xs mt-1">Representative testimonial</p>
          </div>
        </div>
        
        {/* FOMO Alert */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-4 shadow-sm">
            <p className="text-red-800 text-sm font-medium">
              ⚡ <span className="font-bold">Position Filled:</span> All listings below were filled within 48 hours. 
              Missed out? Check back daily for new opportunities!
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {expiredJobsData.map((job) => (
          <ExpiredJobCard key={job.id} job={job} />
        ))}
      </div>
      
      <div className="text-center mt-12">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-bold text-purple-800 mb-2">Sign Up for Priority Access</h4>
          <p className="text-purple-700 text-sm mb-4">
            Get notified before jobs go public. First come, first served!
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
            Get Early Access
          </button>
        </div>
        
        <p className="text-gray-500 text-xs mb-2">
          Sample listings inspired by industry trends. All live jobs require sign-in for full details.
        </p>
        <p className="text-gray-500 text-sm">
          Want to be first in line for new opportunities? 
          <span className="font-semibold text-purple-700 ml-1">Check back daily for fresh job postings!</span>
        </p>
      </div>
    </section>
  );
};

export default ExpiredJobsSection;
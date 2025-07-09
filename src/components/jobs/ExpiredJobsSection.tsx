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
  image: string;
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
        {job.image && (
          <div className="mt-3 mb-3">
            <img
              src={job.image}
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
        
        {/* Filled date */}
        <div className="mt-3 text-xs text-gray-500">
          Position filled on {new Date(job.filled_date).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

const ExpiredJobsSection: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto mt-16 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-700 mb-2">Recently Filled Positions</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          See what opportunities were recently available. These positions have been filled, 
          but similar roles are posted daily. <span className="font-semibold text-purple-700">Stay tuned for new openings!</span>
        </p>
        <div className="mt-4 bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300 rounded-lg p-4 max-w-xl mx-auto">
          <p className="text-yellow-800 text-sm font-medium">
            💡 <span className="font-bold">FOMO Alert:</span> These great jobs filled up fast! 
            Don't miss the next batch—check back daily for fresh opportunities.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {expiredJobsData.map((job) => (
          <ExpiredJobCard key={job.id} job={job} />
        ))}
      </div>
      
      <div className="text-center mt-8">
        <p className="text-gray-500 text-sm">
          Want to be first in line for new opportunities? 
          <span className="font-semibold text-purple-700 ml-1">Check back tomorrow for fresh job postings!</span>
        </p>
      </div>
    </section>
  );
};

export default ExpiredJobsSection;
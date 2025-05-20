
import React from 'react';

interface JobPhotosFormProps {
  children: React.ReactNode;
}

const JobPhotosForm: React.FC<JobPhotosFormProps> = ({ children }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-base font-semibold">Upload Photos</h3>
        <p className="text-sm text-gray-600">
          Add photos of your salon or workplace to attract more candidates. 
          High-quality images increase application rates by up to 70%.
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border border-indigo-100">
        <p className="text-sm text-indigo-800 mb-4">
          <span className="font-medium">Pro Tip:</span> Include photos of your 
          salon interior, work environment, and examples of work done at your salon 
          to give candidates a better idea of what to expect.
        </p>
        {children}
      </div>
      
      <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
        <h4 className="text-amber-800 font-medium text-sm">Why photos matter:</h4>
        <ul className="text-sm text-amber-700 mt-2 space-y-1 list-disc pl-4">
          <li>Job posts with photos get 2.5x more applications</li>
          <li>Candidates trust salons that show their actual workspace</li>
          <li>Visual appeal helps set expectations for potential employees</li>
        </ul>
      </div>
    </div>
  );
};

export default JobPhotosForm;


import React, { useState } from 'react';
import { useJobPosting } from '@/context/JobPostingContext';
import { formatCurrency } from '@/utils/formatting';

export const JobPostingDebugPanel: React.FC = () => {
  const { 
    jobData, 
    pricingOptions, 
    photoUploads, 
    currentStep, 
    calculatedPrice, 
    ui,
    isLegacyFlow,
    toggleDebugPanel,
    resetForm
  } = useJobPosting();
  
  const [expanded, setExpanded] = useState<boolean>(false);
  const [showFullState, setShowFullState] = useState<boolean>(false);

  if (!ui.showDebugPanel) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden">
      <div 
        className="p-2 bg-gray-800 flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="font-mono text-sm">🛠️ Job Posting Debug</h3>
        <span>{expanded ? '▼' : '▶'}</span>
      </div>
      
      {expanded && (
        <div className="p-3 max-h-96 overflow-y-auto font-mono text-xs">
          <div className="bg-amber-900/20 p-2 rounded mb-3 flex justify-between items-center">
            <span>Flow Type: {isLegacyFlow ? 'Legacy' : 'Context'}</span>
            <button 
              className="px-2 py-0.5 bg-amber-600/40 rounded text-xs hover:bg-amber-600/60"
              onClick={() => {
                localStorage.setItem('useJobPostingLegacyFlow', (!isLegacyFlow).toString());
                window.location.reload();
              }}
            >
              Switch Flow
            </button>
          </div>
          
          <div className="mb-3">
            <div className="text-gray-400 mb-1">Current Step:</div>
            <div className="bg-gray-800 p-2 rounded">{currentStep}</div>
          </div>
          
          <div className="mb-3">
            <div className="text-gray-400 mb-1">Pricing Options:</div>
            <pre className="bg-gray-800 p-2 rounded whitespace-pre-wrap">
              {JSON.stringify({
                tier: pricingOptions.selectedPricingTier,
                duration: pricingOptions.durationMonths,
                autoRenew: pricingOptions.autoRenew,
                isFirstPost: pricingOptions.isFirstPost,
                isNationwide: pricingOptions.isNationwide
              }, null, 2)}
            </pre>
          </div>
          
          <div className="mb-3">
            <div className="text-gray-400 mb-1">Calculated Price:</div>
            <pre className="bg-gray-800 p-2 rounded whitespace-pre-wrap">
              {JSON.stringify({
                original: formatCurrency(calculatedPrice.originalPrice),
                final: formatCurrency(calculatedPrice.finalPrice),
                discount: `${calculatedPrice.discountPercentage}%`
              }, null, 2)}
            </pre>
          </div>
          
          <div className="mb-3">
            <div className="flex justify-between items-center text-gray-400 mb-1">
              <span>Job Data:</span>
              <button 
                className="text-xs text-blue-400 hover:text-blue-300"
                onClick={() => setShowFullState(!showFullState)}
              >
                {showFullState ? 'Show Less' : 'Show More'}
              </button>
            </div>
            <div className="bg-gray-800 p-2 rounded max-h-32 overflow-y-auto">
              <pre className="whitespace-pre-wrap">
                {showFullState 
                  ? JSON.stringify(jobData, null, 2) 
                  : JSON.stringify({
                      title: jobData.title,
                      location: jobData.location,
                      type: jobData.jobType,
                      exp: jobData.experience_level
                    }, null, 2)}
              </pre>
            </div>
          </div>
          
          <div className="mb-3">
            <div className="text-gray-400 mb-1">Photo Uploads:</div>
            <div className="bg-gray-800 p-2 rounded">
              {photoUploads.length} file(s)
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button 
              className="mt-2 px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
              onClick={() => {
                resetForm();
                window.location.reload();
              }}
            >
              Reset State
            </button>
            
            <button 
              className="mt-2 px-2 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-700"
              onClick={toggleDebugPanel}
            >
              Hide Panel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPostingDebugPanel;

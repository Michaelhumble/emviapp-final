
import React, { useState } from 'react';
import { useJobPosting } from '@/context/JobPostingContext';
import { formatCurrency } from '@/utils/formatting';
import { getJobPostingEvents, clearJobPostingEvents, exportJobPostingEvents, JobPostingEventType } from '@/utils/telemetry/jobPostingEvents';
import { recoverJobPostingFlow, RecoveryAction } from '@/utils/rollback/jobPostingRollback';

/**
 * Debug panel for developers to inspect job posting state during development
 */
export const JobPostingDebugPanel: React.FC = () => {
  const { 
    jobData, 
    pricingOptions, 
    photoUploads, 
    currentStep, 
    calculatedPrice, 
    validation, 
    ui,
    toggleDebugPanel,
    resetForm
  } = useJobPosting();
  
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('state');
  const [showEvents, setShowEvents] = useState(false);

  // Don't render if debug panel is disabled
  if (!ui.showDebugPanel) return null;
  
  // Get events for event log tab
  const events = getJobPostingEvents();
  
  // Format event timestamp
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden">
      <div 
        className="p-2 bg-gray-800 flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="font-mono text-sm">🛠️ Job Posting Debug</h3>
        <div className="flex gap-2">
          <button 
            className="px-1 text-xs bg-blue-600 hover:bg-blue-700 rounded"
            onClick={(e) => {
              e.stopPropagation();
              toggleDebugPanel();
            }}
          >
            Hide
          </button>
          <span>{expanded ? '▼' : '▶'}</span>
        </div>
      </div>
      
      {expanded && (
        <div>
          {/* Tab navigation */}
          <div className="flex border-b border-gray-700">
            <button 
              className={`flex-1 py-1 px-2 text-xs font-medium ${activeTab === 'state' ? 'bg-gray-700' : ''}`}
              onClick={() => setActiveTab('state')}
            >
              State
            </button>
            <button 
              className={`flex-1 py-1 px-2 text-xs font-medium ${activeTab === 'events' ? 'bg-gray-700' : ''}`}
              onClick={() => setActiveTab('events')}
            >
              Events
            </button>
            <button 
              className={`flex-1 py-1 px-2 text-xs font-medium ${activeTab === 'tools' ? 'bg-gray-700' : ''}`}
              onClick={() => setActiveTab('tools')}
            >
              Tools
            </button>
          </div>
          
          {/* Tab content */}
          <div className="p-3 max-h-[80vh] overflow-y-auto font-mono text-xs">
            {activeTab === 'state' && (
              <>
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-400">Current Step:</span>
                    <span className="px-1.5 py-0.5 rounded bg-blue-800 text-white">{currentStep}</span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="text-gray-400 mb-1">Pricing Options:</div>
                  <pre className="bg-gray-800 p-2 rounded whitespace-pre-wrap overflow-x-auto">
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
                  <pre className="bg-gray-800 p-2 rounded whitespace-pre-wrap overflow-x-auto">
                    {JSON.stringify({
                      originalPrice: calculatedPrice.originalPrice,
                      finalPrice: calculatedPrice.finalPrice,
                      discount: `${calculatedPrice.discountPercentage}%`,
                      formattedFinalPrice: calculatedPrice.formattedFinalPrice,
                      recurringBilling: calculatedPrice.recurringBilling,
                    }, null, 2)}
                  </pre>
                </div>
                
                <div className="mb-3">
                  <div className="text-gray-400 mb-1">Validation:</div>
                  <div className="bg-gray-800 p-2 rounded">
                    <div>Job Data Valid: <span className={validation.hasValidJobData ? "text-green-400" : "text-red-400"}>
                      {validation.hasValidJobData ? "✓" : "✗"}
                    </span></div>
                    <div>Pricing Valid: <span className={validation.hasValidPricing ? "text-green-400" : "text-red-400"}>
                      {validation.hasValidPricing ? "✓" : "✗"}
                    </span></div>
                    {validation.errors.length > 0 && (
                      <div className="mt-1">
                        <div className="text-red-400">Errors:</div>
                        <ul className="list-disc pl-4">
                          {validation.errors.map((error, i) => (
                            <li key={i} className="text-red-300">{error}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="text-gray-400 mb-1">Job Data:</div>
                  <div className="bg-gray-800 p-2 rounded max-h-32 overflow-y-auto">
                    <div className="flex flex-col gap-1">
                      <div>title: {jobData.title || "(empty)"}</div>
                      <div>location: {jobData.location || "(empty)"}</div>
                      <div>contactEmail: {jobData.contactEmail || "(empty)"}</div>
                    </div>
                    <div 
                      className="mt-1 text-blue-400 cursor-pointer hover:underline"
                      onClick={() => setExpanded(prev => !prev)}
                    >
                      {expanded ? "Hide full job data" : "Show full job data"}
                    </div>
                    {expanded && (
                      <pre className="whitespace-pre-wrap overflow-x-auto mt-1">
                        {JSON.stringify(jobData, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="text-gray-400 mb-1">Photo Uploads:</div>
                  <div className="bg-gray-800 p-2 rounded">
                    {photoUploads.length} file(s)
                    {photoUploads.length > 0 && (
                      <ul className="mt-1">
                        {photoUploads.map((file, i) => (
                          <li key={i} className="truncate">{file.name} ({Math.round(file.size/1024)} KB)</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </>
            )}
            
            {activeTab === 'events' && (
              <>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Recent Events</h3>
                  <div className="flex gap-1">
                    <button 
                      className="px-1.5 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs"
                      onClick={() => {
                        const eventsJson = exportJobPostingEvents();
                        navigator.clipboard.writeText(eventsJson);
                        alert('Event log copied to clipboard!');
                      }}
                    >
                      Copy
                    </button>
                    <button 
                      className="px-1.5 py-0.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
                      onClick={() => {
                        if (confirm('Clear all event logs?')) {
                          clearJobPostingEvents();
                          setShowEvents(false);
                        }
                      }}
                    >
                      Clear
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded overflow-hidden">
                  {events.length === 0 ? (
                    <div className="p-3 text-center text-gray-400">No events logged yet</div>
                  ) : (
                    <div className="max-h-80 overflow-y-auto">
                      {events.slice().reverse().map((event, index) => (
                        <div 
                          key={index} 
                          className={`p-2 border-b border-gray-700 ${
                            event.eventType === JobPostingEventType.ERROR 
                              ? 'bg-red-900/30' 
                              : event.eventType === JobPostingEventType.PAYMENT_ATTEMPT
                                ? 'bg-green-900/30'
                                : ''
                          }`}
                        >
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-400">
                              {formatTimestamp(event.timestamp)}
                            </span>
                            <span className="text-xs px-1 rounded bg-gray-700">
                              {event.eventType}
                            </span>
                          </div>
                          <div className="font-medium my-1">{event.eventName}</div>
                          {(event.data || event.error) && (
                            <div 
                              className="cursor-pointer text-blue-400 text-xs mt-1"
                              onClick={() => setShowEvents(prev => prev === index ? false : index)}
                            >
                              {showEvents === index ? 'Hide details' : 'Show details'}
                            </div>
                          )}
                          {showEvents === index && (
                            <div className="mt-1">
                              {event.data && (
                                <pre className="text-xs bg-gray-900 p-1 rounded mt-1 max-h-32 overflow-y-auto">
                                  {JSON.stringify(event.data, null, 2)}
                                </pre>
                              )}
                              {event.error && (
                                <div className="text-red-400 mt-1">
                                  Error: {event.error}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
            
            {activeTab === 'tools' && (
              <>
                <div className="mb-3">
                  <h3 className="text-sm font-medium mb-2">Debug Tools</h3>
                  
                  <div className="space-y-2">
                    <button 
                      className="w-full px-2 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs flex items-center justify-center gap-1"
                      onClick={() => {
                        resetForm();
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Reset Form State
                    </button>
                    
                    <button 
                      className="w-full px-2 py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded text-xs flex items-center justify-center gap-1"
                      onClick={() => {
                        recoverJobPostingFlow(RecoveryAction.SWITCH_TO_LEGACY);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                      Switch to Legacy Flow
                    </button>
                    
                    <button 
                      className="w-full px-2 py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded text-xs flex items-center justify-center gap-1"
                      onClick={() => {
                        const state = {
                          jobData,
                          pricingOptions,
                          calculatedPrice,
                          validation,
                          currentStep
                        };
                        navigator.clipboard.writeText(JSON.stringify(state, null, 2));
                        alert('State copied to clipboard!');
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      Copy Full State
                    </button>
                    
                    <div className="p-2 bg-gray-800 rounded border border-gray-700">
                      <h4 className="text-xs font-medium mb-2">Simulate Errors</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <button 
                          className="px-1 py-0.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
                          onClick={() => {
                            throw new Error('Simulated error from debug panel');
                          }}
                        >
                          Throw Error
                        </button>
                        
                        <button 
                          className="px-1 py-0.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
                          onClick={() => {
                            localStorage.setItem('jobPostingError', 'true');
                            alert('Error flag set');
                          }}
                        >
                          Set Error Flag
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            <div className="mt-4 flex space-x-2">
              <button 
                className="flex-1 px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
                onClick={() => {
                  if (confirm('Are you sure you want to reset the form state?')) {
                    resetForm();
                  }
                }}
              >
                Reset State
              </button>
              
              <button 
                className="flex-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs"
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify({
                    jobData,
                    pricingOptions,
                    calculatedPrice,
                    validation,
                    ui
                  }, null, 2));
                  alert('State copied to clipboard!');
                }}
              >
                Copy State
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const JobsDebugPanel = () => {
  const [debugResults, setDebugResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runDebugQuery = async () => {
    setLoading(true);
    try {
      console.log('🔍 [DEBUG] Running comprehensive jobs debug query...');
      
      // Get ALL jobs regardless of status
      const { data: allJobs, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ [DEBUG] Error:', error);
        setDebugResults({ error: error.message });
        return;
      }

      const activeJobs = allJobs?.filter(job => job.status === 'active') || [];
      const inactiveJobs = allJobs?.filter(job => job.status !== 'active') || [];

      const results = {
        totalJobs: allJobs?.length || 0,
        activeJobs: activeJobs.length,
        inactiveJobs: inactiveJobs.length,
        allJobsData: allJobs?.map(job => ({
          id: job.id,
          title: job.title,
          status: job.status,
          pricing_tier: job.pricing_tier,
          user_id: job.user_id,
          created_at: job.created_at
        })) || [],
        activeJobsData: activeJobs.map(job => ({
          id: job.id,
          title: job.title,
          status: job.status,
          pricing_tier: job.pricing_tier,
          user_id: job.user_id,
          created_at: job.created_at
        }))
      };

      console.log('🔍 [DEBUG] Complete results:', results);
      setDebugResults(results);

    } catch (err) {
      console.error('💥 [DEBUG] Error:', err);
      setDebugResults({ error: (err as Error).message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-6">
      <div className="flex items-center gap-4 mb-4">
        <h3 className="text-lg font-semibold">🔍 Jobs Debug Panel</h3>
        <button
          onClick={runDebugQuery}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Running...' : 'Debug Jobs Query'}
        </button>
      </div>

      {debugResults && (
        <div className="bg-white p-4 rounded border">
          <h4 className="font-semibold mb-2">Query Results:</h4>
          <div className="text-sm space-y-2">
            <div>Total Jobs in DB: <strong>{debugResults.totalJobs}</strong></div>
            <div>Active Jobs: <strong>{debugResults.activeJobs}</strong></div>
            <div>Inactive Jobs: <strong>{debugResults.inactiveJobs}</strong></div>
            
            {debugResults.error && (
              <div className="text-red-600">Error: {debugResults.error}</div>
            )}
            
            {debugResults.activeJobsData && (
              <details className="mt-4">
                <summary className="cursor-pointer font-medium">Active Jobs Details</summary>
                <pre className="mt-2 p-2 bg-gray-50 rounded text-xs overflow-auto">
                  {JSON.stringify(debugResults.activeJobsData, null, 2)}
                </pre>
              </details>
            )}
            
            <details className="mt-4">
              <summary className="cursor-pointer font-medium">All Jobs Details</summary>
              <pre className="mt-2 p-2 bg-gray-50 rounded text-xs overflow-auto max-h-64">
                {JSON.stringify(debugResults.allJobsData, null, 2)}
              </pre>
            </details>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsDebugPanel;

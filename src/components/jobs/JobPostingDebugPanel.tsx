
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const JobPostingDebugPanel = () => {
  const { user } = useAuth();
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [testing, setTesting] = useState(false);

  const runDebugTest = async () => {
    setTesting(true);
    const info: any = {
      timestamp: new Date().toISOString(),
      user: {
        authenticated: !!user,
        id: user?.id,
        email: user?.email
      },
      tests: {}
    };

    try {
      // Test 1: Check if we can read from jobs table
      console.log('🔍 [DEBUG] Testing jobs table read access...');
      const { data: readTest, error: readError } = await supabase
        .from('jobs')
        .select('count(*)')
        .limit(1);
      
      info.tests.readAccess = {
        success: !readError,
        error: readError?.message,
        data: readTest
      };
      console.log('📖 [DEBUG] Read test result:', info.tests.readAccess);

      // Test 2: Try a simple insert
      if (user) {
        console.log('🔍 [DEBUG] Testing jobs table insert access...');
        const testJob = {
          title: 'DEBUG TEST JOB - DELETE ME',
          category: 'Test',
          location: 'Test Location',
          description: 'This is a debug test job, please delete',
          user_id: user.id,
          status: 'active',
          pricing_tier: 'free',
          contact_info: { test: true },
          image_url: null // Include image_url field for consistency
        };

        const { data: insertTest, error: insertError } = await supabase
          .from('jobs')
          .insert([testJob])
          .select()
          .single();

        info.tests.insertAccess = {
          success: !insertError,
          error: insertError?.message,
          errorDetails: insertError ? {
            code: insertError.code,
            details: insertError.details,
            hint: insertError.hint
          } : null,
          data: insertTest
        };
        console.log('✏️ [DEBUG] Insert test result:', info.tests.insertAccess);

        // If insert succeeded, clean up the test job
        if (insertTest && !insertError) {
          console.log('🧹 [DEBUG] Cleaning up test job...');
          await supabase.from('jobs').delete().eq('id', insertTest.id);
        }
      }

    } catch (error) {
      info.tests.generalError = {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : null
      };
      console.error('🚨 [DEBUG] General error during testing:', error);
    }

    setDebugInfo(info);
    setTesting(false);
    console.log('🏁 [DEBUG] Debug test completed:', info);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mb-8 border-red-200 bg-red-50">
      <CardHeader>
        <CardTitle className="text-red-700">🔧 Job Posting Debug Panel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button 
            onClick={runDebugTest} 
            disabled={testing}
            className="bg-red-600 hover:bg-red-700"
          >
            {testing ? 'Running Debug Tests...' : 'Run Debug Tests'}
          </Button>

          {debugInfo && (
            <div className="bg-white p-4 rounded border">
              <h3 className="font-bold mb-2">Debug Results:</h3>
              <pre className="text-xs overflow-auto max-h-96 bg-gray-100 p-2 rounded">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          )}

          <div className="bg-yellow-100 p-4 rounded border border-yellow-300">
            <h4 className="font-bold text-yellow-800">Quick Status:</h4>
            <p>User Authenticated: {user ? '✅ Yes' : '❌ No'}</p>
            <p>User ID: {user?.id || 'None'}</p>
            <p>User Email: {user?.email || 'None'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobPostingDebugPanel;

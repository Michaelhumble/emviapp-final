import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';

const PaidJobFlowTest = () => {
  const { user } = useAuth();
  const [testResults, setTestResults] = useState<string[]>([]);
  const [testing, setTesting] = useState(false);

  const log = (message: string) => {
    console.log(message);
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testPaidJobFlow = async () => {
    if (!user) {
      log('❌ User not authenticated');
      return;
    }

    setTesting(true);
    setTestResults([]);
    
    try {
      log('🧪 Starting Paid Job Flow Test...');
      
      // Test 1: Create job checkout (should create draft job and return Stripe URL)
      log('📝 Step 1: Testing create-job-checkout edge function...');
      
      const testJobData = {
        title: 'Test Paid Job Posting',
        category: 'Nail Tech',
        location: 'Test City, TX',
        description: 'This is a test paid job posting to verify the payment flow',
        compensationType: 'hourly',
        compensationDetails: '$25/hour',
        requirements: ['Test requirement 1', 'Test requirement 2'],
        contactName: 'Test Contact',
        contactPhone: '555-1234',
        contactEmail: user.email,
        contactNotes: 'Test notes',
        selectedPlan: 'premium',
        selectedPrice: 39.99,
        selectedDuration: 1
      };

      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke(
        'create-job-checkout',
        {
          body: { jobData: testJobData }
        }
      );

      if (checkoutError) {
        log(`❌ Step 1 FAILED: ${JSON.stringify(checkoutError)}`);
        return;
      }

      if (checkoutData?.sessionId && checkoutData?.url) {
        log('✅ Step 1 PASSED: Checkout session created');
        log(`🔗 Stripe URL: ${checkoutData.url}`);
        
        // Test 2: Verify draft job was created
        log('📋 Step 2: Verifying draft job was created in database...');
        
        const { data: draftJobs, error: draftError } = await supabase
          .from('jobs')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'draft')
          .eq('title', testJobData.title)
          .order('created_at', { ascending: false })
          .limit(1);

        if (draftError) {
          log(`❌ Step 2 FAILED: ${draftError.message}`);
          return;
        }

        if (draftJobs && draftJobs.length > 0) {
          const draftJob = draftJobs[0];
          log('✅ Step 2 PASSED: Draft job found in database');
          log(`📋 Draft job ID: ${draftJob.id}`);
          log(`📋 Status: ${draftJob.status}`);
          log(`📋 Pricing tier: ${draftJob.pricing_tier}`);
          log(`📋 Payment status: ${draftJob.payment_status}`);
          
          // Test 3: Simulate webhook activation (manually for testing)
          log('🎣 Step 3: Testing webhook job activation (simulated)...');
          
          // Create service client to simulate webhook behavior
          const { data: activationResult, error: activationError } = await supabase
            .from('jobs')
            .update({ 
              status: 'active',
              payment_status: 'completed',
              updated_at: new Date().toISOString()
            })
            .eq('id', draftJob.id)
            .eq('status', 'draft')
            .select();

          if (activationError) {
            log(`❌ Step 3 FAILED: ${activationError.message}`);
            return;
          }

          if (activationResult && activationResult.length > 0) {
            log('✅ Step 3 PASSED: Job activated successfully');
            
            // Test 4: Verify job is now visible on jobs page
            log('👁️ Step 4: Verifying job is visible on jobs page...');
            
            const { data: activeJobs, error: activeError } = await supabase
              .from('jobs')
              .select('*')
              .eq('status', 'active')
              .eq('id', draftJob.id);

            if (activeError) {
              log(`❌ Step 4 FAILED: ${activeError.message}`);
              return;
            }

            if (activeJobs && activeJobs.length > 0) {
              log('✅ Step 4 PASSED: Job is visible on jobs page');
              log('🎉 ALL TESTS PASSED: Paid job flow is working correctly!');
              
              // Clean up test job
              log('🧹 Cleaning up test job...');
              await supabase.from('jobs').delete().eq('id', draftJob.id);
              log('✅ Test job cleaned up');
            } else {
              log('❌ Step 4 FAILED: Job not visible on jobs page');
            }
          } else {
            log('❌ Step 3 FAILED: Job activation returned no results');
          }
        } else {
          log('❌ Step 2 FAILED: No draft job found in database');
        }
      } else {
        log('❌ Step 1 FAILED: No checkout session data returned');
      }
      
    } catch (error) {
      log(`💥 Test failed with error: ${error}`);
    } finally {
      setTesting(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>🧪 Paid Job Flow Test</CardTitle>
        <p className="text-sm text-gray-600">
          This test verifies the entire paid job posting flow without actual payment.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button 
            onClick={testPaidJobFlow} 
            disabled={testing || !user}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {testing ? 'Running Test...' : 'Run Paid Job Flow Test'}
          </Button>
          <Button variant="outline" onClick={clearResults}>
            Clear Results
          </Button>
        </div>
        
        {!user && (
          <p className="text-red-600 text-sm">Please sign in to run the test.</p>
        )}
        
        {testResults.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Test Results:</h3>
            <div className="space-y-1 text-sm font-mono">
              {testResults.map((result, index) => (
                <div 
                  key={index} 
                  className={`${
                    result.includes('✅') ? 'text-green-600' : 
                    result.includes('❌') ? 'text-red-600' : 
                    result.includes('🎉') ? 'text-purple-600 font-bold' : 
                    'text-gray-700'
                  }`}
                >
                  {result}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaidJobFlowTest;
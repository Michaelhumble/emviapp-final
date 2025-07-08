import React from 'react';
import PaidJobFlowTest from '@/components/jobs/PaidJobFlowTest';
import { Container } from '@/components/ui/container';

const TestPaidJobFlow = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Paid Job Flow Test
          </h1>
          <p className="text-gray-600">
            Test the entire paid job posting flow to ensure everything works correctly.
          </p>
        </div>
        
        <PaidJobFlowTest />
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h2 className="font-semibold text-blue-900 mb-2">How this test works:</h2>
          <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
            <li>Creates a test job via the create-job-checkout edge function</li>
            <li>Verifies the draft job is created in the database</li>
            <li>Simulates webhook activation (since we can't trigger real payment)</li>
            <li>Confirms the job becomes visible on the jobs page</li>
            <li>Cleans up the test job when done</li>
          </ol>
        </div>
      </Container>
    </div>
  );
};

export default TestPaidJobFlow;
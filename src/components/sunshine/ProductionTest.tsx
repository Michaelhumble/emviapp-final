import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSunshineChat } from '@/hooks/useSunshineChat';

export const ProductionTest = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { sendMessage } = useSunshineChat();

  const runProductionTest = async () => {
    setIsLoading(true);
    setTestResult('');
    
    try {
      // Test if Sunshine chat works in production
      const response = await sendMessage('Hello, this is a production test');
      setTestResult(`✅ SUCCESS: Sunshine responded: "${response}"`);
    } catch (error) {
      setTestResult(`❌ ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Only show in development or if explicitly testing
  const isTestMode = process.env.NODE_ENV === 'development' || 
                    window.location.search.includes('test=sunshine');
  
  if (!isTestMode) return null;

  return (
    <div className="fixed top-4 left-4 z-50 bg-white p-4 border rounded shadow-lg max-w-sm">
      <h3 className="font-bold mb-2">🧪 Sunshine Production Test</h3>
      <Button 
        onClick={runProductionTest}
        disabled={isLoading}
        size="sm"
        className="mb-2"
      >
        {isLoading ? 'Testing...' : 'Test Sunshine'}
      </Button>
      {testResult && (
        <div className="text-xs mt-2 p-2 bg-gray-50 rounded">
          {testResult}
        </div>
      )}
    </div>
  );
};
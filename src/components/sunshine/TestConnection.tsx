import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabaseBypass } from '@/types/supabase-bypass';

export const TestSunshineConnection = () => {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const testConnection = async () => {
    setTesting(true);
    setResult(null);
    
    try {
      const { data, error } = await supabaseBypass.functions.invoke('test-sunshine');
      
      if (error) {
        setResult({ success: false, error: error.message });
      } else {
        setResult(data);
      }
      
    } catch (error) {
      setResult({ success: false, error: error.message });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-background border border-border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">🔧 Sunshine Chatbot Connection Test</h2>
      
      <Button 
        onClick={testConnection} 
        disabled={testing}
        className="mb-4"
      >
        {testing ? 'Testing Connection...' : 'Test OpenAI Connection'}
      </Button>

      {result && (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <h3 className={`font-medium ${result.success ? 'text-green-800' : 'text-red-800'}`}>
              {result.success ? '✅ Connection Successful!' : '❌ Connection Failed'}
            </h3>
            
            {result.success && result.tests && (
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="font-medium text-green-700">English Test:</h4>
                  <p className="text-sm text-gray-600 mb-1">Q: {result.tests.english.question}</p>
                  <p className="text-sm bg-white p-2 rounded border">A: {result.tests.english.answer}</p>
                  <p className="text-xs text-gray-500 mt-1">Tokens used: {result.tests.english.usage?.total_tokens}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-green-700">Vietnamese Test:</h4>
                  <p className="text-sm text-gray-600 mb-1">Q: {result.tests.vietnamese.question}</p>
                  <p className="text-sm bg-white p-2 rounded border">A: {result.tests.vietnamese.answer}</p>
                  <p className="text-xs text-gray-500 mt-1">Tokens used: {result.tests.vietnamese.usage?.total_tokens}</p>
                </div>
                
                <div className="text-sm font-medium text-green-700">
                  Total tokens used: {result.totalTokensUsed}
                </div>
              </div>
            )}
            
            {!result.success && (
              <div className="mt-2">
                <p className="text-red-700 text-sm">{result.error}</p>
                {result.hasKey !== undefined && (
                  <p className="text-red-600 text-xs mt-1">
                    API Key present: {result.hasKey ? 'Yes' : 'No'}
                    {result.keyLength && ` (Length: ${result.keyLength})`}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
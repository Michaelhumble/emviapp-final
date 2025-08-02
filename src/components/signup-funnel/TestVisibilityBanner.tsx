import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const TestVisibilityBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      console.log('🔍 TestVisibilityBanner: Making banner visible');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-4 left-4 right-4 z-[9999] bg-red-500 text-white p-4 rounded-lg shadow-2xl"
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '16px', 
        right: '16px',
        zIndex: 9999,
        backgroundColor: '#ef4444',
        color: 'white',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold">🚨 TEST BANNER VISIBLE!</h3>
          <p className="text-sm">If you see this, positioning works!</p>
        </div>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setIsVisible(false)}
          className="bg-white text-red-500 hover:bg-gray-100"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default TestVisibilityBanner;
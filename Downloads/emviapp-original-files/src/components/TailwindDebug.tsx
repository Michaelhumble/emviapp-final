
import React, { useEffect, useState } from 'react';

const TailwindDebug: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [tailwindClasses, setTailwindClasses] = useState<{[key: string]: boolean}>({});
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    console.log('TailwindDebug component mounted - v4.1.0 compatibility check');
    
    // Create test elements with different Tailwind classes
    const testElements = [
      { className: 'bg-purple-500', description: 'purple background' },
      { className: 'text-green-500', description: 'green text' },
      { className: 'p-4', description: 'padding' },
      { className: 'rounded-xl', description: 'rounded corners' },
      { className: 'shadow-lg', description: 'shadow' },
      { className: 'flex', description: 'flex display' },
      { className: 'grid', description: 'grid display' },
      { className: 'border-2', description: 'border' },
      { className: 'opacity-50', description: 'opacity' },
      { className: 'transform', description: 'transform' }
    ];
    
    const results: {[key: string]: boolean} = {};
    
    testElements.forEach(test => {
      const element = document.createElement('div');
      element.className = test.className;
      element.textContent = 'Test';
      element.style.position = 'absolute';
      element.style.bottom = '0';
      element.style.right = '0';
      element.style.zIndex = '-1';
      document.body.appendChild(element);
      
      const styles = window.getComputedStyle(element);
      
      // For bg color tests
      if (test.className.includes('bg-')) {
        results[test.description] = 
          styles.backgroundColor !== '' && 
          styles.backgroundColor !== 'rgba(0, 0, 0, 0)';
      }
      // For text color tests
      else if (test.className.includes('text-')) {
        results[test.description] = 
          styles.color !== '' && 
          styles.color !== 'rgb(0, 0, 0)';
      }
      // For padding tests
      else if (test.className.includes('p-')) {
        results[test.description] = 
          styles.padding !== '' && 
          styles.padding !== '0px';
      }
      // For border radius tests
      else if (test.className.includes('rounded-')) {
        results[test.description] = 
          styles.borderRadius !== '' && 
          styles.borderRadius !== '0px';
      }
      // For shadow tests
      else if (test.className.includes('shadow-')) {
        results[test.description] = 
          styles.boxShadow !== '' && 
          styles.boxShadow !== 'none';
      }
      // For flex tests
      else if (test.className === 'flex') {
        results[test.description] = 
          styles.display === 'flex';
      }
      // For grid tests
      else if (test.className === 'grid') {
        results[test.description] = 
          styles.display === 'grid';
      }
      // For border tests
      else if (test.className.includes('border-')) {
        results[test.description] = 
          styles.borderWidth !== '' && 
          styles.borderWidth !== '0px';
      }
      // For opacity tests
      else if (test.className.includes('opacity-')) {
        results[test.description] = 
          styles.opacity !== '' && 
          styles.opacity !== '1';
      }
      // For transform tests
      else if (test.className === 'transform') {
        results[test.description] = 
          styles.transform !== 'none';
      }
      
      document.body.removeChild(element);
    });
    
    console.log('Tailwind test results:', results);
    setTailwindClasses(results);
    
    // Check if Tailwind is working (at least one test passed)
    const isWorking = Object.values(results).some(value => value === true);
    setIsActive(isWorking);
    
    console.log('Tailwind appears to be working:', isWorking);

    // Force a style refresh
    const styleElement = document.createElement('style');
    styleElement.textContent = '.tailwind-test { color: #9333ea; }';
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className={`fixed bottom-4 right-4 z-50 rounded-lg shadow-lg transition-all duration-300 ${isExpanded ? 'w-80' : 'w-auto'}`}>
      <div 
        className="bg-purple-600 bg-opacity-90 backdrop-blur-lg text-white p-4 rounded-lg cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-center">
          <p className="font-bold">Tailwind {isActive ? 'Active' : 'Inactive'}</p>
          <p className="text-xs bg-purple-800 px-2 py-1 rounded ml-2">v4.1.0</p>
        </div>
        
        {isExpanded && (
          <div className="mt-3 space-y-1.5">
            {Object.entries(tailwindClasses).map(([name, working]) => (
              <div key={name} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${working ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-xs">{name}</span>
              </div>
            ))}
            <div className="mt-2 pt-2 border-t border-purple-500/30 text-xs text-purple-200">
              Click to collapse
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TailwindDebug;

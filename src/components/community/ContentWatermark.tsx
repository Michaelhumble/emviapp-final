import React from 'react';

interface ContentWatermarkProps {
  children: React.ReactNode;
  className?: string;
}

const ContentWatermark: React.FC<ContentWatermarkProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {children}
      
      {/* Subtle watermark overlay */}
      <div className="absolute bottom-2 right-2 pointer-events-none">
        <div className="bg-black/20 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
          <span className="text-white text-xs font-medium tracking-wide">
            EmviApp
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContentWatermark;
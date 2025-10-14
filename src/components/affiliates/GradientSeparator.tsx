import React from 'react';

const GradientSeparator = () => {
  return (
    <div className="w-full py-12 md:py-16 relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-violet-200/50 to-transparent" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-200/20 via-fuchsia-200/20 to-purple-200/20 blur-2xl" />
      </div>
    </div>
  );
};

export default GradientSeparator;

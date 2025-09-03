import React from 'react';

export default function PremiumBackground() {
  return (
    <div className="absolute inset-0">
      {/* Static gradients: always on */}
      <div className="absolute inset-0 opacity-90"
           style={{
             background:
               'radial-gradient(800px 500px at 15% 10%, rgba(139,92,246,0.18), transparent 60%),' + 
               'radial-gradient(700px 420px at 85% 25%, rgba(16,185,129,0.16), transparent 60%),' +
               'radial-gradient(900px 560px at 50% 110%, rgba(59,130,246,0.14), transparent 60%)'
           }}
      />
      {/* Subtle animated glow, disabled on reduce motion */}
      <div className="absolute inset-0 motion-safe:animate-subtleFloat opacity-70" />
      {/* Fine noise texture to avoid "flat" look */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')]" />
    </div>
  );
}
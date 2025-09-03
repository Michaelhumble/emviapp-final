import React from 'react';
import { motion } from 'framer-motion';

interface PremiumBackgroundProps {
  className?: string;
}

export default function PremiumBackground({ className = "" }: PremiumBackgroundProps) {
  return (
    <div className={className}>
      {/* Static gradient fallback - always renders */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_10%,rgba(168,85,247,0.25),transparent_60%),radial-gradient(900px_500px_at_80%_30%,rgba(16,185,129,0.22),transparent_60%),radial-gradient(1000px_600px_at_50%_120%,rgba(59,130,246,0.18),transparent_60%)]" />
      
      {/* Optional animated layer - guarded by prefers-reduced-motion */}
      <div className="absolute inset-0 motion-safe:animate-subtleFloat opacity-80" />
      
      {/* Optional enhanced mesh for motion-enabled */}
      <div className="absolute inset-0 motion-safe:opacity-60 opacity-0 transition-opacity duration-1000">
        <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_60%_80%,rgba(99,102,241,0.15),transparent_70%),radial-gradient(600px_300px_at_30%_20%,rgba(147,51,234,0.12),transparent_65%)]" />
      </div>
    </div>
  );
}
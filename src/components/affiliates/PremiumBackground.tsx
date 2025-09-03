import React from 'react';
import { motion } from 'framer-motion';

interface PremiumBackgroundProps {
  className?: string;
}

export default function PremiumBackground({ className = "" }: PremiumBackgroundProps) {
  return (
    <div className={className}>
      {/* Dramatic mesh gradient - always visible */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950"></div>
      
      {/* Primary mesh layer - high contrast */}
      <div className="absolute inset-0 opacity-80">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(1400px_800px_at_20%_10%,rgba(16,185,129,0.4),transparent_70%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(1200px_600px_at_80%_20%,rgba(59,130,246,0.35),transparent_65%)]"></div>
        <div className="absolute bottom-0 left-1/2 w-full h-full bg-[radial-gradient(1000px_500px_at_50%_100%,rgba(168,85,247,0.3),transparent_60%)]"></div>
      </div>
      
      {/* Secondary glow layer */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-2/3 right-1/4 w-80 h-80 bg-blue-500/25 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Animated floating elements - only with motion */}
      <div className="absolute inset-0 motion-safe:animate-subtleFloat opacity-40">
        <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-gradient-to-r from-emerald-400/30 to-blue-400/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-gradient-to-r from-purple-400/25 to-pink-400/25 rounded-full blur-xl"></div>
      </div>
      
      {/* Subtle noise overlay for texture */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0id2hpdGUiLz4KPC9zdmc+')] bg-repeat"></div>
    </div>
  );
}
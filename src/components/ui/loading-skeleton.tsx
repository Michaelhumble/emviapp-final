import React from 'react';
import { motion } from 'framer-motion';

export const SkeletonCard = () => (
  <motion.div 
    className="bg-white rounded-lg border border-gray-200 overflow-hidden"
    initial={{ opacity: 0.6 }}
    animate={{ opacity: [0.6, 1, 0.6] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
  >
    <div className="aspect-[4/3] bg-gray-200" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-8 bg-gray-200 rounded" />
      <div className="h-3 bg-gray-200 rounded w-5/6" />
      <div className="space-y-2">
        <div className="h-8 bg-gray-200 rounded" />
        <div className="h-8 bg-gray-200 rounded" />
      </div>
    </div>
  </motion.div>
);

export const SkeletonHero = () => (
  <div className="min-h-[70vh] bg-gray-100 relative overflow-hidden">
    <motion.div 
      className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
      animate={{ x: ['-100%', '100%'] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="h-12 bg-gray-300 rounded w-96 mx-auto" />
        <div className="h-6 bg-gray-300 rounded w-64 mx-auto" />
        <div className="h-12 bg-gray-300 rounded-2xl w-48 mx-auto" />
      </div>
    </div>
  </div>
);

export const SkeletonIndustrySection = () => (
  <div className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14 space-y-4">
        <div className="h-10 bg-gray-200 rounded w-80 mx-auto" />
        <div className="h-6 bg-gray-200 rounded w-96 mx-auto" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
        {[...Array(5)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
      
      <div className="text-center">
        <div className="h-12 bg-gray-200 rounded-2xl w-64 mx-auto" />
      </div>
    </div>
  </div>
);

export const SkeletonStats = () => (
  <div className="bg-white py-8">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <motion.div 
            key={i}
            className="text-center space-y-2"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
          >
            <div className="h-8 bg-gray-200 rounded w-16 mx-auto" />
            <div className="h-4 bg-gray-200 rounded w-24 mx-auto" />
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);
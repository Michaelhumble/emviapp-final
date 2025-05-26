
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ScarcityBannerProps {
  diamondSpotsLeft?: number;
  maxDiamondSpots?: number;
}

const ScarcityBanner = ({ diamondSpotsLeft = 1, maxDiamondSpots = 3 }: ScarcityBannerProps) => {
  const [goldSpots, setGoldSpots] = useState(8);
  const [timeLeft, setTimeLeft] = useState('47:23:45');

  useEffect(() => {
    // Simulate countdown timer
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const endTime = now + (47 * 60 * 60 * 1000) + (23 * 60 * 1000) + (45 * 1000);
      const distance = endTime - now;
      
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-8 space-y-4">
      {/* Price Increase Warning */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-full px-6 py-3 shadow-lg">
          <div className="relative">
            <Clock className="h-5 w-5 text-orange-600" />
            <motion.div
              className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
          <span className="text-sm font-semibold text-orange-800">
            Next price increase in <span className="font-mono text-red-600">{timeLeft}</span>
          </span>
        </div>
      </motion.div>

      {/* Scarcity Indicators */}
      <div className="flex flex-wrap justify-center gap-4">
        {/* Gold Spots */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-full px-5 py-2 shadow-sm">
            <Users className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-800">
              Only <span className="font-bold text-amber-900">{goldSpots}/15</span> Gold spots left
            </span>
          </div>
        </motion.div>

        {/* Diamond Spots - Updated to show /3 max */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-full px-5 py-2 shadow-lg">
            <AlertTriangle className="h-4 w-4 text-cyan-600" />
            <span className="text-sm font-medium text-cyan-800">
              Only <span className="font-bold text-cyan-900">{diamondSpotsLeft}/{maxDiamondSpots}</span> Diamond spots left
            </span>
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full px-5 py-2 shadow-sm">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              <span className="font-bold text-green-900">127 salons</span> upgraded this week
            </span>
          </div>
        </motion.div>
      </div>

      {/* Recent Signups Ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="flex justify-center gap-2 flex-wrap"
      >
        {[
          'Luxe Beauty Studio',
          'Salon Magnifique', 
          'The Hair Collective',
          'Bella Vista Spa'
        ].map((salon, index) => (
          <motion.div
            key={salon}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <Badge
              variant="outline"
              className="text-xs bg-white/60 border-purple-200 text-purple-700 backdrop-blur-sm"
            >
              {salon} just upgraded
            </Badge>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ScarcityBanner;

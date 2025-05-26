
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const FOMOElements = () => {
  const [timeLeft, setTimeLeft] = useState('48:00:00');
  const [spotsLeft] = useState(12);

  useEffect(() => {
    // Simulate countdown (for demo purposes)
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const endTime = now + (48 * 60 * 60 * 1000); // 48 hours from now
      const distance = endTime - now;
      
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-8 space-y-6">
      {/* Scarcity Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-full px-6 py-3">
          <Users className="h-4 w-4 text-red-500" />
          <span className="text-sm font-medium text-red-700">
            Only <strong>{spotsLeft}/15</strong> Diamond spots left this year
          </span>
        </div>
      </motion.div>

      {/* Urgency Countdown */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-full px-6 py-3">
          <Clock className="h-4 w-4 text-orange-500" />
          <span className="text-sm font-medium text-orange-700">
            Next price increase in <strong className="font-mono">{timeLeft}</strong>
          </span>
        </div>
      </motion.div>

      {/* Social Proof */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full px-6 py-3">
          <TrendingUp className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium text-green-700">
            <strong>127 salons</strong> upgraded this week
          </span>
        </div>
      </motion.div>

      {/* Recent Signups */}
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
          <Badge
            key={salon}
            variant="outline"
            className="text-xs bg-white/50 border-purple-200 text-purple-700"
          >
            {salon} just upgraded
          </Badge>
        ))}
      </motion.div>
    </div>
  );
};

export default FOMOElements;

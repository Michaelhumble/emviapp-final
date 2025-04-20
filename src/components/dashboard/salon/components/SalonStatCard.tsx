
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface SalonStatCardProps {
  title: string;
  value: number | string;
  change?: string;
  icon: React.ReactNode;
  loading?: boolean;
  className?: string;
}

const SalonStatCard: React.FC<SalonStatCardProps> = ({
  title,
  value,
  change,
  icon,
  loading = false,
  className = '',
}) => {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.08)' }}
      transition={{ duration: 0.17 }}
      className={`w-full ${className}`}
    >
      <Card className="border border-gray-100 overflow-hidden h-full rounded-xl">
        <CardContent className="p-4 flex items-start space-x-3">
          <div className="mr-1 bg-purple-50 p-2 rounded-full flex items-center justify-center min-w-[40px] min-h-[40px]">
            {icon}
          </div>
          <div>
            {loading ? (
              <div className="animate-pulse h-7 w-16 bg-gray-200 rounded mb-1"></div>
            ) : (
              <p className="text-xl font-bold">{value}</p>
            )}
            <p className="text-xs text-gray-500">{title}</p>
            {change && <p className="text-xs text-emerald-600 mt-1">{change}</p>}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SalonStatCard;

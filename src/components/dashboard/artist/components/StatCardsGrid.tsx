
import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ReactNode } from 'react';

export interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  changePercentage?: number;
  loading?: boolean;
}

const StatCard = ({ label, value, icon, changePercentage, loading = false }: StatCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-white border-none shadow-md overflow-hidden h-full">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-500">{label}</div>
            <div className="rounded-full p-1.5 bg-primary/10">{icon}</div>
          </div>
          <div className="mt-3">
            {loading ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <div className="text-2xl font-bold">{value}</div>
            )}
          </div>
          {changePercentage !== undefined && !loading && (
            <div className="mt-1 text-xs flex items-center">
              <span className={changePercentage >= 0 ? "text-green-600" : "text-red-600"}>
                {changePercentage >= 0 ? "↑" : "↓"} {Math.abs(changePercentage)}%
              </span>
              <span className="text-gray-400 ml-1">vs. last month</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export interface StatCardsGridProps {
  stats: {
    label: string;
    value: string | number;
    icon: ReactNode;
    changePercentage?: number;
  }[];
  loading?: boolean;
}

const StatCardsGrid = ({ stats, loading = false }: StatCardsGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <AnimatePresence>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
          >
            <StatCard
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              changePercentage={stat.changePercentage}
              loading={loading}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default StatCardsGrid;

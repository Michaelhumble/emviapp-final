
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpIcon, ArrowDownIcon, TrendingUp, TrendingDown, Users, DollarSign, Calendar, ShoppingBag, Clock, RefreshCw } from 'lucide-react';
import { useArtistAnalytics, ANALYTICS_PERIODS } from '@/hooks/useArtistAnalytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const AnalyticsDashboard: React.FC = () => {
  const {
    bookings,
    revenue,
    topServices,
    profileViews,
    isLoading,
    period,
    setPeriod,
    periods,
    refreshAnalytics
  } = useArtistAnalytics();

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
    >
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-xl font-serif">Analytics Dashboard</CardTitle>
            
            <div className="flex items-center space-x-2">
              <Select
                value={period.value}
                onValueChange={(value) => {
                  const newPeriod = periods.find(p => p.value === value);
                  if (newPeriod) setPeriod(newPeriod);
                }}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  {periods.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="icon"
                onClick={refreshAnalytics}
                disabled={isLoading}
              >
                <RefreshCw className={cn(
                  "h-4 w-4",
                  isLoading && "animate-spin"
                )} />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Bookings Card */}
            <StatCard
              title="Total Bookings"
              value={bookings.totalBookings}
              icon={<Calendar className="h-5 w-5 text-blue-500" />}
              change={0}
              isLoading={isLoading}
            />
            
            {/* Revenue Card */}
            <StatCard
              title="Revenue"
              value={formatCurrency(revenue.totalRevenue)}
              icon={<DollarSign className="h-5 w-5 text-green-500" />}
              change={revenue.percentChange}
              isLoading={isLoading}
            />
            
            {/* Average Booking Value */}
            <StatCard
              title="Avg. per Booking"
              value={formatCurrency(revenue.averagePerBooking)}
              icon={<ShoppingBag className="h-5 w-5 text-purple-500" />}
              change={0}
              isLoading={isLoading}
              hideChange={true}
            />
            
            {/* Profile Views */}
            <StatCard
              title="Profile Views"
              value={profileViews}
              icon={<Users className="h-5 w-5 text-indigo-500" />}
              change={0}
              isLoading={isLoading}
              hideChange={true}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Booking Status Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Booking Status</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <StatusBar 
                      label="Completed" 
                      value={bookings.completedBookings}
                      total={bookings.totalBookings}
                      color="bg-green-500"
                    />
                    <StatusBar 
                      label="Pending" 
                      value={bookings.pendingBookings}
                      total={bookings.totalBookings}
                      color="bg-blue-500"
                    />
                    <StatusBar 
                      label="Cancelled" 
                      value={bookings.cancelledBookings}
                      total={bookings.totalBookings}
                      color="bg-red-500"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Top Services Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Top Services</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ) : topServices.length > 0 ? (
                  <div className="space-y-3">
                    {topServices.map((service, index) => (
                      <div key={service.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={cn(
                            "h-8 w-8 rounded-full flex items-center justify-center mr-3 text-white",
                            index === 0 ? "bg-yellow-500" : 
                            index === 1 ? "bg-gray-400" : 
                            "bg-amber-800"
                          )}>
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{service.title}</div>
                            <div className="text-xs text-gray-500">
                              {service.count} {service.count === 1 ? 'booking' : 'bookings'}
                            </div>
                          </div>
                        </div>
                        <div className="font-medium">
                          {Math.round(service.percentage)}%
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <Clock className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                    <p>No bookings data yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Stat Card Component
interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  change: number;
  isLoading: boolean;
  hideChange?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  change, 
  isLoading,
  hideChange = false 
}) => {
  const isPositive = change > 0;
  const isNegative = change < 0;
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-gray-500">{title}</div>
          <div className="rounded-full p-1 bg-gray-50">{icon}</div>
        </div>
        
        {isLoading ? (
          <Skeleton className="h-7 w-20" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
        
        {!hideChange && (
          <div className="mt-1 flex items-center text-xs">
            {isLoading ? (
              <Skeleton className="h-4 w-16" />
            ) : (
              <>
                {isPositive && (
                  <div className="flex items-center text-green-600">
                    <ArrowUpIcon className="h-3 w-3 mr-1" />
                    <span>{Math.abs(change).toFixed(1)}% from previous</span>
                  </div>
                )}
                {isNegative && (
                  <div className="flex items-center text-red-600">
                    <ArrowDownIcon className="h-3 w-3 mr-1" />
                    <span>{Math.abs(change).toFixed(1)}% from previous</span>
                  </div>
                )}
                {!isPositive && !isNegative && (
                  <div className="text-gray-500">No change from previous</div>
                )}
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Status Bar Component
interface StatusBarProps {
  label: string;
  value: number;
  total: number;
  color: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ label, value, total, color }) => {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-sm">
        <span>{label}</span>
        <span className="font-medium">{value} of {total}</span>
      </div>
      <Progress 
        value={percentage} 
        className="h-2" 
        indicatorClassName={color} 
      />
    </div>
  );
};

export default AnalyticsDashboard;

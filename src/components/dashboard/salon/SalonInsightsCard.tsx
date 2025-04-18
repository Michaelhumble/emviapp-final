
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart3, 
  Eye, 
  Users, 
  Star, 
  RefreshCw 
} from 'lucide-react';
import { useSalonInsights } from '@/hooks/useSalonInsights';

const SalonInsightsCard: React.FC = () => {
  const { insights, loading, error } = useSalonInsights();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-primary" />
            Salon Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-48">
          <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
        </CardContent>
      </Card>
    );
  }

  if (error || !insights) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-primary" />
            Salon Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-gray-500">
          Unable to load insights
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="mr-2 h-5 w-5 text-primary" />
          Salon Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Users className="h-6 w-6 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Total Bookings</p>
              <p className="font-bold">{insights.total_bookings}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Eye className="h-6 w-6 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Profile Views</p>
              <p className="font-bold">{insights.profile_views_week}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Star className="h-6 w-6 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Repeat Client Rate</p>
              <p className="font-bold">{insights.repeat_client_rate}%</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-6 w-6 text-orange-500" />
            <div>
              <p className="text-sm text-gray-500">Monthly Bookings</p>
              <p className="font-bold">{insights.bookings_this_month}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonInsightsCard;

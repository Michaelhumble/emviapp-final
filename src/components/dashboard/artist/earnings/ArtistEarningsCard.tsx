
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BadgeDollarSign, 
  TrendingUp, 
  Calendar, 
  Loader2,
  AlertCircle 
} from "lucide-react";
import { useArtistEarnings } from "@/hooks/useArtistEarnings";
import { format } from "date-fns";

const ArtistEarningsCard: React.FC = () => {
  const { loading, error, summary } = useArtistEarnings();
  
  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Earnings Overview</CardTitle>
          <CardDescription>Loading earnings data...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Earnings Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-red-500">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const currentWeekRange = `${format(new Date(), 'MMM d')} - ${format(new Date(), 'MMM d, yyyy')}`;
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <BadgeDollarSign className="mr-2 h-5 w-5 text-primary" />
          This Week's Earnings
        </CardTitle>
        <CardDescription className="flex items-center">
          <Calendar className="mr-1 h-3.5 w-3.5" />
          Week of {currentWeekRange}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Current week stats */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Current Week</h3>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {summary.currentWeekBookings} bookings
              </Badge>
            </div>
            
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-primary">
                ${summary.currentWeekEarnings.toFixed(2)}
              </span>
              <span className="ml-2 text-sm text-muted-foreground">
                earned so far
              </span>
            </div>
          </div>
          
          {/* Recent earnings */}
          <div>
            <h3 className="text-sm font-medium mb-3">Recent Earnings</h3>
            <div className="space-y-3">
              {summary.recentEarnings.slice(0, 3).map((week, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm">
                      {format(week.startDate, 'MMM d')} - {format(week.endDate, 'MMM d')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {week.bookingCount} {week.bookingCount === 1 ? 'booking' : 'bookings'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${week.earnings.toFixed(2)}</p>
                    {week.isPaid ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                        Paid
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 text-xs">
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Pending payment */}
          {summary.totalPendingPayment > 0 && (
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Total Pending Payment</p>
                  <p className="text-xs text-muted-foreground">
                    Will be paid according to salon schedule
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-primary">
                    ${summary.totalPendingPayment.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistEarningsCard;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AvailabilityCalendar } from '@/components/dashboard/artist/availability/AvailabilityCalendar';
import { useSalonAvailability } from '@/hooks/useSalonAvailability';
import { BookingStateWrapper } from '@/components/booking/BookingStateWrapper';
import { AlertCircle } from 'lucide-react';

const SalonAvailabilityManager = () => {
  const [activeTab, setActiveTab] = useState('salon');
  const { 
    isLoading, 
    error,
    salonAvailability,
    staffAvailability
  } = useSalonAvailability();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability Manager</CardTitle>
      </CardHeader>
      <CardContent>
        <BookingStateWrapper
          loading={isLoading}
          error={error}
          loadingComponent={<div>Loading availability settings...</div>}
        >
          <Tabs defaultValue="salon" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="salon">Salon Hours</TabsTrigger>
              <TabsTrigger value="staff">Staff Availability</TabsTrigger>
            </TabsList>
            
            <TabsContent value="salon">
              <div className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Set your salon's regular operating hours. This helps clients know when you're open for business.
                  </AlertDescription>
                </Alert>
                
                <AvailabilityCalendar />
              </div>
            </TabsContent>
            
            <TabsContent value="staff">
              <div className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    View and manage individual staff availability. Each staff member can be assigned their own schedule.
                  </AlertDescription>
                </Alert>
                
                <div className="text-center py-4">
                  Please go to each staff member's profile to set their individual availability.
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </BookingStateWrapper>
      </CardContent>
    </Card>
  );
};

export default SalonAvailabilityManager;

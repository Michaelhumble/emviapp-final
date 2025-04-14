
import React from 'react';
import { useAuth } from '@/context/auth';
import { SmartBookingCalendar } from '@/components/calendar/SmartBookingCalendar';
import Layout from '@/components/layout/Layout';
import { NotAllowed } from '@/components/common/NotAllowed';

const BookingCalendar = () => {
  const { user, userProfile, loading } = useAuth();
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }

  // Only allow access for artists and salon owners
  if (!user || (userProfile?.role !== 'artist' && userProfile?.role !== 'owner')) {
    return (
      <Layout>
        <NotAllowed message="Only artists and salon owners can access the booking calendar." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-4 px-4 sm:px-6">
        <h1 className="text-2xl font-bold mb-6">Booking Calendar</h1>
        <SmartBookingCalendar userRole={userProfile?.role} userId={user.id} />
      </div>
    </Layout>
  );
};

export default BookingCalendar;

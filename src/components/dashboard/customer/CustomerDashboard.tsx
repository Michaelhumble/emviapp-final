
import CustomerDashboardHeader from './CustomerDashboardHeader';
import CustomerDashboardWidgets from './CustomerDashboardWidgets';
import { Card } from '@/components/ui/card';
import BookingNotificationsSection from '../notifications/BookingNotificationsSection';
import CustomerBookingsSection from './CustomerBookingsSection';

const CustomerDashboard = () => {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-6">
      <CustomerDashboardHeader />
      <BookingNotificationsSection />
      <CustomerBookingsSection />
      <CustomerDashboardWidgets />
    </div>
  );
};

export default CustomerDashboard;

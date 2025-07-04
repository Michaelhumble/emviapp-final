import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "@/context/auth";
import BookingNotificationProvider from '@/components/BookingNotificationProvider';
import ProfileRedirect from '@/pages/profile/ProfileRedirect';
import ArtistProfileSetup from '@/pages/profile/ArtistProfileSetup';
import SalonProfileSetup from '@/pages/profile/SalonProfileSetup';
import FreelancerProfileSetup from '@/pages/profile/FreelancerProfileSetup';
import RenterProfileSetup from '@/pages/profile/RenterProfileSetup';
import SupplierProfileSetup from '@/pages/profile/SupplierProfileSetup';
import CustomerProfileSetup from '@/pages/profile/CustomerProfileSetup';
import OtherProfileSetup from '@/pages/profile/OtherProfileSetup';
import EditProfile from '@/pages/profile/EditProfile';
import JobDetail from '@/pages/JobDetail';
import SalonDetail from '@/pages/SalonDetail';
import ArtistDetail from '@/pages/ArtistDetail';
import BookingPage from '@/pages/BookingPage';
import Dashboard from '@/pages/Dashboard';
import ArtistDashboard from '@/pages/dashboard/ArtistDashboard';
import SalonDashboard from '@/pages/dashboard/SalonDashboard';
import AvailabilityPage from '@/pages/dashboard/artist/AvailabilityPage';
import BookingCalendar from '@/pages/dashboard/artist/BookingCalendar';
import Inbox from '@/pages/dashboard/artist/Inbox';
import SalonTeam from '@/pages/dashboard/salon/SalonTeam';
import SalonCalendar from '@/pages/dashboard/salon/SalonCalendar';
import SalonInbox from '@/pages/dashboard/salon/SalonInbox';
import SalonGallery from '@/pages/dashboard/salon/SalonGallery';
import SalonServices from '@/pages/dashboard/salon/SalonServices';
import CreateJob from '@/pages/postings/CreateJob';
import CreateBoothRental from '@/pages/postings/CreateBoothRental';
import CreateOpportunity from '@/pages/postings/CreateOpportunity';
import Pricing from '@/pages/postings/Pricing';
import PaymentSuccess from '@/pages/postings/PaymentSuccess';
import PaymentCancel from '@/pages/postings/PaymentCancel';
import BoothDetail from '@/pages/BoothDetail';
import OpportunityDetail from '@/pages/OpportunityDetail';
import Auth from '@/pages/Auth';
import Index from "@/pages/Index";
import Community from "@/pages/Community";
import Jobs from '@/pages/Jobs';
import Artists from '@/pages/Artists';
import Salons from '@/pages/Salons';
import BoothRentals from '@/pages/BoothRentals';
import Opportunities from '@/pages/Opportunities';
import NotFound from '@/pages/NotFound';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/community" element={<Community />} />
            <Route path="/freelancers" element={<Community />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            
            {/* Public Listings */}
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/salons" element={<Salons />} />
            <Route path="/booths" element={<BoothRentals />} />
            <Route path="/opportunities" element={<Opportunities />} />
            
            {/* Details */}
            <Route path="/job/:id" element={<JobDetail />} />
            <Route path="/salon/:id" element={<SalonDetail />} />
            <Route path="/artist/:id" element={<ArtistDetail />} />
            <Route path="/booth/:id" element={<BoothDetail />} />
            <Route path="/opportunity/:id" element={<OpportunityDetail />} />
            
            {/* Booking */}
            <Route path="/booking/:artistId" element={<BookingPage />} />
            
            {/* Profile */}
            <Route path="/profile" element={<ProfileRedirect />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/profile/artist/setup" element={<ArtistProfileSetup />} />
            <Route path="/profile/salon/setup" element={<SalonProfileSetup />} />
            <Route path="/profile/freelancer/setup" element={<FreelancerProfileSetup />} />
            <Route path="/profile/renter/setup" element={<RenterProfileSetup />} />
            <Route path="/profile/supplier/setup" element={<SupplierProfileSetup />} />
            <Route path="/profile/customer/setup" element={<CustomerProfileSetup />} />
            <Route path="/profile/other/setup" element={<OtherProfileSetup />} />
            
            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/artist" element={<ArtistDashboard />} />
            <Route path="/dashboard/salon" element={<SalonDashboard />} />
            
            {/* Artist Dashboard */}
            <Route path="/dashboard/artist/availability" element={<AvailabilityPage />} />
            <Route path="/dashboard/artist/booking-calendar" element={<BookingCalendar />} />
            <Route path="/dashboard/artist/inbox" element={<Inbox />} />
            
            {/* Salon Dashboard */}
            <Route path="/dashboard/salon/team" element={<SalonTeam />} />
            <Route path="/dashboard/salon/calendar" element={<SalonCalendar />} />
            <Route path="/dashboard/salon/inbox" element={<SalonInbox />} />
            <Route path="/dashboard/salon/gallery" element={<SalonGallery />} />
            <Route path="/dashboard/salon/services" element={<SalonServices />} />
            
            {/* Postings */}
            <Route path="/create/job" element={<CreateJob />} />
            <Route path="/create/booth" element={<CreateBoothRental />} />
            <Route path="/create/opportunity" element={<CreateOpportunity />} />
            <Route path="/pricing/:postingType/:postingId" element={<Pricing />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/cancel" element={<PaymentCancel />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BookingNotificationProvider />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

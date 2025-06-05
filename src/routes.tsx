
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import Artists from '@/pages/Artists';
import Salons from '@/pages/Salons';
import Jobs from '@/pages/Jobs';
import PostJob from '@/pages/PostJob';
import PostSalon from '@/pages/PostSalon';
import ArtistProfile from '@/pages/ArtistProfile';
import SalonProfile from '@/pages/SalonProfile';
import Pricing from '@/pages/Pricing';
import Messages from '@/pages/Messages';
import Notifications from '@/pages/Notifications';
import BookingCalendar from '@/pages/BookingCalendar';
import NotFound from '@/pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/profile/*" element={<Profile />} />
      <Route path="/artists" element={<Artists />} />
      <Route path="/artists/:username" element={<ArtistProfile />} />
      <Route path="/salons" element={<Salons />} />
      <Route path="/salons/:id" element={<SalonProfile />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/post-job" element={<PostJob />} />
      <Route path="/post-salon" element={<PostSalon />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/messages/*" element={<Messages />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/booking-calendar" element={<BookingCalendar />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;


import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Artists from './pages/Artists';
import SalonOwners from './pages/SalonOwners';
import About from './pages/About';
import Pricing from './pages/Pricing';
import PostJob from './pages/PostJob';
import PostSalon from './pages/PostSalon';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ArtistProfile from './pages/ArtistProfile';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import Salons from './pages/Salons';
import SellSalon from './pages/SellSalon';
import Explore from './pages/Explore';
import Marketplace from './pages/Marketplace';
import UserPage from './pages/UserPage';
import { AuthGuard } from './components/auth/AuthGuard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/artists" element={<Artists />} />
      <Route path="/salon-owners" element={<SalonOwners />} />
      <Route path="/about" element={<About />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/post-job" element={<AuthGuard><PostJob /></AuthGuard>} />
      <Route path="/post-salon" element={<AuthGuard><PostSalon /></AuthGuard>} />
      <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
      <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/artist/:id" element={<ArtistProfile />} />
      <Route path="/messages" element={<AuthGuard><Messages /></AuthGuard>} />
      <Route path="/notifications" element={<AuthGuard><Notifications /></AuthGuard>} />
      <Route path="/salons" element={<Salons />} />
      <Route path="/sell-salon" element={<AuthGuard><SellSalon /></AuthGuard>} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/user/:id" element={<UserPage />} />
    </Routes>
  );
};

export default AppRoutes;

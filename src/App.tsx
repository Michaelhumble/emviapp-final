import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Salons from './pages/Salons';
import Jobs from './pages/Jobs';
import Opportunities from './pages/Opportunities';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Dashboard from './pages/Dashboard';
import PostJob from './pages/PostJob';
import PostSalon from './pages/PostSalon';
import SalonDetailsPage from './pages/salons/[id]';
import JobDetailsPage from './pages/jobs/[id]';
import OpportunityDetailsPage from './pages/opportunities/[id]';
import NotFoundPage from './pages/404';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import ProfilePage from './pages/Profile';
import SalonListingForm from './pages/salons/SalonListingForm';
import SellSalonPage from './pages/sell-salon';
import SalonListingSuccess from '@/pages/SalonListingSuccess';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/salons" element={<Salons />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/post-salon" element={<PostSalon />} />
        <Route path="/salons/:id" element={<SalonDetailsPage />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />
        <Route path="/opportunities/:id" element={<OpportunityDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/salon-listing-form" element={<SalonListingForm />} />
        <Route path="/sell-salon" element={<SellSalonPage />} />
        
        <Route path="/salon-listing-success" element={<SalonListingSuccess />} />
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;

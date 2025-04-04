
import React, { useEffect } from 'react';
import { AuthProvider } from './context/auth';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import ProfileEdit from './pages/profile/edit';
import ArtistDashboard from './pages/dashboard/Artist';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Jobs from './pages/jobs';
import Messages from './pages/messages';
import Welcome from './pages/Welcome';
import OwnerDashboard from './pages/dashboard/Owner';
import SalonDashboard from './pages/dashboard/Salon';
import FreelancerDashboard from './pages/dashboard/Freelancer';
import SupplierDashboard from './pages/dashboard/Supplier';
import CustomerDashboard from './pages/dashboard/Customer';
import OtherDashboard from './pages/dashboard/Other';
import SalonOwnerSetup from './pages/profile/salon/setup';
import PostJob from './pages/PostJob';
import ManageJobs from './pages/ManageJobs';
import PostSalon from './pages/posting/SalonPost';
import SalonOwners from './pages/SalonOwners';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="/dashboard/artist" element={<ArtistDashboard />} />
          <Route path="/dashboard/owner" element={<OwnerDashboard />} />
          <Route path="/dashboard/salon" element={<SalonDashboard />} />
          <Route path="/dashboard/freelancer" element={<FreelancerDashboard />} />
          <Route path="/dashboard/supplier" element={<SupplierDashboard />} />
          <Route path="/dashboard/customer" element={<CustomerDashboard />} />
          <Route path="/dashboard/other" element={<OtherDashboard />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/profile/salon/setup" element={<SalonOwnerSetup />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/manage-jobs" element={<ManageJobs />} />
          <Route path="/post-salon" element={<PostSalon />} />
          <Route path="/salon-owners" element={<SalonOwners />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

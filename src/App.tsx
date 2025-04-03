
import React from 'react';
import { AuthProvider } from './context/auth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import ProfileEdit from './pages/profile/edit';
import ArtistDashboard from './pages/dashboard/Artist';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Jobs from './pages/jobs';
import Messages from './pages/messages';
import Welcome from './pages/Welcome';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/dashboard/artist" element={<ArtistDashboard />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

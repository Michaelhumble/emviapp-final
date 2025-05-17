
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Pricing from '@/pages/Pricing';
import SignUp from '@/pages/SignUp';
import SignIn from '@/pages/SignIn';
import Dashboard from '@/pages/Dashboard';
import ProfileEdit from '@/pages/ProfileEdit';
import Checkout from '@/pages/Checkout';
import About from '@/pages/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;

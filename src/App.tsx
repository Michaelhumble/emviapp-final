
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/pricing" element={<div>Pricing Page</div>} />
        <Route path="/sign-up" element={<div>Sign Up Page</div>} />
        <Route path="/sign-in" element={<div>Sign In Page</div>} />
        <Route path="/dashboard" element={<div>Dashboard Page</div>} />
        <Route path="/profile/edit" element={<div>Profile Edit Page</div>} />
        <Route path="/checkout" element={<div>Checkout Page</div>} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;


import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <Navbar />
      </div>
    </header>
  );
};

export default Header;


import React from 'react';
import { Link } from 'react-router-dom';
import { X, Home, Briefcase, Users, MessageSquare, User, Building2 } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user, signOut } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm max-h-[85vh] overflow-y-auto rounded-t-2xl shadow-xl">
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-4">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 py-2"
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>

          <Link
            to="/jobs"
            onClick={onClose}
            className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 py-2"
          >
            <Briefcase className="h-5 w-5" />
            <span>Jobs</span>
          </Link>

          <Link
            to="/artists"
            onClick={onClose}
            className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 py-2"
          >
            <Users className="h-5 w-5" />
            <span>Artists</span>
          </Link>

          <Link
            to="/salons"
            onClick={onClose}
            className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 py-2"
          >
            <Building2 className="h-5 w-5" />
            <span>Salons</span>
          </Link>

          <Link
            to="/messages"
            onClick={onClose}
            className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 py-2"
          >
            <MessageSquare className="h-5 w-5" />
            <span>Messages</span>
          </Link>

          <Link
            to="/profile"
            onClick={onClose}
            className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 py-2"
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </Link>
        </nav>

        <div className="mt-8 space-y-3">
          <Button asChild className="w-full" onClick={onClose}>
            <Link to="/post-salon">Post Your Salon</Link>
          </Button>

          {user && signOut && (
            <button
              onClick={signOut}
              className="text-sm text-muted-foreground hover:text-red-500 mt-2"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

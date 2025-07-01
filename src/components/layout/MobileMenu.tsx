
import React from 'react';
import { Link } from 'react-router-dom';
import { X, Home, Users, Briefcase, Building2, MessageSquare, Info, Phone, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import EmviLogo from '@/components/branding/EmviLogo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { t, toggleLanguage, currentLanguage } = useTranslation();

  const navigationItems = [
    { name: t('nav.dashboard'), href: '/dashboard', icon: LayoutDashboard, showWhenAuth: true },
    { name: t('nav.home'), href: '/', icon: Home },
    { name: t('nav.artists'), href: '/artists', icon: Users },
    { name: t('nav.salons'), href: '/salons', icon: Building2 },
    { name: t('nav.jobs'), href: '/jobs', icon: Briefcase },
    { name: t('nav.community'), href: '/community', icon: MessageSquare },
    { name: t('nav.about'), href: '/about', icon: Info },
    { name: t('nav.contact'), href: '/contact', icon: Phone },
  ];

  // Early return if not open
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      {/* Mobile Menu Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <EmviLogo className="h-6" />
        <button onClick={onClose} className="text-xl font-bold">×</button>
      </div>

      {/* Menu Content */}
      <div className="p-4 flex flex-col gap-4">
        <Link to="/dashboard" onClick={onClose}>Dashboard</Link>
        <Link to="/artists" onClick={onClose}>Artists</Link>
        <Link to="/salons" onClick={onClose}>Salons</Link>
        <Link to="/jobs" onClick={onClose}>Jobs</Link>
        <Link to="/community" onClick={onClose}>Community</Link>
        <Link to="/about" onClick={onClose}>About</Link>
        <Link to="/contact" onClick={onClose}>Contact</Link>

        {/* CTA */}
        <Link to="/post-job" onClick={onClose}>
          <button className="bg-purple-600 text-white p-2 rounded w-full">Post a Job for Free</button>
        </Link>
        <Link to="/post-salon" onClick={onClose}>
          <button className="border border-purple-600 text-purple-600 p-2 rounded w-full">Post Your Salon</button>
        </Link>

        {/* Footer */}
        <div className="pt-6 text-sm text-center text-gray-400">
          Inspired by Sunshine ☀️
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

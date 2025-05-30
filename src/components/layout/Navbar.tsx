
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, PlusCircle, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { UserMenu } from './UserMenu';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '@/hooks/useTranslation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleAuthAction = (path: string) => {
    if (isSignedIn) {
      navigate(path);
    } else {
      navigate('/sign-in');
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-[#9A7B69] font-playfair">EmviApp</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-[#9A7B69] font-medium transition-colors">
              {t('Home')}
            </Link>
            <Link to="/jobs" className="text-gray-700 hover:text-[#9A7B69] font-medium transition-colors">
              {t('Jobs')}
            </Link>
            <Link to="/salons" className="text-gray-700 hover:text-[#9A7B69] font-medium transition-colors">
              {t('Salons')}
            </Link>
            <Link to="/artists" className="text-gray-700 hover:text-[#9A7B69] font-medium transition-colors">
              {t('Artists')}
            </Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              onClick={() => handleAuthAction('/post-job')}
              className="bg-gradient-to-r from-[#9A7B69] to-[#B8956A] hover:from-[#8A6B59] hover:to-[#A8855A] text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-playfair font-semibold border border-[#8A6B59]/20"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              {t('Post a Job')}
            </Button>
            
            <Button
              onClick={() => handleAuthAction('/post-salon')}
              className="bg-gradient-to-r from-[#9A7B69] to-[#B8956A] hover:from-[#8A6B59] hover:to-[#A8855A] text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-playfair font-semibold border border-[#8A6B59]/20"
            >
              <Store className="mr-2 h-4 w-4" />
              {t('List Salon')}
            </Button>

            <LanguageSelector />
            
            {isSignedIn ? (
              <UserMenu user={user} />
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/sign-in">
                  <Button variant="ghost" className="text-gray-700 hover:text-[#9A7B69]">
                    {t('Sign In')}
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button className="bg-[#9A7B69] hover:bg-[#8A6B59] text-white">
                    {t('Sign Up')}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <LanguageSelector />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#9A7B69] transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-[#9A7B69] font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t('Home')}
              </Link>
              <Link
                to="/jobs"
                className="block px-3 py-2 text-gray-700 hover:text-[#9A7B69] font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t('Jobs')}
              </Link>
              <Link
                to="/salons"
                className="block px-3 py-2 text-gray-700 hover:text-[#9A7B69] font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t('Salons')}
              </Link>
              <Link
                to="/artists"
                className="block px-3 py-2 text-gray-700 hover:text-[#9A7B69] font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t('Artists')}
              </Link>
              
              {/* Mobile CTA Buttons */}
              <div className="pt-4 space-y-2">
                <Button
                  onClick={() => handleAuthAction('/post-job')}
                  className="w-full bg-gradient-to-r from-[#9A7B69] to-[#B8956A] hover:from-[#8A6B59] hover:to-[#A8855A] text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-playfair font-semibold border border-[#8A6B59]/20"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  {t('Post a Job')}
                </Button>
                
                <Button
                  onClick={() => handleAuthAction('/post-salon')}
                  className="w-full bg-gradient-to-r from-[#9A7B69] to-[#B8956A] hover:from-[#8A6B59] hover:to-[#A8855A] text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-playfair font-semibold border border-[#8A6B59]/20"
                >
                  <Store className="mr-2 h-4 w-4" />
                  {t('List Salon')}
                </Button>
              </div>

              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-gray-100">
                {isSignedIn ? (
                  <div className="px-3 py-2">
                    <UserMenu user={user} />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/sign-in"
                      className="block px-3 py-2 text-gray-700 hover:text-[#9A7B69] font-medium transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {t('Sign In')}
                    </Link>
                    <Link
                      to="/sign-up"
                      className="block px-3 py-2 text-[#9A7B69] hover:text-[#8A6B59] font-medium transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {t('Sign Up')}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

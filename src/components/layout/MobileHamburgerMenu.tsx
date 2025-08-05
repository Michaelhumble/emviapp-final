
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';

const MobileHamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden min-w-[44px] min-h-[44px] touch-manipulation"
        onClick={handleToggle}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <MobileMenu isOpen={isOpen} onClose={handleClose} />
    </>
  );
};

export default MobileHamburgerMenu;

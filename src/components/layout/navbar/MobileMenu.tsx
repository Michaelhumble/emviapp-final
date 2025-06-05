
import React from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onClose}>
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="p-4">
          <button onClick={onClose} className="mb-4 text-gray-600">Close</button>
          <div>
            <p>MobileMenu component - Replace with actual implementation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

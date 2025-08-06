import React, { useState } from 'react';
import { LittleSunshineButton } from './LittleSunshineButton';
import { LittleSunshineWindow } from './LittleSunshineWindow';

export const LittleSunshineSystem = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <LittleSunshineButton onClick={handleToggle} isOpen={isOpen} />
      <LittleSunshineWindow isOpen={isOpen} onClose={handleClose} />
    </>
  );
};

export default LittleSunshineSystem;
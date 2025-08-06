import React, { useState } from 'react';
import { ChatButton } from './ChatButton';
import { ChatWindow } from './ChatWindow';

export const ChatSystem = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    console.log('🌟 Chat system toggle:', !isOpen);
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    console.log('🌟 Chat system closing');
    setIsOpen(false);
  };

  return (
    <>
      <ChatButton onClick={handleToggle} isOpen={isOpen} />
      <ChatWindow isOpen={isOpen} onClose={handleClose} />
    </>
  );
};

export default ChatSystem;
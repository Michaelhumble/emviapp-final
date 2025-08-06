import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const ChatButton = ({ onClick, isOpen }: ChatButtonProps) => {
  if (isOpen) return null;

  return (
    <Button
      onClick={onClick}
      className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg z-[9999]"
    >
      💬
    </Button>
  );
};
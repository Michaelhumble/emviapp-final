import React from 'react';
import { SunshineSystem } from './SunshineSystem';

interface MessageCenterProps {
  recipientId?: string;
}

export const MessageCenter = ({ recipientId }: MessageCenterProps) => {
  return <SunshineSystem />;
};
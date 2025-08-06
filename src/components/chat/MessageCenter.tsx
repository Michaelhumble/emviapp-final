import React from 'react';
import { UltimateSunshineSystem } from './UltimateSunshineSystem';

interface MessageCenterProps {
  recipientId?: string;
}

export const MessageCenter = ({ recipientId }: MessageCenterProps) => {
  return <UltimateSunshineSystem />;
};
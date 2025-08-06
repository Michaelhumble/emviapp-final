
import React from 'react';
import AssistantPanel from '@/components/ai/AssistantPanel';

interface ArtistMessageCenterProps {
  recipientId?: string | undefined;
}

const ArtistMessageCenter = ({ recipientId }: ArtistMessageCenterProps) => {
  return <AssistantPanel />;
};

export default ArtistMessageCenter;


import React from 'react';
import { MessageCenter } from '@/components/chat/MessageCenter';

interface ArtistMessageCenterProps {
  recipientId: string | undefined;
}

const ArtistMessageCenter = ({ recipientId }: ArtistMessageCenterProps) => {
  if (!recipientId) {
    return <div>Loading...</div>;
  }

  return <MessageCenter recipientId={recipientId} />;
};

export default ArtistMessageCenter;

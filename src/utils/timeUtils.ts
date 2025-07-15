import { formatDistanceToNow } from 'date-fns';

export const formatTimeAgo = (timestamp: string): string => {
  const date = new Date(timestamp);
  return formatDistanceToNow(date, { addSuffix: true });
};

export const formatPostTimestamp = (createdAt: string, updatedAt: string): { text: string; isEdited: boolean } => {
  const created = new Date(createdAt);
  const updated = new Date(updatedAt);
  
  // Check if post was edited (more than 5 minutes difference to account for minor DB timing differences)
  const isEdited = (updated.getTime() - created.getTime()) > 5 * 60 * 1000;
  
  if (isEdited) {
    return {
      text: `Edited ${formatDistanceToNow(updated, { addSuffix: true })}`,
      isEdited: true
    };
  }
  
  return {
    text: formatDistanceToNow(created, { addSuffix: true }),
    isEdited: false
  };
};
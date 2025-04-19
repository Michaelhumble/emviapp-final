
import { useState } from 'react';
import { SalonTeamMember } from './types';

export const useTeamData = () => {
  const [loading] = useState(false);
  const [error] = useState<Error | null>(null);
  const [teamMembers] = useState<SalonTeamMember[]>([]);
  const [bookingCounts] = useState<Record<string, number>>({});

  return {
    teamMembers,
    bookingCounts,
    loading,
    error
  };
};

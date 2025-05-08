
import React from 'react';
import { Phone } from 'lucide-react';
import { useAuth } from '@/context/auth';

interface JobCardContactProps {
  phoneNumber: string;
}

const JobCardContact: React.FC<JobCardContactProps> = ({ phoneNumber }) => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return (
      <div className="text-xs text-gray-500 italic flex items-center gap-1">
        <Phone className="h-3 w-3" />
        <span>Sign in to see phone number</span>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <Phone className="h-4 w-4 mr-2 text-gray-400" />
      <span>{phoneNumber}</span>
    </div>
  );
};

export default JobCardContact;

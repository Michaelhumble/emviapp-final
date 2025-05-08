
import React from 'react';
import { Phone, LockIcon } from "lucide-react";
import { useAuth } from "@/context/auth";
import AuthAction from "@/components/common/AuthAction";

interface JobCardContactProps {
  phoneNumber?: string;
  showAlways?: boolean;
}

const JobCardContact = ({ phoneNumber, showAlways = false }: JobCardContactProps) => {
  const { isSignedIn } = useAuth();
  
  if (!phoneNumber) return null;

  // Only show contact info if user is signed in or showAlways is true
  if (isSignedIn || showAlways) {
    return (
      <div className="flex items-center text-base">
        <Phone className="h-3.5 w-3.5 mr-1 text-gray-500" />
        <span>{phoneNumber}</span>
      </div>
    );
  }
  
  // Otherwise show lock icon with sign in prompt
  return (
    <AuthAction
      customTitle="Sign in to see contact details"
      onAction={() => true}
      fallbackContent={
        <div className="text-xs text-gray-500 italic flex items-center gap-1">
          <LockIcon className="h-3 w-3" />
          <span>Sign in to see contact details</span>
        </div>
      }
    />
  );
};

export default JobCardContact;

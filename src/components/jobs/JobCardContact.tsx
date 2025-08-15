
import React from 'react';
import { Phone, Mail, User } from "lucide-react";

interface JobCardContactProps {
  phoneNumber?: string;
  email?: string;
  contactName?: string;
  showAlways?: boolean;
}

const JobCardContact = ({ phoneNumber, email, contactName }: JobCardContactProps) => {
  // Always show contact info without gating
  if (!phoneNumber && !email && !contactName) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200/50 rounded-lg p-3 space-y-2">
      <div className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        Contact Information
      </div>
      
      <div className="space-y-1.5">
        {contactName && (
          <div className="flex items-center gap-2 text-sm">
            <User className="h-3.5 w-3.5 text-gray-600" />
            <span className="font-medium text-gray-800">{contactName}</span>
          </div>
        )}
        
        {phoneNumber && (
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-3.5 w-3.5 text-green-600" />
            <span className="font-medium text-green-700">{phoneNumber}</span>
          </div>
        )}
        
        {email && (
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-3.5 w-3.5 text-blue-600" />
            <span className="font-medium text-blue-700">{email}</span>
          </div>
        )}
        
        {!phoneNumber && !email && contactName && (
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-3.5 w-3.5 text-gray-500" />
            <span className="font-medium text-gray-600">Contact via EmviApp</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCardContact;

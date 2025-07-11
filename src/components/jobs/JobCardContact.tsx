
import React from 'react';
import { Phone, LockIcon } from "lucide-react";
import { useAuth } from "@/context/auth";
import AuthAction from "@/components/common/AuthAction";
import PremiumContactGate from "@/components/common/PremiumContactGate";

interface JobCardContactProps {
  phoneNumber?: string;
  showAlways?: boolean; // This prop will be ignored as per new requirements
}

const JobCardContact = ({ phoneNumber }: JobCardContactProps) => {
  return (
    <PremiumContactGate contactPhone={phoneNumber}>
      <div className="flex items-center text-base">
        <Phone className="h-3.5 w-3.5 mr-1 text-gray-500" />
        <span>{phoneNumber}</span>
      </div>
    </PremiumContactGate>
  );
};

export default JobCardContact;

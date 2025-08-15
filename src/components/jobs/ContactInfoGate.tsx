import React from 'react';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import AuthAction from '@/components/common/AuthAction';

interface ContactInfoGateProps {
  contactPhone?: string;
  contactEmail?: string;
  contactName?: string;
  className?: string;
}

const ContactInfoGate: React.FC<ContactInfoGateProps> = ({
  contactPhone,
  contactEmail,
  contactName,
  className = ""
}) => {
  const { isSignedIn } = useAuth();

  // If user is signed in, show contact info directly
  if (isSignedIn) {
    return (
      <div className={`space-y-2 ${className}`}>
        {contactName && (
          <div className="text-sm">
            <span className="font-medium text-gray-700">Contact:</span> {contactName}
          </div>
        )}
        {contactPhone && (
          <div className="text-sm">
            <span className="font-medium text-gray-700">Phone:</span> {contactPhone}
          </div>
        )}
        {contactEmail && (
          <div className="text-sm">
            <span className="font-medium text-gray-700">Email:</span> {contactEmail}
          </div>
        )}
      </div>
    );
  }

  // For non-signed-in users, show simple placeholder
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="text-sm text-gray-500">
        Sign in to view contact details
      </div>
      <AuthAction
        customTitle="Get Contact Info"
        onAction={() => true}
        fallbackContent={
          <Button 
            size="sm" 
            variant="outline"
            className="text-xs h-8 px-3"
          >
            <UserPlus className="w-3 h-3 mr-1" />
            Sign Up & View Contact Info
          </Button>
        }
      />
    </div>
  );
};

export default ContactInfoGate;
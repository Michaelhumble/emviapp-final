import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building, DollarSign, Phone, Mail, User } from 'lucide-react';
import { useAuth } from '@/context/auth';

interface NailJobPreviewCardProps {
  title?: string;
  vietnameseTitle?: string;
  salonName?: string;
  location?: string;
  description?: string;
  vietnameseDescription?: string;
  salaryRange?: string;
  planType?: 'free' | 'paid';
  englishOnly?: boolean;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
}

const NailJobPreviewCard: React.FC<NailJobPreviewCardProps> = ({
  title = '',
  vietnameseTitle = '',
  salonName = '',
  location = '',
  description = '',
  vietnameseDescription = '',
  salaryRange = '',
  planType = 'free',
  englishOnly = false,
  contactName = '',
  contactPhone = '',
  contactEmail = ''
}) => {
  const { isSignedIn } = useAuth();
  
  // For nails jobs, always display Vietnamese first if available
  const displayTitle = vietnameseTitle || title;
  const displayDescription = vietnameseDescription || description;
  
  // Show contact info if user is signed in and job is paid
  const showContactInfo = isSignedIn && planType === 'paid';
  
  return (
    <Card className="border-2 border-pink-200 shadow-md">
      <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {displayTitle || 'Job Title'}
            </h3>
            {vietnameseTitle && title && vietnameseTitle !== title && (
              <p className="text-sm text-gray-600 italic">
                {title}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Badge 
              variant="secondary" 
              className="bg-pink-100 text-pink-700 text-xs"
            >
              Nails
            </Badge>
            {planType === 'paid' && (
              <Badge 
                variant="default" 
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs"
              >
                Premium
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-3">
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {salonName && (
            <div className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              <span>{salonName}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          )}
          {salaryRange && (
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span className="font-medium text-green-600">{salaryRange}</span>
            </div>
          )}
        </div>
        
        {displayDescription && (
          <div className="pt-2">
            <p className="text-gray-700 text-sm leading-relaxed">
              {displayDescription.length > 150 
                ? `${displayDescription.substring(0, 150)}...` 
                : displayDescription
              }
            </p>
            {vietnameseDescription && description && vietnameseDescription !== description && (
              <p className="text-gray-600 text-xs mt-2 italic">
                {description.length > 100 
                  ? `${description.substring(0, 100)}...` 
                  : description
                }
              </p>
            )}
          </div>
        )}
        
        {/* Contact Information for Paid Jobs */}
        {showContactInfo && (contactName || contactPhone || contactEmail) && (
          <div className="pt-3 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Contact Information</h4>
            <div className="space-y-1 text-sm text-gray-600">
              {contactName && (
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{contactName}</span>
                </div>
              )}
              {contactPhone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  <span>{contactPhone}</span>
                </div>
              )}
              {contactEmail && (
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  <span>{contactEmail}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {(!displayTitle && !displayDescription) && (
          <div className="text-center py-8 text-gray-400">
            <p className="text-sm">Fill out the form to see your job preview</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NailJobPreviewCard;
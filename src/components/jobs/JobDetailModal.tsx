import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, DollarSign, Phone, Mail, User, Clock, Star, Building, Users, Briefcase } from 'lucide-react';
import { Job } from '@/types/job';
import { formatDistanceToNow } from 'date-fns';
import JobCardContact from './JobCardContact';

interface JobDetailModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  additionalActions?: React.ReactNode;
}

export const JobDetailModal = ({ job, isOpen, onClose, additionalActions }: JobDetailModalProps) => {
  if (!job) return null;

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'Recently posted';
    }
  };

  const getPricingTierColor = (tier?: string) => {
    switch (tier?.toLowerCase()) {
      case 'diamond':
        return 'bg-gradient-to-r from-purple-600 to-pink-600 text-white';
      case 'premium':
        return 'bg-gradient-to-r from-blue-600 to-purple-600 text-white';
      case 'gold':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'featured':
        return 'bg-gradient-to-r from-green-500 to-blue-500 text-white';
      case 'free':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPricingTierLabel = (tier?: string) => {
    switch (tier?.toLowerCase()) {
      case 'diamond':
        return 'Diamond';
      case 'premium':
        return 'Premium';
      case 'gold':
        return 'Gold';
      case 'featured':
        return 'Featured';
      case 'free':
        return 'Free';
      default:
        return 'Standard';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold mb-2">
                {job.title}
              </DialogTitle>
              <div className="flex items-center gap-2 mb-4">
                {job.pricing_tier && (
                  <Badge className={getPricingTierColor(job.pricing_tier)}>
                    {getPricingTierLabel(job.pricing_tier)}
                  </Badge>
                )}
                {job.is_urgent && (
                  <Badge variant="destructive">
                    Urgent
                  </Badge>
                )}
                {job.featured && (
                  <Badge className="bg-yellow-500 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Company and Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {job.company && (
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-gray-500" />
                <span className="font-semibold">{job.company}</span>
              </div>
            )}
            
            {job.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span>{job.location}</span>
              </div>
            )}

            {job.employment_type && (
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-gray-500" />
                <span>{job.employment_type}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span>{formatDate(job.created_at)}</span>
            </div>
          </div>

          {/* Salary/Compensation */}
          {(job.salary_range || job.compensation_details) && (
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-green-800">Compensation</h3>
              </div>
              <p className="text-green-700">
                {job.salary_range || job.compensation_details}
              </p>
            </div>
          )}

          {/* Job Description */}
          {job.description && (
            <div>
              <h3 className="font-semibold mb-2">Job Description</h3>
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap text-gray-700">
                  {job.description}
                </p>
              </div>
            </div>
          )}

          {/* Vietnamese Description */}
          {job.vietnamese_description && (
            <div>
              <h3 className="font-semibold mb-2">Mô tả công việc (Tiếng Việt)</h3>
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap text-gray-700">
                  {job.vietnamese_description}
                </p>
              </div>
            </div>
          )}

          {/* Requirements */}
          {job.requirements && (
            <div>
              <h3 className="font-semibold mb-2">Requirements</h3>
              {Array.isArray(job.requirements) ? (
                <ul className="list-disc list-inside space-y-1">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="text-gray-700">{req}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 whitespace-pre-wrap">{job.requirements}</p>
              )}
            </div>
          )}

          {/* Benefits */}
          {job.benefits && job.benefits.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Benefits</h3>
              <ul className="list-disc list-inside space-y-1">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="text-gray-700">{benefit}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Specialties */}
          {job.specialties && job.specialties.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {job.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Job Features */}
          {(job.weekly_pay || job.has_housing || job.has_wax_room || job.no_supply_deduction || job.owner_will_train) && (
            <div>
              <h3 className="font-semibold mb-2">Job Features</h3>
              <div className="flex flex-wrap gap-2">
                {job.weekly_pay && <Badge variant="outline">Weekly Pay</Badge>}
                {job.has_housing && <Badge variant="outline">Housing Provided</Badge>}
                {job.has_wax_room && <Badge variant="outline">Wax Room Available</Badge>}
                {job.no_supply_deduction && <Badge variant="outline">No Supply Deduction</Badge>}
                {job.owner_will_train && <Badge variant="outline">Training Provided</Badge>}
              </div>
            </div>
          )}

          {/* Contact Information */}
          {job.contact_info && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 text-blue-800">Contact Information</h3>
              <div className="space-y-2">
                {job.contact_info.owner_name && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-600" />
                    <span className="text-blue-700">{job.contact_info.owner_name}</span>
                  </div>
                )}
                
                {job.contact_info.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <JobCardContact phoneNumber={job.contact_info.phone} />
                  </div>
                )}
                
                {job.contact_info.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <a 
                      href={`mailto:${job.contact_info.email}`}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {job.contact_info.email}
                    </a>
                  </div>
                )}

                {job.contact_info.notes && (
                  <div className="mt-2 p-2 bg-blue-100 rounded">
                    <p className="text-sm text-blue-700">{job.contact_info.notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Expiration Notice */}
          {job.expires_at && (
            <div className="bg-yellow-50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span className="text-sm text-yellow-700">
                  This job posting expires {formatDate(job.expires_at)}
                </span>
              </div>
            </div>
          )}

          {/* Add additional actions before the close button */}
          {additionalActions && (
            <div className="mt-4 pt-4 border-t">
              {additionalActions}
            </div>
          )}

          {/* Close Button */}
          <div className="flex justify-end pt-4">
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

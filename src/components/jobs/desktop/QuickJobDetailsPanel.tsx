import React from 'react';
import { Job } from '@/types/job';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  X,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  Users,
  Phone,
  Mail,
  Globe,
  Edit,
  Star,
  Crown,
  Eye,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';

interface QuickJobDetailsPanelProps {
  job: Job;
  onClose: () => void;
}

const QuickJobDetailsPanel: React.FC<QuickJobDetailsPanelProps> = ({
  job,
  onClose
}) => {
  const { user, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const isOwner = user?.id === job.user_id;
  const isExpired = job.expires_at ? new Date(job.expires_at) < new Date() : false;

  // Get pricing tier display
  const getPricingTierDisplay = () => {
    const tier = job.pricing_tier?.toLowerCase() || 'free';
    switch (tier) {
      case 'premium':
        return { 
          color: 'bg-purple-100 text-purple-800 border-purple-200', 
          icon: <Star className="h-4 w-4" />,
          text: 'Premium'
        };
      case 'diamond':
        return { 
          color: 'bg-blue-100 text-blue-800 border-blue-200', 
          icon: <Crown className="h-4 w-4" />,
          text: 'Diamond'
        };
      case 'free':
      default:
        return { 
          color: 'bg-green-100 text-green-800 border-green-200', 
          icon: null,
          text: 'Free'
        };
    }
  };

  const pricingDisplay = getPricingTierDisplay();

  const handleEditJob = () => {
    navigate(`/jobs/edit/${job.id}`);
  };

  const handleViewFullDetails = () => {
    // Open in new tab or modal for full details
    window.open(`/jobs/${job.id}`, '_blank');
  };

  return (
    <div className="w-1/3 bg-white border-l border-gray-200 overflow-y-auto">
      <Card className="h-full rounded-none border-0">
        <CardHeader className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg font-bold text-gray-900 pr-4">
                {job.title || 'Untitled Job'}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {job.company || 'Company Name'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={`${pricingDisplay.color} flex items-center gap-1`}>
                {pricingDisplay.icon}
                {pricingDisplay.text}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Job Image */}
          {job.image && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={job.image}
                alt={job.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Key Details */}
          <div className="space-y-3">
            {job.location && (
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">{job.location}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm">
                Posted {job.created_at ? new Date(job.created_at).toLocaleDateString() : 'Recently'}
              </span>
            </div>

            {job.compensation_details && (
              <div className="flex items-center gap-2 text-emerald-600">
                <DollarSign className="h-4 w-4" />
                <span className="text-sm font-semibold">{job.compensation_details}</span>
              </div>
            )}

            {job.category && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {job.category}
                </Badge>
              </div>
            )}
          </div>

          <Separator />

          {/* Description */}
          {(job.description || job.vietnamese_description) && (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Job Description</h4>
              {job.category === 'Nail Tech' && job.vietnamese_description ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {job.vietnamese_description}
                  </p>
                  {job.description && (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {job.description}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  {job.description && (
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {job.description}
                    </p>
                  )}
                  {job.vietnamese_description && (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {job.vietnamese_description}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Requirements */}
          {job.requirements && (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Requirements</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {job.requirements}
              </p>
            </div>
          )}

          <Separator />

          {/* Contact Information - Gated */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Contact Information</h4>
            {isSignedIn ? (
              <div className="space-y-2">
                {job.contact_info?.phone && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{job.contact_info.phone}</span>
                  </div>
                )}
                {job.contact_info?.email && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{job.contact_info.email}</span>
                  </div>
                )}
                {job.contact_info?.notes && job.contact_info.notes.includes('http') && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <a 
                      href={job.contact_info.notes}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Website
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <Eye className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-3">
                  Sign in to view contact information
                </p>
                <Button 
                  size="sm"
                  onClick={() => navigate('/auth/signin')}
                  className="w-full"
                >
                  Sign In to Apply
                </Button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button 
              onClick={handleViewFullDetails}
              className="w-full"
              variant="outline"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Full Details
            </Button>
            
            {isOwner && (
              <Button
                onClick={handleEditJob}
                className="w-full"
                variant="secondary"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Job
              </Button>
            )}

            {isSignedIn && !isOwner && (
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Apply Now
              </Button>
            )}
          </div>

          {/* Expired Notice */}
          {isExpired && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-800 font-medium text-center">
                This job posting has expired
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickJobDetailsPanel;
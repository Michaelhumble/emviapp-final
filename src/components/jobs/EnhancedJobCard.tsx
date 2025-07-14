import React, { useState } from 'react';
import { Job } from '@/types/job';
import { MapPin, Calendar, DollarSign, Edit, Trash2, Eye, Phone, Mail, Clock, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface EnhancedJobCardProps {
  job: Job;
  onViewDetails: () => void;
}

const EnhancedJobCard: React.FC<EnhancedJobCardProps> = ({
  job,
  onViewDetails,
}) => {
  const navigate = useNavigate();
  const { user, isSignedIn } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Check if user owns this job
  const isOwner = user?.id === job.user_id;
  const isExpired = job.expires_at ? new Date(job.expires_at) < new Date() : false;
  
  // Get job images with comprehensive checking
  const getJobImages = (): string[] => {
    const jobAny = job as any;
    let allImages: string[] = [];

    // Check metadata for photos first (webhook processed jobs)
    if (jobAny.metadata?.photos && Array.isArray(jobAny.metadata.photos)) {
      const validUrls = jobAny.metadata.photos.filter((url: any) => 
        url && typeof url === 'string' && url.trim() && url !== 'photos-uploaded'
      );
      if (validUrls.length > 0) return validUrls;
    }

    // Check metadata for image_urls
    if (jobAny.metadata?.image_urls && Array.isArray(jobAny.metadata.image_urls)) {
      const validUrls = jobAny.metadata.image_urls.filter((url: any) => 
        url && typeof url === 'string' && url.trim() && url !== 'photos-uploaded'
      );
      if (validUrls.length > 0) return validUrls;
    }

    // Check direct image_urls field
    if (jobAny.image_urls && Array.isArray(jobAny.image_urls)) {
      const validUrls = jobAny.image_urls.filter((url: any) => 
        url && typeof url === 'string' && url.trim() && url !== 'photos-uploaded'
      );
      if (validUrls.length > 0) return validUrls;
    }

    // Check photos field
    if (jobAny.photos && Array.isArray(jobAny.photos)) {
      const validUrls = jobAny.photos.filter((url: any) => 
        url && typeof url === 'string' && url.trim() && url !== 'photos-uploaded'
      );
      if (validUrls.length > 0) return validUrls;
    }

    // Single image fallback
    if (job.image_url && typeof job.image_url === 'string' && job.image_url.trim()) {
      return [job.image_url];
    }

    return [];
  };

  const jobImages = getJobImages();
  const hasImages = jobImages.length > 0;

  // Plan badge logic
  const getPlanBadge = () => {
    const tier = job.pricing_tier;
    switch (tier) {
      case 'diamond':
        return { text: 'DIAMOND', class: 'bg-purple-100 text-purple-800', icon: '💎' };
      case 'premium':
        return { text: 'PREMIUM', class: 'bg-orange-100 text-orange-800', icon: '⭐' };
      case 'gold':
        return { text: 'FEATURED', class: 'bg-yellow-100 text-yellow-800', icon: '🌟' };
      case 'free':
        return { text: 'FREE', class: 'bg-green-100 text-green-800', icon: '🆓' };
      default:
        return { text: 'BASIC', class: 'bg-blue-100 text-blue-800', icon: '📋' };
    }
  };

  // Days remaining logic
  const getDaysRemaining = () => {
    if (!job.expires_at) return null;
    const daysLeft = Math.ceil((new Date(job.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return daysLeft > 0 ? daysLeft : 0;
  };

  // Check if job is new (posted within last 3 days)
  const isNewJob = () => {
    if (!job.created_at) return false;
    const daysSinceCreated = (Date.now() - new Date(job.created_at).getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceCreated <= 3;
  };

  const daysLeft = getDaysRemaining();
  const isEndingSoon = daysLeft !== null && daysLeft <= 7;
  const planBadge = getPlanBadge();

  // Handle edit action
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/jobs/edit/${job.id}`);
  };

  // Handle delete action
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!confirm('Are you sure you want to delete this job posting?')) return;
    
    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', job.id);
        
      if (error) throw error;
      
      toast.success('Job deleted successfully');
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete job');
    }
  };

  // Image navigation
  const nextImage = () => {
    if (jobImages.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % jobImages.length);
    }
  };

  const prevImage = () => {
    if (jobImages.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + jobImages.length) % jobImages.length);
    }
  };

  return (
    <Card className="group overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Enhanced Image Gallery Section */}
      {hasImages && (
        <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100">
          <img 
            src={jobImages[currentImageIndex]} 
            alt={job.title || 'Job listing'} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          
          {/* Image Navigation */}
          {jobImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              
              {/* Image indicators */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {jobImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
              
              {/* Image count badge */}
              <Badge className="absolute top-2 left-2 bg-black/70 text-white text-xs">
                {currentImageIndex + 1}/{jobImages.length}
              </Badge>
            </>
          )}
          
          {/* Plan badge */}
          <Badge className={`absolute top-2 right-2 text-xs ${planBadge.class}`}>
            {planBadge.icon} {planBadge.text}
          </Badge>
          
          {/* NEW badge for recent posts */}
          {isNewJob() && (
            <Badge className="absolute bottom-2 left-2 bg-green-100 text-green-800 text-xs animate-pulse">
              🆕 NEW
            </Badge>
          )}
          
          {/* Ending soon badge */}
          {isEndingSoon && daysLeft !== null && daysLeft > 0 && (
            <Badge className="absolute bottom-2 right-2 bg-red-100 text-red-800 text-xs animate-pulse">
              ⚠️ ENDING SOON
            </Badge>
          )}
          
          {/* Expired badge */}
          {isExpired && (
            <Badge className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-sm px-4 py-2">
              EXPIRED
            </Badge>
          )}
        </div>
      )}
      
      <CardContent className="p-4 sm:p-6 space-y-3">
        {/* Header with Title and Compensation */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg text-foreground line-clamp-2 min-w-0">
              {job.title}
            </h3>
            {job.compensation_details && (
              <div className="flex items-center gap-1 text-primary font-bold whitespace-nowrap">
                <DollarSign className="h-4 w-4" />
                <span className="text-sm">{job.compensation_details}</span>
              </div>
            )}
          </div>
          
          {/* Location and Category */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {job.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{job.location}</span>
              </div>
            )}
            <Badge variant="outline" className="text-xs">
              {job.category}
            </Badge>
          </div>
        </div>

        {/* Description Preview */}
        {job.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {job.description}
          </p>
        )}

        {/* Vietnamese Description (if available) */}
        {job.vietnamese_description && (
          <p className="text-sm text-muted-foreground line-clamp-2 italic">
            {job.vietnamese_description}
          </p>
        )}

        {/* FOMO & Social Proof Elements */}
        <div className="space-y-2">
          {/* Activity indicators */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              Viewed 89 times
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              12 applied
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Posted {job.created_at ? new Date(job.created_at).toLocaleDateString() : 'recently'}
            </span>
          </div>
          
          {/* Days remaining */}
          {daysLeft !== null && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {daysLeft > 0 ? `${daysLeft} days remaining` : 'Expired'}
              </span>
              {isEndingSoon && daysLeft > 0 && (
                <Badge className="bg-orange-100 text-orange-800 text-xs">
                  🔥 Ending Soon
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Contact Information - Auth Gated */}
        {job.contact_info && (
          <div className="space-y-2">
            {isSignedIn ? (
              <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                <h4 className="text-sm font-medium">Contact Information</h4>
                {job.contact_info.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-3 w-3 text-green-600" />
                    <span>{job.contact_info.phone}</span>
                  </div>
                )}
                {job.contact_info.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-3 w-3 text-blue-600" />
                    <span>{job.contact_info.email}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-muted/50 rounded-lg p-3 text-center relative">
                {/* Blurred contact preview */}
                <div className="filter blur-sm pointer-events-none mb-2">
                  <div className="flex items-center gap-2 justify-center text-sm text-gray-400">
                    <Phone className="h-3 w-3" />
                    <span>(555) XXX-XXXX</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Sign in to view contact details
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            onClick={onViewDetails}
            className="flex-1 text-sm"
            variant="outline"
          >
            <Eye className="h-3 w-3 mr-2" />
            View Details
          </Button>
          
          {isOwner && (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleEdit}
                className="px-3 bg-primary/10 hover:bg-primary/20 text-primary border-primary/20"
                title="Edit Job"
              >
                <Edit className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleDelete}
                className="px-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                title="Delete Job"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>

        {/* Expired job renewal CTA */}
        {isExpired && isOwner && (
          <div className="border-t pt-3 mt-3">
            <Button 
              onClick={() => navigate(`/jobs/renew/${job.id}`)}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              🔄 Renew Listing
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedJobCard;
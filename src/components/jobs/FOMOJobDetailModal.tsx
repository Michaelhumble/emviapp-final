import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Phone, MapPin, DollarSign, Clock, Star, Building2 } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface FOMOJob {
  salonName: string;
  title: string;
  salary: string;
  description: string;
  location: string;
  phone: string;
  type: 'gold' | 'premium';
  fomoLabel: string;
  imageUrl: string;
}

interface FOMOJobDetailModalProps {
  job: FOMOJob;
  isOpen: boolean;
  onClose: () => void;
  isSignedIn: boolean;
}

const FOMOJobDetailModal: React.FC<FOMOJobDetailModalProps> = ({ 
  job, 
  isOpen, 
  onClose, 
  isSignedIn 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="absolute -top-2 -right-2 h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
          
          {/* FOMO Label */}
          <div className={`absolute -top-6 -right-6 z-10 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
            job.fomoLabel === 'Real Job' 
              ? 'bg-green-500' 
              : job.fomoLabel === 'Position Just Filled'
              ? 'bg-red-500'
              : 'bg-orange-500'
          }`}>
            {job.fomoLabel}
          </div>

          <DialogTitle className="text-2xl font-bold text-gray-900 pr-12">
            {job.salonName}
          </DialogTitle>
          <DialogDescription className="text-lg font-semibold text-gray-700">
            {job.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image */}
          <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
            <ImageWithFallback 
              src={job.imageUrl} 
              alt={job.salonName} 
              className="w-full h-full object-cover"
              category="nail"
            />
            
            {/* Tier Badge */}
            <Badge className={`absolute top-3 left-3 font-bold ${
              job.type === 'gold' 
                ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white' 
                : 'bg-gradient-to-r from-purple-500 to-violet-600 text-white'
            }`}>
              {job.type === 'gold' ? '✨ GOLD FEATURED' : '👑 PREMIUM'}
            </Badge>

            {/* Verified Badge */}
            <Badge className="absolute top-3 right-3 bg-blue-500 text-white">
              ✓ Facebook Group
            </Badge>

            {/* Status Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-white font-semibold flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Just Expired · Position Filled · Check Back for Similar Jobs
              </p>
            </div>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Salary */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="font-bold text-green-800">Weekly Salary</h3>
              </div>
              <p className="text-2xl font-bold text-green-600">{job.salary}</p>
            </div>

            {/* Location */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="font-bold text-blue-800">Location</h3>
              </div>
              <p className="text-lg font-semibold text-blue-600">{job.location}</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className={`border rounded-xl p-6 ${isSignedIn ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-center mb-3">
              <Phone className={`w-5 h-5 mr-2 ${isSignedIn ? 'text-green-600' : 'text-red-600'}`} />
              <h3 className={`font-bold ${isSignedIn ? 'text-green-800' : 'text-red-800'}`}>
                Contact Information
              </h3>
            </div>
            
            {isSignedIn ? (
              <div className="space-y-2">
                <p className="text-lg font-bold text-green-600">📞 {job.phone}</p>
                <p className="text-sm text-green-700">
                  ✅ Contact details unlocked! Call now to inquire about similar positions.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="font-bold text-red-600">🔒 Contact details are locked</p>
                <p className="text-sm text-red-700 mb-4">
                  Sign in to unlock phone numbers and direct contact information for this and hundreds of other real nail salon jobs.
                </p>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold">
                  Sign In to Unlock Contact Info
                </Button>
              </div>
            )}
          </div>

          {/* Job Description */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <div className="flex items-center mb-3">
              <Building2 className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="font-bold text-gray-800">Job Description</h3>
            </div>
            <p className="text-gray-700 font-medium leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Additional Information */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-center mb-3">
              <Star className="w-5 h-5 text-yellow-600 mr-2" />
              <h3 className="font-bold text-yellow-800">Important Note</h3>
            </div>
            <div className="space-y-2 text-yellow-700">
              <p className="font-semibold">
                ⚠️ This position has been filled, but similar opportunities are available!
              </p>
              <p className="text-sm">
                • New nail salon jobs are posted daily on EmviApp<br/>
                • Many positions offer similar or better compensation<br/>
                • Sign up for instant notifications when new jobs match your criteria
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3">
            <Button 
              onClick={onClose}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3"
            >
              Browse Similar Jobs
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-bold"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FOMOJobDetailModal;
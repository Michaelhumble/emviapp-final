import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Phone, MapPin, DollarSign, Clock, Star, Building2, FileText } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface FOMOJob {
  salonName: string;
  title: string;
  salary: string;
  description: string;
  location: string;
  phone: string;
  type: 'gold' | 'premium';
  summary: string;
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
            <Badge className={`absolute top-3 left-3 font-medium ${
              job.type === 'gold' 
                ? 'bg-yellow-500 text-white' 
                : 'bg-purple-500 text-white'
            }`}>
              {job.type === 'gold' ? 'Featured' : 'Premium'}
            </Badge>
          </div>

          {/* Salary and Location - EXACT Reference Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Weekly Salary */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="font-semibold text-green-800">Weekly Salary</h3>
              </div>
              <p className="text-2xl font-bold text-green-700">{job.salary}</p>
            </div>

            {/* Location */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-blue-800">Location</h3>
              </div>
              <p className="text-2xl font-bold text-blue-700">{job.location}</p>
            </div>
          </div>

          {/* Contact Information - EXACT Reference Position */}
          <div className={`rounded-lg p-4 ${isSignedIn ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center mb-3">
              <Phone className={`w-5 h-5 mr-2 ${isSignedIn ? 'text-green-600' : 'text-red-600'}`} />
              <h3 className={`font-semibold ${isSignedIn ? 'text-green-800' : 'text-red-800'}`}>
                Contact Information
              </h3>
            </div>
            
            {isSignedIn ? (
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-lg font-semibold text-green-800">{job.phone}</span>
                </div>
                <div className="flex items-center mt-3 text-green-700">
                  <span className="text-green-600 mr-2">✓</span>
                  <span className="text-sm font-medium">Contact details unlocked! Call now to apply.</span>
                </div>
              </div>
            ) : null}
          </div>

          {/* Job Description - EXACT Reference Position */}
          <div className="border-t pt-6 mb-6">
            <div className="flex items-center mb-4">
              <FileText className="h-5 w-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold">Job Description</h3>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {job.description}
              </p>
            </div>
          </div>


          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
            {isSignedIn && (
              <Button 
                onClick={onClose}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white"
              >
                Apply Now
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FOMOJobDetailModal;
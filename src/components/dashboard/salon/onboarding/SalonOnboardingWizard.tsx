import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, Camera, Users, Target, Sparkles, 
  CheckCircle, ArrowRight, ArrowLeft, Upload,
  MapPin, Phone, Globe, Instagram, Star
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { supabaseBypass } from '@/types/supabase-bypass';
import { toast } from 'sonner';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

const steps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to EmviApp!',
    description: 'Let\'s set up your salon profile in just a few minutes',
    icon: Crown,
    color: 'from-purple-600 to-pink-600'
  },
  {
    id: 'profile',
    title: 'Salon Profile',
    description: 'Add your salon details and upload a logo',
    icon: Camera,
    color: 'from-blue-600 to-cyan-600'
  },
  {
    id: 'team',
    title: 'Add Your Team',
    description: 'Invite your first team member to get started',
    icon: Users,
    color: 'from-green-600 to-emerald-600'
  },
  {
    id: 'offer',
    title: 'Create Your First Offer',
    description: 'Attract customers with a special promotion',
    icon: Target,
    color: 'from-orange-600 to-red-600'
  },
  {
    id: 'complete',
    title: 'You\'re All Set!',
    description: 'Your salon is ready to attract customers',
    icon: Sparkles,
    color: 'from-indigo-600 to-purple-600'
  }
];

interface SalonOnboardingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const SalonOnboardingWizard: React.FC<SalonOnboardingWizardProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const { userProfile, updateProfile } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form data
  const [salonData, setSalonData] = useState({
    salon_name: userProfile?.salon_name || '',
    bio: userProfile?.bio || '',
    location: userProfile?.location || '',
    phone: userProfile?.phone || '',
    website: userProfile?.website || '',
    instagram: userProfile?.instagram || '',
    logo_url: userProfile?.avatar_url || ''
  });
  
  const [teamMember, setTeamMember] = useState({
    email: '',
    full_name: '',
    role: 'artist'
  });
  
  const [firstOffer, setFirstOffer] = useState({
    title: '',
    description: '',
    discount_percent: 20,
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 30 days from now
  });

  const handleNextStep = async () => {
    setIsLoading(true);
    
    try {
      if (currentStep === 1) {
        // Save salon profile
        await updateSalonProfile();
      } else if (currentStep === 2) {
        // Invite team member
        await inviteTeamMember();
      } else if (currentStep === 3) {
        // Create first offer
        await createFirstOffer();
      }
      
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Mark onboarding as complete
        await markOnboardingComplete();
        onComplete();
      }
    } catch (error) {
      console.error('Onboarding step error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSalonProfile = async () => {
    const { error } = await supabaseBypass
      .from('profiles')
      .update({
        salon_name: salonData.salon_name,
        bio: salonData.bio,
        location: salonData.location,
        phone: salonData.phone,
        website: salonData.website,
        instagram: salonData.instagram,
        avatar_url: salonData.logo_url,
        updated_at: new Date().toISOString()
      })
      .eq('id', userProfile?.id);

    if (error) throw error;
    toast.success('Salon profile updated!');
  };

  const inviteTeamMember = async () => {
    if (!teamMember.email || !teamMember.full_name) {
      setCurrentStep(currentStep + 1); // Skip if no team member
      return;
    }

    // Create salon staff entry
    const { error } = await supabaseBypass
      .from('salon_staff')
      .insert({
        salon_id: userProfile?.id,
        email: teamMember.email,
        full_name: teamMember.full_name,
        role: teamMember.role,
        status: 'pending',
        invitation_sent_at: new Date().toISOString()
      });

    if (error) throw error;
    toast.success('Team member invitation sent!');
  };

  const createFirstOffer = async () => {
    if (!firstOffer.title || !firstOffer.description) {
      setCurrentStep(currentStep + 1); // Skip if no offer
      return;
    }

    const { error } = await supabaseBypass
      .from('salon_offers')
      .insert({
        salon_id: userProfile?.id,
        title: firstOffer.title,
        description: firstOffer.description,
        discount_percent: firstOffer.discount_percent,
        start_date: new Date().toISOString(),
        end_date: firstOffer.end_date,
        is_active: true
      });

    if (error) throw error;
    toast.success('First offer created!');
  };

  const markOnboardingComplete = async () => {
    const completedTasks = ['profile_setup', 'team_invite', 'first_offer'];
    const { error } = await supabaseBypass
      .from('profiles')
      .update({
        completed_profile_tasks: completedTasks,
        updated_at: new Date().toISOString()
      })
      .eq('id', userProfile?.id);

    if (error) throw error;
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: // Profile step
        return salonData.salon_name.length >= 2;
      case 2: // Team step
        return true; // Optional step
      case 3: // Offer step
        return true; // Optional step
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    const step = steps[currentStep];

    switch (step.id) {
      case 'welcome':
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <Crown className="w-12 h-12 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to your Salon Empire!
              </h3>
              <p className="text-gray-600">
                You're about to join thousands of successful salon owners who use EmviApp to grow their business. 
                Let's get you set up in just a few quick steps.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="text-center">
                <div className="bg-blue-100 rounded-lg p-3 mb-2">
                  <Users className="w-6 h-6 text-blue-600 mx-auto" />
                </div>
                <p className="text-sm font-medium">Manage Team</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-lg p-3 mb-2">
                  <Target className="w-6 h-6 text-green-600 mx-auto" />
                </div>
                <p className="text-sm font-medium">Create Offers</p>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Camera className="w-16 h-16 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Set Up Your Salon Profile</h3>
              <p className="text-gray-600">Add your salon details to attract more customers</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salon Name *
                </label>
                <Input
                  placeholder="e.g., Sunshine Beauty & Spa"
                  value={salonData.salon_name}
                  onChange={(e) => setSalonData({...salonData, salon_name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  About Your Salon
                </label>
                <Textarea
                  placeholder="Tell customers what makes your salon special..."
                  value={salonData.bio}
                  onChange={(e) => setSalonData({...salonData, bio: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location
                  </label>
                  <Input
                    placeholder="City, State"
                    value={salonData.location}
                    onChange={(e) => setSalonData({...salonData, location: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone
                  </label>
                  <Input
                    placeholder="(555) 123-4567"
                    value={salonData.phone}
                    onChange={(e) => setSalonData({...salonData, phone: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Globe className="w-4 h-4 inline mr-1" />
                    Website
                  </label>
                  <Input
                    placeholder="www.yoursalon.com"
                    value={salonData.website}
                    onChange={(e) => setSalonData({...salonData, website: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Instagram className="w-4 h-4 inline mr-1" />
                    Instagram
                  </label>
                  <Input
                    placeholder="@yoursalon"
                    value={salonData.instagram}
                    onChange={(e) => setSalonData({...salonData, instagram: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Users className="w-16 h-16 mx-auto text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Invite Your First Team Member</h3>
              <p className="text-gray-600">Add artists and staff to start building your team</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Input
                  placeholder="e.g., Sarah Johnson"
                  value={teamMember.full_name}
                  onChange={(e) => setTeamMember({...teamMember, full_name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="sarah@example.com"
                  value={teamMember.email}
                  onChange={(e) => setTeamMember({...teamMember, email: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select 
                  value={teamMember.role}
                  onChange={(e) => setTeamMember({...teamMember, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="artist">Nail Artist</option>
                  <option value="manager">Manager</option>
                  <option value="receptionist">Receptionist</option>
                </select>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                💡 <strong>Tip:</strong> You can skip this step and add team members later from your dashboard.
              </p>
            </div>
          </div>
        );

      case 'offer':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Target className="w-16 h-16 mx-auto text-orange-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Create Your First Offer</h3>
              <p className="text-gray-600">Attract new customers with a special promotion</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Offer Title
                </label>
                <Input
                  placeholder="e.g., New Customer Special"
                  value={firstOffer.title}
                  onChange={(e) => setFirstOffer({...firstOffer, title: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Textarea
                  placeholder="Describe your special offer..."
                  value={firstOffer.description}
                  onChange={(e) => setFirstOffer({...firstOffer, description: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount Percentage
                  </label>
                  <Input
                    type="number"
                    placeholder="20"
                    value={firstOffer.discount_percent}
                    onChange={(e) => setFirstOffer({...firstOffer, discount_percent: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valid Until
                  </label>
                  <Input
                    type="date"
                    value={firstOffer.end_date}
                    onChange={(e) => setFirstOffer({...firstOffer, end_date: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-sm text-orange-700">
                🎯 <strong>Pro Tip:</strong> First-time customer offers typically perform best at 15-25% discount.
              </p>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                🎉 Congratulations!
              </h3>
              <p className="text-gray-600">
                Your salon is now set up and ready to attract customers. You've unlocked the full power of EmviApp!
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="text-center">
                <Badge variant="secondary" className="bg-green-100 text-green-700 mb-1">+50</Badge>
                <p className="text-xs text-gray-600">Setup Credits</p>
              </div>
              <div className="text-center">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 mb-1">Level 2</Badge>
                <p className="text-xs text-gray-600">Salon Status</p>
              </div>
              <div className="text-center">
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 mb-1">Premium</Badge>
                <p className="text-xs text-gray-600">Features</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2">What's Next?</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>✨ Explore your dashboard and all the premium features</li>
                <li>📸 Upload photos of your work to attract customers</li>
                <li>📅 Set up your booking calendar</li>
                <li>🎯 Share your offers to start getting bookings</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-purple-600" />
            Salon Setup Wizard
          </DialogTitle>
        </DialogHeader>
        
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300
                  ${isActive ? `bg-gradient-to-r ${step.color} text-white shadow-lg` : 
                    isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}
                `}>
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <span className={`text-xs text-center ${isActive ? 'text-purple-600 font-medium' : 'text-gray-500'}`}>
                  {step.title.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[400px]"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={currentStep === 0 ? onClose : handlePrevStep}
            disabled={isLoading}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            {currentStep === 0 ? 'Skip Setup' : 'Previous'}
          </Button>
          
          <Button
            onClick={handleNextStep}
            disabled={!canProceed() || isLoading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isLoading ? (
              'Processing...'
            ) : currentStep === steps.length - 1 ? (
              'Complete Setup'
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SalonOnboardingWizard;
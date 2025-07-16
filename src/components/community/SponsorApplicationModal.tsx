import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Star, Calendar, DollarSign, Target, Building, Mail, Phone, Globe, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface SponsorApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (application: any) => void;
}

const SponsorApplicationModal: React.FC<SponsorApplicationModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    instagram: '',
    facebook: '',
    businessType: '',
    campaignType: '',
    budget: '',
    duration: '',
    targetAudience: '',
    campaignGoals: '',
    previousExperience: '',
    brandAssets: [],
    additionalInfo: ''
  });

  const totalSteps = 3;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    // Validate required fields
    const requiredFields = ['companyName', 'contactName', 'email', 'businessType', 'campaignType', 'budget'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Submit application
    onSubmit({
      ...formData,
      submittedAt: new Date().toISOString(),
      status: 'pending',
      id: Date.now().toString()
    });

    toast.success('🎉 Application submitted! You\'ll hear from us within 48 hours.');
    onClose();
  };

  const getCurrentWaitlistPosition = () => {
    return Math.floor(Math.random() * 15) + 3; // Mock waitlist position
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-border bg-gradient-to-r from-primary/10 to-purple-500/10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Become a Sponsor</h2>
                <p className="text-muted-foreground">Join the EmviApp Sponsor Spotlight</p>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X size={20} />
              </Button>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>Step {step} of {totalSteps}</span>
                <span>{Math.round((step / totalSteps) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <motion.div
                  className="bg-primary h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / totalSteps) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Building className="mr-2 text-primary" size={20} />
                      Company Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Company Name *</label>
                        <Input
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          placeholder="Beauty Brand Inc."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Contact Name *</label>
                        <Input
                          value={formData.contactName}
                          onChange={(e) => handleInputChange('contactName', e.target.value)}
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="contact@beautybrand.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 flex items-center">
                      <Globe className="mr-2 text-primary" size={16} />
                      Online Presence
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Website</label>
                        <Input
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          placeholder="https://beautybrand.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Instagram</label>
                        <Input
                          value={formData.instagram}
                          onChange={(e) => handleInputChange('instagram', e.target.value)}
                          placeholder="@beautybrand"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Facebook</label>
                        <Input
                          value={formData.facebook}
                          onChange={(e) => handleInputChange('facebook', e.target.value)}
                          placeholder="facebook.com/beautybrand"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Business Type *</label>
                    <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beauty-products">Beauty Products</SelectItem>
                        <SelectItem value="tools-equipment">Tools & Equipment</SelectItem>
                        <SelectItem value="education">Education & Training</SelectItem>
                        <SelectItem value="software">Software & Apps</SelectItem>
                        <SelectItem value="salon-supplies">Salon Supplies</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Target className="mr-2 text-primary" size={20} />
                      Campaign Details
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Campaign Type *</label>
                        <Select value={formData.campaignType} onValueChange={(value) => handleInputChange('campaignType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select campaign type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="product-launch">Product Launch</SelectItem>
                            <SelectItem value="brand-awareness">Brand Awareness</SelectItem>
                            <SelectItem value="contest-giveaway">Contest/Giveaway</SelectItem>
                            <SelectItem value="education">Educational Content</SelectItem>
                            <SelectItem value="recruitment">Talent Recruitment</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Monthly Budget *</label>
                        <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your budget" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                            <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                            <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                            <SelectItem value="10000+">$10,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Target Audience</label>
                    <Textarea
                      value={formData.targetAudience}
                      onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                      placeholder="Describe your ideal audience (nail artists, salon owners, beauty enthusiasts, etc.)"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Campaign Goals</label>
                    <Textarea
                      value={formData.campaignGoals}
                      onChange={(e) => handleInputChange('campaignGoals', e.target.value)}
                      placeholder="What do you hope to achieve with this sponsorship?"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Previous Sponsorship Experience</label>
                    <Textarea
                      value={formData.previousExperience}
                      onChange={(e) => handleInputChange('previousExperience', e.target.value)}
                      placeholder="Tell us about any previous sponsorships or partnerships"
                      rows={3}
                    />
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Star className="mr-2 text-primary" size={20} />
                      Final Details
                    </h3>

                    <div>
                      <label className="block text-sm font-medium mb-2">Additional Information</label>
                      <Textarea
                        value={formData.additionalInfo}
                        onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                        placeholder="Anything else you'd like us to know about your brand or campaign?"
                        rows={4}
                      />
                    </div>
                  </div>

                  {/* Current Waitlist Status */}
                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-primary">Current Waitlist Status</h4>
                        <p className="text-sm text-muted-foreground">
                          You'll be position #{getCurrentWaitlistPosition()} in our sponsor queue
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">#{getCurrentWaitlistPosition()}</div>
                        <div className="text-xs text-muted-foreground">in queue</div>
                      </div>
                    </div>
                  </Card>

                  {/* What happens next */}
                  <div className="bg-muted/30 p-4 rounded-xl">
                    <h4 className="font-semibold mb-3">What happens next?</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>We'll review your application within 48 hours</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>You'll receive an email with next steps</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Priority placement based on budget and campaign quality</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border bg-muted/20">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={step === 1}
              >
                Previous
              </Button>
              
              {step < totalSteps ? (
                <Button onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-primary">
                  Submit Application
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SponsorApplicationModal;
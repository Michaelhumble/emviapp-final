import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, MessageCircle, Heart, Users, X } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTryAI: () => void;
}

const OnboardingModal = ({ isOpen, onClose, onTryAI }: OnboardingModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { user } = useAuth();

  const steps = [
    {
      title: "Welcome to EmviApp Community! 🎉",
      subtitle: "Connect with beauty professionals worldwide",
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <p className="text-gray-600">
              Join thousands of artists sharing tips, inspiration, and growing their skills together.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium">Share & Learn</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <p className="text-sm font-medium">Get Inspired</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-sm font-medium">Build Network</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Meet Your AI Beauty Expert 🤖✨",
      subtitle: "Get instant advice, tips, and solutions",
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <p className="text-gray-600 mb-4">
              Type <Badge variant="secondary" className="bg-purple-100 text-purple-700">@AI</Badge> in any post to get expert beauty advice instantly!
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600 mb-1">Try asking:</p>
              <div className="space-y-2">
                <div className="bg-white rounded p-2 text-sm">
                  "What's the best nail shape for short fingers? @AI"
                </div>
                <div className="bg-white rounded p-2 text-sm">
                  "How to make my lipstick last longer? @AI"
                </div>
                <div className="bg-white rounded p-2 text-sm">
                  "Best techniques for volume lashes? @AI"
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Ready to Get Started? 🚀",
      subtitle: "Try your first AI question now!",
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowRight className="h-8 w-8 text-white" />
            </div>
            <p className="text-gray-600 mb-4">
              Let's try it together! Click below to ask the AI your first question and share the answer with the community.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
            <p className="text-sm font-medium text-purple-800 mb-2">💡 Pro Tip:</p>
            <p className="text-sm text-purple-700">
              AI answers are perfect for sharing! The community loves seeing expert advice and solutions.
            </p>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTryAI = () => {
    onTryAI();
    onClose();
    toast.success("Great! Now type @AI in your post to get expert advice!");
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-md mx-4 p-0">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 z-10 h-8 w-8"
            onClick={handleSkip}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="p-6">
            <DialogHeader className="text-center mb-6">
              <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {steps[currentStep].title}
              </DialogTitle>
              <p className="text-gray-600 text-sm">
                {steps[currentStep].subtitle}
              </p>
            </DialogHeader>

            <div className="mb-6">
              {steps[currentStep].content}
            </div>

            {/* Progress indicator */}
            <div className="flex justify-center mb-6">
              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentStep 
                        ? 'bg-purple-500' 
                        : index < currentStep 
                          ? 'bg-purple-300' 
                          : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center">
              <Button 
                variant="ghost" 
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="text-gray-500"
              >
                Previous
              </Button>
              
              <span className="text-sm text-gray-500">
                {currentStep + 1} of {steps.length}
              </span>
              
              {currentStep < steps.length - 1 ? (
                <Button 
                  onClick={handleNext}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Next <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button 
                  onClick={handleTryAI}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  Try AI Now! <Sparkles className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
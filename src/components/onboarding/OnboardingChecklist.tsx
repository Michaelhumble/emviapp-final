import React from 'react';
import { useOnboarding } from '@/context/OnboardingContext';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OnboardingChecklist: React.FC = () => {
  const { 
    steps, 
    progress, 
    completeStep, 
    showOnboarding, 
    dismissOnboarding 
  } = useOnboarding();
  
  const navigate = useNavigate();

  if (!showOnboarding) return null;

  const handleStepClick = (step: any) => {
    if (step.route) {
      navigate(step.route);
    }
    if (step.id === 'welcome') {
      completeStep('welcome');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mb-6 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Getting Started
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={dismissOnboarding}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                step.completed 
                  ? 'bg-green-50 hover:bg-green-100' 
                  : 'bg-background hover:bg-muted'
              }`}
              onClick={() => handleStepClick(step)}
            >
              <div className="flex-shrink-0 mt-0.5">
                {step.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${
                  step.completed ? 'text-green-700' : 'text-foreground'
                }`}>
                  {step.title}
                </p>
                <p className={`text-xs mt-1 ${
                  step.completed ? 'text-green-600' : 'text-muted-foreground'
                }`}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-primary/10 rounded-lg">
          <p className="text-xs text-primary font-medium">
            💡 Complete these steps to unlock the full EmviApp experience and connect with the beauty community!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OnboardingChecklist;
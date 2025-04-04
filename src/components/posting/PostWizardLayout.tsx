
import { ReactNode } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

interface PostWizardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showExpirationInfo?: boolean;
  // Add these props to match JobPost.tsx usage
  currentStep?: number;
  totalSteps?: number;
  onNext?: () => void;
  onPrev?: () => void;
  onSubmit?: () => Promise<void>;
}

const PostWizardLayout = ({ 
  children, 
  title, 
  subtitle,
  showExpirationInfo = false,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onSubmit
}: PostWizardLayoutProps) => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-600">{subtitle}</p>
          )}
          {showExpirationInfo && (
            <div className="mt-3 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full inline-block">
              All posts are active for 30 days and can be renewed
            </div>
          )}
          
          {/* Add step indicator if steps are provided */}
          {currentStep && totalSteps && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Step {currentStep} of {totalSteps}
              </p>
              <div className="w-full bg-gray-200 h-1 mt-2 rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-white bg-opacity-80 backdrop-blur-sm shadow-md rounded-lg p-6 md:p-8">
          {children}
          
          {/* Add navigation buttons if steps are provided */}
          {(onNext || onPrev || onSubmit) && (
            <div className="flex justify-between mt-8 pt-4 border-t">
              {onPrev && (
                <Button 
                  variant="outline" 
                  onClick={onPrev}
                >
                  Back
                </Button>
              )}
              <div className="ml-auto">
                {currentStep === totalSteps && onSubmit ? (
                  <Button onClick={onSubmit}>Submit</Button>
                ) : onNext ? (
                  <Button onClick={onNext}>Next</Button>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PostWizardLayout;


import { EnhancedSignUpForm } from "@/components/auth/EnhancedSignUpForm";
import Logo from "@/components/ui/Logo";
import { useState } from "react";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { Separator } from "@/components/ui/separator";
import { PhoneOtpDialog } from "@/components/auth/PhoneOtpDialog";
import { parseSignupParams } from "@/lib/seo/utm";
import { US_BEAUTY_ROLES } from "../../../data/roles.us";
import { US_CITIES } from "../../../data/cities.us";
import { MainContent } from "@/components/layout/MainContent";
import { AriaLiveRegion } from "@/components/seo/AccessibilityHelpers";
import Testimonials from "@/components/trust/Testimonials";

const SignUpNew = () => {
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  
  // Parse signup context from URL params
  const signupContext = parseSignupParams();
  const role = signupContext.role ? US_BEAUTY_ROLES.find(r => r.slug === signupContext.role) : null;
  const city = signupContext.city ? US_CITIES.find(c => c.slug === signupContext.city) : null;
  
  return (
    <div style={{ backgroundColor: '#FFF3E0' }} className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-indigo-50/50 to-white motion-reduce:bg-white">
      <MainContent className="w-full max-w-md">
        <header className="flex justify-center mb-6">
          <Logo size="large" showText={true} />
        </header>

        <h1 className="sr-only">Create your EmviApp account</h1>
        
        {role && city && (
          <div className="text-center mb-4" role="status" aria-live="polite">
            <p className="text-sm text-neutral-600">
              Signing up as <span className="font-medium">{role.label}</span> in <span className="font-medium">{city.city}, {city.state}</span>
            </p>
          </div>
        )}
        
        <SocialAuthButtons mode="signup" onPhoneClick={() => setPhoneDialogOpen(true)} />
        <Separator className="my-4" />
        <PhoneOtpDialog open={phoneDialogOpen} onOpenChange={setPhoneDialogOpen} />
        <EnhancedSignUpForm />
        
        {/* Add testimonials after the form */}
        <Testimonials placement="signup" />

        {statusMessage && (
          <AriaLiveRegion message={statusMessage} priority="polite" />
        )}
      </MainContent>
    </div>
  );
};

export default SignUpNew;

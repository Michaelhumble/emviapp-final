
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoleSignUp } from '@/hooks/useRoleSignUp';
import SignUpForm from '@/components/auth/SignUpForm';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { navigateToRoleDashboard } from '@/utils/navigation';
import { UserRole } from '@/context/auth/types';
import RoleSelectionCards from '@/components/auth/RoleSelectionCards';
import { Button } from '@/components/ui/button';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isSubmitting,
    error,
    referrer,
    handleSubmit
  } = useRoleSignUp();

  const handleRoleSelection = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleNext = () => {
    if (step === 1) {
      // Validate email, name, passwords match before proceeding
      if (!email || !password || !confirmPassword) {
        toast.error("Please fill in all required fields");
        return;
      }
      
      if (password !== confirmPassword) {
        toast.error("Passwords don't match");
        return;
      }
      
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }
      
      setStep(2);
    } else if (step === 2) {
      // Role selection complete, proceed to submit
      handleCompleteSignUp();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleCompleteSignUp = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: selectedRole,
            user_type: selectedRole,
            phone: phoneNumber || undefined,
            ...(referrer ? { referred_by_referral_code: referrer } : {})
          },
        },
      });
      
      if (signUpError) {
        toast.error(signUpError.message || "Failed to sign up");
        return;
      }
      
      if (!data.user) {
        throw new Error("User creation failed");
      }

      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          role: selectedRole,
          phone: phoneNumber || null
        })
        .eq('id', data.user.id);

      if (updateError) {
        console.error("Error updating user role:", updateError);
      }

      localStorage.setItem('emviapp_user_role', selectedRole);
      
      toast.success("Account created successfully! Redirecting to dashboard...");
      
      // Use a slight delay to show the success message before redirecting
      setTimeout(() => {
        navigateToRoleDashboard(navigate, selectedRole);
      }, 1500);
      
    } catch (err: any) {
      toast.error(err.message || "Failed to sign up. Please try again.");
      console.error("Sign up error:", err);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-purple-50/30">
        <div className="w-full max-w-md">
          {step === 1 && (
            <SignUpForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              isSubmitting={isSubmitting}
              referralCode={referrer}
              handleSubmit={(e) => {
                e.preventDefault();
                handleNext();
              }}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
          )}
          
          {step === 2 && (
            <Card className="border-0 shadow-xl bg-gradient-to-b from-white to-indigo-50/30 rounded-2xl overflow-hidden p-6">
              <h2 className="text-2xl font-bold text-center font-serif text-indigo-900 mb-4">
                How will you use EmviApp?
              </h2>
              <p className="text-center text-indigo-700/70 mb-6">
                Select your role to personalize your experience
              </p>
              
              <RoleSelectionCards 
                selectedRole={selectedRole} 
                onChange={handleRoleSelection} 
              />
              
              <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="px-4"
                >
                  Back
                </Button>
                
                <Button
                  onClick={handleCompleteSignUp}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                >
                  {isSubmitting ? "Creating Account..." : "Complete Sign Up"}
                </Button>
              </div>
              
              <div className="text-sm text-center text-gray-500 mt-6">
                Already have an account?{" "}
                <Link to="/auth/signin" className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition-colors">
                  Sign in
                </Link>
              </div>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;

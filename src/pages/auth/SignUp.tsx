
import Layout from "@/components/layout/Layout";
import SignUpForm from "@/components/auth/SignUpForm";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";
import { useSignUp } from "@/hooks/useSignUp";

const SignUp = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isSubmitting,
    referralCode,
    showRoleModal,
    handleSubmit,
    handleRoleModalClose,
    user
  } = useSignUp();

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[80vh] p-4 bg-background">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <p className="text-indigo-600 font-medium text-lg">
              ✨ You're just one step away from your dream profile ✨
            </p>
          </div>
          
          <SignUpForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            isSubmitting={isSubmitting}
            referralCode={referralCode}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>

      {/* Role Selection Modal - shown right after signup */}
      {user && showRoleModal && (
        <RoleSelectionModal
          open={showRoleModal}
          onOpenChange={handleRoleModalClose}
          userId={user.id}
        />
      )}
    </Layout>
  );
};

export default SignUp;

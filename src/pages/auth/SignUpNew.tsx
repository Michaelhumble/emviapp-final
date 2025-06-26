
import { EnhancedSignUpForm } from "@/components/auth/EnhancedSignUpForm";
import Logo from "@/components/ui/Logo";

const SignUpNew = () => {
  return (
    <div style={{ backgroundColor: '#FF35FF', padding: '10px', border: '3px solid #FF00FF' }}>
      <div style={{ 
        backgroundColor: '#3535FF', 
        color: 'white', 
        padding: '8px', 
        marginBottom: '10px', 
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: '4px'
      }}>
        🟪 ACTIVE SIGNUP PAGE: src/pages/auth/SignUpNew.tsx
      </div>
      <div style={{ backgroundColor: '#FFF3E0' }} className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-indigo-50/50 to-white">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6">
            <Logo size="large" showText={true} />
          </div>
          <EnhancedSignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUpNew;

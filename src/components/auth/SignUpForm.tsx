
import { EnhancedSignUpForm } from "@/components/auth/EnhancedSignUpForm";

const SignUpForm = () => {
  return (
    <div style={{ backgroundColor: '#FFE135', padding: '10px', border: '3px solid #FFD700' }}>
      <div style={{ 
        backgroundColor: '#FF6B35', 
        color: 'white', 
        padding: '8px', 
        marginBottom: '10px', 
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: '4px'
      }}>
        🟨 ACTIVE SIGNUP COMPONENT: src/components/auth/SignUpForm.tsx
      </div>
      <EnhancedSignUpForm />
    </div>
  );
};

export default SignUpForm;

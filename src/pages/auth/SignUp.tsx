
import { EnhancedSignUpForm } from "@/components/auth/EnhancedSignUpForm";

const SignUp = () => {
  return (
    <div style={{ backgroundColor: '#35FF6B', padding: '10px', border: '3px solid #00FF41' }}>
      <div style={{ 
        backgroundColor: '#FF3535', 
        color: 'white', 
        padding: '8px', 
        marginBottom: '10px', 
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: '4px'
      }}>
        🟩 ACTIVE SIGNUP PAGE: src/pages/auth/SignUp.tsx
      </div>
      <EnhancedSignUpForm />
    </div>
  );
};

export default SignUp;

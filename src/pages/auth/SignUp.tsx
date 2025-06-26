
import { EnhancedSignUpForm } from "@/components/auth/EnhancedSignUpForm";

const SignUp = () => {
  return (
    <div style={{ backgroundColor: '#FFEB3B', padding: '10px' }}>
      <div style={{ 
        textAlign: 'center', 
        fontWeight: 'bold', 
        fontSize: '18px', 
        color: '#000', 
        marginBottom: '10px',
        backgroundColor: '#FFEB3B',
        padding: '5px'
      }}>
        🟡 ACTIVE BASIC SIGNUP COMPONENT 🟡
      </div>
      <EnhancedSignUpForm />
    </div>
  );
};

export default SignUp;

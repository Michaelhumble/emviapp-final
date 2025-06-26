
import React from "react";
import { EnhancedSignUpForm } from "@/components/auth/EnhancedSignUpForm";

const TestEnhancedSignUp = () => {
  return (
    <div style={{ backgroundColor: '#35FFFF', padding: '10px', border: '3px solid #00FFFF' }}>
      <div style={{ 
        backgroundColor: '#FF8C35', 
        color: 'white', 
        padding: '8px', 
        marginBottom: '10px', 
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: '4px'
      }}>
        🟦 ACTIVE TEST SIGNUP PAGE: src/pages/TestEnhancedSignUp.tsx
      </div>
      <EnhancedSignUpForm />
    </div>
  );
};

export default TestEnhancedSignUp;

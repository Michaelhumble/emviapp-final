
import React from 'react';
import Logo from "@/components/ui/Logo";

const SignIn = () => {
  return (
    <div style={{ backgroundColor: '#FFF3E0' }} className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-indigo-50/50 to-white">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo size="large" showText={true} />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
          <p className="text-center text-gray-600">Sign in form will be implemented here</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

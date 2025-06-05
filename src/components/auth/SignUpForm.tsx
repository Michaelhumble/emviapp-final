
import React from 'react';
import { Card } from "@/components/ui/card";

interface SignUpFormProps {
  redirectUrl?: string | null;
}

const SignUpForm = ({ redirectUrl }: SignUpFormProps) => {
  return (
    <Card className="p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <p className="text-gray-600">SignUpForm component - Replace with actual implementation</p>
        {redirectUrl && (
          <p className="text-sm text-gray-500 mt-2">Redirect URL: {redirectUrl}</p>
        )}
      </div>
    </Card>
  );
};

export default SignUpForm;

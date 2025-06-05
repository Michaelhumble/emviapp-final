
import React from 'react';
import { useAuth } from "@/context/auth/useAuth";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";

const ChooseRole = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in first</h1>
          <p>You need to be signed in to choose your role.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <RoleSelectionModal
        open={true}
        onOpenChange={() => {}}
        userId={user.id}
      />
    </div>
  );
};

export default ChooseRole;

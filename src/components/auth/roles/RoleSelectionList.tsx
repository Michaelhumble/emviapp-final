
import React from 'react';

interface RoleSelectionListProps {
  selectedRole: string | null;
  onRoleSelect: (role: string) => void;
}

const RoleSelectionList = ({ selectedRole, onRoleSelect }: RoleSelectionListProps) => {
  return <div>RoleSelectionList</div>;
};

export default RoleSelectionList;

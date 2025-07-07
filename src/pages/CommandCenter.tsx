import React from 'react';
import CommandCenterLayout from '@/components/command-center/CommandCenterLayout';
import UserManagement from '@/components/command-center/UserManagement';
import JobManagement from '@/components/command-center/JobManagement';
import SalonManagement from '@/components/command-center/SalonManagement';

const CommandCenter = () => {
  return (
    <CommandCenterLayout>
      <UserManagement />
      <JobManagement />
      <SalonManagement />
    </CommandCenterLayout>
  );
};

export default CommandCenter;

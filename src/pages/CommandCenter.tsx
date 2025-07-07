
import React from 'react';
import CommandCenterLayout from '@/components/command-center/CommandCenterLayout';
// import UserManagement from '@/components/command-center/UserManagement';
// import JobManagement from '@/components/command-center/JobManagement';
// import SalonManagement from '@/components/command-center/SalonManagement';

const CommandCenter = () => {
  return (
    <CommandCenterLayout>
      <div className="p-8 text-center text-gray-600">
        <h2 className="text-xl font-semibold mb-4">Command Center</h2>
        <p>Admin components temporarily disabled for build stability.</p>
        {/* 
        <UserManagement />
        <JobManagement />
        <SalonManagement />
        */}
      </div>
    </CommandCenterLayout>
  );
};

export default CommandCenter;

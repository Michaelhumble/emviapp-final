
import React from 'react';
import { useAuth } from "@/context/auth/useAuth";
import Layout from '@/components/layout/Layout';

const ProfileEdit = () => {
  const { user, userRole } = useAuth();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="text-gray-900">{user?.email}</div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <div className="text-gray-900 capitalize">{userRole || 'Not set'}</div>
            </div>
            
            <div className="text-center text-gray-500 mt-8">
              Profile editing functionality coming soon...
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileEdit;

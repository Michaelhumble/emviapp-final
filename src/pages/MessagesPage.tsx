
import React from 'react';
import { useAuth } from "@/context/auth/useAuth";
import Layout from '@/components/layout/Layout';

export const MessagesPage = () => {
  const { user, userRole } = useAuth();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Messages</h1>
          
          <div className="bg-white rounded-lg shadow p-8">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Welcome, {user?.email}
              </p>
              <p className="text-gray-600 mb-4">
                Role: <span className="capitalize">{userRole || 'Not set'}</span>
              </p>
              <p className="text-gray-500">Messages functionality coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

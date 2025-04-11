
import React from 'react';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import DashboardContent from '@/components/dashboard/DashboardContent';
import Layout from '@/components/layout/Layout';

const Dashboard = () => {
  const { userRole, isSignedIn } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is signed in and has a role, redirect to their specific dashboard
    if (isSignedIn && userRole) {
      switch(userRole) {
        case 'artist':
        case 'nail technician/artist':
          navigate('/dashboard/artist');
          break;
        case 'salon':
        case 'owner':
          navigate('/dashboard/salon');
          break;
        case 'customer':
          navigate('/dashboard/customer');
          break;
        case 'freelancer':
          navigate('/dashboard/freelancer');
          break;
        case 'supplier':
        case 'beauty supplier':
        case 'vendor':
          navigate('/dashboard/supplier');
          break;
        default:
          navigate('/dashboard/other');
      }
    }
  }, [isSignedIn, userRole, navigate]);
  
  return (
    <Layout>
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <DashboardContent />
      </div>
    </Layout>
  );
};

export default Dashboard;

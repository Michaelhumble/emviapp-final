
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import DashboardRedirector from '@/components/dashboard/DashboardRedirector';

const Dashboard = () => {
  return (
    <Layout>
      <Helmet>
        <title>Dashboard | EmviApp</title>
        <meta name="description" content="Your EmviApp dashboard" />
      </Helmet>
      
      <DashboardRedirector />
    </Layout>
  );
};

export default Dashboard;

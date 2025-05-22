
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import Layout from '@/components/layout/Layout';

const SalonSetup = () => {
  // Using the proper toast implementation
  const handleSubmit = () => {
    toast.success("Salon created successfully", {
      description: "Your salon profile has been set up."
    });
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Salon Setup</h1>
        <p className="mb-4">
          This page allows salon owners to set up their salon profile.
        </p>
        <button 
          onClick={handleSubmit}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          Set up salon
        </button>
      </div>
    </Layout>
  );
};

export default SalonSetup;

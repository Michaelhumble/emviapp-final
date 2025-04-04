
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Salons = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
              Salon Directory
            </h1>
            <p className="text-gray-600 mb-6">
              Find the perfect salon near you or list your own salon for potential clients and staff to discover.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="overflow-hidden transition-all hover:shadow-lg border border-gray-100">
              <CardContent className="p-0">
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    Salon Image
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-1">Bella Nails & Spa</h3>
                  <p className="text-sm text-gray-500 mb-2">Portland, OR</p>
                  <p className="text-sm text-gray-600 mb-4">Luxury nail salon offering premium services in a relaxing environment.</p>
                  <Button size="sm" variant="outline" className="w-full">View Details</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden transition-all hover:shadow-lg border border-gray-100">
              <CardContent className="p-0">
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    Salon Image
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-1">Glam Studio</h3>
                  <p className="text-sm text-gray-500 mb-2">Miami, FL</p>
                  <p className="text-sm text-gray-600 mb-4">Full-service beauty salon specializing in hair, nails, and makeup.</p>
                  <Button size="sm" variant="outline" className="w-full">View Details</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden transition-all hover:shadow-lg border border-gray-100">
              <CardContent className="p-0">
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    Salon Image
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-1">Elite Beauty Bar</h3>
                  <p className="text-sm text-gray-500 mb-2">Chicago, IL</p>
                  <p className="text-sm text-gray-600 mb-4">Upscale salon offering premium beauty services for discerning clients.</p>
                  <Button size="sm" variant="outline" className="w-full">View Details</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <Link to="/salons/list">
              <Button>List Your Salon</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Salons;

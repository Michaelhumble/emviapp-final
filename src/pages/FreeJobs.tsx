
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FreeJobPostingForm from '@/components/jobs/FreeJobPostingForm';
import JobListings from '@/components/jobs/JobListings';
import { Plus, Briefcase } from 'lucide-react';

const FreeJobs = () => {
  const [activeTab, setActiveTab] = useState('listings');

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8 px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Beauty Industry Jobs
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Find your next opportunity or post a job for free
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="listings" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  View Jobs
                </TabsTrigger>
                <TabsTrigger value="post" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Post a Job
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="listings">
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Available Positions</h2>
                  <Button 
                    onClick={() => setActiveTab('post')}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Post a Job
                  </Button>
                </div>
                <JobListings />
              </div>
            </TabsContent>

            <TabsContent value="post">
              <FreeJobPostingForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default FreeJobs;

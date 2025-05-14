
import React from 'react';
import { Layout } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const JobPost = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Post a Job</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Create a New Job Listing</CardTitle>
              <CardDescription>
                Fill out the form below to post your job. Your listing will be visible to qualified candidates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-12 text-muted-foreground">
                Job posting form is currently under development.
                <br />
                Check back soon to create your job listing!
              </p>
              
              <div className="flex justify-center">
                <Button>Coming Soon</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default JobPost;

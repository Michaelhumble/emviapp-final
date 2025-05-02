import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Plus, Briefcase } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { GradientBackground } from '@/components/ui/gradient-background';
import jobsData from '@/data/jobsData';
import ListingsGrid from '@/components/listings/ListingsGrid';
import { Job } from '@/types/job';

// Job categories
const JOB_CATEGORIES = {
  ALL: "all",
  NAIL: "nail",
  HAIR: "hair",
  LASH: "lash",
  TATTOO: "tattoo",
  MASSAGE: "massage"
};

// Preset locations
const LOCATIONS = ["All Locations", "California", "Texas", "Florida", "New York", "Washington", "Illinois"];

const JobsPage = () => {
  const [activeTab, setActiveTab] = useState<string>(JOB_CATEGORIES.ALL);
  const [locationFilter, setLocationFilter] = useState<string>("All Locations");
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Initialize jobs
  useEffect(() => {
    // Process jobs data to ensure all required fields
    const processedJobs = jobsData.map(job => {
      // Ensure job has proper image and type fields
      return {
        ...job,
        type: 'job',
        // Other necessary transformations if needed
      } as Job;
    });
    
    setAllJobs(processedJobs);
    setFilteredJobs(processedJobs);
    
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, []);
  
  // Filter jobs when tab or location filter changes
  useEffect(() => {
    let filtered = [...allJobs];
    
    // Filter by category
    if (activeTab !== JOB_CATEGORIES.ALL) {
      filtered = filtered.filter(job => {
        const jobTitle = (job.title || '').toLowerCase();
        const jobDesc = (job.description || '').toLowerCase();
        const jobRole = (job.role || '').toLowerCase();
        
        switch (activeTab) {
          case JOB_CATEGORIES.NAIL:
            return jobTitle.includes('nail') || 
                  jobDesc.includes('nail') || 
                  jobRole.includes('nail') ||
                  jobTitle.includes('manicure') || 
                  jobDesc.includes('manicure') ||
                  jobTitle.includes('pedicure') || 
                  jobDesc.includes('pedicure');
          case JOB_CATEGORIES.HAIR:
            return jobTitle.includes('hair') || 
                  jobDesc.includes('hair') || 
                  jobRole.includes('hair') ||
                  jobTitle.includes('stylist') || 
                  jobDesc.includes('stylist');
          case JOB_CATEGORIES.LASH:
            return jobTitle.includes('lash') || 
                  jobDesc.includes('lash') || 
                  jobRole.includes('lash') ||
                  jobTitle.includes('brow') || 
                  jobDesc.includes('brow') ||
                  jobTitle.includes('eyebrow') || 
                  jobDesc.includes('eyebrow');
          case JOB_CATEGORIES.TATTOO:
            return jobTitle.includes('tattoo') || 
                  jobDesc.includes('tattoo') || 
                  jobRole.includes('tattoo') ||
                  jobTitle.includes('artist') || 
                  jobDesc.includes('artist');
          case JOB_CATEGORIES.MASSAGE:
            return jobTitle.includes('massage') || 
                  jobDesc.includes('massage') || 
                  jobRole.includes('massage') ||
                  jobTitle.includes('spa') || 
                  jobDesc.includes('spa') ||
                  jobTitle.includes('facial') || 
                  jobDesc.includes('facial') ||
                  jobTitle.includes('skincare') || 
                  jobDesc.includes('skincare');
          default:
            return true;
        }
      });
    }
    
    // Filter by location
    if (locationFilter !== "All Locations") {
      filtered = filtered.filter(job => {
        return job.location && job.location.includes(locationFilter);
      });
    }
    
    setFilteredJobs(filtered);
  }, [activeTab, locationFilter, allJobs]);

  return (
    <Layout>
      <Helmet>
        <title>Beauty Industry Jobs | EmviApp</title>
        <meta 
          name="description"
          content="Find your dream job in the beauty industry. Browse opportunities for nail technicians, hair stylists, estheticians, and more."
        />
      </Helmet>
      
      {/* Hero section */}
      <div className="bg-gradient-to-b from-purple-50 to-white pt-12 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-5">
              <div className="inline-flex items-center px-4 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium">
                <Briefcase className="w-4 h-4 mr-1" />
                Opportunities for beauty professionals
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6">
              Find Your Dream Job in the Beauty Industry
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 mx-auto max-w-2xl">
              Connect with top salons and businesses looking for talented professionals like you. Exclusive opportunities with competitive pay and benefits.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/post-job">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
                >
                  <Plus className="w-5 h-5 mr-1" /> Post a Job
                </Button>
              </Link>
              <Link to="#job-listings">
                <Button 
                  size="lg" 
                  variant="outline"
                >
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-12" id="job-listings">
        <div className="max-w-7xl mx-auto">
          {/* Filters section */}
          <GradientBackground variant="default" className="p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <h2 className="text-lg font-medium">Filter Jobs</h2>
              
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {LOCATIONS.map(location => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <Button variant="outline" onClick={() => {
                setLocationFilter("All Locations");
                setActiveTab(JOB_CATEGORIES.ALL);
              }}>
                Reset Filters
              </Button>
            </div>
          </GradientBackground>
          
          {/* Tabs for job categories */}
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2">
              <TabsTrigger value={JOB_CATEGORIES.ALL}>All Jobs</TabsTrigger>
              <TabsTrigger value={JOB_CATEGORIES.NAIL}>Nail Tech</TabsTrigger>
              <TabsTrigger value={JOB_CATEGORIES.HAIR}>Hair Stylist</TabsTrigger>
              <TabsTrigger value={JOB_CATEGORIES.LASH}>Lash & Brow</TabsTrigger>
              <TabsTrigger value={JOB_CATEGORIES.TATTOO}>Tattoo Artist</TabsTrigger>
              <TabsTrigger value={JOB_CATEGORIES.MASSAGE}>Massage & Spa</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-6">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="h-[400px] bg-gray-100 animate-pulse rounded-lg"></div>
                  ))}
                </div>
              ) : (
                <ListingsGrid 
                  listings={filteredJobs} 
                  emptyMessage={`No ${activeTab !== JOB_CATEGORIES.ALL ? activeTab : ''} jobs found for the current filters.`}
                />
              )}
            </TabsContent>
          </Tabs>
          
          {/* Call to action */}
          <div className="mt-16 text-center">
            <h2 className="font-playfair text-2xl font-semibold mb-4">
              Looking to hire beauty professionals?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Post a job on EmviApp to reach thousands of talented beauty professionals in your area.
            </p>
            <Link to="/post-job">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800">
                <Plus className="w-4 h-4 mr-1" /> Post a Job
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobsPage;

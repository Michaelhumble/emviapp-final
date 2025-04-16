
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, Calendar, DollarSign, Clock, Home, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { Job } from '@/types/job';
import { getAllJobs } from '@/utils/featuredContent';

// Define job type filters
const JOB_TYPES = ["All Types", "Full-time", "Part-time", "Commission", "Booth Rental"];

// Define job category filters
const JOB_CATEGORIES = [
  "All Categories", 
  "Nail Technician", 
  "Hair Stylist", 
  "Esthetician", 
  "Barber",
  "Salon Manager",
  "Receptionist"
];

const JobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchJobs = () => {
      try {
        // Use our premium jobs data
        const premiumJobs = getAllJobs();
        setJobs(premiumJobs);
        setFilteredJobs(premiumJobs);
        setLoading(false);
      } catch (error) {
        console.error("Error loading jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on selected filters and search term
  useEffect(() => {
    let result = jobs;

    // Filter by job type
    if (selectedType !== "All Types") {
      result = result.filter(job => 
        job.employment_type?.toLowerCase() === selectedType.toLowerCase()
      );
    }

    // Filter by job category
    if (selectedCategory !== "All Categories") {
      result = result.filter(job => 
        job.title?.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(job => 
        job.title?.toLowerCase().includes(term) ||
        job.company?.toLowerCase().includes(term) ||
        job.location?.toLowerCase().includes(term) ||
        job.description?.toLowerCase().includes(term)
      );
    }

    setFilteredJobs(result);
  }, [jobs, selectedType, selectedCategory, searchTerm]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedType("All Types");
    setSelectedCategory("All Categories");
    setSearchTerm("");
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Beauty Industry Jobs</h1>
          <p className="text-muted-foreground mt-2">
            Find your next opportunity in the beauty industry
          </p>
        </div>

        {/* Search and filters */}
        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search jobs by title, location, or salon..."
                className="w-full p-2 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="px-3 py-2 border rounded-md bg-white"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {JOB_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <select
                className="px-3 py-2 border rounded-md bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {JOB_CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <Button variant="outline" onClick={resetFilters}>Reset</Button>
            </div>
          </div>
        </div>

        {/* Job listings */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
            ))}
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <Card key={job.id} className="overflow-hidden h-full flex flex-col">
                <div className="aspect-video w-full overflow-hidden">
                  <ImageWithFallback
                    src={job.image}
                    alt={job.title || "Job Opening"}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    businessName={job.company || "Beauty Job"}
                    fallbackImage="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&auto=format&fit=crop&q=80"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    {job.boosted_until && new Date(job.boosted_until) > new Date() && (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        <Sparkles className="h-3 w-3 mr-1" /> Featured
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="flex flex-col gap-1 mt-1">
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {job.company}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary" className="font-normal">
                      {job.employment_type || "Job"}
                    </Badge>
                    {job.weekly_pay && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-normal">
                        Weekly Pay
                      </Badge>
                    )}
                    {job.has_housing && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-normal">
                        <Home className="h-3 w-3 mr-1" /> Housing
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center text-sm font-medium text-gray-800 mb-3">
                    <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                    {job.compensation_details || "Competitive Pay"}
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {job.description?.split('\n')[0] || "Exciting opportunity in the beauty industry."}
                  </p>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="w-full flex justify-between items-center">
                    <span className="text-xs text-gray-500 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Posted {new Date(job.created_at).toLocaleDateString()}
                    </span>
                    <Link to={`/jobs/${job.id}`}>
                      <Button variant="outline" size="sm">View Details</Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center p-10 bg-gray-50 rounded-lg">
            <p className="text-xl font-medium mb-2">No jobs match your criteria</p>
            <p className="text-gray-500 mb-4">Try adjusting your filters or search term</p>
            <Button onClick={resetFilters}>Reset Filters</Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default JobsPage;

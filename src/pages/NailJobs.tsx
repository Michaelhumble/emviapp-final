import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, DollarSign, Clock, Building, Briefcase, Star, MessageSquare, Heart, TrendingUp, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const NailJobs = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    weeklyPay: false,
    ownerWillTrain: false,
    employmentType: "all", // 'all', 'fullTime', 'partTime'
    sortBy: "created_at", // 'created_at', 'compensation_details', 'location'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch jobs from database
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('category', 'nails')
          .eq('status', 'active')
          .eq('pricing_tier', 'premium') // Only show paid/premium jobs
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching jobs:', error);
          return;
        }

        setJobs(data || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);
  
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };
  
  const filteredJobs = jobs.filter(job => {
    // Add your filter logic here based on job properties
    return true; // For now, show all jobs
  }).sort((a, b) => {
    if (filters.sortBy === "created_at") {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    return 0;
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const openJobDetails = (job) => {
    setSelectedJob(job);
  };

  const closeJobDetails = () => {
    setSelectedJob(null);
  };

  // Helper function to get contact information
  const getContactInfo = (job) => {
    if (job.metadata?.contact_info) {
      return job.metadata.contact_info;
    }
    if (job.contact_info) {
      return job.contact_info;
    }
    return null;
  };

  // Helper function to get job photos
  const getJobPhotos = (job) => {
    if (job.photos && job.photos.length > 0) {
      return job.photos;
    }
    if (job.image_urls && job.image_urls.length > 0) {
      return job.image_urls;
    }
    if (job.image_url) {
      return [job.image_url];
    }
    // Fallback image for nail jobs
    return ["https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop"];
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading nail jobs...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Tìm Việc Nail Lương Cao, Bao Lương Nếu Cần</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Hơn 800+ tiệm đang cần thợ — đăng ký miễn phí.
          </p>
        </motion.div>
        
        {/* AI Analysis Banner */}
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center">
            <div className="mr-4">
              <TrendingUp className="h-10 w-10 text-purple-600" />
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-serif mb-1">AI Job Analysis</h3>
              <p className="text-gray-700">Our AI has analyzed recent job trends: <span className="font-semibold">Nail technician jobs are up 15% this month</span> with average weekly pay increasing to $950-$1,200 in major cities.</p>
            </div>
            <Button className="whitespace-nowrap">View Full Report</Button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-serif mb-4">Tìm kiếm / Search Filters</h2>
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="weeklyPay" 
                checked={filters.weeklyPay} 
                onCheckedChange={(checked) => handleFilterChange("weeklyPay", checked)}
              />
              <label htmlFor="weeklyPay" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Weekly Pay
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="ownerWillTrain" 
                checked={filters.ownerWillTrain} 
                onCheckedChange={(checked) => handleFilterChange("ownerWillTrain", checked)}
              />
              <label htmlFor="ownerWillTrain" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Owner Will Train
              </label>
            </div>
            
            <div className="space-y-2">
              <div className="font-medium text-sm mb-2">Employment Type:</div>
              <RadioGroup 
                value={filters.employmentType} 
                onValueChange={(value) => handleFilterChange("employmentType", value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <label htmlFor="all" className="text-sm">All</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fullTime" id="fullTime" />
                  <label htmlFor="fullTime" className="text-sm">Full-time</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="partTime" id="partTime" />
                  <label htmlFor="partTime" className="text-sm">Part-time</label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="ml-auto">
              <div className="text-sm font-medium mb-2">Sort by:</div>
              <Select 
                value={filters.sortBy} 
                onValueChange={(value) => handleFilterChange("sortBy", value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="matchScore">AI Match Score</SelectItem>
                  <SelectItem value="salary">Salary</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Job Listings */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {currentItems.map((job) => {
            const photos = getJobPhotos(job);
            const contactInfo = getContactInfo(job);
            
            return (
              <motion.div key={job.id} variants={item}>
                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img 
                      src={photos[0]} 
                      alt={job.title} 
                      className="w-full h-full object-cover"
                    />
                    {job.pricing_tier === 'premium' && (
                      <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Premium Job
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 text-primary px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                      <Star className="h-3 w-3 mr-1 fill-yellow-400 stroke-yellow-400" />
                      <span>Premium</span>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="space-y-1">
                      <h3 className="text-xl font-serif font-semibold">{job.title}</h3>
                      {job.vietnamese_title && (
                        <p className="text-sm text-gray-600 italic">{job.vietnamese_title}</p>
                      )}
                    </div>
                    {contactInfo?.company_name && (
                      <p className="text-gray-700 font-medium">{contactInfo.company_name}</p>
                    )}
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" /> 
                      <span className="text-sm">{job.location || 'Location not specified'}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <DollarSign className="h-4 w-4 mr-1" /> 
                      <span className="text-sm">{job.compensation_details || 'Salary negotiable'}</span>
                    </div>
                    {contactInfo?.phone && (
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-4 w-4 mr-1" /> 
                        <span className="text-sm">{contactInfo.phone}</span>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="pt-2 flex flex-col gap-3">
                    <div className="flex items-center justify-between w-full">
                      <Button onClick={() => openJobDetails(job)}>
                        Xem Chi Tiết
                      </Button>
                      <Button variant="outline" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => setCurrentPage(index + 1)}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
        
        {/* Empty state */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No jobs match your filters</h3>
            <p className="text-gray-600">Try adjusting your filter criteria</p>
            <Button 
              className="mt-4" 
              onClick={() => setFilters({
                weeklyPay: false,
                ownerWillTrain: false,
                employmentType: "all",
                sortBy: "matchScore"
              })}
            >
              Reset Filters
            </Button>
          </div>
        )}
        
        {/* Job Details Modal - Premium Layout to Match Reference */}
        <Dialog open={!!selectedJob} onOpenChange={closeJobDetails}>
          {selectedJob && (
            <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader className="space-y-3">
                <DialogTitle className="text-2xl font-serif text-center">
                  {selectedJob.title}
                </DialogTitle>
                <div className="text-center">
                  {selectedJob.vietnamese_title && (
                    <p className="text-lg text-gray-600 italic">{selectedJob.vietnamese_title}</p>
                  )}
                  {getContactInfo(selectedJob)?.company_name && (
                    <p className="text-lg font-semibold text-gray-800">{getContactInfo(selectedJob).company_name}</p>
                  )}
                </div>
              </DialogHeader>
              
              {/* Photo Gallery at the Top */}
              <div className="w-full mb-6">
                <img 
                  src={getJobPhotos(selectedJob)[0]} 
                  alt={selectedJob.title} 
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>

              {/* Salary and Location in Colored Boxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-300 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <DollarSign className="h-6 w-6 text-green-600 mr-2" />
                    <h3 className="text-lg font-semibold text-green-800">Compensation</h3>
                  </div>
                  <p className="text-2xl font-bold text-green-700">{selectedJob.compensation_details || 'Negotiable'}</p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-300 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <MapPin className="h-6 w-6 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold text-blue-800">Location</h3>
                  </div>
                  <p className="text-2xl font-bold text-blue-700">{selectedJob.location || 'Not specified'}</p>
                </div>
              </div>

              {/* Contact Information Block - Enhanced Design */}
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-300 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-purple-600 mr-3" />
                  <h3 className="text-xl font-semibold text-purple-800">Contact Information</h3>
                </div>
                <div className="space-y-4 text-center">
                  {getContactInfo(selectedJob)?.phone && (
                    <div className="bg-white/70 rounded-lg p-4">
                      <div className="flex items-center justify-center mb-2">
                        <Phone className="h-5 w-5 text-purple-600 mr-2" />
                        <span className="text-sm font-medium text-purple-700">Phone Number</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-800">{getContactInfo(selectedJob).phone}</p>
                    </div>
                  )}
                  {getContactInfo(selectedJob)?.email && (
                    <div className="bg-white/70 rounded-lg p-4">
                      <div className="flex items-center justify-center mb-2">
                        <Building className="h-5 w-5 text-purple-600 mr-2" />
                        <span className="text-sm font-medium text-purple-700">Email</span>
                      </div>
                      <p className="text-xl font-semibold text-purple-800">{getContactInfo(selectedJob).email}</p>
                    </div>
                  )}
                  {getContactInfo(selectedJob)?.company_name && (
                    <div className="bg-white/70 rounded-lg p-4">
                      <div className="flex items-center justify-center mb-2">
                        <Building className="h-5 w-5 text-purple-600 mr-2" />
                        <span className="text-sm font-medium text-purple-700">Company</span>
                      </div>
                      <p className="text-xl font-semibold text-purple-800">{getContactInfo(selectedJob).company_name}</p>
                    </div>
                  )}
                  <div className="flex items-center justify-center bg-green-100 rounded-lg p-3">
                    <span className="text-green-600 mr-2 text-lg">✓</span>
                    <span className="text-green-800 font-semibold">Contact details available! Call now to apply.</span>
                  </div>
                </div>
              </div>

              {/* Job Description Section */}
              <div className="mb-6">
                <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
                  <FileText className="h-6 w-6 text-gray-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">Job Description</h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base">
                    {selectedJob.description || selectedJob.vietnamese_description || 'No description available'}
                  </p>
                </div>
              </div>

              {/* Additional Job Details in Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Clock className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-800">Premium Job Position</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Briefcase className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-800">{selectedJob.requirements || 'Requirements available'}</p>
                </div>
              </div>

              {/* Apply Now Button - Premium Style */}
              <div className="pt-4 border-t border-gray-200">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-4 text-xl font-semibold rounded-lg shadow-lg transform transition hover:scale-105">
                  Apply Now {getContactInfo(selectedJob)?.phone ? `- Call ${getContactInfo(selectedJob).phone}` : ''}
                </Button>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </Layout>
  );
};

export default NailJobs;

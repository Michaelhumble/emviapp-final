
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";
import { Heart, MapPin, Phone, Clock, DollarSign, Building, Briefcase } from "lucide-react";

// Mock data for jobs - would come from API in production
const jobListings = [
  {
    id: 1,
    title: "Senior Nail Technician",
    salon: "Glamour Nail & Spa",
    location: "New York, NY",
    salary: "$25-35/hr",
    description: "We're looking for an experienced nail technician to join our team. Must have at least 3 years of experience and a portfolio of work.",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371",
    isFullTime: true,
    hasWeeklyPay: true,
    providesTraining: false,
    phone: "(212) 555-1234",
    urgentLabel: "Weekly Pay",
  },
  {
    id: 2,
    title: "Hair Stylist",
    salon: "Chic Styles",
    location: "Los Angeles, CA",
    salary: "$30-40/hr + tips",
    description: "Looking for talented hair stylists to join our growing team. Great opportunity for both experienced stylists and those early in their career.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035",
    isFullTime: true,
    hasWeeklyPay: true,
    providesTraining: true,
    phone: "(310) 555-6789",
    urgentLabel: "Bao Luong Neu Can",
  },
  {
    id: 3,
    title: "Massage Therapist",
    salon: "Tranquility Spa",
    location: "Chicago, IL",
    salary: "$40-50/hr",
    description: "Seeking licensed massage therapists with a passion for wellness. Flexible scheduling and great benefits package included.",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35",
    isFullTime: false,
    hasWeeklyPay: false,
    providesTraining: true,
    phone: "(312) 555-2468",
    urgentLabel: "",
  },
  {
    id: 4,
    title: "Esthetician",
    salon: "Beauty & Beyond",
    location: "Miami, FL",
    salary: "$22-30/hr",
    description: "Join our team of beauty professionals. Looking for certified estheticians with skincare expertise. Training provided for the right candidate.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881",
    isFullTime: true,
    hasWeeklyPay: false,
    providesTraining: true,
    phone: "(305) 555-1357",
    urgentLabel: "Owner Will Train",
  },
  {
    id: 5,
    title: "Part-time Nail Artist",
    salon: "Polish Perfect",
    location: "Dallas, TX",
    salary: "$18-25/hr + commission",
    description: "Weekend positions available for nail artists. Great opportunity to build your clientele with our established salon.",
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b",
    isFullTime: false,
    hasWeeklyPay: true,
    providesTraining: false,
    phone: "(214) 555-7890",
    urgentLabel: "Weekly Pay",
  },
];

const Jobs = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [filters, setFilters] = useState({
    weeklyPay: false,
    ownerWillTrain: false,
    employmentType: "all", // 'all', 'fullTime', 'partTime'
  });
  
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };
  
  const filteredJobs = jobListings.filter(job => {
    if (filters.weeklyPay && !job.hasWeeklyPay) return false;
    if (filters.ownerWillTrain && !job.providesTraining) return false;
    if (filters.employmentType === "fullTime" && !job.isFullTime) return false;
    if (filters.employmentType === "partTime" && job.isFullTime) return false;
    return true;
  });

  const openJobDetails = (job) => {
    setSelectedJob(job);
  };

  const closeJobDetails = () => {
    setSelectedJob(null);
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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Beauty Industry Jobs</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Find your perfect position in the beauty industry, with opportunities that match your skills, schedule, and career goals.
          </p>
        </motion.div>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-serif mb-4">Filters</h2>
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
          </div>
        </div>
        
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Beauty Professionals", value: "+15,000" },
            { label: "Active Job Listings", value: "+2,500" },
            { label: "Business Opportunities", value: "+3,800" },
            { label: "Hiring Success Rate", value: "92%" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-4 rounded-lg shadow-sm text-center"
            >
              <p className="text-2xl font-serif font-bold">{stat.value}</p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Job Listings */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredJobs.map((job) => (
            <motion.div key={job.id} variants={item}>
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={job.image} 
                    alt={job.salon} 
                    className="w-full h-full object-cover"
                  />
                  {job.urgentLabel && (
                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {job.urgentLabel}
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <h3 className="text-xl font-serif font-semibold">{job.title}</h3>
                  <p className="text-gray-700 font-medium">{job.salon}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" /> 
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <DollarSign className="h-4 w-4 mr-1" /> 
                    <span className="text-sm">{job.salary}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-1" /> 
                    <span className="text-sm">{job.phone}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-2 flex items-center justify-between">
                  <Button onClick={() => openJobDetails(job)}>
                    View Details
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
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
              })}
            >
              Reset Filters
            </Button>
          </div>
        )}
        
        {/* Job Details Modal */}
        <Dialog open={!!selectedJob} onOpenChange={closeJobDetails}>
          {selectedJob && (
            <DialogContent className="sm:max-w-4xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif">{selectedJob.title}</DialogTitle>
                <DialogDescription className="text-base text-gray-700 font-medium">{selectedJob.salon}</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img 
                    src={selectedJob.image} 
                    alt={selectedJob.salon} 
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Job Details</h4>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-2" /> 
                        <span>{selectedJob.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <DollarSign className="h-4 w-4 mr-2" /> 
                        <span>{selectedJob.salary}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Clock className="h-4 w-4 mr-2" /> 
                        <span>{selectedJob.isFullTime ? "Full-time" : "Part-time"}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Briefcase className="h-4 w-4 mr-2" /> 
                        <span>{selectedJob.providesTraining ? "Training provided" : "Experience required"}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-gray-600">{selectedJob.description}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4">Contact Information</h4>
                  <div className="flex items-center mb-4">
                    <Building className="h-5 w-5 mr-2 text-gray-600" />
                    <span>{selectedJob.salon}</span>
                  </div>
                  <div className="flex items-center mb-6">
                    <Phone className="h-5 w-5 mr-2 text-gray-600" />
                    <span>{selectedJob.phone}</span>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button className="flex-1">
                      <Phone className="h-4 w-4 mr-2" /> Call Now
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Send Message
                    </Button>
                  </div>
                  
                  <div className="mt-6 border rounded-md p-4">
                    <h4 className="font-medium mb-3">Location</h4>
                    <div className="bg-gray-200 h-[200px] flex items-center justify-center rounded">
                      <p className="text-gray-500 text-sm">Map will be displayed here</p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </Layout>
  );
};

export default Jobs;


import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Mail, Phone, Tag, ChevronLeft } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/context/auth";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/types/job";
import { useJobsData } from "@/hooks/useJobsData";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { useTranslation } from "@/hooks/useTranslation";

const OpportunityDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { t, isVietnamese } = useTranslation();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  
  // Use our hook to get all jobs
  const { jobs: allJobs } = useJobsData();
  
  // Find the job with matching ID when jobs data is loaded
  useEffect(() => {
    if (id && allJobs.length > 0) {
      const foundJob = allJobs.find(job => job.id === id);
      if (foundJob) {
        setJob(foundJob);
        // Set document title based on job details
        document.title = `${foundJob.title || 'Job Opportunity'} at ${foundJob.company || 'EmviApp'}`;
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }
  }, [id, allJobs]);

  // Get a default image based on job type
  const getFallbackImage = () => {
    if (!job) return "";
    
    if (job.employment_type?.toLowerCase().includes('sale')) {
      return "https://images.unsplash.com/photo-1613843351058-1dd06fccdc6a?q=80&w=2070&auto=format&fit=crop";
    } else if (job.specialties?.some(s => s.toLowerCase().includes('nail'))) {
      return "https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=2070&auto=format&fit=crop";
    } else if (job.specialties?.some(s => s.toLowerCase().includes('hair'))) {
      return "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2070&auto=format&fit=crop";
    }
    return "https://images.unsplash.com/photo-1607008829749-c0f284a49841?q=80&w=2070&auto=format&fit=crop";
  };

  // Format date if available
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recent";
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch (e) {
      return "Recent";
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <div className="text-center py-16">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
            <p className="mt-2 text-gray-600">Loading opportunity details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (notFound) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <div className="text-center py-16">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">
              Opportunity Not Found
            </h2>
            <p className="text-gray-600 mb-8">
              The job or opportunity you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/jobs')}>
              <ChevronLeft className="h-4 w-4 mr-2" /> 
              Back to Jobs
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!job) return null;

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="mb-6 flex items-center">
          <Button 
            variant="ghost" 
            className="flex items-center text-gray-600 hover:text-gray-900" 
            onClick={() => navigate('/jobs')}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Jobs
          </Button>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Job Banner Image */}
          <div className="aspect-[3/1] w-full overflow-hidden rounded-lg mb-8">
            <ImageWithFallback
              src={job.image}
              alt={job.title || "Job listing"}
              className="w-full h-full object-cover"
              fallbackImage={getFallbackImage()}
              businessName={job.company}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left column - job details */}
            <div className="md:col-span-2 space-y-8">
              {/* Header info */}
              <div>
                <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-3 text-gray-900">{job.title}</h1>
                <p className="text-xl text-gray-700 mb-3">{job.company}</p>
                <div className="flex items-center text-gray-600 mb-6">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-lg">{job.location || "Location not specified"}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.employment_type && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-sm px-3 py-1">
                      {job.employment_type}
                    </Badge>
                  )}
                  {job.weekly_pay && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-sm px-3 py-1">
                      Weekly Pay
                    </Badge>
                  )}
                  {job.has_housing && (
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-sm px-3 py-1">
                      Housing Available
                    </Badge>
                  )}
                  {job.owner_will_train && (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-sm px-3 py-1">
                      Training Provided
                    </Badge>
                  )}
                  {job.is_remote && (
                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 text-sm px-3 py-1">
                      Remote
                    </Badge>
                  )}
                  {job.no_supply_deduction && (
                    <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200 text-sm px-3 py-1">
                      No Supply Deduction
                    </Badge>
                  )}
                  {job.for_sale && (
                    <Badge className="bg-pink-600 text-sm px-3 py-1">
                      For Sale
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Posted: {formatDate(job.created_at)}</span>
                </div>
              </div>
              
              {/* Description */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-playfair font-semibold mb-4">Job Description</h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="whitespace-pre-line text-lg">
                    {isVietnamese && job.vietnamese_description ? job.vietnamese_description : job.description}
                  </p>
                </div>
              </div>
              
              {/* Additional sections if available */}
              {job.requirements && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-playfair font-semibold mb-4">Requirements</h2>
                  {Array.isArray(job.requirements) ? (
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="text-lg">{req}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-lg text-gray-700">{job.requirements}</p>
                  )}
                </div>
              )}
              
              {job.benefits && Array.isArray(job.benefits) && job.benefits.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-playfair font-semibold mb-4">Benefits</h2>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    {job.benefits.map((benefit, i) => (
                      <li key={i} className="text-lg">{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {job.specialties && job.specialties.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Specialties</h2>
                  <div className="flex flex-wrap gap-2">
                    {job.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="bg-gray-50 text-sm px-3 py-1">
                        <Tag className="h-3 w-3 mr-1" />
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Right column - contact info */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold border-b border-gray-200 pb-3 mb-4">Contact Information</h3>
                
                {isSignedIn ? (
                  job.contact_info ? (
                    <div className="space-y-5">
                      {job.contact_info.owner_name && (
                        <div>
                          <p className="text-sm text-gray-500">Contact Person</p>
                          <p className="font-medium text-lg">{job.contact_info.owner_name}</p>
                        </div>
                      )}
                      
                      {job.contact_info.phone && (
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-gray-500" />
                            <a href={`tel:${job.contact_info.phone}`} className="font-medium text-blue-600 hover:underline">
                              {job.contact_info.phone}
                            </a>
                          </div>
                        </div>
                      )}
                      
                      {job.contact_info.email && (
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-gray-500" />
                            <a href={`mailto:${job.contact_info.email}`} className="font-medium text-blue-600 hover:underline">
                              {job.contact_info.email}
                            </a>
                          </div>
                        </div>
                      )}
                      
                      {job.contact_info.notes && (
                        <div>
                          <p className="text-sm text-gray-500">Additional Notes</p>
                          <p>{job.contact_info.notes}</p>
                        </div>
                      )}
                      
                      <div className="pt-3">
                        <Button className="w-full">
                          <Phone className="h-4 w-4 mr-2" />
                          Contact Now
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600">No contact information provided. Please contact the employer through their website or visit in person.</p>
                  )
                ) : (
                  <div className="space-y-4">
                    <div className="p-5 bg-gray-50 rounded-lg border border-gray-200 text-center">
                      <p className="font-medium text-lg mb-2">Sign in to view contact details</p>
                      <p className="text-gray-600 mb-6">Create a free account to access contact information and additional details for this opportunity.</p>
                      <div className="space-y-3">
                        <Button 
                          className="w-full" 
                          onClick={() => navigate(`/sign-in?redirect=${encodeURIComponent(`/opportunities/${job.id}`)}`)}
                        >
                          Sign In
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => navigate(`/sign-up?redirect=${encodeURIComponent(`/opportunities/${job.id}`)}`)}
                        >
                          Create Account
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Additional info */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold border-b border-gray-200 pb-3 mb-4">Job Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{job.employment_type || "Not specified"}</span>
                  </div>
                  
                  {job.salary_range && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pay Range:</span>
                      <span className="font-medium">{job.salary_range}</span>
                    </div>
                  )}
                  
                  {job.tip_range && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tips:</span>
                      <span className="font-medium">{job.tip_range}</span>
                    </div>
                  )}
                  
                  {job.experience_level && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Experience:</span>
                      <span className="font-medium">{job.experience_level}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Posted:</span>
                    <span className="font-medium">{formatDate(job.created_at)}</span>
                  </div>
                </div>
                
                {job.for_sale && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="font-medium mb-3">Business Sale Details</h4>
                    <div className="space-y-3">
                      {job.asking_price && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Asking Price:</span>
                          <span className="font-medium">{job.asking_price}</span>
                        </div>
                      )}
                      {job.number_of_stations && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Stations:</span>
                          <span className="font-medium">{job.number_of_stations}</span>
                        </div>
                      )}
                      {job.square_feet && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Size:</span>
                          <span className="font-medium">{job.square_feet} sq ft</span>
                        </div>
                      )}
                      {job.monthly_rent && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Monthly Rent:</span>
                          <span className="font-medium">{job.monthly_rent}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OpportunityDetailPage;

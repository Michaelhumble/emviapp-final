
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Info, FileImage, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { getJobTemplate } from '@/utils/jobTemplates';
import { toast } from 'sonner';

// Template options for the dropdown
const templateOptions = [
  { value: "nails", label: "Nail Technician (Vietnamese-style)" },
  { value: "hair", label: "Hair Stylist (Salon)" },
  { value: "eyebrowLash", label: "Lash Tech (Home-Based)" },
  { value: "barber", label: "Barber (Shop)" },
  { value: "tattoo", label: "Tattoo Artist (Studio)" },
  { value: "esthetician", label: "Licensed Esthetician (Spa)" },
  { value: "massage", label: "Masseuse (On-call)" },
  { value: "makeup", label: "Makeup Artist (Freelancer)" },
  { value: "studioRental", label: "Studio Room for Rent (Beauty Space)" },
];

// Template content for each option
const jobTemplates = {
  nails: {
    title: "Nail Technician - Full Time (Vietnamese-style)",
    jobSummary: "Experienced nail technician with expertise in acrylics, dip, and Vietnamese nail art techniques.",
    description: "We are looking for an experienced Nail Technician to join our busy salon. The ideal candidate will have at least 2 years of experience with acrylics, gel, dip powder, and Vietnamese nail art techniques.\n\nResponsibilities:\n• Provide high-quality nail services including manicures, pedicures, nail enhancements\n• Maintain a clean and sanitized work area\n• Build relationships with clients to ensure repeat business\n• Keep up with current nail trends and techniques\n\nBenefits:\n• Competitive commission-based pay\n• Flexible schedule\n• Paid training opportunities\n• Friendly, supportive team environment",
    salary: "$800-1200/week + tips",
    heartfeltMessage: "Our salon prioritizes quality over quantity. We care about your growth and will support you in building a loyal client base."
  },
  hair: {
    title: "Hair Stylist - Full Time Position",
    jobSummary: "Creative hair stylist needed for upscale salon with excellent color and cutting skills.",
    description: "Our busy salon is seeking a talented and passionate Hair Stylist to join our team. We're looking for someone with strong technical skills in cutting, coloring, and styling, as well as excellent customer service abilities.\n\nResponsibilities:\n• Consult with clients to determine their needs and preferences\n• Perform various hair services including cutting, coloring, highlights, balayage\n• Stay current with latest hair trends and techniques\n• Maintain a clean and organized station\n\nBenefits:\n• Competitive commission structure (up to 50%)\n• Health insurance available\n• Paid education and training opportunities\n• Retail commission bonuses",
    salary: "Commission-based (45-50%) + tips",
    heartfeltMessage: "We believe in work-life balance and creating a salon that feels like family, where everyone supports each other's creative and financial success."
  },
  eyebrowLash: {
    title: "Lash Technician - Home Studio Based",
    jobSummary: "Certified lash artist needed for home-based studio specializing in volume and hybrid sets.",
    description: "Looking for a certified and detail-oriented Lash Technician to join our growing home-based studio. The perfect candidate will have experience with classic, hybrid, and volume lash extensions.\n\nResponsibilities:\n• Apply lash extensions with precision and attention to detail\n• Consult with clients on lash styles and maintenance\n• Maintain a clean and sterile work environment\n• Manage your own booking schedule\n\nRequirements:\n• Valid lash certification\n• At least 1 year of professional experience\n• Portfolio of your work\n• Excellent communication skills\n\nBenefits:\n• Flexible hours\n• Product provided\n• Build your own clientele",
    salary: "$25-35/hr or commission-based",
    heartfeltMessage: "Our intimate home studio provides a peaceful environment for both technicians and clients. We value quality over quantity and want you to feel proud of every set you create."
  },
  barber: {
    title: "Experienced Barber - Shop Position",
    jobSummary: "Skilled barber needed for busy shop with strong clientele and vibrant atmosphere.",
    description: "Our established barbershop is looking for an experienced barber to join our team. We provide traditional and modern haircuts, beard trims, and hot towel shaves in a friendly, high-energy environment.\n\nResponsibilities:\n• Provide excellent haircuts, fades, beard trims, and shaves\n• Consult with clients on styles and maintenance\n• Maintain clean equipment and work area\n• Help create a welcoming atmosphere for clients\n\nRequirements:\n• Valid barber license\n• 2+ years professional experience\n• Strong skills in fades, tapers, and current men's styling trends\n\nBenefits:\n• Chair rental or commission options available\n• Busy location with walk-in traffic\n• Team events and education opportunities",
    salary: "Commission (60-70%) or chair rental option",
    heartfeltMessage: "Our shop has built a reputation for quality cuts and good vibes. We work hard but have fun doing what we love."
  },
  tattoo: {
    title: "Tattoo Artist - Studio Position",
    jobSummary: "Creative tattoo artist with strong portfolio needed for established studio with loyal clientele.",
    description: "We're seeking a talented and reliable tattoo artist to join our professional studio. The ideal candidate will have a diverse portfolio, excellent drawing skills, and a passion for creating custom, high-quality tattoos.\n\nResponsibilities:\n• Create custom tattoo designs based on client requests\n• Maintain strict hygiene and safety standards\n• Contribute to the positive studio atmosphere\n• Manage your own booking schedule\n\nRequirements:\n• 3+ years professional tattooing experience\n• Strong portfolio demonstrating versatility\n• Excellent drawing and design skills\n• Bloodborne pathogen certification\n\nBenefits:\n• 60/40 commission split\n• Private workspace\n• Supply allowance\n• Collaborative, drama-free environment",
    salary: "60% commission of all work",
    heartfeltMessage: "Our studio values creativity, professionalism, and mutual respect. We've built a space where artists can thrive and grow their personal brand while being part of something special."
  },
  esthetician: {
    title: "Licensed Esthetician - Spa Position",
    jobSummary: "Skilled esthetician needed for luxury spa offering facials, peels, and specialized skin treatments.",
    description: "Our upscale day spa is looking for a licensed esthetician to provide exceptional skincare services to our clientele. The ideal candidate will have experience with various facial techniques, chemical peels, and be knowledgeable about product recommendations.\n\nResponsibilities:\n• Perform facials, peels, extractions, and other skin treatments\n• Conduct thorough skin analyses and consultations\n• Recommend home care regimens and products\n• Maintain treatment room cleanliness and organization\n\nRequirements:\n• Current esthetician license\n• 2+ years experience in a spa setting\n• Knowledge of medical-grade skincare lines\n• Excellent customer service skills\n\nBenefits:\n• Base pay plus commission structure\n• Paid continuing education\n• Product discounts\n• Health insurance options",
    salary: "$20-25/hr + commission on services and products",
    heartfeltMessage: "We believe in creating a nurturing environment for both our clients and our team. We value estheticians who are passionate about transformation and helping clients feel their best."
  },
  massage: {
    title: "Licensed Massage Therapist - On-Call Position",
    jobSummary: "Certified massage therapist needed for on-call work with flexible schedule and diverse clientele.",
    description: "We are expanding our team of on-call massage therapists to meet growing demand. This position offers flexibility and the opportunity to work with a diverse client base in various settings including our spa location and private client homes.\n\nResponsibilities:\n• Perform various massage modalities (Swedish, Deep Tissue, Sports, etc.)\n• Travel to client locations when required\n• Maintain accurate client records\n• Communicate effectively regarding scheduling availability\n\nRequirements:\n• Valid massage therapy license\n• Liability insurance\n• Reliable transportation\n• Experience with multiple massage techniques\n\nBenefits:\n• Set your own availability\n• Higher than average industry pay\n• Loyal client base\n• Growth opportunities for the right candidate",
    salary: "$40-60/hr + tips (based on experience and modalities)",
    heartfeltMessage: "We understand the physical demands of massage therapy and strive to create a sustainable schedule that prevents burnout while maximizing your earning potential."
  },
  makeup: {
    title: "Freelance Makeup Artist - Events & Weddings",
    jobSummary: "Creative makeup artist needed for weddings, special events, and editorial work with growing brand.",
    description: "We're looking for a skilled freelance makeup artist to join our team specializing in weddings, special events, and occasional editorial work. The ideal candidate will have experience with diverse skin tones and textures, strong attention to detail, and excellent interpersonal skills.\n\nResponsibilities:\n• Create customized makeup looks for clients\n• Travel to event locations (primarily weekends)\n• Maintain a professional and sanitary kit\n• Participate in trial sessions for bridal clients\n• Occasionally assist with social media content creation\n\nRequirements:\n• Professional makeup training or equivalent experience\n• 2+ years of experience in bridal/event makeup\n• Portfolio demonstrating versatility\n• Willingness to work weekends and early mornings\n\nBenefits:\n• Competitive pay per event\n• Flexible schedule\n• Networking opportunities\n• Potential for growth with our expanding brand",
    salary: "$75-125/face + travel fees",
    heartfeltMessage: "We believe makeup is more than just products—it's about creating confidence and capturing special moments. Our artists are valued for their unique perspectives and ability to make clients feel their absolute best."
  },
  studioRental: {
    title: "Beauty Studio Room for Rent - Prime Location",
    jobSummary: "Private treatment room available for rent in upscale salon/spa with established clientele.",
    description: "Beautiful, fully-equipped private room available for rent in our well-established beauty center. Perfect for estheticians, lash artists, massage therapists, or other beauty professionals looking to grow their business in a supportive environment.\n\nSpace Features:\n• 120 sq ft private room with locking door\n• Built-in storage and counter space\n• Sink with hot/cold water\n• Esthetician bed/massage table available\n• Great natural lighting plus adjustable overhead lights\n• Centrally located with ample parking\n\nRental Includes:\n• Utilities (water, electric, WiFi)\n• Use of common areas including bathroom and break room\n• Basic laundry service\n• Front desk reception for your clients\n• Listing on salon website and social media\n\nIdeal for beauty professionals with existing clientele looking for a more professional setting.",
    salary: "$250/week or $900/month",
    heartfeltMessage: "We've created a collaborative community of beauty professionals who support each other while maintaining their independence. Join our family of entrepreneurs!"
  }
};

// Export types
export type { JobFormValues };

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads?: File[];
  setPhotoUploads?: (files: File[]) => void;
  isSubmitting?: boolean;
  defaultValues?: Partial<JobFormValues>;
  industry?: string;
  userProfile?: any; // Using any for now, could be typed better
}

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads = [],
  setPhotoUploads = () => {},
  isSubmitting = false,
  defaultValues,
  industry = "",
  userProfile
}) => {
  // Refs for scrolling to inputs
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | undefined>(undefined);

  // Initialize form with default values or empty values
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: defaultValues || {
      title: "",
      jobType: "full-time",
      location: "",
      salary: "",
      contactEmail: userProfile?.email || "",
      phoneNumber: userProfile?.phoneNumber || "",
      description: "",
      jobSummary: "",
      heartfeltMessage: "",
      isUrgent: false
    },
  });

  // Apply template when selected
  const handleTemplateChange = (templateKey: string) => {
    setSelectedTemplate(templateKey);
    const template = jobTemplates[templateKey as keyof typeof jobTemplates];
    
    if (template) {
      form.setValue("title", template.title);
      form.setValue("jobSummary", template.jobSummary);
      form.setValue("description", template.description);
      if (template.salary) form.setValue("salary", template.salary);
      if (template.heartfeltMessage) form.setValue("heartfeltMessage", template.heartfeltMessage);
      
      // Scroll to title input after brief delay to allow for state update
      setTimeout(() => {
        if (titleInputRef.current) {
          titleInputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
          titleInputRef.current.focus();
        }
      }, 100);
    }
  };

  // Polish job description with AI (placeholder functionality)
  const handlePolishWithAI = () => {
    const currentDescription = form.getValues("description");
    if (!currentDescription || currentDescription.trim() === "") {
      toast.error("Please add a job description first");
      return;
    }

    toast.success("Polishing your job description...");
    
    // Simple enhancement rather than actual AI call
    // In a real implementation, this would call an API
    setTimeout(() => {
      const enhanced = currentDescription
        .replace(/we are looking for/i, "We're excited to welcome")
        .replace(/required/i, "desired")
        .replace(/must have/i, "ideally you'll bring")
        .replace(/experience/i, "expertise and passion")
        .replace(/responsible for/i, "you'll have the opportunity to")
        .replace(/duties/i, "opportunities")
        .trim();
        
      form.setValue("description", enhanced);
      toast.success("Job description polished! ✨");
    }, 1500);
  };

  // Function to handle job preview
  const getPreviewContent = () => {
    const values = form.getValues();
    const firstLine = values.description.split('\n')[0] || "";
    
    return {
      title: values.title || "Job Title",
      location: values.location || "Location",
      salary: values.salary || "Competitive",
      summary: firstLine,
      isUrgent: values.isUrgent
    };
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Step tracker */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="flex items-center space-x-2">
            <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              1
            </div>
            <span className="font-medium text-sm">Job Info</span>
          </div>
          <div className="h-px bg-gray-200 flex-1 mx-2"></div>
          <div className="flex items-center space-x-2">
            <div className="bg-gray-200 text-gray-500 rounded-full w-6 h-6 flex items-center justify-center text-sm">
              2
            </div>
            <span className="text-gray-500 text-sm">Add Photos</span>
          </div>
          <div className="h-px bg-gray-200 flex-1 mx-2"></div>
          <div className="flex items-center space-x-2">
            <div className="bg-gray-200 text-gray-500 rounded-full w-6 h-6 flex items-center justify-center text-sm">
              3
            </div>
            <span className="text-gray-500 text-sm">Pricing</span>
          </div>
        </div>

        {/* Template selector */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <div className="flex items-center mb-2">
            <Sparkles className="w-4 h-4 mr-2 text-amber-500" />
            <label className="text-base font-medium">Start with a Template</label>
          </div>
          <Select onValueChange={handleTemplateChange} value={selectedTemplate}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a job template..." />
            </SelectTrigger>
            <SelectContent>
              {templateOptions.map((template) => (
                <SelectItem key={template.value} value={template.value}>
                  {template.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Basic Job Info Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center">
            <FileImage className="w-4 h-4 mr-2 text-blue-600" />
            Basic Job Information
          </h3>
          
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="title">Job Title <span className="text-red-500">*</span></Label>
                <FormControl>
                  <Input
                    id="title"
                    placeholder="e.g. Nail Tech – Full Time (Dip/Gel Experience)"
                    {...field}
                    ref={titleInputRef}
                  />
                </FormControl>
                <p className="text-xs text-gray-500">Clear titles get more applicants</p>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="jobType">Job Type <span className="text-red-500">*</span></Label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger id="jobType">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="temporary">Temporary</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">Be clear about the commitment</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
                  <FormControl>
                    <Input id="location" placeholder="e.g. San Jose, CA" {...field} />
                  </FormControl>
                  <p className="text-xs text-gray-500">City and state help local matches</p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="relative">
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <Label htmlFor="salary" className="flex-grow">Salary/Compensation</Label>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-auto p-0">
                          <Info className="w-4 h-4 text-gray-400" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-sm">
                        <DialogHeader>
                          <DialogTitle>Why we ask for salary information</DialogTitle>
                        </DialogHeader>
                        <p className="text-sm">
                          We only show this to verified artists after your job is live. 
                          Including salary information increases applications by 30% and helps reduce back-and-forth.
                        </p>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <FormControl>
                    <Input 
                      id="salary" 
                      placeholder="$25–30/hr or $60,000–70,000/year" 
                      {...field}
                    />
                  </FormControl>
                  <p className="text-xs text-gray-500">
                    Listings with salary info get 30% more responses
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Job Details Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center">
            <FileImage className="w-4 h-4 mr-2 text-blue-600" />
            Job Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="jobSummary"
              render={({ field }) => (
                <FormItem className="col-span-1 md:col-span-2">
                  <Label htmlFor="jobSummary">Job Summary</Label>
                  <FormControl>
                    <Input
                      id="jobSummary"
                      placeholder="One-line overview of the job"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-xs text-gray-500">
                    A quick summary helps artists decide if this job is for them
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-1 md:col-span-2">
              <FormField
                control={form.control}
                name="isUrgent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 mb-4">
                    <FormControl>
                      <div className="flex items-center">
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="urgent-job"
                        />
                        <Label htmlFor="urgent-job" className="ml-2 cursor-pointer flex items-center">
                          <span className="text-orange-500 mr-1">🔥</span>
                          Mark this job as Urgent
                        </Label>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="relative">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="description">Job Description <span className="text-red-500">*</span></Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handlePolishWithAI}
                      className="text-xs h-7 px-2 bg-gradient-to-r from-indigo-50 to-purple-50 border-purple-200 text-purple-700 hover:bg-purple-50"
                    >
                      <Sparkles className="h-3 w-3 mr-1" /> Polish with AI
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea
                      id="description"
                      placeholder="Describe responsibilities, benefits, and other important details"
                      className="min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-xs text-gray-500">
                    Be specific about duties, requirements, and what makes your salon special
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="heartfeltMessage"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="heartfeltMessage" className="flex items-center">
                  <span className="mr-2">📣</span> Optional: Say something from the heart
                </Label>
                <FormControl>
                  <Textarea
                    id="heartfeltMessage"
                    placeholder="We're a family-run salon and care deeply about our team."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <p className="text-xs text-gray-500">
                  Personal touches help artists connect with your salon's values
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Photos Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center">
            <FileImage className="w-4 h-4 mr-2 text-blue-600" />
            Photos (Optional)
          </h3>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
            <div className="flex flex-col items-center">
              <FileImage className="h-8 w-8 text-gray-400 mb-2" />
              <h4 className="text-sm font-medium text-gray-700">Add photos of your salon</h4>
              <p className="text-xs text-gray-500 mt-1 mb-3">
                Drag and drop or click to upload (up to 5 photos)
              </p>
              <Button type="button" variant="outline" size="sm" className="mt-2">
                Select Photos
              </Button>
              <p className="text-xs text-gray-500 mt-4">
                Adding photos can increase applications by up to 35%
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center">
            <FileImage className="w-4 h-4 mr-2 text-blue-600" />
            Contact Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <Label htmlFor="contactEmail" className="flex-grow">Contact Email <span className="text-red-500">*</span></Label>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-auto p-0">
                            <Info className="w-4 h-4 text-gray-400" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-sm">
                          <DialogHeader>
                            <DialogTitle>Why we ask for contact information</DialogTitle>
                          </DialogHeader>
                          <p className="text-sm">
                            We only show this to verified artists after your job is live. 
                            This helps them contact you directly about the position.
                          </p>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <FormControl>
                      <Input id="contactEmail" placeholder="hiring@yoursalon.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="relative">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <Label htmlFor="phoneNumber" className="flex-grow">Phone Number <span className="text-red-500">*</span></Label>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-auto p-0">
                            <Info className="w-4 h-4 text-gray-400" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-sm">
                          <DialogHeader>
                            <DialogTitle>Why we ask for phone number</DialogTitle>
                          </DialogHeader>
                          <p className="text-sm">
                            We only show this to verified artists after your job is live.
                            Many artists prefer to call for initial discussions about opportunities.
                          </p>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <FormControl>
                      <Input id="phoneNumber" placeholder="(555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Better Results Section */}
        <div className="bg-purple-50 bg-opacity-50 p-6 rounded-xl border border-purple-100 mt-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-b from-purple-200 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
          
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <span className="mr-2">💜</span> Get Better Results
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle2 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Highlight your listing</p>
                <p className="text-xs text-gray-600">Make your job stand out with premium placement</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle2 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Extended visibility</p>
                <p className="text-xs text-gray-600">Your job will stay active longer</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle2 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Smart matching</p>
                <p className="text-xs text-gray-600">AI will help match with qualified artists in your area</p>
              </div>
            </div>
          </div>
        </div>

        {/* Preview job modal */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogTrigger asChild>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full flex items-center justify-center text-sm" 
              onClick={() => setShowPreview(true)}
            >
              <span className="mr-1">👁️</span> Preview Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Job Preview</DialogTitle>
            </DialogHeader>
            <div className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-base">{getPreviewContent().title}</h3>
                {getPreviewContent().isUrgent && (
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full flex items-center">
                    🔥 Urgent
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-500 mt-1">{getPreviewContent().location}</div>
              <div className="text-sm font-medium mt-2">{getPreviewContent().salary}</div>
              <p className="text-sm mt-3 line-clamp-3">{getPreviewContent().summary}</p>
              
              <div className="mt-4 py-3 border-t flex justify-between items-center">
                <span className="text-xs text-gray-500">Posted today</span>
                <span className="text-xs text-purple-600">View details →</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 text-center mt-2">This is how your job will appear to artists</p>
          </DialogContent>
        </Dialog>

        {/* Final Push */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 italic">✨ You're almost done — one more step to attract your perfect candidate!</p>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-base relative"
          disabled={isSubmitting}
        >
          <span className="flex items-center justify-center">
            Continue to Pricing
            <ChevronRight className="ml-1 h-5 w-5" />
          </span>
        </Button>
      </form>
    </Form>
  );
};

export default JobForm;


import React, { useState, useRef, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema } from './jobFormSchema';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog } from '@/components/ui/dialog';
import { Sparkles, Info, Lightbulb, Camera, Clock, Award, Heart, Gem, Search, Flame, Target } from 'lucide-react';
import PolishedDescriptionsModal from './PolishedDescriptionsModal';

export interface JobFormValues {
  title: string;
  description: string;
  location: string;
  salary?: string;
  contactEmail: string;
  phoneNumber: string;
  jobType: "full-time" | "part-time" | "contract" | "temporary";
  jobSummary?: string;
  heartfeltMessage?: string;
  isUrgent: boolean;
}

export interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
  defaultValues?: Partial<JobFormValues>;
  industry?: string;
  userProfile?: any;
}

// Define job templates
const JOB_TEMPLATES = [
  {
    label: "Select a Template...",
    value: "",
  },
  {
    label: "Nail Technician (Vietnamese-style)",
    value: "nail-tech-vietnamese",
    title: "Experienced Nail Technician - Vietnamese Style",
    summary: "Join our busy salon specializing in Vietnamese nail techniques. Great pay + tips!",
    description: "We are looking for skilled nail technicians who are experienced in Vietnamese nail art and techniques. Our busy salon caters to a high-end clientele who appreciate quality work and attention to detail. We offer competitive pay, flexible hours, and a friendly work environment.\n\nRequirements:\n- At least 1 year experience\n- Knowledge of acrylic, gel, dip powder, and nail art\n- Valid nail technician license\n- Excellent customer service skills\n- Vietnamese speaking ability is a plus but not required",
    salary: "$800-1200/week + tips",
    message: "Our salon is like a family. We support each other and help our team members grow their skills and client base."
  },
  {
    label: "Hair Stylist (Salon)",
    value: "hair-stylist",
    title: "Professional Hair Stylist - Full Service Salon",
    summary: "Creative hair stylist needed for upscale salon. Build your clientele with our marketing support.",
    description: "Our growing salon is seeking a talented hair stylist to join our team. We provide continuous education, marketing support to help you build your clientele, and a beautiful, modern workspace.\n\nResponsibilities include:\n- Haircuts, coloring, styling, and treatments\n- Client consultations and recommendations\n- Retail product knowledge and recommendations\n\nIdeal candidates have:\n- Cosmetology license with 2+ years experience\n- Color certification preferred\n- Portfolio of work\n- Excellent communication skills",
    salary: "Commission-based (up to 60%)",
    message: "We believe in work-life balance and supporting our stylists' creative vision and career growth."
  },
  {
    label: "Lash Tech (Home-Based)",
    value: "lash-tech",
    title: "Certified Lash Artist - Home Studio",
    summary: "Join our cozy home-based lash studio. Perfect for artists seeking flexible hours.",
    description: "We are looking for a certified lash artist to join our intimate home-based studio. This position offers tremendous flexibility and a peaceful working environment away from the typical salon chaos.\n\nWe're seeking someone who specializes in:\n- Classic lash extensions\n- Volume/hybrid techniques\n- Lash lifts and tints\n\nThe ideal candidate will have:\n- Lash certification\n- At least 6 months experience\n- Own transportation\n- Ability to work independently\n- Strong attention to detail",
    salary: "$25-35/hr + commission opportunities",
    message: "We've created a stress-free environment where you can focus on your artistry without salon politics or pressure."
  },
  {
    label: "Barber (Shop)",
    value: "barber",
    title: "Experienced Barber - Traditional & Modern Cuts",
    summary: "Skilled barber needed for busy shop. Strong clientele and walk-ins daily.",
    description: "Our established barber shop is looking for a skilled barber who can handle both traditional cuts and modern styles. We have a loyal customer base and steady walk-in traffic.\n\nSkills needed:\n- Precision haircuts and fades\n- Beard trimming and shaping\n- Hot towel straight razor shaves\n- Line-ups and designs (a plus)\n\nRequirements:\n- Barber license\n- Minimum 1 year professional experience\n- Reliable and punctual\n- Customer-focused attitude",
    salary: "Base pay + commission (averaging $1000-1500/week)",
    message: "Our shop has a great vibe with regular clients who appreciate quality work. We treat our team like family and celebrate each other's success."
  },
  {
    label: "Tattoo Artist (Studio)",
    value: "tattoo-artist",
    title: "Talented Tattoo Artist - Established Studio",
    summary: "Creative tattoo artist wanted for our client-focused studio. Bring your portfolio and passion.",
    description: "Our reputable tattoo studio is seeking an experienced tattoo artist to join our team. We provide a clean, professional environment with a steady flow of clients.\n\nWe're looking for someone who:\n- Has a strong, diverse portfolio\n- Excels in both custom designs and flash work\n- Maintains impeccable hygiene standards\n- Can communicate effectively with clients\n\nRequirements:\n- Minimum 3 years professional experience\n- Current bloodborne pathogen certification\n- Digital design skills a plus\n- Strong drawing abilities",
    salary: "70/30 commission split in your favor",
    message: "We've built a reputation for quality work in a drama-free environment. Our artists support each other and collaborate often."
  },
  {
    label: "Licensed Esthetician (Spa)",
    value: "esthetician",
    title: "Medical Esthetician - Luxury Day Spa",
    summary: "Join our upscale spa team. Advanced skincare knowledge and excellent client care required.",
    description: "Our luxury day spa is looking for a licensed medical esthetician to perform advanced skincare treatments. You'll work in a serene environment with high-end products and the latest technology.\n\nResponsibilities:\n- Customized facials and skin analysis\n- Chemical peels and microdermabrasion\n- Laser treatments and light therapy\n- Product recommendations\n\nQualifications:\n- Current esthetician license\n- Additional certification in medical esthetics\n- 2+ years experience\n- Knowledge of medical-grade skincare lines",
    salary: "$25-35/hour plus commission and tips",
    message: "We value continuous education and provide regular training on new treatments and technologies to help our team excel."
  },
  {
    label: "Masseuse (On-call)",
    value: "massage-therapist",
    title: "Licensed Massage Therapist - Flexible Hours",
    summary: "Seeking talented massage therapists for our growing client base. On-call positions available.",
    description: "We are expanding our therapeutic massage services and need licensed massage therapists who can work on an on-call basis. Perfect for professionals looking to supplement their income or build their practice.\n\nSpecialties we're seeking:\n- Deep tissue massage\n- Swedish massage\n- Sports massage\n- Hot stone therapy\n- Prenatal massage\n\nRequirements:\n- Current massage therapy license\n- Liability insurance\n- 1+ year professional experience\n- Excellent time management",
    salary: "$40-60 per session + gratuity",
    message: "We respect your expertise and techniques. Our goal is to provide you with clients who appreciate your specific skills while offering you maximum scheduling flexibility."
  },
  {
    label: "Makeup Artist (Freelancer)",
    value: "makeup-artist",
    title: "Freelance Makeup Artist - Bridal & Special Events",
    summary: "Creative makeup artist needed for weddings and special events. Build your portfolio with us.",
    description: "Our beauty team is looking for a talented makeup artist specializing in bridal and special event makeup. This is a freelance position with regular bookings, especially during wedding season.\n\nServices you'll provide:\n- Bridal makeup (trials and wedding day)\n- Special event makeup\n- Group makeup services (bridal parties, proms)\n- Occasional photo shoots\n\nIdeal candidate has:\n- Professional makeup kit with quality products\n- Portfolio showing range of skin tones and styles\n- Ability to work early mornings\n- Excellent interpersonal skills\n- Reliable transportation",
    salary: "$150-300 per client + travel fees",
    message: "We focus on creating stress-free, memorable experiences for clients on their special days, and value artists who bring both technical skill and a calming presence."
  },
  {
    label: "Studio Room for Rent (Beauty Space)",
    value: "studio-room",
    title: "Private Studio Room Available - Established Beauty Center",
    summary: "Beautiful private room for rent in busy beauty center. Perfect for independent beauty professionals.",
    description: "Prime opportunity for beauty professionals looking to operate independently! We have a private studio room available for rent in our established, high-traffic beauty center.\n\nSpace details:\n- 120 sq ft private room\n- Built-in cabinetry and sink\n- Large mirror with excellent lighting\n- Shared reception and waiting area\n- 24/7 secure access\n- Utilities included\n- WiFi and marketing support available\n\nIdeal for:\n- Estheticians\n- Lash artists\n- Permanent makeup specialists\n- Microblading artists\n- Massage therapists\n- Brow specialists",
    salary: "$900/month (weekly and daily options available)",
    message: "We've created a supportive community of beauty entrepreneurs who respect each other's businesses while enjoying the benefits of a shared, professional location."
  }
];

const JobForm: React.FC<JobFormProps> = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads, 
  isSubmitting, 
  defaultValues = {},
  industry = "nails",
  userProfile
}) => {
  const [showPolishedModal, setShowPolishedModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const titleInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: defaultValues.title || "",
      description: defaultValues.description || "",
      location: defaultValues.location || "",
      salary: defaultValues.salary || "",
      contactEmail: defaultValues.contactEmail || (userProfile?.email || ""),
      phoneNumber: defaultValues.phoneNumber || (userProfile?.phoneNumber || ""),
      jobType: defaultValues.jobType || "full-time",
      jobSummary: defaultValues.jobSummary || "",
      heartfeltMessage: defaultValues.heartfeltMessage || "",
      isUrgent: defaultValues.isUrgent || false,
    },
  });

  // When template changes, update form values
  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value);
    
    const selectedTemplate = JOB_TEMPLATES.find(template => template.value === value);
    if (selectedTemplate && value !== "") {
      form.setValue("title", selectedTemplate.title);
      form.setValue("jobSummary", selectedTemplate.summary);
      form.setValue("description", selectedTemplate.description);
      
      if (selectedTemplate.salary) {
        form.setValue("salary", selectedTemplate.salary);
      }
      
      if (selectedTemplate.message) {
        form.setValue("heartfeltMessage", selectedTemplate.message);
      }
      
      // Scroll to title input for editing
      setTimeout(() => {
        if (titleInputRef.current) {
          titleInputRef.current.focus();
          titleInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  const handlePolishClick = () => {
    const description = form.getValues("description");
    setCurrentDescription(description);
    setShowPolishedModal(true);
  };

  const handleSelectPolishedVersion = (newDescription: string) => {
    form.setValue("description", newDescription);
    setShowPolishedModal(false);
  };

  const polishedVersions = [
    {
      theme: "Friendly & Welcoming",
      icon: <Heart className="h-4 w-4 text-rose-500" />,
      description: currentDescription ? `${currentDescription}\n\nWe're a friendly, supportive team looking for someone who loves what they do! You'll be welcomed into our salon family where we celebrate each other's successes and grow together. We believe in creating a positive environment where both our team and clients feel valued and appreciated.` : "",
    },
    {
      theme: "Professional & Established",
      icon: <Award className="h-4 w-4 text-blue-500" />,
      description: currentDescription ? `${currentDescription}\n\nWith over 10 years in the industry, our established salon provides a professional environment where excellence is standard. We maintain high standards and offer continuous professional development opportunities. Our reputation for quality has built a loyal client base that values expertise and professionalism.` : "",
    },
    {
      theme: "Growth & Opportunity",
      icon: <Target className="h-4 w-4 text-green-500" />,
      description: currentDescription ? `${currentDescription}\n\nThis role offers exceptional growth potential for the right candidate. We believe in promoting from within and providing clear advancement paths. You'll receive mentorship from industry veterans and opportunities to expand your skills and clientele. Ambitious professionals will thrive in our growth-oriented environment.` : "",
    },
    {
      theme: "Luxury & Premium",
      icon: <Gem className="h-4 w-4 text-purple-500" />,
      description: currentDescription ? `${currentDescription}\n\nJoin our premium salon where we cater to discerning clients who expect excellence. Our elegant, well-appointed space reflects the high-end services we provide. As a team member, you'll work with top-tier products and a clientele that appreciates and rewards quality craftsmanship and attention to detail.` : "",
    },
    {
      theme: "Urgent Hiring Need",
      icon: <Flame className="h-4 w-4 text-orange-500" />,
      description: currentDescription ? `${currentDescription}\n\nIMMEDIATE OPPORTUNITY! Due to increasing demand, we need to fill this position quickly. The right candidate can start immediately with an expedited onboarding process. This urgent opening comes with fast-track training and immediate client bookings. Don't miss this chance to join our busy, successful team right away!` : "",
    },
    {
      theme: "Work-Life Balance",
      icon: <Clock className="h-4 w-4 text-indigo-500" />,
      description: currentDescription ? `${currentDescription}\n\nWe understand that life extends beyond work. Our salon prioritizes reasonable hours, flexible scheduling options, and respects personal time. We've created a sustainable work environment where you can build a rewarding career while maintaining your personal commitments and avoiding burnout.` : "",
    },
    {
      theme: "High Earning Potential",
      icon: <Sparkles className="h-4 w-4 text-amber-500" />,
      description: currentDescription ? `${currentDescription}\n\nThis position offers exceptional earning potential for motivated professionals. Beyond the competitive base compensation, you'll benefit from our busy location, generous commission structure, and abundant opportunities for tips. Top performers in our salon regularly exceed industry standard incomes.` : "",
    },
    {
      theme: "Learning & Development",
      icon: <Lightbulb className="h-4 w-4 text-yellow-500" />,
      description: currentDescription ? `${currentDescription}\n\nWe invest heavily in our team's ongoing education. You'll receive regular training on the latest techniques and trends, with opportunities to attend industry events and certification courses. We believe that continuous learning is essential for career growth and client satisfaction.` : "",
    },
    {
      theme: "SEO Optimized",
      icon: <Search className="h-4 w-4 text-emerald-500" />,
      description: currentDescription ? `${currentDescription}\n\nJoin our highly-rated nail salon [city location] specializing in acrylic nails, gel manicures, pedicures, and nail art. We offer competitive compensation for licensed nail technicians with experience in Vietnamese techniques. Our busy salon environment provides consistent clientele, guaranteed hourly rates plus tips, and opportunities for career advancement.` : "",
    },
    {
      theme: "Community & Team Spirit",
      icon: <Heart className="h-4 w-4 text-pink-500" />,
      description: currentDescription ? `${currentDescription}\n\nWe're more than colleagues – we're a community that supports each other professionally and personally. Our team celebrates birthdays, shares meals, and collaborates on creative projects. We believe a strong salon culture leads to better client experiences and more fulfilling careers for our team members.` : "",
    },
  ];

  // Photo upload handling would go here

  return (
    <>
      <div className="space-y-8">
        {/* Step tracker */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center w-full max-w-md">
            <div className="flex flex-col items-center flex-1">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                1
              </div>
              <div className="text-xs mt-1 text-primary font-medium">Job Info</div>
            </div>
            <div className="h-1 flex-1 bg-muted mx-2">
              <div className="h-full w-0 bg-primary"></div>
            </div>
            <div className="flex flex-col items-center flex-1">
              <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center">
                2
              </div>
              <div className="text-xs mt-1 text-muted-foreground">Add Photos</div>
            </div>
            <div className="h-1 flex-1 bg-muted mx-2">
              <div className="h-full w-0 bg-primary"></div>
            </div>
            <div className="flex flex-col items-center flex-1">
              <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center">
                3
              </div>
              <div className="text-xs mt-1 text-muted-foreground">Choose Pricing</div>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Template selection */}
            <div className="space-y-1.5">
              <label htmlFor="template" className="text-sm font-medium flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Start with a Template
              </label>
              <Select
                value={selectedTemplate}
                onValueChange={handleTemplateChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a template..." />
                </SelectTrigger>
                <SelectContent>
                  {JOB_TEMPLATES.map((template) => (
                    <SelectItem key={template.value} value={template.value}>
                      {template.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input 
                      ref={titleInputRef}
                      placeholder="e.g., Experienced Nail Technician" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Summary */}
            <FormField
              control={form.control}
              name="jobSummary"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>Job Summary</FormLabel>
                    <FormField
                      control={form.control}
                      name="isUrgent"
                      render={({ field: urgentField }) => (
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="urgentJob"
                            checked={urgentField.value}
                            onCheckedChange={urgentField.onChange}
                          />
                          <label
                            htmlFor="urgentJob"
                            className="text-sm font-medium flex items-center"
                          >
                            <Flame className="h-4 w-4 mr-1 text-orange-500" />
                            Mark as Urgent
                          </label>
                        </div>
                      )}
                    />
                  </div>
                  <FormControl>
                    <Input 
                      placeholder="Brief summary of the position (appears in search results)" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>Job Description</FormLabel>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={handlePolishClick}
                      className="flex items-center gap-1"
                    >
                      <Sparkles className="h-4 w-4 text-amber-500" />
                      <span className="hidden sm:inline">Polish with AI</span>
                      <span className="sm:hidden">Polish</span>
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Detailed job description, requirements, responsibilities..."
                      className="min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Heartfelt Message */}
            <FormField
              control={form.control}
              name="heartfeltMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4 text-rose-500" />
                      Optional: Say something from the heart
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="We're a family-run salon and care deeply about our team..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="City, State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Salary */}
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-1.5">
                    <FormLabel>Salary or Pay Range</FormLabel>
                    <div className="relative group">
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      <div className="hidden group-hover:block absolute z-50 bottom-full mb-2 p-2 bg-white border rounded shadow-lg w-60 text-xs">
                        We only show this to verified artists after your job is live. Helps reduce back-and-forth.
                      </div>
                    </div>
                  </div>
                  <FormControl>
                    <Input placeholder="e.g., $25-30/hr or $800-1000/week + tips" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Job Type */}
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact Email */}
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-1.5">
                    <FormLabel>Phone Number</FormLabel>
                    <div className="relative group">
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      <div className="hidden group-hover:block absolute z-50 bottom-full mb-2 p-2 bg-white border rounded shadow-lg w-60 text-xs">
                        We only show this to verified artists after your job is live. Helps reduce back-and-forth.
                      </div>
                    </div>
                  </div>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <div className="flex justify-between pt-6">
              <Button type="button" variant="outline">
                Preview
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Continue to Pricing"}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* Polish Modal */}
      <PolishedDescriptionsModal 
        isOpen={showPolishedModal}
        onClose={() => setShowPolishedModal(false)}
        originalDescription={currentDescription}
        polishedVersions={polishedVersions}
        onSelectVersion={handleSelectPolishedVersion}
      />
    </>
  );
};

export default JobForm;

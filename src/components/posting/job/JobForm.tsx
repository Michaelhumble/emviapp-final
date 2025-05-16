
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { JobFormValues } from './jobFormSchema';
import { useTranslation } from '@/hooks/useTranslation';
import { Check, Lock, Sparkles, ChevronDown, CheckCircle2 } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { MobileButton } from '@/components/ui/mobile-button';

// Industry template data
const INDUSTRY_TEMPLATES = {
  nails: {
    title: "Experienced Nail Technician - High Tips & Benefits",
    description: "Join our luxury nail salon in a high-traffic area with consistent clientele. We're looking for a detail-oriented nail technician who takes pride in their work. Our clients love our relaxing atmosphere and exceptional service.\n\nWe offer competitive pay, flexible scheduling, and a supportive team environment. Bonus opportunities available for client retention and retail sales.",
    employment_type: "full-time",
    experience_level: "intermediate",
    salary_range: "$800-1,200/week + tips"
  },
  hair: {
    title: "Creative Hair Stylist - Upscale Salon",
    description: "Are you passionate about creating beautiful hair transformations? Our established salon is seeking a talented hair stylist to join our friendly, collaborative team. We provide ongoing education and growth opportunities.\n\nYou'll enjoy a steady client base, modern facilities, and excellent product support. Build your career with us in a positive, drama-free workplace.",
    employment_type: "full-time",
    experience_level: "experienced",
    salary_range: "60% commission + tips"
  },
  lashes: {
    title: "Lash Artist - Flexible Hours",
    description: "We're expanding our team with a skilled lash artist who delivers exceptional, long-lasting extensions. Our boutique studio focuses on quality work and client comfort. You'll work in a clean, organized space with top-tier products.\n\nIdeal for someone who values precision, client relationships, and creating beautiful results that bring clients back.",
    employment_type: "part-time",
    experience_level: "intermediate",
    salary_range: "$25-35/hr + tips"
  },
  massage: {
    title: "Licensed Massage Therapist - Steady Bookings",
    description: "Join our wellness center as a massage therapist where you'll be appreciated for your healing touch. We provide a peaceful work environment, consistent appointment scheduling, and fair compensation.\n\nWe handle all marketing, booking, and admin work so you can focus on what you do best. Great opportunity for those seeking work-life balance.",
    employment_type: "part-time",
    experience_level: "experienced",
    salary_range: "$40-60/hr + gratuity"
  },
  tattoo: {
    title: "Tattoo Artist - Established Studio",
    description: "Our popular tattoo studio is looking for a talented artist to join our team. We have a strong social media presence and loyal clientele. We value creativity, professionalism, and positive energy.\n\nYou'll have your own dedicated space, freedom to develop your unique style, and fair profit sharing with minimal studio fees.",
    employment_type: "contract",
    experience_level: "experienced",
    salary_range: "60/40 split - artist favored"
  },
  brows: {
    title: "Brow Specialist - Growing Business",
    description: "Become part of our specialized brow studio! We're seeking a detail-oriented professional skilled in microblading, tinting, and brow shaping. Our clients are loyal and appreciate quality work.\n\nYou'll enjoy a beautifully designed workspace, online booking system, and social media promotion of your portfolio.",
    employment_type: "part-time",
    experience_level: "intermediate",
    salary_range: "$25-40/hr + commission"
  },
  skincare: {
    title: "Esthetician - Luxury Spa Environment",
    description: "Our upscale skincare studio is looking for a knowledgeable esthetician who delivers transformative facials and skin treatments. We've created a serene space where clients feel pampered and valued.\n\nWe offer competitive pay, product bonuses, and a drama-free workplace where your expertise is respected.",
    employment_type: "full-time",
    experience_level: "experienced",
    salary_range: "Base + commission + retail incentives"
  }
};

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
}

export const JobForm: React.FC<JobFormProps> = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads, 
  isSubmitting 
}) => {
  const { t } = useTranslation();
  
  // Form state
  const [formValues, setFormValues] = useState<Partial<JobFormValues>>({
    title: '',
    description: '',
    location: '',
    salary: '',
    jobType: 'full-time',
    experience_level: 'intermediate',
  });

  // Expanded state for the template selector
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  
  // AI polish loading state
  const [isPolishing, setIsPolishing] = useState(false);
  
  const handleChange = (field: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleTemplateSelect = (industry: keyof typeof INDUSTRY_TEMPLATES) => {
    const template = INDUSTRY_TEMPLATES[industry];
    setFormValues(prev => ({
      ...prev,
      title: template.title,
      description: template.description,
      jobType: template.employment_type,
      experience_level: template.experience_level,
      salary: template.salary_range
    }));
    setIsTemplatesOpen(false);
  };
  
  const handlePolishWithAI = () => {
    setIsPolishing(true);
    
    // Simulate AI processing with a timeout
    setTimeout(() => {
      // Enhanced version of whatever is in the description field
      const enhancedDescription = formValues.description ? 
        `${formValues.description}\n\nWe offer a supportive, positive work environment where your skills are valued and your growth is encouraged. Our team is friendly and collaborative, and we pride ourselves on work-life balance. Clients love our atmosphere and consistently leave glowing reviews.` : 
        "We're looking for a talented professional to join our amazing team! Our salon offers a supportive, positive work environment where your skills are valued and your growth is encouraged. Our team is friendly and collaborative, and we pride ourselves on work-life balance. Clients love our atmosphere and consistently leave glowing reviews.";
      
      setFormValues(prev => ({
        ...prev,
        description: enhancedDescription
      }));
      
      setIsPolishing(false);
    }, 1500);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create the form values object from the current state
    const submissionValues: JobFormValues = {
      title: formValues.title || '',
      description: formValues.description || '',
      location: formValues.location || '',
      salary: formValues.salary || '',
      jobType: formValues.jobType || 'full-time',
      contactEmail: formValues.contactEmail || '',
      requirements: []
    };
    
    onSubmit(submissionValues);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      {/* Section 1: Billion-Dollar Intro */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold bg-gradient-to-r from-emvi-accent to-purple-600 bg-clip-text text-transparent">
          Post a Job
        </h1>
        <p className="mt-3 text-gray-600 max-w-lg mx-auto">
          Quickly attract the best beauty professionals with one simple post.
        </p>
      </div>
      
      {/* Section 2: Form Fields with microcopy */}
      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl p-6 shadow-sm">
        {/* Industry Templates Section */}
        <Collapsible
          open={isTemplatesOpen}
          onOpenChange={setIsTemplatesOpen}
          className="mb-8 border border-gray-100 rounded-xl overflow-hidden"
        >
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-white border-b cursor-pointer hover:bg-purple-50 transition-colors">
              <div className="flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-emvi-accent" />
                <span className="font-medium">Quick-start with industry templates</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isTemplatesOpen ? 'transform rotate-180' : ''}`} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.keys(INDUSTRY_TEMPLATES).map((industry) => (
                <button
                  key={industry}
                  type="button"
                  onClick={() => handleTemplateSelect(industry as keyof typeof INDUSTRY_TEMPLATES)}
                  className="px-4 py-3 rounded-lg border border-gray-100 hover:border-emvi-accent/50 hover:bg-purple-50 transition-all text-sm font-medium flex flex-col items-center"
                >
                  <span className="text-gray-800 capitalize">{industry}</span>
                </button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        {/* Title Field */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-gray-800 font-medium">
            Job Title
          </Label>
          <Input
            id="title"
            value={formValues.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g., Hiring Full-Time Nail Tech – High Tip Area"
            className="w-full bg-gray-50"
            disabled={isSubmitting}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            A clear, specific title attracts 3x more qualified candidates.
          </p>
        </div>
        
        {/* Description Field */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-gray-800 font-medium">
            Job Description
          </Label>
          <Textarea
            id="description"
            value={formValues.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Tell candidates what makes your salon great. Be honest, clear, and human."
            className="min-h-[150px] bg-gray-50"
            disabled={isSubmitting}
            required
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500">
              Include responsibilities, benefits, and salon culture.
            </p>
            <Button 
              type="button"
              size="sm"
              variant="outline"
              onClick={handlePolishWithAI}
              disabled={isPolishing || isSubmitting}
              className="text-xs flex items-center gap-1 border-emvi-accent/30 text-emvi-accent hover:text-emvi-accent/80"
            >
              {isPolishing ? (
                <span className="flex items-center gap-1">
                  <span className="animate-pulse">Enhancing...</span>
                </span>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Polish with AI</span>
                </>
              )}
            </Button>
          </div>
        </div>
        
        {/* Location Field */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-gray-800 font-medium">
            Location
          </Label>
          <Input
            id="location"
            value={formValues.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="City, state, or neighborhood"
            className="bg-gray-50"
            disabled={isSubmitting}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Be specific to attract local talent (e.g., "Downtown Miami" or "Buckhead, Atlanta").
          </p>
        </div>
        
        {/* Two-column layout for smaller fields on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Salary Range Field */}
          <div className="space-y-2">
            <Label htmlFor="salary" className="text-gray-800 font-medium">
              Salary Range
            </Label>
            <Input
              id="salary"
              value={formValues.salary || ''}
              onChange={(e) => handleChange('salary', e.target.value)}
              placeholder="e.g., $1,000/week or 60/40 split + tips"
              className="bg-gray-50"
              disabled={isSubmitting}
            />
            <p className="text-xs text-gray-500 mt-1">
              Posts with transparent pay get 2x more applications.
            </p>
          </div>
          
          {/* Experience Level Field */}
          <div className="space-y-2">
            <Label htmlFor="experience" className="text-gray-800 font-medium">
              Experience Level
            </Label>
            <Select 
              value={formValues.experience_level || 'intermediate'}
              onValueChange={(value) => handleChange('experience_level', value)}
              disabled={isSubmitting}
            >
              <SelectTrigger id="experience" className="bg-gray-50">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry Level</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="experienced">Expert</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-1">
              Helps match with candidates at the right career stage.
            </p>
          </div>
          
          {/* Employment Type Field */}
          <div className="space-y-2">
            <Label htmlFor="jobType" className="text-gray-800 font-medium">
              Employment Type
            </Label>
            <Select 
              value={formValues.jobType || 'full-time'}
              onValueChange={(value) => handleChange('jobType', value)}
              disabled={isSubmitting}
            >
              <SelectTrigger id="jobType" className="bg-gray-50">
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-Time</SelectItem>
                <SelectItem value="part-time">Part-Time</SelectItem>
                <SelectItem value="booth-rental">Booth Rental</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-1">
              Clear expectations help find the right fit.
            </p>
          </div>
          
          {/* Contact Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-800 font-medium">
              Contact Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formValues.contactEmail || ''}
              onChange={(e) => handleChange('contactEmail', e.target.value)}
              placeholder="your@email.com"
              className="bg-gray-50"
              disabled={isSubmitting}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Where applications will be sent. Kept private until you respond.
            </p>
          </div>
        </div>
        
        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-gray-100 mt-8">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-xs text-gray-600">Trusted by 1,000+ salons</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-xs text-gray-600">50K+ beauty pros</span>
            </div>
          </div>
          
          {/* CTA Button */}
          <MobileButton 
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-emvi-accent to-purple-600 hover:opacity-90 transition-all text-white font-medium px-8 py-3 rounded-lg shadow-sm flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>Processing...</span>
            ) : (
              <>
                <span>Continue to Pricing</span>
                <Lock className="h-4 w-4 ml-1" />
              </>
            )}
          </MobileButton>
        </div>
      </form>
    </div>
  );
};

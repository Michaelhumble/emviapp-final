import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Loader2, AlertCircle, Wand2, Eye } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import NailJobPreviewCard from './NailJobPreviewCard';
import JobPricingTable from '@/components/posting/job/JobPricingTable';

const nailJobFormSchema = z.object({
  planType: z.enum(['free', 'paid'], { 
    required_error: "Please select a plan type" 
  }),
  title: z.string().optional(), // English title is optional
  vietnameseTitle: z.string().min(1, "Vietnamese title is required"),
  englishOnly: z.boolean().default(false),
  salonName: z.string().min(1, "Salon name is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().optional(), // English description is optional
  vietnameseDescription: z.string().min(10, "Vietnamese description must be at least 10 characters"),
  salaryRange: z.string().min(1, "Salary range is required"),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().optional(),
  contactNotes: z.string().optional(),
});

type NailJobFormValues = z.infer<typeof nailJobFormSchema>;

interface NailJobPostFormProps {
  onSubmit?: (data: NailJobFormValues) => void;
  editJobId?: string;
  editJobData?: any;
}

const NailJobPostForm: React.FC<NailJobPostFormProps> = ({ onSubmit, editJobId, editJobData }) => {
  const navigate = useNavigate();
  const { user, isSignedIn } = useAuth();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<'templates' | 'form' | 'pricing' | 'processing'>('templates');
  const [formData, setFormData] = useState<NailJobFormValues | null>(null);
  const [selectedPricing, setSelectedPricing] = useState<{
    tier: string;
    finalPrice: number;
    durationMonths: number;
  } | null>(null);
  const [hasPostedFreeJob, setHasPostedFreeJob] = useState(false);
  const [isLoadingFreeJobStatus, setIsLoadingFreeJobStatus] = useState(true);
  const [isGeneratingTranslation, setIsGeneratingTranslation] = useState(false);
  const [showTemplates, setShowTemplates] = useState(!editJobId);

  // Vietnamese job templates (real Facebook-style job ads)
  const vietnameseJobTemplates = [
    {
      id: 1,
      vietnameseTitle: "Cần Thợ Nail",
      title: "Nail Technician Needed",
      vietnameseDescription: "Tiệm đông khách, cần thợ biết làm bột hoặc tay chân nước.\nLàm việc full/part-time, chia turn công bằng, tip hậu.\nKhông khí vui vẻ, không drama, bao lương theo tay nghề.\nCó chỗ ở cho thợ ở xa.",
      description: "Busy salon looking for techs who know powder or pedicure/manicure.\nFull/part-time available, fair turn sharing, good tips.\nFun atmosphere, no drama, guaranteed salary based on skills.\nHousing available for out-of-town workers."
    },
    {
      id: 2,
      vietnameseTitle: "Tuyển Thợ Bột",
      title: "Powder Technician Wanted",
      vietnameseDescription: "Cần thợ bột, biết design càng tốt.\nKhách sang, tip cao, lương tuần ổn định.\nTiệm hỗ trợ supply, không trừ tiền clean-up.\nMôi trường làm việc hòa đồng, chủ dễ thương.",
      description: "Need powder tech, design skills preferred.\nUpscale clients, high tips, stable weekly pay.\nShop provides supplies, no cleanup fees.\nHarmonious work environment, friendly owner."
    },
    {
      id: 3,
      vietnameseTitle: "Tuyển Thợ Nail Làm Mọi Thứ",
      title: "All-Service Nail Technician",
      vietnameseDescription: "Tiệm cần thợ biết làm bột, dip, tay chân nước, wax càng tốt.\nThu nhập cao mùa hè, tip hậu, khách Mỹ trắng lịch sự.\nCó manager chia turn công bằng, không tranh giành.\nCó chỗ ở nếu cần, thu nhập ổn định quanh năm.",
      description: "Shop needs tech for powder, dip, mani/pedi, wax preferred.\nHigh summer income, great tips, polite American clients.\nManager ensures fair turn sharing, no competition.\nHousing available if needed, stable year-round income."
    },
    {
      id: 4,
      vietnameseTitle: "Cần Gấp Thợ Tay Chân Nước",
      title: "Urgently Need Mani/Pedi Tech",
      vietnameseDescription: "Cần thợ tay chân nước, làm part/full-time đều được.\nKhông cần kinh nghiệm nhiều, miễn vui vẻ, siêng năng.\nTiệm nhỏ, không cạnh tranh, chủ dễ chịu.\nKhông khí làm việc thân thiện, tip ổn định.",
      description: "Need mani/pedi tech, part/full-time available.\nDon't need much experience, just be cheerful and hardworking.\nSmall shop, no competition, easy-going owner.\nFriendly work atmosphere, steady tips."
    },
    {
      id: 5,
      vietnameseTitle: "Cần Thợ Nail Biết Design",
      title: "Nail Artist with Design Skills",
      vietnameseDescription: "Tiệm chuyên design, khách chịu chơi, tip cao.\nCần thợ biết design, acrylic, gel, dipping càng tốt.\nBao lương, hỗ trợ học thêm nếu cần, không trừ supply.\nKhông drama, chia turn rõ ràng.",
      description: "Design-focused salon, generous clients, high tips.\nNeed tech who knows design, acrylic, gel, dipping preferred.\nGuaranteed salary, training support if needed, no supply deductions.\nNo drama, clear turn scheduling."
    },
    {
      id: 6,
      vietnameseTitle: "Tuyển Thợ Nail Kinh Nghiệm",
      title: "Experienced Nail Technician",
      vietnameseDescription: "Cần thợ có tay nghề, ưu tiên biết vẽ, lấy shape chuẩn.\nKhách sang, tiệm sạch sẽ, thu nhập ổn định.\nTiệm hòa đồng, không drama, không trừ supply.\nCó phòng riêng tư cho thợ ở xa.",
      description: "Need skilled tech, drawing and shaping skills preferred.\nUpscale clients, clean salon, stable income.\nHarmonious shop, no drama, no supply deductions.\nPrivate room available for out-of-town workers."
    },
    {
      id: 7,
      vietnameseTitle: "Tuyển Thợ Nail Làm Full/Part Time",
      title: "Full/Part Time Nail Tech",
      vietnameseDescription: "Cần thợ nam/nữ, không yêu cầu tuổi tác, làm full hoặc part-time.\nTiệm nhỏ, không khí vui vẻ, không cạnh tranh.\nTip hậu, lương chia theo tay nghề, bao lương nếu cần.\nChủ hỗ trợ chỗ ở, môi trường thân thiện.",
      description: "Need male/female tech, no age requirement, full or part-time.\nSmall shop, fun atmosphere, no competition.\nGood tips, pay based on skills, salary guarantee available.\nOwner provides housing support, friendly environment."
    },
    {
      id: 8,
      vietnameseTitle: "Cần Thợ Làm Dip Powder",
      title: "Dip Powder Specialist",
      vietnameseDescription: "Tiệm đông khách, ưu tiên thợ biết dip powder, bột, design đơn giản.\nKhách ổn định, tip cao, lương tuần hấp dẫn.\nKhông trừ supply, chủ vui vẻ, sẵn sàng hướng dẫn thêm.\nThu nhập ổn định quanh năm.",
      description: "Busy salon, prefer tech who knows dip powder, acrylic, simple design.\nSteady clients, high tips, attractive weekly pay.\nNo supply deductions, cheerful owner, willing to provide additional training.\nStable year-round income."
    },
    {
      id: 9,
      vietnameseTitle: "Tìm Người Làm Nail Chuyên Nghiệp",
      title: "Professional Nail Tech Wanted",
      vietnameseDescription: "Cần thợ biết làm everything, vẽ, design càng tốt.\nTiệm khu Mỹ trắng, khách dễ thương, tip hậu.\nKhông tranh giành, chia turn công bằng, không trừ supply.\nChủ thân thiện, hỗ trợ chỗ ở nếu cần.",
      description: "Need tech who does everything, drawing and design skills preferred.\nShop in American area, nice clients, great tips.\nNo competition, fair turn sharing, no supply deductions.\nFriendly owner, housing support available if needed."
    },
    {
      id: 10,
      vietnameseTitle: "Tuyển Thợ Nail Đi Làm Ngay",
      title: "Nail Tech - Start Immediately",
      vietnameseDescription: "Tiệm cần gấp thợ nail, có kinh nghiệm càng tốt.\nKhách ổn định, môi trường thoải mái, không áp lực.\nChủ dễ thương, đồng nghiệp thân thiện.\nThu nhập ổn định, có bonus hàng tuần.",
      description: "Shop urgently needs nail tech, experience preferred.\nSteady clients, comfortable environment, no pressure.\nSweet owner, friendly coworkers.\nStable income with weekly bonuses."
    }
  ];

  const form = useForm<NailJobFormValues>({
    resolver: zodResolver(nailJobFormSchema),
    defaultValues: {
      planType: editJobData?.pricing_tier || 'free',
      title: editJobData?.title || '',
      vietnameseTitle: editJobData?.vietnamese_title || '',
      englishOnly: false,
      salonName: editJobData?.contact_info?.salon_name || '',
      location: editJobData?.location || '',
      description: editJobData?.description || '',
      vietnameseDescription: editJobData?.vietnamese_description || '',
      salaryRange: editJobData?.compensation_details || '',
      contactName: editJobData?.contact_info?.owner_name || '',
      contactPhone: editJobData?.contact_info?.phone || '',
      contactEmail: editJobData?.contact_info?.email || '',
      contactNotes: editJobData?.contact_info?.notes || '',
    }
  });

  // If editing, skip templates and go to form
  useEffect(() => {
    if (editJobId && editJobData) {
      setCurrentStep('form');
      setShowTemplates(false);
    }
  }, [editJobId, editJobData]);

  const selectedPlan = form.watch('planType');
  const englishOnly = form.watch('englishOnly');
  const currentTitle = form.watch('title');
  const currentDescription = form.watch('description');
  const currentVietnameseTitle = form.watch('vietnameseTitle');
  const currentVietnameseDescription = form.watch('vietnameseDescription');
  const currentSalaryRange = form.watch('salaryRange');
  const currentSalonName = form.watch('salonName');
  const currentLocation = form.watch('location');
  const currentContactName = form.watch('contactName');
  const currentContactPhone = form.watch('contactPhone');
  const currentContactEmail = form.watch('contactEmail');

  // Check if user has already posted a free job
  useEffect(() => {
    const checkFreeJobStatus = async () => {
      if (!isSignedIn || !user) {
        setIsLoadingFreeJobStatus(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('user_id', user.id)
          .eq('pricing_tier', 'free')
          .eq('status', 'active')
          .limit(1);

        if (error) {
          console.error('Error checking free job status:', error);
          setIsLoadingFreeJobStatus(false);
          return;
        }

        const hasFreeJob = data && data.length > 0;
        setHasPostedFreeJob(hasFreeJob);
        if (hasFreeJob) {
          form.setValue('planType', 'paid');
        }
      } catch (error) {
        console.error('Unexpected error checking free job status:', error);
      } finally {
        setIsLoadingFreeJobStatus(false);
      }
    };

    checkFreeJobStatus();
  }, [isSignedIn, user, form]);

  // Auto-generate Vietnamese translation (simulated)
  const generateVietnameseTranslation = async () => {
    if (!currentTitle || (!currentDescription && !englishOnly)) return;
    
    setIsGeneratingTranslation(true);
    
    // Simulate AI translation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple translation mappings for demo
    const titleTranslations: Record<string, string> = {
      'nail technician': 'Thợ nail',
      'nail tech': 'Thợ nail',
      'manicurist': 'Thợ làm móng',
      'pedicurist': 'Thợ làm móng chân',
    };
    
    const vietnameseTitle = titleTranslations[currentTitle.toLowerCase()] || `Tuyển ${currentTitle}`;
    form.setValue('vietnameseTitle', vietnameseTitle);
    
    if (currentDescription && !englishOnly) {
      const vietnameseDesc = `Chúng tôi đang tìm kiếm một thợ nail có kinh nghiệm để gia nhập đội ngũ của chúng tôi. ${currentDescription.includes('experience') ? 'Cần có kinh nghiệm làm việc.' : ''} Lương hấp dẫn và môi trường làm việc thân thiện.`;
      form.setValue('vietnameseDescription', vietnameseDesc);
    }
    
    setIsGeneratingTranslation(false);
    toast.success('Vietnamese translation generated!');
  };

  // Format salary with /tuần suffix (only add once)
  const formatSalaryForNails = (salary: string) => {
    if (!salary) return '';
    const trimmedSalary = salary.trim();
    if (trimmedSalary.endsWith('/tuần') || trimmedSalary.endsWith('/ngày')) return trimmedSalary;
    
    // Check if it already has a frequency indicator
    if (trimmedSalary.includes('/')) return trimmedSalary;
    
    return `${trimmedSalary}/tuần`;
  };

  // Handle salary input with auto-formatting on blur
  const handleSalaryBlur = (field: any) => {
    const currentValue = field.value;
    if (currentValue && !currentValue.includes('/tuần') && !currentValue.includes('/ngày') && !currentValue.includes('/')) {
      field.onChange(formatSalaryForNails(currentValue));
    }
  };

  // Apply template to form
  const applyTemplate = (template: typeof vietnameseJobTemplates[0]) => {
    form.setValue('vietnameseTitle', template.vietnameseTitle);
    form.setValue('title', template.title);
    form.setValue('vietnameseDescription', template.vietnameseDescription);
    form.setValue('description', template.description);
    // Templates don't include salary - user must fill this manually
    setCurrentStep('form');
    toast.success('Template applied successfully!');
  };

  // Skip templates and start from blank form
  const startFromBlank = () => {
    setCurrentStep('form');
  };

  const handleFormSubmit = (data: NailJobFormValues) => {
    console.log('Nail job form submitted:', data);
    
    // Validate required Vietnamese fields
    if (!data.vietnameseTitle?.trim()) {
      toast.error('Vietnamese title is required');
      return;
    }
    if (!data.vietnameseDescription?.trim()) {
      toast.error('Vietnamese description is required');
      return;
    }
    
    // Validate required basic fields
    if (!data.salonName?.trim()) {
      toast.error('Salon name is required');
      return;
    }
    if (!data.location?.trim()) {
      toast.error('Location is required');
      return;
    }
    if (!data.salaryRange?.trim()) {
      toast.error('Salary range is required');
      return;
    }
    
    setFormData(data);
    
    if (data.planType === 'paid') {
      setCurrentStep('pricing');
    } else {
      // Submit free job directly
      submitFreeNailJob(data);
    }
  };

  const submitFreeNailJob = async (data: NailJobFormValues) => {
    if (!isSignedIn || !user) {
      toast.error('You must be logged in to post a job');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        title: data.title?.trim() || data.vietnameseTitle?.trim() || '',
        category: 'Nails',
        location: data.location.trim(),
        description: data.description?.trim() || data.vietnameseDescription?.trim() || '',
        vietnamese_title: data.vietnameseTitle?.trim(),
        vietnamese_description: data.vietnameseDescription?.trim(),
        compensation_details: formatSalaryForNails(data.salaryRange),
        contact_info: {
          owner_name: data.contactName?.trim() || '',
          phone: data.contactPhone?.trim() || '',
          email: data.contactEmail?.trim() || '',
          notes: data.contactNotes?.trim() || '',
          salon_name: data.salonName?.trim() || ''
        },
        user_id: user.id,
        status: 'active',
        pricing_tier: 'free'
      };

      if (editJobId) {
        // Update existing job
        const { data: updateData, error } = await supabase
          .from('jobs')
          .update(payload)
          .eq('id', editJobId)
          .eq('user_id', user.id)
          .select();

        if (error) {
          console.error('Error updating nail job:', error);
          toast.error(`Failed to update job: ${error.message}`);
          return;
        }

        toast.success('Nail tech job updated successfully!');
        navigate('/nails-job-success', { 
          state: { 
            jobId: updateData[0].id,
            jobData: updateData[0],
            isEdit: true
          }
        });
      } else {
        // Create new job
        const { data: insertData, error } = await supabase
          .from('jobs')
          .insert([payload])
          .select();

        if (error) {
          console.error('Error creating nail job:', error);
          toast.error(`Failed to create job: ${error.message}`);
          return;
        }

        toast.success('Nail tech job posted successfully!');
        navigate('/nails-job-success', { 
          state: { 
            jobId: insertData[0].id,
            jobData: insertData[0]
          }
        });
      }

    } catch (error) {
      console.error('Unexpected error with nail job:', error);
      toast.error('Failed to save job posting');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePricingSelect = async (tier: string, finalPrice: number, durationMonths: number) => {
    if (!formData) return;

    setSelectedPricing({ tier, finalPrice, durationMonths });
    setCurrentStep('processing');

    try {
      if (!user) {
        toast.error('Please log in to continue');
        navigate('/login');
        return;
      }

      // Create Stripe checkout session for paid nail job
      const { data, error } = await supabase.functions.invoke('create-job-checkout', {
        body: {
          tier,
          finalPrice,
          durationMonths,
          jobData: {
            ...formData,
            category: 'Nails',
            compensation_details: formatSalaryForNails(formData.salaryRange),
            vietnamese_title: formData.vietnameseTitle,
            vietnamese_description: formData.vietnameseDescription,
          }
        }
      });

      if (error) {
        console.error('Stripe checkout error:', error);
        toast.error('Failed to create payment session');
        setCurrentStep('pricing');
        return;
      }

      if (data?.url) {
        toast.success('Redirecting to secure payment...');
        window.location.href = data.url;
      } else {
        toast.error('No checkout URL received');
        setCurrentStep('pricing');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment processing failed');
      setCurrentStep('pricing');
    }
  };

  if (isLoadingFreeJobStatus) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50/30 to-indigo-50/20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (currentStep === 'processing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50/30 to-indigo-50/20 flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">
            Redirecting to secure payment...
          </p>
          <p className="text-sm text-gray-500 mt-2">This will only take a moment</p>
        </div>
      </div>
    );
  }

  // Template Selection Step
  if (currentStep === 'templates' && showTemplates) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50/30 to-indigo-50/20">
        <div className="container mx-auto py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose a Job Template</h1>
              <p className="text-gray-600">Select a pre-written template or start from scratch</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {vietnameseJobTemplates.map((template) => (
                <Card 
                  key={template.id} 
                  className="cursor-pointer hover:bg-purple-50 transition-colors border-purple-200 hover:border-purple-300"
                  onClick={() => applyTemplate(template)}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{template.vietnameseTitle}</h3>
                        <p className="text-sm text-gray-600 italic">{template.title}</p>
                      </div>
                      <p className="text-gray-700 text-sm line-clamp-3">{template.vietnameseDescription}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-purple-50 text-purple-700">Template #{template.id}</Badge>
                        <Button variant="outline" size="sm">
                          Use Template
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button 
                onClick={startFromBlank}
                variant="outline"
                size="lg"
                className="border-gray-300"
              >
                Start from Blank Form
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'pricing' && formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50/30 to-indigo-50/20">
        <div className="container mx-auto py-8">
          <div className="mb-6">
            <button
              onClick={() => setCurrentStep('form')}
              className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              ← Back to Job Details
            </button>
          </div>
          
          <JobPricingTable
            onPricingSelect={handlePricingSelect}
            jobData={formData}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50/30 to-indigo-50/20">
      <div className="container mx-auto py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a Nail Tech Job</h1>
            <p className="text-gray-600">Create a professional job listing for nail technicians</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <Card className="border-2 border-purple-200">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
                <CardTitle className="text-xl text-gray-900">Job Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
                    
                    {/* Plan Type Selection */}
                    <FormField
                      control={form.control}
                      name="planType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Plan Type</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            disabled={hasPostedFreeJob}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select plan type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="free" disabled={hasPostedFreeJob}>
                                Free Job Post {hasPostedFreeJob ? '(Already Used)' : ''}
                              </SelectItem>
                              <SelectItem value="paid">Paid Job Post</SelectItem>
                            </SelectContent>
                          </Select>
                          {hasPostedFreeJob && (
                            <p className="text-sm text-amber-600">
                              You've already posted a free job. Upgrade to paid for additional posts.
                            </p>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                     {/* Language Settings */}
                     <FormField
                       control={form.control}
                       name="englishOnly"
                       render={({ field }) => (
                         <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                           <div className="space-y-0.5">
                             <FormLabel className="text-base">Post in English also</FormLabel>
                             <p className="text-sm text-gray-500">
                               Check this to include English title and description
                             </p>
                           </div>
                           <FormControl>
                             <Switch
                               checked={field.value}
                               onCheckedChange={field.onChange}
                             />
                           </FormControl>
                         </FormItem>
                       )}
                     />

                      {/* Back to Templates */}
                      {!editJobId && (
                        <div className="text-center">
                          <Button 
                            type="button"
                            variant="outline"
                            onClick={() => setCurrentStep('templates')}
                            className="text-purple-600 border-purple-200"
                          >
                            ← Back to Templates
                          </Button>
                        </div>
                      )}

                     {/* Vietnamese Title - Required */}
                     <FormField
                       control={form.control}
                       name="vietnameseTitle"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Job Title (Vietnamese) *</FormLabel>
                           <div className="flex gap-2">
                             <FormControl>
                               <Input 
                                 placeholder="e.g., Thợ nail" 
                                 {...field}
                               />
                             </FormControl>
                             <Button
                               type="button"
                               variant="outline"
                               size="sm"
                               onClick={generateVietnameseTranslation}
                               disabled={isGeneratingTranslation || !currentTitle}
                               className="whitespace-nowrap"
                             >
                               {isGeneratingTranslation ? (
                                 <Loader2 className="h-4 w-4 animate-spin" />
                               ) : (
                                 <Wand2 className="h-4 w-4" />
                               )}
                               AI Translate
                             </Button>
                           </div>
                           <FormMessage />
                         </FormItem>
                       )}
                     />

                     {/* English Title - Optional */}
                     {englishOnly && (
                       <FormField
                         control={form.control}
                         name="title"
                         render={({ field }) => (
                           <FormItem>
                             <FormLabel>Job Title (English)</FormLabel>
                             <FormControl>
                               <Input 
                                 placeholder="e.g., Nail Technician" 
                                 {...field}
                               />
                             </FormControl>
                             <FormMessage />
                           </FormItem>
                         )}
                       />
                     )}

                    {/* Salon Name */}
                    <FormField
                      control={form.control}
                      name="salonName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Salon Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Magic Nails Spa" 
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
                          <FormLabel>Location *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Houston, TX" 
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                     {/* Salary Range */}
                     <FormField
                       control={form.control}
                       name="salaryRange"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Salary Range *</FormLabel>
                           <FormControl>
                             <Input 
                               placeholder="e.g., $1,500–$2,200" 
                               {...field}
                               onBlur={() => handleSalaryBlur(field)}
                             />
                           </FormControl>
                           <p className="text-xs text-gray-500">
                             Will automatically add "/tuần" when you finish typing
                           </p>
                           <FormMessage />
                         </FormItem>
                       )}
                     />

                     {/* Vietnamese Description - Required */}
                     <FormField
                       control={form.control}
                       name="vietnameseDescription"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Job Description (Vietnamese) *</FormLabel>
                           <FormControl>
                             <Textarea 
                               placeholder="Mô tả công việc, yêu cầu và quyền lợi..."
                               className="min-h-[100px]"
                               {...field}
                             />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />

                     {/* English Description - Optional */}
                     {englishOnly && (
                       <FormField
                         control={form.control}
                         name="description"
                         render={({ field }) => (
                           <FormItem>
                             <FormLabel>Job Description (English)</FormLabel>
                             <FormControl>
                               <Textarea 
                                 placeholder="Describe the job requirements, responsibilities, and benefits..."
                                 className="min-h-[100px]"
                                 {...field}
                               />
                             </FormControl>
                             <FormMessage />
                           </FormItem>
                         )}
                       />
                     )}

                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                      
                      <FormField
                        control={form.control}
                        name="contactName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="(XXX) XXX-XXXX" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Posting Job...
                        </>
                      ) : selectedPlan === 'paid' ? (
                        'Continue to Pricing'
                      ) : (
                        'Post Free Job'
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Live Preview */}
            <div className="space-y-6">
              <Card className="border-2 border-green-200">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Live Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                   <NailJobPreviewCard
                     title={currentTitle}
                     vietnameseTitle={currentVietnameseTitle}
                     salonName={currentSalonName}
                     location={currentLocation}
                     description={currentDescription}
                     vietnameseDescription={currentVietnameseDescription}
                     salaryRange={currentSalaryRange}
                     planType={selectedPlan}
                     englishOnly={englishOnly}
                     contactName={currentContactName}
                     contactPhone={currentContactPhone}
                     contactEmail={currentContactEmail}
                   />
                </CardContent>
              </Card>

              {selectedPlan === 'paid' && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Paid jobs get priority placement, longer duration, and include contact information for candidates.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NailJobPostForm;
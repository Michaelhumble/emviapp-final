import React, { useState, useCallback } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ImageIcon, Plus, Trash } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import { JobTypes } from './jobFormSchema';
import { JobType } from './jobFormSchema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from '@/components/ui/multiselect';
import { useTranslation } from '@/hooks/useTranslation';
import { uploadFiles, getImageData } from '@/utils/uploadthing';
// Import the Job type from our unified location
import { Job } from '@/types/job';

interface JobFormProps {
  onSubmit: (data: JobFormValues) => void;
  initialTemplate?: JobFormValues;
  onBack?: () => void;
  isCustomTemplate?: boolean;
  maxPhotos?: number;
  onStepChange?: (step: number) => void;
}

const JobForm: React.FC<JobFormProps> = (props) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: props.initialTemplate?.title || "",
      description: props.initialTemplate?.description || "",
      vietnameseDescription: props.initialTemplate?.vietnameseDescription || "",
      location: props.initialTemplate?.location || "",
      jobType: props.initialTemplate?.jobType || "",
      compensation_type: props.initialTemplate?.compensation_type || "",
      compensation_details: props.initialTemplate?.compensation_details || "",
      salary_range: props.initialTemplate?.salary_range || "",
      experience_level: props.initialTemplate?.experience_level || "",
      contactName: props.initialTemplate?.contactName || "",
      contactPhone: props.initialTemplate?.contactPhone || "",
      contactEmail: props.initialTemplate?.contactEmail || "",
      contactZalo: props.initialTemplate?.contactZalo || "",
      salonName: props.initialTemplate?.salonName || "",
      weekly_pay: props.initialTemplate?.weekly_pay || false,
      has_housing: props.initialTemplate?.has_housing || false,
      has_wax_room: props.initialTemplate?.has_wax_room || false,
      owner_will_train: props.initialTemplate?.owner_will_train || false,
      no_supply_deduction: props.initialTemplate?.no_supply_deduction || false,
      specialties: props.initialTemplate?.specialties || [],
      requirements: props.initialTemplate?.requirements || [],
    },
  });

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files || files.length === 0) return;

    if (photoUploads.length + files.length > (props.maxPhotos || 5)) {
      toast({
        title: "Too many photos",
        description: `You can only upload a maximum of ${props.maxPhotos || 5} photos.`,
      });
      return;
    }

    setUploading(true);
    try {
      setPhotoUploads((prevUploads) => [...prevUploads, ...files]);
      toast({
        title: "Photos added",
        description: "Photos have been added to the upload queue.",
      });
    } catch (error) {
      console.error("Error uploading photos:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading the photos. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = (indexToRemove: number) => {
    setPhotoUploads((prevUploads) => prevUploads.filter((_, index) => index !== indexToRemove));
  };

  // Fix the requirements filter issue by checking if it's an array first
  const handleRequirementsChange = (values: string[]) => {
    form.setValue("requirements", values);
  };

  // When rendering requirements in the form, safely handle both string and array types
  const displayRequirements = (requirements: string | string[] | undefined) => {
    if (!requirements) return [];
    
    if (Array.isArray(requirements)) {
      return requirements;
    }
    
    // If it's a string, split it by commas or new lines
    return requirements
      .split(/[,\n]+/)
      .map(item => item.trim())
      .filter(item => item !== '');
  };

  // When submitting the form, ensure templateType is properly handled
  const onSubmit = (values: JobFormValues) => {
    // Extract templateType before passing to onSubmit if needed
    const { templateType, ...submissionValues } = values;
    
    // Process requirements field
    let processedRequirements = values.requirements;
    if (typeof processedRequirements === 'string' && processedRequirements.trim() !== '') {
      processedRequirements = processedRequirements
        .split(/[,\n]+/)
        .map(item => item.trim())
        .filter(item => item !== '');
    }
    
    const finalValues = {
      ...submissionValues,
      requirements: processedRequirements
    };
    
    // Call the onSubmit prop with processed values
    props.onSubmit(finalValues);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>
              Enter the details about the job you are posting.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="salonName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t({
                    english: "Salon Name",
                    vietnamese: "Tên Salon"
                  })}</FormLabel>
                  <FormControl>
                    <Input placeholder={t({
                      english: "e.g., Beauty Nails Spa",
                      vietnamese: "vd., Beauty Nails Spa"
                    })} {...field} />
                  </FormControl>
                  <FormDescription>
                    {t({
                      english: "Enter the name of your salon or business",
                      vietnamese: "Nhập tên salon hoặc doanh nghiệp của bạn"
                    })}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Senior Nail Technician" {...field} />
                  </FormControl>
                  <FormDescription>
                    What is the position you're hiring for?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the job requirements and responsibilities" className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>
                    Include details about the role, responsibilities, and what makes it a great opportunity.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vietnameseDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vietnamese Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Mô tả công việc bằng tiếng Việt" className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide a description in Vietnamese to attract more candidates.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Ho Chi Minh City" {...field} />
                  </FormControl>
                  <FormDescription>
                    Where is the job located?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a job type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {JobTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    What type of employment is this?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="compensation_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compensation Type</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Hourly, Salary, Commission" {...field} />
                  </FormControl>
                  <FormDescription>
                    How will the employee be compensated?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="compensation_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compensation Details</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., $15/hour + tips" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide specific details about the compensation.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salary_range"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary Range</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., $30,000 - $40,000 per year" {...field} />
                  </FormControl>
                  <FormDescription>
                    What is the expected salary range for this position?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experience_level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience Level</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Entry-level, Mid-level, Senior-level" {...field} />
                  </FormControl>
                  <FormDescription>
                    What level of experience is required for this position?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Enter the contact information for this job posting.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., John Doe" {...field} />
                  </FormControl>
                  <FormDescription>
                    Who is the contact person for this job posting?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 123-456-7890" {...field} />
                  </FormControl>
                  <FormDescription>
                    What is the contact phone number for this job posting?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., john.doe@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    What is the contact email for this job posting?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactZalo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Zalo</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 1234567890" {...field} />
                  </FormControl>
                  <FormDescription>
                    What is the contact Zalo number for this job posting?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Benefits and Perks</CardTitle>
            <CardDescription>
              Select the benefits and perks that this job offers.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="weekly_pay"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm">Weekly Pay</FormLabel>
                      <FormDescription>
                        Does this job offer weekly pay?
                      </FormDescription>
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

              <FormField
                control={form.control}
                name="has_housing"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm">Has Housing</FormLabel>
                      <FormDescription>
                        Does this job offer housing?
                      </FormDescription>
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

              <FormField
                control={form.control}
                name="has_wax_room"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm">Has Wax Room</FormLabel>
                      <FormDescription>
                        Does this job have a wax room?
                      </FormDescription>
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

              <FormField
                control={form.control}
                name="owner_will_train"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm">Owner Will Train</FormLabel>
                      <FormDescription>
                        Will the owner train the employee?
                      </FormDescription>
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

              <FormField
                control={form.control}
                name="no_supply_deduction"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm">No Supply Deduction</FormLabel>
                      <FormDescription>
                        Is there no supply deduction for this job?
                      </FormDescription>
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
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Specialties and Requirements</CardTitle>
            <CardDescription>
              Enter the specialties and requirements for this job.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="specialties"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialties</FormLabel>
                  <MultiSelect
                    placeholder="Select specialties"
                    onValuesChange={field.onChange}
                    values={field.value || []}
                    options={[
                      { value: "manicures", label: "Manicures" },
                      { value: "pedicures", label: "Pedicures" },
                      { value: "nail_art", label: "Nail Art" },
                      { value: "acrylics", label: "Acrylics" },
                      { value: "haircuts", label: "Haircuts" },
                      { value: "hair_coloring", label: "Hair Coloring" },
                      { value: "styling", label: "Styling" },
                      { value: "blow_outs", label: "Blow-outs" },
                      { value: "eyelash_extensions", label: "Eyelash Extensions" },
                      { value: "lash_lifts", label: "Lash Lifts" },
                      { value: "facials", label: "Facials" },
                      { value: "waxing", label: "Waxing" },
                      { value: "massage", label: "Massage" },
                      { value: "tattoo", label: "Tattoo" },
                      { value: "brows", label: "Brows" },
                      { value: "skincare", label: "Skincare" },
                      { value: "barber", label: "Barber" },
                      { value: "makeup", label: "Makeup" },
                    ]}
                  />
                  <FormDescription>
                    What specialties are required for this job?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirements</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter requirements separated by commas or new lines"
                      className="resize-none"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    What are the requirements for this job?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Photos</CardTitle>
            <CardDescription>
              Upload photos to showcase the job or salon.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex items-center space-x-4">
              <Label htmlFor="photo-upload" className="cursor-pointer">
                <div className="inline-flex items-center rounded-md bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground hover:bg-muted/80">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  <span>Upload Photos</span>
                </div>
              </Label>
              <Input
                id="photo-upload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
              {uploading && (
                <div className="text-sm text-muted-foreground">
                  Uploading...
                </div>
              )}
            </div>

            {photoUploads.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {photoUploads.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Uploaded photo ${index + 1}`}
                      className="aspect-square rounded-md object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={() => removePhoto(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          {props.onBack && (
            <Button variant="outline" onClick={props.onBack}>
              Back
            </Button>
          )}
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default JobForm;

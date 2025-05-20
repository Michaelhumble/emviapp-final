import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues, JobTypes, IndustryTypes } from './jobFormSchema';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { MultiSelect } from "@/components/ui/multi-select"; // Updated path to match the file we identified

interface JobFormProps {
  initialValues?: JobFormValues;
  onSubmit: (data: JobFormValues) => void;
  isLoading?: boolean;
}

const JobForm: React.FC<JobFormProps> = ({ onSubmit, initialValues, isLoading }) => {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: initialValues || {
      title: '',
      description: '',
      location: '',
      jobType: '',
      compensation_type: '',
      compensation_details: '',
      salary_range: '',
      experience_level: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      contactZalo: '',
      salonName: '',
      weekly_pay: false,
      has_housing: false,
      has_wax_room: false,
      owner_will_train: false,
      no_supply_deduction: false,
      specialties: [],
      requirements: '',
      templateType: '',
    },
    mode: "onChange",
  });

  const industryOptions = IndustryTypes.map(industry => ({
    value: industry,
    label: industry.charAt(0).toUpperCase() + industry.slice(1)
  }));

  const handleSubmit = (values: JobFormValues) => {
    console.log("Form values being submitted:", values);
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter job title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter job description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vietnameseDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vietnamese Job Description (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Nhập mô tả công việc bằng tiếng Việt (tùy chọn)" {...field} />
              </FormControl>
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
                <Input placeholder="Enter location" {...field} />
              </FormControl>
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
                <Input placeholder="Enter compensation type" {...field} />
              </FormControl>
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
                <Input placeholder="Enter compensation details" {...field} />
              </FormControl>
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
                <Input placeholder="Enter salary range" {...field} />
              </FormControl>
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
                <Input placeholder="Enter experience level" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter contact name" {...field} />
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
              <FormLabel>Contact Phone</FormLabel>
              <FormControl>
                <Input placeholder="Enter contact phone" {...field} />
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
              <FormLabel>Contact Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter contact email" {...field} />
              </FormControl>
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
                <Input placeholder="Enter contact Zalo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="salonName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salon Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter salon name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center space-x-2">
          <FormField
            control={form.control}
            name="weekly_pay"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Weekly Pay</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="has_housing"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Has Housing</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="has_wax_room"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Has Wax Room</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="no_supply_deduction"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>No Supply Deduction</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="owner_will_train"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Owner Will Train</FormLabel>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="specialties"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specialties</FormLabel>
              <FormControl>
                <MultiSelect
                  options={industryOptions}
                  selected={field.value || []}
                  onChange={field.onChange}
                  placeholder="Select specialties"
                />
              </FormControl>
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
                <Textarea placeholder="Enter requirements" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default JobForm;

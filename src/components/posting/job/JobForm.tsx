import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SectionHeader from "../SectionHeader";
import { JobFormValues, jobFormSchema } from "./jobFormSchema";
import { useState } from "react";
import { PricingDisplay } from "../PricingDisplay";
import { Checkbox } from "@/components/ui/checkbox";
import { PricingMicroCopy } from "../PricingMicroCopy";
import BetterResultsBox from "./BetterResultsBox";

export const JobForm = ({ onSubmit, isSubmitting }) => {
  const [jobType, setJobType] = useState<string>("");
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      jobType: "",
      location: "",
      compensation: {
        type: "",
        hourlyRate: "",
        commissionType: "",
        commissionValue: "",
      },
      summary: "",
      description: "",
      contactInfo: {
        name: "",
        email: "",
        phone: "",
        preferredContact: "",
      },
      expireAfterDays: 30,
    },
  });

  const handleSubmit = async (values: JobFormValues) => {
    console.log("Form values:", values);
    console.log("Photo uploads:", photoUploads);
    
    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    onSubmit(values);
  };

  const handleCompensationTypeChange = (value: string) => {
    form.setValue("compensation.type", value);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Job Title Section */}
      <div className="space-y-6">
        <div>
          <Label htmlFor="title">Job Title *</Label>
          <Input
            id="title"
            placeholder="e.g. Experienced Nail Technician Needed"
            {...form.register("title")}
            className="mt-1.5"
          />
          {form.formState.errors.title && (
            <p className="text-sm text-red-500 mt-1">{form.formState.errors.title.message}</p>
          )}
        </div>

        {/* Job Type Section */}
        <div className="mb-6">
          <Label htmlFor="jobType">Job Type *</Label>
          <Select
            onValueChange={(value) => {
              setJobType(value);
              form.setValue("jobType", value);
            }}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fullTime">Full Time</SelectItem>
              <SelectItem value="partTime">Part Time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="booth">Booth Rental</SelectItem>
              <SelectItem value="commission">Commission</SelectItem>
            </SelectContent>
          </Select>
          {form.formState.errors.jobType && (
            <p className="text-sm text-red-500 mt-1">{form.formState.errors.jobType.message}</p>
          )}
        </div>

        {/* Location Section */}
        <div className="mb-6">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            placeholder="e.g. Los Angeles, CA"
            {...form.register("location")}
            className="mt-1.5"
          />
          {form.formState.errors.location && (
            <p className="text-sm text-red-500 mt-1">{form.formState.errors.location.message}</p>
          )}
        </div>

        {/* Compensation Section */}
        <div className="mb-6">
          <SectionHeader
            title="Compensation"
            emoji="💰"
            description="Let artists know what they can expect to earn"
          />

          <div className="mt-4">
            <Label htmlFor="compensationType">Compensation Type *</Label>
            <Select
              onValueChange={(value) => {
                form.setValue("compensation.type", value);
              }}
            >
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select compensation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="commission">Commission</SelectItem>
                <SelectItem value="mixed">Mixed (Commission + Base)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {form.watch("compensation.type") === "hourly" && (
            <div className="mt-4">
              <Label htmlFor="hourlyRate">Hourly Rate *</Label>
              <Input
                id="hourlyRate"
                placeholder="e.g. $20/hour"
                {...form.register("compensation.hourlyRate")}
                className="mt-1.5"
              />
              {form.formState.errors.compensation?.hourlyRate && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.compensation.hourlyRate.message}
                </p>
              )}
            </div>
          )}

          {form.watch("compensation.type") === "commission" && (
            <div className="mt-4">
              <Label htmlFor="commissionType">Commission Type *</Label>
              <Select
                onValueChange={(value) => {
                  form.setValue("compensation.commissionType", value);
                }}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select commission type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {form.watch("compensation.type") === "commission" &&
            form.watch("compensation.commissionType") === "percentage" && (
              <div className="mt-4">
                <Label htmlFor="commissionValue">Commission Percentage *</Label>
                <Input
                  id="commissionValue"
                  placeholder="e.g. 50%"
                  {...form.register("compensation.commissionValue")}
                  className="mt-1.5"
                />
                {form.formState.errors.compensation?.commissionValue && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.compensation.commissionValue.message}
                  </p>
                )}
              </div>
            )}

          {form.watch("compensation.type") === "commission" &&
            form.watch("compensation.commissionType") === "fixed" && (
              <div className="mt-4">
                <Label htmlFor="commissionValue">Commission Amount *</Label>
                <Input
                  id="commissionValue"
                  placeholder="e.g. $50 per service"
                  {...form.register("compensation.commissionValue")}
                  className="mt-1.5"
                />
                {form.formState.errors.compensation?.commissionValue && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.compensation.commissionValue.message}
                  </p>
                )}
              </div>
            )}
        </div>

        {/* Job Summary Section */}
        <div className="mb-6">
          <Label htmlFor="summary">
            Job Summary * <span className="text-sm text-muted-foreground">(1-2 sentences)</span>
          </Label>
          <Input
            id="summary"
            placeholder="Brief overview of the position"
            {...form.register("summary")}
            className="mt-1.5"
          />
          {form.formState.errors.summary && (
            <p className="text-sm text-red-500 mt-1">{form.formState.errors.summary.message}</p>
          )}
        </div>

        {/* Job Description Section */}
        <div className="mb-6">
          <Label htmlFor="description">
            Job Description * <span className="text-sm text-muted-foreground">(Full details)</span>
          </Label>
          <Textarea
            id="description"
            placeholder="Detailed job description, requirements, benefits, etc."
            rows={6}
            {...form.register("description")}
            className="mt-1.5"
          />
          {form.formState.errors.description && (
            <p className="text-sm text-red-500 mt-1">{form.formState.errors.description.message}</p>
          )}
        </div>
        
        {/* Better Results Box - NEW COMPONENT */}
        <BetterResultsBox />

        {/* Contact Information Section */}
        <div className="mb-6 bg-slate-50 p-6 rounded-lg border border-slate-200">
          <SectionHeader
            title="Contact Information"
            emoji="📞"
            description="How should candidates get in touch with you?"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor="contactName">Contact Name *</Label>
              <Input
                id="contactName"
                placeholder="e.g. John Doe"
                {...form.register("contactInfo.name")}
                className="mt-1.5"
              />
              {form.formState.errors.contactInfo?.name && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.contactInfo.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="contactEmail">Contact Email *</Label>
              <Input
                id="contactEmail"
                placeholder="e.g. john@example.com"
                type="email"
                {...form.register("contactInfo.email")}
                className="mt-1.5"
              />
              {form.formState.errors.contactInfo?.email && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.contactInfo.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input
                id="contactPhone"
                placeholder="e.g. (123) 456-7890"
                type="tel"
                {...form.register("contactInfo.phone")}
                className="mt-1.5"
              />
              {form.formState.errors.contactInfo?.phone && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.contactInfo.phone.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="preferredContact">Preferred Contact Method *</Label>
              <Select
                onValueChange={(value) => {
                  form.setValue("contactInfo.preferredContact", value);
                }}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select contact method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.contactInfo?.preferredContact && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.contactInfo.preferredContact.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Photo Upload Section */}
        <div className="mb-6 bg-slate-50 p-6 rounded-lg border border-slate-200">
          <SectionHeader
            title="Upload Photos"
            emoji="📷"
            description="Add photos of your salon or workspace (optional)"
          />
          
          <div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  setPhotoUploads(Array.from(e.target.files));
                }
              }}
            />
            {photoUploads.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  {photoUploads.length} photos selected
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Listing Duration Section */}
      <div className="mb-6">
        <SectionHeader
          title="Listing Duration"
          emoji="📅"
          description="How long should your job posting remain active?"
        />
        
        <Select
          onValueChange={(value) => {
            form.setValue("expireAfterDays", parseInt(value));
          }}
        >
          <SelectTrigger className="mt-1.5">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">7 Days</SelectItem>
            <SelectItem value="14">14 Days</SelectItem>
            <SelectItem value="30">30 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Post Visibility Options */}
      <div className="mb-6">
        <SectionHeader
          title="Post Visibility Options"
          emoji="👁️"
          description="Boost your job posting to reach more candidates"
        />
        
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="featured" {...form.register("featured")} />
            <label
              htmlFor="featured"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Feature this job posting
            </label>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Your job posting will be highlighted and appear at the top of search results.
          </p>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="mb-6">
        <PricingDisplay jobType={jobType} />
        <PricingMicroCopy />
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-start space-x-2 mb-8">
        <Checkbox id="terms" {...form.register("acceptTerms")} />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the Terms and Conditions
          </label>
          <p className="text-sm text-muted-foreground">
            By posting this job, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Creating Your Job Post..." : "Post Job Now"}
      </Button>
    </form>
  );
};

export default JobForm;

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobFormSchema, JobFormValues } from "./jobFormSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  // Initialize the form with default values
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      salary: "",
      contactEmail: "",
      phoneNumber: "",
      jobType: "full-time",
      requirements: []
    },
  });

  // Handle form submission
  const handleSubmit = (values: JobFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 p-6">
        {/* Job Title Field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Nail Technician, Hair Stylist" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Job Type Field */}
        <FormField
          control={form.control}
          name="jobType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Type</FormLabel>
              <FormControl>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  {...field}
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="temporary">Temporary</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location Field */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Los Angeles, CA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number Field */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="(714) 555-1234"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <small className="text-xs text-gray-400">
                This number will be visible only to verified users.
              </small>
            </FormItem>
          )}
        />

        {/* Contact Email Field */}
        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Contact Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <small className="text-xs text-gray-400">
                Optional. Artists may contact you here if enabled.
              </small>
            </FormItem>
          )}
        />

        {/* Salary Field */}
        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary Range (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g. $20-25/hr or $50K-60K/year" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Job Summary Textarea */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel>Job Summary</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Tell artists what your team is like, what kind of work you need, and why they'll enjoy it"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <small className="text-xs text-gray-400">
                This will be shown publicly on your listing.
              </small>
            </FormItem>
          )}
        />

        {/* Upload photos section - we'll keep this simple without direct PhotoUploader reference */}
        <div className="mt-6">
          <FormLabel className="block mb-2">Upload Photos (Optional)</FormLabel>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
            <p className="text-sm text-gray-500">
              Drag and drop photos here, or click to select files
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Maximum 5 photos, each under 5MB
            </p>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files) {
                  setPhotoUploads(Array.from(e.target.files));
                }
              }}
              id="photo-upload"
            />
            <Button 
              type="button" 
              variant="outline" 
              className="mt-4"
              onClick={() => document.getElementById('photo-upload')?.click()}
            >
              Select Files
            </Button>
          </div>
          
          {/* Preview selected photos */}
          {photoUploads.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {photoUploads.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Upload preview ${index + 1}`}
                    className="h-24 w-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-white rounded-full p-1"
                    onClick={() => {
                      const newUploads = [...photoUploads];
                      newUploads.splice(index, 1);
                      setPhotoUploads(newUploads);
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 border-t flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : "Post Job"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default JobForm;


import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./SalonPostForm";

interface SalonPostBasicInfoProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export const SalonPostBasicInfo = ({ form }: SalonPostBasicInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="salonName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Salon Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter your salon name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="State" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="askingPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Asking Price</FormLabel>
            <FormControl>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input className="pl-8" placeholder="150,000" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="monthlyRent"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Monthly Rent (Optional)</FormLabel>
            <FormControl>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input className="pl-8" placeholder="3,000" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="numberOfStaff"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Staff</FormLabel>
            <FormControl>
              <Input placeholder="e.g., 5" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="revenue"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Monthly Revenue (Optional)</FormLabel>
            <FormControl>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input className="pl-8" placeholder="20,000" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="md:col-span-2">
        <FormField
          control={form.control}
          name="willTrain"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Owner Will Train New Owner?</FormLabel>
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
    </div>
  );
};


import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "./salonFormSchema";

interface SalonPostDescriptionProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonPostDescription = ({ form }: SalonPostDescriptionProps) => {
  // Sample placeholder text
  const vietnamesePrompt = "Ví dụ: Tiệm nail đẹp, khu tốt, khách sang. Đã hoạt động 5 năm, có khách quen ổn định. Chủ cần về Việt Nam nên muốn bán gấp.";
  const englishPrompt = "Example: Beautiful salon in a great area with upscale clientele. Established for 5 years with a stable customer base. Owner needs to return to Vietnam, looking for quick sale.";
  
  return (
    <div className="space-y-6">
      <Separator className="my-6" />
      <FormField
        control={form.control}
        name="vietnameseDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Vietnamese Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder={vietnamesePrompt}
                className="h-32"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="englishDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>English Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder={englishPrompt}
                className="h-32"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

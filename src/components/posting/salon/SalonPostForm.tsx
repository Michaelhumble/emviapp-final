
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { SalonPostBasicInfo } from "./SalonPostBasicInfo";
import { SalonPostDescription } from "./SalonPostDescription";
import { SalonPostPhotoUpload } from "./SalonPostPhotoUpload";

// Define form schema with zod
export const formSchema = z.object({
  salonName: z.string().min(2, {
    message: "Salon name must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "City is required.",
  }),
  state: z.string().min(2, {
    message: "State is required.",
  }),
  askingPrice: z.string().min(1, {
    message: "Asking price is required.",
  }),
  monthlyRent: z.string().optional(),
  numberOfStaff: z.string().min(1, {
    message: "Number of staff is required.",
  }),
  revenue: z.string().optional(),
  vietnameseDescription: z.string().min(10, {
    message: "Vietnamese description must be at least 10 characters.",
  }),
  englishDescription: z.string().min(10, {
    message: "English description must be at least 10 characters.",
  }),
  willTrain: z.boolean().default(false),
  isNationwide: z.boolean().default(false),
  fastSalePackage: z.boolean().default(false),
});

export type SalonFormValues = z.infer<typeof formSchema>;

interface SalonPostFormProps {
  onSubmit: (values: SalonFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  onNationwideChange: (checked: boolean) => void;
  onFastSaleChange: (checked: boolean) => void;
}

export const SalonPostForm = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads,
  onNationwideChange,
  onFastSaleChange
}: SalonPostFormProps) => {
  const form = useForm<SalonFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salonName: "",
      city: "",
      state: "",
      askingPrice: "",
      monthlyRent: "",
      numberOfStaff: "",
      revenue: "",
      vietnameseDescription: "",
      englishDescription: "",
      willTrain: false,
      isNationwide: false,
      fastSalePackage: false,
    },
  });

  const handleFormSubmit = (values: SalonFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <SalonPostBasicInfo form={form} />
        
        <SalonPostDescription form={form} />
        
        <SalonPostPhotoUpload
          photoUploads={photoUploads}
          setPhotoUploads={setPhotoUploads}
        />
        
        <div className="mt-8">
          <Button type="submit" className="w-full">List Salon For Sale</Button>
        </div>
      </form>
    </Form>
  );
};

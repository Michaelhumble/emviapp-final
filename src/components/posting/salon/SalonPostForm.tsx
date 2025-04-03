
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { SalonPostBasicInfo } from "./SalonPostBasicInfo";
import { SalonPostDescription } from "./SalonPostDescription";
import { SalonPostPhotoUpload } from "./SalonPostPhotoUpload";
import { salonFormSchema, SalonFormValues } from "./salonFormSchema";

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
    resolver: zodResolver(salonFormSchema),
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


import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { salonFormSchema, SalonFormValues } from "./salonFormSchema";
import { Form } from "@/components/ui/form";

interface SalonPostFormProps {
  children: React.ReactNode;
}

export const SalonPostForm = ({ children }: SalonPostFormProps) => {
  const form = useForm<SalonFormValues>({
    resolver: zodResolver(salonFormSchema),
    defaultValues: {
      salonName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      contactNotes: "",
      neighborhood: "",
      businessType: "",
      establishedYear: "",
      logo: "",
      askingPrice: "",
      monthlyRent: "",
      revenue: "",
      numberOfStaff: "",
      squareFeet: "",
      englishDescription: "",
      vietnameseDescription: "",
      reasonForSelling: "",
      virtualTourUrl: "",
      willTrain: false,
      hasHousing: false,
      hasParking: false,
      equipmentIncluded: false,
      leaseTransferable: false,
      sellerFinancing: false,
      hasWaxRoom: false,
      hasDiningRoom: false,
      hasLaundry: false,
    },
  });

  return (
    <Form {...form}>
      {children}
    </Form>
  );
};

export default SalonPostForm;

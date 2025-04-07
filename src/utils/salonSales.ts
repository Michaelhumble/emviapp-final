
import { supabase } from "@/integrations/supabase/client";
import { SalonSale, SalonSaleFormValues } from "@/types/salonSale";
import { toast } from "sonner";

export async function fetchSalonSales() {
  try {
    const { data, error } = await supabase
      .from('salon_sales')
      .select('*')
      .eq('status', 'active')
      .eq('is_private', false)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching salon sales:', error);
      return [];
    }

    return data as SalonSale[];
  } catch (error) {
    console.error('Exception when fetching salon sales:', error);
    return [];
  }
}

export async function fetchSalonSaleById(id: string) {
  try {
    // First fetch the salon sale
    const { data: salonSale, error } = await supabase
      .from('salon_sales')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching salon sale:', error);
      return null;
    }

    // Then fetch photos for this salon sale
    const { data: photos, error: photoError } = await supabase
      .from('salon_sale_photos')
      .select('*')
      .eq('salon_sale_id', id)
      .order('order_number', { ascending: true });

    if (photoError) {
      console.error('Error fetching salon sale photos:', photoError);
    }

    return {
      ...salonSale as SalonSale,
      photos: photos || []
    };
  } catch (error) {
    console.error('Exception when fetching salon sale:', error);
    return null;
  }
}

export async function createSalonSale(values: SalonSaleFormValues, userId: string) {
  try {
    const { data, error } = await supabase
      .from('salon_sales')
      .insert([
        {
          user_id: userId,
          salon_name: values.salon_name,
          city: values.city,
          state: values.state,
          asking_price: parseFloat(values.asking_price),
          size: values.size,
          business_type: values.business_type,
          description: values.description,
          is_urgent: values.is_urgent,
          is_private: values.is_private,
          status: 'active'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating salon sale:', error);
      toast.error('Failed to create salon listing');
      return null;
    }

    toast.success('Salon listing created successfully');
    return data as SalonSale;
  } catch (error) {
    console.error('Exception when creating salon sale:', error);
    toast.error('Failed to create salon listing');
    return null;
  }
}

export async function uploadSalonPhotos(files: File[], salonSaleId: string) {
  try {
    const results = [];
    let orderNumber = 0;

    for (const file of files) {
      // Upload the file to storage
      const fileName = `${salonSaleId}/${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('salon_sale_photos')
        .upload(fileName, file);

      if (uploadError) {
        console.error('Error uploading photo:', uploadError);
        continue;
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('salon_sale_photos')
        .getPublicUrl(fileName);

      // Save the photo reference in the database
      const { data: photoData, error: photoError } = await supabase
        .from('salon_sale_photos')
        .insert([
          {
            salon_sale_id: salonSaleId,
            photo_url: publicUrl,
            order_number: orderNumber++
          }
        ])
        .select()
        .single();

      if (photoError) {
        console.error('Error saving photo reference:', photoError);
        continue;
      }

      results.push(photoData);
    }

    return results;
  } catch (error) {
    console.error('Exception when uploading salon photos:', error);
    return [];
  }
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}


import { supabase } from "@/integrations/supabase/client";
import { SalonSale, SalonSaleFormValues } from "@/types/salonSale";
import { toast } from "sonner";

export async function fetchSalonSales() {
  try {
    const { data, error } = await supabase
      .from('salon_sales')
      .select('*, photos:salon_sale_photos(*)')
      .eq('status', 'active')
      .order('is_featured', { ascending: false })
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

export async function updateSalonSale(id: string, values: Partial<SalonSaleFormValues>, userId: string) {
  try {
    const { data, error } = await supabase
      .from('salon_sales')
      .update({
        salon_name: values.salon_name,
        city: values.city,
        state: values.state,
        asking_price: values.asking_price ? parseFloat(values.asking_price) : undefined,
        size: values.size,
        business_type: values.business_type,
        description: values.description,
        is_urgent: values.is_urgent,
        is_private: values.is_private
      })
      .eq('id', id)
      .eq('user_id', userId) // Security check
      .select()
      .single();

    if (error) {
      console.error('Error updating salon sale:', error);
      toast.error('Failed to update salon listing');
      return null;
    }

    toast.success('Salon listing updated successfully');
    return data as SalonSale;
  } catch (error) {
    console.error('Exception when updating salon sale:', error);
    toast.error('Failed to update salon listing');
    return null;
  }
}

export async function deleteSalonSale(id: string, userId: string) {
  try {
    // First delete associated photos
    const { error: photosError } = await supabase
      .from('salon_sale_photos')
      .delete()
      .eq('salon_sale_id', id);
      
    if (photosError) {
      console.error('Error deleting salon photos:', photosError);
    }
    
    // Then delete the salon sale record
    const { error } = await supabase
      .from('salon_sales')
      .delete()
      .eq('id', id)
      .eq('user_id', userId); // Security check

    if (error) {
      console.error('Error deleting salon sale:', error);
      toast.error('Failed to delete salon listing');
      return false;
    }

    toast.success('Salon listing deleted successfully');
    return true;
  } catch (error) {
    console.error('Exception when deleting salon sale:', error);
    toast.error('Failed to delete salon listing');
    return false;
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

export async function changeSalonSaleStatus(id: string, status: 'active' | 'inactive' | 'sold', userId: string) {
  try {
    const { error } = await supabase
      .from('salon_sales')
      .update({ status })
      .eq('id', id)
      .eq('user_id', userId); // Security check

    if (error) {
      console.error(`Error changing salon sale status to ${status}:`, error);
      toast.error(`Failed to change listing status to ${status}`);
      return false;
    }

    toast.success(`Salon listing status changed to ${status}`);
    return true;
  } catch (error) {
    console.error(`Exception when changing salon sale status to ${status}:`, error);
    toast.error(`Failed to change listing status to ${status}`);
    return false;
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


import { supabase } from "@/integrations/supabase/client";
import { useProfileCompletion } from "@/components/profile/hooks/useProfileCompletion";
import { toast } from "sonner";

// Default image as Base64 - this is a simple placeholder image
// In a real app, you would use a proper image file
const defaultImageBase64 = "data:image/jpeg;base64,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";

// Function to populate the artist profile with sample data
export const populateArtistProfileWithTestData = async (userId: string) => {
  if (!userId) {
    console.error("No user ID provided");
    toast.error("User not logged in");
    return false;
  }

  try {
    // Step 1: Convert the base64 image to a Blob
    const fetchResponse = await fetch(defaultImageBase64);
    const blob = await fetchResponse.blob();
    const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });

    // Step 2: Upload the image to Supabase Storage
    const filePath = `${userId}/avatar.jpg`;
    const { error: uploadError, data: uploadData } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error("Error uploading profile photo:", uploadError);
      toast.error("Failed to upload profile photo");
      return false;
    }

    // Step 3: Get the public URL of the uploaded image
    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    const avatarUrl = publicUrlData.publicUrl;

    // Step 4: Update the user profile with sample data in Supabase
    const { error: updateError } = await supabase
      .from("users")
      .update({
        bio: "Passionate artist with 5+ years of experience.",
        specialty: "Nail Design",
        location: "San Jose, California",
        instagram: "https://instagram.com/example",
        website: "https://www.portfolioartist.com",
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
        // Add completed_profile_tasks field to track progress
        completed_profile_tasks: ["bio", "specialty", "location", "profile_picture"]
      })
      .eq("id", userId);

    if (updateError) {
      console.error("Error updating profile:", updateError);
      toast.error("Failed to update profile with sample data");
      return false;
    }

    console.log("Profile populated with test data successfully!");
    toast.success("Profile populated with sample data!");
    return true;
  } catch (error) {
    console.error("Error in populateArtistProfileWithTestData:", error);
    toast.error("An error occurred while populating profile data");
    return false;
  }
};

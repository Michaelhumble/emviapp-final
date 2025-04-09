
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

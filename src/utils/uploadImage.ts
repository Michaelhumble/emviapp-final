
/**
 * Uploads an image and reports progress
 * 
 * @param file The image file to upload
 * @param onProgress Progress callback function (0-100)
 * @returns Promise with the uploaded image URL
 */
export const uploadImage = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    // In a real implementation, this would upload to a server
    // For now, simulate an upload with progress

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      
      if (onProgress) {
        onProgress(progress);
      }
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Simulate successful upload with local URL
        const imageUrl = URL.createObjectURL(file);
        resolve(imageUrl);
      }
    }, 300);
  });
};


// Mock implementation for uploadthing utilities
// This is a placeholder to fix build errors

export const uploadFiles = async (files: File[]): Promise<string[]> => {
  console.warn("Mock uploadFiles implementation used. This should be replaced with actual upload functionality.");
  // Return mock URLs for development purposes
  return files.map(file => URL.createObjectURL(file));
};

export const getImageData = async (file: File) => {
  return {
    url: URL.createObjectURL(file),
    name: file.name,
    size: file.size
  };
};

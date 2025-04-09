
import { useState } from 'react';
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImageUpload, X, Loader2 } from 'lucide-react';
import { PortfolioFormData } from '@/types/portfolio';
import { useForm } from 'react-hook-form';

interface PortfolioUploadFormProps {
  onSubmit: (data: PortfolioFormData) => Promise<void>;
  isUploading: boolean;
  onCancel: () => void;
}

const PortfolioUploadForm = ({ onSubmit, isUploading, onCancel }: PortfolioUploadFormProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const form = useForm<PortfolioFormData>({
    defaultValues: {
      title: '',
      description: '',
      image: null
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    form.setValue('image', file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (data: PortfolioFormData) => {
    await onSubmit(data);
    form.reset();
    setPreviewUrl(null);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Add New Portfolio Item</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onCancel}
          disabled={isUploading}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="My amazing nail art" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Describe your work (optional)" 
                    rows={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Image</FormLabel>
            <div className="mt-1">
              {previewUrl ? (
                <div className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden rounded-md border">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="object-cover w-full h-full"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      form.setValue('image', null);
                      setPreviewUrl(null);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-md border-gray-300 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageUpload className="h-12 w-12 text-gray-400 mb-2" />
                    <p className="mb-2 text-sm text-gray-500">
                      Click to upload an image
                    </p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, or WEBP (max 5MB)
                    </p>
                  </div>
                  <Input
                    id="image"
                    type="file"
                    className="hidden"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
            {form.formState.errors.image && (
              <p className="text-sm font-medium text-destructive mt-2">
                {form.formState.errors.image.message}
              </p>
            )}
          </FormItem>

          <div className="flex justify-end space-x-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isUploading || !previewUrl}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Upload Item'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PortfolioUploadForm;

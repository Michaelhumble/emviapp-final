
import { useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Loader2, Upload } from 'lucide-react';
import { ServiceSelector } from './ServiceSelector';
import { useSalonProfileForm } from '@/hooks/useSalonProfileForm';

export const SalonProfileForm = () => {
  const {
    formData,
    setFormData,
    isLoading,
    completionPercentage,
    handleFileUpload,
    handleSubmit
  } = useSalonProfileForm();

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  }, [handleFileUpload]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Salon Profile</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-normal">
              {completionPercentage}% Complete
            </span>
            <Progress value={completionPercentage} className="w-24" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
          <div className="space-y-4">
            {/* Logo Upload */}
            <div className="flex flex-col space-y-2">
              <Label>Profile Image</Label>
              <div className="flex items-start gap-4 flex-wrap">
                {formData.logo_url && (
                  <img 
                    src={formData.logo_url} 
                    alt="Salon logo" 
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                )}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('logo-upload')?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onFileChange}
                />
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="salon_name">Salon Name *</Label>
                <Input
                  id="salon_name"
                  value={formData.salon_name}
                  onChange={e => setFormData(prev => ({ ...prev, salon_name: e.target.value }))}
                  placeholder="Enter salon name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter phone number"
                  type="tel"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Enter salon address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="about">Description *</Label>
              <Textarea
                id="about"
                value={formData.about}
                onChange={e => setFormData(prev => ({ ...prev, about: e.target.value }))}
                placeholder="Describe your salon (minimum 10 characters)"
                rows={4}
              />
            </div>

            <ServiceSelector
              selectedServices={formData.services}
              onChange={services => setFormData(prev => ({ ...prev, services }))}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : 'Save Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

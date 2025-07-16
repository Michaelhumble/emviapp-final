
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { Loader2 } from 'lucide-react';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import SalonBasicInfoTab from './salon/SalonBasicInfoTab';
import SalonContactTab from './salon/SalonContactTab';
import SalonLogoTab from './salon/SalonLogoTab';
import { useSalonProfileEditor } from './salon/useSalonProfileEditor';

const SalonProfileEditor = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const {
    salonName,
    location,
    bio,
    phone,
    instagram,
    website,
    logoUrl,
    logoPreview,
    isLoading,
    setSalonName,
    setLocation,
    setBio,
    setPhone,
    setInstagram,
    setWebsite,
    handleFileChange,
    removeLogo,
    handleSaveProfile
  } = useSalonProfileEditor();
  
  if (!user) {
    navigate('/auth/signin');
    return null;
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-serif">Edit Your Salon Profile</CardTitle>
        <CardDescription>
          Update your salon information to attract clients and professionals
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-4 sm:px-6">
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="w-full mb-6 h-auto p-1">
            <TabsTrigger value="info" className="flex-1 text-xs sm:text-sm py-3 px-2">Basic Info</TabsTrigger>
            <TabsTrigger value="details" className="flex-1 text-xs sm:text-sm py-3 px-2">About & Contact</TabsTrigger>
            <TabsTrigger value="logo" className="flex-1 text-xs sm:text-sm py-3 px-2">Logo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-6">
            <SalonBasicInfoTab
              salonName={salonName}
              location={location}
              setSalonName={setSalonName}
              setLocation={setLocation}
            />
          </TabsContent>
          
          <TabsContent value="details" className="space-y-6">
            <SalonContactTab
              bio={bio}
              phone={phone}
              instagram={instagram}
              website={website}
              setBio={setBio}
              setPhone={setPhone}
              setInstagram={setInstagram}
              setWebsite={setWebsite}
            />
          </TabsContent>
          
          <TabsContent value="logo" className="space-y-6">
            <SalonLogoTab
              logoPreview={logoPreview}
              logoUrl={logoUrl}
              isLoading={isLoading}
              handleFileChange={handleFileChange}
              removeLogo={removeLogo}
            />
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-center sm:justify-end mt-8">
          <Button
            type="button" 
            onClick={handleSaveProfile}
            disabled={isLoading}
            className="w-full sm:w-auto min-w-[120px] h-12 sm:h-10 text-base sm:text-sm"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              "Save Profile"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonProfileEditor;

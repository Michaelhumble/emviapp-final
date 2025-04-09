
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/auth';
import ArtistBioSpecialtyForm from '@/components/profile/ArtistBioSpecialtyForm';
import { useProfileCompletion } from '@/components/profile/hooks/useProfileCompletion';
import { Progress } from '@/components/ui/progress';
import { Check, Info } from 'lucide-react';
import ArtistProfilePictureUpload from '@/components/profile/artist/ArtistProfilePictureUpload';
import ArtistPortfolioUploader from '@/components/profile/artist/ArtistPortfolioUploader';

const ArtistProfileSetupSection = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('bio');
  const { completionPercentage, markTaskComplete, isTaskComplete } = useProfileCompletion();

  const handleComplete = (taskId: string) => {
    markTaskComplete(taskId);
  };

  return (
    <div className="mb-8">
      <Card className="border-muted shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">
              Complete Your Profile
            </CardTitle>
            <span className="text-sm text-muted-foreground">
              {completionPercentage}% Complete
            </span>
          </div>
          <Progress value={completionPercentage} className="h-2 mt-2" />
        </CardHeader>
        
        <CardContent className="p-4">
          <Tabs defaultValue="bio" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="bio">
                Bio & Specialty
                {userProfile?.bio && userProfile?.specialty && (
                  <Check className="ml-1 h-4 w-4 text-green-500" />
                )}
              </TabsTrigger>
              <TabsTrigger value="photo">
                Profile Photo
                {isTaskComplete("avatar") && (
                  <Check className="ml-1 h-4 w-4 text-green-500" />
                )}
              </TabsTrigger>
              <TabsTrigger value="portfolio">
                Portfolio
                {isTaskComplete("portfolio") && (
                  <Check className="ml-1 h-4 w-4 text-green-500" />
                )}
              </TabsTrigger>
              <TabsTrigger value="other">
                Other Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="bio" className="mt-0">
              <ArtistBioSpecialtyForm onComplete={handleComplete} />
            </TabsContent>
            
            <TabsContent value="photo" className="mt-0">
              <ArtistProfilePictureUpload />
            </TabsContent>
            
            <TabsContent value="portfolio" className="mt-0">
              <ArtistPortfolioUploader />
            </TabsContent>
            
            <TabsContent value="other" className="mt-0">
              <div className="flex items-center justify-center p-6 text-center">
                <div className="max-w-md">
                  <Info className="h-10 w-10 text-blue-500 mx-auto mb-2" />
                  <h3 className="text-lg font-medium mb-2">Additional Settings Coming Soon</h3>
                  <p className="text-muted-foreground">
                    We're working on more profile customization options for you. 
                    Meanwhile, focus on completing your bio, specialty, and profile photo!
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtistProfileSetupSection;


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Heart, Save } from "lucide-react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ProfileMission = () => {
  const { userProfile, refreshUserProfile } = useAuth();
  const [mission, setMission] = useState(userProfile?.bio || "");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!userProfile) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('users')
        .update({ bio: mission })
        .eq('id', userProfile.id);
        
      if (error) throw error;
      
      await refreshUserProfile();
      setEditing(false);
      toast.success("Your mission has been updated!");
    } catch (error) {
      console.error("Error updating mission:", error);
      toast.error("Failed to update your mission. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="flex flex-row justify-between items-center pb-2">
          <CardTitle className="text-xl font-serif flex items-center">
            <Heart className="h-5 w-5 text-pink-500 mr-2" />
            My Mission
          </CardTitle>
          {!editing ? (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setEditing(true)}
              className="text-gray-500 hover:text-primary"
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setEditing(false)}
              className="text-gray-500"
            >
              Cancel
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {editing ? (
            <div className="space-y-4">
              <Textarea
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                placeholder="Share why you do what you do and what drives your passion in the beauty industry..."
                className="min-h-[120px] resize-none"
              />
              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Mission
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-500 italic">
                Make it yours. This is your professional home.
              </p>
            </div>
          ) : (
            <>
              {mission ? (
                <p className="text-gray-700 whitespace-pre-line">{mission}</p>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400 italic mb-4">Share why you do what you do...</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setEditing(true)}
                  >
                    Add Your Mission
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileMission;

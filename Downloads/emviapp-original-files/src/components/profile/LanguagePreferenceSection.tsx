
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { User } from "../../types/user";

interface LanguagePreferenceSectionProps {
  profile: User;
  onLanguageChange: (language: string) => void;
}

const LanguagePreferenceSection = ({ profile, onLanguageChange }: LanguagePreferenceSectionProps) => {
  const [loading, setLoading] = useState(false);

  const handleLanguageChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const preferredLanguage = e.target.value;
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from("users")
        .update({ preferred_language: preferredLanguage })
        .eq("id", profile.id);
        
      if (error) {
        console.error("Error updating language:", error);
        return;
      }
      
      // Call parent handler to update state
      onLanguageChange(preferredLanguage);
      
    } catch (error) {
      console.error("Failed to update language preference:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4 text-purple-300">Preferences</h3>
      <div className="flex flex-col">
        <label htmlFor="language" className="text-gray-300 mb-2">
          Preferred Language
        </label>
        <select 
          id="language" 
          value={profile.preferred_language || "English"} 
          onChange={handleLanguageChange}
          disabled={loading}
          className="bg-gray-700 text-white py-2 px-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="English">English</option>
          <option value="Vietnamese">Vietnamese</option>
          <option value="Spanish">Spanish</option>
          <option value="Korean">Korean</option>
        </select>
      </div>
    </div>
  );
};

export default LanguagePreferenceSection;

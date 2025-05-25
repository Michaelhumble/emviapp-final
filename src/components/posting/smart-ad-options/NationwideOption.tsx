
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Users, Clock } from "lucide-react";
import { PostType } from "@/utils/posting/types";
import ScarcityBanner from "./ScarcityBanner";

interface NationwideOptionProps {
  postType?: PostType;
  isFirstPost?: boolean;
  price?: string;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
  defaultChecked?: boolean;
}

const NationwideOption = ({ 
  postType,
  isFirstPost = false, 
  price = "+$5", 
  disabled = false,
  onChange,
  defaultChecked = false
}: NationwideOptionProps) => {
  const [checked, setChecked] = useState(defaultChecked);
  
  const handleChange = (value: boolean) => {
    setChecked(value);
    onChange(value);
  };
  
  return (
    <div className="space-y-3">
      <Card className={`transition-all ${disabled ? 'opacity-50' : 'hover:shadow-md'}`}>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Nationwide Visibility</p>
                <p className="text-sm text-gray-500">Reach candidates across all 50 states</p>
                {isFirstPost && (
                  <Badge variant="outline" className="mt-1 bg-blue-50 text-blue-700 border-blue-200">
                    Special First Post Deal
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">{price}</p>
                <p className="text-xs text-gray-500">per listing</p>
              </div>
              <Switch 
                checked={checked} 
                onCheckedChange={handleChange}
                disabled={disabled}
              />
            </div>
          </div>
          
          <ScarcityBanner slotsLeft={12} timeLeft={3600} addonType="nationwide" />
        </CardContent>
      </Card>
    </div>
  );
};

export default NationwideOption;

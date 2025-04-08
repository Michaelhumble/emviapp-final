
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Globe } from "lucide-react";
import { PostType } from "@/utils/posting/types";

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
    <Card className={`transition-all ${disabled ? 'opacity-50' : ''}`}>
      <CardContent className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">Nationwide Visibility</p>
            <p className="text-sm text-gray-500">Get seen across all states</p>
            {isFirstPost && (
              <Badge variant="outline" className="mt-1 bg-blue-50 text-blue-700 border-blue-200">
                Special First Post Deal
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">{price}</p>
          <Switch 
            checked={checked} 
            onCheckedChange={handleChange}
            disabled={disabled}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default NationwideOption;

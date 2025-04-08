
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { PostType } from "@/utils/posting/types";

interface BundleWithJobOptionProps {
  postType?: PostType;
  onChange: (checked: boolean) => void;
  defaultChecked?: boolean;
}

const BundleWithJobOption = ({ 
  postType,
  onChange,
  defaultChecked = false
}: BundleWithJobOptionProps) => {
  const [checked, setChecked] = useState(defaultChecked);
  
  const handleChange = (value: boolean) => {
    setChecked(value);
    onChange(value);
  };
  
  return (
    <Card>
      <CardContent className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">Bundle with Job Post</p>
            <p className="text-sm text-gray-500">Post a job along with your {postType === 'booth' ? 'booth rental' : 'listing'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">+$10</p>
          <Switch 
            checked={checked} 
            onCheckedChange={handleChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BundleWithJobOption;

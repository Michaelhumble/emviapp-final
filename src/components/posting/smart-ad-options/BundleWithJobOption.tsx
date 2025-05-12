
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";

interface BundleWithJobOptionProps {
  onChange: (checked: boolean) => void;
  postType?: 'salon' | 'booth';
  defaultChecked?: boolean;
}

const BundleWithJobOption = ({ 
  onChange,
  postType = 'salon', 
  defaultChecked = false
}: BundleWithJobOptionProps) => {
  const [checked, setChecked] = useState(defaultChecked);
  
  const handleChange = (value: boolean) => {
    setChecked(value);
    onChange(value);
  };
  
  const title = postType === 'salon' 
    ? 'Bundle with Job Post' 
    : 'Bundle with Salon Post';
  
  const description = postType === 'salon'
    ? 'Add job listings to this salon profile'
    : 'Connect to salon listings';
  
  return (
    <Card>
      <CardContent className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">{title}</p>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">+$15</p>
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

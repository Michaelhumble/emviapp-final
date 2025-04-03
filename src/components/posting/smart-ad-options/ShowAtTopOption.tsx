
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface ShowAtTopOptionProps {
  onShowAtTopChange: (checked: boolean) => void;
  defaultChecked?: boolean;
}

const ShowAtTopOption = ({ 
  onShowAtTopChange,
  defaultChecked = false
}: ShowAtTopOptionProps) => {
  const [checked, setChecked] = useState(defaultChecked);
  
  const handleChange = (value: boolean) => {
    setChecked(value);
    onShowAtTopChange(value);
  };
  
  return (
    <Card>
      <CardContent className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">Show at Top of Results</p>
            <p className="text-sm text-gray-500">Higher visibility in search results</p>
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

export default ShowAtTopOption;

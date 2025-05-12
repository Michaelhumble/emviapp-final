
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp } from "lucide-react";

interface ShowAtTopOptionProps {
  onChange: (checked: boolean) => void;
  defaultChecked?: boolean;
}

const ShowAtTopOption = ({ 
  onChange,
  defaultChecked = false 
}: ShowAtTopOptionProps) => {
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
            <ArrowUp className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">Show At Top</p>
            <p className="text-sm text-gray-500">Always appear at top of search results</p>
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

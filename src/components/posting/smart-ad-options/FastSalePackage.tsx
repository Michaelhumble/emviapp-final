
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";

interface FastSalePackageProps {
  onFastSaleChange: (checked: boolean) => void;
  defaultChecked?: boolean;
}

const FastSalePackage = ({ 
  onFastSaleChange,
  defaultChecked = false 
}: FastSalePackageProps) => {
  const [checked, setChecked] = useState(defaultChecked);
  
  const handleChange = (value: boolean) => {
    setChecked(value);
    onFastSaleChange(value);
  };
  
  return (
    <Card className="border-yellow-200 bg-gradient-to-r from-white to-yellow-50">
      <CardContent className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">Fast Sale Package</p>
            <p className="text-sm text-gray-500">Premium placement + 30-day featured pin</p>
            <Badge variant="outline" className="mt-1 bg-yellow-50 text-yellow-700 border-yellow-200">
              Includes Nationwide
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">$50</p>
          <Switch 
            checked={checked} 
            onCheckedChange={handleChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FastSalePackage;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";

export const PlanFeatures = () => {
  const features = [
    { name: "Staff Members", solo: "1", small: "Up to 5", medium: "Up to 10", unlimited: "Unlimited" },
    { name: "Boost Credits", solo: "3/month", small: "10/month", medium: "20/month", unlimited: "30/month" },
    { name: "Analytics", solo: "Basic", small: "Advanced", medium: "Advanced", unlimited: "Advanced" },
    { name: "Customer Management", solo: true, small: true, medium: true, unlimited: true },
    { name: "Email Support", solo: true, small: true, medium: true, unlimited: true },
    { name: "Priority Support", solo: false, small: true, medium: true, unlimited: true },
    { name: "Custom Booking Page", solo: false, small: true, medium: true, unlimited: true },
    { name: "Team Performance", solo: false, small: false, medium: true, unlimited: true },
    { name: "API Access", solo: false, small: false, medium: false, unlimited: true },
    { name: "Dedicated Support Rep", solo: false, small: false, medium: false, unlimited: true },
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Plan Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead className="text-center">Solo<br/>$49.95/mo</TableHead>
                <TableHead className="text-center">Small Team<br/>$99/mo</TableHead>
                <TableHead className="text-center">Growing Team<br/>$175/mo</TableHead>
                <TableHead className="text-center">Enterprise<br/>$199.95/mo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((feature, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{feature.name}</TableCell>
                  <TableCell className="text-center">
                    {typeof feature.solo === 'boolean' 
                      ? (feature.solo 
                          ? <Check className="h-4 w-4 text-green-500 mx-auto" /> 
                          : <X className="h-4 w-4 text-gray-300 mx-auto" />)
                      : feature.solo}
                  </TableCell>
                  <TableCell className="text-center">
                    {typeof feature.small === 'boolean' 
                      ? (feature.small 
                          ? <Check className="h-4 w-4 text-green-500 mx-auto" /> 
                          : <X className="h-4 w-4 text-gray-300 mx-auto" />)
                      : feature.small}
                  </TableCell>
                  <TableCell className="text-center">
                    {typeof feature.medium === 'boolean' 
                      ? (feature.medium 
                          ? <Check className="h-4 w-4 text-green-500 mx-auto" /> 
                          : <X className="h-4 w-4 text-gray-300 mx-auto" />)
                      : feature.medium}
                  </TableCell>
                  <TableCell className="text-center">
                    {typeof feature.unlimited === 'boolean' 
                      ? (feature.unlimited 
                          ? <Check className="h-4 w-4 text-green-500 mx-auto" /> 
                          : <X className="h-4 w-4 text-gray-300 mx-auto" />)
                      : feature.unlimited}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

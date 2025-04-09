
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Loader2, AlertTriangle, Info } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const businessTypes = [
  "Full Service Salon",
  "Nail Salon",
  "Hair Salon",
  "Barbershop",
  "Spa",
  "Beauty Supply",
  "Other"
];

const salonSizes = [
  "Small (1-4 chairs)",
  "Medium (5-10 chairs)",
  "Large (11-20 chairs)",
  "Extra Large (20+ chairs)"
];

const SellSalon = () => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    salon_name: "",
    business_type: "",
    size: "",
    state: "",
    city: "",
    description: "",
    asking_price: "",
    is_urgent: false,
    is_private: false
  });
  const [loading, setLoading] = useState(false);
  
  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      toast.error("You must be logged in to list a salon for sale");
      return;
    }
    
    // Validate required fields
    const requiredFields = ['salon_name', 'business_type', 'state', 'city', 'description', 'asking_price'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }
    
    try {
      setLoading(true);
      
      // Format the price as number
      const asking_price = parseFloat(formData.asking_price);
      if (isNaN(asking_price)) {
        toast.error("Please enter a valid asking price");
        return;
      }
      
      // Create new salon sale listing
      const { data, error } = await supabase
        .from('salon_sales')
        .insert({
          ...formData,
          asking_price,
          user_id: user.id,
        })
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success("Your salon has been listed for sale!");
      navigate("/dashboard");
      
    } catch (error: any) {
      console.error("Error listing salon:", error);
      toast.error(error.message || "Failed to list salon. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">List Your Salon For Sale</h1>
          <p className="text-gray-600 mb-6">
            Reach thousands of potential buyers in the beauty industry
          </p>
          
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-500" />
            <AlertTitle>Confidentiality Assured</AlertTitle>
            <AlertDescription className="text-sm text-blue-700">
              You can choose to make your listing private. Private listings won't show your salon name 
              or exact location until a vetted buyer expresses interest.
            </AlertDescription>
          </Alert>
          
          <Card>
            <CardHeader>
              <CardTitle>Salon Details</CardTitle>
              <CardDescription>
                Fill in the information about the salon you're selling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="salon_name" className="required">Salon Name</Label>
                    <Input
                      id="salon_name"
                      name="salon_name"
                      value={formData.salon_name}
                      onChange={handleChange}
                      placeholder="Your salon's name"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="business_type" className="required">Business Type</Label>
                      <Select
                        value={formData.business_type}
                        onValueChange={(value) => handleSelectChange('business_type', value)}
                      >
                        <SelectTrigger id="business_type">
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="size">Size</Label>
                      <Select
                        value={formData.size}
                        onValueChange={(value) => handleSelectChange('size', value)}
                      >
                        <SelectTrigger id="size">
                          <SelectValue placeholder="Select salon size" />
                        </SelectTrigger>
                        <SelectContent>
                          {salonSizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="state" className="required">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="State"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="city" className="required">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Description and Price */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="description" className="required">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your salon, include information about equipment, staff, clientele, etc."
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="asking_price" className="required">Asking Price (USD)</Label>
                    <Input
                      id="asking_price"
                      name="asking_price"
                      type="number"
                      min="0"
                      step="1000"
                      value={formData.asking_price}
                      onChange={handleChange}
                      placeholder="50000"
                      required
                    />
                  </div>
                </div>
                
                {/* Options */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="is_urgent"
                      name="is_urgent"
                      checked={formData.is_urgent}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="is_urgent" className="font-normal">
                      Mark as Urgent Sale (featured at the top)
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="is_private"
                      name="is_private"
                      checked={formData.is_private}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="is_private" className="font-normal">
                      Private Listing (only show general location and business type)
                    </Label>
                  </div>
                </div>
                
                <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-sm">
                    By submitting this listing, you confirm that you are the owner of this salon or 
                    authorized to sell it. False listings will be removed.
                  </AlertDescription>
                </Alert>
                
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "List My Salon For Sale"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SellSalon;

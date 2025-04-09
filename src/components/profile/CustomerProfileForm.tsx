
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CustomerProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">User Profile</h2>
        <p className="text-gray-500 mb-4">
          This is a placeholder user profile form.
        </p>
        <Button disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomerProfileForm;

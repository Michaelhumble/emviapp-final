
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const GenericProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
        <p className="text-gray-500 mb-4">
          This is a placeholder for the generic profile form.
          Please implement the actual form components as needed.
        </p>
        <Button disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default GenericProfileForm;

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface PostWizardLayoutProps {
  children: React.ReactNode;
}

const PostWizardLayout: React.FC<PostWizardLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link to="/dashboard">
          <Button variant="ghost" className="hover:bg-gray-100">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("Back to Listings")}
          </Button>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-8">
        {children}
      </div>
    </div>
  );
};

export default PostWizardLayout;

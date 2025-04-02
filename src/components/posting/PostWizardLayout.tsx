
import { ReactNode } from "react";
import Layout from "@/components/layout/Layout";

interface PostWizardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const PostWizardLayout = ({ children, title, subtitle }: PostWizardLayoutProps) => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-600">{subtitle}</p>
          )}
        </div>
        
        <div className="bg-white bg-opacity-80 backdrop-blur-sm shadow-md rounded-lg p-6 md:p-8">
          {children}
        </div>
      </div>
    </Layout>
  );
};

export default PostWizardLayout;


import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

interface BreadcrumbLink {
  name: string;
  href: string;
}

interface DashboardBreadcrumbProps {
  links: BreadcrumbLink[];
}

const DashboardBreadcrumb = ({ links }: DashboardBreadcrumbProps) => {
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        
        {links.map((link, index) => {
          const isLastItem = index === links.length - 1;
          
          return (
            <BreadcrumbItem key={link.href}>
              {isLastItem ? (
                <BreadcrumbPage>{link.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={link.href}>{link.name}</Link>
                </BreadcrumbLink>
              )}
              {!isLastItem && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DashboardBreadcrumb;

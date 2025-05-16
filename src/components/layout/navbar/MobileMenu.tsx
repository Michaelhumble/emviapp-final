import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/hooks/useTranslation";

const MobileMenu = ({ user, handleSignOut }: { user: any; handleSignOut: any }) => {
  const { t } = useTranslation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden h-8 w-8 p-0">
          <AlignJustify className="h-5 w-5" />
          <span className="sr-only">Open mobile menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="sm:w-2/3 md:w-full">
        <SheetHeader className="text-left">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>
            {t("See all available options here.")}
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Link to="/post-job">
            <Button variant="outline" className="justify-start">
              {t("Post a Job for Free")}
            </Button>
          </Link>
          <Link to="/pricing">
            <Button variant="outline" className="justify-start">
              {t("Pricing")}
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" className="justify-start">
              {t("Contact")}
            </Button>
          </Link>
          <Link to="/help">
            <Button variant="outline" className="justify-start">
              {t("Help")}
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 justify-start w-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.image} alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{user?.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{t("My Account")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">{t("Profile")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard">{t("Dashboard")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/subscription">{t("Subscription")}</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="cursor-pointer"
              >
                {t("Sign Out")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;

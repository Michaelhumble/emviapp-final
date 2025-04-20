
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

interface MobileButtonProps extends ButtonProps {
  mobileFullWidth?: boolean;
}

const MobileButton = ({ 
  className, 
  mobileFullWidth = true,
  ...props 
}: MobileButtonProps) => {
  return (
    <Button
      className={cn(
        "h-11 min-h-[44px]", // Mobile-friendly tap target
        mobileFullWidth && "w-full sm:w-auto",
        className
      )}
      {...props}
    />
  );
};

export { MobileButton };


import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

interface MobileButtonProps extends ButtonProps {
  mobileFullWidth?: boolean;
}

const MobileButton = ({ 
  className, 
  mobileFullWidth = true,
  children,
  ...props 
}: MobileButtonProps) => {
  return (
    <Button
      className={cn(
        "h-11 min-h-[44px] rounded-lg transition-all shadow-md hover:shadow-lg",  // Added rounded-lg, shadow, and transition
        mobileFullWidth && "w-full sm:w-auto",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export { MobileButton };


import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import SalonFilter from "./SalonFilter";
import { SalonFilterProps } from "./SalonFilter";

export function SalonFilterDrawer(props: SalonFilterProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="lg:hidden">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filter Salons</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <SalonFilter {...props} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

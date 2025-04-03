
import { TabsContent } from "@/components/ui/tabs";
import { Job } from "@/types/job";
import ListingCard from "./ListingCard";

interface TabSectionProps {
  tabValue: string;
  listings: Job[];
}

const TabSection = ({ tabValue, listings }: TabSectionProps) => {
  return (
    <TabsContent value={tabValue}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {listings.map((listing, index) => (
          <ListingCard key={listing.id} listing={listing} index={index} />
        ))}
      </div>
    </TabsContent>
  );
};

export default TabSection;

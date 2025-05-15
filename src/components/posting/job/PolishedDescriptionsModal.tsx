import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { jobTemplateStyles } from "./jobFormConstants";
import { usePolishedDescriptions } from "@/__experimental/usePolishedDescriptions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, ChevronDown } from "lucide-react";

export interface PolishedDescriptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (description: string) => void;
  currentJobType: string;
}

export function PolishedDescriptionsModal({
  isOpen,
  onClose,
  onSelect,
  currentJobType,
}: PolishedDescriptionsModalProps) {
  const [selectedStyle, setSelectedStyle] = useState(jobTemplateStyles[0].value);
  const { descriptions, isLoading } = usePolishedDescriptions(currentJobType, selectedStyle);
  const [selectedDescription, setSelectedDescription] = useState<string | null>(null);

  const handleStyleChange = (value: string) => {
    setSelectedStyle(value);
    setSelectedDescription(null); // Clear selected description when style changes
  };

  const handleDescriptionSelect = (description: string) => {
    setSelectedDescription(description);
  };

  const handleConfirm = () => {
    if (selectedDescription) {
      onSelect(selectedDescription);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Polished Job Descriptions</DialogTitle>
          <DialogDescription>
            Choose a style and select a description to pre-fill your job posting.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Select onValueChange={handleStyleChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Style" />
              <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
            </SelectTrigger>
            <SelectContent>
              {jobTemplateStyles.map((style) => (
                <SelectItem key={style.value} value={style.value}>
                  {style.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Tabs defaultValue="descriptions" className="space-y-4">
            <TabsList>
              <TabsTrigger value="descriptions">Descriptions</TabsTrigger>
            </TabsList>
            <TabsContent value="descriptions" className="space-y-4">
              {isLoading ? (
                <p>Loading descriptions...</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {descriptions?.map((description) => (
                    <Button
                      key={description.id}
                      variant="outline"
                      className={`justify-start text-left ${selectedDescription === description.content ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" : ""
                        }`}
                      onClick={() => handleDescriptionSelect(description.content)}
                    >
                      {selectedDescription === description.content && (
                        <CheckCircle className="mr-2 h-4 w-4" />
                      )}
                      {description.content}
                    </Button>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleConfirm} disabled={!selectedDescription}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

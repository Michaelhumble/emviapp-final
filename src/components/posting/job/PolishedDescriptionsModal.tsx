
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LucideReplaceAll } from "lucide-react";
import { cn } from "@/lib/utils";

interface Template {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface PolishedDescriptionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templates: Template[];
  isLoading?: boolean;
  onSelect: (description: string) => void;
}

export function PolishedDescriptionsModal({
  open,
  onOpenChange,
  templates,
  isLoading = false,
  onSelect,
}: PolishedDescriptionsModalProps) {
  const handleSelect = (description: string) => {
    onSelect(description);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] p-0">
        <div className="p-6 pb-2 border-b">
          <h2 className="text-xl font-semibold tracking-tight">
            Làm Mịn Bài Viết Với AI
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Chọn một mẫu để thay thế hoặc nâng cao bài viết của bạn
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="px-6 pt-2">
            <TabsList className="w-full justify-start mb-4">
              <TabsTrigger value="all" className="text-sm">
                Tất Cả
              </TabsTrigger>
              <TabsTrigger value="professional" className="text-sm">
                Chuyên Nghiệp
              </TabsTrigger>
              <TabsTrigger value="friendly" className="text-sm">
                Thân Thiện
              </TabsTrigger>
              <TabsTrigger value="luxury" className="text-sm">
                Sang Trọng
              </TabsTrigger>
              <TabsTrigger value="detailed" className="text-sm">
                Chi Tiết
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="h-[500px] px-6 pb-6">
            <TabsContent value="all" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => handleSelect(template.description)}
                    className={cn(
                      "p-6 rounded-2xl shadow-xl bg-white border border-neutral-100",
                      "transition-all duration-200 cursor-pointer",
                      "hover:border-primary/20 hover:shadow-2xl hover:scale-[1.01]"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {template.icon && (
                        <div className="text-primary">{template.icon}</div>
                      )}
                      <h3 className="font-medium text-lg tracking-tight">
                        {template.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {template.description.length > 250
                        ? `${template.description.substring(0, 250)}...`
                        : template.description}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(template.description);
                      }}
                    >
                      <LucideReplaceAll className="mr-1 h-3 w-3" />
                      Sử dụng mẫu này
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="professional" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates
                  .filter((t) => t.id.includes("chuyen_nghiep"))
                  .map((template) => (
                    <div
                      key={template.id}
                      onClick={() => handleSelect(template.description)}
                      className={cn(
                        "p-6 rounded-2xl shadow-xl bg-white border border-neutral-100",
                        "transition-all duration-200 cursor-pointer",
                        "hover:border-primary/20 hover:shadow-2xl hover:scale-[1.01]"
                      )}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        {template.icon && (
                          <div className="text-primary">{template.icon}</div>
                        )}
                        <h3 className="font-medium text-lg tracking-tight">
                          {template.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {template.description.length > 250
                          ? `${template.description.substring(0, 250)}...`
                          : template.description}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(template.description);
                        }}
                      >
                        <LucideReplaceAll className="mr-1 h-3 w-3" />
                        Sử dụng mẫu này
                      </Button>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="friendly" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates
                  .filter((t) => t.id.includes("than_thien"))
                  .map((template) => (
                    <div
                      key={template.id}
                      onClick={() => handleSelect(template.description)}
                      className={cn(
                        "p-6 rounded-2xl shadow-xl bg-white border border-neutral-100",
                        "transition-all duration-200 cursor-pointer",
                        "hover:border-primary/20 hover:shadow-2xl hover:scale-[1.01]"
                      )}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        {template.icon && (
                          <div className="text-primary">{template.icon}</div>
                        )}
                        <h3 className="font-medium text-lg tracking-tight">
                          {template.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {template.description.length > 250
                          ? `${template.description.substring(0, 250)}...`
                          : template.description}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(template.description);
                        }}
                      >
                        <LucideReplaceAll className="mr-1 h-3 w-3" />
                        Sử dụng mẫu này
                      </Button>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="luxury" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates
                  .filter((t) => t.id.includes("sang_trong"))
                  .map((template) => (
                    <div
                      key={template.id}
                      onClick={() => handleSelect(template.description)}
                      className={cn(
                        "p-6 rounded-2xl shadow-xl bg-white border border-neutral-100",
                        "transition-all duration-200 cursor-pointer",
                        "hover:border-primary/20 hover:shadow-2xl hover:scale-[1.01]"
                      )}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        {template.icon && (
                          <div className="text-primary">{template.icon}</div>
                        )}
                        <h3 className="font-medium text-lg tracking-tight">
                          {template.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {template.description.length > 250
                          ? `${template.description.substring(0, 250)}...`
                          : template.description}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(template.description);
                        }}
                      >
                        <LucideReplaceAll className="mr-1 h-3 w-3" />
                        Sử dụng mẫu này
                      </Button>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="detailed" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates
                  .filter((t) => t.id.includes("chi_tiet"))
                  .map((template) => (
                    <div
                      key={template.id}
                      onClick={() => handleSelect(template.description)}
                      className={cn(
                        "p-6 rounded-2xl shadow-xl bg-white border border-neutral-100",
                        "transition-all duration-200 cursor-pointer",
                        "hover:border-primary/20 hover:shadow-2xl hover:scale-[1.01]"
                      )}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        {template.icon && (
                          <div className="text-primary">{template.icon}</div>
                        )}
                        <h3 className="font-medium text-lg tracking-tight">
                          {template.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {template.description.length > 250
                          ? `${template.description.substring(0, 250)}...`
                          : template.description}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(template.description);
                        }}
                      >
                        <LucideReplaceAll className="mr-1 h-3 w-3" />
                        Sử dụng mẫu này
                      </Button>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}


import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DashboardQuickCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonLabel: string;
  onClick: () => void;
  accentColor?: string;
}

const DashboardQuickCard: React.FC<DashboardQuickCardProps> = ({
  icon,
  title,
  description,
  buttonLabel,
  onClick,
  accentColor = "#9b87f5",
}) => {
  return (
    <Card className="rounded-2xl bg-white/80 shadow-xl p-0 flex flex-col h-full relative overflow-hidden backdrop-blur-sm border-0">
      <CardContent className="pt-6 pb-5 px-5 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-1">
          <div className="bg-gradient-to-br from-pink-50 to-purple-100 rounded-xl p-2 shadow" style={{ color: accentColor }}>
            {icon}
          </div>
          <div className="font-serif text-lg font-bold" style={{ color: accentColor }}>{title}</div>
        </div>
        <div className="text-gray-600 text-sm flex-1 mb-3">
          {description}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="mt-auto"
          style={{
            borderRadius: "999px",
            borderColor: accentColor,
            color: accentColor,
            fontWeight: 600,
            transition: "all 0.18s cubic-bezier(.69,1.1,.29,1)",
            boxShadow: "0px 2px 8px 0px rgba(155,135,245,0.05)"
          }}
          onClick={onClick}
        >
          {buttonLabel}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DashboardQuickCard;


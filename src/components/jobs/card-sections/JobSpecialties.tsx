
import { Badge } from "@/components/ui/badge";

interface JobSpecialtiesProps {
  specialties?: string[];
}

export const JobSpecialties = ({ specialties }: JobSpecialtiesProps) => {
  if (!specialties || specialties.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      <div className="text-sm font-medium mb-2">Specialties:</div>
      <div className="flex flex-wrap gap-2">
        {specialties.map((specialty, index) => (
          <Badge 
            key={index} 
            className="bg-pink-100 text-pink-800 border-pink-200"
          >
            {specialty}
          </Badge>
        ))}
      </div>
    </div>
  );
};


export const getJobTypeColor = (type: string): string => {
  switch (type.toLowerCase()) {
    case "full-time":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "part-time":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "contract":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "internship":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

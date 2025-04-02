
import { Scissors, Calendar, Users, Award } from "lucide-react";

const features = [
  {
    icon: <Scissors className="h-8 w-8 text-primary" />,
    title: "Find Top Salons",
    description: "Connect with the best beauty salons in your area looking for talented professionals."
  },
  {
    icon: <Calendar className="h-8 w-8 text-primary" />,
    title: "Flexible Scheduling",
    description: "Work when you want with convenient booking and scheduling tools."
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Growing Community",
    description: "Join a thriving community of beauty professionals and salon owners."
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "Build Your Portfolio",
    description: "Showcase your work and build your professional reputation."
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose EmviApp</h2>
          <p className="text-lg text-gray-600">
            We connect beauty professionals with opportunities while providing tools to grow your career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-8 rounded-lg transition-all hover:shadow-md hover:transform hover:-translate-y-1"
            >
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

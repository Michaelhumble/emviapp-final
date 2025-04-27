
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SalonPromotion = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg p-6 mb-10">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h3 className="font-playfair text-xl font-semibold mb-2">Sell your salon or advertise booth rentals</h3>
          <p className="text-gray-700 max-w-xl">
            Reach thousands of potential buyers and renters by listing your salon for sale or advertising available booth rentals.
          </p>
        </div>
        <Button 
          onClick={() => navigate('/salons/list')}
          size="lg"
          className="whitespace-nowrap"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default SalonPromotion;

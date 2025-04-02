import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { toast } from 'react-hot-toast';
import { ShoppingCart, Plus, Minus, CheckCircle } from 'lucide-react';

interface CreditPackage {
  id: number;
  name: string;
  credits: number;
  price: number;
}

const Store = () => {
  const { user } = useAuth();
  const [creditPackages, setCreditPackages] = useState<CreditPackage[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<CreditPackage | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreditPackages = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('credit_packages')
          .select('*')
          .order('price', { ascending: true });

        if (error) {
          console.error('Error fetching credit packages:', error);
          toast.error('Failed to load credit packages.');
        } else {
          setCreditPackages(data || []);
        }
      } catch (error) {
        console.error('Error fetching credit packages:', error);
        toast.error('Failed to load credit packages.');
      } finally {
        setLoading(false);
      }
    };

    fetchCreditPackages();
  }, []);

  const handlePackageSelect = (packageId: number) => {
    const selected = creditPackages.find((pkg) => pkg.id === packageId);
    setSelectedPackage(selected || null);
    setQuantity(1); // Reset quantity when a new package is selected
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePurchase = async () => {
    if (!user || !selectedPackage) {
      toast.error('Please sign in and select a package.');
      return;
    }

    const totalAmount = selectedPackage.price * quantity;

    // Redirect to checkout or payment processing logic here
    toast.success(`Purchase initiated for ${quantity} x ${selectedPackage.name} - Total: $${totalAmount.toFixed(2)}`);
    // In a real application, you would integrate with a payment gateway here
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-fade-in">
      <div className="flex items-center mb-8">
        <ShoppingCart size={30} className="text-purple-400 mr-3" strokeWidth={1.5} />
        <h1 className="text-3xl font-medium bg-gradient-to-r from-purple-200 to-indigo-200 bg-clip-text text-transparent tracking-tight">
          EmviApp Credits
        </h1>
      </div>

      <div className="mb-8">
        <p className="text-gray-300">
          Enhance your EmviApp experience by purchasing credits. Use credits to book premium services, boost your job applications, and more.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin w-12 h-12 rounded-full border-t-4 border-b-4 border-purple-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {creditPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-gradient-to-b from-gray-800/70 to-gray-900/70 rounded-2xl shadow-xl border border-gray-700/50 p-6 transition-all hover:shadow-purple-900/20 cursor-pointer ${selectedPackage?.id === pkg.id ? 'border-purple-500' : 'border-transparent'}`}
              onClick={() => handlePackageSelect(pkg.id)}
            >
              <h3 className="text-xl font-medium text-purple-200 mb-2 tracking-tight">{pkg.name}</h3>
              <p className="text-gray-300 mb-3">
                <CheckCircle size={16} className="text-emerald-400 inline-block mr-1" />
                {pkg.credits} Credits
              </p>
              <p className="text-lg font-semibold text-white">${pkg.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}

      {selectedPackage && (
        <div className="bg-gradient-to-b from-gray-800/70 to-gray-900/70 rounded-2xl shadow-xl border border-gray-700/50 p-8 mb-8">
          <h2 className="text-2xl font-medium text-purple-200 mb-4 tracking-tight">
            {selectedPackage.name} Details
          </h2>
          <div className="flex items-center justify-between mb-5">
            <p className="text-gray-300">Price per package: <span className="text-white">${selectedPackage.price.toFixed(2)}</span></p>
            <div className="flex items-center">
              <button
                onClick={decreaseQuantity}
                className="bg-gray-700 hover:bg-gray-600 text-white rounded-l-md p-2"
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="text-white px-3">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="bg-gray-700 hover:bg-gray-600 text-white rounded-r-md p-2"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          <p className="text-gray-300 mb-5">Total amount: <span className="text-white">${(selectedPackage.price * quantity).toFixed(2)}</span></p>
          <button
            onClick={handlePurchase}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium rounded-xl px-5 py-2.5 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/30"
          >
            Purchase Now
          </button>
        </div>
      )}

      <div className="h-20"></div> {/* Extra space at the bottom for better UX */}
    </div>
  );
};

export default Store;

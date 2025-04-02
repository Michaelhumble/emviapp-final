
import Layout from "@/components/layout/Layout";

const Salons = () => (
  <Layout>
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Salons</h1>
      <p className="text-lg text-gray-600 mb-8">
        Discover and connect with top beauty salons in your area.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Salon Name #{item}</h3>
              <p className="text-gray-600 mb-4">Location • 4.8 ★</p>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Layout>
);

export default Salons;

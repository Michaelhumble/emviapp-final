
import { Users, MessageSquare, BarChart } from "lucide-react";

interface TabNavigationProps {
  activeTab: 'users' | 'support' | 'metrics';
  setActiveTab: (tab: 'users' | 'support' | 'metrics') => void;
}

const TabNavigation = ({ activeTab, setActiveTab }: TabNavigationProps) => {
  return (
    <div className="mb-8 border-b border-white/10">
      <div className="flex flex-wrap space-x-1 md:space-x-4">
        <button 
          className={`flex items-center px-3 md:px-5 py-3 border-b-2 transition-all ${
            activeTab === 'metrics' 
              ? 'text-amber-200 border-amber-400 font-medium' 
              : 'text-gray-400 border-transparent hover:text-gray-200'
          }`}
          onClick={() => setActiveTab('metrics')}
        >
          <BarChart size={18} className="mr-2" strokeWidth={2} />
          <span className="whitespace-nowrap">Analytics</span>
        </button>
        <button 
          className={`flex items-center px-3 md:px-5 py-3 border-b-2 transition-all ${
            activeTab === 'users' 
              ? 'text-amber-200 border-amber-400 font-medium' 
              : 'text-gray-400 border-transparent hover:text-gray-200'
          }`}
          onClick={() => setActiveTab('users')}
        >
          <Users size={18} className="mr-2" strokeWidth={2} />
          <span className="whitespace-nowrap">Users</span>
        </button>
        <button 
          className={`flex items-center px-3 md:px-5 py-3 border-b-2 transition-all ${
            activeTab === 'support' 
              ? 'text-amber-200 border-amber-400 font-medium' 
              : 'text-gray-400 border-transparent hover:text-gray-200'
          }`}
          onClick={() => setActiveTab('support')}
        >
          <MessageSquare size={18} className="mr-2" strokeWidth={2} />
          <span className="whitespace-nowrap">Support</span>
        </button>
      </div>
    </div>
  );
};

export default TabNavigation;

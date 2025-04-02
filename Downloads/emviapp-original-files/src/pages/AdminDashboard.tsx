
import { Shield } from "lucide-react";
import { useAdminData } from "../hooks/useAdminData";
import TabNavigation from "../components/admin/TabNavigation";
import UsersTable from "../components/admin/UsersTable";
import SupportQuestions from "../components/admin/SupportQuestions";
import MetricsDashboard from "../components/admin/MetricsDashboard";
import { useState } from "react";

const AdminDashboard = () => {
  const { users, supportQuestions, loading, error, markAsResolved } = useAdminData();
  const [activeTab, setActiveTab] = useState<'users' | 'support' | 'metrics'>('metrics');

  if (loading) {
    return (
      <div className="container mx-auto p-8 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin w-12 h-12 rounded-full border-t-4 border-b-4 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-red-200">
          <p className="font-medium">Error loading admin data:</p>
          <p className="mt-1 text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-fade-in">
      <div className="flex items-center mb-8">
        <Shield size={28} className="text-amber-400 mr-3" strokeWidth={1.5} />
        <h1 className="text-3xl font-medium bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
      </div>
      
      <div className="bg-gray-900/40 backdrop-blur-sm border border-white/5 rounded-2xl shadow-xl overflow-hidden p-6 mb-6">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="animate-fade-in">
          {activeTab === 'users' && <UsersTable users={users} />}
          
          {activeTab === 'support' && (
            <SupportQuestions 
              supportQuestions={supportQuestions} 
              markAsResolved={markAsResolved} 
            />
          )}

          {activeTab === 'metrics' && (
            <MetricsDashboard
              users={users}
              supportQuestions={supportQuestions}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
